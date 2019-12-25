<template>
  <div class="consultation-session-message-input">
    <div class="control">
      <!-- 期望时间之前, 受邀方医生能邀请本院其它医生 -->
      <el-button @click="sendInvited"
                 type="text"
                 v-show="$store.getters['consultation/consultInfo'].receiveDoctor.find(item => item.doctorId === $store.state.user.userInfo.list.docInfo.doctor_id) && 
                         $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.等待会诊">
        <img src="~@/assets/images/inquiry/chat_ic_invite doctors.png" />邀请医生
      </el-button>

      <!-- 期望时间之后, 发起方医生和受邀方医生能够发起视频 -->
      <el-button @click="sendVideo"
                 type="text">
        <img src="~@/assets/images/inquiry/chat_icon_video.png" />发起视频
      </el-button>

      <el-button @click="sendCase"
                 type="text"
                 v-show="$store.getters['consultation/consultInfo'].startDoctor.find(item => item.doctorId === $store.state.user.userInfo.list.docInfo.doctor_id) && 
                         $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.会诊中 ||
                         $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.会诊已完成 ||
                         $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.会诊已关闭 ">
        <img src="~@src/assets/images/inquiry/chat_icon_medical.png" />
        <span>写病历</span>
      </el-button>

      <el-button @click="sendRecipe"
                 type="text"
                 v-show="$store.getters['consultation/consultInfo'].startDoctor.find(item => item.doctorId === $store.state.user.userInfo.list.docInfo.doctor_id) && 
                         $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.会诊中 ||
                         $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.会诊已完成 ||
                         $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.会诊已关闭 ">
        <img src="~@src/assets/images/inquiry/chat_icon_pr.png" />
        <span>开处方</span>
      </el-button>

      <!-- 会诊生效后, 受邀方医生能够填写会诊意见, 用于结束会诊 -->
      <el-button @click="sendConsultSuggest"
                 type="text"
                 v-show="$store.getters['consultation/consultInfo'].receiveDoctor.find(item => item.doctorId === $store.state.user.userInfo.list.docInfo.doctor_id) && 
                         $peace.consultationComponent.getIntervalStatus(this.$store.state.consultation.session) === $peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.会诊中">
        <img src="~@/assets/images/inquiry/chat_icon_medical.png" />会诊意见
      </el-button>
    </div>

    <peace-dialog :visible.sync="invitedDialog.visible"
                  class="invited-dialog"
                  title="邀请协同医生">
      <div>
        <el-input placeholder="请输入医生姓名、职称、科室"
                  style="width: calc(100% - 120px); margin-right: 20px;"
                  v-model="invitedDialog.model.keyword"></el-input>
        <el-button @click="getInvitedDoctor"
                   type="primary">查询</el-button>
      </div>

      <br />
      <br />

      <peace-table :layout="'total,  -> , prev, pager, next, slot'"
                   :pageSize="5"
                   pagination
                   ref="table"
                   v-if="invitedDialog.visible">
        <el-table-column align="center"
                         label=" "
                         width="45">
          <template slot-scope="scope">
            <el-checkbox-group @change="val => invitedChange(val, scope.row)"
                               v-model="invitedDialog.chooseListForCheckBox">
              <el-checkbox :label="scope.row.doctorId"></el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="头像"
                         width="60">
          <template slot-scope="scope">
            <img :src="scope.row.avartor"
                 height="40px"
                 style="border-radius: 50%;"
                 width="40px" />
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="姓名"
                         prop="doctorName"
                         width="80"></el-table-column>
        <el-table-column align="center"
                         label="职称"
                         prop="doctorTitle"
                         width="100"></el-table-column>
        <el-table-column label="科室"
                         prop="deptName"
                         width="120"></el-table-column>
        <el-table-column label="医院"
                         prop="hospitalName"></el-table-column>
      </peace-table>

      <br />

      <template v-if="invitedDialog.chooseList.length">
        <div style="margin: 20px 0; color:rgba(51,51,51,1);">已选择医生
          （{{ invitedDialog.chooseList.length }}）</div>
        <div style="border:1px solid rgba(204,204,204,1); min-height: 110px;">
          <el-tag :key="item.doctorId"
                  @close="closeInvitedChange(item.doctorId)"
                  closable
                  style="margin: 10px; height: 32px; padding: 5px 15px; "
                  type
                  v-for="item in invitedDialog.chooseList">{{ item.doctorName }}</el-tag>
        </div>

        <br />

        <div style="text-align: center;">
          <el-button @click="invitedDialog.visible = false"
                     type>取消</el-button>
          <el-button @click="saveInvited"
                     type="primary">确定</el-button>
        </div>
      </template>
    </peace-dialog>

    <peace-dialog :visible.sync="consultSuggestDialog.visible"
                  title="填写会诊意见">
      <ConsultationSessionSuggest @close="consultSuggestDialog.visible = false"></ConsultationSessionSuggest>
    </peace-dialog>

    <peace-dialog :visible.sync="caseDialog.visible"
                  v-if="caseDialog.visible"
                  title="病历详情">
      <ConsultationSessionCaseDetail :data="caseDialog.data"></ConsultationSessionCaseDetail>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import ConsultationSessionSuggest from './ConsultationSessionSuggest'
import ConsultationSessionCaseDetail from './ConsultationSessionCaseDetail'

export default {
  components: {
    ConsultationSessionSuggest,
    ConsultationSessionCaseDetail
  },

  data() {
    return {
      invitedDialog: {
        visible: false,

        chooseList: [],
        chooseListForCheckBox: [],

        model: {
          keyword: ''
        }
      },

      consultSuggestDialog: {
        visible: false,

        model: {
          consultSuggest: ''
        }
      },
      diagnoseDialog: {
        visible: false,

        chooseData: [],
        chooseItem: [],
        source: {
          // 疾病诊断
          present_history: [],
          IllnessList: []
        }
      },

      caseDialog: {
        visible: false,
        data: undefined
      }
    }
  },

  computed: {
    summaryMaxLength() {
      if (this.consultSuggestDialog.model.consultSuggest) {
        return 1000 - this.consultSuggestDialog.model.consultSuggest.length
      } else {
        return 1000
      }
    }
  },

  methods: {
    showDiagnoseDialog(data) {
      if (data && data.length) {
        this.diagnoseDialog.chooseData = [...data]
      }

      this.diagnoseDialog.visible = true
    },

    getPresent(query) {
      if (query !== '' && query.length > 0) {
        const params = { name: query }

        peace.service.patient.getDiseaseInfo(params).then(res => {
          this.diagnoseDialog.source.present_history = res.data.list
        })
      } else {
        this.diagnoseDialog.source.present_history = []
      }
    },

    chooseItem(item) {
      if (!item.id) {
        item = {
          name: item
        }
      }

      const index = this.diagnoseDialog.chooseData.findIndex(
        existItem => existItem.id === item.id && existItem.name === item.name
      )

      if (index === -1) {
        this.diagnoseDialog.chooseData.push(item)

        // 选中后， 清空状态
        this.diagnoseDialog.chooseItem = ''
        this.diagnoseDialog.present_history = []
      }
    },

    closeItem(item) {
      const index = this.diagnoseDialog.chooseData.findIndex(existItem => existItem === item)

      if (index !== -1) {
        this.diagnoseDialog.chooseData.splice(index, 1)
      }
    },

    saveItem() {
      this.consultSuggestDialog.model.consultDiagnose = [...this.diagnoseDialog.chooseData]

      this.diagnoseDialog.visible = false
    },

    sendInvited() {
      this.invitedDialog.visible = true
      this.invitedDialog.model.keyword = ''
      this.invitedDialog.chooseList = []
      this.invitedDialog.chooseListForCheckBox = []

      this.$nextTick(function() {
        this.getInvitedDoctor()
      })
    },

    sendVideo() {
      // 判断当前会诊的发起方与受邀方，是否存在正在【会诊中】数据，
      // 存在，提示结束会诊后，才能发起新会诊
      // 不存在，发起视频邀请

      const session = this.$store.state.consultation.session

      const params = {
        toDoctorId:
          session.content.consultInfo.receiveDoctor[0].doctorId ===
          this.$store.state.user.userInfo.list.docInfo.doctor_id
            ? session.content.consultInfo.startDoctor[0].doctorId
            : session.content.consultInfo.receiveDoctor[0].doctorId
      }

      peace.service.consult.doctorStatus(params).then(res => {
        if (res.data.fromDoctorConsultStatus === 1) {
          return peace.util.warning('您正在会诊中，不可开始新的会诊')
        } else if (res.data.toDoctorConsultStatus === 1) {
          return peace.util.warning('医生正在会诊中，无法接听您的视频')
        } else {
          $peace.videoComponent.call(this.$store.state.consultation.session, 'consult')
        }
      })
    },

    sendCase() {
      if (this.$store.getters['consultation/consultInfo'].isSendCase === 0) {
        $peace.consultationComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.发病历)
      } else {
        this.getCaseDetail(this.$store.getters['consultation/consultInfo'].consultNo)
      }
    },

    sendRecipe() {
      if (this.$store.getters['consultation/consultInfo'].isSendCase === 0) {
        peace.util.warning('尚未填写病历，无法开具处方')
      } else {
        $peace.consultationComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.发处方)
      }
    },

    sendConsultSuggest() {
      if (this.$store.getters['consultation/consultInfo'].isCommit) {
        return peace.util.alert('您已填写会诊意见')
      }

      // 验证当前频道信息
      if (this.$store.getters['consultation/consultInfo'].channelFromId) {
        const message = '您参与的视频会话其他参与者还未挂断，填写会诊意见将关闭视频会话'
        const confirmOption = { type: 'warning' }

        peace.util.confirm(message, undefined, confirmOption, () => {
          const consultNo = this.$store.getters['consultation/consultInfo'].consultNo

          // 强制解散 （仅为了通知相关人）
          const dissolveHandler = function() {
            const params = { consultNo: consultNo, action: 'dissolve' }

            return peace.service.video.processConsult(params)
          }

          // 结束视频会诊
          const overHandler = function() {
            const params = { consultNo: consultNo, action: 'over' }

            return peace.service.video.processConsult(params)
          }

          // 1. 强制解散，通知对方
          // 2. 当前用户关闭视频会诊，执行 over
          // 3. 正常会诊意见填写
          dissolveHandler()
            .then(overHandler())
            .then(() => {
              this.consultSuggestDialog.visible = true
              this.consultSuggestDialog.model.consultSuggest = ''
            })
        })
      } else {
        this.consultSuggestDialog.visible = true
        this.consultSuggestDialog.model.consultSuggest = ''
      }
    },

    getInvitedDoctor() {
      const fetch = peace.service.consult.inviteDoctor

      const params = {
        keyword: this.invitedDialog.model.keyword
      }

      this.$refs.table.loadData({
        fetch,
        params
      })
    },

    invitedChange(val, row) {
      const index = this.invitedDialog.chooseList.findIndex(item => item.doctorId === row.doctorId)

      if (index === -1) {
        this.invitedDialog.chooseList.push(row)
      } else {
        this.invitedDialog.chooseList.splice(index, 1)
      }

      this.invitedDialog.chooseListForCheckBox = val
    },

    closeInvitedChange(doctorId) {
      const index = this.invitedDialog.chooseList.findIndex(item => item.doctorId === doctorId)
      const checkboxIndex = this.invitedDialog.chooseListForCheckBox.findIndex(item => item === doctorId)

      if (index !== -1) {
        this.invitedDialog.chooseList.splice(index, 1)
        this.invitedDialog.chooseListForCheckBox.splice(checkboxIndex, 1)
      }
    },

    saveInvited() {
      const params = {
        consultNo: this.$store.getters['consultation/consultInfo'].consultNo,
        inviteDoctorIds: this.invitedDialog.chooseList.map(item => item.doctorId)
      }

      peace.service.consult.chooseInviteDoctor(params).then(res => {
        $peace.util.alert(res.msg)

        this.invitedDialog.visible = false
      })
    },

    saveConsultSuggest() {
      if (
        this.consultSuggestDialog.model.consultSuggest &&
        this.consultSuggestDialog.model.consultDiagnose &&
        this.consultSuggestDialog.model.consultFind
      ) {
        const diagnose = this.consultSuggestDialog.model.consultDiagnose

        const params = {
          consultNo: this.$store.getters['consultation/consultInfo'].consultNo,
          consultDiagnose: diagnose.map(v => v.name),
          consultFind: this.consultSuggestDialog.model.consultFind,
          consultSuggest: this.consultSuggestDialog.model.consultSuggest
        }

        peace.service.consult.submitSuggest(params).then(() => {
          // $peace.util.alert('提交成功，会诊已完成，感谢您的辛苦付出')

          this.consultSuggestDialog.visible = false
        })
      } else {
        $peace.util.alert('请完整填写会诊所见、疾病诊断、建议')
      }
    },

    getCaseDetail(consultNo) {
      const params = {
        consultNo: consultNo
      }

      peace.service.inquiry.getCase(params).then(res => {
        this.caseDialog.visible = true
        this.caseDialog.data = res.data
      })
    }
  },
  created() {
    peace.service.patient.IllnessList().then(res => {
      this.diagnoseDialog.source.IllnessList = res.data.list
    })
  }
}
</script>

<style lang="scss" scoped>
.consultation-session-message-input {
  .control {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #efefef;
    background: rgba(251, 251, 251, 1);

    /deep/ .el-button {
      color: rgba(153, 153, 153, 1);

      span {
        display: flex;
        align-items: center;
        flex-direction: row;

        img {
          margin: 0 5px 0 0;
        }
      }
    }

    /deep/ .el-upload-list__item {
      display: none;
    }

    .el-divider {
      margin: 0 15px;
    }
  }

  .input-text {
    /deep/ .el-textarea__inner {
      padding: 5px 10px;
      border-radius: 0;
      border-top: 1px solid rgba(251, 251, 251, 1);
      border-bottom: 0;
      border-left: 0;
      border-right: 0;

      &:focus {
        outline: none;
        border-color: rgba(240, 240, 240, 1);
      }
    }
  }

  .input-send {
    padding: 0 5px;
    text-align: right;
    height: 30px;
    line-height: 30px;
  }
}

.invited-dialog {
  /deep/ .el-checkbox__label {
    display: none;
  }
}
.msg {
  color: #999;
  font-size: 12px;
}
</style>
