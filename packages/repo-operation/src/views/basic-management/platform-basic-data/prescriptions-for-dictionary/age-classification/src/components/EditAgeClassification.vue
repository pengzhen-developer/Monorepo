<template>
  <div>
    <PeaceDialog v-bind:title="title"
                 v-bind:visible.sync="visible"
                 width="450px">
      <el-form ref="form"
               label-suffix="："
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="validateForm">

        <el-form-item label="人群名称"
                      prop="name">
          <el-input v-model="model.name"
                    clearable
                    maxlength="50"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="人群年龄单位"
                      prop="ageUnit">

          <el-select v-model.trim="model.ageUnit"
                     class="block"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option v-for="item in source.AgeType"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item class="block"
                      label="人群年龄最小值"
                      prop="ageMin">
          <el-input-number v-model="model.ageMin"
                           :max="model.ageMax"
                           :min="0"
                           maxlength="50"
                           controls-position="right"
                           style="width:100%"></el-input-number>
        </el-form-item>

        <el-form-item label="人群年龄最大值"
                      prop="ageMax">
          <el-input-number v-model="model.ageMax"
                           :min="model.ageMin || 0"
                           controls-position="right"
                           maxlength="50"
                           style="width:100%"></el-input-number>
        </el-form-item>

        <el-form-item class="el-dialog__footer">
          <el-button class="btn"
                     v-on:click="cancel">取消
          </el-button>
          <el-button class="btn"
                     type="primary"
                     v-bind:loading="isLoading"
                     v-on:click="validateForm">{{ submitButtonText }}
          </el-button>
        </el-form-item>

      </el-form>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from '../service/index'

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },
    title: {
      required: true,
      type: String
    },
    data: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      isLoading: false,
      visible: this.value,
      model: {
        name: undefined,
        ageUnit: 'Y',
        ageMin: undefined,
        ageMax: undefined
      },
      source: {
        AgeType: []
      },
      rules: {
        name: [{ required: true, message: '请输入人群名称', trigger: 'blur' }],
        ageUnit: [{ required: true, message: '请选择人群年龄单位', trigger: 'blur' }],
        ageMin: [{ required: true, message: '请输入人群年龄最小值', trigger: 'blur' }],
        ageMax: [{ required: true, message: '请输入人群年龄最大值', trigger: 'blur' }]
      }
    }
  },

  created() {
    if (this.isEdit) {
      this.model = Object.assign({}, this.data)
    }
  },

  async mounted() {
    this.source.AgeType = await Peace.identity.dictionary.getList('age_type')
  },

  computed: {
    isEdit() {
      return this.data
    },
    submitButtonText() {
      return this.isEdit ? '提交' : '保存'
    }
  },

  watch: {
    value(value) {
      this.visible = value
    },

    visible(value) {
      this.$emit('input', value)
    }
  },

  methods: {
    cancel() {
      this.visible = false
    },
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm()
        }
      })
    },
    submitForm() {
      const params = Object.assign({}, this.model)
      this.isLoading = true
      if (this.isEdit) {
        Service.modifyData(params)
          .then((res) => {
            Peace.util.success(res.message)
            this.visible = false
            this.$emit('refresh')
          })
          .finally(() => (this.isLoading = false))
      } else {
        Service.addData(params)
          .then((res) => {
            Peace.util.success(res.message)
            this.visible = false
            this.$emit('refresh')
          })
          .finally(() => (this.isLoading = false))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item__content {
  span {
    color: #9da4af;
  }
}

.el-form-item {
  margin-bottom: 8px;

  &.is-error {
    margin-bottom: 24px;
  }
}
</style>
