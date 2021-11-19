<template>
  <div v-loading="loading">
    <div class="header-style row">
      <div class="row">
        <div class="q-mr-xs">自动刷新</div>
        <el-switch v-model="autoRefresh"
                   active-value="0"
                   inactive-value="1"></el-switch>
      </div>
      <div class="row cursor-pointer"
           v-on:click="showUnCheckList">
        <div>未审处方</div>
        <div class="num-style"
             v-if="notCheckedCount">{{notCheckedCount}}</div>
        <div v-else>:0</div>
      </div>
    </div>

    <!-- 处方详情 -->
    <PrescriptionDetail v-bind:prescriptionInfo="prescriptionInfo"></PrescriptionDetail>

    <!-- 药师审核意见 -->
    <div class="q-px-24">
      <p class="q-mb-8">药师审核意见：</p>
      <div class="q-pr-28">
        <el-popover placement="bottom"
                    trigger="click"
                    width="600">

          <div class="template-style">
            <div v-for="(item) in new Array(4).fill().map((item, index) => { return { label: `xx-${index}`, value: index } })"
                 v-bind:key="item.value"
                 class="q-mb-8 template-item"
                 v-on:click="getTemplateValue(item)">
              花费的时间开发环境的是飞机迪斯科活动结束访华的精神康复后的数据库很多技术开发和大家说
            </div>
          </div>

          <peace-input placeholder="质疑或审核不通过时，需输入原因"
                       type="textarea"
                       slot="reference"
                       v-model="remark"
                       resize="none"
                       v-bind:autosize="{
                           minRows: 3, maxRows: 6
                        }"></peace-input>

        </el-popover>
      </div>
    </div>

    <div class="flex justify-center full-width q-pt-36">
      <el-button type="primary">通过</el-button>
      <el-button>质疑</el-button>
      <el-button>不通过</el-button>
      <el-button>下一张</el-button>
    </div>

    <!-- 未审列表弹框 -->
    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="listDialog.visible"
                 title="未审处方"
                 v-if="listDialog.visible"
                 append-to-body
                 width="1280px">
      <UnCheckList v-on:close="closeDialog"></UnCheckList>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from '../service'
import PrescriptionDetail from '@views/prescription/prescription-detail'
import UnCheckList from './UnCheckList.vue'
export default {
  data() {
    return {
      autoRefresh: '0',
      prescriptionInfo: {},
      remark: '',
      loading: false,
      listDialog: {
        visible: false
      }
    }
  },
  props: {
    jztClaimNo: String,
    notCheckedCount: Number
  },
  components: {
    PrescriptionDetail,
    UnCheckList
  },
  async created() {
    this.getPrescriptionInfo()

    const userinfo = await Peace.identity.auth.getAccountInfo()
    this.organCode = userinfo.organCode
    this.getAuditingTemplatesList()
  },
  methods: {
    //处方信息
    getPrescriptionInfo() {
      this.loading = true
      Service.getPrescriptionInfo({ jztClaimNo: this.jztClaimNo })
        .then((res) => {
          this.prescriptionInfo = Object.assign({}, res.data)
        })
        .finally(() => {
          this.loading = false
        })
    },
    getAuditingTemplatesList() {
      const params = {
        organCode: this.organCode
      }
      Service.getAuditingTemplatesList(params).then(() => {})
    },
    showUnCheckList() {
      this.listDialog.visible = true
    },
    getTemplateValue(item) {
      alert(item)
    },
    closeDialog() {
      this.listDialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-style {
  padding: 18px 16px 18px 24px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
}

.num-style {
  height: 16px;
  line-height: 16px;
  text-align: center;
  background: #ff3a30;
  position: relative;
  min-width: 16px;
  padding: 0 4px;
  font-size: 12px;
  top: -4px;
  color: #fff;
  border-radius: 12px;
}
.template-style {
  height: 250px;
  padding-right: 8px;
  overflow: hidden;
  overflow-y: auto;
}
.template-style::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.template-style::-webkit-scrollbar-thumb {
  background-color: rgba(51, 51, 51, 0.1);
  border-radius: 8px;
}
.template-style::-webkit-scrollbar-thumb:hover {
  background-color: rgba(51, 51, 51, 0.1);
}
.template-item {
  color: #333;
  cursor: pointer;
}
.template-item:hover {
  background: #e2e2e2;
}
</style>