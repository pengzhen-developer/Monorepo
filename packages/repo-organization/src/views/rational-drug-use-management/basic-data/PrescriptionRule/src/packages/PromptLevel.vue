<template>
  <div class="prompt-level full-height">
    <div class="prompt-level__content full-height full-width flex items-center q-pl-md no-wrap">
      <span class="q-mr-md text-weight-medium" style="white-space: nowrap;">提示级别</span>
      <el-form v-if="isEditing"
               ref="validateForm"
               class="col"
               space-none
               v-bind:model="model"
               v-bind:show-message="false">
        <el-form-item>
          <el-select v-model="model.warningLevel"
                     style="min-width: 80px;">
            <el-option
                v-for="item in warningLevelList"
                v-bind:key="item.label"
                v-bind:label="item.label"
                v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span v-else>{{ model.warningLevel | filterDictionary(warningLevelList,'--') }}</span>
    </div>
  </div>
</template>

<script>
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
      warningLevelList: []
    }
  },

  async mounted() {
    this.warningLevelList = await Peace.identity.dictionary.getList('warning_level')
  },

  created() {
    if (Peace.validate.isEmpty(this.model.warningLevel)) {
      this.model.warningLevel = 'D'
    }
  },

  methods: {
    verificationResults() {
      return this.model.warningLevel
    }
  }
}
</script>

<style lang="scss" scoped>
.prompt-level {
  font-size: 14px;
  overflow: hidden;
}
</style>
