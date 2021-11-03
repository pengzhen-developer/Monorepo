<template>
  <div class="layout">
    <div class="layout-content full-width">
      <RecordList :noDataText="noDataText"
                  :request-data="inquiryRequestData"
                  v-slot="item">
        <InquiryRecordListCell :item="item" />
      </RecordList>
    </div>
  </div>
</template>

<script>
import Type from '@src/type'
import RecordList from '../RecordList.vue'
import InquiryRecordListCell from './InquiryRecordListCell.vue'
import Service from './../../../service/index.js'

export default {
  name: 'InquiryRecord',
  props: {
    params: undefined
  },
  components: {
    RecordList,
    InquiryRecordListCell
  },
  data() {
    return {
      inquiryRequestData: {
        request: Service.getPatientInquiryList,
        data: {
          // 请求列表参数
          tag: 'inquiry',
          patientNo: this.params.id
        }
      }
    }
  },
  computed: {
    noDataText() {
      return Type.HEALTH_RECORD.EMPTY_TEXT[Type.HEALTH_RECORD.ACTION_TYPE.咨询][this.selectIndex]
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  /*align-items: center;*/

  .layout-header {
    text-align: center;
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
