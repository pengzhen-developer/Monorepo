<template>
  <div class="layout-route">
    <div class="card">
      <div class="q-mb-lg">
        <div class="flex items-baseline q-mb-lg">
          <div class="tag text-subtitle1 text-weight-medium flex items-center">在线咨询</div>
          <div class="text-grey-5 text-caption q-mr-lg">（开通在线咨询服务后，患者可向您进行健康咨询，咨询期间不可开具处方）</div>
        </div>

        <InquirySetting v-if="inquriyService"
                        v-bind:data="inquriyService"
                        v-on:success="get"></InquirySetting>
      </div>

      <div class="q-my-lg divider"></div>

      <div class="q-mb-lg">
        <div class="flex items-baseline q-mb-lg">
          <div class="tag text-subtitle1 text-weight-medium flex items-center">复诊续方</div>
          <div class="text-grey-5 text-caption">（医院开通复诊续方服务并为您排班后，患者可预约向您复诊续方，您可为符合条件的患者开具处方）</div>
        </div>

        <InquiryAgainSetting v-if="inquriyAgainService"
                             v-bind:data="inquriyAgainService"
                             v-on:success="get"></InquiryAgainSetting>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './service'

import InquirySetting from './components/InquirySetting'
import InquiryAgainSetting from './components/InquiryAgainSetting'

export default {
  components: {
    InquirySetting,
    InquiryAgainSetting
  },

  data() {
    return {
      serviceList: {}
    }
  },

  computed: {
    inquriyService() {
      return this.serviceList?.inquiry ?? undefined
    },

    inquriyAgainService() {
      return this.serviceList?.returnVisit ?? undefined
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      this.getServiceList().then((res) => {
        this.serviceList = res.data
      })
    },

    getServiceList() {
      return Service.getServiceList()
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 16px;
    border-radius: 4px;
    margin: 0 8px 0 0;
    background: $--color-primary;
  }
}

.divider {
  border-top: 4px dashed #e5e5e5;
  transform: scaleY(0.25);
}
</style>