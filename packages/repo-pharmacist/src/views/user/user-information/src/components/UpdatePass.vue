<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="75px"
             v-bind:model="model"
             v-bind:rules="rules"
             class="q-pl-20 form-padding">
      <el-form-item prop="UserName">
        <span slot="label"
              class="form-label">原密码</span>
        <el-input v-bind:show-password="showPassword"
                  minlength="6"
                  maxlength="20"
                  placeholder="请输入原密码"
                  auto-complete="new-password"
                  v-on:focus="showPassword=true"></el-input>
      </el-form-item>
      <el-form-item prop="UserName">
        <span slot="label"
              class="form-label">新密码</span>
        <el-input v-bind:show-password="showPassword"
                  minlength="6"
                  maxlength="20"
                  placeholder="请输入新密码"
                  auto-complete="new-password"
                  v-on:focus="showPassword=true"></el-input>
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
    return {
      showPassword: false
    }
  },

  created() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.form-label {
  position: relative;
  display: inline-block;
  width: 70px;
  padding-right: 12px;
  text-align: justify;
  text-align-last: justify;
  &::after {
    content: '：';
    position: absolute;
    top: 0;
    right: 0;
  }
}
.form-padding {
  padding-right: 40px;
}
</style>
<style>
.accountDialog .el-form-item__label {
  padding-right: 0px;
}
</style>
