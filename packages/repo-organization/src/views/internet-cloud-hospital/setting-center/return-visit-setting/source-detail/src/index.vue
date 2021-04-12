<template>
  <div class="flex full-width">
    <div class="layout-route full-width">
      <template v-if="returnVisitIsOpen === true">
        <div class="card">
          <div class="hd">
            <span class="title">{{ info.doctorName }}</span>
            <span class="dept">{{ info.departmentName }}</span>
            <span class="time">{{ info.timeSharing }} {{ info.bookingStart }} -
              {{ info.bookingEnd }}</span>
          </div>
          <div class="items">
            <div :class="[{'is-disabled': [2, 3].includes(item.bookingState) }, {'is-blue': item.bookingState === 1 }]"
                 :key="item.sourceItemCode"
                 class="item"
                 v-for="item in list">
              <div class="number">{{ item.bookingNumber }}</div>
              <div class="time">{{ item.bookingStart.substr(0, 5) }} -
                {{ item.bookingEnd.substr(0, 5) }}</div>
              <div class="status"
                   v-if="item.bookingState">
                <span>{{ item.bookingState | getEnumLabel(source.ENUM_SOURCE_STATUS) }}</span>
              </div>
              <div class="status"
                   v-else>
                <span>可约：</span>
                <el-switch :active-value="0"
                           :inactive-value="1"
                           :value="item.isLock || 0"
                           @change="handleChange(item)"></el-switch>
              </div>
            </div>
          </div>
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
import CONSTANT from './constant'
import Service from './service'
import ReturnVisitOpen from './components/ReturnVisitOpen'

export default {
  name: 'ReturnVisitSourceDetail',
  components: { ReturnVisitOpen },
  data() {
    return {
      returnVisitIsOpen: null,
      info: {},
      list: [],
      sourceDisType: '0',
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
    console.log(this.$route)
    this.info = this.$route.query
  },
  async mounted() {
    let checkReturnVisitOpen = await Service.checkReturnVisitOpen()
    let returnVisitList = checkReturnVisitOpen.data.list
    this.returnVisitIsOpen = returnVisitList.isOpen == 1 ? true : false

    if (this.returnVisitIsOpen) {
      this.$nextTick().then(() => {
        this.getInfo()
      })
    }
  },
  async activated() {
    let checkReturnVisitOpen = await Service.checkReturnVisitOpen()
    let returnVisitList = checkReturnVisitOpen.data.list
    this.returnVisitIsOpen = returnVisitList.isOpen == 1 ? true : false

    if (this.returnVisitIsOpen) {
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
        const data = res.data

        this.list = data.list
      })
    },
    handleChange(item) {
      item.isLock = !item.isLock
      let params = {
        sourceItemCode: item.sourceItemCode,
        bookingState: 3
      }
      Service.updateSourceStatus(params).then(() => {
        this.getInfo()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hd {
  padding-bottom: 24px;
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
  margin: 0 6px;
  margin-bottom: 12px;
  width: 97px;
  padding: 8px 0;
  text-align: center;
  border: 1px solid #f2f2f2;
  border-radius: 4px;
  background-color: #f9f9f9;
  display: inline-block;
  &.is-disabled {
    .number,
    .time,
    .status {
      color: #d6d6d6;
    }
  }
  &.is-blue {
    background-color: #d8f6f3;
    .number,
    .time,
    .status {
      color: var(--q-color-primary);
    }
  }
  .number {
    font-size: 30px;
    font-weight: 300;
    line-height: 42px;
    color: #333;
  }
  .time,
  .status {
    margin-top: 6px;
    font-size: 12px;
  }
}
</style>