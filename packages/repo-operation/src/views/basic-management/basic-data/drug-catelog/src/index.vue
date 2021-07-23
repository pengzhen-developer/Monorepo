<template>
  <div class="layout-route">
    <!-- 列表 -->
    <DrugList v-on:showDrugDetail="showDrugDetail"></DrugList>

    <!-- 查看详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="detailModelDialog.visible"
                  title="查看详情"
                  v-if="detailModelDialog.visible"
                  append-to-body
                  width="1000px">
      <DetailModel v-bind:info="detailModelDialog.data" />
    </peace-dialog>

  </div>
</template>

<script>
import DrugList from './components/DrugList'
import DetailModel from './components/DetailModel'

export default {
  name: 'DrugCatelog',

  components: {
    DrugList,
    DetailModel
  },

  data() {
    return {
      detailModelDialog: {
        visible: false,
        data: ''
      }
    }
  },

  methods: {
    showDrugDetail(data) {
      this.detailModelDialog.visible = true
      this.detailModelDialog.data = data
    }
  }
}
</script>

<style>
</style>