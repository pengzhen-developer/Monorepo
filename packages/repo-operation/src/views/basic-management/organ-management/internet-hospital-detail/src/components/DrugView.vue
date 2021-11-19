<template>
  <div class="drug-info">
    <div :key="drug.col1"
         class="tr"
         v-for="drug in drugInfo">
      <div :class="{'no-justify': drug.col1.length > 4 }"
           class="th">{{ drug.col1 }}</div>
      <div class="td">{{ drug.col2 }}</div>
      <div :class="{'no-justify': drug.col3.length > 4 }"
           class="th">{{ drug.col3 }}</div>
      <div class="td">{{ drug.col4 }}</div>
    </div>
  </div>
</template>
<script>
import CONSTANT from '../constant'

export default {
  name: 'DrugView',
  props: {
    drug: {
      type: Object
    }
  },
  data() {
    return {
      source: {
        ENUM_DRUG_NATURE: CONSTANT.ENUM_DRUG_NATURE,
        ENUM_DRUG_SOURCE: CONSTANT.ENUM_DRUG_SOURCE,
        ENUM_MEDICAL_STATUS: CONSTANT.ENUM_MEDICAL_STATUS,
        ENUM_DRUG_STORAGE: CONSTANT.ENUM_DRUG_STORAGE,
        ENUM_DISCONNECT: CONSTANT.ENUM_DISCONNECT,
        ENUM_OTC_DRUG: CONSTANT.ENUM_OTC_DRUG,
        ENUM_DRUG_UNIT_TYPE: []
      },
      drugInfo: []
    }
  },

  async mounted() {
    this.source.ENUM_DRUG_UNIT_TYPE = await Peace.identity.dictionary.getList('drug_unit_type')
    this.drugInfo = this.getData()
  },

  methods: {
    getData() {
      const drug = this.drug

      return [
        {
          col1: '药品编号',
          col2: drug.drug_number,
          col3: '药品通用名称',
          col4: drug.drug_name
        },
        {
          col1: '药品规格',
          col2: drug.drug_spec,
          col3: '药品剂型',
          col4: drug.drug_form
        },
        {
          col1: '生产厂家',
          col2: drug.drug_factory,
          col3: '最小单位',
          col4: drug.drug_litle
        },
        {
          col1: '药品价格',
          col2: drug.drug_unitPrice + ' (元)',
          col3: '基本剂量',
          col4: drug.drug_base
        },
        {
          col1: '剂量单位',
          col2: drug.drug_unit,
          col3: '批准文号',
          col4: drug.license_number
        },
        {
          col1: '商品名',
          col2: drug.drug_shopname,
          col3: '本位码',
          col4: drug.drug_code
        },
        {
          col1: '药品来源',
          col2: this.getDrugSource(drug.source),
          col3: '医保目录',
          col4: this.getMedicalStatus(drug.is_medical)
        },
        {
          col1: '药品类型',
          col2: this.getDrugNature(drug.drug_nature),
          col3: '包装单位',
          col4: drug.drug_dept
        },
        {
          col1: '包装数量',
          col2: drug.drug_count,
          col3: '推荐给药途径',
          col4: drug.recommendRoute
        },
        {
          col1: '推荐给药频次',
          col2: drug.recommendFrequency,
          col3: '推荐用量数值',
          col4: drug.drug_usevalue
        },
        {
          col1: '推荐用量单位类型',
          col2: this.getDrugUnitType(drug.drugUnitType),
          col3: '储存条件',
          col4: this.getDrugStorage(drug.drug_storage)
        },
        {
          col1: '拆零',
          col2: this.getDisconnect(drug.is_disconnect_attr),
          col3: 'OTC药品',
          col4: this.getOtcDurgType(drug.otcDrug)
        },
        {
          col1: '药品医保编码',
          col2: drug.drugMedicalCode,
          col3: '助记码',
          col4: drug.initials
        }
      ]
    },
    getDrugNature(status) {
      return this.source.ENUM_DRUG_NATURE.find((item) => item.value == status)?.label
    },
    getMedicalStatus(status) {
      return this.source.ENUM_MEDICAL_STATUS.find((item) => item.value == status)?.label
    },
    getDrugSource(source) {
      return this.source.ENUM_DRUG_SOURCE.find((item) => item.value == source)?.label
    },
    getDrugStorage(storage) {
      return this.source.ENUM_DRUG_STORAGE.find((item) => item.value == storage)?.label
    },
    getDisconnect(disconnect) {
      return this.source.ENUM_DISCONNECT.find((item) => item.value == disconnect)?.label
    },
    getDrugUnitType(drugUnitType) {
      return this.source.ENUM_DRUG_UNIT_TYPE.find((item) => item.value == drugUnitType)?.label
    },
    getOtcDurgType(otcDrug) {
      return this.source.ENUM_OTC_DRUG.find((item) => item.value == otcDrug)?.label
    }
  }
}
</script>
<style lang="scss" scoped>
$border-color: #cecece;
.drug-info {
  padding: 0 14px 14px 14px;
  .tr {
    display: flex;
    flex-wrap: nowrap;
    border-top: 1px solid $border-color;
    &:last-of-type {
      border-bottom: 1px solid $border-color;
    }
    .th,
    .td {
      border-left: 1px solid $border-color;
      padding: 9px 26px;
      font-size: 14px;
      line-height: 20px;
      color: black;
    }
    .th {
      width: 56px;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      box-sizing: content-box;
      background-color: rgba(245, 247, 250, 1);
      &.no-justify {
        padding: 9px 0;
        width: 108px;
        text-align: center;
        text-align-last: auto;
        text-justify: inherit;
      }
    }
    .td {
      padding: 9px 11px;
      flex: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:last-of-type {
        border-right: 1px solid $border-color;
      }
    }
  }
}
</style>
