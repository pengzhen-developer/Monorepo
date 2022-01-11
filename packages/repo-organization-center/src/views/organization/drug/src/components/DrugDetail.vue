<template>
  <div class="table">
    <div class="row">
      <div class="col-6 row tr"
           v-for="drug in drugInfo"
           v-bind:key="drug.label">
        <div class="th"
             style="width: 130px;">{{ drug.label }}</div>
        <div class="td col">{{ drug.value }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  },

  data() {
    return {
      drugInfo: []
    }
  },

  async mounted() {
    this.drugInfo = this.getData()
  },

  methods: {
    getData() {
      const drug = this.data

      return [
        { label: '药品编码', value: drug.code },
        { label: '通用名', value: drug.name },
        { label: '商品名', value: drug.productName },
        { label: '药品规格', value: drug.drugSpecifications },
        { label: '剂型', value: drug.drugDosageForm },
        { label: '生产厂家', value: drug.enterpriseCnName },
        { label: '最小单位', value: drug.minUnit },
        { label: '药品价格', value: drug.price },
        { label: '基本剂量', value: drug.baseDose },
        { label: '剂量单位', value: drug.doseUnit },
        { label: '批准文号', value: drug.approvalNo },
        { label: '本位码', value: drug.drugCscCode },
        { label: '药品来源', value: drug.drugSourceName },
        { label: '医保目录', value: drug.medicalInsuranceCatalogue },
        { label: '药品医保编码', value: drug.medicalInsuranceCode },
        { label: '包装单位', value: drug.packageUnit },
        { label: '包装数量', value: drug.packageNum },
        { label: '推荐给药途径', value: drug.recommendRouteCode },
        { label: '推荐给药频次', value: drug.recommendFrequencyCode },
        { label: '推荐单次用量数值', value: drug.recommendSingleDose },
        { label: '推荐单次用量单位', value: drug.recommendSingleDoseUnit },
        { label: '储存条件', value: drug.storageConditions },
        { label: '是否可拆零', value: drug.isApart },
        { label: '助记码', value: drug.mnemonics },
        { label: '商品类型', value: drug.productTypeValue },
        { label: '药品类型', value: drug.drugTypeValue },
        { label: '处方药属性', value: drug.prescriptionTypeValue },
        { label: '使用状态', value: drug.status }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
$border-color: #cecece;
.table {
  border-top: 1px solid $border-color;
  border-left: 1px solid $border-color;

  .th,
  .td {
    padding: 12px 8px;
    font-size: 14px;
    line-height: 20px;
    color: black;
    border: 1px solid $border-color;
    box-sizing: border-box;

    margin-left: -1px;
    margin-top: -1px;
  }

  .th {
    background-color: #f0f0f0;
  }
}
</style>
