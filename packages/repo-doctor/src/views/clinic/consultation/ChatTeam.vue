<template>
  <div class="chat-team" v-if="chat.team">
    <div class="header">
      <div class="left">
        <h4>{{ chat.team.custom.patient.familyName }}</h4>
      </div>
      <div class="right">
        <el-button type="text">{{ consultStatus.find(item => item.consultStatus === chat.team.custom.consultation.consultStatus).consultTxt }}</el-button>
      </div>
    </div>

    <div class="body">
      <el-alert :closable="false" class="chat-team-waring" show-icon style title type="warning">
        <div slot="title" style="color: rgba(102,102,102,1); font-size: 12px; background: rgba(255,170,0,1) rgba(255,255,255,0.9); ">
          <span>
            视频结束后请填写
            <span style="font-weight: bold; ">【会诊意见】</span>，提交成功后本次会诊将结束。
          </span>
        </div>
      </el-alert>

      <!-- 聊天记录 -->
      <el-scrollbar class="chat-team-list-scrollbar">
        <ChatTeamList class="chat-team-list"></ChatTeamList>
      </el-scrollbar>

      <!-- 输入与控制 -->
      <ChatTeamInput class="chat-team-input"></ChatTeamInput>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ChatTeamList from './ChatTeamList'
import ChatTeamInput from './ChatTeamInput'

export default {
  components: {
    ChatTeamList,
    ChatTeamInput
  },

  inject: ['consultStatus'],

  data() {
    return {}
  },

  computed: {
    ...mapState(['chat'])
  }
}
</script>

<style lang="scss" scoped>
.chat-team {
  .header {
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #f2f2f2;
    background: #f9f9f9;

    .left {
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

    .right {
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

  .body {
    height: calc(100% - 50px);

    .chat-team-list-scrollbar {
      height: calc(100% - 234px);

      .chat-team-list {
        height: 100%;
      }
    }

    .chat-team-waring {
      height: 34px;
    }

    .chat-team-input {
      height: 200px;
    }
  }
}
</style>
