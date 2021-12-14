<template>
  <div>
    <el-form ref="forms"
             label-suffix="："
             label-width="auto"
             v-bind:model="model"
             v-bind:rules="rules">
      <el-form-item label="客服电话"
                    prop="serviceTel">
        <peace-input v-model.trim="model.serviceTel"
                     maxlength="50"
                     placeholder="请输入电话"></peace-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-end full-width q-pt-32">
      <el-button v-on:click="cancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="save"
                 v-bind:loading="isLoading">保存</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  props: {
    info: Object
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入电话'))
      }

      callback()
    }

    return {
      rules: {
        serviceTel: [
          {
            required: true,
            validator: checkPhone,
            trigger: 'blur'
          }
        ]
      },
      model: {
        serviceTel: '',
        nethospitalId: ''
      },
      isLoading: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.model = Object.assign({}, this.info)
    })
  },
  methods: {
    cancel() {
      this.$emit('onClose')
    },
    save() {
      this.validateForm().then(() => {
        this.isLoading = true
        const params = Peace.util.deepClone(this.model)
        Service.addServiceTel(params)
          .then((res) => {
            Peace.util.success(res.msg || '提交成功')
            this.$emit('onClose')
            this.$emit('onFresh')
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.forms.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    }
  }
}
</script>

<style>
</style>