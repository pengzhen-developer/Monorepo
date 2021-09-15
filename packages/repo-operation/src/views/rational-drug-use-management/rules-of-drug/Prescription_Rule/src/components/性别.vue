<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <div class="flex row items-center"
         v-if="isEditing">
      <span class="q-mr-md text-red">属于</span>
      <el-select v-model="model.genderRuleList.gender"
                 placeholder="请选择"
                 style="width: 80px; margin-right: 8px;">
        <el-option v-for="item in source.Gender"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

    </div>

    <div class="flex row items-center"
         v-else>
      <span class="q-mr-md text-red">属于</span>
      <span> {{model.genderRuleList.gender | filterDictionary(source.Gender,'--')}}</span>
    </div>

  </div>
</template>

<script>
import CONSTANT from '../constant'

export default {
  props: {
    model: Object,
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      source: {
        Gender: []
      }
    }
  },

  async mounted() {
    this.source.Gender = await Peace.identity.dictionary.getList('rule_gender')
  },

  methods: {
    verificationResults() {
      return CONSTANT.RULE_VALIDATION_RESULTS.忽略
    }
  }
}
</script>

<style lang="scss" scoped>
.input-number-style {
  width: 150px;
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
</style>
