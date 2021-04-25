<template>
  <div class="flex full-width">
    <div class="layout-route full-width">
      <div class="bg-white full-height q-pa-lg"
           v-show="Visible">
        <div class="q-mb-lg">
          <el-button class="q-mb-lg"
                     v-on:click="back"
                     style="padding:1px 4px">
            <div class="q-px-md q-py-sm">
              <i class="el-icon-arrow-left"></i>
              <span>返回上一页</span>
            </div>
          </el-button>
        </div>

        <!-- 查看详情 -->
        <AbnormalDetail v-bind:data="currentData"
                        v-bind:dictdata="source"></AbnormalDetail>
      </div>

      <!-- 列表 -->
      <div v-show="!Visible">
        <AbnormalList v-bind:dictdata="source"></AbnormalList>
      </div>
    </div>
  </div>
</template>

<script>
import AbnormalDetail from './components/AbnormalDetail'
import AbnormalList from './components/AbnormalList'

export default {
  name: 'AbnormalMonitoring',
  components: {
    AbnormalDetail,
    AbnormalList
  },
  provide() {
    return {
      provideData: this.getdata
    }
  },
  data() {
    return {
      Visible: false,
      currentData: {
        bizCode: '',
        bizType: ''
      },
      source: {
        bizTypeDict: [],
        synSysDict: [],
        synStatusDict: [],
        synModeDict: []
      }
    }
  },
  async created() {
    this.source.bizTypeDict = await Peace.identity.dictionary.getList('biz_type')
    this.source.synSysDict = await Peace.identity.dictionary.getList('sysdocking')
    this.source.synStatusDict = await Peace.identity.dictionary.getList('syn_status')
    this.source.synModeDict = await Peace.identity.dictionary.getList('syn_mode')
  },
  methods: {
    getdata(data) {
      this.currentData = data
      this.Visible = true
    },
    back() {
      this.Visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.table-status {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-status-text {
  margin-right: 10px;
}
</style>