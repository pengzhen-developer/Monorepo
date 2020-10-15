// 药品选择
// 卡片形式


<template>
  <div class="relative-position">

    <div class="absolute"
         style="right: 0; top: -30px;">
      <el-button type="text"
                 v-on:click="showCommonlyPrescription">
        <span>常用处方</span>
        <i class="el-icon-d-arrow-right el-icon--right"></i>
      </el-button>
    </div>

    <div class="row q-col-gutter-sm">
      <div class="col-4"
           v-for="(drug, index) in drugList"
           v-bind:key="index">
        <DrugSelectItem v-bind:data="drug"
                        v-on:remove="onRemoveDrug"></DrugSelectItem>
      </div>

      <div v-if="showDrugSelect"
           class="col-4">
        <DrugSelectItem v-on:add="onAddDrug"></DrugSelectItem>
      </div>
    </div>

    <peace-dialog v-bind:visible.sync="visible"
                  title="常用处方"
                  width="800px">
      <peace-table pagination
                   ref="table">
        <peace-table-column label="疾病诊断"
                            min-width="160px"
                            prop="diagnosis"></peace-table-column>
        <peace-table-column label="性别"
                            width="80px"
                            prop="sex"></peace-table-column>
        <peace-table-column label="年龄"
                            width="120px"
                            prop="age"></peace-table-column>
        <peace-table-column align="left"
                            label="处方药品"
                            min-width="300px"
                            prop="drugjson">
          <template slot-scope="scope">
            <div v-for="drug in scope.row.drugList"
                 v-bind:key="drug.durgId"
                 class="q-mb-sm">
              <div>
                <el-tag class="q-mr-sm"
                        effect="dark"
                        type="warning"
                        v-if="drug.drugStatus === 'disable'">停用</el-tag>
                <span class="text-weight-bold q-mr-md">{{ drug.drugName }}</span>
                <span class="text-caption">{{ drug.specification }}</span>
              </div>
              <span>用法用量：</span>
              <span>每次{{ drug.singleDose }}{{ drug.drugUnit }}</span>
              <span>，{{ drug.drugFrequency }}</span>
              <span>，{{ drug.drugRoute }}</span>
              <span v-if="drug.useDrugDays">，{{ drug.useDrugDays }}天</span>
            </div>
          </template>
        </peace-table-column>
        <peace-table-column :show-overflow-tooltip="false"
                            fixed="right"
                            label="操作"
                            width="80px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="checkCommonlyPrescription(scope.row)">选择</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </peace-dialog>
  </div>
</template>

<script>
import Service from './service'

import DrugSelectItem from './DrugSelectItem'

export default {
  components: {
    DrugSelectItem
  },

  provide() {
    return {
      provideDrugFrequencyList: () => {
        return this.drugFrequencyList
      },

      provideDrugRouteList: () => {
        return this.drugRouteList
      }
    }
  },

  props: {
    maxCount: {
      type: Number,
      default() {
        return 5
      }
    },

    data: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      drugFrequencyList: [],
      drugRouteList: [],

      drugList: [],

      visible: false
    }
  },

  computed: {
    docInfo() {
      return this.$store.state.user?.userInfo?.list?.docInfo || {}
    },

    showDrugSelect() {
      return this.drugList.length < this.maxCount
    }
  },

  watch: {
    data: {
      handler() {
        this.drugList = this.data
      },
      immediate: true
    }
  },

  created() {
    this.getDictionary()
  },

  methods: {
    getModel() {
      return Peace.util.deepClone(this.drugList)
    },

    validModel() {
      let validObj = {
        isValid: true,
        message: ''
      }

      for (let index = 0; index < this.drugList.length; index++) {
        const drug = this.drugList[index]

        if (drug.drugId && drug.drugName) {
          // 验证给药途径
          if (Peace.validate.isEmpty(drug.drugRouteId) || Peace.validate.isEmpty(drug.drugRoute)) {
            validObj = {
              isValid: false,
              message: `[${drug.drugName}]请选择给药途径`
            }

            break
          }

          // 验证用药频次
          if (Peace.validate.isEmpty(drug.drugFrequencyId) || Peace.validate.isEmpty(drug.drugFrequency)) {
            validObj = {
              isValid: false,
              message: `[${drug.drugName}]请选择用药频次`
            }

            break
          }

          // 验证单次剂量
          if (Peace.validate.isEmpty(drug.singleDose)) {
            validObj = {
              isValid: false,
              message: `[${drug.drugName}]请输入单次剂量`
            }

            break
          }

          // 验证用药数量
          if (Peace.validate.isEmpty(drug.drugNum)) {
            validObj = {
              isValid: false,
              message: `[${drug.drugName}]请输入用药数量`
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

    getDictionary() {
      const params = {
        hospitalId: this.docInfo.netHospital_id
      }

      Service.drugFrequencyList(params).then((res) => {
        this.drugFrequencyList = res.data
      })
      Service.drugUsageList(params).then((res) => {
        this.drugRouteList = res.data
      })
    },

    getCommonlyPrescriptionList() {
      const fetch = Service.getCommonlyPrescriptionList

      this.$refs.table.loadData({ fetch })
    },

    showCommonlyPrescription() {
      this.visible = true

      this.$nextTick().then(() => {
        this.getCommonlyPrescriptionList()
      })
    },

    checkCommonlyPrescription(row) {
      Peace.util.confirm('选择常用处方，将清除已选药品', '提示', {}, () => {
        const drugList = Peace.util.deepClone(row.drugList)

        // el-input-number bug
        // v-model 绑定值为 null 时 ，绑定之被更新为组件最小值， undefined 则正常

        // null to undefined
        drugList.forEach((drug) => {
          drug.drugNum = drug.drugNum ?? undefined
          drug.singleDose = drug.singleDose ?? undefined
          drug.useDrugDays = drug.useDrugDays ?? undefined
        })

        this.drugList = []
        this.drugList = drugList

        this.visible = false
      })
    },

    onAddDrug(drug) {
      // 验证是否重复选择
      if (this.drugList.some((item) => item.drugId === drug.drugId)) {
        return Peace.util.warning(`您已添加该药品，请勿重复添加`)
      }

      this.drugList.push(drug)
    },

    onRemoveDrug(drug) {
      const drugIndex = this.drugList.findIndex((item) => item.drugId === drug.drugId)

      this.drugList.splice(drugIndex, 1)
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