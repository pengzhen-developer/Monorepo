<template>
  <div>
    <PeaceDialog width="500px"
                 v-bind:visible.sync="visible"
                 :title=" isEdit ? '修改给药频次' : '新增给药频次' ">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="validateForm">

        <el-form-item label="频次名称："
                      prop="name">
          <el-input v-model="model.name"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="频次名称缩写：">
          <el-input v-model="model.abbreviation"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="服用频次："
                      prop="frequency">
          <div class="item-text">
            <el-input-number v-model="model.frequency"
                             class="flex col"
                             placeholder="请输入"
                             maxlength="50"
                             controls-position="right"
                             :min="1"
                             :max="99999"
                             clearable></el-input-number>
            <span class="unit">次</span>
          </div>

        </el-form-item>

        <el-form-item label="服用间隔："
                      prop="duration">
          <div class="item-text">
            <el-input-number v-model="model.duration"
                             class="flex col"
                             placeholder="请输入"
                             maxlength="50"
                             controls-position="right"
                             :min="1"
                             :max="99999"
                             clearable></el-input-number>
            <span class="unit">天</span>
          </div>
        </el-form-item>

        <el-form-item label="备注：">

          <el-input v-model="model.remarks"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item class="el-dialog__footer">
          <el-button class="btn"
                     v-on:click="cancel">取消</el-button>
          <el-button type="primary"
                     class="btn"
                     v-on:click="validateForm">保存</el-button>

        </el-form-item>

      </el-form>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from '../service'

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },
    data: {
      require: false,
      type: Object
    },
    isEdit: {
      required: true,
      type: Boolean
    }
  },

  data() {
    return {
      visible: this.value,
      model: {
        id: '',
        name: '',
        abbreviation: '',
        frequency: 1,
        duration: 1,
        remarks: ''
      },
      rules: {
        name: [{ required: true, message: '请输入频次名称', trigger: 'blur' }],
        frequency: [{ required: true, message: '请输入服用频次', trigger: 'blur' }],
        duration: [{ required: true, message: '请输入服用间隔', trigger: 'blur' }]
      }
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

  mounted() {
    this.model = Object.assign({}, this.model, this.data)
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
      Service.addOrModifyDrugFrequency(this.model).then(() => {
        this.visible = false
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-text {
  display: flex;
  ::v-deep .el-form-item__content {
    display: flex;
  }
  .unit {
    color: #333;
    padding: 0px 10px;
  }
}

.el-form-item {
  margin-bottom: 8px;

  &.is-error {
    margin-bottom: 24px;
  }
}
</style>
