// 编码管理

<template>
  <div class="full-width bg-white">
    <div class="card card-search">
      <div class="q-mb-md">
        <el-button icon="el-icon-arrow-left"
                   @click="back">返回上一页</el-button>
      </div>
      <div class="title q-mb-lg">分类维护-{{hospitalName}}</div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="分类标签">
          <el-input placeholder="请输入"
                    v-model.trim="model.mainCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="borderTop:16px solid #f5f5f5;"></div>

    <div class="card">

      <div class="q-mb-md">
        <el-button v-on:click="openImportDialog"
                   type="primary">批量导入</el-button>
        <el-button v-on:click="openEditlDialog({},'add')">新增</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="系统编码"
                          prop=""></PeaceTableColumn>

        <PeaceTableColumn label="分类标签"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop=""
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="操作">
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
      <EditModel :info="editModelDialog.data"
                 v-on:cancel="cancel"
                 v-on:complete="complete"
                 :type="'add'" />
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
        mainCode: '',
        diseaseName: ''
      },

      editModelDialog: {
        visible: false,
        data: {},
        type: ''
      }
    }
  },
  computed: {
    hospitalName() {
      return this.info.hospitalName || '北辰医院'
    },
    hospitalId() {
      return this.info.hospitalId
    }
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getSyncStatusList
      this.$refs.table.reloadData({ fetch, params })
    },
    openEditlDialog(data, type = 'add') {
      this.editModelDialog.visible = true
      this.editModelDialog.data = data
      this.editModelDialog.type = type
    },
    back() {
      this.$emit('onBack')
    },
    openImportDialog() {},
    cancel() {
      this.editModelDialog.visible = false
    },
    complete() {
      this.editModelDialog.visible = false
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