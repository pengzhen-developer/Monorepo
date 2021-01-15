<template>
  <div>
    <el-form v-if="!editVisible"
             class="base-info"
             label-width="90px"
             label-suffix>
      <div class="edit-btn"
           v-if="!editVisible"
           @click="editOrg"><i class="el-icon-edit"></i></div>
      <div class="info-list">
        <div class="info-item">
          <div class="info-title">机构信息</div>
          <div class="info-content">
            <el-form-item label="机构类型">
              <span>{{ data.role | getEnumLabel(CONSTANT.ENUM_ORGANIZATION_TYPE) }}</span>
            </el-form-item>
            <el-form-item label="机构名称">
              <span>{{ data.hospitalName }}</span>
            </el-form-item>
            <el-form-item label="统一社会信用代码"
                          label-width="150px">
              <span>{{ data.socialCreditCode }}</span>
            </el-form-item>
            <el-form-item v-if="data.hospitalLabel || data.hospitalTypeLabel"
                          label="医院属性">
              <span>{{ data.hospitalLabel | getEnumLabel(CONSTANT.ENUM_HOSPITAL_LABEL) }} {{ data.hospitalTypeLabel | getEnumLabel(CONSTANT.ENUM_HOSPITAL_TYPE_LABEL) }}</span>
            </el-form-item>
            <el-form-item label="详细地址">
              <span>{{ data.provinceName }}{{ data.cityName }}{{ data.areaName }}{{ data.address }}</span>
            </el-form-item>
            <el-form-item v-if="data.hospitalLevel"
                          label="医院等级">
              <span>{{ data.hospitalLevel | getEnumLabel(CONSTANT.ENUM_HOSPITAL_LEVEL) }}</span>
            </el-form-item>
            <el-form-item v-if="imgList.length > 0"
                          label="资质证明">
              <span>
                <el-image v-if="data.medicalStructureLicense"
                          class="info-img"
                          fit="contain"
                          :src="data.medicalStructureLicense"
                          :preview-src-list="imgList">
                  <div slot="error"
                       class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <el-image v-if="data.internetHospitalLicense"
                          class="info-img"
                          fit="contain"
                          :src="data.internetHospitalLicense"
                          :preview-src-list="imgList">
                  <div slot="error"
                       class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <el-image v-if="data.businessLicense"
                          class="info-img"
                          fit="contain"
                          :src="data.businessLicense"
                          :preview-src-list="imgList">
                  <div slot="error"
                       class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <el-image v-if="data.managementLicense"
                          class="info-img"
                          fit="contain"
                          :src="data.managementLicense"
                          :preview-src-list="imgList">
                  <div slot="error"
                       class="image-slot">
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
            <el-form-item label="联系人">
              <span>{{ data.linkman }}</span>
            </el-form-item>
            <el-form-item label="手机号码">
              <span>{{ data.tel }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ data.email }}</span>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>

    <OrganizationModel v-if="editVisible"
                       ref="editOrg"
                       v-on:close="close"
                       v-on:refresh="refresh"></OrganizationModel>
  </div>
</template>

<script>
import OrganizationModel from './OrganizationModel'

import CONSTANT from '../constant'
//
import Service from '../service'

export default {
  components: {
    OrganizationModel
  },

  filters: {
    getEnumLabel: function (value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  data() {
    return {
      CONSTANT,

      isLoading: false,
      id: '',
      data: {},

      editVisible: false
    }
  },

  computed: {
    imgList() {
      let imgList = []
      if (this.data.medicalStructureLicense) {
        imgList.push(this.data.medicalStructureLicense)
      }

      if (this.data.internetHospitalLicense) {
        imgList.push(this.data.internetHospitalLicense)
      }

      if (this.data.businessLicense) {
        imgList.push(this.data.businessLicense)
      }

      if (this.data.managementLicense) {
        imgList.push(this.data.managementLicense)
      }

      return imgList
    }
  },

  methods: {
    init(id) {
      this.id = id || 0
      this.$nextTick(() => {
        Service.getOrganizationInfo({ accountId: this.id }).then((res) => {
          this.data = res.data
        })
      })
    },
    editOrg() {
      this.editVisible = true
      this.$nextTick(() => {
        this.$refs.editOrg.init(this.data.accountId)
      })
    },
    close() {
      this.init(this.data.accountId)
      this.editVisible = false
    },
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
.base-info {
  position: relative;
  padding: 20px;
  background-color: #f9f9f9;
  .edit-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(48, 153, 166, 0.1);
    cursor: pointer;
    .el-icon-edit {
      font-size: 18px;
      color: rgba(48, 153, 166, 1);
      z-index: 1;
    }
  }
}

::v-deep .base-info .el-form-item__label {
  position: relative;
  padding-right: 30px;
  color: #333333;
  text-align: justify;
  text-align-last: justify;
  &::after {
    content: '：';
    position: absolute;
    top: 0;
    right: 18px;
  }
}

.base-info .el-form-item__content {
  span {
    color: #666666;
  }
}

.base-info .el-form-item {
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

.base-info .info {
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

::v-deep .base-info .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
}
</style>
