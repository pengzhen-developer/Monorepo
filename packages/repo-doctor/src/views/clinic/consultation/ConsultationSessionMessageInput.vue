<template>
  <div class="consultation-session-message-input">
    <div class="control">
      <!-- 期望时间之前, 受邀方医生能邀请本院其它医生 -->
      <el-button
        @click="sendInvited"
        type="text"
        v-show="$store.getters['consultation/consultInfo'].receiveDoctor.find(item => item.doctorId === $store.state.user.userInfo.list.docInfo.doctor_id) && 
                $peace.consultationComponent.getIntervalStatus(this.$store.state.consultation.session) === $peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.距开始"
      >
        <img src="~@/assets/images/inquiry/chat_icon_video.png">邀请医生
      </el-button>

      <!-- 期望时间之后, 发起方医生和受邀方医生能够发起视频 -->
      <el-button
        @click="sendVideo"
        type="text"
        v-show="$peace.consultationComponent.getIntervalStatus(this.$store.state.consultation.session) === $peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.距结束 ||
                $peace.consultationComponent.getIntervalStatus(this.$store.state.consultation.session) === $peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.会诊中 "
      >
        <img src="~@/assets/images/inquiry/chat_icon_video.png">发起视频
      </el-button>

      <!-- 会诊生效后, 发起方医生能够填写会诊意见, 用于结束会诊 -->
      <el-button
        @click="snedConsultSuggest"
        type="text"
        v-show="$store.getters['consultation/consultInfo'].receiveDoctor.find(item => item.doctorId === $store.state.user.userInfo.list.docInfo.doctor_id) && 
                $peace.consultationComponent.getIntervalStatus(this.$store.state.consultation.session) === $peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.会诊中"
      >
        <img src="~@/assets/images/inquiry/chat_icon_video.png">会诊意见
      </el-button>
    </div>

    <peace-dialog :visible.sync="invitedDialog.visible" class="invited-dialog" title="邀请协同医生">
      <div>
        <el-input placeholder="请输入医生姓名、职称、科室" style="width: calc(100% - 120px); margin-right: 20px;" v-model="invitedDialog.model.keyword"></el-input>
        <el-button @click="getInvitedDoctor" type="primary">查询</el-button>
      </div>

      <br>
      <br>

      <peace-table :layout="'total,  -> , prev, pager, next, slot'" :pageSize="5" pagination ref="table" v-if="invitedDialog.visible">
        <el-table-column align="center" label=" " width="45">
          <template slot-scope="scope">
            <el-checkbox-group @change="val => invitedChange(val, scope.row)" v-model="invitedDialog.chooseListForCheckBox">
              <el-checkbox :label="scope.row.doctorId"></el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column align="center" label="头像" width="60">
          <template slot-scope="scope">
            <img :src="scope.row.avartor" height="40px" style="border-radius: 50%;" width="40px">
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名" prop="doctorName" width="80"></el-table-column>
        <el-table-column align="center" label="职称" prop="doctorTitle" width="100"></el-table-column>
        <el-table-column label="科室" prop="deptName" width="120"></el-table-column>
        <el-table-column label="医院" prop="hospitalName"></el-table-column>
      </peace-table>

      <br>

      <template v-if="invitedDialog.chooseList.length">
        <div style="margin: 20px 0; color:rgba(51,51,51,1);">已选择医生 （{{ invitedDialog.chooseList.length }}）</div>
        <div style="border:1px solid rgba(204,204,204,1); min-height: 110px;">
          <el-tag
            :key="item.doctorId"
            @close="closeInvitedChange(item.doctorId)"
            closable
            style="margin: 10px; height: 32px; padding: 5px 15px; "
            type
            v-for="item in invitedDialog.chooseList"
          >{{ item.doctorName }}</el-tag>
        </div>

        <br>

        <div style="text-align: center;">
          <el-button @click="invitedDialog.visible = false" type>取消</el-button>
          <el-button @click="saveInvited" type="primary">确定</el-button>
        </div>
      </template>
    </peace-dialog>

    <peace-dialog :visible.sync="consultSuggestDialog.visible" title="填写会诊意见">
      <br>

      <el-form :model="consultSuggestDialog.model" label-width="80px">
        <el-form-item label="会诊意见">
          <el-input
            :rows="8"
            maxlength="1000"
            placeholder="请填写会诊意见，包括治疗方案、患者与家属关注问题等内容的分析等，提交成功后本次会诊将结束。"
            type="textarea"
            v-model="consultSuggestDialog.model.consultSuggest"
          ></el-input>

          <label class="msg">最多可以输入1000字，还可以输入 {{ summaryMaxLength }} 字</label>
        </el-form-item>
        <el-form-item label=" ">
          <div style="text-align: center;">
            <el-button @click="consultSuggestDialog.visible = false" type>取消</el-button>
            <el-button @click="saveConsultSuggest" type="primary">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
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
      $peace.consultationVideoComponent.sendVideo(this.$store.state.consultation.session)
    },

    snedConsultSuggest() {
      this.consultSuggestDialog.visible = true
      this.consultSuggestDialog.model.consultSuggest = ''
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
      if (this.consultSuggestDialog.model.consultSuggest) {
        const params = {
          consultNo: this.$store.getters['consultation/consultInfo'].consultNo,
          consultSuggest: this.consultSuggestDialog.model.consultSuggest
        }

        peace.service.consult.submitSuggest(params).then(() => {
          $peace.util.alert('提交成功，会诊已完成，感谢您的辛苦付出')

          this.consultSuggestDialog.visible = false
        })
      } else {
        $peace.util.alert('请填写会诊意见')
      }
    }
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
</style>
