<template>
  <div>
    <div class="drug-tip"
         v-if="drugInfo.drugType=='update'">
      <i class="el-icon-warning"></i>
      <span>若修改了【药品通用名称】、【药品规格】、【药品剂型】、【生产厂家】一个或多个对应的内容，需要重新配码后患者才能进行处方购药。</span>
    </div>
    <el-form :model="drug"
             :rules="rules"
             inline
             label-width="auto"
             ref="drugModel">
      <el-form-item label="药品编号："
                    prop="drug_number">
        <el-input v-model="drug.drug_number"
                  maxlength="20"
                  :class="{ disable_input : drugInfo.drugType=='update'}"
                  :disabled="drugInfo.drugType=='update'"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="药品通用名称："
                    prop="drug_name">
        <el-input v-model="drug.drug_name"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="药品规格："
                    prop="drug_spec">
        <el-input v-model="drug.drug_spec"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="药品剂型："
                    prop="drug_form">
        <el-input v-model="drug.drug_form"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="生产厂家："
                    prop="drug_factory">
        <el-input v-model="drug.drug_factory"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="最小单位："
                    prop="drug_litle">
        <el-input v-model="drug.drug_litle"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item class="long-err"
                    label="药品价格："
                    prop="drug_unitPrice">
        <el-input v-model.trim="drug.drug_unitPrice"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="基本剂量："
                    prop="drug_base">
        <el-input v-model="drug.drug_base"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="剂量单位："
                    prop="drug_unit">
        <el-input v-model="drug.drug_unit"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="批准文号："
                    prop="license_number">
        <el-input v-model="drug.license_number"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品名："
                    prop="drug_shopname">
        <el-input v-model="drug.drug_shopname"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="本位码："
                    prop="drug_code">
        <el-input v-model="drug.drug_code"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="药品来源："
                    prop="source">
        <el-select v-model="drug.source"
                   placeholder="请选择">
          <el-option :key="item.label"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ENUM_DRUG_SOURCE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医保目录："
                    prop="source">
        <el-select v-model="drug.is_medical"
                   placeholder="请选择">
          <el-option :key="item.label"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ENUM_MEDICAL_STATUS"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="药品类型："
                    prop="drug_nature">
        <el-input v-model="drug.drug_nature"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="包装单位："
                    prop="drug_dept">
        <el-input v-model="drug.drug_dept"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="包装数量："
                    prop="drug_count">
        <el-input v-model="drug.drug_count"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="给药途径："
                    prop="drug_useway">
        <el-input v-model="drug.drug_useway"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="给药频次："
                    prop="drug_times">
        <el-input v-model="drug.drug_times"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="推荐用量数值："
                    prop="drug_usevalue">
        <el-input v-model="drug.drug_usevalue"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="推荐用量单位："
                    prop="drug_useunit">
        <el-input v-model="drug.drug_useunit"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="储存条件："
                    prop="drug_storage">
        <el-select v-model="drug.drug_storage"
                   placeholder="请选择">
          <el-option :key="item.label"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ENUM_DRUG_STORAGE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拆零："
                    prop="is_disconnect_attr">
        <el-select v-model="drug.is_disconnect_attr"
                   clearable
                   placeholder="请选择">
          <el-option :key="item.label"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ENUM_DISCONNECT"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width: 100%;margin: 32px 0 16px 0;text-align: right;">
        <el-button @click="cancel"
                   type="default">取消</el-button>
        <el-button @click="saved"
                   type="primary">{{drugInfo.drugType=='update'?'保存':'提交'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CONSTANT from '../constant'
import Service from '../service'

export default {
  name: 'DrugModel',
  props: {
    drugInfo: Object
  },
  watch: {
    drugInfo: {
      handler() {
        if (this.drugInfo.drugType) {
          this.drug = Object.assign(this.drug, this.drugInfo)
          this.drug.drug_id = this.drugInfo.id
          if (this.drug.is_disconnect_attr === 'yes') {
            // 拆零为是时
            // 包装数量必填
            this.rules['drug_count'] = [
              {
                required: true,
                message: '请输入包装数量',
                trigger: 'blur'
              }
            ].concat(this.rules['drug_count'])
          }
        }
      },
      immediate: true
    }
  },
  data() {
    const checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入药品价格'))
      }
      if (!/^\d+(\.\d{1,4})?$/.test(value)) {
        return callback(new Error('请输入正确的药品价格，最多保留四位小数'))
      }

      callback()
    }
    const checkDrugNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入药品编号'))
      }
      const params = {
        drug_id: this.drugInfo.id,
        drug_number: value,
        action: this.drug.drugType == 'update' ? 'edit' : 'add'
      }
      Service.checkDrugNumber(params)
        .then(() => {
          callback()
        })
        .catch((res) => {
          const msg = res.msg || '编号已存在！'
          return callback(new Error(msg))
        })
    }
    const checkDrugCount = (rule, value, callback) => {
      if (value) {
        // 移除拆零校验
        this.$refs.drugModel.clearValidate('is_disconnect_attr')
        if (!Peace.validate.isPInterger(value)) {
          return callback(new Error('请输入正整数'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const checkDisconnect = (rule, value, callback) => {
      if (value === 'yes') {
        // 更新包装数量校验
        this.rules['drug_count'] = [
          {
            required: true,
            message: '请输入包装数量',
            trigger: 'blur'
          },
          {
            validator: checkDrugCount,
            trigger: 'blur'
          }
        ]
        // 触发包装数量校验
        this.$refs.drugModel.validateField('drug_count')
      } else {
        // 更新包装数量校验
        this.rules['drug_count'] = [
          {
            validator: checkDrugCount,
            trigger: 'blur'
          }
        ]
        // 触发包装数量校验
        this.$refs.drugModel.validateField('drug_count')
      }
      callback()
    }
    return {
      source: {
        ENUM_DRUG_SOURCE: CONSTANT.ENUM_DRUG_SOURCE,
        ENUM_MEDICAL_STATUS: CONSTANT.ENUM_MEDICAL_STATUS,
        ENUM_DRUG_STORAGE: CONSTANT.ENUM_DRUG_STORAGE,
        ENUM_DISCONNECT: CONSTANT.ENUM_DISCONNECT
      },
      drug: {
        drug_id: '',
        drug_number: '',
        drug_name: '',
        drug_shopname: '',
        drug_spec: '',
        drug_form: '',
        drug_factory: '',
        license_number: '',
        drug_code: '',
        source: 1,
        drug_nature: '',
        drug_dept: '',
        drug_litle: '',
        drug_count: '',
        drug_base: '',
        drug_unit: '',
        drug_useway: '',
        drug_times: '',
        drug_usevalue: '',
        drug_useunit: '',
        drug_unitPrice: '',
        is_medical: 2,
        drug_storage: 1,
        is_disconnect_attr: ''
      },
      rules: {
        drug_number: [
          {
            required: true,
            validator: checkDrugNumber,
            trigger: 'blur'
          }
        ],
        drug_name: [
          {
            required: true,
            message: '请输入药品通用名称',
            trigger: 'blur'
          }
        ],
        drug_spec: [
          {
            required: true,
            message: '请输入药品规格',
            trigger: 'blur'
          }
        ],
        drug_form: [
          {
            required: true,
            message: '请输入药品剂型',
            trigger: 'blur'
          }
        ],
        drug_factory: [
          {
            required: true,
            message: '请输入生产厂家',
            trigger: 'blur'
          }
        ],
        drug_unitPrice: [{ required: true, validator: checkPrice, trigger: 'blur' }],
        license_number: [
          {
            required: true,
            message: '请输入批准文号',
            trigger: 'blur'
          }
        ],
        drug_litle: [
          {
            required: true,
            message: '请输入最小单位',
            trigger: 'blur'
          }
        ],
        drug_base: [
          {
            required: true,
            message: '请输入基本剂量',
            trigger: 'blur'
          }
        ],
        drug_unit: [
          {
            required: true,
            message: '请输入剂量单位',
            trigger: 'blur'
          }
        ],
        drug_dept: [
          {
            required: true,
            message: '请输入包装单位',
            trigger: 'blur'
          }
        ],
        drug_storage: [
          {
            required: true,
            message: '请选择储存条件',
            trigger: 'change'
          }
        ],
        drug_count: [
          {
            validator: checkDrugCount,
            trigger: 'blur'
          }
        ],
        is_disconnect_attr: [
          {
            validator: checkDisconnect,
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('close')
    },
    saved() {
      this.$refs.drugModel.validate((valid) => {
        if (valid) {
          const drug = Object.assign(this.drug)
          if (this.drugInfo.drugType == 'update') {
            this.update(drug)
          } else {
            this.create(drug)
          }
        }
      })
    },
    create(drug) {
      Service.addDrug(drug).then((res) => {
        Peace.util.success(res.msg || '保存成功')
        this.$emit('success')
        this.$emit('close')
      })
    },
    update(drug) {
      Service.updateDrug(drug)
        .then((res) => {
          Peace.util.success(res.msg || '保存成功')
          this.$emit('success')
          this.$emit('close')
        })
        .catch((err) => {
          if (err?.code == '203') {
            this.$emit('success')
            this.$emit('close')
            this.$emit('error', err)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.drug-tip {
  padding: 10px 20px;
  background: rgba(255, 170, 0, 0.1);
  border-radius: 2px;
  width: calc(100% + 40px);
  margin: -10px 0 20px -20px;
  i {
    width: 16px;
    height: 16px;
    color: #ffaa00;
    margin-right: 5px;
  }
  span {
    font-size: 12px;
    line-height: 1;
    color: #666;
  }
}
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}

::v-deep.disable_input {
  &.el-input.is-disabled .el-input__inner {
    color: #333;
  }
}

::v-deep .el-form-item {
  &.long-err {
    .el-form-item__error {
      right: -70px;
    }
  }
}
</style>
