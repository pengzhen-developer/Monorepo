<template>
  <peace-table v-bind:data="drugList"
               border>
    <el-table-column label="药品名称"
                     min-width="180px">
      <template slot-scope="scope">

        <div class="cursor-pointer"
             title="点击修改">
          <!-- 未选择药品 -->
          <template v-if="!scope.row.drugid">
            <span class="text-center text-grey">点击添加药品...</span>
          </template>
          <!-- 已选择药品 -->
          <template v-else-if="scope.row.drugid">
            <span>{{ scope.row.drug_name }} </span>
          </template>

          <!-- 弹出修改 -->
          <q-popup-edit content-class="q-popup-class-drugselect"
                        v-bind:cover="false"
                        v-bind:offset="[0, 10]"
                        v-model="scope.row.drugid_popup">
            <el-autocomplete style="width: 400px"
                             placeholder="请输入药品关键字..."
                             popper-class="drug-select"
                             v-model="scope.row.drug_name"
                             v-on:select="(item) => { handleSelectDrug(item, scope) }"
                             v-bind:fetch-suggestions="queryDrugAsync">
              <template slot-scope="{ item }">
                <div class="name">{{ item.drug_name }}</div>
                <span class="addr">{{ item.drug_factory }}</span>
              </template>
            </el-autocomplete>
          </q-popup-edit>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="给药途径"
                     width="100px">
      <template slot-scope="scope">
        <div class="cursor-pointer">
          <!-- 未选择药品，不能选择给药途径 -->
          <template v-if="!scope.row.drugid"></template>
          <!-- 已选择药品，未选择给药途径 -->
          <template v-else-if="scope.row.drugid && !scope.row.dic_usage_id">
            <span class="text-center text-grey">请选择...</span>
          </template>
          <!-- 已选择药品，已选择给药途径 -->
          <template v-else-if="scope.row.dic_usage_id">
            <span>{{ scope.row.dic_usage }}</span>
          </template>

          <!-- 弹出修改 -->
          <q-popup-edit content-class="q-popup-class-drugselect"
                        v-bind:cover="false"
                        v-bind:offset="[0, 10]"
                        v-model="scope.row.dic_usage_id_popup">
            <el-select placeholder="请选择给药途径"
                       popper-class="drug-select"
                       v-model="scope.row.dic_usage_id"
                       v-on:change="item => { dicUsageChange(item, scope) }">
              <el-option v-bind:key="item.id"
                         v-bind:label="item.drugway_name"
                         v-bind:value="item.id"
                         v-for="item in dict.dic_usage"></el-option>
            </el-select>
          </q-popup-edit>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="用药频次"
                     width="100px">
      <template slot-scope="scope">
        <div class="cursor-pointer">
          <!-- 未选择药品，不能选择用药频次 -->
          <template v-if="!scope.row.drugid"></template>
          <!-- 已选择药品，未选择用药频次 -->
          <template v-else-if="scope.row.drugid && !scope.row.dic_frequency_id">
            <span class="text-center text-grey">请选择...</span>
          </template>
          <!-- 已选择药品，已选择用药频次 -->
          <template v-else-if="scope.row.dic_frequency_id">
            <span>{{ scope.row.dic_frequency }}</span>
          </template>

          <!-- 弹出修改 -->
          <q-popup-edit content-class="q-popup-class-drugselect"
                        v-bind:cover="false"
                        v-bind:offset="[0, 10]"
                        v-model="scope.row.dic_frequency_id_popup">
            <el-select placeholder="请选择用药频次"
                       popper-class="drug-select"
                       v-model="scope.row.dic_frequency_id"
                       v-on:change="item => { dicFrequencyChange(item, scope) }">
              <el-option v-bind:key="item.id"
                         v-bind:label="item.drugtimes_name"
                         v-bind:value="item.id"
                         v-for="item in dict.dic_frequency"></el-option>
            </el-select>
          </q-popup-edit>
        </div>
      </template>

    </el-table-column>

    <el-table-column label="用药天数"
                     width="80px">
      <template slot-scope="scope">
        <div class="cursor-pointer">
          <!-- 未选择药品，不能选择单次剂量 -->
          <template v-if="!scope.row.drugid"></template>
          <!-- 已选择药品，未输入单次剂量 -->
          <template v-else-if="scope.row.drugid && !scope.row.medication_days">
            <span class="text-center text-grey">请输入...</span>
          </template>
          <!-- 已选择药品，已输入单次剂量 -->
          <template v-else-if="scope.row.medication_days">
            <span>{{ scope.row.medication_days }}</span>
          </template>

          <!-- 弹出修改 -->
          <q-popup-edit content-class="q-popup-class-drugselect"
                        v-bind:cover="false"
                        v-bind:offset="[0, 10]"
                        v-model="scope.row.consump_popup">
            <el-input-number controls-position="right"
                             v-model="scope.row.medication_days"
                             v-bind:min="0"></el-input-number>
          </q-popup-edit>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="单次剂量"
                     width="80px">
      <template slot-scope="scope">
        <div class="cursor-pointer">
          <!-- 未选择药品，不能选择单次剂量 -->
          <template v-if="!scope.row.drugid"></template>
          <!-- 已选择药品，未输入单次剂量 -->
          <template v-else-if="scope.row.drugid && !scope.row.consump">
            <span class="text-center text-grey">请输入...</span>
          </template>
          <!-- 已选择药品，已输入单次剂量 -->
          <template v-else-if="scope.row.consump">
            <span>{{ scope.row.consump + scope.row.unit }}</span>
          </template>

          <!-- 弹出修改 -->
          <q-popup-edit content-class="q-popup-class-drugselect"
                        v-bind:cover="false"
                        v-bind:offset="[0, 10]"
                        v-model="scope.row.consump_popup">
            <el-input-number controls-position="right"
                             v-model="scope.row.consump"
                             v-bind:precision="1"
                             v-bind:step="0.1"
                             v-bind:min="0"></el-input-number>
            <span>{{ scope.row.unit }}</span>
          </q-popup-edit>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="数量"
                     width="80px">
      <template slot-scope="scope">
        <div class="cursor-pointer">
          <!-- 未选择药品，不能选择单次剂量 -->
          <template v-if="!scope.row.drugid"></template>
          <!-- 已选择药品，未输入单次剂量 -->
          <template v-else-if="scope.row.drugid && !scope.row.number">
            <span class="text-center text-grey">请输入...</span>
          </template>
          <!-- 已选择药品，已输入单次剂量 -->
          <template v-else-if="scope.row.number">
            <span>{{ scope.row.number }}</span>
          </template>

          <!-- 弹出修改 -->
          <q-popup-edit content-class="q-popup-class-drugselect"
                        v-bind:cover="false"
                        v-bind:offset="[0, 10]"
                        v-model="scope.row.number_popup">
            <el-input-number controls-position="right"
                             v-model="scope.row.number"
                             v-bind:precision="1"
                             v-bind:step="0.1"
                             v-bind:min="0"></el-input-number>
          </q-popup-edit>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作"
                     width="80px">
      <template slot-scope="scope">
        <el-button type="text"
                   v-if="scope.row.drugid"
                   v-on:click="deleteDrug(scope)">删除</el-button>
      </template>
    </el-table-column>
  </peace-table>
</template>

<script>
import peace from '@src/library'

export default {
  props: {
    // 最多可选择药品
    maxCount: {
      type: Number,
      default() {
        return 5
      }
    }
  },

  data() {
    return {
      // 行模型
      model: {
        // 药品编码
        drugid: undefined,
        // 药品名称
        drug_name: undefined,
        // 药品生产厂商
        drug_factory: undefined,
        // ？？
        drug_spec: undefined,

        // 单次剂量
        consump: undefined,
        // 单次剂量单位
        unit: undefined,
        // 数量
        number: undefined,

        // 用药天数
        medication_days: undefined,
        // 用法
        dic_usage: undefined,
        // 用法 id
        dic_usage_id: undefined,
        // 用药频次
        dic_frequency: undefined,
        // 用药频次 id
        dic_frequency_id: undefined
      },

      // 表格数据源
      drugList: [],

      // 药品异步获取数据源
      queryDrugLoading: false,
      queryDrugSource: [],

      // 下拉框数据源
      dict: {
        dic_usage: [],
        dic_frequency: []
      }
    }
  },

  watch: {
    // 当新选择药品时，新增一行
    drugList: {
      handler() {
        const lastDrug = this.drugList[this.drugList.length - 1]

        if (lastDrug.drugid && this.drugList.length < this.maxCount) {
          this.addDrug()
        }
      },
      deep: true
    }
  },

  created() {
    this.getDictionary()
    this.addDrug()
  },

  methods: {
    getDictionary() {
      const params = {
        hospitalId: this.$store.state.user.userInfo.list.docInfo.netHospital_id
      }

      peace.service.prescribePrescrip.drugUsageList(params).then((res) => {
        this.dict.dic_usage = res.data
      })
      peace.service.prescribePrescrip.drugFrequencyList(params).then((res) => {
        this.dict.dic_frequency = res.data
      })
    },

    addDrug() {
      const row = peace.util.deepClone(this.model)

      this.drugList.push(row)
    },

    deleteDrug(scope) {
      peace.util.confirm('确定删除吗', '提示', {}, () => {
        this.drugList.splice(scope.$index, 1)
      })
    },

    // 搜索药品
    queryDrugAsync(queryString, cb) {
      if (queryString) {
        this.queryDrugSource = []
        this.queryDrugLoading = true

        const netHospital_id = this.$store.state.user.userInfo.list.docInfo.netHospital_id

        const params = {
          hospitalId: netHospital_id,
          drugname: queryString
        }

        peace.service.prescribePrescrip
          .drugsList(params)
          .then((res) => {
            if (res.data && res.data.length > 0) {
              res.data.forEach((drug) => {
                drug.label = `${drug.drug_name} ${drug.drug_factory}`

                this.queryDrugSource.push(drug)
              })
              cb(res.data)
            } else {
              cb([])
            }
          })
          .finally(() => {
            this.queryDrugLoading = false
          })
      }
    },

    // 药品名称选择
    handleSelectDrug(item, scope) {
      // 当药品已存在，提示
      if (this.drugList.filter((drug) => drug.drugid === item.id).length === 1) {
        peace.util.warning('药品已存在，请勿重复添加')

        if (scope.$index !== this.drugList.length - 1) {
          this.deleteDrug(scope)
        }

        return
      }

      scope.row.drugid = item.id
      scope.row.drug_name = item.drug_name
      scope.row.drug_factory = item.drug_factory
      scope.row.drug_spec = item.drug_spec
      scope.row.unit = item.drug_unit

      // 默认药品数量、单次剂量值、用药天数
      scope.row.consump = 1
      scope.row.number = 1
      scope.row.medication_days = 0

      // 其他值默认为空
      scope.row.dic_usage = ''
      scope.row.dic_usage_id = ''
      scope.row.dic_frequency = ''
      scope.row.dic_frequency_id = ''

      this.queryDrugSource = []
    },

    // 给药途径选择
    dicUsageChange(value, scope) {
      const item = this.dict.dic_usage.find((item) => item.id === value)

      scope.row.dic_usage = item.drugway_name
      scope.row.dic_usage_id = item.id
    },

    // 用药频次选择
    dicFrequencyChange(value, scope) {
      const item = this.dict.dic_frequency.find((item) => item.id === value)

      scope.row.dic_frequency = item.drugtimes_name
      scope.row.dic_frequency_id = item.id
    },

    // 验证
    valid() {
      let validObj = {
        isValid: true,
        message: ''
      }

      for (let index = 0; index < this.drugList.length; index++) {
        const drug = this.drugList[index]

        if (drug.drugid && drug.drug_name) {
          // 验证给药途径
          if (peace.validate.isEmpty(drug.dic_usage_id) || peace.validate.isEmpty(drug.dic_usage)) {
            validObj = {
              isValid: false,
              message: `[${drug.drug_name}]请选择给药途径`
            }

            break
          }

          // 验证用药频次
          if (peace.validate.isEmpty(drug.dic_frequency_id) || peace.validate.isEmpty(drug.dic_frequency)) {
            validObj = {
              isValid: false,
              message: `[${drug.drug_name}]请选择用药频次`
            }

            break
          }

          // 验证单次剂量
          if (peace.validate.isEmpty(drug.consump) || drug.consump === 0) {
            validObj = {
              isValid: false,
              message: `[${drug.drug_name}]请输入单次剂量`
            }

            break
          }

          // 验证数量
          if (peace.validate.isEmpty(drug.number) || drug.number === 0) {
            validObj = {
              isValid: false,
              message: `[${drug.drug_name}]请输入数量`
            }

            break
          }

          // 验证用药天数
          // 用药天数为可选项，暂不开放验证
          // if (peace.validate.isEmpty(drug.medication_days)) {
          //   validObj = {
          //     isValid: false,
          //     message: `[${drug.drug_name}]请输入用药天数`
          //   }

          //   break
          // }
        }
      }

      return validObj
    },

    getModel() {
      const drugs = peace.util.deepClone(this.drugList)
      const lastDrug = drugs[drugs.length - 1]

      // 移除最后一行（为空行）
      if (lastDrug.drugid && lastDrug.drug_name) {
        return drugs
      } else {
        return drugs.splice(0, this.drugList.length - 1)
      }
    }
  }
}
</script>

<style lang="scss">
.drug-select {
  z-index: 99999 !important;

  li {
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

.q-popup-class-drugselect {
  padding: 16px;
  box-shadow: $--select-dropdown-shadow;
}
</style>