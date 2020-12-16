<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width=""
             v-bind:model="model"
             v-bind:rules="rules">
      <el-form-item prop="UserName">
        <el-input type="textarea"
                  placeholder="请输入模版内容（1-50字）"
                  maxlength="50"
                  :autosize="{ minRows: 4, maxRows: 4}"
                  show-word-limit
                  resize="none" />
      </el-form-item>
      <div class="text-center q-pt-14">
        <el-button v-on:click="cancel">取消</el-button>
        <el-button type="primary"
                   v-on:click="save"
                   v-bind:loading="isLoading">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
</style>

