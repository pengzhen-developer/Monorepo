<template>
  <div>
    <el-form ref="form"
             label-width="auto"
             v-bind:model="model"
             v-bind:rules="rules"
             v-on:submit.native.prevent
             v-on:keyup.enter.native="validateForm">

      <el-form-item label="当前库存：">
        {{ data.Stock }}
      </el-form-item>

      <el-form-item label="新库存："
                    prop="Stock">
        <div class="item-text ">
          <el-input-number v-model.trim="model.Stock"
                           placeholder="请输入"
                           controls-position="right"
                           :max="999999"
                           :precision="0"
                           :min="0"
                           :step="1"
                           clearable></el-input-number>
        </div>
      </el-form-item>

      <el-form-item class="el-dialog__footer">
        <el-button class="btn"
                   v-on:click="cancel">取消</el-button>
        <el-button type="primary"
                   class="btn"
                   v-on:click="validateForm">保存</el-button>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import Service from '../service'

export default {
  props: {
    data: {
      require: false,
      type: Object
    }
  },

  data() {
    return {
      model: {
        Stock: undefined
      },
      rules: {
        Stock: [
          { required: true, message: '请输入新库存数量', trigger: 'change' },
          { required: true, message: '请输入新库存数量', trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {},

  methods: {
    cancel() {
      this.$emit('onCancel')
    },

    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm()
        }
      })
    },

    submitForm() {
      const params = { GoodsId: this.data.GoodsId, Stock: this.model.Stock }
      Service.UpdateDrugStock(params).then((res) => {
        Peace.util.success(res.msg)
        this.$emit('onSucess')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-text {
  display: flex;
  ::v-deep .el-input-number {
    flex: 1;
  }
}

.el-form-item {
  margin-bottom: 8px;

  &.is-error {
    margin-bottom: 24px;
  }
}
</style>
