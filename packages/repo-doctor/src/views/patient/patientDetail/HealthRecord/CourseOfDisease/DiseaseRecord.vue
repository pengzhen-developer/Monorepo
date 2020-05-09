<template>
  <div class="layout fit">
    <div class="layout-content q-ml-lg">
      <div class="row items-center q-mb-md">
        <div class="bg-primary q-mr-sm" style="width: 4px; height:16px"></div>

        <span style="line-height: 22px; font-size: 16px">患者基本信息</span>
      </div>

      <div class="row items-baseline">
        <div class="col-2.5">
          <span class="span-width">标签</span>
          <span>：</span>
        </div>

        <div class="row items-baseline col-9 no-wrap">
          <div class="q-mr-sm">
            <span v-show="model.labelList.length === 0" class="text-primary">添加标签</span>

            <el-tag
              v-for="(item, index) in model.labelList"
              v-bind:key="index.toString() + item.toString()"
              type="info"
              size="small"
              class="q-mr-sm q-mb-sm"
              >{{ item }}</el-tag
            >
          </div>

          <el-button type="text" icon="el-icon-circle-plus" v-on:click="addLabel"></el-button>
        </div>
      </div>

      <div class="row items-baseline">
        <div class="col-2.5">
          <span class="span-width">诊断</span>
          <span>：</span>
        </div>

        <div class="row items-baseline col-9 no-wrap">
          <div class="q-mr-sm">
            <span v-show="model.diagnoseList.length === 0" class="text-primary">添加诊断</span>

            <el-tag
              v-for="(item, index) in model.diagnoseList"
              v-bind:key="index.toString() + item.toString()"
              type="info"
              size="small"
              class="q-mr-sm q-mb-sm"
              >{{ item }}</el-tag
            >
          </div>
          <el-button type="text" icon="el-icon-circle-plus" v-on:click="addDiagnose"> </el-button>
        </div>
      </div>

      <div
        class="row q-mb-md"
        v-bind:class="{ flexBaseLine: !action.isEditDisease, focusMarginTop: action.isEditDisease }"
      >
        <div class="col-2.5">
          <span class="span-width">基本病情</span>
          <span>：</span>
        </div>

        <el-input
          ref="diseaseInput"
          v-show="action.isEditDisease"
          v-model.trim="model.diseaseDescription"
          v-on:blur="endEditDisease"
          maxlength="150"
          show-word-limit
          rows="7"
          type="textarea"
          class="col-9"
        ></el-input>

        <div class="row items-baseline col-8 no-wrap" v-show="!action.isEditDisease">
          <div class="row items-baseline no-wrap">
            <span
              v-show="!action.isEditDisease && model.diseaseDescription.length === 0"
              class="text-primary"
              >填写病情</span
            >
            <span
              class="col-grow q-mr-sm"
              style="word-break: break-all"
              v-show="!action.isEditDisease"
              >{{ model.diseaseDescription }}</span
            >
            <el-button
              v-show="!action.isEditDisease"
              type="text"
              icon="el-icon-edit"
              v-on:click="addDisease"
            ></el-button>
          </div>
        </div>
      </div>

      <q-separator class="q-my-sm bg-grey-3" style="height: 1px" />

      <div class="q-my-md">
        <div class="row items-center justify-between q-mb-md">
          <div class="row items-center">
            <div class="bg-primary q-mr-sm" style="width: 4px; height:16px"></div>
            <span style="line-height: 22px; font-size: 16px">患者病程</span>
          </div>
          <el-button type="text" class="sort-Text" v-on:click="ascDisease"
            >{{ action.isAsc ? '最新病程优先' : '最早病程优先' }}
            <el-image
              class="asc_image"
              v-bind:class="[action.isAsc ? 'ascTran' : 'descTran']"
              v-bind:src="ascImage"
              alt=""
          /></el-button>
        </div>

        <RecordList noDataText="暂未为该患者添加病程记录" :request-data="requestData" v-slot="item">
          <DiseaseRecordListCell :item="item"></DiseaseRecordListCell>
        </RecordList>
      </div>
      <el-backtop class="q-mr-xl q-mb-xl" target=".layout-content"></el-backtop>
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
import DiseaseRecordListCell from './DiseaseRecordListCell'

export default {
  name: 'DiseaseRecord',
  props: {
    params: undefined
  },
  data() {
    return {
      model: {
        labelList: ['enxi', 'baba', 'cccc', '基本病情', '基本', '基本病情'],
        diagnoseList: [],
        diseaseDescription: '',
        infoList: []
      },
      action: {
        isEditDisease: false,
        isAsc: true
      },
      requestData: {
        request: peace.service.health.getPatientInquiryList,
        data: {
          // 请求列表参数
          tag: 'inquiry',
          patientNo: this.params.id
        }
      },
      ascImage: require('@src/assets/images/health-record/health_Records_Disease_Asc.png')
    }
  },
  components: {
    RecordList,
    DiseaseRecordListCell
  },
  methods: {
    addLabel() {},
    addDiagnose() {},
    addDisease() {
      this.action.isEditDisease = true
      this.$nextTick(() => {
        this.$refs.diseaseInput.$el.children[0].focus()
      })
    },
    endEditDisease() {
      this.action.isEditDisease = false
    },
    ascDisease() {
      this.action.isAsc = !this.action.isAsc
    },
    sendMessage() {}
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;

  .flexBaseLine {
    align-items: baseline;
  }

  .focusMarginTop {
    margin-top: 10px;
  }

  .span-width {
    width: 4em;
    display: inline-block;
    text-align-last: justify;
    color: rgba(96, 98, 102, 1);
  }

  .layout-content {
    flex: 1;
    overflow: auto;
    overflow-x: hidden;

    .sort-Text {
      font-weight: 500;
      font-size: 12px;
      color: $--color-text-regular;
    }

    .asc_image {
      width: 16px;
      height: 13px;
    }

    .ascTran {
      transition: all 0.4s;
    }

    .descTran {
      transform: rotate(-180deg);
      transition: all 0.4s;
    }

    /deep/ .list {
      margin: 0;
    }
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
