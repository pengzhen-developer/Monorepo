<template>
  <div>
    <div>
      <el-button style="width: 120px;" type="primary">新增</el-button>
    </div>

    <hr />

    <peace-table pagination ref="table">
      <el-table-column align="left" label="患教标题" prop="title"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
          <el-button @click="showEdit(scope.row)" type="text">修改</el-button>
          <el-button @click="remove(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </peace-table>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = peace.service.patient.myInstructionLists
      const params = {}

      this.$refs.table.loadData({ fetch, params })
    },

    showDetail(row) {
      window.open(row.detailUrl)
    },

    showEdit() {},

    remove() {}
  }
}
</script>

<style>
</style>
