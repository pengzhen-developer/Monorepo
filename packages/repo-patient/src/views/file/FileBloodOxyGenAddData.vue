<template>
  <div class="file-blood-detail">
    <div class="file-blood-detail-header">
      <p class="header-text">血氧（{{ util.getUnit('血氧') }}）</p>

      <div class="header-input">
        <div class="custom-value">
          <van-icon :name="require('@src/assets/images/file/ic_prev.png')"
                    @click="() => { model.bloodOxygen = model.bloodOxygen <= 70 ? 70 : model.bloodOxygen - 1 }">
          </van-icon>
          <span class="text">{{ model.bloodOxygen }}</span>
          <van-icon :name="require('@src/assets/images/file/ic_next.png')"
                    @click="() => { model.bloodOxygen = model.bloodOxygen >= 100 ? 100 : model.bloodOxygen + 1 }">
          </van-icon>
        </div>

        <peace-ruler key="1"
                     v-model="model.bloodOxygen"
                     :min='70'
                     :max="100"></peace-ruler>
      </div>
    </div>

    <div class="file-blood-detail-content">
      <van-cell-group>
        <van-cell @click="rateShow = true"
                  is-link
                  :value="model.pulseRate + '次/分'"
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
                               :max-date="maxDate"
                               :min-date="minDate"
                               @confirm="confirm"
                               @cancel="show = false" />
        </van-popup>
      </van-cell-group>
    </div>

    <div class="file-blood-detail-control">
      <van-button @click="save"
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
    let lastData = this.$peace.cache.get('bloodOxyGenLastData') || ''
    if (lastData) {
      this.model.bloodOxygen = lastData.bloodOxygen
      this.model.pulseRate = Number(lastData.pulseRate)
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
      rateShow: false,
      show: false,
      model: {
        bloodOxygen: 99,
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
      // console.log('rateShowwwwwwwwwww', this.rateShow)
      // debugger
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

      peace.service.health.addBloodOxygendata(params).then(res => {
        peace.util.alert(res.msg)

        const params = $peace.util.decode($peace.$route.params.json)
        params.dataId = res.data
        const json = $peace.util.encode(params)

        $peace.$router.replace(`/file/FileBloodOxyGenDetail/${json}`)
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
