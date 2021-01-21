<template>
  <div class="layout-route">
    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  v-bind:tableProps="{ pageIndex: 'current', pageSize: 'size' }"
                  v-bind:page-size="5"
                  pagination>
        <PeaceTableColumn fixed
                          label="日志编号"
                          prop="id"
                          width="100"></PeaceTableColumn>

        <PeaceTableColumn label="日志标题"
                          min-width="100px"
                          prop="title"
                          align="left">
        </PeaceTableColumn>
        <PeaceTableColumn label="创建人"
                          min-width="100px"
                          prop="createBy"
                          align="left">
        </PeaceTableColumn>
        <PeaceTableColumn label="操作方式"
                          min-width="100px"
                          prop="method"></PeaceTableColumn>
        <PeaceTableColumn label="日志类型"
                          min-width="100px"
                          prop="type">
          <template slot-scope="scope">
            <span>{{getTypeText(scope.row.type)}}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          min-width="140px"
                          prop="createTime"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          align="left"
                          min-width="150px">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="showModel( scope.row)">查看详情</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="deleteItem(scope.row)">删除</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
    <el-dialog v-if="dialog.visible"
               width="900px"
               v-bind:visible.sync="dialog.visible"
               title="日志详情">
      <LogModel v-bind:info="dialog.data"></LogModel>
    </el-dialog>
  </div>
</template>

<script>
import Service from './service'
import Constant from './constant'
import LogModel from './components/LogModel'
export default {
  components: { LogModel },
  data() {
    return {
      query: {
        type: ''
      },
      dialog: {
        visible: false,
        data: {}
      }
    }
  },
  mounted() {
    this.getLogList()
  },
  methods: {
    showModel(data) {
      this.dialog.visible = true
      this.dialog.data = data
    },
    deleteItem(data) {
      const params = { id: data.id }
      this.$confirm('确定删除吗？').then(() => {
        Service.log()
          .deleteLog(params)
          .then((res) => {
            Peace.util.success(res.msg)

            this.getLogList()
          })
      })
    },
    getTypeText(type) {
      return Constant.typeStatus[type]
    },
    getLogList() {
      const params = Peace.util.deepClone(this.query)
      const fetch = Service.log().getLogList
      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>

<style>
</style>