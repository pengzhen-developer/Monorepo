<template>
  <div class="usage">
    <div class="drug-info">
      <span>{{ drugInfo.drug_name || data.drug_name }}</span>
      <span>{{ drugInfo.drug_spec || data.drug_spec }}</span>
      <span>{{ drugInfo.drug_factory || data.drug_factory }}</span>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>药品数量</span>
      </div>
      <div class="info-row-content">
        <el-input placeholder="请输入" v-model="drug.number"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>用药天数</span>
      </div>
      <div class="info-row-content">
        <el-input
          placeholder="请输入"
          v-model="drug.medication_days"
        ></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>用药频次</span>
      </div>
      <div class="info-row-content">
        <el-select
          placeholder="请选择"
          v-model="drug.dic_frequency_id"
          value-key="id"
        >
          <el-option
            :key="item.id"
            :label="item.drugtimes_name"
            :value="item"
            v-for="item in frequencys"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>单次剂量</span>
      </div>
      <div class="info-row-content">
        <el-input placeholder="请输入" v-model="drug.unit"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>给药途径</span>
      </div>
      <div class="info-row-content">
        <el-select
          placeholder="请选择"
          v-model="drug.dic_usage_id"
          value-key="id"
        >
          <el-option
            :key="item.id"
            :label="item.drugway_name"
            :value="item"
            v-for="item in usages"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button
        @click="$emit('prevStep')"
        plain
        type="primary"
        v-if="!edit"
      >上一步</el-button>
      <el-button
        :disabled="isDisabled"
        @click="$emit('submit', Object.assign(drugInfo, drug))"
        type="primary"
      >完成</el-button>
    </div>
  </div>
</template>
<script>
import config from './config'

export default {
  name: 'IntoPrescDrugUsage',
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {
          number: 1,
          medication_days: 7,
          dic_frequency_id: '',
          unit: '',
          dic_usage_id: ''
        }
      }
    },
    drugInfo: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      config,
      drug: Object.assign({}, this.data),
      usages: [],
      frequencys: []
    }
  },
  computed: {
    isDisabled() {
      return this.drug.number > -1 &&
        this.drug.medication_days &&
        this.drug.dic_frequency_id &&
        this.drug.unit &&
        this.drug.dic_usage_id
        ? false
        : true
    }
  },
  created() {
    const api = this.config.api.getFrequencys
    const api2 = this.config.api.getUsages
    const params = {
      hospitalId: this.$peace.cache.get('USER').list.docInfo
        .netHospital_id
    }

    this.$http.get(api, { params }).then(res => {
      this.frequencys = res.data
      if (res.data && res.data.length) {
        this.drug.dic_frequency_id = res.data[0]
      }
    })
    this.$http.get(api2, { params }).then(res => {
      this.usages = res.data
      if (res.data && res.data.length) {
        this.drug.dic_usage_id = res.data[0]
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.el-button {
  &--primary.is-plain {
    color: $--color-primary;
    background: transparent;
  }
}
.usage {
  padding: 10px 20px;
}
.drug-info {
  font-weight: bold;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}
.info-row {
  margin: 20px auto;
  text-align: center;
  .el-input {
    width: 180px;
  }
  &-label,
  &-content {
    display: inline-block;
  }
  &-label {
    width: 120px;
    text-align: right;
    & > span {
      color: #666;
    }
    &:after {
      content: '：';
    }
  }
  &-content {
    width: 180px;
  }
}
</style>
