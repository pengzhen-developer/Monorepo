<template>
  <div class="flex full-width">
    <div class="layout-route full-width">
      <template v-if="registerIsOpen === true">
        <div class="card">
          <div class="hd flex justify-between">
            <div><span class="title">{{ info.doctorName }}</span>
              <span class="dept">{{ info.departmentName }}</span>
              <span class="time">{{ info.timeSharing }} {{ info.bookingStart }} -
                {{ info.bookingEnd }}</span>
            </div>
            <div>
              <el-button @click="batchModifySource('close')"
                         type="default">停诊</el-button>
              <el-button @click="batchModifySource('open')"
                         type="default">恢复预约</el-button>
            </div>
          </div>
          <div class="items">
            <div :class="[{'is-disabled': item.bookingState === 2 }, {'is-blue': item.bookingState === 1 }]"
                 :key="item.sourceItemCode"
                 class="item"
                 v-for="item in list">
              <div class="number">{{ item.bookingNumber }}</div>
              <div class="time">{{ item.bookingStart.substr(0, 5) }} -
                {{ item.bookingEnd.substr(0, 5) }}</div>
              <div class="status"
                   v-if="[0, 3].includes(item.bookingState)">
                <span>{{item.bookingState === 3 ? '不':''}}可约</span>
                <el-switch :active-value="0"
                           :inactive-value="3"
                           v-model="item.bookingState"
                           @change="modifySource(item)"></el-switch>
              </div>
              <div class="status"
                   v-else>
                <span>{{ item.bookingState | getEnumLabel(source.ENUM_SOURCE_STATUS) }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="registerIsOpen === false">
        <div class="bg-white full-height q-pa-lg">
          <register-open></register-open>
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
import CONSTANT from './constant'
import Service from './service'
import RegisterOpen from './components/RegisterOpen'

export default {
  name: 'RegisterSourceDetail',
  components: { RegisterOpen },
  data() {
    return {
      registerIsOpen: null,
      info: {},
      list: [],
      sourceDisType: '1',
      source: {
        ENUM_SOURCE_STATUS: CONSTANT.ENUM_SOURCE_STATUS
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  created() {
    this.info = this.$route.query
  },
  async mounted() {
    let checkRegisterOpen = await Service.checkRegisterOpen()
    let register = checkRegisterOpen.data.isOpenRegister
    this.registerIsOpen = register == 2 ? true : false

    if (this.registerIsOpen) {
      this.$nextTick().then(() => {
        this.getInfo()
      })
    }
  },
  async activated() {
    let checkRegisterOpen = await Service.checkRegisterOpen()
    let register = checkRegisterOpen.data.isOpenRegister
    this.registerIsOpen = register == 2 ? true : false

    if (this.registerIsOpen) {
      this.$nextTick().then(() => {
        this.getInfo()
      })
    }
  },
  methods: {
    // 获取号源信息
    getInfo() {
      let params = {
        sourceCode: this.info.sourceCode,
        sourceDisType: this.sourceDisType
      }
      Service.getSourceInfo(params).then((res) => {
        this.list = res.data.list
      })
    },
    // 更新号源
    modifySource(item) {
      let updateSource = () => {
        let params = {
          sourceItemCode: item.sourceItemCode,
          bookingState: item.bookingState
        }
        Service.updateSourceStatus(params).then((res) => {
          Peace.util.success(res.msg)
          this.getInfo()
        })
      }

      // 0.未预约 1.已预约 2.已失效 3.已停止
      if (item.bookingState === 0) {
        updateSource()
      } else {
        this.$confirm(`此操作会停止当前号源，是否继续？`, '提示', { closeOnClickModal: false })
          .then(() => {
            updateSource()
          })
          .catch(() => {
            item.bookingState = 0
          })
      }
    },
    // 批量更新号源
    batchModifySource(type) {
      let updateSource = () => {
        const params = {
          doctorCode: this.info.doctorCode,
          sourceCode: this.info.sourceCode,
          bookingState: type === 'open' ? 0 : 3, // 0.未预约 1.已预约 2.已失效 3.已停止
          sourceDisType: 1 // 0线上1线下
        }
        Service.batchModifySource(params).then((res) => {
          Peace.util.success(res.msg)
          this.getInfo()
        })
      }
      if (type === 'open') {
        updateSource()
      } else {
        this.$confirm(`将对医生进行停诊，是否继续？`, '提示', { closeOnClickModal: false })
          .then(() => {
            updateSource()
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hd {
  padding-bottom: 18px;
  color: #333;
  .title {
    line-height: 28px;
    font-size: 20px;
    font-weight: bold;
    font-weight: 600;
  }
  .dept {
    margin: 0 20px 0 10px;
  }
}
.items {
  margin: 0 -6px;
  width: calc(100% + 12px);
}
.item {
  display: inline-block;
  width: 98px;
  margin: 0 6px 16px 6px;
  padding: 6px 0;
  border: 1px solid #d6d6d6;
  border-radius: 4px 4px 0 0;
  background-color: #ffffff;
  color: #333333;
  text-align: center;
  .number {
    margin-bottom: 2px;
    font-size: 30px;
    font-weight: 300;
    line-height: 42px;
  }
  .time,
  .status {
    margin-top: 6px;
    padding: 0 6px;
    font-size: 14px;
    line-height: 20px;
  }
  .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &.is-disabled {
    background-color: #f5f5f5;
    border: 1px solid #eaeaea;
    color: rgba(58, 58, 58, 0.2);
    .status {
      justify-content: center;
    }
  }
  &.is-blue {
    background-color: #f4fafb;
    border: 1px solid var(--q-color-primary);
    color: var(--q-color-primary);
    .status {
      justify-content: center;
    }
  }
}
</style>