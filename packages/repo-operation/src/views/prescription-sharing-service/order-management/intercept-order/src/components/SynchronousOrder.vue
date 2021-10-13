<template>
  <div>
    <el-form ref="form"
             label-width="130px"
             label-position="right">
      <el-form-item label="是否分单："
                    required>
        <el-radio-group v-model="model.isSplitOrder"
                        :disabled="isCanSplitOrder">
          <el-radio v-bind:label="
                        true">是</el-radio>
          <el-radio v-bind:label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-if="!model.isSplitOrder">

        <el-form-item label="是否更改编码："
                      required>
          <el-radio-group v-model="model.isChangeNo">
            <el-radio v-bind:label="
                        true">是</el-radio>
            <el-radio v-bind:label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-if="model.isChangeNo">
          <el-form-item label-width="20px">
            <el-table :data="tableData"
                      style="width: 100%">
              <el-table-column type="index"
                               fixed
                               label="序号"
                               width="60"></el-table-column>
              <el-table-column prop="DrugName"
                               label="药品名称"
                               width="120">
              </el-table-column>
              <el-table-column prop="DrugCode"
                               label="原药品编码"
                               width="150">
              </el-table-column>
              <el-table-column label="新药品编码">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.TDrugCode"
                            maxlength="50"
                            placeholder=""></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>

        <el-alert v-if=" !model.isChangeNo"
                  type="warning"
                  class="q-mb-16"
                  show-icon
                  :closable="false"
                  title="温馨提示：进行同步操作前，请先确认供应方库存充足，否则将影响发货进度">
        </el-alert>
        <el-alert v-if="model.isChangeNo"
                  type="warning"
                  class="q-mb-16"
                  show-icon
                  :closable="false"
                  title="温馨提示：进行同步操作前，请确保新药品编码的正确性，否则将导致下游同步失败，该操作不可逆">
        </el-alert>
      </div>

      <div v-else>
        <el-form-item label="分单数量：">
          <el-select style="width:112px"
                     v-model="model.splitOrderNumber">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分单方式："
                      class="item-width"></el-form-item>
        <div class="q-px-36 q-pb-32">
          <div class="q-mb-16"
               v-for="(item,index) in model.splitOrderModes"
               v-bind:key="item.sort">
            <el-form-item v-bind:label="`仓/门店${getChinesNum(item.sort)}：`"
                          required
                          class="item-width">
              <el-select style="width:100%"
                         v-model="item.Code"
                         v-on:change="selectDrugStore($event,index,list[index].DrugStoreDicts)"
                         filterable
                         clearable>
                <el-option v-for="store in list[index].DrugStoreDicts"
                           :key="store.Code"
                           :label="store.Name"
                           :value="store.Code">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="q-pl-20">
              <PeaceTable ref="table"
                          :data='item.drugDicts'
                          size="mini">
                <el-table-column prop="DrugName"
                                 label="药品名称"></el-table-column>
                <el-table-column label="订单总数量/单位">
                  <template slot-scope="scope">{{`${scope.row.DrugNumber}/${scope.row.DrugQtyUnit||'-'}`}}</template>
                </el-table-column>
                <el-table-column label="发货数量"
                                 width="114px">
                  <template slot-scope="scope">
                    <el-input-number controls-position="right"
                                     :min="0"
                                     :max="999"
                                     style="width:88px"
                                     v-model="scope.row.SoldNumber"></el-input-number>
                  </template>

                </el-table-column>
              </PeaceTable>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div class="text-right">
      <el-button v-on:click="cancel">取 消</el-button>
      <el-button type="primary"
                 v-on:click="syncOrder"
                 v-bind:loading="isLoading">{{model.isSplitOrder?"确认分单":"确认同步"}}</el-button>
    </div>
  </div>
</template>

<script>
import Util from '@src/util'
import Service from '../service'
export default {
  props: {
    orderId: String,
    IsSplitOrder: Number
  },
  data() {
    return {
      tableData: [],
      model: {
        orderId: this.orderId,
        isSplitOrder: true,
        isChangeNo: false,
        splitOrderNumber: 2,
        splitOrderModes: []
      },
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 }
      ],
      list: [],
      isLoading: false,
      isCanSplitOrder: false
    }
  },
  watch: {
    'model.splitOrderNumber'(val) {
      this.fetch(val)
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      if (this.IsSplitOrder == 3) {
        this.isCanSplitOrder = true
        this.model.isSplitOrder = false
      } else {
        this.fetch(2)
      }
    })
    this.GetOrderDetaile()
  },
  methods: {
    fetch(num) {
      const params = { orderId: this.orderId, num: num }
      this.model.splitOrderModes = []
      Service.splitOrderDetails(params).then((res) => {
        this.list = res.data.list
        this.list.map((item) => {
          let obj = { Code: '', Name: '', drugDicts: item.DrugDicts, sort: item.Sort }
          this.model.splitOrderModes.push(obj)
          this.model = Object.assign({}, this.model)
        })
      })
    },
    // 同步订单
    syncOrder() {
      if (this.model.isChangeNo) {
        //更改编码提交
        const isCanInput = this.tableData.some((item) => item.TDrugCode)
        if (isCanInput) {
          const params = { OrderId: this.orderId, DrugList: this.tableData }
          this.isLoading = true
          Service.SynOrderIntercept(params)
            .then((res) => {
              Peace.util.success(res.msg)
              this.isLoading = false
              this.$emit('refresh')
              this.$emit('close')
            })
            .catch(() => {
              this.isLoading = false
            })
        } else {
          Peace.util.warning('新编码不能为空，至少需填写一个')
        }
        return
      }
      const params = Peace.util.deepClone(this.model)
      if (params.isSplitOrder) {
        const isAll = params.splitOrderModes.filter((item) => item.Code === '').length > 0
        let isOnlyOne = false
        if (params.splitOrderModes.length == 1) {
          isOnlyOne = params.splitOrderModes.filter((item) => item.Code === 'OTHER').length > 0
        } else {
          isOnlyOne = params.splitOrderModes.filter((item) => item.Code === 'OTHER').length > 1
        }

        if (isAll) {
          return Peace.util.error('仓/门店不能都为空')
        }

        if (isOnlyOne) {
          return Peace.util.error('仓/门店不能都选其他')
        }

        let allSumResult = []
        let allStoreSumResult = []
        params.splitOrderModes[0].drugDicts.forEach((item, index) => {
          var sum = item.DrugNumber
          var writeSum = 0
          let storeSumResult = []
          params.splitOrderModes.forEach((item) => {
            var storeSum = 0
            item.drugDicts[index].SoldNumber =
              item.drugDicts[index].SoldNumber >= 0 ? item.drugDicts[index].SoldNumber : 0
            writeSum += item.drugDicts[index].SoldNumber
            item.drugDicts.forEach((drug) => {
              drug.SoldNumber = drug.SoldNumber >= 0 ? drug.SoldNumber : 0
              storeSum += drug.SoldNumber
            })
            if (storeSum == 0) {
              storeSumResult.push(true)
              allStoreSumResult.push(true)
            }
          })

          if (storeSumResult.length == 0 && sum !== writeSum) {
            allSumResult.push(true)
          }
        })

        if (allStoreSumResult.length > 0) {
          return Peace.util.error('已选店/仓的药品数量不能全部为0')
        }

        if (allSumResult.length > 0) {
          return Peace.util.error('输入的发货数量之和必须等于原订单中每种药品的总数量')
        }
      }
      this.isLoading = true
      Service.syncOrderSend(params)
        .then((res) => {
          Peace.util.success(res.msg)
          this.isLoading = false
          this.$emit('refresh')
          this.$emit('close')
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    cancel() {
      this.$emit('close')
    },
    getChinesNum(num) {
      return Util.universal.toChinesNum(num)
    },
    selectDrugStore(Code, index, list) {
      this.model.splitOrderModes[index].Name = list.find((temp) => temp.Code == Code)?.Name
    },

    GetOrderDetaile() {
      const params = { orderId: this.orderId }
      Service.GetOrderDetaile(params).then((res) => {
        this.tableData = res.data.list
      })
    }
  }
}
</script>

<style  lang="scss" scoped>
.item-width {
  margin-bottom: 16px !important;
}
</style>