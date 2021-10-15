<template>
  <div>
    <div class="el-dialog__body">
      <el-form ref="model"
               label-position="right"
               label-width="120px"
               label-suffix="："
               v-on:submit.native.prevent
               v-on:keyup.enter.native="save('model')"
               v-bind:model="model"
               v-bind:rules="rules">
        <div class="info-list">

          <el-form-item label="主数据ID">
            <span>{{model.platformDrugCode}}</span>
          </el-form-item>

          <el-form-item label="药品名称">
            <span>{{model.drugName}}</span>
          </el-form-item>

          <el-form-item label="剂型">
            <span>{{model.drugDosageForm || "——"}}</span>
          </el-form-item>

          <el-form-item label="抗菌属性">
            <PeaceSelect placeholder="--"
                         class="block"
                         filterable
                         v-model="model.antiLevel"
                         clearable>
              <el-option v-for="item in source.ATTRIBUTES_TAYPES"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </PeaceSelect>
          </el-form-item>

          <el-form-item label="注射剂"
                        prop="isInjection">
            <el-radio-group v-model="model.isInjection">
              <el-radio label="yes">是</el-radio>
              <el-radio label="no">否</el-radio>
            </el-radio-group>
          </el-form-item>

        </div>
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
  name: 'EidtInjectionDrugProperitiesDialog',
  props: {
    data: Object,
    isEdit: Boolean
  },

  watch: {
    data: {
      handler() {
        if (this.data != null) {
          this.model.id = this.data.id
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      model: {
        id: '',
        platformDrugCode: '',
        drugName: '',
        drugDosageForm: '',
        antiLevel: '',
        isInjection: ''
      },
      source: {
        ATTRIBUTES_TAYPES: []
      },
      rules: {
        isInjection: [
          {
            required: true,
            message: '请选中是否是注射剂',
            trigger: 'change'
          }
        ]
      }
    }
  },

  async created() {
    this.source.ATTRIBUTES_TAYPES = await Peace.identity.dictionary.getList('antiLevel')
    this.getBaseAndExtInfoById()
  },

  methods: {
    getBaseAndExtInfoById() {
      const params = { id: this.data?.id }
      Service.getBaseAndExtInfoById(params).then((res) => {
        this.model.platformDrugCode = res.data.platformDrugCode
        this.model.drugName = res.data.drugName
        this.model.drugDosageForm = res.data.drugDosageForm
        this.model.isInjection = res.data.isInjection == 'yes' ? 'yes' : 'no'
        this.model.antiLevel = this.source.ATTRIBUTES_TAYPES.some((item) => item.value === res.data.antiLevel)
          ? res.data.antiLevel
          : ''
      })
    },

    onCancel() {
      this.$emit('onClose', {})
    },

    save(model) {
      this.$refs[model].validate((valid) => {
        if (valid) {
          const params = Peace.util.deepClone(this.model)
          Service.updatePlatformDrugExtInfo(params).then((res) => {
            Peace.util.success(res.message)
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

<style lang="scss" scoped>
</style>