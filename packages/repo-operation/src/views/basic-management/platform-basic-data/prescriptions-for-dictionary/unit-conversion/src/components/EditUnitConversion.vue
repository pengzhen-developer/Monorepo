<template>
  <div>
    <PeaceDialog width="500px"
                 title="单位转换关系"
                 v-bind:visible.sync="visible">

      <el-form ref="form"
               label-width="120px"
               label-suffix="："
               v-bind:model="model"
               v-bind:rules="rules">

        <el-form-item label="单位组名称" prop="ucfName">
          <el-input v-model="model.ucfName"
                    style="width:268px"
                    maxlength="50"
                    placeholder="请输入单位组名称"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="单位转换关系">

          <div v-for="(domain, index) in model.formulaList" v-bind:key="index" class="q-mb-24 row">

            <el-input v-model.number="domain.factor"
                      type="number"
                      style="width:120px; margin-right: 8px"
                      placeholder="请输入数值"
                      clearable></el-input>

            <el-select clearable
                       style="width:140px"
                       filterable
                       class="col-5"
                       v-model.trim="domain.unit"
                       placeholder="请选择剂量单位">
              <el-option v-for="item in source.unitList"
                         :key="item.name"
                         :disabled="checkStatus(item)"
                         :label="item.name"
                         :value="item.name">
              </el-option>
            </el-select>

            <el-image style="width: 32px; height: 32px; margin-left: 8px" v-bind:src="require('../assets/img/conversion_icon.png')"></el-image>

          </div>

          <el-button type="text"
                     class="text-grey-999"
                     style="width:268px; border-radius: 4px; border: 1px solid rgba(51, 51, 51, 0.2);"
                     v-on:click="addDomain">+ 新增</el-button>

        </el-form-item>

        <el-form-item class="el-dialog__footer">
          <el-button class="btn"
                     v-on:click="cancel">取消</el-button>
          <el-button type="primary"
                     class="btn"
                     v-bind:loading="isLoading"
                     v-on:click="validateForm">确定</el-button>

        </el-form-item>

      </el-form>
    </PeaceDialog>
  </div>
</template>

<script>

import Service from "../service/index";
import obAccount from "@src/layouts/default/src/observable/ob-account";

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },
    data: undefined
  },

  data() {
    return {
      isEdit: false,
      isLoading: false,
      visible: this.value,
      model: {
        ucfName: undefined,
        formulaList: [{
          factor: undefined,
          unit: undefined,
        }],
      },
      source: {
        unitList: [],
      },
      rules: {
        ucfName: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
      }
    }
  },

  created() {
    if (this.data) {
      this.isEdit = true;
      const tmp = {
        id: this.data.id,
        ucfName: this.data.ucfName,
        formulaList: this.data.formula.filter(item => item.unit && item.factor),
      }
      this.model =  Object.assign({}, tmp)
    }
  },

  mounted() {
    this.$nextTick().then(() => {
        Service.getUnitList().then((res) => {
          this.source.unitList = res.data
        })
    })
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

    addDomain() {
      this.model.formulaList.push({
        factor: undefined,
        unit: undefined
      });
    },

    checkStatus(tmp) {
       return this.model.formulaList.some((item) => item.unit === tmp.name)
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
      params.formulaList = params.formulaList.filter(item => item.unit && item.factor)
      this.isLoading = true

      if (this.isEdit) {
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

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep input[type="number"]{
  -moz-appearance: textfield;
}

</style>
