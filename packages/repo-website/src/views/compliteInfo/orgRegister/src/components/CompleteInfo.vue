<template>
  <div class="form-info">

    <div class="content">
      <el-form :model="model"
               :rules="rules"
               ref="model"
               :label-width="role ==1 ? '210px':'150px'">
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
          <el-input v-model="model.hospitalName"
                    :minlength="1"
                    :maxlength="30"
                    placeholder="请输入机构登记名称"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码："
                      prop="socialCreditCode">
          <el-input v-model.trim="model.socialCreditCode"
                    :minlength="18"
                    :maxlength="18"
                    placeholder="请输入医疗机构统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="医疗机构执业许可证登记号："
                      v-if="role==1"
                      prop="licenseNumber">
          <el-input v-model.trim="model.licenseNumber"
                    :minlength="1"
                    :maxlength="30"
                    placeholder="请输入登记号"></el-input>
        </el-form-item>
        <el-form-item label="地址："
                      v-if="role!==1"
                      class="area"
                      required>
          <el-form-item prop="area_id">
            <region-selector :defaultArea="model.area_id"
                             :defaultCity="model.city_id"
                             :defaultProvince="model.province_id"
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
                      v-model="model.address"></el-input>
          </el-form-item>
        </el-form-item>
        <template v-if="role==1">
          <el-form-item label="医院类型："
                        class="sec">

            <el-form-item prop="hosTypeCode"
                          class="sec-item">

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
            <el-form-item prop="hosChildCode"
                          class="sec-item">

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
          </el-form-item>
          <el-form-item label="所属辖区："
                        v-show="model.address"
                        class="district"
                        required>
            <region-selector :defaultArea="model.area_id"
                             :defaultCity="model.city_id"
                             :defaultProvince="model.province_id"
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
                      v-model="model.address"></el-input>
          </el-form-item>
          <el-form-item label="医院等级："
                        prop="hosLevelCode">

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
        </template>
        <el-form-item label="资质证明：">
          <el-row class="flex">
            <el-form-item>
              <el-upload class="avatar-uploader"
                         action=""
                         :http-request="uploadBusinessLicenseImg"
                         :show-file-list="false"
                         :before-upload="beforeAvatarUpload">
                <img v-if="model.businessLicense||model.medicalStructureLicense"
                     :src="model.businessLicense||model.medicalStructureLicense"
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
                <img v-if="model.managementLicense||model.internetHospitalLicense"
                     :src="model.managementLicense||model.internetHospitalLicense"
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
          <el-row class="form-button">
            <el-button :disabled="isSend"
                       type="primary"
                       size="small"
                       @click="submit">提交</el-button>
            <el-button size="small"
                       @click="back">上一步</el-button>
          </el-row>
        </el-form-item>
      </el-form>

    </div>
    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="mapDialogVisible"
                 append-to-body
                 title="地图"
                 width="800px">
      <TMap :defaultDetail="defaultDetail"
            v-if="mapDialogVisible"
            @getAddressData="getAddressData"></TMap>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from '../../service'
import RegionSelector from './RegionSelector'
import TMap from './Map'
const DEFAULT_MODAL = {
  hospitalName: '',
  socialCreditCode: '',
  licenseNumber: '',
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
  hosTypeCode: '',
  hosChildCode: '',
  hosLevelCode: '',
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
      lock: false,
      model: {
        hospitalName: '',
        socialCreditCode: '',
        licenseNumber: '',
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
        hosTypeCode: '',
        hosChildCode: '',
        hosLevelCode: '',
        latitude: '',
        longitude: ''
      },
      source: {
        ENUM_HOSPITAL_LEVEL: [], //医院等级
        ENUM_HOS_TYPE: [], //医院类型
        ENUM_HOS_TYPE_CHILD: [] //医院类型子类
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
        hospitalValid: [
          {
            required: true,
            message: ' ',
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
        area_id: [{ required: true, message: '请选择省市区', trigger: 'change' }],
        address: [{ required: true, message: '请输入详情地址' }],
        hosLevelCode: [{ required: true, message: '请选择医院等级' }],
        medicalStructureLicense: [{ required: true, message: '请上传医疗机构执业许可证！' }]
      },
      data: {},
      uploadData: {}
    }
  },
  mounted() {
    this.model.role = this.role
  },

  async created() {
    this.getHosLevelList()
    this.getHosTypeList()
  },
  computed: {
    hosChildCodeDisable() {
      return Peace.validate.isEmpty(this.model.hosTypeCode)
    }
  },

  watch: {
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
    handleProvinceChange(val) {
      this.model.province_id = val
    },
    handleCityChange(val) {
      this.model.city_id = val
    },
    handleAreaChange(val) {
      this.model.area_id = val
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
          this.model.medicalStructureLicense = res.data.filePath
        } else {
          this.model.businessLicense = res.data.filePath
        }
        Peace.util.success(res.msg)
      })
    },
    uploadmanagementLicenseImg(data) {
      let formData = new FormData()
      formData.append('image', data.file)
      Service.uploadImage(formData).then((res) => {
        if (this.role == 1) {
          this.model.internetHospitalLicense = res.data.filePath
        } else {
          this.model.managementLicense = res.data.filePath
        }
        Peace.util.success(res.msg)
      })
    },
    back() {
      this.model = Object.assign({}, this.model, DEFAULT_MODAL)
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
        address: this.model.address
      }
      this.mapDialogVisible = true
    },
    // 获取格式化地址（子组件触发）
    getAddressData(param) {
      // console.log(param)
      this.defaultDetail = param
      const model = this.model
      this.model = Object.assign({}, model, param)
      this.mapDialogVisible = false
    },
    submit() {
      this.model.province = this.model.province_id
      this.model.city = this.model.city_id
      this.model.district = this.model.area_id
      if (this.role !== 1) {
        const { province, city, area } = this.$refs.regionSelector.getSelected()
        this.model.province = province
        this.model.city = city
        this.model.district = area
      }

      this.$refs.model.validate((valid) => {
        if (valid) {
          const params = Peace.util.deepClone(this.model)
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
    .el-form-item {
      &.sec-item {
        flex: 1;
        margin-right: 8px;
        margin-bottom: 0;
        &:last-child {
          margin-right: 0;
        }
      }
      &.area {
        .el-form-item {
          &:first-child {
            margin-bottom: 24px;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .el-select {
      width: 100%;
    }
    ::v-deep .el-form-item__label {
      margin-bottom: 0;
    }
    .sec {
      ::v-deep .el-form-item__content {
        display: flex;
      }
    }

    .flex {
      display: flex;
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
  .form-button {
    display: flex;
    align-items: center;
    margin-top: 40px;
  }
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