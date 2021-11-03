<template>
  <div class="layout-route">
    <div class="q-mb-md flex justify-between">
      <div class="text-subtitle1 text-bold">待办事项</div>
      <div class="flex items-center">
        <span class="q-mr-sm">声音提醒</span>
        <el-switch v-model="orderVoiceRemind"
                   v-on:change="changeOrderVoiceRemind"></el-switch>
      </div>
    </div>

    <div class="row q-col-gutter-x-lg q-mb-lg">
      <!-- 在线咨询卡片 -->
      <template v-if="inquiry.status === 1">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <div class="q-mb-sm">
            <span class="text-subtitle2">在线咨询</span>
          </div>
          <div class="card card-green row">
            <div class="row col-6"
                 v-on:click="goInquiry">
              <div class="col-6 flex justify-center items-center">
                <q-icon style="font-size: 48px"
                        v-bind:name="`img:${ require('./assets/img/ic_tape processing@2x.png') }`"></q-icon>
              </div>
              <div class="col-6 flex column justify-center items-center q-pr-xl">
                <span class="text-h4 text-bold q-mb-sm">{{ inquiry.todoProcessCount }}</span>
                <span class="text-subtitle2">待处理患者</span>
              </div>
            </div>
            <div class="card-border-left col-6 flex column">
              <div class="card-border-bottom col flex items-center justify-around q-px-lg"
                   v-on:click="goInquiry">
                <div style="width: 60px">
                  <q-icon style="font-size: 20px"
                          v-bind:name="`img:${ require('./assets/img/ic_wait @2x.png') }`"></q-icon>
                </div>
                <div class="text-subtitle2 text-left"
                     style="width: 100px">待接诊</div>
                <div class="col text-h5 text-bold">{{ inquiry.todoReceiveingCount }}</div>
              </div>
              <div class="col flex items-center justify-around q-px-lg"
                   v-on:click="goInquiry">
                <div style="width: 60px">
                  <q-icon style="font-size: 20px"
                          v-bind:name="`img:${ require('./assets/img/ic_ing@2x.png') }`"></q-icon>
                </div>
                <div class="text-subtitle2 text-left"
                     style="width: 100px">问诊中</div>
                <div class="col text-h5 text-bold">{{ inquiry.todoProcessingCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 复诊续方卡片 -->
      <template v-if="returnVisit.status === 1">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <div class="q-mb-sm">
            <span class="text-subtitle2">复诊续方</span>
          </div>

          <div class="card card-orange row">
            <div class="row col-6"
                 v-on:click="goReturnVisit">
              <div class="col-6 flex justify-center items-center">
                <q-icon style="font-size: 48px"
                        v-bind:name="`img:${ require('./assets/img/ic_ing1@2x.png') }`"></q-icon>
              </div>
              <div class="col-6 flex column justify-center items-center q-pr-xl">
                <span class="text-h4 text-bold q-mb-sm">{{ returnVisit.todoProcessCount }}</span>
                <span class="text-subtitle2">待处理患者</span>
              </div>
            </div>
            <div class="card-border-left col-6 flex column">
              <div class="card-border-bottom col flex items-center justify-around q-px-lg"
                   v-on:click="goReturnVisit">
                <div style="width: 60px">
                  <q-icon style="font-size: 20px"
                          v-bind:name="`img:${ require('./assets/img/ic_wait @2x.png') }`"></q-icon>
                </div>
                <div class="text-subtitle2 text-left"
                     style="width: 100px">待接诊</div>
                <div class="col text-h5 text-bold">{{ returnVisit.todoReceiveingCount }}</div>
              </div>
              <div class="card-border-bottom col flex items-center justify-around q-px-lg"
                   v-on:click="goReturnVisit">
                <div style="width: 60px">
                  <q-icon style="font-size: 20px"
                          v-bind:name="`img:${ require('./assets/img/ic_ing@2x.png') }`"></q-icon>
                </div>
                <div class="text-subtitle2 text-left"
                     style="width: 100px">复诊中</div>
                <div class="col text-h5 text-bold">{{ returnVisit.todoProcessingCount }}</div>
              </div>
              <div class="col flex items-center justify-around q-px-lg"
                   v-on:click="goReturnVisit">
                <div style="width: 60px">
                  <q-icon style="font-size: 20px"
                          v-bind:name="`img:${ require('./assets/img/ic_ing3@2x.png') }`"></q-icon>
                </div>
                <div class="text-subtitle2 text-left"
                     style="width: 100px">复诊预约</div>
                <div class="col text-h5 text-bold text-left">{{ returnVisit.todoReservationCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="row q-col-gutter-x-lg q-mb-lg">
      <div class="col-xs-12 col-sm-6 col-md-3">
        <div class="q-mb-sm">
          <span class="text-subtitle2">质疑处方</span>
        </div>

        <div class="card card-orange row"
             v-on:click="goPrescription({ prescriptionStatus: '2' })">
          <div class="col-6 flex justify-center items-center">
            <q-icon style="font-size: 48px"
                    v-bind:name="`img:${ require('./assets/img/ic_doubt@2x.png') }`"></q-icon>
          </div>
          <div class="col-6 flex column justify-center items-center q-pr-xl">
            <span class="text-h4 text-bold q-mb-sm">{{ queryPrescription.todoPrescriptionCount }}</span>
            <span class="text-subtitle2">质疑中处方</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      orderVoiceRemind: undefined,
      data: {}
    }
  },

  computed: {
    inquiry() {
      return this.data?.inquiry ?? {}
    },

    returnVisit() {
      return this.data?.returnVisit ?? {}
    },

    queryPrescription() {
      return this.data?.queryPrescription ?? {}
    }
  },

  activated() {
    this.initialize()
  },

  created() {
    this.initialize()

    this.intervalId = setInterval(() => {
      this.initialize()
    }, 1000 * 60 * 2)
  },

  destroyed() {
    window.clearInterval(this.intervalId)
  },

  methods: {
    changeOrderVoiceRemind() {
      Service.setBaseConfig({ tag: 'orderVoiceRemind', switch: this.orderVoiceRemind })
    },

    initialize() {
      this.getDashboard()
      this.getBaseConfig()
    },

    getBaseConfig() {
      Service.getBaseConfig({ tag: 'orderVoiceRemind' }).then((res) => {
        this.orderVoiceRemind = res.data.switch
      })
    },

    getDashboard() {
      Service.getDashboard().then((res) => {
        this.data = res.data
      })
    },

    goInquiry() {
      this.$router.push('/clinic/inquiry')
    },

    goReturnVisit() {
      this.$router.push('/clinic/returnVisit')
    },

    goPrescription(params) {
      this.$router.push({ name: 'Prescription', params })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  border-radius: 4px;
  min-height: 130px;

  &.card-green {
    background-image: url('./assets/img/bg_green_high@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #fff;
  }

  &.card-orange {
    background-image: url('./assets/img/bg_orange_high@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #fff;
  }

  &.card-blue {
    background-image: url('./assets/img/bg_blue_high@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #fff;
  }

  &.card-blue-half {
    background-image: url('./assets/img/bg_blue_high_half@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #fff;
  }

  .card-border-left {
    border-left: 1px solid #efefef80;
  }
  .card-border-bottom {
    border-bottom: 1px solid #efefef80;
  }
}
</style>