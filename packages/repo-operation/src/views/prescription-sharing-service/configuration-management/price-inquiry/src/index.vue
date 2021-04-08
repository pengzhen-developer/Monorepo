<template>
  <div class="layout-route">
    <el-alert type="warning"
              class="q-mb-16"
              v-bind:closable="false">
      <div>1、仅支持对流向配置设置了集团ERP云仓的医疗机构进行配置，添加医疗机构前请先核实是否已设置好云仓，否则将无法显示药品供应方；</div>
      <div>2、完成配置价格类型后，医疗机构通过接口查询智药云商品价格时，可查询类型将即时生效。</div>
    </el-alert>
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-bind:model="model"
               v-on:submit.native.prevent>

        <el-form-item label="医疗机构">
          <el-input v-model="model.SourceCustName"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button v-on:click="addItem">新增</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="医疗机构名称"
                          prop="SourceCustName"></PeaceTableColumn>
        <PeaceTableColumn label="药品供应方"
                          prop="TargetCustName"></PeaceTableColumn>
        <PeaceTableColumn label="可查询价格类型"
                          prop="PriceAuthorityStr">
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop="LastModifyTime"
                          width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="changeItem(scope.row)">修改</el-button>
            <el-button type="text"
                       v-on:click="deleteItem(scope.row)">删除</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog v-if="dialog.visible"
                 width="480px"
                 v-bind:visible.sync="dialog.visible"
                 :title="dialog.title">
      <AddOrEditPriceInquiry v-bind:dataInfo="dialog.data"
                             v-on:onSucess="addItemSuccess"
                             v-on:onCancel="dialog.visible = false"></AddOrEditPriceInquiry>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from './service/index'
import AddOrEditPriceInquiry from './components/AddOrEditPriceInquiry'
export default {
  name: 'AfterSalesOrder',
  components: {
    AddOrEditPriceInquiry
  },
  data() {
    return {
      model: {
        SourceCustName: ''
      },
      priceStrList: [],
      dialog: {
        visible: false,
        data: {},
        title: ''
      }
    }
  },

  async created() {
    // 获取价格类型字典
    this.priceStrList = await Peace.identity.dictionary.getList('PriceInquriyType')
    this.fetch()
  },

  // mounted() {
  //   this.$nextTick(() => {
  //     this.fetch()
  //   })
  // },
  methods: {
    fetch() {
      const params = Object.assign({}, this.model)
      const fetch = Service.GetPriceAuthority
      const filter = (res) => {
        res?.data?.list?.forEach((row) => {
          const PriceAuthorityList = row.PriceAuthority?.split(',') || []
          row.PriceAuthorityStr = PriceAuthorityList.map((row) => {
            return this.priceStrList.find((item) => item.value === row)?.label
          }).join(',')
        })
        return res
      }
      this.$refs.table.reloadData({ fetch, params, filter })
    },

    // 新增
    addItem() {
      this.dialog.data = null
      this.dialog.title = '新增'
      this.dialog.visible = true
    },

    //修改
    changeItem(row) {
      console.log(row)
      this.dialog.data = row
      this.dialog.title = '修改'
      this.dialog.visible = true
    },
    //删除
    deleteItem(row) {
      this.$confirm('确定删除吗？', { closeOnClickModal: false, closeOnPressEscape: false }).then(() => {
        const params = { id: row.Id }
        debugger
        Service.DeletePriceAuthority(params).then((res) => {
          Peace.util.success(res.msg)
          this.fetch()
        })
      })
    },

    addItemSuccess() {
      this.dialog.visible = false
      this.fetch()
    }
  }
}
</script>

<style>
</style>