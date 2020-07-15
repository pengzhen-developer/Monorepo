<template>
  <div class="form-info">

    <div class="content">
      <el-form :model="modal"
               :rules="rules"
               ref="modal"
               label-width="150px"
               class="ruleForm">
        <el-form-item label="机构类型："
                      prop="roleName">
          <el-input v-model="roleName"
                    :minlength="1"
                    :maxlength="30"
                    disabled
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="机构名称："
                      prop="hospitalName">
          <el-input v-model="modal.hospitalName"
                    :minlength="1"
                    :maxlength="30"
                    placeholder="请输入机构登记名称"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码："
                      prop="socialCreditCode">
          <el-input v-model.trim="modal.socialCreditCode"
                    :minlength="18"
                    :maxlength="18"
                    placeholder="请输入医疗机构统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="地址："
                      v-if="role!==1"
                      class="area"
                      required>
          <el-form-item prop="area_id">
            <region-selector :defaultArea="modal.area_id"
                             :defaultCity="modal.city_id"
                             :defaultProvince="modal.province_id"
                             @provinceChange="handleProvinceChange"
                             @cityChange="handleCityChange"
                             @areaChange="handleAreaChange"
                             :defaultText="false"
                             :disabled="lock"
                             :selected="false"
                             ref="regionSelector"></region-selector>
          </el-form-item>
          <el-form-item prop="address">
            <el-input placeholder="请输入详情地址"
                      v-model="modal.address"></el-input>
          </el-form-item>
        </el-form-item>
        <template v-if="role==1">
          <el-form-item label="医院属性："
                        class="sec"
                        prop="hospitalValid">

            <el-form-item prop="hospitalLabel"
                          class="sec-item">
              <el-select v-model="modal.hospitalLabel">
                <el-option :key="item.label"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in hospitalLabel"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="hospitalTypeLabel"
                          class="sec-item">
              <el-select v-model="modal.hospitalTypeLabel">
                <el-option :key="item.label"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in hospitalTypeLabel"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="所属辖区："
                        v-show="modal.address"
                        class="district"
                        required>
            <region-selector :defaultArea="modal.area_id"
                             :defaultCity="modal.city_id"
                             :defaultProvince="modal.province_id"
                             :defaultText="false"
                             :disabled="lock"
                             :selected="false"
                             class="region"
                             ref="regionSelector"></region-selector>
          </el-form-item>
          <el-form-item label="详细地址："
                        prop="address">
            <el-input @click.native="openMapDialogVisible"
                      @focus="openMapDialogVisible"
                      readonly
                      placeholder="请输入医院详细地址"
                      suffix-icon="el-icon-location"
                      v-model="modal.address"></el-input>
          </el-form-item>
          <el-form-item label="医院等级："
                        prop="hospitalLevel">
            <el-select v-model="modal.hospitalLevel"
                       placeholder="请选择医院等级">
              <el-option :key="'lavel_' + item.label"
                         :label="item.label"
                         :value="item.value"
                         v-for="item in hospitalLevel"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item label="资质证明：">
          <el-row class="flex">
            <el-form-item>
              <el-upload class="avatar-uploader"
                         action=""
                         :http-request="uploadBusinessLicenseImg"
                         :show-file-list="false"
                         :before-upload="beforeAvatarUpload">
                <img v-if="modal.businessLicense||modal.medicalStructureLicense"
                     :src="modal.businessLicense||modal.medicalStructureLicense"
                     class="avatar">
                <img v-else
                     :src='require("../assets/images/add.png")'>
              </el-upload>
              <span class="upload-name">{{role==1?'医疗机构执业许可证':'营业执照'}}</span>
            </el-form-item>
            <el-form-item v-if="role!==3">
              <el-upload class="avatar-uploader"
                         action=""
                         :http-request="uploadmanagementLicenseImg"
                         :show-file-list="false"
                         :before-upload="beforeAvatarUpload">
                <img v-if="modal.managementLicense||modal.internetHospitalLicense"
                     :src="modal.managementLicense||modal.internetHospitalLicense"
                     class="avatar">
                <img v-else
                     :src='require("../assets/images/add.png")'>
              </el-upload>
              <div class="upload-name">{{role==1?' 互联网医院牌照':'经营许可证'}}</div>
              <div class="upload-tip"
                   v-if='role==1'>(互联网医院需补充)</div>
            </el-form-item>
          </el-row>
          <el-row class="upload-tip"
                  style="margin-top:10px;">支持jpg 、jpeg 、bmp 、gif 、png格式图片，大小不超过2M</el-row>
        </el-form-item>
        <el-form-item label="">
          <el-row class="form-botton">
            <el-button size="small"
                       @click="back">上一步</el-button>
            <el-button :disabled="isSend"
                       size="small"
                       @click="submit">提交</el-button>
          </el-row>
        </el-form-item>
      </el-form>

    </div>
    <el-dialog :close-on-click-modal="false"
               :close-on-press-escape="false"
               :visible.sync="mapDialogVisible"
               append-to-body
               title="地图"
               width="800px">
      <TMap :defaultDetail="defaultDetail"
            v-if="mapDialogVisible"
            @getAddressData="getAddressData"></TMap>
    </el-dialog>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from '../../service'
import Constant from '../../constant'
import RegionSelector from './RegionSelector'
import TMap from './Map'
const DEFAULT_MODAL = {
  hospitalName: '',
  socialCreditCode: '',
  medicalStructureLicense: '',
  businessLicense: '',
  internetHospitalLicense: '',
  managementLicense: '',
  role: '',
  province: '',
  city: '',
  district: '',
  province_id: '',
  city_id: '',
  area_id: '',
  address: '',
  totalAddree: '',
  hospitalLabel: '',
  hospitalTypeLabel: '',
  hospitalLevel: '',
  latitude: '',
  longitude: ''
}
export default {
  components: { TMap, RegionSelector },
  props: {
    role: {
      type: Number,
      default: 1
    },
    roleName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isSend: false,
      mapDialogVisible: false,
      hospitalLabel: Constant.HospitalLabel,
      hospitalTypeLabel: Constant.HospitalTypeLabel,
      hospitalLevel: Constant.HospitalLevel,
      lock: false,
      modal: {
        hospitalName: '',
        socialCreditCode: '',
        medicalStructureLicense: '',
        businessLicense: '',
        internetHospitalLicense: '',
        managementLicense: '',
        role: '',
        province: '',
        city: '',
        district: '',
        province_id: '',
        city_id: '',
        area_id: '',
        address: '',
        totalAddree: '',
        hospitalLabel: '',
        hospitalTypeLabel: '',
        hospitalLevel: '',
        latitude: '',
        longitude: ''
      },

      defaultDetail: {
        province: '',
        city: '',
        area: '',
        address: ''
      },
      rules: {
        hospitalName: [
          { required: true, message: '请输入机构登记名称', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              if (value.length > 30) {
                cb(new Error('请输入不大于30字的医院名称'))
              } else if (value.length == 0) {
                cb(new Error('请输入机构登记名称'))
              }
              cb()
            },
            trigger: 'blur'
          }
        ],
        socialCreditCode: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },

          {
            validator: (rule, value, cb) => {
              const codeRule = /^[0-9a-zA-Z]{18}$/

              if (!codeRule.test(value)) {
                cb(new Error('信用代码仅支持输入18位数字+字母'))
              }

              cb()
            },
            trigger: 'blur'
          }
        ],
        hospitalValid: [
          {
            required: true,
            message: ' ',
            trigger: 'blur'
          }
        ],
        hospitalLabel: [
          {
            required: true,
            message: '请选择医院属性',
            trigger: 'change'
          }
        ],
        hospitalTypeLabel: [
          {
            required: true,
            message: '请选择医院性质',
            trigger: 'change'
          },
          {
            validator: (rule, value, cb) => {
              if (value.length == 0) {
                cb(new Error('请选择医院性质'))
              }
              cb()
            },
            trigger: 'blur'
          }
        ],
        area_id: [{ required: true, message: '请选择省市区', trigger: 'change' }],
        address: [{ required: true, message: '请输入详情地址' }],
        hospitalLevel: [{ required: true, message: '请选择医院等级' }],
        medicalStructureLicense: [{ required: true, message: '请上传医疗机构执业许可证！' }]
      },
      data: {},
      uploadData: {}
    }
  },
  mounted() {
    this.modal.role = this.role
  },
  watch: {
    'modal.hospitalLabel'() {
      this.modal.hospitalValid = this.modal.hospitalLabel + this.modal.hospitalTypeLabel
    },
    'modal.hospitalTypeLabel'() {
      this.modal.hospitalValid = this.modal.hospitalLabel + this.modal.hospitalTypeLabel
    }
  },

  methods: {
    handleProvinceChange(val) {
      this.modal.province_id = val
    },
    handleCityChange(val) {
      this.modal.city_id = val
    },
    handleAreaChange(val) {
      this.modal.area_id = val
    },
    beforeAvatarUpload(file) {
      const uploadType = 'image/jpg,image/jpeg,image/bmp,,image/gif,,image/png'
      const isAccept = uploadType.indexOf(file.type) != -1 ? true : false
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isAccept) {
        this.$message.error('支持jpg 、jpeg 、bmp 、gif 、png格式图片!')
      }
      if (!isLt2M) {
        this.$message.error('图片大小不超过2M!')
      }
      this.uploadData = {
        image: file
      }
      return isAccept && isLt2M
    },
    uploadBusinessLicenseImg(data) {
      let formData = new FormData()
      formData.append('image', data.file)
      Service.uploadImage(formData).then((res) => {
        if (this.role == 1) {
          this.modal.medicalStructureLicense = res.data.filePath
        } else {
          this.modal.businessLicense = res.data.filePath
        }
        Peace.util.success(res.msg)
      })
    },
    uploadmanagementLicenseImg(data) {
      let formData = new FormData()
      formData.append('image', data.file)
      Service.uploadImage(formData).then((res) => {
        if (this.role == 1) {
          this.modal.internetHospitalLicense = res.data.filePath
        } else {
          this.modal.managementLicense = res.data.filePath
        }
        Peace.util.success(res.msg)
      })
    },
    back() {
      this.modal = Object.assign({}, this.modal, DEFAULT_MODAL)
      this.$emit('back', true)
    },
    // 打开地图选点
    openMapDialogVisible() {
      this.lock = true
      const { province, city, area } = this.$refs.regionSelector.getSelected()
      this.defaultDetail = {
        province,
        city,
        area,
        address: this.modal.address
      }
      this.mapDialogVisible = true
    },
    // 获取格式化地址（子组件触发）
    getAddressData(param) {
      console.log(param)
      this.defaultDetail = param
      const modal = this.modal
      this.modal = Object.assign({}, modal, param)
      this.mapDialogVisible = false
    },
    submit() {
      this.modal.province = this.modal.province_id
      this.modal.city = this.modal.city_id
      this.modal.district = this.modal.area_id
      if (this.role !== 1) {
        const { province, city, area } = this.$refs.regionSelector.getSelected()
        this.modal.province = province
        this.modal.city = city
        this.modal.district = area
      }

      this.$refs.modal.validate((valid) => {
        if (valid) {
          const params = Peace.util.deepClone(this.modal)
          if (this.isSend) {
            return
          }
          this.isSend = true
          Service.updateBaseInfo(params)
            .then(() => {
              this.$emit('updateInfo', true)
            })
            .finally(() => {
              setTimeout(() => {
                this.isSend = false
              }, 500)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-info {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
    .ruleForm {
      > .el-form-item {
        margin-bottom: 16px;
      }
    }
    .el-form-item {
      &.sec-item {
        flex: 1;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
      &.area {
        .el-form-item {
          &:first-child {
            margin-bottom: 16px;
          }
        }
      }
    }
    .el-select {
      width: 100%;
    }
    ::v-deep .el-input__inner {
      line-height: 32px;
      height: 32px;
    }
    ::v-deep .el-form-item__label {
      color: #000;
      font-size: 14px;
      text-align: right;
    }
    .sec {
      ::v-deep .el-form-item__content {
        display: flex;
      }
    }

    .flex {
      display: flex;
      padding-top: 5px;
      .el-form-item {
        margin-bottom: 0;
        width: 50%;
      }
    }
    .avatar-uploader {
      width: 130px;
      height: 130px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(238, 238, 238, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      .avatar {
        width: 100%;
        height: 100%;
      }
      img {
        width: 54px;
        height: 54px;
        display: block;
      }
    }
  }
  .form-botton {
    display: flex;
    align-items: center;
    margin-top: 50px;
    .el-button {
      width: 120px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #fff;
      background-color: $--color-primary;
      border-radius: 4px;
      height: 32px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      &:first-child {
        background: #fff;
        color: #999;
        border: 1px solid rgba(204, 204, 204, 1);
        margin-right: 40px;
      }
    }
  }
}
.el-col {
  display: flex;
  flex-direction: column;
  width: 160px;
}
.upload-name {
  color: #999;
  line-height: 1.4;
  margin-top: 10px;
}
.upload-tip {
  color: #999;
  font-size: 12px;
  line-height: 1.2;
  margin-top: 5px;
}
</style>