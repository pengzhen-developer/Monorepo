<template>
  <div class="rule-item__content flex items-center q-pa-16 q-mr-md">
    <div class="flex col  items-center"
         v-if="isEditing">

      <div class="flex row items-center">
        <el-select v-model="model.prescriptionCode"
                   placeholder="请选择"
                   style="width: 150px;">
          <el-option v-for="item in source.PrescriptionTypeRule"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>

      <span class="q-ml-16">剩余用药时长</span>
      <div class="flex row items-center q-ml-8">
        <el-select v-model="model.operator"
                   placeholder="请选择"
                   style="width: 100px;">
          <el-option v-for="item in source.Compare"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-input-number v-model="model.quantity"
                       :controls="false"
                       class="q-mr-8 q-ml-8"
                       style="width: 100px;"
                       :precision="0"
                       :min="1"
                       placeholder="请输入"></el-input-number>

      <span class="q-ml-8">天时，开具处方</span>
    </div>
    <div class="flex col  items-center"
         v-else>
      <span>{{model.prescriptionCode | filterDictionary(source.PrescriptionTypeRule,'--')}}</span>
      <span class="q-ml-16">剩余用药时长</span>
      <span class="q-ml-8">{{model.operator | filterDictionary(source.Compare,'--')}}</span>
      <span class="q-ml-8">{{model.quantity}}</span>
      <span class="q-ml-8">天时，开具处方</span>
    </div>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import obPreconditionDic from '../observable/ob-precondition-dic'

export default {
  props: {
    model: Object,
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  components: {},
  data() {
    return {
      source: {
        PrescriptionTypeRule: [],
        Compare: []
      }
    }
  },

  async mounted() {
    this.source.PrescriptionTypeRule = await Peace.identity.dictionary.getList('prescription_type_rule')
    this.source.Compare = await Peace.identity.dictionary.getList('compare')
  },

  methods: {
    verificationResults() {
      const tmp = this.model
      if (tmp.quantity || Number(tmp.quantity) === 0) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        return CONSTANT.RULE_VALIDATION_RESULTS.未开始
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-number-style {
  width: 120px;
  height: 34px;
  border-radius: 4px;
  border: 1px solid #e4e4e4;
  padding-top: 2px;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  margin-right: 8px;

  ::v-deep {
    .el-input__inner {
      border: 0;
    }
  }
}
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
