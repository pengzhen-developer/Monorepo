<template>
  <div>
    <el-form :model="drug"
             :rules="rules"
             inline
             ref="drug">
      <el-form-item label="药品编号："
                    label-width="100px"
                    prop="CustDrugsCode">
        <el-input v-model.trim="drug.CustDrugsCode"
                  maxlength="20"
                  placeholder="请输入药品编号"></el-input>
      </el-form-item>
      <el-form-item label="药品名称："
                    label-width="100px"
                    prop="ProductName">
        <el-input v-model.trim="drug.ProductName"
                  placeholder="请输入药品名称"></el-input>
      </el-form-item>
      <el-form-item label="药品规格："
                    label-width="100px"
                    prop="DrugSpecifications">
        <el-input v-model.trim="drug.DrugSpecifications"
                  placeholder="请输入药品规格"></el-input>
      </el-form-item>

      <el-form-item label="生产厂家："
                    label-width="100px"
                    prop="EnterpriseName">
        <el-input v-model.trim="drug.EnterpriseName"
                  placeholder="请输入生产厂家"></el-input>
      </el-form-item>

      <el-form-item label="剂型："
                    label-width="100px">
        <el-input v-model.trim="drug.DrugDosageForm"
                  placeholder="请输入剂型"></el-input>
      </el-form-item>

      <el-form-item label="批准文号："
                    label-width="100px">
        <el-input v-model.trim="drug.ApprovalNumber"
                  placeholder="请输入批准文号"></el-input>
      </el-form-item>

      <el-form-item label="包装单位："
                    label-width="100px">
        <el-input v-model.trim="drug.PackUnit"
                  placeholder="请输入包装单位"></el-input>
      </el-form-item>
    </el-form>

    <div class="bottom">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSave('drug')">确定</el-button>
    </div>
  </div>
</template>
<script>
import Service from '../service'

export default {
  name: 'DrugDetail',
  props: {
    drugInfo: Object
  },
  watch: {
    drugInfo: {
      handler() {
        if (this.drugInfo != null) {
          this.drug = Object.assign(this.drug, this.drugInfo)
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      drug: {
        CustDrugsCode: '',
        ProductName: '',
        DrugSpecifications: '',
        PackUnit: '',
        EnterpriseName: '',
        ApprovalNumber: '',
        DrugDosageForm: ''
      },
      rules: {
        CustDrugsCode: [
          {
            required: true,
            message: '请输入药品编号',
            trigger: 'blur'
          }
        ],
        ProductName: [
          {
            required: true,
            message: '请输入药品名称',
            trigger: 'blur'
          }
        ],
        DrugSpecifications: [
          {
            required: true,
            message: '请输入药品规格',
            trigger: 'blur'
          }
        ],
        EnterpriseName: [
          {
            required: true,
            message: '请输入生产厂家',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    isCanUploadImg() {
      return 9 - this.imageList.length || 0
    }
  },

  methods: {
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    onCancel() {
      this.$emit('onCancel')
    },
    onSave(drug) {
      this.$refs[drug].validate((valid) => {
        if (valid) {
          const params = this.drug
          Service.SaveDrugList(params).then((res) => {
            Peace.util.success(res.msg)
            this.$emit('onSucess')
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
.bottom {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;

  .el-button {
    width: 150px;
    height: 40px;
  }
}
</style>
