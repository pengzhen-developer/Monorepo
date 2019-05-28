/*
 * @Author: PengZhen 
 * @Date: 2019-05/27
 * @Description: 我的诊室 - 我的会诊
 */

<template>
  <div class="consultation">
    <!-- 房间列表 -->
    <chat-rooms class="left"></chat-rooms>

    <!-- 房间明细 -->
    <chat-room class="center"></chat-room>

    <!-- 会诊详情 -->
    <chat-consultation class="right"></chat-consultation>
  </div>
</template>

<script>
import ChatRooms from './ChatRooms'
import ChatRoom from './ChatRoom'
import ChatConsultation from './ChatConsultation'

export default {
  components: {
    ChatRooms,
    ChatRoom,
    ChatConsultation
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

