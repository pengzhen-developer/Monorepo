<template>
  <div>
    <peace-table :data="list"
                 @current-change="handleCurrentChange"
                 highlight-current-row>
      <peace-table-column label="ID"
                          prop="id"></peace-table-column>
      <peace-table-column label="标题"
                          prop="title"></peace-table-column>
      <!-- <peace-table-column label="展示位置" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.displayPosition }}</span>
        </template>
      </peace-table-column>-->
    </peace-table>
    <div class="text-center">
      <el-button :disabled="!selected"
                 @click="submit"
                 class="q-mt-10"
                 type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdvertisementAssociatedContent',
  props: {
    list: Array
  },
  data() {
    return {
      selected: ''
    }
  },
  methods: {
    handleCurrentChange(row) {
      this.selected = row
    },
    submit() {
      const params = this.selected
      this.$emit('submit', params)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
