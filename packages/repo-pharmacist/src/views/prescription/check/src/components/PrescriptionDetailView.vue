<template>
  <div v-loading="loading"
       class="q-pb-24">
    <div class="header-style row">
      <div class="row">
        <div class="q-mr-xs">自动刷新</div>
        <el-switch v-model="autoRefresh"
                   active-value="0"
                   inactive-value="1"></el-switch>
      </div>
      <div class="row cursor-pointer"
           v-on:click="showUnCheckList"
           v-if="notCheckedCount>0">
        <div>未审处方</div>
        <div class="num-style">{{notCheckedCount}}</div>
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
                    v-bind:width="inputWidth">

          <div class="template-style">
            <template v-if="templateList.length>0">
              <div v-for="(item) in templateList"
                   v-bind:key="item.templateCode"
                   class=" template-item"
                   v-on:click="getTemplateValue(item.templateContent)">
                {{item.templateContent}}
              </div>
            </template>
            <div v-else>暂无审方模板可引用</div>
          </div>

          <peace-input placeholder="质疑或审核不通过时，需输入原因"
                       class="input"
                       type="textarea"
                       slot="reference"
                       v-model="Note"
                       resize="none"
                       v-bind:autosize="{
                           minRows: 3, maxRows: 6
                        }"></peace-input>

        </el-popover>
      </div>
    </div>

    <div class="flex justify-center full-width q-pt-36">
      <el-button type="primary"
                 v-on:click="operatePre(2)"
                 v-if="[0, 1, 4].includes(prescriptionInfo.Prescription)">通过</el-button>
      <el-button v-on:click="operatePre(1)"
                 class="zy-style"
                 v-if="[0, 1, 4].includes(prescriptionInfo.Prescription)">质疑</el-button>
      <el-button v-on:click="operatePre(3)"
                 class="noPass-style"
                 v-if="[0, 1, 4].includes(prescriptionInfo.Prescription)">不通过</el-button>
      <el-button v-on:click="getNextPre">下一张</el-button>
    </div>

    <!-- 未审列表弹框 -->
    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="listDialog.visible"
                 title="未审处方"
                 v-if="listDialog.visible"
                 append-to-body
                 width="1280px">
      <UnCheckList v-on:close="closeDialog"
                   v-on:onGetPreNo="getPreNo"></UnCheckList>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from '../service'
import Observable from '../../observable'
import PrescriptionDetail from '@views/prescription/prescription-detail'
import UnCheckList from './UnCheckList.vue'
export default {
  data() {
    return {
      autoRefresh: '0',
      prescriptionInfo: {},
      Note: '',
      loading: false,
      listDialog: {
        visible: false
      },
      templateList: [],

      inputWidth: 0
    }
  },
  computed: {
    jztClaimNo() {
      return Observable.state.jztClaimNo
    },

    forceUpdate() {
      return Observable.state.forceUpdate
    },
    notCheckedCount() {
      return Observable.state.notCheckedCount
    }
  },
  watch: {
    forceUpdate(value) {
      if (value) {
        this.getPrescriptionInfo()
      }
    },

    jztClaimNo: {
      handler: function(val, oldVal) {
        if (val !== oldVal && val) {
          this.getPrescriptionInfo()
        }
      },
      immediate: true
    }
  },
  components: {
    PrescriptionDetail,
    UnCheckList
  },
  async created() {
    const userinfo = await Peace.identity.auth.getAccountInfo()
    this.organCode = userinfo.organCode
    this.getAuditingTemplatesList()
  },

  mounted() {
    this.$nextTick().then(() => {
      this.inputWidth = this.$el.querySelector('.input').clientWidth

      window.onresize = () => {
        this.inputWidth = this.$el.querySelector('.input').clientWidth
      }
    })
  },

  methods: {
    //处方信息
    getPrescriptionInfo() {
      this.loading = true
      Service.getPrescriptionInfo({ jztClaimNo: this.jztClaimNo })
        .then((res) => {
          this.prescriptionInfo = Object.assign({}, res.data)
          this.Note = ''
          Observable.mutations.forceUpdate(false)
        })
        .finally(() => {
          this.loading = false
        })
    },
    getAuditingTemplatesList() {
      const params = {
        organCode: this.organCode
      }
      Service.getAuditingTemplatesList(params).then((res) => {
        this.templateList = res.data.list.list
      })
    },
    showUnCheckList() {
      this.listDialog.visible = true
    },
    getTemplateValue(item) {
      this.Note += item
    },
    closeDialog() {
      this.listDialog.visible = false
    },
    operatePre(type) {
      if (type === 1 || type === 3) {
        if (!this.Note) {
          return Peace.util.error('请填写药师审核意见')
        }
      }

      let array = [
        { type: 2, value: '通过' },
        { type: 1, value: '质疑' },
        { type: 3, value: '不通过' }
      ]
      const message = array.filter((item) => type === item.type)[0].value
      this.$confirm(`是否确定${message}该处方`, '提示')
        .then(() => {
          const params = {
            Note: this.Note,
            type: type,
            JZTClaimNo: this.jztClaimNo
          }
          Service.queryPrescription(params).then(() => {
            if (this.autoRefresh === '0') {
              Peace.util.success('操作成功')
              this.getNextPre()
            } else {
              Observable.mutations.forceUpdate(true)
            }
          })
        })
        .catch(() => {})
    },
    getNextPre() {
      Service.nextPrescription({ jztClaimNo: this.jztClaimNo }).then((res) => {
        if (res.data.jztClaimNo !== '' && res.data.jztClaimNo !== null) {
          Observable.mutations.changeJztClaimNo(res.data.jztClaimNo)
          Observable.mutations.changeNotCheckedCount(res.data.notCheckedCount)
        } else {
          Observable.mutations.changeView(Observable.constants.view.NODATA)
          this.$emit('onFreshGetPre')
        }
      })
    },
    getPreNo(No) {
      this.currentJztClaimNo = No
      this.getPrescriptionInfo(this.currentJztClaimNo)
      this.$emit('onFreshPre', this.currentJztClaimNo)
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
  line-height: 25px;
  cursor: pointer;
  word-break: break-all;
}
.template-item:hover {
  background: #e2e2e2;
}
.noPass-style {
  border-color: #ff3a30;
  color: #ff3a30 !important;
}
.noPass-style:hover,
.noPass-style:focus {
  background: rgba(255, 58, 48, 0.1);
}

.zy-style {
  border-color: #ffa00c;
  color: #ffa00c !important;
}
.zy-style:hover,
.zy-style:focus {
  background: rgba(255, 160, 12, 0.1);
}
</style>