<template>
  <div v-loading="loading">
    <div class="info-title q-mb-16">{{data.SourceHospitalName}}智能审方规则</div>
    <div class="q-ml-12 q-mb-16">
      <el-tag class="q-mr-8 q-mb-8 element-ui-default"
              type="info">
        开方机构
      </el-tag>
    </div>
    <div class="info-title q-mb-16">药品规则审查维度</div>
    <div class="q-ml-12 q-mb-16">
      <el-tag v-for="item in drugCheckList"
              v-bind:key="item.code"
              class="q-mr-8 q-mb-8 element-ui-default"
              type="info">
        {{ item.name }}
      </el-tag>
    </div>
    <div class="info-title q-mb-16">中成药/西药审查规则项</div>
    <div class="q-ml-12 q-mb-16">
      <el-tag v-for="item in cdrugAndWDrugCheckList"
              v-bind:key="item.code"
              class="q-mr-8 q-mb-8 element-ui-default"
              type="info">
        {{ item.name }}
      </el-tag>
    </div>
    <div class="info-title q-mb-16">联合审方</div>
    <div class="q-ml-12 q-pb-36">
      <div class="row flex q-mb-md">
        <div class="color-333">审查范围：</div>
        <div style="flex:1"
             class="color-333">
          <div class="q-mb-8"
               v-for="(item,index) in unionCheckList"
               v-bind:key="item.code">{{index+1}}. {{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './../service'
export default {
  props: {
    data: Object
  },
  data() {
    return {
      loading: false,
      cdrugAndWDrugCheckList: [],
      drugCheckList: [],
      unionCheckList: []
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getConfigDetail()
    })
  },
  methods: {
    getConfigDetail() {
      this.loading = true
      const params = {
        hospitalCode: this.data.SourceHospitalCode,
        hospitalName: this.data.SourceHospitalName
      }
      Service.getDrugRuleConfigDetail(params).then((res) => {
        this.cdrugAndWDrugCheckList = res.data.cdrugAndWDrugCheckList
        this.drugCheckList = res.data.drugCheckList
        this.unionCheckList = res.data.unionCheckList
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-title {
  position: relative;
  padding-left: 14px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    width: 4px;
    height: 16px;
    background-color: var(--q-color-primary);
    border-radius: 2px;
  }
  span {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-weight: 400;
  }
}
.color-333 {
  color: #333333;
}
.el-tag--mini {
  height: 22px;
  line-height: 20px;
  padding: 0 12px;
}
</style>