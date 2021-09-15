<template>
  <div>
    <el-form ref="form"
             class="dialog-content"
             :model="form"
             :rules="rules"
             label-width="auto">

      <el-form-item label="机构名称："
                    prop="organizationName">
        <el-select v-model.trim="form.organizationObject"
                   value-key="custCode"
                   clearable=""
                   placeholder="请选择">
          <el-option v-bind:key="index"
                     v-bind:label="item.organizationName"
                     v-bind:value="item"
                     v-for="(item, index) in organizationList">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商户号机构名称："
                    prop="subMchName">
        <el-select v-model="form.subMchObject"
                   value-key="value"
                   clearable=""
                   placeholder="请选择">
          <el-option v-for="item in source.subMchName"
                     v-bind:key="item.value"
                     v-bind:label="item.label"
                     v-bind:value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商户号："
                    prop="subMchId">
        <el-input v-bind:value="form.subMchObject.value"
                  class="readonly disabled"
                  placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="微信结算费率："
                    prop="accountingRate">
        <el-radio-group v-model.number="form.accountingRate">
          <el-radio-button v-bind:label="0">0%</el-radio-button>
          <el-radio-button v-bind:label="0.6">0.6%</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="允许最大分账比率："
                    prop="maxShareRatio">
        <el-input-number v-model="form.maxShareRatio"
                         v-bind:min="1"
                         v-bind:max="99"
                         v-bind:precision="0"
                         v-force="'pInterger'"
                         placeholder=""></el-input-number>
        <span class="q-ml-sm">%</span>
      </el-form-item>

      <el-form-item>
        <el-button class="btn"
                   v-on:click="onCancel">取消</el-button>
        <el-button type="primary"
                   class="btn"
                   v-on:click="onSubmit('form')">提交</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'AddReceiver',
  props: {
    organizationList: Array
  },

  data() {
    return {
      form: {
        subAppId: '',
        organizationObject: {},
        custCode: '',
        organizationName: '',
        subMchObject: {},
        subMchId: '',
        subMchName: '',
        accountingRate: undefined,
        maxShareRatio: undefined
      },
      rules: {
        organizationName: [{ required: true, message: '请选择所属机构', trigger: 'change' }],
        subMchName: [{ required: true, message: '请选择商户号机构名称', trigger: 'change' }],
        subMchId: [{ required: true, message: '请选择商户号机构名称', trigger: 'change' }],
        accountingRate: [{ required: true, message: '请选择微信结算费率', trigger: 'change' }],
        maxShareRatio: [{ required: true, message: '请输入允许最大分账比率', trigger: 'blur' }]
      },

      source: {
        subMchName: []
      }
    }
  },

  watch: {
    ['form.subMchObject']: {
      handler() {
        this.form.subMchName = this.form.subMchObject.label
        this.form.subMchId = this.form.subMchObject.value
      },
      immediate: true
    },

    ['form.organizationObject']: {
      handler() {
        this.form.organizationName = this.form.organizationObject.organizationName
        this.form.custCode = this.form.organizationObject.custCode
      },
      immediate: true
    }
  },

  async created() {
    this.source.subMchName = await Peace.identity.dictionary.getList('wx_sbnc')
  },

  methods: {
    onCancel() {
      this.$emit('onCancel')
    },

    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.custCode = this.organizationList.find((item) => item.organizationName == this.form.organizationName).custCode
          const params = this.form
          Service.addSubMch(params).then((res) => {
            Peace.util.success(res.msg)
            this.$emit('onSucess')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>