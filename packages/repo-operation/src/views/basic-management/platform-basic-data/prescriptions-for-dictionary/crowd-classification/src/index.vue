<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch"
               label-suffix="："
               size="mini">

        <el-form-item label="分类标签">
          <PeaceInput v-model.trim="model.name"
                      maxlength="50"
                      placeholder="请输入"></PeaceInput>
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
                     v-on:click="fetch">查询</el-button>
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
                          min-width="250px"
                          prop="code">
        </PeaceTableColumn>
        <PeaceTableColumn label="分类标签"
                          min-width="300px"
                          prop="name">
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          min-width="180px"
                          prop="updateTime">
        </PeaceTableColumn>

        <PeaceTableColumn width="240px"
                          fixed="right"
                          label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="editItem(scope.row)">修改</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog v-if="addDialog.visible"
                 width="445px"
                 v-bind:visible.sync="addDialog.visible"
                 :title="addDialog.isEdit ?  '修改人群分类' : '新增人群分类'">
      <AddClassificationDialog v-bind:data="addDialog.itemData"
                               v-bind:isEdit="addDialog.isEdit"
                               v-on:onSuccess="addSuccess"
                               v-on:onClose="onClose"></AddClassificationDialog>
    </PeaceDialog>

  </div>
</template>

<script>
import AddClassificationDialog from './components/AddClassificationDialog'
import Service from './service'

export default {
  name: 'CrowdClassification',

  components: {
    AddClassificationDialog
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
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.platformHumanClassPage
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
      this.fetch()
    }
  }
}
</script>

<style lang="scss" scoped></style>
