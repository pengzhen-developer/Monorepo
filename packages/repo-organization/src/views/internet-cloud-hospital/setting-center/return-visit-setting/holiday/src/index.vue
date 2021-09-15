<template>
  <div class="layout-route">
    <div class="card p-none">
      <div class="hd">
        <el-button @click="openHolidayModel()"
                   type="primary">新增</el-button>
      </div>
      <div class="content"
           v-if="holidayList">
        <div class="card-item">
          <div class="title">{{ years.currentYearList }} 年</div>
          <PeaceTable :data="holidayList.currentYearList"
                      :span-method="rowSpanMethod1"
                      border
                      class="list pt-none q-mt-lg">
            <PeaceTableColumn label="月份"
                              prop="month">
              <template slot-scope="scope">
                <span>{{ scope.row.month }}</span>
                <span>月</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="节日"
                              prop="holidayName"></PeaceTableColumn>
            <PeaceTableColumn label="放假时间"
                              prop="holiday"></PeaceTableColumn>
            <PeaceTableColumn label="上班时间"
                              prop="workDate"></PeaceTableColumn>
            <PeaceTableColumn label="操作">
              <template slot-scope="scope">
                <el-button @click="openHolidayModel(scope.row)"
                           type="text">修改</el-button>
              </template>
            </PeaceTableColumn>
          </PeaceTable>
        </div>
        <div class="card-item">
          <div class="title">{{ years.nextYearList }} 年</div>
          <PeaceTable :data="holidayList.nextYearList"
                      :span-method="rowSpanMethod2"
                      border
                      class="list pt-none q-mt-lg">
            <PeaceTableColumn label="月份"
                              prop="month">
              <template slot-scope="scope">
                <span>{{ scope.row.month }}</span>
                <span>月</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="节日"
                              prop="holidayName"></PeaceTableColumn>
            <PeaceTableColumn label="放假时间"
                              prop="holiday"></PeaceTableColumn>
            <PeaceTableColumn label="上班时间"
                              prop="workDate"></PeaceTableColumn>
            <PeaceTableColumn label="操作">
              <template slot-scope="scope">
                <el-button @click="openHolidayModel(scope.row)"
                           type="text">修改</el-button>
              </template>
            </PeaceTableColumn>
          </PeaceTable>
        </div>
      </div>
      <PeaceDialog append-to-body
                   :close-on-click-modal="false"
                   :visible.sync="holidayModel.visible"
                   title="节日设置"
                   v-if="holidayModel.visible"
                   width="400px">
        <holiday-model :data="holidayModel.data"
                       @edit="editHoliday"
                       @submit="addedHoliday" />
      </PeaceDialog>
    </div>
  </div>
</template>

<script>
import Service from './service'
import HolidayModel from './components/HolidayModel'

export default {
  name: 'Holiday',
  components: { HolidayModel },
  data() {
    return {
      // 年份
      years: {
        currentYearList: new Date().getFullYear(),
        nextYearList: new Date().getFullYear() + 1
      },
      holidayList: {},
      spanArray: {},
      holidayModel: {
        // data: {},
        visible: false
      }
    }
  },
  created() {
    this.holidayList = this.getHoliday()
  },
  methods: {
    // 获取节假日列表
    getHoliday() {
      Service.getHoliday().then((res) => {
        const data = res.data

        Object.keys(data).forEach((key) => {
          const current = data[key]

          // 获取年份
          if (current && current.length) {
            this.years[key] = current[0].year
          }

          // 排序
          current.sort((a, b) => a.month - b.month)

          // 获取需要合并的列组
          this.getSpanArray(current, key)

          // 格式化日期数据
          this.formatData(current)
        })

        this.holidayList = data
      })
    },

    // 获取需要合并的列
    getSpanArray(list, key) {
      // 合并重复项
      const mergeRepeatItem = (_list) => {
        const array = []
        let initValue = 0
        let index = -1

        _list.forEach((item, _index) => {
          if (initValue !== item.month) {
            index++
            initValue = item.month
          }

          if (!array[index]) array[index] = []
          array[index].push(_index)
        })

        return array
      }

      // 重复项 小于 1项时，不需要合并
      const repeatArr = mergeRepeatItem(list).filter((itemArr) => itemArr.length > 1)

      this.spanArray[key] = repeatArr
    },

    // 格式化日期数据
    formatData(data) {
      return data.forEach((element) => {
        let start = element.holidayStartTime
        let end = element.holidayEndTime
        let workDate = element.workTime
        start = start ? start.replace(/-/g, '.') : start
        end = end ? end.replace(/-/g, '.') : end
        workDate = workDate ? workDate.replace(/-/g, '.') : workDate

        const holiday = start === end ? start : `${start} - ${end}`

        element.holiday = holiday
        element.workDate = workDate
      })
    },

    // 打开新增节日 Dialog
    openHolidayModel(row) {
      this.holidayModel.data = undefined
      if (row) {
        this.holidayModel.data = row
      }

      this.holidayModel.visible = true
    },

    // 关闭新增节日 Dialog
    closeHolidayModel() {
      this.holidayModel.visible = false
    },

    // 新增节日
    addedHoliday(params) {
      Service.setHoliday(params).then((res) => {
        const msg = res.msg || '节日新增成功'
        this.getHoliday()
        this.closeHolidayModel(msg)
      })
    },

    editHoliday(params) {
      Service.setHoliday(params).then((res) => {
        const msg = res.msg || '节日修改成功'
        this.getHoliday()
        this.closeHolidayModel(msg)
      })
    },

    // 表格 1 列合并
    rowSpanMethod1({ rowIndex, columnIndex }) {
      const repeatArray = this.spanArray.currentYearList

      return this.rowSpanMethod(repeatArray, {
        rowIndex,
        columnIndex
      })
    },

    // 表格 2 列合并
    rowSpanMethod2({ rowIndex, columnIndex }) {
      const repeatArray = this.spanArray.nextYearList

      return this.rowSpanMethod(repeatArray, {
        rowIndex,
        columnIndex
      })
    },

    // 列合并方法
    rowSpanMethod(repeatArray, { rowIndex, columnIndex }) {
      const isRepeatRowArray = repeatArray
      const firstRow = []
      const lastRow = []

      isRepeatRowArray.forEach((array) => {
        const lastArr = array.slice(1)
        firstRow.push({
          rowIndex: array[0],
          spanNumber: array.length
        })
        lastRow.push(...lastArr)
      })

      if (columnIndex === 0) {
        for (let [i, len] = [0, firstRow.length]; i < len; i += 1) {
          const element = firstRow[i]
          if (element.rowIndex === rowIndex) {
            return {
              colspan: 1,
              rowspan: element.spanNumber
            }
          }
        }
        if (lastRow.includes(rowIndex)) {
          return {
            colspan: 1,
            rowspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-none {
  background-color: #fff;
}
.hd {
  padding-bottom: 24px;
}
.content {
  height: calc(100% - 70px);
  display: flex;
  overflow: visible;
  .card-item {
    padding: 25px 18px;
    width: calc(50% - 10px);
    height: calc(100% - 10px);
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    overflow-y: auto;
    & + .card-item {
      margin-left: 20px;
    }
    .title {
      color: #333;
      text-align: center;
      font-size: 24px;
      line-height: 33px;
    }
  }
}
.el-table {
  ::v-deep th {
    font-weight: bold;
    font-weight: 600;
    background-color: #f5f7fa;
  }
}
</style>