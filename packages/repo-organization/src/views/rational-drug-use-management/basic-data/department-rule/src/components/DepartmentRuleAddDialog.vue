<template>
  <PeaceDialog v-bind="$attrs"
               v-bind:visible.sync="internalVisible">
    <div v-loading="loading">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-bind:model="model">
        <el-form-item label="选择科室"
                      style="margin: 0;">
          <el-cascader ref="cascaderRef"
                       v-model="department"
                       clearable=""
                       v-bind:options="options"
                       v-bind:props="props"></el-cascader>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="department.length">
      <el-divider></el-divider>

      <el-form inline
               label-width="auto"
               label-suffix="："
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>
        <el-form-item label="药品名称">
          <el-input v-model="model.name"
                    placeholder="请输入药品名称"></el-input>
        </el-form-item>
        <el-form-item label="厂家">
          <el-input v-model="model.manufactory"
                    placeholder="请输入厂家"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>

      <PeaceTable ref="tableRef"
                  pagination>
        <PeaceTableColumn label="序号"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="药品编码"
                          prop="drugCoding"></PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          prop="drugName"></PeaceTableColumn>
        <PeaceTableColumn label="规格"
                          prop="specifications"></PeaceTableColumn>
        <PeaceTableColumn label="厂家"
                          prop="manufactory"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          width="120px">
          <!-- <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="add(scope.row)">创建科室规则</el-button>
          </template> -->
          <template slot-scope="scope">
            <el-button type="text"
                       v-if="scope.row.drugCscCode"
                       v-on:click="add(scope.row)">创建科室规则</el-button>
            <el-button type="text"
                       disabled
                       v-else
                       v-on:click="add(scope.row)">禁用</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </PeaceDialog>
</template>

<script>
import Service from '../service'

export default {
  props: {
    visible: Boolean
  },

  data() {
    return {
      loading: true,
      department: [],

      deptId: '',

      model: {},

      props: {
        label: 'label',
        value: 'id'
      },

      options: []
    }
  },

  watch: {
    department(value) {
      this.deptId = value[value.length - 1]

      this.$nextTick(() => {
        this.fetch()
      })
    }
  },

  computed: {
    internalVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },

  async created() {
    this.options = (await Service.getDeptTree()).data

    this.options.forEach((item) => {
      if (item.children.length === 0) {
        delete item.children
      } else {
        item.children.forEach((item) => {
          if (item.children.length === 0) {
            delete item.children
          }
        })
      }
    })

    this.loading = false
  },

  methods: {
    fetch() {
      const fetch = Service.getT
      const params = this.model

      this.$refs.tableRef.reloadData({ fetch, params })
    },

    add(data) {
      this.internalVisible = false

      this.$emit('add', data, this.$refs.cascaderRef.getCheckedNodes(true)[0])
    }
  }
}
</script>

<style>
</style>