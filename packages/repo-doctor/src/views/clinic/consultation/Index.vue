/*
 * @Author: PengZhen 
 * @Date: 2019-05/27
 * @Description: 我的诊室 - 我的会诊
 */

<template>
  <div class="consultation">
    <!-- 房间列表 -->
    <ChatTeams class="left" v-if="chat.teams"></ChatTeams>

    <!-- 房间明细 -->
    <ChatTeam class="center" v-if="chat.team"></ChatTeam>

    <!-- 会诊详情 -->
    <ChatConsultation class="right" v-if="chat.team"></ChatConsultation>
  </div>
</template>

<script>
import ChatTeams from './ChatTeams'
import ChatTeam from './ChatTeam'
import ChatConsultation from './ChatConsultation'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ChatTeams,
    ChatTeam,
    ChatConsultation
  },

  computed: {
    ...mapState(['chat'])
  },

  // 初始化 IM
  created() {
    this.initNIM(true)
  },

  methods: {
    ...mapActions('chat', ['clearSession', 'initNIM'])
  },

  // 销毁 IM
  destroyed() {
    this.clearSession()
  }
}
</script>

<style lang="scss" scoped>
.consultation {
  margin: 0 !important;
  padding: 0 !important;

  display: flex;

  .left,
  .right {
    width: 230px;

    border: 1px solid #efefef;
  }

  .center {
    flex: 1;

    border: 1px solid #efefef;
    border-left: none;
    border-right: none;
  }
}
</style>

