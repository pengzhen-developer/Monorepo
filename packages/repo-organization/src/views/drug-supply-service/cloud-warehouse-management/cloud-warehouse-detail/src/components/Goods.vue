<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <div class="q-mb-18">
        <el-button plain
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="q-mb-24 org-name">
        {{props.云仓名称}}
      </div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="药品编码">
          <PeaceInput v-model.trim="model.code"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item label="药品名称">
          <PeaceInput v-model.trim="model.name"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item label="药品状态">
          <PeaceSelect v-model="model.status"
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
                          prop="药品编码">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="药品名称"
                          prop="药品名称">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="药品规格"
                          prop="药品规格">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="生产厂家"
                          prop="生产厂家">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="包装单位"
                          prop="包装单位">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="批准文号"
                          prop="批准文号">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="库存"
                          prop="库存">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="药品状态"
                          prop="药品状态">
          <template slot-scope="scope">
            <span>{{scope.row.status | filterDictionary(source.DRUG_STATUS)}}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="200px"
                          label="更新时间"
                          prop="更新时间">
        </PeaceTableColumn>
      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'
import CONSTANT from '../constant'

let CLOUD_MODEL = {
  Id: '', // 云仓唯一标识
  Name: '', // 名称
  SystemCode: '', // 系统编码
  Type: '', // 系统类型 0 ERP  2 九州云仓
  CodeIn3PartPlatform: '', // 物流中心ID  / branchid
  IDIn3PartPlatform: '', // 运营方ID
  PrentCustList: [] // 机构数据信息
}

export default {
  data() {
    return {
      loading: true,
      model: {
        ID: '',
        code: '',
        name: '',
        status: ''
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
      if (this.props.云仓ID) {
        this.fetch()
      }
    })
  },

  methods: {
    fetch() {
      this.loading = true
      const fetch = Service.getGoodsList
      const params = Object({}, this.model, { 云仓ID: this.props.云仓ID })

      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },
    getInfo() {
      let params = {
        ID: this.props.ID
      }
      Service.getInfo(params).then((res) => {
        this.cloudInfo = res.data.GetCustIn3PartRes || Object.assign({}, CLOUD_MODEL)
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
        let hasDown = list.find((item) => item.status === 0)
        if (hasDown) {
          Peace.util.warning('仅【未上架】商品能进行上架操作，请选择对应的药品状态完成操作')
          return false
        }
        let params = {
          ids: list.map((item) => item.id),
          staus: 'up'
        }
        Service.updateGoodsStatus(params).then(() => {
          Peace.util.success('上架成功')
          this.fetch()
        })
      } else if (type === 'down') {
        let hasUp = list.find((item) => item.status === 1)
        if (hasUp) {
          Peace.util.warning('仅【已上架】商品能进行下架操作，请选择对应的药品状态完成操作')
          return false
        }
        let params = {
          ids: list.map((item) => item.id),
          staus: 'down'
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