<template>
  <div class="consultation-session">
    <div class="header">
      <div class="header-left">
        <span>{{ getConsultStatus() }}</span>
      </div>
      <div class="header-right">
        <el-button type="text"
                   @click="overConsultation"
                   v-if="$store.getters['consultation/consultInfo'].receiveDoctor[0].doctorId === $store.state.user.userInfo.list.docInfo.doctor_id && 
                         $store.getters['consultation/consultInfo'].consultStatus === Peace.type.CONSULTATION.CONSULTATION_STATUS.会诊中">
          结束会诊</el-button>
      </div>
    </div>

    <div class="content">
      <el-alert :closable="false"
                class="message-notify"
                style="height: auto;"
                show-icon
                title="请尽快发起视频会诊"
                type="warning"
                v-if="$store.getters['consultation/consultInfo'].consultStatus === Peace.type.CONSULTATION.CONSULTATION_STATUS.等待会诊">
        <span style="color: rgba(102,102,102,1); font-size: 12px; background: rgba(255,170,0,1) rgba(255,255,255,0.9); ">
          <span>会诊期望时间为 </span>
          <span style="color: #FFAA00"> {{ $store.getters['consultation/consultInfo'].expectTime }} </span>
          <span>，</span>
          <span>若未及时会诊，本次会诊将在</span>
          <span style="color: #FFAA00"> {{ $store.getters['consultation/consultInfo'].auditTime.toDate().proDate('{%d+7}').formatTime() }} </span>
          <span>自动关闭</span>
        </span>
      </el-alert>

      <el-alert :closable="false"
                class="message-notify"
                show-icon
                title
                type="warning"
                v-if="$store.getters['consultation/consultInfo'].receiveDoctor[0].doctorId === $store.state.user.userInfo.list.docInfo.doctor_id &&
                      $store.getters['consultation/consultInfo'].consultStatus === Peace.type.CONSULTATION.CONSULTATION_STATUS.会诊中">
        <div slot="title"
             style="color: rgba(102,102,102,1); font-size: 12px; background: rgba(255,170,0,1) rgba(255,255,255,0.9); ">
          <span>
            <span>本次会诊将在</span>
            <span style="color: #FFAA00"> {{ $store.getters['consultation/consultInfo'].auditTime.toDate().proDate('{%d+7}').formatTime() }} </span>
            <span>自动关闭，请及时填写会诊小结</span>
          </span>
        </div>
      </el-alert>

      <!-- 写病历 -->
      <ConsultationSessionCase v-if="consultationAction === Peace.type.INQUIRY.INQUIRY_ACTION.发病历"
                               v-bind:session="this.$store.state.consultation.session"
                               v-on:close="resetAction">
      </ConsultationSessionCase>

      <!-- 写处方 -->
      <ConsultationSessionRecipe v-else-if="consultationAction === Peace.type.INQUIRY.INQUIRY_ACTION.发处方"
                                 v-bind:session="this.$store.state.consultation.session"
                                 v-bind:cacheKey="this.$store.state.consultation.session.content.consultInfo.consultNo"
                                 v-on:close="resetAction">
      </ConsultationSessionRecipe>

      <template v-else>
        <div class="message-list">
          <el-scrollbar class="message-list-scrollbar">
            <ConsultationSessionMessageList></ConsultationSessionMessageList>
          </el-scrollbar>
        </div>

        <div class="message-input">
          <!-- 待接诊 -->
          <ConsultationSessionReceive v-if="$store.getters['consultation/consultInfo'].consultStatus === Peace.type.CONSULTATION.CONSULTATION_STATUS.医生待审核">
          </ConsultationSessionReceive>
          <!-- 问诊中 -->
          <ConsultationSessionMessageInput ref="ConsultationSessionMessageInput"
                                           v-if="$store.getters['consultation/consultInfo'].consultStatus === Peace.type.CONSULTATION.CONSULTATION_STATUS.会诊中 || 
                                                 $store.getters['consultation/consultInfo'].consultStatus === Peace.type.CONSULTATION.CONSULTATION_STATUS.等待会诊 ">
          </ConsultationSessionMessageInput>
        </div>
      </template>
    </div>

    <peace-dialog :visible.sync="dialog.visible"
                  title="会诊详情"
                  width="550px">
      <TheConsultationDetail :data="dialog.data"
                             @close="() => dialog.visible = false">
      </TheConsultationDetail>
    </peace-dialog>
  </div>
</template>

<script>
import ConsultationSessionCase from './ConsultationSessionCase'
import ConsultationSessionRecipe from './ConsultationSessionRecipe'
import ConsultationSessionReceive from './ConsultationSessionReceive'

import ConsultationSessionMessageList from './ConsultationSessionMessageList'
import ConsultationSessionMessageInput from './ConsultationSessionMessageInput'

import TheConsultationDetail from '@src/views/components/consultation/ConsultationDetail'

export default {
  components: {
    ConsultationSessionCase,
    ConsultationSessionRecipe,
    ConsultationSessionReceive,
    ConsultationSessionMessageList,
    ConsultationSessionMessageInput,

    TheConsultationDetail
  },

  data() {
    return {
      consultationAction: '',

      tips: '',
      tipsSource: '',
      tipsForConsult: '',

      dialog: {
        visible: false,
        data: {}
      }
    }
  },

  activated() {
    this.checkStatus(this.$store.state.consultation.session)
  },

  watch: {
    '$store.state.consultation.session'(val) {
      this.checkStatus(val)
    }
  },

  created() {
    this.checkStatus(this.$store.state.consultation.session)

    // 在 consultation/index.vue 的组件实例上挂载所有子组件间监听方法
    Peace.consultationComponent.$on(Peace.type.INQUIRY.INQUIRY_ACTION.发病历, this.sendCase)
    Peace.consultationComponent.$on(Peace.type.INQUIRY.INQUIRY_ACTION.发处方, this.sendRecipe)

    Peace.consultationComponent.$on(Peace.type.INQUIRY.INQUIRY_ACTION.重置操作, this.resetAction)
  },

  methods: {
    getConsultStatus() {
      return Object.keys(Peace.type.CONSULTATION.CONSULTATION_STATUS).find(
        (key) => Peace.type.CONSULTATION.CONSULTATION_STATUS[key] === this.$store.getters['consultation/consultInfo'].consultStatus
      )
    },

    sendCase() {
      this.consultationAction = Peace.type.INQUIRY.INQUIRY_ACTION.发病历
    },

    sendRecipe() {
      this.consultationAction = Peace.type.INQUIRY.INQUIRY_ACTION.发处方
    },

    resetAction() {
      this.consultationAction = ''
    },

    overConsultation() {
      if (!this.$store.getters['consultation/consultInfo'].isCommit) {
        Peace.util.confirm('尚未填写会诊小结，去填写？', undefined, undefined, () => {
          this.$refs.ConsultationSessionMessageInput.sendConsultSuggest()
        })
      } else {
        Peace.util.confirm('确定要结束会诊吗？', undefined, undefined, () => {
          const params = {
            consultNo: this.$store.getters['consultation/consultInfo'].consultNo
          }

          Peace.service.consult.overConsult(params).then(() => {
            Peace.util.success('会诊已完成，感谢您的辛苦付出')
          })
        })
      }
    },

    checkStatus(session) {
      this.tipsSource = ''
      this.tips = ''

      if (session && session.id) {
        // 判断是否存在未完成的会诊编号
        Peace.service.consult.getConsultNo().then((res) => {
          // 存在正在进行中的会诊，并且选中的不是当前正在会诊中的会诊
          if (res.data.consultNo && res.data.teamId && res.data.consultNo !== session.content.consultInfo.consultNo) {
            Peace.service.consult.getInfoByTeamId({ teamIdList: [res.data.teamId] }).then((consult) => {
              const doctorId = this.$store.state.user.userInfo.list.docInfo.doctor_id

              consult.data.list.forEach((item) => {
                const startDoctor = item.consultInfo.startDoctor
                const receiveDoctor = item.consultInfo.receiveDoctor

                // 当前人是发起方？
                if (startDoctor.filter((temp) => temp.doctorId === doctorId).length > 0) {
                  this.tipsSource = 'start'
                  this.tips = '您正在与' + receiveDoctor.map((item) => item.doctorName).join(',') + '医生进行会诊，无法开启新的会诊'
                  this.tipsForConsult = res.data
                }
                // 当前人是发起方？
                else if (receiveDoctor.filter((temp) => temp.doctorId === doctorId).length > 0) {
                  this.tipsSource = 'receive'
                  this.tips = '您正在与' + startDoctor.map((item) => item.doctorName).join(',') + '医生进行会诊，无法开启新的会诊，是否立即关闭？'
                  this.tipsForConsult = res.data
                }
              })
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$--header-height: 50px;
$--control-height: 200px;

.consultation-session {
  height: 100%;
  overflow: auto;

  .header {
    height: $--header-height;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    border-bottom: 1px solid #f2f2f2;
    background: #f9f9f9;

    .header-left {
      padding: 0 20px;
      display: flex;
      align-items: center;

      h4 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .header-right {
      display: flex;
      justify-content: center;
      align-items: center;

      margin: 0 10px 0 0;

      h4 {
        margin: 0 20px 0 0;
        font-size: 18px;
        font-weight: 400;
        color: rgba(0, 198, 174, 1);
      }
    }
  }

  .content {
    height: calc(100% - #{$--header-height});

    .message-notify {
      height: auto;
    }

    .message-list {
      flex: 1;
      height: calc(100% - #{$--control-height} - 60px);

      .message-list-scrollbar {
        height: 100%;
      }
    }

    .message-input {
      height: $--control-height;
      min-height: $--control-height;
    }
  }
}

.over-dialog {
  /deep/ .el-dialog__header {
    display: none;
  }

  /deep/ .el-dialog__body {
    padding: 20px;
  }
}
</style>

