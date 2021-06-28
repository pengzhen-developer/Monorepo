<template>
  <div>
    <div class="layout-route"
         v-bind:style="scrollAreaStyle">
      <div class="card card-search q-mb-md">
        <el-form :model="search"
                 class="search"
                 label-width="auto"
                 label-suffix="："
                 inline>
          <el-form-item label="医生姓名">
            <el-input clearable
                      placeholder="输入医生姓名"
                      v-model="search.doctorName"></el-input>
          </el-form-item>
          <el-form-item label="医院">
            <el-input clearable
                      placeholder="输入医院名称"
                      v-model="search.hospitalName"></el-input>
          </el-form-item>
          <el-form-item label="科室">
            <el-input clearable
                      placeholder="输入科室名称"
                      v-model="search.deptName"></el-input>
          </el-form-item>
          <el-form-item class="search-btn">
            <el-button @click="getList(1)"
                       type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card content">
        <div class="doctor-list">
          <peace-table :data="list"
                       @row-click="setDefaultRow(currentRow)"
                       highlight-current-row
                       ref="list"
                       size="medium">
            <peace-table-column label="序号"
                                prop="id"
                                width="80">
              <template slot-scope="scope">
                <span>{{(search.pageNumber - 1) * search.pageSize + scope.$index + 1}}</span>
              </template>
            </peace-table-column>
            <peace-table-column label="医生姓名"
                                prop="doctorName"></peace-table-column>
            <peace-table-column label="科室"
                                prop="deptName"></peace-table-column>
            <peace-table-column label="职称"
                                prop="doctorTitle"></peace-table-column>
            <peace-table-column label="医疗机构"
                                min-width="150"
                                prop="hosName"></peace-table-column>
            <peace-table-column fixed="right"
                                label="操作"
                                width="100">
              <template slot-scope="scope">
                <el-button @click.stop="getDepartInfo(scope.row)"
                           type="text">查看详情</el-button>
              </template>
            </peace-table-column>
          </peace-table>
        </div>
        <div class="doctor-info"
             v-if="count">
          <div class="row">
            <img alt="医生头像"
                 class="doctor-avatar"
                 src="./images/doctordefault.png" />
            <div class="doctor-detail">
              <span class="doctor-name">{{ currentDoctorInfo.doctorName }}</span>
              <span>{{ currentDoctorInfo.doctorTitle }}</span>
              <span>{{ currentDoctorInfo.deptName }}</span>
              <br />
              <span>{{ currentDoctorInfo.hosName }}</span>
            </div>
          </div>
          <div class="doctor-content-title">擅长</div>
          <el-input :autosize="{minRows: 2, maxRows: 8}"
                    @blur="update"
                    placeholder="暂无擅长"
                    resize="none"
                    type="textarea"
                    v-model="currentDoctorInfo.diseaseTag"></el-input>
          <div class="doctor-content-title">简介</div>
          <el-input :autosize="{minRows: 2, maxRows: 18}"
                    @blur="update"
                    placeholder="暂无简介"
                    resize="none"
                    type="textarea"
                    v-model="currentDoctorInfo.intro"></el-input>
          <div class="info-row flex items-center">
            <div class="info-row-label">
              <span>信息展示</span>
            </div>
            <div class="info-row-content">
              <el-radio-group v-model="currentDoctorInfo.is_show">
                <el-radio :disabled="!!currentDoctorInfo.isDeleted"
                          :label="1">展示</el-radio>
                <el-radio :label="2">不展示</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <el-pagination :current-page.sync="search.pageNumber"
                       :page-size.sync="search.pageSize"
                       :total="count"
                       @current-change="getList"
                       @size-change="getList(1)"
                       class="q-mt-16"
                       background
                       layout="total, sizes ,->, prev, pager,  next"></el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import Service from './service/index'
import { dom } from 'quasar'

export default {
  name: 'NationalDoctor',
  data() {
    return {
      search: {
        doctorName: '',
        hospitalName: '',
        deptName: '',
        pageNumber: 1,
        pageSize: 10
      },
      currentRow: '',
      currentDoctorInfo: '',
      list: [],
      count: 0,
      scrollAreaStyle: {}
    }
  },
  watch: {
    'currentDoctorInfo.is_show'() {
      this.update()
    }
  },
  methods: {
    // 获取列表
    getList(number) {
      if (number && this.search.pageNumber !== number) {
        this.search.pageNumber = number
      }

      const { doctorName, hospitalName, deptName, pageNumber, pageSize } = this.search

      Service.getDoctors({
        doctorName: doctorName,
        hosName: hospitalName,
        deptName: deptName,
        p: pageNumber,
        size: pageSize
      }).then((res) => {
        const data = res.data

        this.list = data.list
        this.count = data.count
        if (data.count) {
          this.getDepartInfo(this.list[0])
        }
      })
    },

    // 设置高亮行
    setDefaultRow(row) {
      this.$refs.list.$children[0].setCurrentRow(row)
    },

    // 获取医生信息
    getDepartInfo(row) {
      this.setDefaultRow(row)
      this.currentRow = row

      Service.getDoctorDetail({ doctorId: row.id }).then((res) => {
        const data = res.data

        this.currentDoctorInfo = data
      })
    },

    // 编辑医生信息
    update() {
      const data = this.currentDoctorInfo
      const { id, diseaseTag, intro, is_show } = data

      Service.editDoctorDetail({ doctorId: id, diseaseTag: diseaseTag, intro: intro, show: is_show }).then(() => {})
    },

    setScrollAreaStyle() {
      const offset = dom.offset(this?.$el)

      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - offset?.top}px`
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getList()
      // 设定滚动区域样式
      this.setScrollAreaStyle()
    })
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-bottom: -1px;
  &:before {
    display: none;
  }
}
.content {
  height: calc(100% - 75px);
  min-height: 300px;
  overflow: auto;
  white-space: nowrap;
}
.doctor-list,
.doctor-info {
  height: calc(100% - 52px);
  min-height: 200px;
  width: 63%;
  font-size: 0;
  border: 1px solid #eee;
  border-radius: 4px;
  display: inline-block;
  vertical-align: top;
  overflow-y: auto;
}
.doctor-avatar,
.doctor-detail {
  display: inline-block;
  vertical-align: middle;
}
.row {
  padding-bottom: 18px;
  border-bottom: 1px solid #ebebeb;
}
.doctor-avatar {
  width: 62px;
  height: 62px;
}
.doctor-detail {
  margin-left: 10px;
  font-size: 14px;
  .doctor-name {
    font-size: 16px;
    font-weight: bold;
  }
  & > span {
    margin-right: 8px;
    line-height: 30px;
  }
}
.doctor-content-title {
  margin: 10px 0;
  font-size: 14px;
  padding-left: 8px;
  border-left: 4px solid var(--q-color-primary);
}
.doctor-list {
  ::v-deep .current-row {
    & > td {
      color: var(--q-color-primary);
      &:first-of-type {
        color: inherit;
      }
    }
  }
}
.doctor-info {
  margin-left: 20px;
  padding: 20px;
  width: calc(36% - 20px);
  border: 1px solid var(--q-color-primary);
}
.info-row {
  .info-row-label {
    color: #789;
    white-space: nowrap;
    font-size: 14px;
    line-height: 28px;
  }
  .info-row-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  &-label {
    margin-right: 10px;
    &:after {
      display: none;
    }
  }
}
</style>
