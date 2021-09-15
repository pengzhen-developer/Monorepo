<template>
  <div class="continer layout">
    <div class="layout-header">
      <el-radio-group v-model="selectIndex">
        <el-radio-button label="out">我发起的</el-radio-button>
        <el-radio-button label="in">发给我的</el-radio-button>
      </el-radio-group>
    </div>

    <div class="layout-content full-width">
      <RecordList :noDataText="noDataText"
                  :request-data="outRequestData"
                  v-slot="item"
                  v-show="selectIndex === 'out'">
        <ConsultRecordCell type="out"
                           :item="item" />
      </RecordList>

      <RecordList :noDataText="noDataText"
                  :request-data="inRequestData"
                  v-slot="item"
                  v-show="selectIndex === 'in'">
        <ConsultRecordCell type="in"
                           :item="item" />
      </RecordList>
    </div>

    <div class="layout-footer full-width"
         v-show="selectIndex === 'out'">
      <q-separator inset
                   class="q-mb-md bg-grey-3" />
      <el-button @click="startConsult"
                 type="primary">发起会诊</el-button>
    </div>
  </div>
</template>

<script>
import RecordList from '../RecordList'
import ConsultRecordCell from './ConsultationRecordListCell'
export default {
  props: {
    params: undefined
  },
  components: {
    RecordList,
    ConsultRecordCell
  },
  data() {
    return {
      selectIndex: 'out',
      outRequestData: {
        request: Peace.service.health.getConsultRecordList,
        data: {
          // 请求列表参数
          action: 'out',
          patientNo: this.params.id
        }
      },
      inRequestData: {
        request: Peace.service.health.getConsultRecordList,
        data: {
          // 请求列表参数
          action: 'in',
          patientNo: this.params.id
        }
      }
    }
  },
  computed: {
    noDataText() {
      return Peace.type.HEALTH_RECORD.EMPTY_TEXT[Peace.type.HEALTH_RECORD.ACTION_TYPE.会诊][this.selectIndex]
    }
  },
  methods: {
    startConsult() {
      Peace.$emit('showDrawer', { index: Peace.type.HEALTH_RECORD.ACTION_TYPE.发起会诊 })
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
