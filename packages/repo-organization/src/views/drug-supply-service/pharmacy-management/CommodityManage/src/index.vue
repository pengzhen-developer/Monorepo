<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>药品编号</span>
            <span>：</span>
          </span>
          <el-input v-model.trim=" model.CustDrugsCode"
                    maxlength="50"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>药品名称</span>
            <span>：</span>
          </span>
          <el-input v-model.trim=" model.ProductName"
                    maxlength="50"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>批准文号</span>
            <span>：</span>
          </span>
          <el-input v-model.trim=" model.ApprovalNumber"
                    maxlength="50"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>生产厂家</span>
            <span>：</span>
          </span>
          <el-input v-model.trim=" model.EnterpriseName"
                    maxlength="50"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>药品状态</span>
            <span>：</span>
          </span>
          <PeaceSelect v-model="model.OnShelves"
                       placeholder="全部"
                       filterable
                       clearable>
            <el-option v-for="item in source.DRUG_STATUS"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </PeaceSelect>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     @click="fetch">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <div class="top-menu">
        <el-button type="primary"
                   v-on:click="updateGoodsStatus('up')">上架</el-button>
        <el-button type="primary"
                   v-on:click="updateGoodsStatus('down')">下架</el-button>
        <el-button type="primary"
                   v-on:click="importDataForPrice"
                   v-if="isNonSystemDocking">导入库存价格</el-button>

        <el-button type="primary"
                   v-on:click="importDataForUpAndDown">批量上下架</el-button>
      </div>

      <PeaceTable ref="table"
                  size="mini"
                  pagination
                  v-loading="loading"
                  @selection-change="handleSelectionChange"
                  style="width: 100%">
        <PeaceTableColumn type="selection"
                          width="55">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="药品编码"
                          prop="CustDrugsCode">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="药品名称"
                          prop="ProductName">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="药品规格"
                          prop="DrugSpecifications">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="包装单位"
                          prop="PackUnit">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="生产厂家"
                          prop="EnterpriseName">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="批准文号"
                          prop="ApprovalNumber">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="库存"
                          prop="Stock">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="销售单价（元）"
                          prop="Price">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="药品状态"
                          prop="OnShelves">
          <template slot-scope="scope">
            <span>{{ (scope.row.OnShelves).toString() | filterDictionary(source.DRUG_STATUS)}}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="200px"
                          label="更新时间"
                          prop="UpdateTime">
        </PeaceTableColumn>

        <PeaceTableColumn label="操作"
                          align="left"
                          v-if="isNonSystemDocking"
                          width="180px"
                          fixed="right">
          <template slot-scope="scope">

            <el-button type="text"
                       v-on:click="changeStock(scope.row)">修改库存</el-button>
            <el-button type="text"
                       v-on:click="changePrice(scope.row)">修改价格</el-button>

          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 修改库存 -->
    <PeaceDialog v-if="changeStockDialog.visible"
                 width="450px"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 v-bind:visible.sync="changeStockDialog.visible"
                 title="修改库存">
      <ChangeStockDialog :data="changeStockDialog.data"
                         v-on:onSucess="changeStockSuccess"
                         v-on:onCancel="changeStockDialog.visible = false"></ChangeStockDialog>
    </PeaceDialog>

    <!-- 修改价格 -->
    <PeaceDialog v-if="changePriceDialog.visible"
                 width="450px"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 v-bind:visible.sync="changePriceDialog.visible"
                 title="修改价格">
      <ChangePriceDialog :data="changePriceDialog.data"
                         v-on:onSucess="changePriceSuccess"
                         v-on:onCancel="changePriceDialog.visible = false"></ChangePriceDialog>
    </PeaceDialog>

    <!-- 导入库存和价格 -->
    <PeaceDialog v-if="importDialogForPrice.visible"
                 :visible.sync="importDialogForPrice.visible"
                 title="导入库存价格">
      <peace-base-import-workflow :actions="importDialogForPrice.actions"
                                  :stepsList="importDialogForPrice.stepsList"
                                  :templateDownloadUrl="importDialogForPrice.templateDownloadUrl"
                                  :templateName="importDialogForPrice.templateName"
                                  :downloadErrorUrl="importDialogForPrice.downloadErrorUrl"
                                  :maxSize="importDialogForPrice.maxSize"
                                  :otherData="importDialogForPrice.otherData"
                                  @close="closeImportDialogForPrice"
                                  @success="importSuccessForPrice" />
    </PeaceDialog>

    <!-- 批量上下架 -->
    <PeaceDialog v-if="importDialogForUpAndDown.visible"
                 :visible.sync="importDialogForUpAndDown.visible"
                 title="批量上下架">
      <peace-base-import-workflow :actions="importDialogForUpAndDown.actions"
                                  :stepsList="importDialogForUpAndDown.stepsList"
                                  :templateDownloadUrl="importDialogForUpAndDown.templateDownloadUrl"
                                  :templateName="importDialogForUpAndDown.templateName"
                                  :downloadErrorUrl="importDialogForUpAndDown.downloadErrorUrl"
                                  :maxSize="importDialogForUpAndDown.maxSize"
                                  :otherData="importDialogForUpAndDown.otherData"
                                  @close="closeImportDialogForUpAndDown"
                                  @success="importSuccessForUpAndDown" />
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service'
import ChangeStockDialog from './components/ChangeStockDialog'
import ChangePriceDialog from './components/ChangePriceDialog.vue'
import { PeaceBaseImportWorkflow } from 'peace-components'
export default {
  name: 'CommodityManage',
  components: { ChangeStockDialog, ChangePriceDialog, PeaceBaseImportWorkflow },
  data() {
    return {
      loading: true,
      accessMode: '',
      model: {
        PharmacyCode: '',
        CustDrugsCode: '',
        ProductName: '',
        EnterpriseName: '',
        OnShelves: '',
        ApprovalNumber: ''
      },
      multipleSelection: [],
      source: {
        DRUG_STATUS: []
      },
      changeStockDialog: {
        visible: false,
        data: {}
      },
      changePriceDialog: {
        visible: false,
        data: {}
      },
      //导入库存和价格
      importDialogForPrice: {
        visible: false,
        actions: `${process.env.VUE_APP_API_BASE}psd/Excel/ImportExcelNew`,
        templateDownloadUrl: `${process.env.VUE_APP_API_BASE}psd/Template/importGood.xlsx`,
        downloadErrorUrl: `${process.env.VUE_APP_API_BASE}psd/Excel/Downloaderror?key=`,
        templateName: '导入库存价格',
        otherData: {}
      },
      //批量上下架
      importDialogForUpAndDown: {
        visible: false,
        actions: `${process.env.VUE_APP_API_BASE}psd/Excel/ImportExcelNew`,
        templateDownloadUrl: `${process.env.VUE_APP_API_BASE}psd/Template/ImportOnShelves.xlsx`,
        downloadErrorUrl: `${process.env.VUE_APP_API_BASE}psd/Excel/Downloaderror?key=`,
        templateName: '批量上下架',
        otherData: {}
      }
    }
  },

  watch: {
    $route(to) {
      console.log(to)
      if (to.name === this.$options.name) {
        this.refreshData()
      }
    }
  },

  created() {
    this.model.PharmacyCode = Peace.cache.sessionStorage.get('Code')
  },

  async mounted() {
    this.source.DRUG_STATUS = await Peace.identity.dictionary.getList('IsShelves')
    await this.getServiceInfo()
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  computed: {
    //判断当前是不是非系统对接模式
    isNonSystemDocking() {
      return this.accessMode === '2'
    }
  },

  methods: {
    async refreshData() {
      this.model.PharmacyCode = Peace.cache.sessionStorage.get('Code')
      this.source.DRUG_STATUS = await Peace.identity.dictionary.getList('IsShelves')
      await this.getServiceInfo()
      this.$nextTick().then(() => {
        this.fetch()
      })
    },

    fetch() {
      this.loading = true
      const fetch = Service.getGoodsList
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },

    //获取当前是不是系统对接
    getServiceInfo() {
      const params = {}
      return Service.getServiceInfo(params).then((res) => {
        this.accessMode = res.data.accessMode
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    //上下架
    updateGoodsStatus(type) {
      let list = [].concat(this.multipleSelection)
      if (list.length === 0) {
        Peace.util.warning('请先选择一条数据再进行操作')
        return false
      }
      if (type === 'up') {
        let hasUp = list.find((item) => item.OnShelves === 1)
        if (hasUp) {
          Peace.util.warning('仅【未上架】商品能进行上架操作，请选择对应的药品状态完成操作')
          return false
        }
        let params = {
          stocks: list.map((item) => {
            return {
              Id: item.GoodsId,
              OnShelves: 1
            }
          })
        }
        Service.updateGoodsStatus(params).then(() => {
          Peace.util.success('上架成功')
          this.fetch()
        })
      } else if (type === 'down') {
        let hasDown = list.find((item) => item.OnShelves === 0)
        if (hasDown) {
          Peace.util.warning('仅【已上架】商品能进行下架操作，请选择对应的药品状态完成操作')
          return false
        }
        let params = {
          stocks: list.map((item) => {
            return {
              Id: item.GoodsId,
              OnShelves: 0
            }
          })
        }
        Service.updateGoodsStatus(params).then(() => {
          Peace.util.success('下架成功')
          this.fetch()
        })
      }
    },

    //修改库存
    changeStock(res) {
      this.changeStockDialog.data = res
      this.changeStockDialog.visible = true
    },
    //修改库存成功
    changeStockSuccess() {
      this.changeStockDialog.visible = false
      this.fetch()
    },

    //修改价格
    changePrice(res) {
      this.changePriceDialog.data = res
      this.changePriceDialog.visible = true
    },
    //修改价格成功
    changePriceSuccess() {
      this.changePriceDialog.visible = false
      this.fetch()
    },

    //导入库存价格
    importDataForPrice() {
      this.importDialogForPrice.otherData = {
        billType: '18',
        customer: this.model.PharmacyCode
      }
      this.importDialogForPrice.visible = true
    },
    //导入库存价格关闭
    closeImportDialogForPrice() {
      this.importDialogForPrice.visible = false
    },
    //导入库存价格成功
    importSuccessForPrice() {
      this.importDialogForPrice.visible = false
      this.fetch()
    },

    //批量上下架
    importDataForUpAndDown() {
      this.importDialogForUpAndDown.otherData = {
        billType: '19',
        customer: this.model.PharmacyCode
      }
      this.importDialogForUpAndDown.visible = true
    },
    //批量上下架关闭
    closeImportDialogForUpAndDown() {
      this.importDialogForUpAndDown.visible = false
    },
    //批量上下架成功
    importSuccessForUpAndDown() {
      this.importDialogForUpAndDown.visible = false
      this.fetch()
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu {
  margin-bottom: 20px;
}
</style>