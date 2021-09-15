<template>
  <div class="full-height">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>
        <el-form-item label="云仓名称">
          <el-input v-model.trim="model.CloudName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-input v-model.trim="model.CustName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select clearable
                     v-model.trim="model.EnableStatus"
                     placeholder="请选择">
            <el-option v-for="(value,label) in source.ORGANIZATION_STATUS"
                       :key="value"
                       :label="label"
                       :value="value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期">
          <peace-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                             v-bind:default-time="['00:00:00', '23:59:59']"
                             format="yyyy-MM-dd"
                             type="daterange"
                             v-model.trim="DateValue"></peace-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="云仓名称"
                          prop="Name"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="所属机构"
                          prop="CustName"
                          min-width="180px">
          <template slot-scope="scope">
            {{ scope.row.CustName || '——' }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="系统名称"
                          prop="SysName"
                          min-width="180px">
          <template slot-scope="scope">
            {{ scope.row.SysName || '——' }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          prop="CreateTime"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="启用状态"
                          prop="EnableStatus"
                          min-width="100px">
          <template slot-scope="scope">
            {{ scope.row.EnableStatus == 0 ? '已启用' : '已停用' }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          width="140px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showDetail(scope.row)">云仓详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from '../service/index'
import CONSTANT from '../constant'

export default {
  name: 'User',

  data() {
    return {
      DateValue: [],
      source: {
        ORGANIZATION_STATUS: CONSTANT.ORGANIZATION_STATUS
      },
      model: {
        CloudName: '',
        CustName: '',
        StartTime: '',
        EndTime: '',
        EnableStatus: ''
      }
    }
  },

  watch: {
    DateValue(value) {
      this.model.StartTime = value?.[0] ?? ''
      this.model.EndTime = value?.[1] ?? ''
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.getWarehouseList
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },

    showDetail(row) {
      this.$emit('onShowDetail', { CustCode: row.CustCode, Id: row.Id })
    }
  }
}
</script>

<style>
</style>