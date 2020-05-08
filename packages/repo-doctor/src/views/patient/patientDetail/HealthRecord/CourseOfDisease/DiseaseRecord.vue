<template>
  <div class="layout fit">
    <div class="q-mx-lg">
      <div class="row items-center q-mb-md">
        <div class="bg-primary q-mr-sm" style="width: 4px; height:16px"></div>
        <span style="line-height: 22px; font-size: 16px">患者基本信息</span>
      </div>
      <div class="row q-mb-md">
        <span class="span-width">标签</span>
        <span>：</span>
      </div>
      <div class="row  q-mb-md">
        <span class="span-width">诊断</span>
        <span>：</span>
      </div>
      <div class="row  q-mb-md">
        <span class="span-width">基本病情</span>
        <span>：</span>
      </div>
      <q-separator class="q-mb-sm bg-grey-3" style="height: 1px" />
    </div>
    <div class="layout-content q-mx-lg q-mt-md">
      <div class="row items-center">
        <div class="bg-primary q-mr-sm" style="width: 4px; height:16px"></div>
        <span style="line-height: 22px; font-size: 16px">患者病程</span>
      </div>
      <RecordList noDataText="暂未为该患者添加病程记录" :request-data="requestData" v-slot="item">
        <div :item="item"></div>
      </RecordList>
    </div>
    <div class="layout-footer full-width">
      <q-separator inset class="q-mb-sm bg-grey-3" />
      <div class="text-center q-mt-md">
        <el-button class="btn rounded-borders" v-bind:click="addDisease">添加病程</el-button>
        <el-button class="btn rounded-borders" v-bind:click="sendMessage">发送信息</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import RecordList from '../RecordList'
import peace from '@src/library'
export default {
  name: 'DiseaseRecord',
  props: {
    params: undefined
  },
  data() {
    return {
      requestData: {
        request: peace.service.health.getPatientInquiryList,
        data: {
          // 请求列表参数
          tag: 'follow',
          patientNo: this.params.id
        }
      }
    }
  },
  components: {
    RecordList
  },
  methods: {
    addDisease() {},
    sendMessage() {}
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;

  .span-width {
    width: 4em;
    display: inline-block;
    text-align-last: justify;
    color: rgba(96, 98, 102, 1);
  }

  .layout-content {
    flex: 1;
  }

  .layout-footer {
    height: 59px;
    .btn {
      border-color: $--color-primary;
      color: $--color-primary;
      padding: 0 42px;
      height: 28px;

      &:nth-child(1) {
        margin-right: 30px;
      }
    }
  }
}
</style>
