<template>
  <div class="file-blood-detail">
    <div class="file-blood-detail-header">
      <p class="header-text">收缩压（{{ util.getUnit('血压') }}）</p>

      <div class="header-input">
        <div class="custom-value">
          <van-icon :name="require('@src/assets/images/file/ic_prev.png')"
                    @click="() => { model.systolicPressure = model.systolicPressure <= 0 ? 0 : model.systolicPressure - 1 }">
          </van-icon>
          <span class="text">{{ model.systolicPressure }}</span>
          <van-icon :name="require('@src/assets/images/file/ic_next.png')"
                    @click="() => { model.systolicPressure = model.systolicPressure >= 229 ? 229 : model.systolicPressure + 1 }">
          </van-icon>
        </div>

        <peace-ruler key="1"
                     v-model="model.systolicPressure"
                     :min='0'
                     :max="229"></peace-ruler>
      </div>
    </div>

    <div class="file-blood-detail-header">
      <p class="header-text">舒张压（{{ util.getUnit('血压') }}）</p>

      <div class="header-input">
        <div class="custom-value">
          <van-icon :name="require('@src/assets/images/file/ic_prev.png')"
                    @click="() => { model.diastolicPressure = model.diastolicPressure <= 0 ? 0 : model.diastolicPressure - 1 }">
          </van-icon>
          <span class="text">{{ model.diastolicPressure }}</span>
          <van-icon :name="require('@src/assets/images/file/ic_next.png')"
                    @click="() => { model.diastolicPressure = model.diastolicPressure >= 229 ? 229 : model.diastolicPressure + 1 }">
          </van-icon>
        </div>

        <peace-ruler key="2"
                     v-model="model.diastolicPressure"
                     :min='0'
                     :max="229"></peace-ruler>
      </div>
    </div>
    <div class="file-blood-detail-content">
      <van-cell-group>
        <van-cell @click="rateShow = true"
                  is-link
                  :value="selectRate? (model.pulseRate + '次/分'):'请选择'"
                  title="脉率（选填）" />
        <van-popup v-model="rateShow"
                   position="bottom">
          <van-picker :columns="rateArr"
                      show-toolbar
                      :default-index="model.pulseRate"
                      @confirm="onRateConfirm"
                      @cancel="v => rateShow = false" />
        </van-popup>

        <van-cell @click="show = true"
                  is-link
                  title="测量时间"
                  :value="model.measureTime.toDate().formatDate('yyyy-MM-dd HH:mm')"></van-cell>
        <van-popup v-model="show"
                   position="bottom">
          <van-datetime-picker v-model="currentDate"
                               type="datetime"
                               @confirm="confirm"
                               :max-date="maxDate"
                               :min-date="minDate"
                               @cancel="show = false" />
        </van-popup>
      </van-cell-group>
    </div>

    <div class="file-blood-detail-control">
      <van-button @click="save"
                  round
                  type="primary"
                  size="large">保存</van-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import util from './util'
import Vue from 'vue'
import { Picker } from 'vant'
Vue.use(Picker)

export default {
  mounted() {
    let lastData = this.$peace.cache.get('bloodPressureLastData') || ''
    if (lastData) {
      this.model.systolicPressure = lastData.systolicPressure
      this.model.diastolicPressure = lastData.diastolicPressure
      this.model.pulseRate = lastData.pulseRate == '' ? 60 : Number(lastData.pulseRate)
    }
    this.minDate = this.getMinDay()
    for (let i = 0; i <= 220; i++) {
      this.rateArr.push(i)
    }
  },
  data() {
    return {
      util,
      maxDate: new Date(),
      minDate: null,
      rateArr: [],
      show: false,
      rateShow: false,
      selectRate: false,
      model: {
        systolicPressure: 120,
        diastolicPressure: 60,
        pulseRate: 60,
        measureTime: new Date()
      },

      currentDate: new Date()
    }
  },

  methods: {
    getMinDay() {
      let today = new Date()
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      today.setMilliseconds(0)
      return today
    },
    onRateConfirm(value) {
      this.rateShow = false
      this.selectRate = true
      this.model.pulseRate = value
    },
    confirm() {
      this.show = false
      this.model.measureTime = this.currentDate
    },

    save() {
      const json = peace.util.decode(this.$route.params.json)
      const params = peace.util.deepClone(this.model)
      params.measureTime = params.measureTime.formatTime()
      params.idCard = json.idCard
      params.familyId = json.familyId
      if (!this.selectRate) {
        params.pulseRate = ''
      }
      peace.service.health.addBloodPressure(params).then((res) => {
        peace.util.alert(res.msg)

        const params = $peace.util.decode($peace.$route.params.json)
        params.dataId = res.data
        const json = $peace.util.encode(params)

        $peace.$router.replace(`/file/fileBloodPressureDetail/${json}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;

  &.column {
    flex-direction: column;
  }
  &.between {
    justify-content: space-between;
  }
  &.around {
    justify-content: space-around;
  }
  &.center {
    justify-content: center;
  }
}

.file-blood-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fafafa;

  .file-blood-detail-header {
    height: 190px;
    margin: 0 0 10px 0;
    background: linear-gradient(56deg, rgba(2, 211, 183, 1) 0%, rgba(104, 208, 225, 1) 100%);

    &.normal {
      background: linear-gradient(56deg, rgba(2, 211, 183, 1) 0%, rgba(104, 208, 225, 1) 100%);
    }

    .header-text {
      padding: 10px 0 0 15px;
      font-size: 20px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }

    .header-input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 150px;

      .custom-value {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0 10px 0;

        .van-icon {
          font-size: 24px;
          color: #fff;
        }

        .text {
          font-size: 40px;
          color: #fff;
          margin: 0 40px;
        }
      }
    }
  }

  .file-blood-detail-content {
    flex: 1;

    /deep/ .van-field__control {
      text-align: right;
      color: #969799;
    }
  }

  .file-blood-detail-control {
    height: 60px;
    padding: 0 10px;
  }
}
</style>
