<template>
  <div>
    <el-form class="element-ui-default"
             ref="drugForm"
             label-position="left"
             label-width="86px"
             label-suffix="："
             v-bind:model="model"
             v-bind:rules="rules">
      <div class="info-list">
        <div class="info-item">
          <div class="info-title">药房基本信息</div>
          <div class="info-content">
            <el-form-item label="药房类型"
                          prop="CustomerType"
                          required="">
              <el-radio-group v-on:change="changeCustomerType"
                              v-model="model.CustomerType">
                <el-radio v-bind:label=10>线下实体药房</el-radio>
                <el-radio v-bind:label=80>线上电商平台</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="药房编码"
                          prop="SuborganizationCode">
              <el-col class="input-Width"
                      style="margin-right:10px;">
                <el-input v-model.trim="model.SuborganizationCode"
                          placeholder="请输入药房编码"
                          maxlength="30"></el-input>
              </el-col>
              <el-col style="width:420px;">
                <div class="upload-txt">* 该编码是系统对接时区别于其他药房的唯一ID，请与药房系统技术人员确认</div>
              </el-col>
            </el-form-item>

            <el-form-item label="药房名称"
                          prop="CustName">
              <el-col class="input-Width"
                      style="margin-right:10px;">
                <el-input v-model.trim="model.CustName"
                          placeholder="请输入门店名称，如XX医院院内药房"
                          class="input-Width"
                          maxlength="30"></el-input>
              </el-col>
              <el-col style="width:249px;">
                <div class="upload-txt">* 该名称将在用户端显示，且提交后不可更改</div>
              </el-col>
            </el-form-item>
            <el-form-item label="药房地址"
                          class="area"
                          required>
              <el-col class="input-Width"
                      style="margin-right:10px;">
                <el-form-item prop="AreaCode">
                  <region-selector :defaultRegion="defaultRegion"
                                   :defaultText="false"
                                   :disabled="lock"
                                   @provinceChange="handleProvinceChange"
                                   @cityChange="handleCityChange"
                                   @areaChange="handleAreaChange"
                                   ref="regionSelector"></region-selector>
                </el-form-item>
              </el-col>
              <el-col class="input-Width">
                <el-form-item prop="Address">
                  <el-input placeholder="详情地址,如街道、门牌号等"
                            v-model="model.Address"
                            maxlength="50"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
        </div>
        <div class="info-item q-pb-8">
          <div class="info-title">药房联系方式</div>
          <div class="info-content">
            <el-form-item label="联系人姓名"
                          prop="UserName"
                          label-width="100px">
              <el-input v-model.trim="model.UserName"
                        maxlength="10"
                        placeholder="请输入姓名"
                        class="input-Width "></el-input>
            </el-form-item>
            <el-form-item label="联系人电话"
                          label-width="100px"
                          prop="UserPhone">
              <el-input v-model.trim="model.UserPhone"
                        maxlength="11"
                        placeholder="请输入电话"
                        class="input-Width "></el-input>
            </el-form-item>
            <el-form-item label="联系人邮箱"
                          class="email"
                          prop="UserMail"
                          label-width="100px">
              <el-input v-model.trim="model.UserMail"
                        placeholder="请输入邮箱"
                        class="input-Width "
                        maxlength="50"></el-input>
            </el-form-item>

          </div>
        </div>
        <div class="info-item ">
          <div class="info-title">药房运营信息</div>
          <div class="info-content">
            <el-form-item label="营业时间"
                          prop="inputTime">
              <el-time-picker v-model="model.BusinessStartDate"
                              style="width:154px"
                              placeholder="开始时间"
                              format='HH:mm'
                              value-format='HH:mm'
                              :picker-options="{
                                selectableRange: `00:00:00 - ${model.BusinessEndDate+':00'}||23:59:59`
                              }">
              </el-time-picker>
              <span class="label-styles">一</span>
              <el-time-picker v-model="model.BusinessEndDate"
                              style="width:154px"
                              placeholder="结束时间"
                              format='HH:mm'
                              value-format='HH:mm'
                              :picker-options="{
                                selectableRange: `${model.BusinessStartDate+':00'}||00:00:00 - 23:59:59`
                              }">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="药房电话"
                          prop="ContactNumber">
              <el-input v-model.trim="model.ContactNumber"
                        maxlength="11"
                        placeholder="请输入药房电话"
                        class="input-Width "></el-input>
            </el-form-item>

            <el-form-item required
                          label="配送方式"
                          prop="DistributionMode">
              <!-- 自提 -->
              <div class="row payMode"
                   v-if="model.CustomerType==10">
                <el-form-item>
                  <el-checkbox-group class="q-mr-xl"
                                     v-model="DistributSelfMode">
                    <el-checkbox v-for="(item) in  DistributSelfList"
                                 :label="item.code"
                                 :key="item.code">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item v-if="DistributSelfMode.length > 0"
                              required
                              label="支付方式"
                              prop="PayModeSelf">
                  <el-checkbox-group v-model="model.PayModeSelf">
                    <el-checkbox v-for="(item) in  PayselfList"
                                 :label="item.code"
                                 :key="item.code">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>

              <!-- 配送 -->
              <div class="row payMode">
                <el-form-item>
                  <el-checkbox-group class="q-mr-xl"
                                     v-model="DistributMode">
                    <el-checkbox v-for="(item) in  DistributionList"
                                 :label="item.code"
                                 :key="item.code">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item v-if="DistributMode.length>0"
                              label="支付方式"
                              prop="PayMode"
                              required="">
                  <el-checkbox-group v-model="model.PayMode">
                    <el-checkbox v-for="(item) in  PayList"
                                 :label="item.code"
                                 :key="item.code">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="info-item">
          <div class="info-title">药房图片</div>

          <div class="info-content">
            <el-form-item label-width="0"
                          prop="imgList">
              <div class="upload-list">
                <div class="upload-item">
                  <el-upload action
                             :http-request="uploadlogoUrl"
                             :show-file-list="false"
                             :before-upload="beforeUpload"
                             class="el-upload">
                    <img v-show="model.logoUrl"
                         :src="model.logoUrl"
                         class="upload-img" />
                    <img v-show="!model.logoUrl"
                         class="icon-add"
                         :src='require("../assets/img/add.png")'>
                  </el-upload>
                  <div class="upload-name">药房门头照片(必传)</div>
                </div>
                <div class="upload-item">
                  <el-upload action
                             :http-request="uploadBusinesslicenseUrl"
                             :show-file-list="false"
                             :before-upload="beforeUpload"
                             class="el-upload">
                    <img v-show="model.BusinesslicenseUrl"
                         :src="model.BusinesslicenseUrl"
                         class="upload-img" />
                    <img v-show="!model.BusinesslicenseUrl"
                         class="icon-add"
                         :src='require("../assets/img/add.png")'>
                  </el-upload>
                  <div class="upload-name">营业执照(必传)</div>
                </div>
                <div class="upload-item">
                  <el-upload action
                             :http-request="uploadDrugManagementlicenseUrl"
                             :show-file-list="false"
                             :before-upload="beforeUpload"
                             class="el-upload">
                    <img v-show="model.DrugManagementlicenseUrl"
                         :src="model.DrugManagementlicenseUrl"
                         class="upload-img" />
                    <img v-show="!model.DrugManagementlicenseUrl"
                         class="icon-add"
                         :src='require("../assets/img/add.png")'>
                  </el-upload>
                  <div class="upload-name">药品经营许可证(必传)</div>
                </div>
                <div class="upload-item">
                  <el-upload action
                             :http-request="uploadGSPCertificationUrl"
                             :show-file-list="false"
                             :before-upload="beforeUpload"
                             class="el-upload">
                    <img v-show="model.GSPCertificationUrl"
                         :src="model.GSPCertificationUrl"
                         class="upload-img" />
                    <img v-show="!model.GSPCertificationUrl"
                         class="icon-add"
                         :src='require("../assets/img/add.png")'>
                  </el-upload>
                  <div class="upload-name">药品经营质量管理规范认证证书(必传)</div>
                </div>
              </div>
            </el-form-item>
            <div class="upload-txt">* 请上传清晰的药房门头照片，该照片将在用户端展示。支持jpg、jpeg、bmp、gif、png 格式，图片大小不能超过2M</div>
            <div class="info-btn">
              <el-button type="primary"
                         v-bind:loading="isLoading"
                         v-on:click="submit">提 交</el-button>
              <el-button v-on:click="cancel">取 消</el-button>
            </div>
          </div>

        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import Service from '../service'
import RegionSelector from './RegionSelector'
export default {
  props: {
    data: String
  },
  components: {
    RegionSelector
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
    // 校验email
    let validateEmail = (rule, value, callback) => {
      if (value || value !== '') {
        if (Peace.validate.isEmail(value)) {
          callback()
        } else {
          return callback(new Error())
        }
      } else {
        callback()
      }
    }
    // 校验电话
    let validateTel = (rule, value, callback) => {
      if (Peace.validate.isTelephone(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    //校验营业时间
    let inputTimeFun = (rule, value, callback) => {
      if (!this.model.BusinessStartDate || this.model.BusinessStartDate == '' || !this.model.BusinessEndDate || this.model.BusinessEndDate == '') {
        callback(new Error())
      } else {
        callback()
      }
    }
    //校验图片必传
    let imgListFun = (rule, value, callback) => {
      //debugge
      if (this.model.logoUrl && this.model.BusinesslicenseUrl && this.model.DrugManagementlicenseUrl && this.model.GSPCertificationUrl) {
        callback()
      } else {
        callback(new Error())
      }
    }
    return {
      isLoading: false,
      lock: false,
      dataBack: {},
      DistributSelfList: [{ code: 0, name: '自提' }],
      DistributionList: [{ code: 1, name: '配送' }],
      DistributSelfMode: [],
      DistributMode: [],
      PayselfList: [
        { code: 4, name: '在线支付' },
        { code: 2, name: '到店支付' }
      ],
      PayList: [
        { code: 1, name: '在线支付' },
        { code: 3, name: '货到付款' }
      ],
      startTime: '',
      endTime: '',
      model: {
        ID: 0,
        UserID: '',
        CustomerType: 10,
        SuborganizationCode: '',
        CustName: '',
        AreaCode: '',
        Area: '',
        Province: '',
        ProvinceCode: '',
        CityCode: '',
        City: '',
        Address: '',
        UserName: '',
        UserPhone: '',
        UserMail: '',
        BusinessStartDate: '',
        BusinessEndDate: '',
        ContactNumber: '',
        DistributionMode: [],
        PayMode: [],
        PayModeSelf: [],
        logoUrl: '',
        BusinesslicenseUrl: '',
        DrugManagementlicenseUrl: '',
        GSPCertificationUrl: ''
      },
      rules: {
        type: [
          {
            required: true,
            message: '请选择药房类型',
            trigger: 'change'
          }
        ],
        imgList: [
          {
            required: true,
            message: '请上传图片，必传图片不能为空',
            trigger: 'blur',
            validator: imgListFun
          }
        ],
        SuborganizationCode: [
          {
            required: true,
            message: '请输入药房编码',
            trigger: 'blur'
          }
        ],
        CustName: [
          {
            required: true,
            message: '请输入门店名称',
            trigger: 'blur'
          }
        ],
        AreaCode: [
          {
            required: true,
            message: '请选择省市区',
            trigger: 'change'
          }
        ],
        Address: [
          {
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }
        ],
        UserName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        UserPhone: [
          {
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          },
          {
            validator: validateMobile,
            message: '请输入正确的电话号码',
            trigger: 'blur'
          }
        ],
        UserMail: [
          {
            required: false,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: validateEmail,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        DistributionMode: [
          {
            validator: (rule, value, callback) => {
              if (this.DistributSelfMode.length === 0 && this.DistributMode.length === 0) {
                callback(new Error('请选择配送方式'))
              }

              callback()
            }
          }
        ],
        PayModeSelf: [
          {
            validator: (rule, value, callback) => {
              if (this.model.PayModeSelf.length === 0) {
                callback(new Error('请选择支付方式'))
              }
              callback()
            }
          }
        ],
        PayMode: [
          {
            validator: (rule, value, callback) => {
              if (this.model.PayMode.length === 0) {
                callback(new Error('请选择支付方式'))
              }
              callback()
            }
          }
        ],
        ContactNumber: [
          {
            required: true,
            message: '请输入药房电话',
            trigger: 'blur'
          },
          {
            validator: validateTel,
            message: '请输入正确的药房电话',
            trigger: 'blur'
          }
        ],
        inputTime: [
          {
            validator: inputTimeFun,
            required: true,
            message: '请选择营业时间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    defaultRegion() {
      return [this.model.ProvinceCode, this.model.CityCode, this.model.AreaCode]
    }
  },

  watch: {
    DistributSelfMode() {
      this.model.DistributionMode = this.DistributSelfMode.concat(this.DistributMode)
    },
    DistributMode() {
      this.model.DistributionMode = this.DistributSelfMode.concat(this.DistributMode)
    },
    'model.DistributionMode'() {
      this.$refs.drugForm.validateField('DistributionMode')
    }
  },

  created() {
    if (this.data !== '') {
      const params = { UserID: this.data }
      Service.getDetails(params).then((res) => {
        let resData = res.data
        this.dataBack = Peace.util.deepClone(res.data)

        Object.keys(this.model).forEach((key) => {
          this.model[key] = resData[key]
        })
        this.DistributSelfMode = this.model.DistributionMode.filter((item) => item === 0)
        this.DistributMode = this.model.DistributionMode.filter((item) => item === 1)
        this.model.UserID = this.data
      })
    }
  },
  methods: {
    changeCustomerType(value) {
      // 自提
      this.model.PayModeSelf = []
      this.DistributSelfMode = []
      // 配送
      this.model.PayMode = []
      this.DistributMode = []

      // 还原选择
      if (this.dataBack.CustomerType === value) {
        this.DistributSelfMode = this.dataBack.DistributionMode.filter((item) => item === 0)
        this.DistributMode = this.dataBack.DistributionMode.filter((item) => item === 1)
        this.model.PayModeSelf = this.dataBack.PayModeSelf
        this.model.PayMode = this.dataBack.PayMode
      }

      // 清除验证
      setImmediate(() => {
        this.$refs.drugForm.clearValidate('DistributionMode')
      })
    },

    handleProvinceChange(val) {
      if (val != this.model.ProvinceCode) {
        this.model.ProvinceCode = val
        this.model.CityCode = ''
        this.model.AreaCode = ''
      }
    },
    handleCityChange(val) {
      if (val != this.model.CityCode) {
        this.model.CityCode = val
        this.model.AreaCode = ''
      }
    },
    handleAreaChange(val) {
      this.model.AreaCode = val
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
      this.uploadFile(file, 'logoUrl')
    },

    // 上传营业执照
    uploadBusinesslicenseUrl(file) {
      this.uploadFile(file, 'BusinesslicenseUrl')
    },
    // 上传经营许可证
    uploadDrugManagementlicenseUrl(file) {
      this.uploadFile(file, 'DrugManagementlicenseUrl')
    },

    // 上传药品经营质量管理规范
    uploadGSPCertificationUrl(file) {
      this.uploadFile(file, 'GSPCertificationUrl')
    },
    // 上传文件
    uploadFile(file, title) {
      let _this = this
      let files = file.file
      let format = files.name.substring(files.name.lastIndexOf('.') + 1)
      let reader = new FileReader()
      reader.readAsDataURL(files) //将文件读取为 DataURL,也就是base64编码
      reader.onload = function (ev) {
        //文件读取成功完成时触发
        let dataURL = ev.target.result //获得文件读取成功后的DataURL,也就是base64编码
        let param = {
          ImgFormat: format,
          Base64: dataURL
        }
        Service.uploadImage(param)
          .then((res) => {
            _this.model[title] = res.data.SignUrl

            _this.$refs['drugForm'].validateField('imgList')
            Peace.util.success(res.msg)
          })
          .finally(() => {})
      }
    },
    submit() {
      this.validateForm().then(() => {
        this.isLoading = true
        this.model.Province = this.$refs.regionSelector.getSelectedProvinceName()
        this.model.City = this.$refs.regionSelector.getSelectedCityName()
        this.model.Area = this.$refs.regionSelector.getSelectedAreaName()

        const params = Peace.util.deepClone(this.model)
        Service.registerForProve(params)
          .then((res) => {
            console.log(res)
            Peace.util.success('提交成功')
            this.$emit('goBack')
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    cancel() {
      this.$emit('goBack')
    },
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.drugForm.validate((valid) => {
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
::v-deep .email {
  .el-form-item__label {
    &::before {
      content: '*';
      margin-right: 4px;
      color: transparent;
    }
  }
}
.payMode {
  .el-form-item {
    margin-bottom: 14px;
  }
}
::v-deep .el-form-item__label {
  padding: 0 !important;
}
.input-Width {
  width: 440px;
}
.el-checkbox-group {
  height: 28px;
}
.info {
  &-item {
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 24px;
    &:last-child {
      border-bottom: none;
    }
  }
  &-title {
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
  &-img {
    width: 130px;
    height: 130px;
    margin-right: 20px;
    border-radius: 4px;
    border: 1px solid #eeeeee;
  }
}

.inline-form {
  display: flex;
}

.inline-item {
  flex: 1;
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
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
  text-align: center;
}

.upload-txt {
  font-size: 12px;
  font-weight: 400;
  color: rgba(245, 34, 45, 1);
  line-height: 28px;
}

.info-btn {
  padding-top: 30px;
  text-align: center;
  .el-button {
    width: 120px;
    & + .el-button {
      margin-left: 40px;
    }
  }
}
.label-styles {
  color: #ddd;
  margin: 0 10px;
}
</style>
