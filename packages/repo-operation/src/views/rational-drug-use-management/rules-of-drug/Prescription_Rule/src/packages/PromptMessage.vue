<template>
  <div class="prompt-message full-height">
    <div class="prompt-content__content full-height full-width row items-center no-wrap">
      <span class="q-mr-md text-weight-medium" style="white-space: nowrap;">提示信息</span>
      <el-form ref="validateForm"
               class="col"
               space-none
               v-bind:model="model"
               v-if="isEditing"
               v-bind:show-message="false">
        <el-form-item>
          <el-input type="textarea"
                    resize="none"
                    rows="3"
                    maxlength="1000"
                    v-model="model.description"></el-input>
        </el-form-item>
      </el-form>
      <span v-else style="word-break: break-all">{{model.description}}</span>
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
    return {}
  },

  methods: {
    verificationResults() {
      return this.model.description
    }
  }
}
</script>

<style lang="scss" scoped>

.prompt-message {
  font-size: 14px;
  overflow: hidden;
}

</style>
