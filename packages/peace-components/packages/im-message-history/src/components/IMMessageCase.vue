<!--
 * @Description: IM 聊天消息 - 病历卡片
-->

<template>
  <div class="peace-im-message-case">
    <PeaceIMMessageCard>
      <template v-slot:header>
        <div class="flex items-center text-white">
          <el-image style="width:17px; height:17px;"
                    class="q-mr-10"
                    v-bind:src="require('./../assets/img/ic_fabingli.png')" />
          <span>病历</span>
        </div>
      </template>

      <template v-slot:content>
        <el-form label-width="70px"
                 label-position="left"
                 space-view>
          <el-form-item>
            <template #label><span class="text-grey-999">诊断</span></template>
            <div class="ellipsis">{{ data.content.data.caseInfo.diagnosis }}</div>
          </el-form-item>
          <el-form-item>
            <template #label><span class="text-grey-999">就诊时间</span></template>
            <div>{{ data.content.data.caseInfo.visitingTime }}</div>
          </el-form-item>
        </el-form>
      </template>

      <template v-slot:footer>
        <div class="text-center cursor-pointer q-py-8"
             v-on:click="showDetail">
          <span class="text-grey-999">查看详情</span>
        </div>
      </template>
    </PeaceIMMessageCard>

    <PeaceDialog append-to-body
                 title="病历详情"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeaceCaseDetail v-bind:data="dialog.data"></PeaceCaseDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import PeaceIMMessageCard from './IMMessageCard.vue'
import PeaceCaseDetail from './../../../case-detail/src/index.vue'
import Service from './../service'

export default {
  components: {
    PeaceIMMessageCard,
    PeaceCaseDetail
  },

  props: {
    data: Object
  },

  data() {
    return {
      dialog: {
        visible: false,
        data: undefined
      }
    }
  },

  methods: {
    showDetail() {
      this.dialog.visible = true
      this.dialog.data = this.fetch.bind(this)
    },

    async fetch() {
      const params = { caseNo: this.data?.content?.data?.caseInfo?.caseId }
      const res = await Service.getCaseDetail(params)

      return res.data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>