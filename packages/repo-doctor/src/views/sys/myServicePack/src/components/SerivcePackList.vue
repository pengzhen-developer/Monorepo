<template>
  <div>
    <div class="card q-mb-md">
      <el-form space-none
               inline
               label-suffix="："
               v-bind:model="model"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch">
        <el-form-item label="创建日期">
          <PeaceDatePicker type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           v-model="model.dateRange"></PeaceDatePicker>
        </el-form-item>
        <el-form-item label="服务包名称">
          <el-input placeholder="请输入"
                    v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card q-mb-md">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn width="60"
                          label="序号"
                          prop="orderNumber"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="服务包名称"
                          prop="servicePackageName"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="零售价/元"
                          prop="price"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="创建时间"
                          prop="createdTime"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="创建者"
                          prop="createUser"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="签约主体"
                          prop="mainPartName"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="状态"
                          prop="status"></PeaceTableColumn>
        <PeaceTableColumn width="120"
                          fixed="right"
                          label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showDetail(scope.row)">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog title="详情"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <SerivcePackDetail class="q-px-md"
                         v-bind:id="dialog.id"></SerivcePackDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './../service'

import SerivcePackDetail from './SerivcePackDetail'

export default {
  components: {
    SerivcePackDetail
  },

  data() {
    return {
      model: {
        dateRange: [],
        startTime: '',
        endTime: '',
        name: ''
      },

      dialog: {
        visible: false
      }
    }
  },

  watch: {
    'model.dateRange'(value) {
      if (Peace.util.isArray(value) && value.length === 2) {
        this.model.startTime = Peace.dayjs(value[0]).format('YYYY-MM-DD')
        this.model.endTime = Peace.dayjs(value[1]).format('YYYY-MM-DD')
      } else {
        this.model.startTime = ''
        this.model.endTime = ''
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.getMyList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    showDetail(row) {
      this.dialog.visible = true
      this.dialog.id = row.servicePackageId
    }
  }
}
</script>

<style>
</style>