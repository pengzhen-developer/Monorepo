<!--
 * @Description: IM 聊天消息 - 处方卡片
-->

<template>
  <div class="peace-im-message-prescription">

    <PeaceIMMessageCard>
      <template v-slot:header>
        <div class="flex items-center text-white">
          <el-image style="width:17px; height:17px;"
                    class="q-mr-10"
                    v-bind:src="require('./../assets/img/ic_rp.png')" />
          <span>处方</span>
        </div>
      </template>

      <template v-slot:content>
        <el-form label-width="70px"
                 label-position="left"
                 space-view>
          <el-form-item>
            <template #label><span class="text-grey-999">诊断</span></template>
            <div class="ellipsis">{{ data.content.data.recipeInfo.diagnosis }}</div>
          </el-form-item>
          <el-form-item>
            <template #label><span class="text-grey-999">Rp</span></template>
            <div class="ellipsis">{{ data.content.data.recipeInfo.drugInfo }}</div>
          </el-form-item>
          <el-form-item>
            <template #label><span class="text-grey-999">就诊时间</span></template>
            <div>{{ data.content.data.recipeInfo.visitingTime }}</div>
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
                 title="处方详情"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeacePrescriptionDetail v-bind:data="dialog.data"
                               v-bind:refetch="showDetail"
                               v-bind:close="closeDetail">
        <template v-slot:footer="{ data, refetch, close }">
          <slot name="prescription-operation"
                v-bind:data="data"
                v-bind:refetch="refetch"
                v-bind:close="close">
          </slot>
        </template>
      </PeacePrescriptionDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import PeaceIMMessageCard from './IMMessageCard.vue'
import PeacePrescriptionDetail from './../../../prescription-detail/src/index.vue'
import Service from './../service'

export default {
  components: {
    PeaceIMMessageCard,
    PeacePrescriptionDetail
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

    closeDetail() {
      this.dialog.visible = false
    },

    async fetch() {
      const params = { prescriptionNo: this.data.content.data.recipeInfo.recipeId }
      const res = await Service.getPrescriptionDetail(params)

      return res.data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>