<template>
  <div>
    <el-dialog width="700px" v-bind:visible.sync="visible" title="基本信息">
      <el-form label-width="90px" label-suffix>
        <div class="info-list">
          <div class="info-item">
            <div class="info-title">机构信息</div>
            <div class="info-content">
              <el-form-item class="inline-half" label="机构名称">
                <span>{{ data.hospitalName }}</span>
              </el-form-item>
              <el-form-item class="inline-half" label="机构类型">
                <span>{{ data.role }}</span>
              </el-form-item>
              <el-form-item class="inline-half" label="医院属性">
                <span>{{ data.hospitalLabel }} {{ data.hospitalTypeLabel }}</span>
              </el-form-item>
              <el-form-item class="inline-half" label="医院等级">
                <span>{{ data.hospitalLevel }}</span>
              </el-form-item>
              <el-form-item label="统一社会信用代码" label-width="150px">
                <span>{{ data.socialCreditCode }}</span>
              </el-form-item>
              <el-form-item label="详细地址">
                <span>{{ data.addressStr }}</span>
              </el-form-item>
              <el-form-item label="资质证明">
                <span>
                  <el-image
                    v-if="data.medicalStructureLicense"
                    class="info-img"
                    fit="contain"
                    :src="data.medicalStructureLicense"
                    :preview-src-list="imgList"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image
                    v-if="data.internetHospitalLicense"
                    class="info-img"
                    fit="contain"
                    :src="data.internetHospitalLicense"
                    :preview-src-list="imgList"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image
                    v-if="data.businessLicense"
                    class="info-img"
                    fit="contain"
                    :src="data.businessLicense"
                    :preview-src-list="imgList"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image
                    v-if="data.managementLicense"
                    class="info-img"
                    fit="contain"
                    :src="data.managementLicense"
                    :preview-src-list="imgList"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </span>
              </el-form-item>
            </div>
          </div>

          <div class="info-item">
            <div class="info-title">账号信息</div>
            <div class="info-content">
              <el-form-item class="inline-half" label="用户名">
                <span>{{ data.username }}</span>
              </el-form-item>
              <el-form-item class="inline-half" label="联系人">
                <span>{{ data.linkman }}</span>
              </el-form-item>
              <el-form-item class="inline-half" label="手机号码">
                <span>{{ data.hideTel }}</span>
              </el-form-item>
              <el-form-item class="inline-half" label="邮箱">
                <span>{{ data.hideEmail }}</span>
              </el-form-item>
            </div>
          </div>

          <!-- <div class="info-item">
            <div class="info-title">审核信息</div>
            <div class="info-content">
              <el-form-item class="inline-half" label="审核结果">
                <span>{{ data.checkStatus }}</span>
              </el-form-item>
              <el-form-item class="inline-half" :label="data.reasonsFailure ? '备注':''">
                <span>{{ data.reasonsFailure }}</span>
              </el-form-item>
              <el-form-item class="inline-half" label="申请时间">
                <span>{{ data.applyTime }}</span>
              </el-form-item>
              <el-form-item class="inline-half" label="审核时间">
                <span>{{ data.checkTime }}</span>
              </el-form-item>
            </div>
          </div>-->
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },

    data: Object
  },

  filters: {},

  data() {
    return {
      isLoading: false,
      visible: this.value
    };
  },

  computed: {
    imgList() {
      let imgList = [];
      if (this.data.medicalStructureLicense) {
        imgList.push(this.data.medicalStructureLicense);
      }

      if (this.data.internetHospitalLicense) {
        imgList.push(this.data.internetHospitalLicense);
      }

      if (this.data.businessLicense) {
        imgList.push(this.data.businessLicense);
      }

      if (this.data.managementLicense) {
        imgList.push(this.data.managementLicense);
      }

      return imgList;
    }
  },

  watch: {
    value(value) {
      this.visible = value;
    },

    visible(value) {
      this.$emit("input", value);
    }
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  position: relative;
  padding-right: 30px;
  text-align: justify;
  text-align-last: justify;
  &::after {
    content: "：";
    position: absolute;
    top: 0;
    right: 18px;
  }
}

.el-form-item__content {
  span {
    color: #9da4af;
  }
}

.el-form-item {
  margin-bottom: 8px;
  &.inline-half {
    display: inline-block;
    vertical-align: middle;
    width: 50%;
  }

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

::v-deep .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
}
</style>
