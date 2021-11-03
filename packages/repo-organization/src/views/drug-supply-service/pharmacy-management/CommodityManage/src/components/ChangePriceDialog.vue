<template>
  <div>
    <el-form ref="form"
             label-width="auto"
             v-bind:model="model"
             v-bind:rules="rules"
             v-on:submit.native.prevent
             v-on:keyup.enter.native="validateForm">

      <el-form-item label="当前价格：">
        {{ data.Price }}元
      </el-form-item>

      <el-form-item label="新价格："
                    prop="Price">
        <div class="item-text ">
          <el-input-number v-model.trim="model.Price"
                           placeholder="请输入"
                           :controls="false"
                           :max="999999.9999"
                           :precision="4"
                           :min="0"
                           :step="1"
                           clearable></el-input-number>
          <span class="unit">元</span>
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
        Price: undefined
      },
      rules: {
        Price: [{ required: true, message: '请输入新库存数量', trigger: 'blur' }]
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
      const params = { GoodsId: this.data.GoodsId, Price: this.model.Price }
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

::v-deep .el-input-number.is-without-controls .el-input__inner {
  text-align: left;
}
</style>
