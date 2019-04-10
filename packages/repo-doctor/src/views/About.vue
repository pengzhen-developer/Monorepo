<template>
  <div class="about">
    <el-form :model="view.model" label-width="140px">
      <el-form-item label="个人头像"></el-form-item>
      <el-form-item label="帐号"></el-form-item>
      <el-form-item label="姓名"></el-form-item>
      <el-form-item label="科室"></el-form-item>
      <el-form-item label="昵称"></el-form-item>
      <el-form-item label="身份证号"></el-form-item>
      <el-form-item label="证书编号"></el-form-item>
      <el-form-item label="医师资格"></el-form-item>
      <el-form-item label="图片要求"></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      view: {
        model: {}
      }
    }
  }
}
</script>