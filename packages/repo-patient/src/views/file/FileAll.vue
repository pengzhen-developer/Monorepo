<template>
  <div class="file-all">
    <div class="time-line"
         v-if="data">
      <van-list v-model="isLoading"
                :finished="finished"
                @load="allHealthList">
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
              <template v-if="item.healthType === 'bloodPressureData'">
                <div class="note card health-item"
                     @click="util.goDetail('血压', item)">
                  <div class="health-item-left">
                    <van-image class="health-item-left-logo"
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
                      <span class="card-tag-span">{{ item.result }}</span>
                    </van-tag>
                  </div>
                </div>
              </template>

              <!-- 血糖 -->
              <template v-if="item.healthType === 'bloodSugarData'">
                <div class="note card health-item"
                     @click="util.goDetail('血糖', item)">
                  <div class="health-item-left">
                    <van-image class="health-item-left-logo"
                               :src="require('@src/assets/images/file/ic_blood sugar.png')" />
                  </div>
                  <div class="health-item-right">
                    <span>
                      <span class="card-value">{{ item.bloodSugar }}</span>
                      <span class="card-unit">{{ util.getUnit('血糖') }}</span>
                    </span>
                    <van-tag class="card-tag"
                             :class="{ normal: item.resultType === '2', unnormal: item.resultType !== '2' }">
                      <span class="card-tag-span">{{ item.result }}</span>
                    </van-tag>
                  </div>
                </div>
              </template>

              <!-- 血氧 -->
              <template v-if="item.healthType === 'bloodOxygenData'">
                <div class="note card health-item"
                     @click="util.goDetail('血氧', item)">
                  <div class="health-item-left">
                    <van-image class="health-item-left-logo"
                               :src="require('@src/assets/images/file/ic_blood oxygen saturation.png')" />
                  </div>
                  <div class="health-item-right">
                    <span>
                      <span class="card-value">{{ item.bloodOxygen }}</span>
                      <span class="card-unit">{{ util.getUnit('血氧') }}</span>
                    </span>
                    <van-tag class="card-tag"
                             :class="{ normal: item.resultType === '2', unnormal: item.resultType !== '2' }">
                      <span class="card-tag-span">{{ item.result }}</span>
                    </van-tag>
                  </div>
                </div>
              </template>

              <!-- 体脂 -->
              <template v-if="item.healthType === 'bodyFat'">
                <div class="note card health-item"
                     @click="util.goDetail('体脂', item)">
                  <div class="health-item-left">
                    <van-image class="health-item-left-logo"
                               :src="require('@src/assets/images/file/ic_body fat.png')" />
                  </div>
                  <div class="health-item-right">
                    <span>
                      <span class="card-value">{{ item.bfr }}</span>
                      <span class="card-unit">{{ util.getUnit('体脂') }}</span>
                    </span>
                    <van-tag class="card-tag"
                             :class="{ normal: item.resultType === '2', unnormal: item.resultType !== '2' }">
                      <span class="card-tag-span">{{ item.result }}</span>
                    </van-tag>
                  </div>
                </div>
              </template>

              <!-- 病历 -->
              <template v-if="item.healthType === 'case'">
                <div class="note card case"
                     @click="util.goDetail('病历', item)">
                  <div class="case-left">
                    <van-image class="case-left-logo"
                               :src="require('@src/assets/images/file/ic_medical record.png')" />
                  </div>
                  <div class="case-right">
                    <p class="case-right-title">
                      门诊病历
                    </p>
                    <p class="case-right-message">
                      {{ item.netHospitalName }} | {{ item.netDeptName }}
                    </p>
                  </div>
                </div>
              </template>
              <!-- 转诊单 -->
              <template v-if="item.healthType === 'referral'">
                <div class="note card case"
                     @click="util.goDetail('转诊单', item)">
                  <div class="case-left">
                    <van-image class="case-left-logo"
                               :src="require('@src/assets/images/file/ic_zhuanzhen.png')" />
                  </div>
                  <div class="case-right">
                    <p class="case-right-title">
                      转诊单
                    </p>
                    <p class="case-right-message">
                      {{ item.netHospitalName }} | {{ item.netDeptName }}
                    </p>
                  </div>
                </div>
              </template>
              <!-- 会诊单 -->
              <template v-if="item.healthType === 'consult'">
                <div class="note card case"
                     @click="util.goDetail('会诊单', item)">
                  <div class="case-left">
                    <van-image class="case-left-logo"
                               :src="require('@src/assets/images/file/ic_huizhen.png')" />
                    <div class="small-dot"
                         v-if="item.isExistRedDot==1"></div>
                  </div>
                  <div class="case-right">
                    <p class="case-right-title">
                      会诊单
                    </p>
                    <p class="case-right-message">
                      {{ item.netHospitalName }} | {{ item.netDeptName }}
                    </p>
                  </div>
                </div>
              </template>
              <!-- 检验检查 -->
              <template v-if="item.healthType === 'check'">
                <!-- 检查 -->
                <template v-if="item.checkType === 'inspection'">
                  <div class="note card case"
                       @click="util.goDetail('检验检查', item)">
                    <div class="case-left">
                      <van-image class="case-left-logo"
                                 :src="require('@src/assets/images/ic_jianyan.png')" />
                      <div class="small-dot"
                           v-if="item.isExistRedDot==1"></div>
                    </div>
                    <div class="case-right">
                      <p class="case-right-title">
                        {{item.itemName}}
                      </p>
                      <p class="case-right-message">
                        {{ item.netHospitalName }} | {{ item.netDeptName }}
                      </p>
                    </div>
                  </div>
                </template>
                <!-- 影像 -->
                <template v-if="item.checkType === 'pacs'">
                  <div class="note card case"
                       @click="util.goDetail('检验检查', item)">
                    <div class="case-left">
                      <van-image class="case-left-logo"
                                 :src="require('@src/assets/images/ic_yinxiang.png')" />
                      <div class="small-dot"
                           v-if="item.isExistRedDot==1"></div>
                    </div>
                    <div class="case-right">
                      <p class="case-right-title">
                        {{item.itemName}}
                      </p>
                      <p class="case-right-message">
                        {{ item.netHospitalName }} | {{ item.netDeptName }}
                      </p>
                    </div>
                  </div>
                </template>
              </template>

            </div>
          </div>
        </div>
      </van-list>
    </div>

    <div v-if="loaded&&!data"
         class="none-page">
      <div class="icon icon_none_source"></div>
      <div class="none-text">暂无数据</div>
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
      data: undefined,
      p: 0,
      size: 10,
      finished: false,
      isLoading: false,
      loaded: false
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
    this.p = 0
    this.data = undefined
    this.loaded = false
    this.finished = false
    if (this.familyId) {
      this.allHealthList()
    }
  },
  methods: {
    allHealthList() {
      this.p++
      let param = {
        familyId: this.familyId,
        type: '1',
        p: this.p,
        size: this.size
      }
      peace.service.health.allHealthList(param).then((res) => {
        const temp = {}

        // 遍历时间
        const timeList = new Set(res.data.list.map((item) => item.measureTime))
        //拼接familyId
        res.data.list.map((item) => {
          item.familyId = item.familyId || this.familyId
        })
        if (timeList.size) {
          timeList.forEach((time) => {
            temp[time] = res.data.list.filter((item) => item.measureTime === time)
          })

          if (typeof this.data == 'undefined') {
            this.data = temp
          } else {
            for (let key in temp) {
              if (this.data[key]) {
                this.data[key] = this.data[key].concat(temp[key])
              } else {
                this.data[key] = temp[key]
              }
            }
          }
        }
        this.isLoading = false
        this.loaded = true
        if (this.p * this.size >= res.data.total) {
          this.finished = true
        }
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
  border-radius: 5px;
  padding: 8px 0px 8px 16px;
  margin: 0 0 10px 0;
  height: 65px;
  .card-value {
    font-size: 20px;
    color: #333333;
  }
  .card-unit {
    font-size: 12px;
    color: #333333;
    margin: 0 5px 0 2px;
  }
  .card-tag {
    padding: 0 8px;
    border-radius: 15px;
    max-width: 38%;
    .card-tag-span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
    }
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

  &.case {
    display: flex;
    align-items: center;

    .case-left {
      width: 50px;
      text-align: left;
      position: relative;
      .case-left-logo {
        width: 35px;
        height: 35px;
      }
      .small-dot {
        width: 8px;
        height: 8px;
        display: block;
        border-radius: 50%;
        background: #f2223b;
        position: absolute;
        top: -2px;
        left: 31px;
      }
    }
    .case-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      .case-right-title {
        font-size: 16px;
        color: #333333;
        line-height: 32px;
      }
      .case-right-message {
        font-size: 12px;
        color: #999999;
        line-height: 24px;
      }
    }
  }

  &.health-item {
    display: flex;
    align-items: center;

    .health-item-left {
      display: flex;
      width: 50px;
      .health-item-left-logo {
        width: 35px;
        height: 44px;
      }
    }
    .health-item-right {
      flex: 1;
    }
  }
}
</style>