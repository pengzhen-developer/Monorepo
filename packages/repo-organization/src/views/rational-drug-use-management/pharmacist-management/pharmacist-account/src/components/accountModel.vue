<template>
  <div>
    <el-form ref="form"
             label-position="left"
             label-width="auto"
             v-bind:model="model"
             v-bind:rules="rules">
      <div>
        <div class="info-item">
          <div class="info-title">基本信息</div>
          <el-row class="q-pl-14">
            <el-col :span="12"
                    class="q-pr-20">
              <el-form-item prop="RealName">
                <span slot="label"
                      class="form-label">姓名</span>
                <el-input v-model.trim="model.RealName"
                          maxlength="10"
                          placeholder="请输入药师姓名"
                          v-bind:disabled="data!==''"></el-input>
              </el-form-item>
              <el-form-item prop="IdentityID">
                <span slot="label"
                      class="form-label">身份证号</span>
                <el-input v-model.trim="model.IdentityID"
                          placeholder="请输入药师身份证号"
                          v-bind:disabled="data!==''"></el-input>
              </el-form-item>
              <el-form-item label-width="120px"
                            prop="PharmacistType"
                            label="任职资格类型：">
                <el-radio-group v-model="model.PharmacistType"
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
                           placeholder="请选择药师资质级别"
                           style="width: 100%;"
                           clearable>
                  <el-option v-for="item in selectList"
                             v-bind:key="item.Value"
                             v-bind:label="item.Text"
                             v-bind:value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    class="q-pr-16">
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
            </el-col>
          </el-row>
        </div>

        <div class="info-item">
          <div class="info-title">账号信息</div>
          <div class="q-pl-14 q-pr-16">
            <el-row :gutter="20">

              <el-col :span="12">
                <el-form-item prop="DepartId">
                  <span slot="label"
                        class="form-label">所属部门</span>
                  <el-cascader placeholder="请选择药师部门"
                               :options="departTree"
                               :props="{ checkStrictly: true ,emitPath:false}"
                               filterable
                               clearable
                               v-model="model.DepartId"></el-cascader>
                </el-form-item>
                <el-form-item prop="RoleIds">
                  <span slot="label"
                        class="form-label">账号角色</span>
                  <el-select placeholder="请选择账号角色"
                             multiple
                             clearable
                             v-model="model.RoleIds"
                             style="width:100%">
                    <el-option v-for="item in roleList"
                               v-bind:key="item.roleId"
                               v-bind:label="item.roleName"
                               v-bind:value="item.roleId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="UserName">
                  <span slot="label"
                        class="form-label">账号</span>
                  <el-input v-model.trim="model.UserName"
                            maxlength="11"
                            placeholder="请输入手机号码"></el-input>
                </el-form-item>

              </el-col>
              <el-col :span="12">
                <el-form-item prop="Pwd"
                              class="pic">
                  <span slot="label"
                        class="form-label">密码</span>
                  <el-input v-model="model.Pwd"
                            v-bind:show-password="showPassword"
                            minlength="6"
                            maxlength="20"
                            placeholder="不输入则默认使用12345678可登录"
                            auto-complete="new-password"
                            v-on:focus="showPassword=true"></el-input>
                </el-form-item>

              </el-col>
            </el-row>
            <el-form-item prop="Note"
                          class="pic">
              <span slot="label"
                    class="form-label">备注</span>
              <el-input type="textarea"
                        resize="none"
                        v-model="model.Note"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="text-center">
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
import Util from '@src/util'
export default {
  props: {
    data: String
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
    //校验身份证号
    let validateIdentityID = (rule, value, callback) => {
      if (!Peace.validate.isIDCard(value)) {
        callback(new Error('请输入正确的身份证号'))
      }
      callback()
    }
    return {
      showPassword: false,
      model: {
        UserName: '',
        RealName: '',
        IdentityID: '',
        PharmacistType: '',
        DepartId: '',
        RoleIds: [],
        CertificateCode: '',
        QualificationsLevel: '',
        CertificateImageUrl: '',
        Pwd: '',
        Note: ''
      },
      typeList: [
        { label: '药学专业技术资格证书', value: '0' },
        { label: '执业药师资格证书', value: '1' }
      ],
      selectList: [],
      departTree: [],
      roleList: [],
      isLoading: false,
      rules: {
        RealName: [
          {
            required: true,
            message: '请输入药师姓名',
            trigger: 'blur'
          }
        ],
        IdentityID: [
          {
            required: true,
            message: '请输入药师身份证号',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: validateIdentityID
          }
        ],
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
        Pwd: [{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }],
        RoleIds: [
          {
            required: true,
            message: '请选择账号角色',
            trigger: 'change'
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
        PharmacistType: [
          {
            required: true,
            message: '请选择任职资格类型',
            trigger: 'change'
          }
        ]
      }
    }
  },

  watch: {
    'model.PharmacistType'() {
      this.getQualificationsLevel(this.model.PharmacistType)
    }
  },

  created() {
    this.getDepartTree()
    this.getRoleList()
    this.getPharmacistInfo()
  },

  methods: {
    changePharmacistType() {
      this.model.QualificationsLevel = ''
    },

    //获取药师部门
    getDepartTree() {
      Service.getDepartTree().then((res) => {
        this.departTree = res.data?.list ?? []
      })
    },

    //获取药师校色
    getRoleList() {
      const params = {
        clientId: 'pharmacist',
        organCode: Util.user.getUserInfo().custCode
      }
      Service.roleList(params).then((res) => {
        this.roleList = res.data
      })
    },

    // 获取药师信息
    getPharmacistInfo() {
      if (this.data) {
        const params = { Id: this.data }
        Service.PharmacistInfo(params).then((res) => {
          Object.keys(this.model).forEach((key) => {
            this.model[key] = res.data[key]
          })
          this.model.Pwd = ''
        })
      }
    },

    //获取资质级别
    getQualificationsLevel(value) {
      if (value == '0') {
        Service.MedicalLevelList().then((res) => {
          this.selectList = res.data?.list ?? []
        })
      } else {
        Service.LicensedLevelList().then((res) => {
          this.selectList = res.data?.list ?? []
        })
      }
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
      this.uploadFile(file, 'CertificateImageUrl')
    },

    // 上传文件
    uploadFile(file, title) {
      let files = file.file
      let format = files.name.substring(files.name.lastIndexOf('.') + 1)
      let reader = new FileReader()
      reader.readAsDataURL(files) //将文件读取为 DataURL,也就是base64编码
      reader.onload = (ev) => {
        //文件读取成功完成时触发
        let dataURL = ev.target.result //获得文件读取成功后的DataURL,也就是base64编码
        let param = {
          ImgFormat: format,
          Base64: dataURL
        }
        Service.uploadImage(param).then((res) => {
          this.model[title] = res.data.SignUrl
        })
      }
    },

    save() {
      this.validateForm().then(() => {
        this.isLoading = true
        const params = Peace.util.deepClone(this.model)
        if (this.data) {
          params.UserId = this.data
          Service.UpdatePharmacist(params)
            .then(() => {
              Peace.util.success('保存成功')
              this.$emit('close')
              this.$emit('refresh')
            })
            .finally(() => {
              this.isLoading = false
            })
        } else {
          Service.CreatePharmacist(params)
            .then(() => {
              Peace.util.success('保存成功')
              this.$emit('close')
              this.$emit('refresh')
            })
            .finally(() => {
              this.isLoading = false
            })
        }
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
.el-cascader {
  width: 100%;
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
::v-deep .pic {
  .el-form-item__label {
    &::before {
      content: '*';
      margin-right: 4px;
      color: transparent;
    }
  }
}
.info-item {
  border-bottom: 1px solid #e9e9e9;
  margin-bottom: 24px;
  &:last-child {
    border-bottom: none;
  }
}

.info-title {
  position: relative;
  padding-left: 14px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    width: 4px;
    height: 16px;
    background-color: var(--q-color-primary);
    border-radius: 2px;
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
</style>
<style>
.accountDialog .el-form-item__label {
  padding-right: 0;
}
</style>