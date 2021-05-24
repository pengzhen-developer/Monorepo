<template>
  <div>
    <el-form ref="forms"
             label-suffix="："
             label-width="auto"
             v-bind:model="model"
             v-bind:rules="rules">
      <el-form-item label="协议名称"
                    prop="name">
        <el-input v-model="model.name"
                  placeholder="请输入"
                  maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="协议内容"
                    prop="content">
        <peace-editor v-model="model.content"></peace-editor>
      </el-form-item>
      <el-form-item label="协议版本"
                    prop="version">
        <el-input v-model="model.version"
                  placeholder="请输入"
                  maxlength="20"></el-input>
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
import PeaceEditor from './PeaceEditor'
export default {
  props: {
    data: Object
  },
  components: {
    PeaceEditor
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: '请输入协议名称',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入协议内容'
          }
        ],
        version: [
          {
            required: true,
            message: '请输入协议版本',
            trigger: 'blur'
          }
        ]
      },
      model: {
        name: '',
        content: '',
        version: '',
        hosId: ''
      },
      isLoading: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.model.hosId = this.data.hosId
      if (this.data.serviceId) {
        Service.getOneService({ serviceId: this.data.serviceId }).then((res) => {
          this.model.name = res.data.name
          this.model.content = res.data.content
          this.model.version = res.data.version
        })
      }
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
        if (this.data.serviceId) {
          params.serviceId = this.data.serviceId
          Service.editService(params)
            .then(() => {
              Peace.util.success('提交成功')
              this.$emit('onClose')
              this.$emit('onFresh')
            })
            .finally(() => {
              this.isLoading = false
            })
        } else {
          Service.addServiceInfo(params)
            .then(() => {
              Peace.util.success('提交成功')
              this.$emit('onClose')
              this.$emit('onFresh')
            })
            .finally(() => {
              this.isLoading = false
            })
        }
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