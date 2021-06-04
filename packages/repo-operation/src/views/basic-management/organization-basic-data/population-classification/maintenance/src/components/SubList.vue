// 编码管理

<template>
  <div class="full-width bg-white">
    <div class="card card-search">
      <div class="q-mb-md">
        <el-button icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="title q-mb-lg">分类维护-{{info.orgName}}</div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="分类标签">
          <el-input placeholder="请输入"
                    v-model.trim="model.name"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="borderTop:16px solid #f5f5f5;"></div>

    <div class="card">

      <div class="q-mb-md">
        <el-button v-on:click="openEditlDialog(info,'add')">新增</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="系统编码"
                          prop="code"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="分类标签"
                          prop="name"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop="updateTime"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          fixed="right"
                          min-width="160px">
          <template slot-scope="scope">

            <el-button class="q-px-none"
                       type="text"
                       v-on:click="openEditlDialog(scope.row,'edit')">修改</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>

    </div>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="editModelDialog.visible"
                  :title="editModelDialog.type==='add'?'新增人群分类':'修改人群分类'"
                  v-if="editModelDialog.visible"
                  append-to-body
                  width="445px">
      <EditModel v-bind:info="editModelDialog.data"
                 v-on:cancel="cancel"
                 v-on:complete="complete"
                 v-bind:type="editModelDialog.type" />
    </peace-dialog>

  </div>
</template>

<script>
import Service from '../service'
import EditModel from './EditModel'
export default {
  name: 'SubList',
  components: { EditModel },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      model: {
        name: ''
      },
      editModelDialog: {
        visible: false,
        data: {},
        type: ''
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
      const params = Peace.util.deepClone(this.model)
      params.orgCode = this.info.orgCode
      const fetch = Service.getHumanClassList
      this.$refs.table.reloadData({ fetch, params })
    },
    openEditlDialog(data, type) {
      this.editModelDialog.visible = true
      this.editModelDialog.data = data
      this.editModelDialog.type = type
    },
    back() {
      this.$emit('onBack')
    },
    cancel() {
      this.editModelDialog.visible = false
    },
    complete() {
      this.editModelDialog.visible = false
      this.fetch()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 28px;
}
</style>