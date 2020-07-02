<template>
  <div>
    <el-dialog width="520px" v-bind:visible.sync="visible" title="新增机构">
      <el-form
        ref="form"
        label-position="right"
        label-width="150px"
        label-suffix="："
        v-bind:model="model"
        v-bind:rules="rules"
      >
        <div class="info-list">
          <div class="info-item">
            <div class="info-title">机构信息</div>
            <div class="info-content">
              <el-form-item label="机构类型" prop="role">
                <el-select v-model="model.role" placeholder="请选择" style="width: 100%;">
                  <el-option
                    v-for="(value, label) in CONSTANT.ENUM_ORGANIZATION_TYPE"
                    v-bind:key="value"
                    v-bind:label="label"
                    v-bind:value="value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构名称" prop="hospitalName">
                <el-input
                  v-model.trim="model.hospitalName"
                  placeholder="请输入"
                  maxlength="30"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码" prop="socialCreditCode">
                <el-input
                  v-model.trim="model.socialCreditCode"
                  placeholder="请输入"
                  maxlength="18"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                label="医院属性"
                class="is-required"
                style="margin-bottom: 0;"
                v-if="model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.医疗机构 || model.role === ''"
              >
                <div class="inline-form">
                  <el-form-item class="inline-item" label-width="0px" prop="hospitalLabel">
                    <el-select v-model="model.hospitalLabel" placeholder="请选择" style="width: 100%;">
                      <el-option
                        v-for="(value, label) in CONSTANT.ENUM_HOSPITAL_LABEL"
                        v-bind:key="value"
                        v-bind:label="label"
                        v-bind:value="value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="inline-item" label-width="0px" prop="hospitalTypeLabel">
                    <el-select
                      v-model="model.hospitalTypeLabel"
                      placeholder="请选择"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(value, label) in CONSTANT.ENUM_HOSPITAL_TYPE_LABEL"
                        v-bind:key="value"
                        v-bind:label="label"
                        v-bind:value="value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-form-item>
              <el-form-item label="详细地址" class="is-required" style="margin-bottom: 0;">
                <div class="inline-form" v-show="showRegion">
                  <el-form-item class="inline-item" label-width="0px" prop="district">
                    <region-selector
                      :defaultArea="model.district"
                      :defaultCity="model.city"
                      :defaultProvince="model.province"
                      :defaultText="false"
                      :disabled="lock"
                      @provinceChange="handleProvinceChange"
                      @cityChange="handleCityChange"
                      @areaChange="handleAreaChange"
                      ref="regionSelector"
                    ></region-selector>
                  </el-form-item>
                </div>
                <div class="inline-form">
                  <el-form-item class="inline-item" label-width="0px" prop="address">
                    <el-input
                      v-if="model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.医疗机构 || model.role === ''"
                      @click.native="openMapDialogVisible"
                      @focus="openMapDialogVisible"
                      readonly
                      suffix-icon="el-icon-location"
                      v-model="model.address"
                      placeholder="请输入详细地址"
                    ></el-input>
                    <el-input
                      v-if="model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.店配机构 || model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.仓配机构"
                      suffix-icon="el-icon-location"
                      v-model="model.address"
                      placeholder="请输入详细地址"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-form-item>
              <el-form-item
                label="医院等级"
                prop="hospitalLevel"
                v-if="model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.医疗机构 || model.role === ''"
              >
                <el-select v-model="model.hospitalLevel" placeholder="请选择" style="width: 100%;">
                  <el-option
                    v-for="(value, label) in CONSTANT.ENUM_HOSPITAL_LEVEL"
                    v-bind:key="value"
                    v-bind:label="label"
                    v-bind:value="value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资质证明">
                <div
                  class="upload-list"
                  v-if="model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.医疗机构 || model.role === ''"
                >
                  <div class="upload-item">
                    <el-upload
                      action
                      :http-request="uploadMedicalStructureLicense"
                      :show-file-list="false"
                      :before-upload="beforeUpload"
                    >
                      <img
                        v-if="model.medicalStructureLicense"
                        :src="model.medicalStructureLicense"
                        class="upload-img"
                      />
                      <i v-else class="el-icon-plus upload-icon"></i>
                    </el-upload>
                    <div class="upload-name">医疗机构执业许可证</div>
                    <!-- <div class="upload-txt"></div> -->
                  </div>
                  <div class="upload-item">
                    <el-upload
                      action
                      :http-request="uploadInternetHospitalLicense"
                      :show-file-list="false"
                      :before-upload="beforeUpload"
                    >
                      <img
                        v-if="model.internetHospitalLicense"
                        :src="model.internetHospitalLicense"
                        class="upload-img"
                      />
                      <i v-else class="el-icon-plus upload-icon"></i>
                    </el-upload>
                    <div class="upload-name">互联网医院牌照</div>
                    <!-- <div class="upload-txt">(选填,互联网医院需补充)</div> -->
                  </div>
                </div>

                <div class="upload-list" v-if="model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.店配机构">
                  <div class="upload-item">
                    <el-upload
                      action
                      :http-request="uploadBusinessLicense"
                      :show-file-list="false"
                      :before-upload="beforeUpload"
                    >
                      <img
                        v-if="model.businessLicense"
                        :src="model.businessLicense"
                        class="upload-img"
                      />
                      <i v-else class="el-icon-plus upload-icon"></i>
                    </el-upload>
                    <div class="upload-name">营业执照</div>
                  </div>
                  <div class="upload-item">
                    <el-upload
                      action
                      :http-request="uploadManagementLicense"
                      :show-file-list="false"
                      :before-upload="beforeUpload"
                    >
                      <img
                        v-if="model.managementLicense"
                        :src="model.managementLicense"
                        class="upload-img"
                      />
                      <i v-else class="el-icon-plus upload-icon"></i>
                    </el-upload>
                    <div class="upload-name">经营许可证</div>
                  </div>
                </div>

                <div class="upload-list" v-if="model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.仓配机构">
                  <div class="upload-item">
                    <el-upload
                      action
                      :http-request="uploadBusinessLicense"
                      :show-file-list="false"
                      :before-upload="beforeUpload"
                    >
                      <img
                        v-if="model.businessLicense"
                        :src="model.businessLicense"
                        class="upload-img"
                      />
                      <i v-else class="el-icon-plus upload-icon"></i>
                    </el-upload>
                    <div class="upload-name">营业执照</div>
                  </div>
                </div>

                <div
                  class="upload-txt"
                  style="margin-top: 10px;"
                >支持jpg 、jpeg 、bmp 、gif 、png格式图片，大小不超过2M</div>
              </el-form-item>
            </div>
          </div>

          <div class="info-item">
            <div class="info-title">账号信息</div>
            <div class="info-content">
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model.trim="model.username"
                  placeholder="4-30位字母、数字的组合"
                  minlength="4"
                  maxlength="30"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="linkman">
                <el-input v-model.trim="model.linkman" maxlength="10" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="tel">
                <el-input v-model.trim="model.tel" maxlength="11" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model.trim="model.email" placeholder="请输入"></el-input>
              </el-form-item>
              <div class="dialog-btn">
                <el-button v-on:click="visible = false">取 消</el-button>
                <el-button type="primary" v-bind:loading="isLoading" v-on:click="submit">确 定</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="mapDialogVisible"
      append-to-body
      title="地图"
      width="800px"
    >
      <TMap :defaultDetail="defaultDetail" @getAddressData="getAddressData"></TMap>
    </el-dialog>
  </div>
</template>

<script>
import CONSTANT from "../constant";
import Peace from "@src/library";
import Service from "../service";

import TMap from "./Map";
import RegionSelector from "./RegionSelector";

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    }
  },

  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find(key => ENUM[key] === value);
    }
  },

  components: {
    RegionSelector,
    TMap
  },

  data() {
    // 校验数字和字母
    let validateNumberCharacter = (rule, value, callback) => {
      let pattern = /^[a-zA-Z0-9]*$/;
      if (pattern.test(value)) {
        callback();
      } else {
        return callback(new Error());
      }
    };
    // 校验电话
    let validateTel = (rule, value, callback) => {
      if (Peace.validate.isMobile(value)) {
        callback();
      } else {
        return callback(new Error());
      }
    };
    // 校验email
    let validateEmail = (rule, value, callback) => {
      if (Peace.validate.isEmail(value)) {
        callback();
      } else {
        return callback(new Error());
      }
    };
    return {
      CONSTANT,

      isLoading: false,
      visible: this.value,

      mapDialogVisible: false,
      lock: false,
      defaultDetail: "",

      model: {
        role: "", // 机构类型
        hospitalName: "", // 机构名称
        socialCreditCode: "", // 统一社会信用代码
        hospitalLabel: "", // 医院属性
        hospitalTypeLabel: "", // 医院类型
        province: "", //  省
        city: "", //  市
        district: "", // 区
        address: "", // 地址
        latitude: "",
        longitude: "",
        hospitalLevel: "", // 医院等级
        medicalStructureLicense: "", // 医疗机构执业许可证
        internetHospitalLicense: "", // 互联网医院牌照
        businessLicense: "", //  营业执照
        managementLicense: "", // 经营许可证
        username: "", //  用户名
        linkman: "", // 联系人
        tel: "", // 电话号码
        email: "", // 邮箱
        password: "" // 密码
      },

      rules: {
        role: [
          {
            required: true,
            message: "请选择机构类型",
            trigger: "change"
          }
        ],
        hospitalName: [
          {
            required: true,
            message: "请填写机构名称",
            trigger: "blur"
          }
        ],
        socialCreditCode: [
          {
            required: true,
            message: "请填写统一社会信用代码",
            trigger: "blur"
          },
          {
            validator: validateNumberCharacter,
            message: "统一社会信用代码只能输入数字和字母",
            trigger: "blur"
          }
        ],
        hospitalLabel: [
          {
            required: true,
            message: "请选择医院属性",
            trigger: "change"
          }
        ],
        hospitalTypeLabel: [
          {
            required: true,
            message: "请选择医院类型",
            trigger: "change"
          }
        ],
        hospitalLevel: [
          {
            required: true,
            message: "请选择医院等级",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "change"
          }
        ],
        username: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          },
          {
            min: 4,
            max: 30,
            message: "用户名长度在 4 - 30 位",
            trigger: "blur"
          },
          {
            validator: validateNumberCharacter,
            message: "用户名只能输入数字和字母",
            trigger: "blur"
          }
        ],
        linkman: [
          {
            required: true,
            message: "请填写姓名",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请填写电话号码",
            trigger: "blur"
          },
          {
            validator: validateTel,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请填写邮箱",
            trigger: "blur"
          },
          {
            validator: validateEmail,
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ]
      }
    };
  },

  computed: {
    showRegion() {
      return (
        (this.model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.医疗机构 &&
          this.model.province &&
          this.model.city &&
          this.model.district) ||
        this.model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.店配机构 ||
        this.model.role === CONSTANT.ENUM_ORGANIZATION_TYPE.仓配机构
      );
    }
  },

  watch: {
    value(value) {
      this.visible = value;
    },

    visible(value) {
      this.$emit("input", value);

      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.model.medicalStructureLicense = ""; // 医疗机构执业许可证
        this.model.internetHospitalLicense = ""; // 互联网医院牌照
        this.model.businessLicense = ""; //  营业执照
        this.model.managementLicense = ""; // 经营许可证
      });
    },

    "model.role"(value) {
      switch (value) {
        case 1:
          this.model.province = "";
          this.model.city = "";
          this.model.district = "";
          this.model.address = "";
          this.model.latitude = "";
          this.model.longitude = "";

          this.model.businessLicense = "";
          this.model.managementLicense = "";
          break;
        case 2:
          this.model.hospitalLabel = "";
          this.model.hospitalTypeLabel = "";
          this.model.hospitalLevel = "";

          this.model.province = "";
          this.model.city = "";
          this.model.district = "";
          this.model.address = "";
          this.model.latitude = "";
          this.model.longitude = "";

          this.lock = false;

          this.model.medicalStructureLicense = ""; // 医疗机构执业许可证
          this.model.internetHospitalLicense = ""; // 互联网医院牌照
          this.model.businessLicense = ""; //  营业执照
          this.model.managementLicense = ""; // 经营许可证
          break;
        case 3:
          this.model.hospitalLabel = "";
          this.model.hospitalTypeLabel = "";
          this.model.hospitalLevel = "";

          this.model.province = "";
          this.model.city = "";
          this.model.district = "";
          this.model.address = "";
          this.model.latitude = "";
          this.model.longitude = "";

          this.lock = false;

          this.model.medicalStructureLicense = ""; // 医疗机构执业许可证
          this.model.internetHospitalLicense = ""; // 互联网医院牌照
          this.model.businessLicense = ""; //  营业执照
          this.model.managementLicense = ""; // 经营许可证
          break;
      }
    }
  },

  methods: {
    handleProvinceChange(val) {
      this.model.province = val;
    },
    handleCityChange(val) {
      this.model.city = val;
    },
    handleAreaChange(val) {
      this.model.district = val;
    },

    // 打开地图选点
    openMapDialogVisible() {
      this.lock = true;
      const { province, city, area } = this.$refs.regionSelector.getSelected();

      this.defaultDetail = {
        province,
        city,
        area,
        address: this.model.address,
        latitude: "",
        longitude: ""
      };

      this.mapDialogVisible = true;
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
      };

      this.model.province = param.province_id;
      this.model.city = param.city_id;
      this.model.district = param.area_id;
      this.model.address = param.address;
      this.model.latitude = param.latitude;
      this.model.longitude = param.longitude;

      this.mapDialogVisible = false;
    },

    // 校验上传文件
    beforeUpload(file) {
      let isJPG =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/bmp" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片支持jpg、jpeg、bmp、gif、png 格式");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过2M");
      }
      return isJPG && isLt2M;
    },

    // 上传医疗机构执业许可证
    uploadMedicalStructureLicense(file) {
      this.uploadFile(file, "medicalStructureLicense");
    },

    // 上传互联网医院牌照
    uploadInternetHospitalLicense(file) {
      this.uploadFile(file, "internetHospitalLicense");
    },

    // 上传营业执照
    uploadBusinessLicense(file) {
      this.uploadFile(file, "businessLicense");
    },

    // 上传经营许可证
    uploadManagementLicense(file) {
      this.uploadFile(file, "managementLicense");
    },

    // 上传文件
    uploadFile(file, key) {
      let formData = new FormData();
      formData.append("image", file.file);
      Service.uploadImage(formData)
        .then(res => {
          this.model[key] = res.data.filePath;
          Peace.util.success(res.msg);
        })
        .finally(() => {});
    },

    submit() {
      this.validateForm().then(() => {
        this.isLoading = true;

        const params = Peace.util.deepClone(this.model);

        Service.addOrganization(params)
          .then(res => {
            Peace.util.success(res.msg);
            this.visible = false;
            this.$emit("refresh");
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
          });
      });
    },

    validateForm() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
    &:last-child {
      border-bottom: none;
    }
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
      content: "";
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
    border: 1px solid #eeeeee;
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

.dialog-btn {
  padding-top: 30px;
  text-align: center;
  .el-button {
    width: 120px;
    & + .el-button {
      margin-left: 40px;
    }
  }
}
</style>
