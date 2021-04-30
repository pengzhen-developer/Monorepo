<template>
  <div>
    <el-form :model="model"
             :rules="rules"
             class="content"
             label-width="78px"
             label-suffix="："
             ref="model">
      <el-form-item label="药品编码"
                    prop="CustDrugsCode">
        {{model.CustDrugsCode}}
      </el-form-item>
      <el-form-item label="药品名称"
                    prop="ProductName">
        {{model.ProductName}}
      </el-form-item>
      <el-form-item label="包装规格"
                    prop="DrugSpecifications">
        {{model.DrugSpecifications}}
      </el-form-item>
      <el-form-item label="厂家"
                    prop="EnterpriseName">
        {{model.EnterpriseName}}
      </el-form-item>
      <el-form-item label="基本剂量"
                    prop="BaseDose">
        <el-input v-model.trim="model.BaseDose"
                  type="text"
                  maxlength="100"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="剂量单位"
                    prop="DoseUnit">
        <el-input v-model.trim="model.DoseUnit"
                  type="text"
                  maxlength="100"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="包装数量"
                    prop="PackNum">
        <el-input v-model.trim="model.PackNum"
                  type="text"
                  maxlength="100"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="最小单位"
                    prop="MinUnit">
        <el-input v-model.trim="model.MinUnit"
                  type="text"
                  maxlength="100"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="包装单位"
                    prop="PackUnit">
        <el-input v-model.trim="model.PackUnit"
                  type="text"
                  maxlength="100"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="容量数值"
                    prop="capacity_value">
        <el-input v-model.trim="model.capacity_value"
                  type="text"
                  maxlength="100"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="容量单位"
                    prop="capacity_unit">
        <el-input v-model.trim="model.capacity_unit"
                  type="text"
                  maxlength="100"
                  placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>

    <div class="bottom">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSave">确定</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'Model',
  props: {
    id: [Number, String]
  },
  data() {
    let validateIsPNumerical = (rule, value, callback) => {
      const reg = /^(0|[1-9][0-9]{0,})(\.\d{1,})?$/
      console.log(rule)
      if ((value && !reg.test(value)) || value === 0 || value === '0') {
        callback(new Error('请输入大于零的数字'))
      } else {
        callback()
      }
    }
    let validateIsPInterger = (rule, value, callback) => {
      console.log(rule)
      if ((value && !Peace.validate.isPInterger(value)) || value === 0 || value === '0') {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      model: {},
      rules: {
        BaseDose: [
          {
            validator: validateIsPNumerical,
            trigger: 'blur'
          }
        ],
        PackNum: [
          {
            validator: validateIsPInterger,
            trigger: 'blur'
          }
        ],
        capacity_value: [
          {
            validator: validateIsPNumerical,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDrugPackingInfo()
    })
  },
  methods: {
    getDrugPackingInfo() {
      Service.GetCustDrugByID({ ID: this.id }).then((res) => {
        this.model = res.data || {}
      })
    },
    onCancel() {
      this.$emit('cancel')
    },
    onSave() {
      this.$refs['model'].validate((valid) => {
        if (valid) {
          const params = this.model
          Service.updateDrugPackaging(params).then((res) => {
            Peace.util.success(res.msg)
            this.$emit('success')
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
.bottom {
  display: flex;
  justify-content: flex-end;
}
</style>