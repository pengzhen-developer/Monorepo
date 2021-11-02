<!--
 * @Description: IM 聊天消息 - 检验挂号单卡片
-->

<template>
  <div class="peace-im-message-case">
    <PeaceIMMessageCard>
      <template v-slot:header>
        <div class="flex items-center text-white">
          <el-image style="width:17px; height:17px;"
                    class="q-mr-10"
                    v-bind:src="require('./../assets/img/ic_check.png')" />
          <span>检验挂号单</span>
        </div>
      </template>

      <template v-slot:content>
        <div v-for="item in data.content.data.checkComboList"
             v-bind:key="item.comboNo">
          <div>{{ item.comboName }}</div>
        </div>
      </template>
    </PeaceIMMessageCard>
  </div>
</template>

<script>
import PeaceIMMessageCard from './IMMessageCard.vue'

export default {
  components: {
    PeaceIMMessageCard
  },

  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
</style>