<template>
  <div class=" layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-position="left">

        <el-form-item label="医生：">
          <el-input v-model="query.doctorName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="科室：">
          <el-select clearable
                     filterable
                     v-model="query.departmentCode">
            <el-option :key="item.id"
                       :label="item.netdeptName"
                       :value="item.id"
                       v-for="item in deptOptions"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="90px">
          <div slot="label">
            <span>出诊日期</span>
            <span>：</span>
          </div>
          <peace-date-picker type="daterange"
                             v-model="pickDate"
                             value-format="yyyy-MM-dd"
                             start-placeholder="开始日期"
                             end-placeholder="结束日期"></peace-date-picker>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     @click="getList()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">
      <div class="top-menu">
        <el-button type="primary"
                   @click="addData">新增</el-button>
      </div>
      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="70"></PeaceTableColumn>
        <PeaceTableColumn label="出诊日期"
                          prop="timeSharing"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="医生"
                          prop="doctorName"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="科室"
                          prop="departmentName"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="价格/¥"
                          min-width="100">
          <template slot-scope="scope">
            <span>{{ (scope.row.unitPrice || 0) | formatCurrency }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="出诊时间"
                          prop="timeSharing"
                          min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.ampm | getEnumLabel(timeOptions) }}{{ scope.row.bookingStart }}-{{scope.row.bookingEnd}}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="号源总数"
                          prop="bookingTotal"
                          min-width="100"></PeaceTableColumn>
        <PeaceTableColumn label="创建者"
                          prop="operator"
                          min-width="100"></PeaceTableColumn>

        <PeaceTableColumn label="创建时间"
                          prop="createTime"
                          min-width="120"></PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog width="550px"
                 append-to-body
                 v-bind:visible.sync="addSourceNumDialog.visible"
                 title="新增号源">
      <AddInstantSourceDialog v-if="addSourceNumDialog.visible"
                              @close="closeDialog"
                              @onSaveAndNew="onSaveAndNew"
                              @onSucess="addSuccess"></AddInstantSourceDialog>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service'
import AddInstantSourceDialog from './components/AddInstantSourceDialog'

export default {
  name: 'RegisterInstantSource',
  components: { AddInstantSourceDialog },
  data() {
    return {
      query: {
        doctorName: '',
        departmentCode: '',
        startTime: '',
        endTime: '',
        sourceDisType: '0'
      },
      pickDate: ['', ''],
      deptOptions: [],
      timeOptions: [
        { value: 'AM', label: '上午' },
        { value: 'PM', label: '下午' }
      ],
      addSourceNumDialog: {
        visible: false
      }
    }
  },
  created() {
    this.getDeptList()
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    },
    formatCurrency(value) {
      /* eslint-disable no-useless-escape */
      value = value.toString().replace(/\$|\,/g, '')
      if (isNaN(value)) value = '0'
      let sign = value == (value = Math.abs(value))
      value = Math.floor(value * 100 + 0.50000000001)
      let cents = value % 100
      value = Math.floor(value / 100).toString()
      if (cents < 10) cents = '0' + cents
      for (var i = 0; i < Math.floor((value.length - (1 + i)) / 3); i++)
        value = value.substring(0, value.length - (4 * i + 3)) + ',' + value.substring(value.length - (4 * i + 3))
      return (sign ? '' : '-') + value + '.' + cents
    }
  },
  methods: {
    getList() {
      const fetch = Service.findTemporarySourceList
      const params = Peace.util.deepClone(this.query)
      if (this.pickDate == null) {
        this.pickDate = ['', '']
      }
      const [start, end] = this.pickDate
      params.startTime = start
      params.endTime = end
      this.$refs.table.reloadData({ fetch, params })
    },
    getDeptList() {
      Service.getDeptList().then((res) => {
        const array = []
        const data = res.data
        if (!data || !data.length) {
          return
        }
        data.forEach((element) => {
          element.childDept.forEach((item) => {
            array.push(item)
          })
        })

        this.deptOptions = array
      })
    },
    //新增
    addData() {
      this.addSourceNumDialog.visible = true
    },
    closeDialog() {
      this.addSourceNumDialog.visible = false
    },
    addSuccess() {
      this.addSourceNumDialog.visible = false
      this.getList()
    },
    onSaveAndNew() {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.red {
  color: #f56c6c;
}

::v-deep.el-form-item.el-form-item--mini {
  .el-form-item__label-wrap {
    margin-left: 0 !important;
  }
}
.top-menu {
  margin-bottom: 20px;
}
</style>