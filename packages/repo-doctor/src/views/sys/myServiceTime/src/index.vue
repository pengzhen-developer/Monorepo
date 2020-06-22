<template>
  <div>
    <!-- 复诊续方时间 -->
    <div class="q-mb-lg">
      <div class="q-mb-md">
        <span class="text-subtitle1">复诊续方时间</span>
        <span class="text-subtitle2 text-grey-5">（互联网医院出诊时间）</span>
        <span class="text-amber-8">*医院统一排班，不可编辑</span>
      </div>

      <peace-table border
                   v-bind:data="onlineSchedules">
        <el-table-column label=""
                         align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.timeText }}</p>
            <p>{{ scope.row.timeRange }}</p>
          </template>
        </el-table-column>
        <el-table-column label="周一"
                         align="center"
                         prop="Monday"></el-table-column>
        <el-table-column label="周二"
                         align="center"
                         prop="Tuesday"></el-table-column>
        <el-table-column label="周三"
                         align="center"
                         prop="Wednesday"></el-table-column>
        <el-table-column label="周四"
                         align="center"
                         prop="Thursday"></el-table-column>
        <el-table-column label="周五"
                         align="center"
                         prop="Friday"></el-table-column>
        <el-table-column label="周六"
                         align="center"
                         prop="Saturday"></el-table-column>
        <el-table-column label="周日"
                         align="center"
                         prop="Sunday"></el-table-column>
      </peace-table>
    </div>

    <!-- 线下咨询时间 -->
    <div class="q-mb-lg">
      <div class="q-mb-md">
        <span class="text-subtitle1">线下咨询时间</span>
        <span class="text-subtitle2 text-grey-5">（所在实体医疗机构出诊时间。若医院为医生排了班，医生不可编辑实体机构初诊排班信息。）</span>
        <span class="text-amber-8">*医生自主排班,不支持线上挂号</span>
      </div>

      <p class="q-mb-sm">（温馨提示：点击鼠标勾选出诊时间）</p>

      <peace-table class="q-mb-md"
                   border
                   v-bind:data="offlineSchedules">
        <el-table-column label=""
                         align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.timeText }}</p>
            <p>{{ scope.row.timeRange }}</p>
          </template>
        </el-table-column>
        <el-table-column label="周一"
                         align="center"
                         prop="Monday">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.Monday.checked"
                         v-on:change="changeOfflineSchedules(scope)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="周二"
                         align="center"
                         prop="Tuesday">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.Tuesday.checked"
                         v-on:change="changeOfflineSchedules(scope)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="周三"
                         align="center"
                         prop="Wednesday">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.Wednesday.checked"
                         v-on:change="changeOfflineSchedules(scope)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="周四"
                         align="center"
                         prop="Thursday">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.Thursday.checked"
                         v-on:change="changeOfflineSchedules(scope)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="周五"
                         align="center"
                         prop="Friday">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.Friday.checked"
                         v-on:change="changeOfflineSchedules(scope)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="周六"
                         align="center"
                         prop="Saturday">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.Saturday.checked"
                         v-on:change="changeOfflineSchedules(scope)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="周日"
                         align="center"
                         prop="Sunday">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.Sunday.checked"
                         v-on:change="changeOfflineSchedules(scope)"></el-checkbox>
          </template>
        </el-table-column>
      </peace-table>

      <p class="text-caption text-grey-5 text-right">*患者端可以查看您的出诊时间</p>
    </div>
  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      /** 原始数据 */
      source: {},
      /** 线上排班 */
      onlineSchedules: [],
      /** 线下排班 */
      offlineSchedules: [],

      timeTextMap: [],
      timeOnlineRangeMap: [],
      timeOfflineRangeMap: [],
      daynoMap: []
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.initialize()
    })
  },

  methods: {
    async initialize() {
      await this.getSchedules()

      this.createMap()
      this.createSource()
      this.assginToSource()
    },

    getSchedules() {
      return Service.getSchedules().then((res) => {
        this.source = res.data
      })
    },

    createMap() {
      this.timeTextMap = {
        [0]: '上午',
        [1]: '下午',
        [2]: '晚上'
      }

      this.timeOnlineRangeMap = {
        [0]: this.source?.onlineSchedules?.timeRange?.timeAm,
        [1]: this.source?.onlineSchedules?.timeRange?.timePm,
        [2]: this.source?.onlineSchedules?.timeRange?.timeNm
      }

      this.timeOfflineRangeMap = {
        [0]: this.source?.offlineSchedules?.timeRange?.timeAm,
        [1]: this.source?.offlineSchedules?.timeRange?.timePm,
        [2]: this.source?.offlineSchedules?.timeRange?.timeNm
      }

      this.daynoMap = {
        [1]: 'Monday',
        [2]: 'Tuesday',
        [3]: 'Wednesday',
        [4]: 'Thursday',
        [5]: 'Friday',
        [6]: 'Saturday',
        [7]: 'Sunday'
      }
    },

    createSource() {
      this.onlineSchedules = []
      this.offlineSchedules = []

      for (let index = 0; index < 3; index++) {
        this.onlineSchedules.push({
          timeText: this.timeTextMap[index],
          timeRange: this.timeOnlineRangeMap[index],
          Monday: '',
          Tuesday: '',
          Wednesday: '',
          Thursday: '',
          Friday: '',
          Saturday: '',
          Sunday: ''
        })

        this.offlineSchedules.push({
          timeText: this.timeTextMap[index],
          timeRange: this.timeOfflineRangeMap[index],
          Monday: { checked: false },
          Tuesday: { checked: false },
          Wednesday: { checked: false },
          Thursday: { checked: false },
          Friday: { checked: false },
          Saturday: { checked: false },
          Sunday: { checked: false }
        })
      }
    },

    assginToSource() {
      this.source.onlineSchedules.schedules.forEach((item) => {
        const key = this.daynoMap[item.dayno]
        const index = Object.keys(this.timeTextMap).find((timeTextKey) => this.timeTextMap[timeTextKey] === item.timestr)

        this.onlineSchedules[index][key] = item.sourcesNumber
      })

      this.source.offlineSchedules.schedules.forEach((item) => {
        const key = this.daynoMap[item.dayno]
        const index = Object.keys(this.timeTextMap).find((timeTextKey) => this.timeTextMap[timeTextKey] === item.timestr)

        this.offlineSchedules[index][key] = {
          checked: true,
          timeId: item.timeId
        }
      })
    },

    changeOfflineSchedules(scope) {
      const property = scope.column.property
      const row = scope.row
      const dayNo = Object.keys(this.daynoMap).find((daynoKey) => this.daynoMap[daynoKey] === property)

      const params = {
        timeId: row[property].timeId,
        timeStr: row.timeText,
        dayNo: dayNo
      }

      Service.setOfflineSchedules(params).then((res) => {
        row[property].timeId = res.data.timeId
      })
    }
  }
}
</script>

<style>
</style>