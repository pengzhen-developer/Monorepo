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
                         $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.会诊中">
          结束会诊</el-button>
      </div>
    </div>

    <div class="content">
      <el-alert :closable="false"
                class="message-notify"
                show-icon
                title
                type="warning"
                v-if="$store.getters['consultation/consultInfo'].receiveDoctor[0].doctorId === $store.state.user.userInfo.list.docInfo.doctor_id">
        <div slot="title"
             style="color: rgba(102,102,102,1); font-size: 12px; background: rgba(255,170,0,1) rgba(255,255,255,0.9); ">
          <span>
            <span>视频结束后请填写</span>
            <span style="font-weight: bold; ">【会诊意见】</span>
          </span>
        </div>
      </el-alert>

      <!-- 写病历 -->
      <ConsultationSessionCase v-if="consultationAction === $peace.type.INQUIRY.INQUIRY_ACTION.发病历">
      </ConsultationSessionCase>

      <!-- 写处方 -->
      <ConsultationSessionRecipe v-else-if="consultationAction === $peace.type.INQUIRY.INQUIRY_ACTION.发处方">
      </ConsultationSessionRecipe>

      <template v-else>
        <div class="message-list">
          <el-scrollbar class="message-list-scrollbar">
            <ConsultationSessionMessageList></ConsultationSessionMessageList>
          </el-scrollbar>
        </div>

        <div class="message-input">
          <!-- 待接诊 -->
          <ConsultationSessionReceive v-if="$store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.医生待审核">
          </ConsultationSessionReceive>
          <!-- 问诊中 -->
          <ConsultationSessionMessageInput ref="ConsultationSessionMessageInput"
                                           v-if="$store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.会诊中 || 
                                                 $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.等待会诊 ">
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
import peace from '@src/library'

import ConsultationSessionCase from './ConsultationSessionCase'
import ConsultationSessionRecipe from './ConsultationSessionRecipe'
import ConsultationSessionReceive from './ConsultationSessionReceive'

import ConsultationSessionMessageList from './ConsultationSessionMessageList'
import ConsultationSessionMessageInput from './ConsultationSessionMessageInput'

import TheConsultationDetail from '@src/views/record/consultation/TheConsultationDetail'

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
    $peace.consultationComponent.$on(peace.type.INQUIRY.INQUIRY_ACTION.发病历, this.sendCase)
    $peace.consultationComponent.$on(peace.type.INQUIRY.INQUIRY_ACTION.发处方, this.sendRecipe)

    $peace.consultationComponent.$on(peace.type.INQUIRY.INQUIRY_ACTION.重置操作, this.resetAction)
  },

  methods: {
    getConsultStatus() {
      return Object.keys(peace.type.CONSULTATION.CONSULTATION_STATUS).find(
        key =>
          peace.type.CONSULTATION.CONSULTATION_STATUS[key] ===
          this.$store.getters['consultation/consultInfo'].consultStatus
      )
    },

    sendCase() {
      this.consultationAction = peace.type.INQUIRY.INQUIRY_ACTION.发病历
    },

    sendRecipe() {
      this.consultationAction = peace.type.INQUIRY.INQUIRY_ACTION.发处方
    },

    resetAction() {
      this.consultationAction = ''
    },

    sendVideo() {
      $peace.videoComponent.sendVideo()
    },

    overConsultation() {
      if (!this.$store.getters['consultation/consultInfo'].isCommit) {
        $peace.util.confirm('尚未填写会诊小结，去填写？', undefined, undefined, () => {
          this.$refs.ConsultationSessionMessageInput.sendConsultSuggest()
        })
      } else {
        $peace.util.confirm('确定要结束会诊吗？', undefined, undefined, () => {
          const params = {
            consultNo: this.$store.getters['consultation/consultInfo'].consultNo
          }

          peace.service.consult.overConsult(params).then(() => {
            $peace.util.alert('会诊已完成，感谢您的辛苦付出')
          })
        })
      }
    },

    checkStatus(session) {
      this.tipsSource = ''
      this.tips = ''

      if (session && session.id) {
        // 判断是否存在未完成的会诊编号
        peace.service.consult.getConsultNo().then(res => {
          // 存在正在进行中的会诊，并且选中的不是当前正在会诊中的会诊
          if (res.data.consultNo && res.data.teamId && res.data.consultNo !== session.content.consultInfo.consultNo) {
            peace.service.consult.getInfoByTeamId({ teamIdList: [res.data.teamId] }).then(consult => {
              const doctorId = this.$store.state.user.userInfo.list.docInfo.doctor_id

              consult.data.list.forEach(item => {
                const startDoctor = item.consultInfo.startDoctor
                const receiveDoctor = item.consultInfo.receiveDoctor

                // 当前人是发起方？
                if (startDoctor.filter(temp => temp.doctorId === doctorId).length > 0) {
                  this.tipsSource = 'start'
                  this.tips =
                    '您正在与' + receiveDoctor.map(item => item.doctorName).join(',') + '医生进行会诊，无法开启新的会诊'
                  this.tipsForConsult = res.data
                }
                // 当前人是发起方？
                else if (receiveDoctor.filter(temp => temp.doctorId === doctorId).length > 0) {
                  this.tipsSource = 'receive'
                  this.tips =
                    '您正在与' +
                    startDoctor.map(item => item.doctorName).join(',') +
                    '医生进行会诊，无法开启新的会诊，是否立即关闭？'
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
$--control-height: 150px;

.consultation-session {
  height: 100%;

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
    height: calc(100% - #{$--header-height} - 30px);
    overflow: auto;
    .message-notify {
      height: 30px;
    }

    .message-list {
      height: calc(100% - #{$--control-height} - 30px);

      .message-list-scrollbar {
        height: 100%;
      }
    }

    .message-input {
      height: $--control-height;
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

