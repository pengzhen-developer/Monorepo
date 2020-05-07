<template>
  <div class="continer layout">
    <div class="layout-header">
      <el-radio-group v-model="selectIndex">
        <el-radio-button label="out">我发起的</el-radio-button>
        <el-radio-button label="in">发给我的</el-radio-button>
      </el-radio-group>
    </div>

    <div class="layout-content">
      <div class="page">
        <RecordList
          :noDataText="noDataText"
          :request-data="outRequestData"
          v-slot="item"
          v-show="selectIndex === 'out'"
        >
          <ConsultRecordCell type="out" :item="item" />
        </RecordList>
        <RecordList
          :noDataText="noDataText"
          :request-data="inRequestData"
          v-slot="item"
          v-show="selectIndex === 'in'"
        >
          <ConsultRecordCell type="in" :item="item" />
        </RecordList>
      </div>
    </div>

    <div class="layout-footer" v-show="selectIndex === 'out'">
      <div id="line"></div>
      <el-button @click="startConsult" type="primary">发起会诊</el-button>
    </div>
  </div>
</template>

<script>
import peace from "@src/library";
import RecordList from "../RecordList";
import ConsultRecordCell from "./ConsultRecordListCell";
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
      selectIndex: "out",
      outRequestData: {
        request: peace.service.health.getConsultRecordList,
        data: {
          // 请求列表参数
          action: "out",
          patientNo: this.params.id
        }
      },
      inRequestData: {
        request: peace.service.health.getConsultRecordList,
        data: {
          // 请求列表参数
          action: "out",
          patientNo: this.params.id
        }
      }
    };
  },
  computed: {
    noDataText() {
      return peace.type.HEALTH_RECORD.EMPTY_TEXT[
        peace.type.HEALTH_RECORD.ACTION_TYPE.会诊
      ][this.selectIndex];
    }
  },
  methods: {
    startConsult() {
      $peace.$emit("showDrawer", peace.type.HEALTH_RECORD.ACTION_TYPE.发起会诊);
    }
  }
};
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
  }
}
</style>
