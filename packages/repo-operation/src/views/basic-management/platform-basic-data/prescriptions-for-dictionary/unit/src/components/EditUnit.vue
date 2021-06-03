<template>
  <div>
    <PeaceDialog width="450px"
                 v-bind:visible.sync="visible"
                 v-bind:title="title">
      <el-form ref="form"
               label-width="auto"
               label-suffix="："
               v-bind:model="model"
               v-bind:rules="rules">

        <el-form-item label="单位名称" prop="name">
          <el-input v-model="model.name"
                    maxlength="50"
                    placeholder="请输入单位名称"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="单位类别"  prop="type">

          <el-select clearable
                     filterable
                     class="block"
                     v-model.trim="model.type"
                     placeholder="请选择包装单位">
            <el-option v-for="item in source.typeList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item class="el-dialog__footer">
          <el-button class="btn"
                     v-on:click="cancel">取消</el-button>
          <el-button type="primary"
                     class="btn"
                     v-on:click="validateForm">确定</el-button>

        </el-form-item>

      </el-form>
    </PeaceDialog>
  </div>
</template>

<script>

import Service from "../service/index";
import CONSTANT from "../constant";
import obAccount from "@src/layouts/default/src/observable/ob-account";

export default {
  props: {
    title: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: Boolean
    },
    data: undefined
  },

  data() {
    return {
      isLoading: false,
      visible: this.value,
      model: {
        name: undefined,
        type: undefined,
      },
      source: {
        typeList: CONSTANT.UNIT_TYPE,
      },
      rules: {
        name: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择包装单位', trigger: 'blur' }],
      }
    }
  },

  created() {
    if (this.data) {
      this.model = Object.assign({}, this.data)
    }
  },

  watch: {
    value(value) {
      this.visible = value
    },

    visible(value) {
      this.$emit('input', value)
    },

  },

  computed: {
    accountInfo: () => obAccount.state.accountInfo ?? {},
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
      params.createUser = this.accountInfo.name
      this.isLoading = true

      if (this.data) {
        Service.modifyData(params).then((res) => {
          Peace.util.success(res.message)
          this.visible = false
          this.$emit('refresh')
        }).finally(() => this.isLoading = false)

      } else {
        Service.addData(params).then((res) => {
          Peace.util.success(res.message)
          this.visible = false
          this.$emit('refresh')
        }).finally(() => this.isLoading = false)
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
