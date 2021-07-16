<template>
  <div>
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>
        <el-form-item label="科室名称">
          <el-input v-model.trim="model.deptName"
                    placeholder="全部"></el-input>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input v-model.trim="model.drugName"
                    placeholder="请输入药品名称"></el-input>
        </el-form-item>
        <el-form-item label="厂家">
          <el-input v-model.trim="model.manufactory"
                    placeholder="请输入厂家"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card q-mb-md">
      <div class="q-mb-md">
        <el-button v-on:click="add">新增科室规则</el-button>
      </div>
      <PeaceTable pagination
                  ref="tableRef">
        <PeaceTableColumn label="序号"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="规则编号"
                          prop="id"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="药品编码"
                          prop="drugCoding"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="药品本位码"
                          prop="drugCscCode"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          prop="drugName"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="规格"
                          prop="specifications"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="厂家"
                          prop="manufacturer"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="科室"
                          prop="departmentName"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="规则数量"
                          prop="count"
                          min-width="100px"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="220px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="remove(scope.row)">删除</el-button>
            <el-button type="text"
                       v-on:click="edit(scope.row)">编辑规则</el-button>
            <el-button type="text"
                       v-on:click="detail(scope.row)">查看规则</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from './../service'

export default {
  data() {
    return {
      model: {}
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.get
      const params = this.model

      this.$refs.tableRef.reloadData({ fetch, params })
    },

    add() {
      this.$emit('add')
    },

    edit(data) {
      this.$emit('edit', data)
    },

    detail(data) {
      this.$emit('detail', data)
    },

    remove(row) {
      this.$confirm('确定要删除吗？', '提示', { type: 'warning' }).then(() => {
        Service.deleteDepartmentRule({ departmentCode: row.departmentCode, drugCscCode: row.drugCscCode }).then(() => {
          Peace.util.alert('删除成功')
          this.fetch()
        })
      })
    }
  }
}
</script>

<style>
</style>