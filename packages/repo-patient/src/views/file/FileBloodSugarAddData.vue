<template>
  <div class="file-blood-detail">
    <div class="file-blood-detail-header">
      <p class="header-text">血糖（{{ util.getUnit('血糖') }}）</p>

      <div class="header-input">
        <div class="custom-value">
          <van-icon :name="require('@src/assets/images/file/ic_prev.png')"
                    @click="() => { model.bloodSugar = model.bloodSugar <= 1.1 ? 1.1 : model.bloodSugar - 0.1}">
          </van-icon>
          <span class="text">{{ model.bloodSugar }}</span>
          <van-icon :name="require('@src/assets/images/file/ic_next.png')"
                    @click="() => { model.bloodSugar = model.bloodSugar >= 33.3 ? 33.3 : model.bloodSugar + 0.1 }">
          </van-icon>
        </div>

        <peace-ruler key="1"
                     v-model="model.bloodSugar"
                     :min='1.1'
                     :max="33.3"
                     :precision="0.1"></peace-ruler>
      </div>
    </div>

    <div class="file-blood-detail-content">
      <van-cell-group>
        <van-cell title="血糖类型">
          <van-radio-group v-model="radio">
            <van-radio name="1">空腹</van-radio>
            <van-radio name="2">餐后</van-radio>
          </van-radio-group>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell @click="show = true"
                  is-link
                  title="测量时间"
                  :value="model.measureTime.toDate().formatDate('yyyy-MM-dd HH:mm')"></van-cell>
        <van-popup v-model="show"
                   position="bottom">
          <van-datetime-picker v-model="currentDate"
                               type="datetime"
                               :max-date="maxDate"
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

export default {
  data() {
    return {
      util,
      radio: '1',
      show: false,
      maxDate: new Date(),
      model: {
        bloodSugar: 5.0,
        measureTime: new Date()
      },

      currentDate: new Date()
    }
  },

  methods: {
    confirm() {
      this.show = false
      this.model.measureTime = this.currentDate
    },

    save() {
      const json = peace.util.decode(this.$route.params.json)
      const params = peace.util.deepClone(this.model)

      params.measureTime = params.measureTime.formatTime()
      params.measureState = parseInt(this.radio)
      params.idCard = json.idCard
      params.familyId = json.familyId

      peace.service.health.addBloodSugar(params).then(res => {
        peace.util.alert(res.msg)

        const params = $peace.util.decode($peace.$route.params.json)
        params.dataId = res.data
        const json = $peace.util.encode(params)

        $peace.$router.replace(`/file/fileBloodSugarDetail/${json}`)
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
  .van-radio-group {
    display: flex;
    .van-radio {
      margin-left: 20px;
    }
  }
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
