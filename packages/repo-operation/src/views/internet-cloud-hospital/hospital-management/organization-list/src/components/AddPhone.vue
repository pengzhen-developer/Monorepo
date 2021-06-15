<template>
  <div>
    <el-form ref="forms"
             label-suffix="："
             label-width="auto"
             v-bind:model="model"
             v-bind:rules="rules">
      <el-form-item label="客服电话"
                    prop="phone">
        <peace-input v-model.trim="model.phone"
                     placeholder="请输入11位电话"
                     maxlength="11"></peace-input>
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
// import Service from '../service'
export default {
  props: {
    info: Object
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入11位电话'))
      }

      if (!Peace.validate.isTelephone(value)) {
        callback(new Error('电话号码不正确'))
      }

      callback()
    }

    return {
      rules: {
        phone: [
          {
            required: true,
            validator: checkPhone,
            trigger: 'blur'
          }
        ]
      },
      model: {
        phone: '',
        hosId: ''
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
        console.log(params)
        //   Service.addServiceInfo(params)
        //     .then(() => {
        //       Peace.util.success('提交成功')
        //       this.$emit('onClose')
        //       this.$emit('onFresh')
        //     })
        //     .finally(() => {

        this.isLoading = false
        //  })
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