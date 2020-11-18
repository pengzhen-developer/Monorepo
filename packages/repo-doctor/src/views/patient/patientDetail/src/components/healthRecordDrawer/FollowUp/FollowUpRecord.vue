<template>
  <div class="continer layout">
    <div class="layout-header">
      <el-radio-group v-model="selectIndex">
        <el-radio-button label="out">随访方案</el-radio-button>
        <el-radio-button label="in">随访记录</el-radio-button>
      </el-radio-group>
    </div>
    <div class="layout-content full-width">
      <RecordList :noDataText="noDataText"
                  v-slot="item"
                  v-show="selectIndex === 'out'">
        <FollowUpRecordListCell :item="item" />
      </RecordList>
      <RecordList :noDataText="noDataText"
                  v-slot="item"
                  v-show="selectIndex === 'in'">
        <FollowUpRecordListCell :item="item" />
      </RecordList>
    </div>
    <div class="layout-footer full-width">
      <q-separator inset
                   class="q-mb-md bg-grey-3" />
      <el-button @click="addFollowUp"
                 type="primary">添加随访方案 </el-button>
    </div>
  </div>
</template>

<script>
import RecordList from '../RecordList'
import FollowUpRecordListCell from './FollowUpRecordListCell'

export default {
  name: 'FollowUpRecord',
  props: {
    params: undefined
  },
  components: {
    RecordList,
    FollowUpRecordListCell
  },
  data() {
    return {
      selectIndex: 'out'
    }
  },
  computed: {
    noDataText() {
      return Peace.type.HEALTH_RECORD.EMPTY_TEXT[Peace.type.HEALTH_RECORD.ACTION_TYPE.随访][this.selectIndex]
    }
  },
  methods: {
    addFollowUp() {
      Peace.$emit('showDrawer', { index: Peace.type.HEALTH_RECORD.ACTION_TYPE.添加随访方案 })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;

  .layout-header {
    margin: 0 0 16px 0;
  }

  .layout-content {
    flex: 1;
    overflow: auto;

    margin: 0 0 16px 0;
  }

  .layout-footer {
    margin: 0 0 16px 0;
    text-align: center;
  }
}
</style>
