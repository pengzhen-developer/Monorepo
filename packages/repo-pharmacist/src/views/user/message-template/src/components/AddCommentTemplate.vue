<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width=""
             v-bind:model="model"
             v-bind:rules="rules">
      <el-form-item prop="commonContent">
        <el-input type="textarea"
                  placeholder="请输入模版内容（1-50字）"
                  maxlength="50"
                  :autosize="{ minRows: 4, maxRows: 4}"
                  show-word-limit
                  v-model.trim="model.commonContent"
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
import Service from '../service/index'
export default {
  props: {
    data: {
      id: undefined,
      commonCode: '',
      commonContent: ''
    }
  },

  data() {
    return {
      isLoading: false,
      model: {
        organCode: '',
        commonCode: '',
        commonContent: ''
      },
      rules: {
        commonContent: [
          { required: true, message: '请输入模版内容（1-50字）', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              if (Peace.validate.isEmpty(value)) {
                cb(new Error('请输入模版内容（1-50字）'))
              }

              cb()
            }
          }
        ]
      }
    }
  },

  created() {
    if (!Peace.validate.isEmpty(this.data)) {
      this.model.commonCode = this.data.commonCode
      this.model.commonContent = this.data.commonContent
    }
  },

  async mounted() {
    const userinfo = await Peace.identity.auth.getAccountInfo()
    this.model.organCode = userinfo.organCode
  },

  methods: {
    cancel() {
      this.$emit('close')
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = Peace.util.deepClone(this.model)

          if (!Peace.validate.isEmpty(this.data)) {
            params['id'] = this.data.id

            Service.updateCommentTempTemplates(params)
              .then(() => {
                Peace.util.success('编辑成功')
                this.$emit('close')
                this.$emit('refresh')
              })
              .catch((error) => {
                Peace.util.error(error?.data?.msg ?? '编辑失败')
              })
              .finally(() => {
                this.isLoading = false
              })
          } else {
            Service.addCommentTemplates(params)
              .then(() => {
                Peace.util.success('保存成功')
                this.$emit('close')
                this.$emit('refresh')
              })
              .catch((error) => {
                Peace.util.error(error?.data?.msg ?? '保存失败')
              })
              .finally(() => {
                this.isLoading = false
              })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

