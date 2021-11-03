<template>
  <div v-loading="loading"
       class="record-all">
    <template v-if="healthInfo && healthInfo.length > 0">
      <!-- 全部 -->
      <template v-if="type === '1'">
        <q-infinite-scroll ref="QInfiniteScrollRef"
                           scroll-target=".QInfiniteScrollAllCase"
                           @load="onLoad"
                           :offset="50">
          <div class="QInfiniteScrollAllCase QInfiniteScroll overflow-auto">
            <div :key="health.timeLine"
                 class="time-line"
                 v-for="health in healthInfo">
              <div class="time-line-header">
                <span class="time-line-node"></span>
                <span class="time-line-time">{{ health.timeLine }}</span>
              </div>

              <div class="time-line-content">
                <el-row :gutter="15"
                        type="flex"
                        style="flex-wrap: wrap;">
                  <el-col :key="healthItem.id"
                          :span="8"
                          v-for="healthItem in health.list">
                    <!--                {{healthItem.healthType}}-->
                    <template v-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.病历">
                      <div class="time-line-content-card">
                        <RecordCase :data="healthItem"
                                    :type="type"></RecordCase>
                      </div>
                    </template>

                    <template v-else-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.血压">
                      <div class="time-line-content-card">
                        <RecordBloodPressure :data="healthItem"
                                             :type="type"></RecordBloodPressure>
                      </div>
                    </template>

                    <template v-else-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.血糖">
                      <div class="time-line-content-card">
                        <RecordBloodSugar :data="healthItem"
                                          :type="type"></RecordBloodSugar>
                      </div>
                    </template>

                    <template v-else-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.血氧">
                      <div class="time-line-content-card">
                        <RecordBloodOxygen :data="healthItem"
                                           :type="type"></RecordBloodOxygen>
                      </div>
                    </template>

                    <template v-else-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.体脂">
                      <div class="time-line-content-card">
                        <RecordBodyFat :data="healthItem"
                                       :type="type"></RecordBodyFat>
                      </div>
                    </template>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </q-infinite-scroll>
      </template>

      <!-- 日常检测 -->
      <template v-else-if="type === '2'">
        <div class="time-line-content">
          <el-row :gutter="60">
            <el-col :span="8">
              <!-- 血压 -->
              <div class="time-line-content-card">
                <RecordBloodPressure :data="healthInfo.find((item) => item.healthType === 'bloodPressureData')"
                                     :type="type"></RecordBloodPressure>
              </div>
            </el-col>

            <el-col :span="8">
              <!-- 血糖 -->
              <div class="time-line-content-card">
                <RecordBloodSugar :data="healthInfo.find((item) => item.healthType === 'bloodSugarData')"
                                  :type="type"></RecordBloodSugar>
              </div>
            </el-col>

            <el-col :span="8">
              <!-- 血氧 -->
              <div class="time-line-content-card">
                <RecordBloodOxygen :data="healthInfo.find((item) => item.healthType === 'oxyGenData')"
                                   :type="type"></RecordBloodOxygen>
              </div>
            </el-col>

            <el-col :span="8">
              <!-- 体脂 -->
              <div class="time-line-content-card">
                <RecordBodyFat :data="healthInfo.find((item) => item.healthType === 'bodyFat')"
                               :type="type"></RecordBodyFat>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>

      <!-- 门诊病历 -->
      <template v-else-if="type === '3'">
        <q-infinite-scroll ref="QInfiniteScrollRef"
                           scroll-target=".QInfiniteScrollClinicCase"
                           @load="onLoad"
                           :offset="50">
          <div class="QInfiniteScrollClinicCase QInfiniteScroll overflow-auto">
            <div :key="health.timeLine"
                 class="time-line"
                 v-for="health in healthInfo">
              <div class="time-line-header">
                <span class="time-line-node"></span>
                <span class="time-line-time">{{ health.timeLine }}</span>
              </div>

              <div class="time-line-content">
                <el-row :gutter="15"
                        type="flex"
                        style="flex-wrap: wrap;">
                  <el-col :key="healthItem.id"
                          :span="8"
                          v-for="healthItem in health.list">
                    <!--                {{healthItem.healthType}}-->
                    <template v-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.病历">
                      <div class="time-line-content-card">
                        <RecordCase :data="healthItem"
                                    :type="type"></RecordCase>
                      </div>
                    </template>

                    <template v-else-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.处方">
                      <div class="time-line-content-card">
                        <RecordPrescribe :data="healthItem"
                                         :type="type"></RecordPrescribe>
                      </div>
                    </template>

                    <template v-else-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.血压">
                      <div class="time-line-content-card">
                        <RecordBloodPressure :data="healthItem"
                                             :type="type"></RecordBloodPressure>
                      </div>
                    </template>

                    <template v-else-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.血糖">
                      <div class="time-line-content-card">
                        <RecordBloodSugar :data="healthItem"
                                          :type="type"></RecordBloodSugar>
                      </div>
                    </template>

                    <template v-else-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.血氧">
                      <div class="time-line-content-card">
                        <RecordBloodOxygen :data="healthItem"
                                           :type="type"></RecordBloodOxygen>
                      </div>
                    </template>

                    <template v-else-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.体脂">
                      <div class="time-line-content-card">
                        <RecordBodyFat :data="healthItem"
                                       :type="type"></RecordBodyFat>
                      </div>
                    </template>

                    <template v-else-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.转诊">
                      <div class="time-line-content-card">
                        <RecordReferral :data="healthItem"
                                        :type="type"></RecordReferral>
                      </div>
                    </template>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </q-infinite-scroll>
      </template>

      <!-- 住院病历 -->
      <!-- 体检报告 -->
      <template v-else-if="type === '4' || type === '5'">
        <NoData type="health"></NoData>
      </template>

      <!-- 检验检查 -->
      <template v-else-if="type === '7'">
        <q-infinite-scroll ref="QInfiniteScrollRef"
                           scroll-target=".QInfiniteScrollInspection"
                           @load="onLoad"
                           :offset="50">
          <div class="QInfiniteScrollInspection QInfiniteScroll overflow-auto">
            <div :key="health.timeLine"
                 class="time-line"
                 v-for="health in healthInfo">
              <div class="time-line-header">
                <span class="time-line-node"></span>
                <span class="time-line-time">{{ health.timeLine }}</span>
              </div>

              <div class="time-line-content">
                <el-row :gutter="15"
                        type="flex"
                        style="flex-wrap: wrap;">
                  <el-col :key="healthItem.id"
                          :span="8"
                          v-for="healthItem in health.list">
                    <template v-if="healthItem.checkType === Type.HEALTH.CHECK_TYPE.检验">
                      <div class="time-line-content-card">
                        <RecordInspection :data="healthItem"
                                          :type="type"></RecordInspection>
                      </div>
                    </template>

                    <template v-if="healthItem.checkType === Type.HEALTH.CHECK_TYPE.影像">
                      <div class="time-line-content-card">
                        <RecordPACS :data="healthItem"
                                    :type="type"></RecordPACS>
                      </div>
                    </template>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </q-infinite-scroll>
      </template>

      <!-- 其它 -->
      <template v-else-if="type === '6'">
        <q-infinite-scroll ref="QInfiniteScrollRef"
                           scroll-target=".QInfiniteScrollElse"
                           @load="onLoad"
                           :offset="50">
          <div class="QInfiniteScrollElse QInfiniteScroll overflow-auto">
            <div :key="health.timeLine"
                 class="time-line"
                 v-for="health in healthInfo">
              <div class="time-line-header">
                <span class="time-line-node"></span>
                <span class="time-line-time">{{ health.timeLine }}</span>
              </div>

              <div class="time-line-content">
                <el-row :gutter="15"
                        type="flex"
                        style="flex-wrap: wrap;">
                  <el-col :key="healthItem.id"
                          :span="8"
                          v-for="healthItem in health.list">
                    <template v-if="healthItem.healthType === Type.HEALTH.HEALTH_TYPE.诊疗记录">
                      <div class="time-line-content-card">
                        <RecordFirstOption :data="healthItem"
                                           :type="type"></RecordFirstOption>
                      </div>
                    </template>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </q-infinite-scroll>
      </template>
    </template>

    <template v-else>
      <NoData type="health"></NoData>
    </template>
  </div>
</template>

<script>
import Type from '@src/type'
import RecordCase from './RecordCase.vue'
import RecordBloodPressure from './RecordBloodPressure.vue'
import RecordBloodSugar from './RecordBloodSugar.vue'
import RecordBloodOxygen from './RecordBloodOxygen.vue'
import RecordBodyFat from './RecordBodyFat.vue'
import RecordInspection from './RecordInspection.vue'
import RecordPACS from './RecordPACS.vue'
import RecordFirstOption from './RecordFirstOption.vue'
import NoData from '@src/views/components/NoData.vue'
import Service from './../service/index.js'

export default {
  props: {
    id: String,
    type: String
  },

  components: {
    RecordCase,
    RecordBloodPressure,
    RecordBloodSugar,
    RecordBloodOxygen,
    RecordBodyFat,
    RecordInspection,
    RecordPACS,
    RecordFirstOption,
    NoData
  },

  data() {
    return {
      Type,
      loading: false,

      p: 1,
      size: 20,

      healthInfoTemp: [],

      healthInfo: []
    }
  },

  created() {
    this.get().then(() => {
      const qInfiniteScroll = this.$el.querySelector('.QInfiniteScroll')

      if (qInfiniteScroll) {
        const rect = qInfiniteScroll.getBoundingClientRect()

        qInfiniteScroll.style.height = document.body.clientHeight - rect.top - 35 + 'px'
      }
    })
  },

  methods: {
    onLoad(index, done) {
      this.p = this.p + 1

      this.get().then((res) => {
        done()

        if (this.healthInfoTemp.length >= res.data.total) {
          this.$refs.QInfiniteScrollRef.stop()
        }
      })
    },

    get() {
      this.loading = true
      const params = { patientNo: this.id, type: this.type, p: this.p, size: this.size }

      return Service.getAllHealthList(params).then((res) => {
        // 格式化时间线
        if (this.type === '1' || this.type === '3' || this.type === '6') {
          this.healthInfoTemp = this.healthInfoTemp.concat(res.data.list)

          const data = []

          const time = Array.from(new Set(this.healthInfoTemp.map((item) => item.measureTime)))

          time.forEach((item) => {
            const list = this.healthInfoTemp.filter((temp) => temp.measureTime === item)

            data.push({
              timeLine: item,
              list: list
            })
          })

          this.healthInfo = data
        }
        // 格式化时间线
        else if (this.type === '7') {
          this.healthInfoTemp = this.healthInfoTemp.concat(res.data.list)

          const data = []

          const time = Array.from(new Set(this.healthInfoTemp.map((item) => item.createdTime)))

          time.forEach((item) => {
            const list = this.healthInfoTemp.filter((temp) => temp.createdTime === item)

            data.push({
              timeLine: item,
              list: list
            })
          })

          this.healthInfo = data
        } else {
          this.healthInfo = res.data.list
        }

        this.loading = false

        return res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.record-all {
  .time-line {
    margin: 0 0 15px 0;

    .time-line-header {
      display: flex;
      align-items: center;
      margin: 0 0 10px 0;

      .time-line-node {
        width: 5px;
        height: 5px;
        background: #3099a6;
        border-radius: 50%;
        margin: 0 20px 0 0;
      }

      .time-line-time {
        color: rgba(153, 153, 153, 1);
      }
    }
  }

  .time-line-content {
    padding: 0 10px;

    .time-line-content-card {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
      border-radius: 4px;
      margin: 0 0 20px 0;
    }
  }
}
</style>
