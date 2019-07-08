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
      <div class="info-row-content spec-input">
        <el-input-number :min="1" :precision="0" controls-position="right" placeholder="请输入" style="text-align: left; width: 240px;" v-model="drug.number"></el-input-number>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>用药天数</span>
      </div>
      <div class="info-row-content spec-input">
        <el-input-number
          :max="7"
          :min="1"
          :precision="0"
          controls-position="right"
          placeholder="请输入"
          style="text-align: left; width: 240px;"
          v-model="drug.medication_days"
        ></el-input-number>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>用药频次</span>
      </div>
      <div class="info-row-content">
        <el-select placeholder="请选择" v-model="drug._frequency" value-key="id">
          <el-option :key="item.id" :label="item.drugtimes_name" :value="item" v-for="item in frequencys"></el-option>
        </el-select>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>单次剂量</span>
      </div>
      <div class="info-row-content spec-input">
        <el-input-number
          :min="1"
          :precision="0"
          controls-position="right"
          placeholder="请输入"
          style="text-align: left; margin-right: 10px;"
          v-model="drug.consump"
        ></el-input-number>
        <span>{{ drugInfo.drug_unit || drug.unit }}</span>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>给药途径</span>
      </div>
      <div class="info-row-content">
        <el-select placeholder="请选择" v-model="drug._usage" value-key="id">
          <el-option :key="item.id" :label="item.drugway_name" :value="item" v-for="item in usages"></el-option>
        </el-select>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button @click="$emit('prevStep')" plain type="primary" v-if="!edit">上一步</el-button>
      <el-button :disabled="isDisabled" @click="saveDrugUsage" type="primary">完成</el-button>
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
          medication_days: undefined,
          _frequency: '',
          consump: undefined,
          _usage: ''
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
      drug: '',
      usages: [],
      frequencys: []
    }
  },
  computed: {
    isDisabled() {
      return this.drug.number > -1 && this.drug._frequency && this.drug.consump && this.drug._usage ? false : true
    }
  },
  methods: {
    saveDrugUsage() {
      const drug = this.drug
      drug.dic_frequency_id = drug._frequency.id
      drug.dic_usage_id = drug._usage.id
      drug.dic_frequency = drug._frequency.drugtimes_name
      drug.dic_usage = drug._usage.drugway_name
      drug.dic_usage = drug._usage.drugway_name

      this.$emit('submit', Object.assign(this.drugInfo, drug))
    }
  },
  created() {
    const api = this.config.api.getFrequencys
    const api2 = this.config.api.getUsages
    const params = {
      hospitalId: this.$store.state.user.userInfo.list.docInfo.netHospital_id
    }
    this.drug = Object.assign({}, this.data, {
      _usage: {
        id: this.data.dic_usage_id,
        drugway_name: this.data.dic_usage
      },
      _frequency: {
        id: this.data.dic_frequency_id,
        drugtimes_name: this.data.dic_frequency
      }
    })
    this.http.get(api, { params }).then(res => {
      this.frequencys = res.data
      if (res.data && res.data.length) {
        this.drug._frequency = res.data[0]
      }
    })
    this.http.get(api2, { params }).then(res => {
      this.usages = res.data
      if (res.data && res.data.length) {
        this.drug._usage = res.data[0]
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
  .drug-info > span {
    margin: 0 5px;
  }
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
  /deep/ .spec-input {
    display: inline-flex;
    justify-content: space-between;
    .el-input,
    .el-input-number {
      .el-input__inner {
        text-align: left;
      }
    }

    .el-input,
    span {
      vertical-align: middle;
    }
  }
}
</style>
