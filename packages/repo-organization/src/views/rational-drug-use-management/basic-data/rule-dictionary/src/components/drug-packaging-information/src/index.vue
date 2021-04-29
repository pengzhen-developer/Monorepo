<template>
  <div class="layout-route bg-grey-2">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-suffix="："
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent>
        <el-form-item label="药品名称">
          <el-input placeholder="请输入"
                    v-model.trim="model.ProductName"></el-input>
        </el-form-item>
        <el-form-item label="厂家">
          <el-input placeholder="请输入"
                    v-model.trim="model.EnterpriseName"></el-input>
        </el-form-item>

        <el-form-item class="search-btn">
          <el-button @click.stop="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">

      <div class="top-menu">
        <el-button @click="openDialog"
                   type="primary">批量导入</el-button>
        <el-button @click="download">模板下载</el-button>
      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  :page-size="10"
                  max-height="600">
        <PeaceTableColumn label="药品编码"
                          min-width="120px"
                          prop="CustDrugsCode"></PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          min-width="150px"
                          prop="ProductName"></PeaceTableColumn>
        <PeaceTableColumn label="包装规格"
                          min-width="150px"
                          prop="DrugSpecifications">
        </PeaceTableColumn>
        <PeaceTableColumn label="厂家"
                          min-width="180px"
                          prop="EnterpriseName">
        </PeaceTableColumn>
        <PeaceTableColumn label="基本剂量"
                          align="center"
                          min-width="100px"
                          prop="BaseDose">
        </PeaceTableColumn>
        <PeaceTableColumn label="剂量单位"
                          align="center"
                          min-width="100px"
                          prop="DoseUnit">
        </PeaceTableColumn>
        <PeaceTableColumn label="包装数量"
                          align="center"
                          min-width="100px"
                          prop="PackNum">
        </PeaceTableColumn>
        <PeaceTableColumn label="最小单位"
                          align="center"
                          min-width="100px"
                          prop="MinUnit">
        </PeaceTableColumn>
        <PeaceTableColumn label="包装单位"
                          align="center"
                          min-width="100px"
                          prop="PackUnit">
        </PeaceTableColumn>
        <PeaceTableColumn label="容量数值"
                          align="center"
                          min-width="100px"
                          prop="capacity_value">
        </PeaceTableColumn>
        <PeaceTableColumn label="容量单位"
                          align="center"
                          min-width="100px"
                          prop="capacity_unit">
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          align="left"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="update(scope.row)">修改</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
    <!-- 批量导入 -->
    <PeaceDialog width="720px"
                 append-to-body
                 v-if="importDialog.visible"
                 v-bind:visible.sync="importDialog.visible"
                 title="批量导入">
      <Import @close="closeDialog"
              @refresh="get"></Import>
    </PeaceDialog>

    <!-- 药品包装信息修改 -->
    <PeaceDialog width="420px"
                 v-if="modelDialog.visible"
                 append-to-body
                 v-bind:visible.sync="modelDialog.visible"
                 title="药品包装信息修改">
      <Model :id="modelDialog.id"
             @cancel="modelDialog.visible = false"
             @success="closeModelDialog"></Model>
    </PeaceDialog>

  </div>
</template>
<script>
import Import from './components/Import'
import Model from './components/Model'
import Service from './service'

export default {
  name: 'DrugPackagingInformation',
  data() {
    return {
      model: {
        ProductName: '',
        EnterpriseName: ''
      },
      list: [],
      importDialog: {
        visible: false
      },
      modelDialog: {
        visible: false,
        id: ''
      }
    }
  },
  components: { Import, Model },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },
  methods: {
    get() {
      const fetch = Service.getDrugPackagingList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    /* 下载导入模板 */
    download() {
      this.$confirm('下载 <strong>药品包装信息批量导入模板<strong> ？', '文件下载', {
        dangerouslyUseHTMLString: true,
        type: 'info',
        closeOnClickModal: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_BASE}psd/Template/DrugSpecifications.xlsx`
        window.open(url, '_blank')
        this.$notify({
          title: '药品包装信息导入模板获取成功！',
          message: <div class="alert-text">若无法正常下载,请复制链接至其他浏览器重试{url}</div>,
          duration: 10000
        })
      })
    },
    openDialog() {
      this.importDialog.visible = true
    },
    closeDialog() {
      this.importDialog.visible = false
    },
    update(row) {
      this.modelDialog.id = row.ID
      this.modelDialog.visible = true
    },
    closeModelDialog() {
      this.get()
      this.modelDialog.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.top-menu {
  margin-bottom: 20px;
}
.alert-text {
  word-break: break-all;
}
</style>
