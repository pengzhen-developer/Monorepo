<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <div class="q-mb-18">
        <el-button plain
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="q-mb-24 org-name">
        {{props.Name}}
      </div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="药品编码">
          <PeaceInput v-model.trim="model.CustDrugsCode"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item label="药品名称">
          <PeaceInput v-model.trim="model.ProductName"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item label="药品状态">
          <PeaceSelect v-model="model.OnShelves"
                       placeholder="全部"
                       clearable>
            <el-option v-for="item in source.DRUG_STATUS"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </PeaceSelect>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-pb-24">
        <el-button type="primary"
                   v-on:click="updateGoodsStatus('up')">上架</el-button>
        <el-button type="primary"
                   v-on:click="updateGoodsStatus('down')">下架</el-button>
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
                          label="生产厂家"
                          prop="EnterpriseName">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="包装单位"
                          prop="PackUnit">
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
                          label="药品状态"
                          prop="OnShelves">
          <template slot-scope="scope">
            <span>{{scope.row.OnShelves | filterDictionary(source.DRUG_STATUS)}}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="200px"
                          label="更新时间"
                          prop="UpdateTime">
        </PeaceTableColumn>
      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'
import CONSTANT from '../constant'

export default {
  data() {
    return {
      loading: true,
      model: {
        PharmacyCode: '',
        CustDrugsCode: '',
        ProductName: '',
        OnShelves: ''
      },
      multipleSelection: [],
      source: {
        DRUG_STATUS: CONSTANT.DRUG_STATUS
      }
    }
  },

  computed: {
    props() {
      return Observable.state.props
    },
    view() {
      return Observable.state.view
    }
  },

  watch: {
    view(value) {
      if (value === Observable.constants.view.GOODS) {
        this.fetch()
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      if (this.props.PharmacyCode) {
        this.fetch()
      }
    })
  },

  methods: {
    fetch() {
      this.loading = true
      const fetch = Service.getGoodsList
      const params = Object.assign({}, this.model, { PharmacyCode: this.props.PharmacyCode })

      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

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

    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
    }
  }
}
</script>

<style lang="scss" scoped>
.org-name {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  line-height: 28px;
}
</style>