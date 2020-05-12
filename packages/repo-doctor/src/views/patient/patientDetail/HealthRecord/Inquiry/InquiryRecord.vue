<template>
  <div class="layout">
    <div class="layout-header">
      <el-radio-group v-model="selectIndex">
        <el-radio-button label="inquiry">患者咨询</el-radio-button>
        <el-radio-button label="followUp">我的问询</el-radio-button>
      </el-radio-group>
    </div>

    <div class="layout-content full-width">
      <RecordList :noDataText="noDataText"
                  :request-data="inquiryRequestData"
                  v-slot="item"
                  v-show="selectIndex === 'inquiry'">
        <InquiryRecordListCell :item="item" />
      </RecordList>
      <RecordList :noDataText="noDataText"
                  :request-data="followRequestData"
                  v-slot="item"
                  v-show="selectIndex === 'followUp'">
        <FollowRecordListCell :item="item" />
      </RecordList>
    </div>

    <div class="layout-footer full-width"
         v-show="selectIndex === 'inquiry'">
      <q-separator inset
                   class="q-mb-md bg-grey-3" />
      <el-button @click="sendMessage"
                 type="primary">发送信息 </el-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import RecordList from '../RecordList'
import InquiryRecordListCell from './InquiryRecordListCell'
import FollowRecordListCell from './FollowRecordListCell'
export default {
  name: 'InquiryRecord',
  props: {
    params: undefined
  },
  components: {
    RecordList,
    InquiryRecordListCell,
    FollowRecordListCell
  },
  data() {
    return {
      selectIndex: 'inquiry',
      inquiryRequestData: {
        request: peace.service.health.getPatientInquiryList,
        data: {
          // 请求列表参数
          tag: 'inquiry',
          patientNo: this.params.id
        }
      },
      followRequestData: {
        request: peace.service.health.getPatientInquiryList,
        data: {
          // 请求列表参数
          tag: 'follow',
          patientNo: this.params.id
        }
      }
    }
  },
  computed: {
    noDataText() {
      return peace.type.HEALTH_RECORD.EMPTY_TEXT[peace.type.HEALTH_RECORD.ACTION_TYPE.咨询][this.selectIndex]
    }
  },
  methods: {
    sendMessage() {
      peace.util.info('暂未开通')
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
