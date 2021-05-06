<template>
  <div>
    <template v-if="!isEdit">
      <div>
        <div class="title">机构名称</div>
        <div class="subtitle">北辰医院/智药云</div>
      </div>
      <el-divider></el-divider>
      <div>
        <div class="title">接口回调配置 <i class=" zyy-icon zyy-xiugai2 text-primary q-ml-6"
             @click="isEdit=true"></i>
        </div>
        <div class="subtitle">处方状态变更</div>
        <div class="subtitle">订单状态变更</div>
        <div class="txt">{{orderStatusTxt}}</div>
      </div>
    </template>
    <template v-else>
      <CallbackSystemModel :type="'edit'"
                           :info='info'
                           @onCancelEdit="isEdit=false"
                           @onSaveEdit="getInfo" />
    </template>
  </div>
</template>

<script>
import CallbackSystemModel from './CallbackSystemModel'
export default {
  name: 'CallbackSystemDetail',
  components: { CallbackSystemModel },
  props: {
    info: Object
  },
  data() {
    return {
      isEdit: false,
      source: {
        orgList: [],
        preStatus: [
          { label: '订单已接单状态', value: 1, checked: true },
          { label: '订单已发货状态', value: 2, checked: true },
          { label: '订单已签收状态', value: 3, checked: true },
          { label: '订单已自提状态', value: 4, checked: true },
          { label: '订单已完成状态', value: 5, checked: true },
          { label: '订单已取消状态', value: 6, checked: false },
          { label: '物流记录详情', value: 7, checked: false },
          { label: '发货批号、效期详情', value: 8, checked: false }
        ]
      }
    }
  },
  computed: {
    orderStatusTxt() {
      return this.source.preStatus
        .filter((item) => item.checked == true)
        .map((item) => item.label)
        .join('、')
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getInfo()
    })
  },
  methods: {
    getInfo() {}
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 20px 0;
  background: #e9e9e9;
}
.title {
  position: relative;
  padding-left: 12px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 24px;
  margin-bottom: 24px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 22px;
    background: var(--q-color-primary);
    border-radius: 2px;
  }
}
.subtitle {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
  &:not(:first-child) {
    margin-top: 12px;
  }
}
.txt {
  background: #f9f9f9;
  padding: 6px 8px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.6);
  line-height: 20px;
  margin-top: 8px;
}
</style>