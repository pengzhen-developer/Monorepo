<template>
  <div>
    <el-form :model="viewModel" inline>
      <el-form-item label="随访状态">
        <el-select placeholder v-model="viewModel.随访状态">
          <el-option :key="item" v-for="item in dataSource.随访状态"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标签">
        <el-select placeholder v-model="viewModel.标签">
          <el-option :key="item" v-for="item in dataSource.标签"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <peace-table pagination ref="table">
      <el-table-column align="left" label="患者姓名" prop="title"></el-table-column>
      <el-table-column label="性别"></el-table-column>
      <el-table-column label="年龄"></el-table-column>
      <el-table-column label="随访状态"></el-table-column>
      <el-table-column label="标签"></el-table-column>
      <el-table-column label="病程记录"></el-table-column>
    </peace-table>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      viewModel: {
        随访状态: '',
        标签: ''
      },

      dataSource: {
        随访状态: [],
        标签: []
      }
    }
  },

  created() {
    peace.service.follow.getFollowStatus.then(res => {
      this.dataSource.随访状态 = res.data.map(item => {
        item.label = item.status
        item.value = item.key
      })
    })

    peace.service.follow.getTags.then(res => {
      this.dataSource.标签 = res.data.map(item => {
        item.label = item.tag
        item.value = item.id
      })
    })

    this.get()
  },

  methods: {
    get() {
      const fetch = peace.service.patient.myInstructionLists
      const params = {}

      this.$refs.table.loadData(fetch, params)
    }
  }
}
</script>

<style>
</style>
