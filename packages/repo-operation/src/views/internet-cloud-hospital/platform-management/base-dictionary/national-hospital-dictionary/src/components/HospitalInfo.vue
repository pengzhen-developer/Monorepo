<template>
  <div>
    <div class="el-dialog__body">
      <el-form ref="model"
               label-position="right"
               label-width="95px"
               label-suffix="："
               v-on:submit.native.prevent
               v-on:keyup.enter.native="save('model')"
               v-bind:model="model"
               v-bind:rules="rules">
        <el-form-item label="医院编码">
          <PeaceInput v-model.trim="model.code"
                      :disabled="true"></PeaceInput>
        </el-form-item>
        <el-form-item label="医院名称"
                      prop="name">
          <PeaceInput v-model.trim="model.name"
                      placeholder="请输入"
                      maxlength="50"></PeaceInput>
        </el-form-item>
        <el-form-item label="简介">
          <PeaceInput :autosize="{ minRows: 3 }"
                      v-model.trim="model.content"
                      placeholder="请输入"
                      type="textarea"
                      maxlength="200"></PeaceInput>
        </el-form-item>
        <el-form-item label="地址">
          <PeaceInput v-model.trim="model.address"
                      placeholder="请输入"
                      maxlength="50"></PeaceInput>
        </el-form-item>
        <el-form-item label="联系电话">
          <PeaceInput v-model.trim="model.phone"
                      placeholder="请输入"
                      maxlength="50"></PeaceInput>
        </el-form-item>
        <el-form-item label="网站地址">
          <PeaceInput v-model.trim="model.web_site"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item label="所属区域">
          <PeaceInput v-model.trim="model.area"
                      placeholder="请输入"
                      maxlength="50"></PeaceInput>
        </el-form-item>
        <el-form-item label="是否展示">
          <el-radio-group v-model="model.is_show">
            <el-radio :label="1">展示</el-radio>
            <el-radio :label="2">不展示</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
    </div>
    <div class="el-dialog__footer">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="save('model')">保存</el-button>
    </div>
  </div>

</template>

<script>
import Service from '../service/index'

export default {
  name: 'HospitalInfo',
  props: {
    data: Object
  },
  watch: {
    data: {
      handler() {
        this.model.hospitalId = this.data.id
      },
      immediate: true
    }
  },
  data() {
    return {
      model: {
        address: '',
        area: '',
        content: '',
        hospitalName: '',
        phone: '',
        show: '',
        webSite: '',
        hospitalId: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '医院名称必填，请输入',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.detailHospital()
    })
  },

  methods: {
    detailHospital() {
      const params = { hospital_id: this.model.hospitalId }
      Service.detailHospital(params).then((res) => {
        this.model = res.data
      })
    },
    onCancel() {
      this.$emit('onClose', {})
    },
    save(model) {
      this.$refs[model].validate((valid) => {
        if (valid) {
          const params = {
            address: this.model.address,
            area: this.model.area,
            content: this.model.content,
            hospitalId: this.data.id,
            hospitalName: this.model.name,
            phone: this.model.phone,
            show: this.model.is_show,
            webSite: this.model.web_site
          }
          Service.editHospital(params).then((res) => {
            Peace.util.success(res.msg)
            this.$emit('onSuccess')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
  
<style>
</style>