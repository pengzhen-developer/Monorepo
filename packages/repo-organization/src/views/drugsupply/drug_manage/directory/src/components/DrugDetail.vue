<template>
  <div>
    <el-form :model="drug"
             :rules="rules"
             class="content"
             inline
             ref="drug">
      <el-form-item label="药品编号："
                    prop="CustDrugsCode">
        <el-input v-model.trim="drug.CustDrugsCode"
                  maxlength="20"
                  placeholder="请输入药品编号"></el-input>
      </el-form-item>
      <el-form-item label="药品名称："
                    prop="ProductName">
        <el-input v-model.trim="drug.ProductName"
                  placeholder="请输入药品名称"></el-input>
      </el-form-item>
      <el-form-item label="药品规格："
                    prop="DrugSpecifications">
        <el-input v-model.trim="drug.DrugSpecifications"
                  placeholder="请输入药品规格"></el-input>
      </el-form-item>
      <el-form-item label="包装单位："
                    prop="PackUnit">
        <el-input v-model.trim="drug.PackUnit"
                  placeholder="请输入包装单位"></el-input>
      </el-form-item>
      <el-form-item label="生产厂家："
                    prop="EnterpriseName">
        <el-input v-model.trim="drug.EnterpriseName"
                  placeholder="请输入生产厂家"></el-input>
      </el-form-item>
      <el-form-item label="批准文号："
                    prop="ApprovalNumber">
        <el-input v-model.trim="drug.ApprovalNumber"
                  placeholder="请输入批准文号"></el-input>
      </el-form-item>

      <el-form-item prop="source">
        <span slot="label">
          <span>外流：</span>
        </span>
        <el-select v-model="drug.Circulate"
                   placeholder="请选择">
          <el-option :key="item.label"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ENUM_CIRCULATE"></el-option>
        </el-select>
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
import CONSTANT from '../constant'
import Service from '../service'
import Peace from '@src/library'

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
          this.drug.Circulate = this.drugInfo.Circulate + ''
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      source: {
        ENUM_CIRCULATE: CONSTANT.ENUM_CIRCULATE2
      },

      drug: {
        CustDrugsCode: '',
        ProductName: '',
        DrugSpecifications: '',
        PackUnit: '',
        EnterpriseName: '',
        ApprovalNumber: '',
        Circulate: '0'
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
        PackUnit: [
          {
            required: true,
            message: '请输入包装单位',
            trigger: 'blur'
          }
        ],

        EnterpriseName: [
          {
            required: true,
            message: '请输入生产厂家',
            trigger: 'blur'
          }
        ],
        ApprovalNumber: [
          {
            required: true,
            message: '请输入批准文号',
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
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-form-item {
    width: 48%;
    margin-right: 0px !important;
  }
}

.bottom {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;

  .el-button {
    width: 150px;
    height: 40px;
  }
}

.el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px dashed #c0ccda;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.content-img {
  display: flex;
  flex-wrap: wrap;
}
.content-img-item {
  width: 25%;
  margin-top: 10px;
  position: relative;
}
.content-img-delete {
  position: absolute;
  width: 16px;
  height: 16px;
  right: 22px;
  top: -8px;
}
</style>
