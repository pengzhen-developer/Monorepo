<template>
  <div class="file-all">
    <div class="time-line"
         v-if="data">

      <div class="item"
           v-for="(value, key) in data"
           :key="key">
        <div class="time">
          <div class="m">{{ key.toDate().formatDate('MM-dd') }}</div>
          <div class="y">{{ key.toDate().formatDate('yyyy') }}</div>
        </div>
        <div class="text">
          <div v-for="item in value"
               :key="item.healthType + item.id">
            <!-- 血压 -->
            <template v-if="item.healthType === 'bloodPressuredata'">
              <div class="note card health-item"
                   @click="util.goDetail('血压', item)">
                <div class="health-item-left">
                  <van-image width="35px"
                             height="44px"
                             :src="require('@src/assets/images/file/ic_blood pressure.png')" />
                </div>
                <div class="health-item-right">
                  <span>
                    <span class="card-value">
                      {{ item.systolicPressure }}/{{ item.diastolicPressure }}
                    </span>
                    <span class="card-unit">
                      {{ util.getUnit('血压') }}
                    </span>
                  </span>
                  <van-tag class="card-tag"
                           :class="{ normal: item.resultType === '2', unnormal: item.resultType !== '2' }">
                    {{ item.result }}
                  </van-tag>
                </div>
              </div>
            </template>

            <!-- 血糖 -->
            <template v-if="item.healthType === 'bloodSugarData'">
              <div class="note card health-item"
                   @click="util.goDetail('血糖', item)">
                <div class="health-item-left">
                  <van-image width="35px"
                             height="44px"
                             :src="require('@src/assets/images/file/ic_blood sugar.png')" />
                </div>
                <div class="health-item-right">
                  <span>
                    <span class="card-value">{{ item.bloodSugar }}</span>
                    <span class="card-unit">{{ util.getUnit('血糖') }}</span>
                  </span>
                  <van-tag class="card-tag"
                           :class="{ normal: item.resultType === '2', unnormal: item.resultType !== '2' }">
                    {{ item.result }}
                  </van-tag>
                </div>
              </div>
            </template>

            <!-- 血氧 -->
            <template v-if="item.healthType === 'oxyGenData'">
              <div class="note card health-item"
                   @click="util.goDetail('血氧', item)">
                <div class="health-item-left">
                  <van-image width="35px"
                             height="44px"
                             :src="require('@src/assets/images/file/ic_blood oxygen saturation.png')" />
                </div>
                <div class="health-item-right">
                  <span>
                    <span class="card-value">{{ item.bloodOxygen }}</span>
                    <span class="card-unit">{{ util.getUnit('血氧') }}</span>
                  </span>
                  <van-tag class="card-tag"
                           :class="{ normal: item.resultType === '2', unnormal: item.resultType !== '2' }">
                    {{ item.result }}
                  </van-tag>
                </div>
              </div>
            </template>

            <!-- 体脂 -->
            <template v-if="item.healthType === 'bodyFat'">
              <div class="note card health-item"
                   @click="util.goDetail('体脂', item)">
                <div class="health-item-left">
                  <van-image width="35px"
                             height="44px"
                             :src="require('@src/assets/images/file/ic_body fat.png')" />
                </div>
                <div class="health-item-right">
                  <span>
                    <span class="card-value">{{ item.bfr }}</span>
                    <span class="card-unit">{{ util.getUnit('体脂') }}</span>
                  </span>
                  <van-tag class="card-tag"
                           :class="{ normal: item.resultType === '2', unnormal: item.resultType !== '2' }">
                    {{ item.result }}
                  </van-tag>
                </div>
              </div>
            </template>

            <!-- 病历 -->
            <template v-if="item.healthType === 'case'">
              <div class="note card case"
                   @click="util.goDetail('病历', item)">
                <div class="case-left">
                  <van-image width="35px"
                             height="35px"
                             :src="require('@src/assets/images/file/ic_medical record.png')" />
                </div>
                <div class="case-right">
                  <p style="font-size: 16px; color: #333333; line-height: 32px;">
                    门诊病历
                  </p>
                  <p style="font-size: 12px; color: #999999; line-height: 24px;">
                    {{ item.netHospitalName }} | {{ item.netdeptName }}
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-else
         class="none-page">
      <div class="icon icon_none_source"></div>
      <div class="none-text">暂无</div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import util from './util'

export default {
  props: {
    familyId: String
  },

  data() {
    return {
      util,

      data: undefined
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

  methods: {
    allHealthList() {
      peace.service.health.allHealthList({ familyId: this.familyId, type: '1' }).then(res => {
        const temp = {}

        // 遍历时间
        const timeList = new Set(res.data.list.map(item => item.createdTime))

        timeList.forEach(time => {
          temp[time] = res.data.list.filter(item => item.createdTime === time)
        })

        this.data = temp
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.file-all {
  height: 100%;
  background: #fff;
}

.time-line {
  padding: 15px 5px 0 5px;

  .item {
    &:last-child {
      .text {
        border-left: 2px solid transparent;
      }
    }
  }

  .item {
    display: flex;

    color: #999999;
    font-size: 16px;
    margin: 0 0 10px 0;
  }

  .time {
    padding: 8px 0 0 0;
    width: 60px;
    position: relative;
    text-align: right;

    .y {
      font-size: 12px;
      color: #999999;
    }
    .m {
      font-size: 17px;
      font-weight: 600;
      color: #333333;
    }
  }
  .text {
    padding: 0 10px 0 10px;
    flex: 1;
    min-height: 60px;
  }
}

.card {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 8px 0px 8px 16px;
  margin: 0 0 10px 0;

  .card-value {
    font-size: 20px;
    color: #333333;
  }
  .card-unit {
    font-size: 12px;
    color: #333333;
    margin: 0 8px 0 2px;
  }
  .card-tag {
    padding: 0 8px;
    border-radius: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
    white-space: nowrap;
    position: relative;
    top: 5px;

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

  &.case {
    display: flex;
    align-items: center;

    .case-left {
      width: 50px;
      text-align: left;
    }
    .case-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
    }
  }

  &.health-item {
    display: flex;
    align-items: center;

    .health-item-left {
      display: flex;
      width: 50px;
    }
    .health-item-right {
      flex: 1;
    }
  }
}
</style>