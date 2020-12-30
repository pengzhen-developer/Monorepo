<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="110px"
             v-bind:model="model"
             v-bind:rules="rules"
             class="q-pl-12 form-padding">
      <el-form-item>
        <span slot="label"
              class="form-label">姓名</span>
        <el-input v-model.trim="model.RealName"
                  maxlength="10"
                  placeholder="请输入药师姓名"
                  v-bind:disabled="model.RealName!==''"></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label"
              class="form-label">身份证号</span>
        <el-input v-model.trim="model.IdentityID"
                  placeholder="请输入药师身份证号"
                  v-bind:disabled="model.IdentityID!==''"></el-input>
      </el-form-item>
      <el-form-item label-width="110px"
                    prop="PharmacistType"
                    label="任职资格类型：">
        <el-radio-group v-model="model.ProveType"
                        v-on:change="changePharmacistType">
          <el-form-item v-for="item  in  typeList"
                        v-bind:key="item.value">
            <el-radio v-bind:label="item.value">{{item.label}}</el-radio>
          </el-form-item>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="QualificationsLevel">
        <span slot="label"
              class="form-label">资质级别</span>
        <el-select v-model="model.QualificationsLevel"
                   :placeholder="model.QualificationsLevel | filterDictionary(source, '--')"
                   style="width: 100%;"
                   clearable>
          <el-option v-for="item in source"
                     v-bind:key="item.value"
                     v-bind:label="item.label"
                     v-bind:value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="CertificateCode">
        <span slot="label"
              class="form-label">证书编号</span>
        <el-input v-model.trim="model.CertificateCode"
                  placeholder="请输入证书编号"
                  maxlength="20"></el-input>
      </el-form-item>
      <el-form-item class="pic">
        <span slot="label"
              class="form-label ">证书图片</span>
        <div class="upload-list">
          <div class="upload-item">
            <el-upload action
                       :http-request="uploadlogoUrl"
                       :show-file-list="false"
                       :before-upload="beforeUpload"
                       class="el-upload">
              <img v-show="model.CertificateImageUrl"
                   :src="model.CertificateImageUrl"
                   class="upload-img" />
              <img v-show="!model.CertificateImageUrl"
                   class="icon-add"
                   :src='require("../assets/img/add.png")'>
            </el-upload>
          </div>
        </div>
        <div class="upload-name">请上传资格证书图片</div>
        <div class="upload-name">建议尺寸：100*100、小于100KB</div>
      </el-form-item>
      <div class="text-center q-pt-14">
        <el-button v-on:click="cancel">取消</el-button>
        <el-button type="primary"
                   v-on:click="save"
                   v-bind:loading="isLoading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Service from '../service'
// import Util from '@src/util'
export default {
  props: {
    data: undefined
  },

  data() {
    // 校验手机
    let validateMobile = (rule, value, callback) => {
      if (Peace.validate.isMobile(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    // 校验药师所属部门
    let validateDepart = (rule, value, callback) => {
      if (this.departTree.length === 0) {
        callback(new Error('请先创建部门：药师管理 - 药师部门'))
      }
      if (!value || value == '') {
        callback(new Error('请选择药师所在部门'))
      }
      callback()
    }

    return {
      showPassword: false,
      model: {
        UserName: '',
        RealName: '',
        IdentityID: '',
        ProveType: '',
        DepartId: '',
        CertificateCode: '',
        QualificationsLevel: '',
        CertificateImageUrl: ''
      },
      imageParamsFormat: undefined,
      imageParamsBase64: undefined,
      typeList: [
        { label: '药学专业技术资格证书', value: '0' },
        { label: '执业药师资格证书', value: '1' }
      ],
      isLoading: false,
      rules: {
        QualificationsLevel: [
          {
            required: true,
            message: '请选择药师资质级别',
            trigger: 'change'
          }
        ],
        CertificateCode: [
          {
            required: true,
            message: '请输入证书编号',
            trigger: 'blur'
          }
        ],
        DepartId: [
          {
            required: true,
            trigger: 'change',
            validator: validateDepart
          }
        ],
        UserName: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: validateMobile,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        ProveType: [
          {
            required: true,
            message: '请选择任职资格类型',
            trigger: 'change'
          }
        ]
      },
      remoteSource: {
        PharmaceuticalType: [],
        LicensedPharmacistType: []
      },
      source: []
    }
  },

  created() {
    const tmp = {
      UserName: this.data.Phone,
      RealName: this.data.RealName,
      IdentityID: this.data.IdentityID,
      ProveType: this.data.PharmacistType,
      DepartId: this.data.DepartId,
      CertificateCode: this.data.CertificateCode,
      QualificationsLevel: this.data.QualificationsLevel,
      CertificateImageUrl: this.data.CertificatesUrl
    }

    /// 赋值
    this.model = Peace.util.deepClone(tmp)
    // this.getDepartTree()
    // this.getRoleList()
    // this.getPharmacistInfo()
  },

  async mounted() {
    // 药学专业技术资格证书  pptqc
    // 执业药师资格证书   lpqc
    this.remoteSource.PharmaceuticalType = await peace.identity.dictionary.getList('pptqc')
    this.remoteSource.LicensedPharmacistType = await peace.identity.dictionary.getList('lpqc')
    this.source = this.model.ProveType == 0 ? this.remoteSource.PharmaceuticalType : this.remoteSource.LicensedPharmacistType
  },

  methods: {
    changePharmacistType(value) {
      this.model.QualificationsLevel = undefined
      this.source = value == 0 ? this.remoteSource.PharmaceuticalType : this.remoteSource.LicensedPharmacistType
    },

    // 校验上传文件
    beforeUpload(file) {
      let isJPG = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/bmp' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片支持jpg、jpeg、bmp、gif、png 格式')
      } else if (!isLt2M) {
        this.$message.error('上传图片大小不能超过2M')
      }
      return isJPG && isLt2M
    },

    // 上传药房门头照片
    uploadlogoUrl(file) {
      this.uploadFile(file)
    },

    // 上传文件
    uploadFile(file) {
      let files = file.file
      let format = files.name.substring(files.name.lastIndexOf('.'))

      let reader = new FileReader()
      reader.readAsDataURL(files) //将文件读取为 DataURL,也就是base64编码
      reader.onload = (ev) => {
        //文件读取成功完成时触发
        let dataURL = ev.target.result //获得文件读取成功后的DataURL,也就是base64编码
        // data:image/png;base64,
        this.model.CertificateImageUrl = dataURL
        let base64 = dataURL.substring(dataURL.indexOf(',') + 1)

        this.imageParamsFormat = format
        this.imageParamsBase64 = base64
      }
    },

    save() {
      this.validateForm().then(() => {
        this.isLoading = true
        const params = {
          CertificateCode: this.model.CertificateCode,
          QualificationsLevel: this.model.QualificationsLevel,
          ProveType: this.model.ProveType
        }
        if (!Peace.validate.isEmpty(this.imageParamsFormat) && !Peace.validate.isEmpty(this.imageParamsBase64)) {
          params['CertificateImage'] = this.imageParamsBase64
          params['CertificateImageFileSuffix'] = this.imageParamsFormat
        }

        Service.updateInformations(params)
          .then(() => {
            Peace.util.success('保存成功')
            this.$emit('close')
            this.$emit('refresh')
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },

    cancel() {
      this.$emit('close')
    },

    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input.is-disabled .el-input__inner {
  background-color: #f7f7f7;
  border-color: #cccccc;
  color: rgba(0, 0, 0, 0.25);
}

.el-radio-group {
  .el-form-item {
    &.el-form-item--mini {
      margin-bottom: 0;
    }
  }
}
.form-label {
  position: relative;
  display: inline-block;
  width: 70px;
  padding-right: 12px;
  text-align: justify;
  text-align-last: justify;
  &::after {
    content: '：';
    position: absolute;
    top: 0;
    right: 0;
  }
}

.upload-list {
  display: flex;
}
::v-deep .upload-item {
  flex: none;
  width: 130px;
  margin-right: 20px;
  background: #ffffff;
  &:last-child {
    margin-right: 0;
  }
  .el-upload {
    width: 130px;
    height: 130px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(238, 238, 238, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .upload-img {
      width: 100%;
      height: 100%;
    }
    .icon-add {
      width: 54px !important;
      height: 54px !important;
      display: block;
    }
  }
}
.upload-name {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
}
.form-padding {
  padding-right: 65px;
}
</style>
<style>
.accountDialog .el-form-item__label {
  padding-right: 0;
}
</style>
