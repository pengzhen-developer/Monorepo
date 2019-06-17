<template>
  <div>
    <el-dialog :visible.sync="consultSuggestDialog.visible" title="填写会诊意见">
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
    </el-dialog>

    <el-dialog :visible.sync="invitedDialog.visible" title="邀请协同医生">
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
    </el-dialog>

    <div class="tool">
      <div class="shortcut">
        <el-button
          @click="showInvited"
          type="text"
          v-show="chat.team.custom.consultation.startDoctor[0].doctorId !== user.userInfo.list.docInfo.doctor_id && 
                  teamStatus === TEAM_STATUS.距开始"
        >
          <img src="~@/assets/images/icons/clinic/chat_icon_video.png">邀请医生
        </el-button>

        <el-button @click="sendVideo" type="text" v-show="teamStatus !== TEAM_STATUS.距开始">
          <img src="~@/assets/images/icons/clinic/chat_icon_video.png">发起视频
        </el-button>

        <el-button
          @click="showConsultSuggest"
          type="text"
          v-show="chat.team.custom.consultation.receiveDoctor[0].doctorId === user.userInfo.list.docInfo.doctor_id && teamStatus === TEAM_STATUS.会诊中"
        >
          <img src="~@/assets/images/icons/clinic/chat_icon_video.png">会诊意见
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import config from './config'

import { mapState, mapActions } from 'vuex'

const TEAM_STATUS = {
  距开始: '距开始',
  距结束: '距结束',
  会诊中: '会诊中'
}

export default {
  data() {
    return {
      TEAM_STATUS,
      config,

      remoteList: [],

      dialog: {
        visible: false
      },

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

      video: {
        visible: false,
        title: ''
      }
    }
  },

  computed: {
    ...mapState(['chat', 'user']),

    summaryMaxLength() {
      if (this.consultSuggestDialog.model.consultSuggest) {
        return 1000 - this.consultSuggestDialog.model.consultSuggest.length
      } else {
        return 1000
      }
    },

    // 获取当前群组（会诊）状态
    teamStatus() {
      if (!this.data && this.chat.team && this.chat.team.custom) {
        const consultStatus = this.chat.team.custom.consultation.consultStatus
        const expectTime = this.chat.team.custom.consultation.expectTime
        const expectOverTime = this.chat.team.custom.consultation.expectOverTime

        if (consultStatus === 5) {
          if (new Date(new Date().getTime() + $peace.serverDateDiff) < new Date(expectTime)) {
            return TEAM_STATUS.距开始
          }

          if (
            new Date(new Date().getTime() + $peace.serverDateDiff) > new Date(expectTime) &&
            new Date(new Date().getTime() + $peace.serverDateDiff) < new Date(expectOverTime)
          ) {
            return TEAM_STATUS.距结束
          }
        }

        if (consultStatus === 6) {
          return TEAM_STATUS.会诊中
        }
      }

      return ''
    }
  },

  methods: {
    ...mapActions('chat', ['clearTeam']),

    showInvited() {
      this.invitedDialog.visible = true
      this.invitedDialog.model.keyword = ''
      this.invitedDialog.chooseList = []
      this.invitedDialog.chooseListForCheckBox = []

      this.$nextTick(function() {
        this.getInvitedDoctor()
      })
    },

    getInvitedDoctor() {
      const params = {
        keyword: this.invitedDialog.model.keyword
      }

      this.$refs.table.loadData({
        api: this.config.api.inviteDoctor,
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
        consultNo: this.chat.team.custom.consultation.consultNo,
        inviteDoctorIds: this.invitedDialog.chooseList.map(item => item.doctorId)
      }
      this.$http.post(this.config.api.chooseInviteDoctor, params, { headers: { 'Content-Type': 'application/json' } }).then(res => {
        $peace.util.alert(res.msg)

        this.invitedDialog.visible = false
      })
    },

    sendVideo() {
      const channelName = this.chat.team.custom.consultation.channel || this.chat.team.id.replace('team-', '') + '-' + new Date().getTime()
      const consultNo = this.chat.team.custom.consultation.consultNo

      $peace.consultationComponent.joinChannel(channelName, consultNo)
    },

    showConsultSuggest() {
      this.consultSuggestDialog.visible = true
      this.consultSuggestDialog.model.consultSuggest = ''
    },

    saveConsultSuggest() {
      if (this.consultSuggestDialog.model.consultSuggest) {
        const params = {
          consultNo: this.chat.team.custom.consultation.consultNo,
          consultSuggest: this.consultSuggestDialog.model.consultSuggest
        }

        this.$http.post('client/v1/consult/submitSuggest', params).then(() => {
          $peace.util.alert('提交成功，会诊已完成，感谢您的辛苦付出')

          this.clearTeam()
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
.tool {
  display: flex;
  justify-content: space-between;

  background: rgba(251, 251, 251, 1);
  height: 36px;
  align-items: center;
  margin: 0;
  padding: 0 5px;

  .shortcut {
    .el-button {
      min-width: 0;
      margin: 0 30px 0 0;
      color: rgba(153, 153, 153, 1);

      /deep/ span {
        display: inline-flex;
        justify-content: center;

        img {
          margin: 0 5px 0 0;
        }

        &:after {
          content: '';
          position: relative;
          right: -15px;
          top: 0;
          bottom: 0;
          width: 1px;
          height: 15px;
          background-color: #efefef;
          z-index: 1;
        }
      }
    }
  }

  /deep/ .el-upload-list__item {
    display: none;
  }
}

/deep/ .el-checkbox__label {
  display: none;
}
</style>
