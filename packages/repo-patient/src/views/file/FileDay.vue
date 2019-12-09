<template>
  <div class="file-day">
    <!-- 血压 -->
    <div class="card"
         @click="util.goDetail('血压', { ...data.bloodPressureData, familyId , idCard})">
      <div class="card-left">
        <van-image width="35px"
                   height="44px"
                   :src="require('@src/assets/images/file/ic_blood pressure.png')" />
      </div>
      <div class="card-center">
        <template v-if="data.bloodPressureData.id">
          <div>
            <span class="card-value">
              {{ data.bloodPressureData.systolicPressure }}/{{ data.bloodPressureData.diastolicPressure }}
            </span>
            <span class="card-unit">{{ util.getUnit('血压') }}</span>
            <van-tag class="card-tag"
                     :class="{ normal: data.bloodPressureData.resultType === '2', unnormal: data.bloodPressureData.resultType !== '2' }">
              <span class="card-tag-span">{{ data.bloodPressureData.result }}</span>
            </van-tag>
          </div>
          <div>
            <span class="card-time">
              {{ data.bloodPressureData.createdTime && data.bloodPressureData.createdTime.toDate().formatDate('yyyy-MM-dd HH:mm') }}
            </span>
          </div>
        </template>
        <template v-else>
          暂无数据
        </template>
      </div>
      <div class="card-right">
        <van-image width="24"
                   heihgt="24"
                   :src="require('@src/assets/images/file/ic_arrow-right.png')">
        </van-image>
      </div>
    </div>

    <!-- 血糖 -->
    <div class="card"
         @click="util.goDetail('血糖', { ...data.bloodSugarData, familyId , idCard })">
      <div class="card-left">
        <van-image width="35px"
                   height="44px"
                   :src="require('@src/assets/images/file/ic_blood sugar.png')" />
      </div>
      <div class="card-center">
        <template v-if="data.bloodSugarData.id">
          <div>
            <span class="card-value">{{ data.bloodSugarData.bloodSugar }}</span>
            <span class="card-unit">{{ util.getUnit('血糖') }}</span>
            <van-tag class="card-tag"
                     :class="{ normal: data.bloodSugarData.resultType === '2', unnormal: data.bloodSugarData.resultType !== '2' }">
              <span class="card-tag-span">{{ data.bloodSugarData.result }}</span>
            </van-tag>
          </div>
          <div>
            <span class="card-time">
              {{ data.bloodSugarData.createdTime && data.bloodSugarData.createdTime.toDate().formatDate('yyyy-MM-dd HH:mm') }}
              {{ data.bloodSugarData.measureState == 1 ? '空腹血糖': '餐后血糖' }}
            </span>
          </div>
        </template>
        <template v-else>
          暂无数据
        </template>
      </div>
      <div class="card-right">
        <van-image width="24"
                   heihgt="24"
                   :src="require('@src/assets/images/file/ic_arrow-right.png')">
        </van-image>
      </div>
    </div>

    <!-- 血氧 -->
    <div class="card"
         @click="util.goDetail('血氧', { ...data.bloodOxyGenData, familyId , idCard })">
      <div class="card-left">
        <van-image width="35px"
                   height="44px"
                   :src="require('@src/assets/images/file/ic_blood oxygen saturation.png')" />
      </div>
      <div class="card-center">
        <template v-if="data.bloodOxyGenData.id">
          <div>
            <span class="card-value">{{ data.bloodOxyGenData.bloodOxygen }}</span>
            <span class="card-unit">{{ util.getUnit('血氧') }}</span>
            <van-tag class="card-tag"
                     :class="{ normal: data.bloodOxyGenData.resultType === '2', unnormal: data.bloodOxyGenData.resultType !== '2' }">
              <span class="card-tag-span">{{ data.bloodOxyGenData.result }}</span>
            </van-tag>
          </div>
          <div>
            <span class="card-time">
              {{ data.bloodOxyGenData.createdTime && data.bloodOxyGenData.createdTime.toDate().formatDate('yyyy-MM-dd HH:mm') }}
            </span>
          </div>
        </template>
        <template v-else>
          暂无数据
        </template>
      </div>
      <div class="card-right">
        <van-image width="24"
                   heihgt="24"
                   :src="require('@src/assets/images/file/ic_arrow-right.png')">
        </van-image>
      </div>
    </div>

    <!-- 体脂 -->
    <div class="card"
         @click="util.goDetail('体脂', { ...data.bodyFat, familyId , idCard })">
      <div class="card-left">
        <van-image width="44px"
                   height="44px"
                   :src="require('@src/assets/images/file/ic_body fat.png')" />
      </div>
      <div class="card-center">
        <template v-if="data.bodyFat.id">
          <div>
            <span class="card-value">{{ data.bodyFat.bfr }}</span>
            <span class="card-unit">{{ util.getUnit('体脂') }}</span>
            <van-tag class="card-tag"
                     :class="{ normal: data.bodyFat.resultType === '2', unnormal: data.bodyFat.resultType !== '2' }">
              <span class="card-tag-span">{{ data.bodyFat.result }}</span>
            </van-tag>
          </div>
          <div>
            <span class="card-time">
              {{ data.bodyFat.createdTime && data.bodyFat.createdTime.toDate().formatDate('yyyy-MM-dd HH:mm') }}
            </span>
          </div>
        </template>
        <template v-else>
          暂无数据
        </template>
      </div>
      <div class="card-right">
        <van-image width="24"
                   heihgt="24"
                   :src="require('@src/assets/images/file/ic_arrow-right.png')">
        </van-image>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import util from './util'

export default {
  props: {
    familyId: String,
    idCard: String
  },

  data() {
    return {
      util,

      data: {
        bloodPressureData: {},
        bloodSugarData: {},
        bloodOxyGenData: {},
        bodyFat: {}
      }
    }
  },
  watch: {
    familyId: {
      handler() {
        if (this.familyId) {
          this.allHealthList()
        }
      },
      immediate: true
    }
  },
  activated() {
    if (this.familyId) {
      this.allHealthList()
    }
  },

  methods: {
    allHealthList() {
      peace.service.health.allHealthList({ familyId: this.familyId, type: '2' }).then(res => {
        const list = res.data.list

        this.data.bloodPressureData =
          list.find(item => item.healthType === 'bloodPressureData') || {}
        this.data.bloodSugarData = list.find(item => item.healthType === 'bloodSugarData') || {}
        this.data.bloodOxyGenData = list.find(item => item.healthType === 'oxyGenData') || {}
        this.data.bodyFat = list.find(item => item.healthType === 'bodyFat') || {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.file-day {
  height: 100%;
  background: #f9f9f9;
}

.card {
  padding: 12px 0;
  min-height: 90px;
  background: #fff;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;

  .card-left {
    display: flex;
    justify-content: center;
    width: 80px;
  }

  .card-center {
    flex: 1;
  }

  .card-right {
    display: flex;
    justify-content: center;
    width: 60px;
  }

  .card-value {
    font-weight: 600;
    font-size: 24px;
    color: #333333;
  }
  .card-unit {
    font-size: 12px;
    color: #333333;
    margin: 0 4px;
  }
  .card-time {
    font-size: 12px;
    color: #999999;
    line-height: 24px;
  }
  .card-tag {
    padding: 0 8px;
    border-radius: 15px;
    margin: 0 0 0 10px;

    .card-tag-value {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 80px;
      white-space: nowrap;
    }

    &.normal {
      background-color: #f2fffd;
      border: 1px solid $-color--primary;
      color: $-color--primary;
    }
    &.unnormal {
      background-color: #fff7e6;
      border: 1px solid #fa8c16;
      color: #fa8c16;
    }
  }
}
</style>