<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">

        <el-form-item label="疾病名称">
          <el-input v-model.trim="model.name"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="更新日期">
          <PeaceDatePicker type="daterange"
                           v-model="pickDate"
                           value-format="yyyy-MM-dd"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"></PeaceDatePicker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary"
                   v-on:click="addItem">新增</el-button>
      </div>

      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="系统编码"
                          prop="code">
        </PeaceTableColumn>
        <PeaceTableColumn label="疾病名称"
                          prop="name">
        </PeaceTableColumn>
        <PeaceTableColumn label="已关联ICD编码"
                          prop="icdCount">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showDetail(scope.row)">{{scope.row.icdCount}}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop="updateTime">
        </PeaceTableColumn>

        <PeaceTableColumn width="240px"
                          fixed="right"
                          label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="editItem(scope.row)">修改</el-button>
            <el-button type="text"
                       v-on:click="associated(scope.row)">关联ICD编码</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog v-if="addDialog.visible"
                 width="445px"
                 v-bind:visible.sync="addDialog.visible"
                 :title="addDialog.isEdit ?  '修改疾病名称' : '新增疾病名称'">
      <AddDiseaseNameDialog v-bind:data="addDialog.itemData"
                            v-bind:isEdit="addDialog.isEdit"
                            v-on:onSuccess="addSuccess"
                            v-on:onClose="onClose"></AddDiseaseNameDialog>
    </PeaceDialog>

    <PeaceDialog v-if="relevanceDialog.visible"
                 width="1200px"
                 title="关联ICD编码"
                 v-bind:visible.sync="relevanceDialog.visible">
      <AssociatedICDCode v-bind:data="relevanceDialog.itemData"
                         v-on:onSuccess="associatedSuccess"
                         v-on:onClose="associatedClose"></AssociatedICDCode>
    </PeaceDialog>

    <PeaceDialog v-if="showIcdDetailsDialog.visible"
                 width="1000px"
                 title="已关联ICD编码"
                 v-bind:visible.sync="showIcdDetailsDialog.visible">
      <AssociatedICDCodeDetails v-bind:data="showIcdDetailsDialog.itemData"></AssociatedICDCodeDetails>
    </PeaceDialog>
  </div>
</template>

<script>
import AddDiseaseNameDialog from './components/AddDiseaseNameDialog'
import AssociatedICDCode from './components/AssociatedICDCode'
import AssociatedICDCodeDetails from './components/AssociatedICDCodeDetails'
import Service from './service'

export default {
  name: 'DieaseName',

  components: {
    AddDiseaseNameDialog,
    AssociatedICDCode,
    AssociatedICDCodeDetails
  },

  data() {
    return {
      model: {
        name: '',
        beginTime: '',
        endTime: ''
      },
      pickDate: [],
      addDialog: {
        visible: false,
        isEdit: false,
        itemData: {}
      },
      //关联ICD编码的弹框
      relevanceDialog: {
        itemData: {},
        visible: false
      },
      //查看已经关联了的ICD编码详情的弹框
      showIcdDetailsDialog: {
        itemData: {},
        visible: false
      }
    }
  },

  watch: {
    pickDate(value) {
      this.model.beginTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.platformDiseasePage
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    // 新增
    addItem() {
      this.addDialog.itemData = {}
      this.addDialog.isEdit = false
      this.addDialog.visible = true
    },
    // 修改
    editItem(row) {
      this.addDialog.itemData = row
      this.addDialog.isEdit = true
      this.addDialog.visible = true
    },
    // 关闭
    onClose() {
      this.addDialog.visible = false
    },
    //新增成功
    addSuccess() {
      this.addDialog.visible = false
      this.get()
    },

    showDetail(data) {
      this.showIcdDetailsDialog.itemData = data
      this.showIcdDetailsDialog.visible = true
    },

    //关联ICON
    associated(data) {
      this.relevanceDialog.itemData = data
      this.relevanceDialog.visible = true
    },
    associatedSuccess() {
      this.relevanceDialog.visible = false
      this.get()
    },
    associatedClose() {
      this.relevanceDialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
