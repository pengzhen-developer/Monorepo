// 复诊续方设置

<template>
  <div>
    <template v-if="isSign">
      <div class="q-ml-md q-mb-md">
        <el-alert type="warning"
                  v-bind:closable="false">
          <div class="flex items-center q-mb-xs">
            <i class="el-alert__icon el-icon-warning q-mr-sm"></i>
            <span class="text-grey-7 text-subtitle2">当前复诊排班信息及预约价格由医院统一安排，您仅可查看医院为您填写的排班信息，不可自主编辑。排班后，复诊复方服务自动开启，且您不可自主关闭。</span>
          </div>
        </el-alert>
      </div>

      <div class="flex q-ml-md q-mb-md">
        <div class="q-mr-lg">
          <span>复诊价格：</span>
        </div>
        <div class="col">
          <div v-for="(service, index) in servicePrice"
               v-bind:key="index"
               class="inline-block bg-grey-2 q-px-md q-py-sm q-mr-lg q-mb-md"
               style="border-radius:4px;">
            <span class="text-bold q-mr-sm">{{ service.titleText }}</span>
            <span class="text-red">{{ service.price }}元</span>
            <span>/次</span>
          </div>
        </div>
      </div>

      <div class="flex q-ml-md q-mb-md">
        <div class="q-mr-lg">
          <span>排班日程：</span>
        </div>
        <div class="col">
          <div class="q-mb-md">
            <PeaceTable border
                        v-bind:data="source">
              <PeaceTableColumn label="">
                <template slot-scope="scope">
                  <p>{{ scope.row.timeText }}</p>
                  <p>{{ scope.row.timeRange }}</p>
                </template>
              </PeaceTableColumn>
              <PeaceTableColumn label="周一"
                                prop="Monday"></PeaceTableColumn>
              <PeaceTableColumn label="周二"
                                prop="Tuesday"></PeaceTableColumn>
              <PeaceTableColumn label="周三"
                                prop="Wednesday"></PeaceTableColumn>
              <PeaceTableColumn label="周四"
                                prop="Thursday"></PeaceTableColumn>
              <PeaceTableColumn label="周五"
                                prop="Friday"></PeaceTableColumn>
              <PeaceTableColumn label="周六"
                                prop="Saturday"></PeaceTableColumn>
              <PeaceTableColumn label="周日"
                                prop="Sunday"></PeaceTableColumn>
            </PeaceTable>
          </div>

          <p class="text-caption text-grey-5 text-right">* 您可以选择使用图文、视频等为患者进行复诊续方</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center q-ml-md q-mb-sm">
        <SignRemind class="full-width"></SignRemind>
      </div>
    </template>
  </div>
</template>

<script>
import SignRemind from './SignRemind'

export default {
  components: {
    SignRemind
  },

  props: {
    data: Object
  },

  data() {
    return {
      source: [],

      timeTextMap: [],
      timeRangeMap: [],
      daynoMap: []
    }
  },

  computed: {
    /** 是否已经签名 */
    isSign() {
      return this.data?.signStatus === 2
    },

    /** 复诊续方价格 */
    servicePrice() {
      return this.data?.servicePrice
    },

    /** 复诊续方时间 */
    schedules() {
      return this.data?.schedules
    }
  },

  watch: {
    data: {
      handler() {
        this.createMap()
        this.createSource()
        this.assginToSource()
      },
      immediate: true
    }
  },

  methods: {
    createMap() {
      this.timeTextMap = {
        [0]: '上午',
        [1]: '下午',
        [2]: '晚上'
      }

      this.timeRangeMap = {
        [0]: this.data?.timeRange?.timeAm,
        [1]: this.data?.timeRange?.timePm,
        [2]: this.data?.timeRange?.timeNm
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
      this.source = []

      for (let index = 0; index < 3; index++) {
        this.source.push({
          timeText: this.timeTextMap[index],
          timeRange: this.timeRangeMap[index],
          Monday: '',
          Tuesday: '',
          Wednesday: '',
          Thursday: '',
          Friday: '',
          Saturday: '',
          Sunday: ''
        })
      }
    },

    assginToSource() {
      this.schedules.forEach((item) => {
        const key = this.daynoMap[item.dayno]
        const index = Object.keys(this.timeTextMap).find((timeTextKey) => this.timeTextMap[timeTextKey] === item.timestr)

        this.source[index][key] = item.sourcesNumber
      })
    }
  }
}
</script>

<style>
</style>