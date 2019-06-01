<template>
  <div class="chat-team" v-if="chat.team">
    <div class="header">
      <div class="left">
        <span>{{ chat.team.custom.patient.familyName }}</span>
        <el-alert title="会诊结束后请填写会诊意见" type="warning"></el-alert>
      </div>
      <div class="right">
        <el-button plain type="success">{{ chat.team.custom.consultation.consultStatus }}</el-button>
      </div>
    </div>

    <div class="body">
      <!-- 聊天记录 -->
      <ChatTeamList class="chat-team-list"></ChatTeamList>

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
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
      }

      h4 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0 0 10px;
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

    .chat-team-list {
      height: calc(100% - 200px);
    }

    .chat-team-input {
      height: 200px;
    }
  }
}
</style>
