<template>
  <div class="flex full-width">
    <div class="layout-route full-width">
      <template v-if="returnVisitIsOpen === true">
        <div class="bg-white">
          <div class="scheduling-title">复诊排班</div>
          <el-alert class="scheduling-tips"
                    type="warning"
                    show-icon>
            <div slot="title"
                 class="scheduling-tips-text">
              温馨提示：当天设置的排班信息次日生效，如需调整，请提前一天设置。
            </div>
          </el-alert>
          <div class="search">
            <div class="search-item">
              <span class="label">最早可约：</span>
              <el-select v-model="registerSettings.currentSource">
                <el-option :key="source.label"
                           :label="source.label"
                           :value="source.value"
                           v-for="source in currentSourceOptions"></el-option>
              </el-select>
            </div>
            <div class="search-item">
              <span class="label">最晚可约：</span>
              <el-select v-model="registerSettings.latestSource">
                <el-option :key="source.label"
                           :label="source.label"
                           :value="source.value"
                           v-for="source in latestSourceOptions"></el-option>
              </el-select>
            </div>
            <div class="search-item">
              <span class="label">最晚可退：</span>
              <el-select v-model="registerSettings.latestRefund">
                <el-option :key="source.label"
                           :label="source.label"
                           :value="source.value"
                           v-for="source in latestRefundOptions"></el-option>
              </el-select>
            </div>
            <div class="search-item">
              <el-button :disabled="!settingIsChange"
                         @click="setRegister"
                         type="primary">保存</el-button>
            </div>
            <el-button @click="$router.push({ path: '/internet-cloud-hospital/setting-center/return-visit-setting/holiday' })"
                       class="position-right"
                       icon="el-icon-date"
                       size="medium"
                       type="text">节假日</el-button>
          </div>
          <div class="content"
               v-if="departments && departments.length">
            <div class="menu">
              <el-menu :default-active="currentActived"
                       :default-openeds="currentOpeneds"
                       @select="handleSelect">
                <el-submenu :index="dept.id"
                            :key="dept.id"
                            v-for="dept in departments">
                  <template slot="title">{{ dept.netdeptName }}</template>
                  <el-menu-item :index="item.id"
                                :key="item.id"
                                v-for="item in dept.childDept">{{ item.netdeptName }}</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
            <div class="menu-content"
                 v-if="currentActived">
              <div class="title">{{ currentDepartment.netdeptName }}</div>
              <div class="list">
                <div :key="weekItem"
                     class="list-column"
                     v-for="(weekItem, index) in CONSTANT_WEEK">
                  <div class="list-title">{{ weekItem }}</div>
                  <div @click="openDialog(index)"
                       class="list-added">
                    <i class="el-icon-plus"></i>
                  </div>
                  <div :key="doctor.doctorName + _index"
                       @click="openDialog(index, doctor)"
                       class="list-item el-icon-arrow-right"
                       v-for="(doctor, _index) in scheduleList[index + 1]">
                    <p>{{ doctor.doctorName }}</p>
                    <p>
                      <span>¥{{ doctor.unitPrice }}</span>
                      × {{ (parseInt(doctor.totalCountAM) || 0) + (parseInt(doctor.totalCountPM) || 0)}}
                    </p>
                    <span class="small-text"
                          v-if="doctor.workStartAM && doctor.workEndAM">{{ doctor.workStartAM.substr(0, 5) }}
                      - {{ doctor.workEndAM.substr(0, 5) }}</span>
                    <span class="small-text"
                          v-if="doctor.workStartPM && doctor.workEndPM">{{ doctor.workStartPM.substr(0, 5) }}
                      - {{ doctor.workEndPM.substr(0, 5) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PeaceDialog :close-on-click-modal="false"
                       append-to-body
                       :visible.sync="schedulingModel.visible"
                       title="排班"
                       v-if="schedulingModel.visible"
                       class="scheduling-dialog"
                       width="580px">
            <scheduling-model :data="schedulingModel.data"
                              :doctors="doctors"
                              :week="schedulingModel.week"
                              :sourceDisType="sourceDisType"
                              @submit="addedScheduling" />
          </PeaceDialog>
        </div>
      </template>
      <template v-else-if="returnVisitIsOpen === false">
        <div class="bg-white full-height q-pa-lg">
          <return-visit-open></return-visit-open>
        </div>
      </template>
      <template v-else>
        <div class="flex bg-white full-height"
             :v-loading="true">
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Service from './service'
import ReturnVisitOpen from './components/ReturnVisitOpen'
import SchedulingModel from './components/SchedulingModel'

export default {
  name: 'ReturnVisitScheduling',
  components: { ReturnVisitOpen, SchedulingModel },
  data() {
    return {
      returnVisitIsOpen: null,
      registerSettings: {
        currentSource: 1,
        latestSource: 1,
        latestRefund: 1
      },
      currentSourceOptions: [
        { value: 1, label: '当天号源' },
        { value: 2, label: '隔天号源' },
        { value: 3, label: '三天后号源' }
      ],
      latestSourceOptions: [
        { value: 1, label: '一星期内号源' },
        { value: 2, label: '二星期内号源' },
        { value: 3, label: '一个月内号源' }
      ],
      latestRefundOptions: [
        { value: 1, label: '当天号源' },
        { value: 2, label: '隔天号源' },
        { value: 3, label: '三天后号源' }
      ],
      currentActived: '',
      currentOpeneds: [],
      currentDepartment: '',
      departments: [],
      schedulingModel: {
        visible: false,

        week: 1,
        data: {}
      },
      doctors: [],
      scheduleList: [],
      settingIsChange: false,
      sourceDisType: '0', // sourceDisType //号源类型 (0.线上复诊 1.线下门诊)
      CONSTANT_WEEK: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    }
  },
  watch: {
    registerSettings: {
      handler() {
        this.settingIsChange = true
      },
      deep: true
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  created() {
    this.getDepartments()
  },
  async mounted() {
    let checkReturnVisitOpen = await Service.checkReturnVisitOpen()
    let returnVisitList = checkReturnVisitOpen.data.list
    this.returnVisitIsOpen = returnVisitList.isOpen == 1 ? true : false

    if (this.returnVisitIsOpen) {
      this.$nextTick().then(() => {
        this.getRegisterSettings()
      })
    }
  },
  async activated() {
    let checkReturnVisitOpen = await Service.checkReturnVisitOpen()
    let returnVisitList = checkReturnVisitOpen.data.list
    this.returnVisitIsOpen = returnVisitList.isOpen == 1 ? true : false

    if (this.returnVisitIsOpen) {
      this.$nextTick().then(() => {
        this.getRegisterSettings()
      })
    }
  },
  methods: {
    // 获取配置
    getRegisterSettings() {
      Service.getRegisterSetting().then((res) => {
        const data = res.data
        const { earliestReducible, latestAppointment, latestRetreat } = data.info

        // 如果默认配置没有成功，这里会重新配置
        if (!earliestReducible || !latestAppointment || !latestRetreat) {
          this.setRegister()
        }

        this.registerSettings = {
          currentSource: earliestReducible,
          latestSource: latestAppointment,
          latestRefund: latestRetreat
        }

        setTimeout(() => {
          this.settingIsChange = false
        }, 0)
      })
    },
    // 获取科室
    getDepartments() {
      Service.getDeptList().then((res) => {
        const list = res.data
        this.departments = list

        this.setDefaultDept()
      })
    },

    // 配置预约挂号
    setRegister() {
      const { currentSource, latestSource, latestRefund } = this.registerSettings
      let params = {
        earliestReducible: currentSource,
        latestAppointment: latestSource,
        latestRetreat: latestRefund,
        sourceDisType: this.sourceDisType
      }
      Service.registerSetting(params).then((res) => {
        Peace.util.success(res.msg || '配置成功')
        this.getRegisterSettings()
      })
    },
    // 设置默认科室
    setDefaultDept() {
      const list = this.departments
      if (!list || !list.length) {
        return
      }
      const id = list[0].id
      const childId = list[0].childDept[0].id

      this.handleSelect(childId, [id, childId])
      this.currentOpeneds.push(id)
      this.currentActived = childId

      this.getDoctors()
    },

    // 获取医生列表
    getDoctors() {
      const id = this.currentDepartment.id

      Service.getDoctorByDept({ twoLevelDeptId: id }).then((res) => {
        const data = res.data
        this.doctors = data
      })
    },

    // 切换科室排班
    handleSelect(index, indexPath) {
      const list = this.departments

      list.forEach((element) => {
        if (element.id === indexPath[0]) {
          element.childDept.forEach((item) => {
            if (item.id === index) {
              this.currentDepartment = item
            }
          })
        }
      })

      this.getScheduling()
      this.getDoctors()
      // this.addedScheduling({})
    },

    // 获取排班设置
    getScheduling() {
      const id = this.currentDepartment.id
      this.scheduleList = []

      let params = {
        twoLevelDeptId: id,
        sourceDisType: this.sourceDisType
      }
      Service.getDoctorScheduling(params).then((res) => {
        const data = res.data
        this.scheduleList = this.objectToArray(data.list)
      })
    },

    objectToArray(object) {
      const array = []

      Object.keys(object).forEach((index) => {
        array[index] = object[index]
      })

      return array
    },

    // 根据 week 拆分数组
    splitArrayByWeek(_list) {
      const list = Object.values(_list)
      const array = []

      list.forEach((element) => {
        // if (!element.week) return element

        if (!array[element.week]) {
          array[element.week] = []
        }

        array[element.week].push(element)
      })

      // 合并重复项
      // array.forEach(item => this.mergeRepeatItem(item, 'doctorName'))
      // console.log(array)

      return array
    },

    // 合并重复项
    mergeRepeatItem(_list, key) {
      _list.sort((a, b) => a.doctorName - b.doctorName)

      const array = []
      let initValue = ''
      let index = -1

      _list.forEach((item) => {
        if (initValue !== item[key]) {
          index += 1
          initValue = item[key]
        }

        if (!array[index]) array[index] = []
        array[index].push(item)
      })

      return array
    },

    // 打开排班 Dialog
    openDialog(row, data) {
      if (!(this.doctors && this.doctors.length)) {
        return Peace.util.warning('当前科室下暂无医生！')
      }
      console.log(data)
      this.schedulingModel.week = row + 1
      this.schedulingModel.data = data
      this.schedulingModel.visible = true
    },

    // 关闭排班 Dialog
    closeDialog() {
      this.schedulingModel.visible = false
    },

    // 新增排班
    addedScheduling(params) {
      const id = this.currentDepartment.id
      const { doctorId, doctorName } = params.doctor
      const { scheduleJson } = params

      let data = {
        twoLevelDeptId: id,
        doctorId: doctorId,
        doctorName: doctorName,
        schedulingJson: scheduleJson,
        sourceDisType: this.sourceDisType
      }
      Service.setDoctorScheduling(data).then((res) => {
        Peace.util.success(res.msg || '排班新增成功')
        this.getScheduling()
        this.closeDialog()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.scheduling-dialog {
  ::v-deep .el-dialog__body {
    padding: 8px 20px 18px;
  }
}
.scheduling-title {
  height: 60px;
  font-size: 20px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 28px;
  padding: 20px;
  background-color: #fff;
}
.scheduling-tips {
  width: auto;
  margin: 0 20px;
  border: 1px solid #f09815;
}

.scheduling-tips .scheduling-tips-text {
  font-size: 14px;
  color: #000;
  padding: 4px 0;
}

::v-deep .scheduling-tips .el-icon-close {
  top: 16px;
  color: #f09815;
}

.small-text {
  display: block;
}
.search {
  position: relative;
  margin-bottom: 10px;
  padding: 20px;
  max-height: 80px;
  border-bottom: 0;
  background-color: #fff;
  display: flex;
  overflow: hidden;
  &-item {
    display: flex;
    align-items: center;
    margin-right: 24px;
  }
  .position-right {
    position: absolute;
    right: 20px;
    margin-top: 10px;
    padding: 3px 0;
  }
}
.content {
  padding: 0;
  height: calc(100% - 100px);
  overflow: hidden;
  display: flex;
  .menu {
    width: 200px;
    height: 100%;
    border-right: 1px solid #eee;
    overflow-y: auto;
  }
  .menu-content {
    padding: 20px;
    height: 100%;
    flex: 1 1 auto;
    overflow-y: auto;
  }
}
.menu-content {
  .title {
    color: #333;
    font-size: 20px;
    line-height: 28px;
    font-weight: bold;
    font-weight: 600;
  }
  .list {
    height: calc(100% - 28px);
    display: flex;
  }
}
.list {
  &-column {
    flex: 1;
    border-right: 1px dashed #eee;
    &:first-of-type {
      border-left: 1px dashed #eee;
    }
  }
  &-title {
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #333;
    border-bottom: 1px dashed #eee;
  }
  &-added {
    margin: 12px auto;
    font-weight: bold;
    width: 40px;
    height: 30px;
    line-height: 30px;
    color: #ddd;
    border: 1px dashed;
    text-align: center;
    cursor: pointer;
    transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      color: #aaa;
    }
  }
  &-item {
    position: relative;
    margin: 8px 5px;
    padding: 9px 6px;
    border-left: 2px solid var(--q-color-primary);
    line-height: 22px;
    font-size: 16px;
    display: block;
    background-color: #f9f9f9;
    cursor: pointer;
    & > p + p {
      margin-top: 3px;
      font-size: 14px;
    }
    overflow: hidden;
    &:before {
      position: absolute;
      margin-top: 25px;
      right: 0px;
      color: #d6d6d6;
      transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    // &:hover:before {
    //   right: 5px;
    // }
  }
}
.el-menu {
  border-right: 0;
}
.el-menu-item {
  height: 42px;
  line-height: 42px;
  &:hover,
  &:focus {
    color: var(--q-color-primary);
    background-color: transparent;
  }
}
.el-submenu {
  &.is-active {
    ::v-deep .el-submenu__title {
      color: var(--q-color-primary);
    }
  }
  ::v-deep &__title {
    position: relative;
    height: 48px;
    line-height: 48px;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 10px;
      width: calc(100% - 20px);
      height: 1px;
      display: block;
      background-color: #f8f8f8;
    }
    &:focus {
      color: var(--q-color-primary);
    }
  }
}
</style>