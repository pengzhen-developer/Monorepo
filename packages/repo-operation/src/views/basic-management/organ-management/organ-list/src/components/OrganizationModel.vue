<template>
  <div v-loading="getLoading">
    <el-form class="element-ui-default"
             ref="form"
             label-position="right"
             label-width="210px"
             label-suffix="："
             v-bind:model="model"
             v-bind:rules="rules">
      <div class="info-list">
        <div class="info-item">
          <div class="info-title">机构信息</div>
          <div class="info-content">
            <el-form-item label="机构类型"
                          prop="role">
              <el-select clearable
                         v-model="model.role"
                         placeholder="请选择"
                         style="width: 100%;"
                         class="org-type"
                         :disabled="!!model.accountId">
                <el-option :key="item.label"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in source.ENUM_ORGANIZATION_TYPE"></el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="机构名称"
                          prop="hospitalName">
              <el-input v-model.trim="model.hospitalName"
                        placeholder="请输入"
                        maxlength="30"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码"
                          prop="socialCreditCode">
              <el-input v-model.trim="model.socialCreditCode"
                        placeholder="请输入"
                        maxlength="18"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="医疗机构执业许可证登记号"
                          prop="licenseNumber"
                          v-if="model.role.toString() === '1' || model.role.toString() === ''">
              <el-input v-model.trim="model.licenseNumber"
                        placeholder="请输入登记号"
                        maxlength="30"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="医院类型"
                          class="is-required"
                          style="margin-bottom: 0;"
                          v-if="model.role.toString() === '1' || model.role.toString() === ''">
              <div class="inline-form">
                <el-form-item class="inline-item"
                              label-width="0px"
                              prop="hosTypeCode">
                  <el-select clearable
                             v-model="model.hosTypeCode"
                             placeholder="请选择"
                             style="width: 100%;">
                    <el-option :key="item.hosTypeName"
                               :label="item.hosTypeName"
                               :value="item.hosTypeCode"
                               v-for="item in source.ENUM_HOS_TYPE"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="inline-item"
                              label-width="0px"
                              prop="hosChildCode">
                  <el-select clearable
                             :disabled="hosChildCodeDisable"
                             v-model="model.hosChildCode"
                             placeholder="请选择"
                             style="width: 100%;">
                    <el-option :key="item.hosTypeChildName"
                               :label="item.hosTypeChildName"
                               :value="item.hosTypeChildCode"
                               v-for="item in source.ENUM_HOS_TYPE_CHILD"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="详细地址"
                          class="is-required"
                          style="margin-bottom: 0;">
              <div class="inline-form"
                   v-show="showRegion">
                <el-form-item class="inline-item"
                              label-width="0px"
                              prop="district">
                  <region-selector :defaultRegion="defaultRegion"
                                   :defaultText="false"
                                   :disabled="lock"
                                   @provinceChange="handleProvinceChange"
                                   @cityChange="handleCityChange"
                                   @areaChange="handleAreaChange"
                                   ref="regionSelector"></region-selector>
                </el-form-item>
              </div>
              <div class="inline-form">
                <el-form-item class="inline-item"
                              label-width="0px"
                              prop="address">
                  <el-input v-if="model.role.toString() === '1' || model.role.toString() === ''"
                            @click.native="openMapDialogVisible"
                            @focus="openMapDialogVisible"
                            readonly
                            suffix-icon="el-icon-location"
                            v-model="model.address"
                            placeholder="请输入详细地址"></el-input>
                  <el-input v-if="model.role.toString() === '2' || model.role.toString() === '3'"
                            v-model="model.address"
                            placeholder="请输入详细地址"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="医院等级"
                          prop="hosLevelCode"
                          v-if="model.role.toString() === '1' || model.role.toString() === ''">
              <el-select clearable
                         v-model="model.hosLevelCode"
                         placeholder="请选择"
                         style="width: 100%;">
                <el-option :key="item.hosLevelName"
                           :label="item.hosLevelName"
                           :value="item.hosLevelCode"
                           v-for="item in source.ENUM_HOSPITAL_LEVEL"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资质证明">
              <div class="upload-list"
                   v-if="model.role.toString() === '1' || model.role.toString() === ''">
                <div class="upload-item">
                  <el-upload action
                             :http-request="uploadMedicalStructureLicense"
                             :show-file-list="false"
                             :before-upload="beforeUpload">
                    <img v-if="model.medicalStructureLicense"
                         :src="model.medicalStructureLicense"
                         class="upload-img" />
                    <i v-else
                       class="el-icon-plus upload-icon"></i>
                  </el-upload>
                  <div class="upload-name">医疗机构执业许可证</div>
                  <!-- <div class="upload-txt"></div> -->
                </div>
                <div class="upload-item">
                  <el-upload action
                             :http-request="uploadInternetHospitalLicense"
                             :show-file-list="false"
                             :before-upload="beforeUpload">
                    <img v-if="model.internetHospitalLicense"
                         :src="model.internetHospitalLicense"
                         class="upload-img" />
                    <i v-else
                       class="el-icon-plus upload-icon"></i>
                  </el-upload>
                  <div class="upload-name">互联网医院牌照</div>
                  <!-- <div class="upload-txt">(选填,互联网医院需补充)</div> -->
                </div>
              </div>

              <div class="upload-list"
                   v-if="model.role.toString() === '2'">
                <div class="upload-item">
                  <el-upload action
                             :http-request="uploadBusinessLicense"
                             :show-file-list="false"
                             :before-upload="beforeUpload">
                    <img v-if="model.businessLicense"
                         :src="model.businessLicense"
                         class="upload-img" />
                    <i v-else
                       class="el-icon-plus upload-icon"></i>
                  </el-upload>
                  <div class="upload-name">营业执照</div>
                </div>
                <div class="upload-item">
                  <el-upload action
                             :http-request="uploadManagementLicense"
                             :show-file-list="false"
                             :before-upload="beforeUpload">
                    <img v-if="model.managementLicense"
                         :src="model.managementLicense"
                         class="upload-img" />
                    <i v-else
                       class="el-icon-plus upload-icon"></i>
                  </el-upload>
                  <div class="upload-name">经营许可证</div>
                </div>
              </div>

              <div class="upload-list"
                   v-if="model.role.toString() === '3'">
                <div class="upload-item">
                  <el-upload action
                             :http-request="uploadBusinessLicense"
                             :show-file-list="false"
                             :before-upload="beforeUpload">
                    <img v-if="model.businessLicense"
                         :src="model.businessLicense"
                         class="upload-img" />
                    <i v-else
                       class="el-icon-plus upload-icon"></i>
                  </el-upload>
                  <div class="upload-name">营业执照</div>
                </div>
              </div>

              <div class="upload-txt"
                   style="margin-top: 10px;">支持jpg 、jpeg 、bmp 、gif 、png格式图片，大小不超过2M</div>
            </el-form-item>
          </div>
        </div>

        <div class="info-item"
             style="border-bottom: none;">
          <div class="info-title">账号信息</div>
          <div class="info-content">
            <el-form-item label="联系人"
                          prop="linkman">
              <el-input v-model.trim="model.linkman"
                        maxlength="10"
                        placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号码"
                          prop="tel">
              <el-input v-model.trim="model.tel"
                        placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="邮箱"
                          prop="email">
              <el-input v-model.trim="model.email"
                        placeholder="请输入"></el-input>
            </el-form-item>

          </div>
        </div>

        <div class="info-btn">
          <el-button v-on:click="close">取 消</el-button>
          <el-button type="primary"
                     v-bind:loading="isLoading"
                     v-on:click="submit">保 存</el-button>
        </div>
      </div>
    </el-form>

    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="mapDialogVisible"
                 append-to-body
                 title="地图"
                 width="800px">
      <TMap :defaultDetail="defaultDetail"
            @getAddressData="getAddressData"></TMap>
    </PeaceDialog>
  </div>
</template>

<script>
import CONSTANT from '../constant'

import Service from '../service'

import TMap from './Map'
import RegionSelector from './RegionSelector'

export default {
  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  components: {
    RegionSelector,
    TMap
  },

  data() {
    // 校验数字和字母
    let validateNumberCharacter = (rule, value, callback) => {
      let pattern = /^[a-zA-Z0-9]*$/
      if (pattern.test(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    // 校验电话
    let validateTel = (rule, value, callback) => {
      if (Peace.validate.isMobile(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    // 校验email
    let validateEmail = (rule, value, callback) => {
      if (Peace.validate.isEmail(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    return {
      CONSTANT,

      getLoading: true,

      isLoading: false,

      mapDialogVisible: false,
      lock: false,
      defaultDetail: '',

      model: {
        accountId: '',
        role: '', // 机构类型
        hospitalName: '', // 机构名称
        socialCreditCode: '', // 统一社会信用代码
        licenseNumber: '', // 医疗机构执业许可证登记号
        hosTypeCode: '', // 医院类型code
        hosChildCode: '', // 医院类型二级code
        province: '', //  省
        city: '', //  市
        district: '', // 区
        address: '', // 地址
        latitude: '',
        longitude: '',
        hosLevelCode: '', // 医院等级
        medicalStructureLicense: '', // 医疗机构执业许可证
        internetHospitalLicense: '', // 互联网医院牌照
        businessLicense: '', //  营业执照
        managementLicense: '', // 经营许可证
        linkman: '', // 联系人
        tel: '', // 电话号码
        email: '' // 邮箱
      },
      source: {
        ENUM_ORGANIZATION_TYPE: [], //机构类型
        ENUM_HOSPITAL_LEVEL: [], //医院等级
        ENUM_HOS_TYPE: [], //医院类型
        ENUM_HOS_TYPE_CHILD: [] //医院类型子类
      },
      rules: {
        role: [
          {
            required: true,
            message: '请选择机构类型',
            trigger: 'change'
          }
        ],
        hospitalName: [
          {
            required: true,
            message: '请填写机构名称',
            trigger: 'blur'
          }
        ],
        socialCreditCode: [
          {
            required: true,
            message: '请填写统一社会信用代码',
            trigger: 'blur'
          },
          {
            validator: validateNumberCharacter,
            message: '统一社会信用代码只能输入数字和字母',
            trigger: 'blur'
          },
          {
            min: 18,
            max: 18,
            message: '统一社会信用代码长度为18位',
            trigger: 'blur'
          }
        ],
        licenseNumber: [
          {
            required: true,
            message: '请输入医疗机构执业许可证登记号',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 30,
            message: '医疗机构执业许可证登记号最大输入30个字符',
            trigger: 'blur'
          }
        ],
        hosTypeCode: [
          {
            required: true,
            message: '请选择医院类型',
            trigger: 'change'
          }
        ],
        hosChildCode: [
          {
            required: true,
            message: '请选择医院类型',
            trigger: 'change'
          }
        ],
        hosLevelCode: [
          {
            required: true,
            message: '请选择医院等级',
            trigger: 'change'
          }
        ],
        district: [
          {
            required: true,
            message: '请选择省市区',
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入详细地址',
            trigger: 'change'
          }
        ],
        linkman: [
          {
            required: true,
            message: '请填写姓名',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            message: '请填写电话号码',
            trigger: 'blur'
          },
          {
            validator: validateTel,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请填写邮箱',
            trigger: 'blur'
          },
          {
            validator: validateEmail,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  async created() {
    this.source.ENUM_ORGANIZATION_TYPE = await Peace.identity.dictionary.getList('hos_role_type')
    this.getHosLevelList()
    this.getHosTypeList()
  },

  computed: {
    showRegion() {
      return (
        this.model.role.toString() === '1' || this.model.role.toString() === '2' || this.model.role.toString() === '3'
      )
    },
    defaultRegion() {
      return [this.model.province, this.model.city, this.model.district]
    },
    hosChildCodeDisable() {
      return Peace.validate.isEmpty(this.model.hosTypeCode)
    }
  },

  watch: {
    'model.role'(newVal, oldVal) {
      if (!this.model.accountId) {
        switch (newVal) {
          case '1': //医院
            if (oldVal === '2' || oldVal === '3') {
              this.resetForm('1')
            }
            break
          case '2': //店配机构
            this.resetForm('2')
            break
          case '3': //仓配机构
            this.resetForm('3')
            break
        }
      }
    },
    'model.hosTypeCode': function(val, oldVal) {
      if (val !== oldVal) {
        this.model.hosChildCode = ''
        this.source.ENUM_HOS_TYPE_CHILD = []
        if (!Peace.validate.isEmpty(val)) {
          this.getHosTypeChildrenList()
        }
      }
    }
  },

  methods: {
    //获取医院登记
    getHosLevelList() {
      return Service.getHosLevelList().then((res) => {
        this.source.ENUM_HOSPITAL_LEVEL = res.data.list || []
      })
    },

    //获取医院类型一级列表
    getHosTypeList() {
      return Service.getHosTypeList().then((res) => {
        this.source.ENUM_HOS_TYPE = res.data.list || []
      })
    },

    //获取医院类型子集列表接口
    getHosTypeChildrenList() {
      const params = { parentRangeCode: this.model.hosTypeCode }
      return Service.getHosTypeChildrenList(params).then((res) => {
        this.source.ENUM_HOS_TYPE_CHILD = res.data.list || []
      })
    },

    init(id) {
      this.model.accountId = id || 0
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.model.latitude = ''
        this.model.longitude = ''
        this.model.medicalStructureLicense = '' // 医疗机构执业许可证
        this.model.internetHospitalLicense = '' // 互联网医院牌照
        this.model.businessLicense = '' //  营业执照
        this.model.managementLicense = '' // 经营许可证

        if (this.model.accountId) {
          Service.getOrganizationInfo({ accountId: this.model.accountId })
            .then((res) => {
              this.model.role = res.data.role?.toString()
              this.model.hospitalName = res.data.hospitalName
              this.model.socialCreditCode = res.data.socialCreditCode
              this.model.licenseNumber = res.data.licenseNumber
              this.model.province = res.data.provinceId
              this.model.city = res.data.cityId
              this.model.district = res.data.areaId
              this.model.address = res.data.address
              this.model.latitude = res.data.latitude
              this.model.longitude = res.data.longitude
              this.model.hosLevelCode = res.data.hosLevelCode?.toString()
              this.model.medicalStructureLicense = res.data.medicalStructureLicense || ''
              this.model.internetHospitalLicense = res.data.internetHospitalLicense || ''
              this.model.businessLicense = res.data.businessLicense || ''
              this.model.managementLicense = res.data.managementLicense || ''
              this.model.linkman = res.data.linkman
              this.model.tel = res.data.tel
              this.model.email = res.data.email

              // 编辑医疗机构信息时默认不能直接修改省市区
              if (this.model.role.toString() === '1') {
                this.lock = true
                this.defaultDetail = {
                  province: this.model.province,
                  city: this.model.city,
                  area: this.model.district,
                  address: this.model.address,
                  latitude: this.model.latitude,
                  longitude: this.model.longitude
                }
              }
              this.model.hosTypeCode = res.data.hosTypeCode
              if (!Peace.validate.isEmpty(this.model.hosTypeCode)) {
                this.getHosTypeChildrenList().then(() => {
                  this.model.hosChildCode = res.data.hosChildCode
                })
              }
            })
            .finally(() => {
              this.getLoading = false
            })
        } else {
          this.getLoading = false
        }
      })
    },
    handleProvinceChange(val) {
      if (val != this.model.province) {
        this.model.province = val
        this.model.city = ''
        this.model.district = ''
      }
    },
    handleCityChange(val) {
      if (val != this.model.city) {
        this.model.city = val
        this.model.district = ''
      }
    },
    handleAreaChange(val) {
      this.model.district = val
    },

    // 打开地图选点
    openMapDialogVisible() {
      this.lock = true
      const { province, city, area } = this.$refs.regionSelector.getSelected()

      this.defaultDetail = {
        province,
        city,
        area,
        address: this.model.address,
        latitude: this.model.latitude,
        longitude: this.model.longitude
      }

      this.mapDialogVisible = true
    },

    // 获取格式化地址（子组件触发）
    getAddressData(param) {
      this.defaultDetail = {
        province: param.province_id,
        city: param.city_id,
        area: param.area_id,
        address: param.address,
        latitude: param.latitude,
        longitude: param.longitude
      }

      this.model.province = param.province_id
      this.model.city = param.city_id
      this.model.district = param.area_id
      this.model.address = param.address
      this.model.latitude = param.latitude
      this.model.longitude = param.longitude

      this.mapDialogVisible = false
    },

    // 校验上传文件
    beforeUpload(file) {
      let isJPG =
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/bmp' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片支持jpg、jpeg、bmp、gif、png 格式')
      } else if (!isLt2M) {
        this.$message.error('上传图片大小不能超过2M')
      }
      return isJPG && isLt2M
    },

    // 上传医疗机构执业许可证
    uploadMedicalStructureLicense(file) {
      this.uploadFile(file, 'medicalStructureLicense')
    },

    // 上传互联网医院牌照
    uploadInternetHospitalLicense(file) {
      this.uploadFile(file, 'internetHospitalLicense')
    },

    // 上传营业执照
    uploadBusinessLicense(file) {
      this.uploadFile(file, 'businessLicense')
    },

    // 上传经营许可证
    uploadManagementLicense(file) {
      this.uploadFile(file, 'managementLicense')
    },

    // 上传文件
    uploadFile(file, key) {
      let formData = new FormData()
      formData.append('image', file.file)
      Service.uploadImage(formData)
        .then((res) => {
          this.model[key] = res.data.filePath
          Peace.util.success(res.msg)
        })
        .finally(() => {})
    },

    submit() {
      this.validateForm().then(() => {
        this.isLoading = true

        const params = Peace.util.deepClone(this.model)

        if (this.model.accountId) {
          Service.editOrganization(params)
            .then(() => {
              Peace.util.success('保存成功')
              this.$emit('close', { type: 'edit' })
              this.$emit('refresh')
              this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            })
        } else {
          Service.addOrganization(params)
            .then(() => {
              Peace.util.success('保存成功')
              this.$emit('close', { type: 'add' })
              this.$emit('refresh')
              this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            })
        }
      })
    },

    close() {
      this.$emit('close', {})
    },

    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    },

    resetForm(role) {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.model.province = ''
      this.model.city = ''
      this.model.district = ''
      this.model.address = ''
      this.model.latitude = ''
      this.model.longitude = ''

      this.model.medicalStructureLicense = '' // 医疗机构执业许可证
      this.model.internetHospitalLicense = '' // 互联网医院牌照

      if (role.toString() === '2' || role.toString() === '3') {
        this.model.hosTypeCode = ''
        this.model.hosChildCode = ''
        this.model.hosLevelCode = ''

        this.lock = false

        this.model.businessLicense = '' //  营业执照
        this.model.managementLicense = '' // 经营许可证
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input.is-disabled .el-input__inner {
  background-color: #f9f9f9;
  border-color: #dcdfe6;
  color: #666666;
}
::v-deep .el-form-item__error {
  padding-top: 4px;
}
::v-deep .el-form-item__label {
  padding-right: 4px;
}
.el-form-item__content {
  span {
    color: #9da4af;
  }
}

.el-form-item {
  margin-bottom: 16px;
  &.is-error {
    margin-bottom: 24px;
  }
}

.info {
  &-item {
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 24px;
    padding-right: 50px;
  }
  &-title {
    position: relative;
    padding-left: 14px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 500;
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
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid rgba(51, 51, 51, 0.2);
    cursor: pointer;
  }
}

.upload-icon {
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
}

.upload-img {
  width: 128px;
  height: 128px;
  display: block;
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
  color: #999999;
  line-height: 17px;
  text-align: center;
}

.info-btn {
  padding-top: 20px;
  text-align: right;
}
</style>
