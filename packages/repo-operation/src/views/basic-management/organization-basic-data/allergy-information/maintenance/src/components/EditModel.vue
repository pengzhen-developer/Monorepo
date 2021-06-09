
<template>
  <div class="flex items-center column">
    <el-form :model="model"
             :rules="rules"
             ref="ruleForm"
             label-width="auto"
             label-suffix="：">
      <template v-if="type==='edit'">
        <el-form-item label="系统编码">
          <div>{{info.code}}</div>
        </el-form-item>
      </template>
      <el-form-item label="过敏信息"
                    prop="name">
        <peace-input v-model.trim="model.name"
                     placeholder="请输入"></peace-input>
      </el-form-item>

    </el-form>
    <div class="flex justify-end full-width q-pt-32">
      <el-button v-on:click="cancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="submit"
                 v-bind:disabled="saveing">{{type==='add'?'提交':'保存'}}</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'EditModel',
  props: {
    info: Object,
    type: String
  },

  data() {
    return {
      model: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入过敏信息', tragger: 'blur' }]
      },
      saveing: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.type === 'edit') {
        this.model.name = this.info.name
      }
    })
  },
  methods: {
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    saveData() {
      this.saveing = true
      if (this.type === 'add') {
        const params = Peace.util.deepClone(this.model)
        params.orgName = this.info.orgName
        params.orgCode = this.info.orgCode
        Service.addOrgAllergyInfo(params)
          .then(() => {
            Peace.util.alert('提交成功')
            this.$emit('complete')
          })
          .finally(() => {
            this.saveing = false
          })
      } else {
        const params = Peace.util.deepClone(this.model)
        params.id = this.info.id
        Service.updateOrgAllergyInfo(params)
          .then(() => {
            Peace.util.alert('保存成功')
            this.$emit('complete')
          })
          .finally(() => {
            this.saveing = false
          })
      }
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>