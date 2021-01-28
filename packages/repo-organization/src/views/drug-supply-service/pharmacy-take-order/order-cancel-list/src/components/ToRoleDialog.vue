<template>
  <div>
    <div>是否拒绝取消订单?</div>

    <el-form :model="form"
             ref="form"
             :rules="rules">
      <el-form-item prop="textarea">
        <el-input type="textarea"
                  rows="3"
                  placeholder="请填写拒绝原因，内容将向用户展示"
                  class="q-mt-sm"
                  maxlength="50"
                  resize="none"
                  v-model="form.textarea">
        </el-input>
      </el-form-item>
      <el-form-item class="flex justify-end">

        <el-button v-on:click="close()">再考虑一下</el-button>

        <el-button type="primary"
                   v-on:click="onSubmit('form')">确定</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>



<script>
import Service from '.././service'

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        textarea: ''
      },
      rules: {
        textarea: [{ required: true, message: '请填写拒绝原因', trigger: 'blur' }]
      }
    }
  },

  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const params = {
            OrderID: this.data.OrderId,
            Operating: 2,
            CancelReason: this.form.textarea
          }
          Service.HasWaitReceiveOrder(params).then(() => {
            this.$emit('success')
          })
        } else {
          return false
        }
      })
    },

    close() {
      this.$emit('close')
    }
  }
}
</script>


<style>
</style>