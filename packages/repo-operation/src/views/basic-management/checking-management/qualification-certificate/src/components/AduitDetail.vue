<template>
  <div>
    <PeaceDialog width="700px"
                 v-bind:visible.sync="visible"
                 v-bind:title="title">
      <el-form v-if="data.checkStatus === 2"
               space-md
               ref="form"
               label-width="auto"
               label-suffix="："
               v-bind:model="model"
               v-bind:rules="rules"
               v-loading="getLoading">
        <!-- 待审核 -->
        <div class="info-list">
          <div class="info-item">
            <div class="info-title">机构信息</div>
            <div class="info-content">
              <el-form-item class="inline-half"
                            label="机构名称">
                <span>{{ detail.hosInfo.hospitalName || '——' }}</span>
              </el-form-item>
              <el-form-item class="inline-half"
                            label="机构类型">
                <span>{{ detail.hosInfo.role }}</span>
              </el-form-item>
              <el-form-item v-if="detail.hosInfo.hosTypeName || detail.hosInfo.hosChildName"
                            class="inline-half"
                            label="医院类型">
                <span>{{ detail.hosInfo.hosTypeName }} {{ detail.hosInfo.hosChildName }}</span>
              </el-form-item>
              <el-form-item v-if="detail.hosInfo.hosLevelName"
                            class="inline-half"
                            label="医院等级">
                <span>{{ detail.hosInfo.hosLevelName }}</span>
              </el-form-item>
              <el-form-item label="统一社会信用代码">
                <span>{{ detail.hosInfo.socialCreditCode }}</span>
              </el-form-item>
              <el-form-item v-if="detail.hosInfo.licenseNumber"
                            label="医疗机构执业许可证登记号">
                <span>{{ detail.hosInfo.licenseNumber }}</span>
              </el-form-item>
              <el-form-item label="详细地址">
                <span>{{ detail.hosInfo.hospitalAddres }}</span>
              </el-form-item>
              <el-form-item label="资质证明"
                            v-if="imgList.length > 0">
                <span>
                  <el-image v-if="detail.hosInfo.license"
                            class="info-img"
                            fit="contain"
                            :src="detail.hosInfo.license"
                            :preview-src-list="imgList">
                    <div slot="error"
                         class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image v-if="detail.hosInfo.certificate"
                            class="info-img"
                            fit="contain"
                            :src="detail.hosInfo.certificate"
                            :preview-src-list="imgList">
                    <div slot="error"
                         class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image v-if="detail.hosInfo.structureLicense"
                            class="info-img"
                            fit="contain"
                            :src="detail.hosInfo.structureLicense"
                            :preview-src-list="imgList">
                    <div slot="error"
                         class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image v-if="detail.hosInfo.hospitalLicense"
                            class="info-img"
                            fit="contain"
                            :src="detail.hosInfo.hospitalLicense"
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
              <el-form-item class="inline-half"
                            label="手机号码">
                <span>{{ detail.accountInfo.tel }}</span>
              </el-form-item>
              <el-form-item class="inline-half"
                            label="联系人">
                <span>{{ detail.accountInfo.linkman }}</span>
              </el-form-item>
              <el-form-item class="inline-half"
                            label="邮箱">
                <span>{{ detail.accountInfo.email }}</span>
              </el-form-item>
            </div>
          </div>

          <div class="info-item">
            <div class="info-title">审核信息</div>
            <div class="info-content">
              <el-form-item label="审核结果"
                            prop="checkStatus">
                <el-radio-group v-model="model.checkStatus">
                  <el-radio :label="3">通过</el-radio>
                  <el-radio :label="4">驳回</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="备注"
                            prop="reasonsFailure"
                            v-if="model.checkStatus === 4">
                <el-input type="textarea"
                          v-bind:rows="4"
                          v-model="model.reasonsFailure"
                          maxlength="200"
                          show-word-limit></el-input>
              </el-form-item>

            </div>
          </div>
        </div>
      </el-form>

      <div v-if="data.checkStatus === 2"
           slot="footer">
        <el-button v-on:click="visible = false">取 消</el-button>
        <el-button type="primary"
                   v-bind:loading="isLoading"
                   v-on:click="doCheck">确 定</el-button>
      </div>

      <el-form v-if="data.checkStatus !== 2"
               space-md
               label-width="auto"
               label-suffix="："
               v-loading="getLoading">
        <div class="info-list">
          <div class="info-item">
            <div class="info-title">机构信息</div>
            <div class="info-content">
              <el-form-item class="inline-half"
                            label="机构名称">
                <span>{{ detail.hosInfo.hospitalName }}</span>
              </el-form-item>
              <el-form-item class="inline-half"
                            label="机构类型">
                <span>{{ detail.hosInfo.role }}</span>
              </el-form-item>
              <el-form-item v-if="detail.hosInfo.hosTypeName || detail.hosInfo.hosChildName"
                            class="inline-half"
                            label="医院类型">
                <span>{{ detail.hosInfo.hosTypeName }} {{ detail.hosInfo.hosChildName }}</span>
              </el-form-item>
              <el-form-item v-if="detail.hosInfo.hosLevelName"
                            class="inline-half"
                            label="医院等级">
                <span>{{ detail.hosInfo.hosLevelName }}</span>
              </el-form-item>
              <el-form-item label="统一社会信用代码">
                <span>{{ detail.hosInfo.socialCreditCode }}</span>
              </el-form-item>
              <el-form-item v-if="detail.hosInfo.licenseNumber"
                            label="医疗机构执业许可证登记号">
                <span>{{ detail.hosInfo.licenseNumber }}</span>
              </el-form-item>
              <el-form-item label="详细地址">
                <span>{{ detail.hosInfo.hospitalAddres }}</span>
              </el-form-item>
              <el-form-item label="资质证明"
                            v-if="imgList.length > 0">
                <span>
                  <el-image v-if="detail.hosInfo.license"
                            class="info-img"
                            fit="contain"
                            :src="detail.hosInfo.license"
                            :preview-src-list="imgList">
                    <div slot="error"
                         class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image v-if="detail.hosInfo.certificate"
                            class="info-img"
                            fit="contain"
                            :src="detail.hosInfo.certificate"
                            :preview-src-list="imgList">
                    <div slot="error"
                         class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image v-if="detail.hosInfo.structureLicense"
                            class="info-img"
                            fit="contain"
                            :src="detail.hosInfo.structureLicense"
                            :preview-src-list="imgList">
                    <div slot="error"
                         class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image v-if="detail.hosInfo.hospitalLicense"
                            class="info-img"
                            fit="contain"
                            :src="detail.hosInfo.hospitalLicense"
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
              <el-form-item class="inline-half"
                            label="联系人">
                <span>{{ detail.accountInfo.linkman }}</span>
              </el-form-item>
              <el-form-item class="inline-half"
                            label="手机号码">
                <span>{{ detail.accountInfo.tel }}</span>
              </el-form-item>
              <el-form-item class="inline-half"
                            label="邮箱">
                <span>{{ detail.accountInfo.email }}</span>
              </el-form-item>
            </div>
          </div>

          <div class="info-item">
            <div class="info-title">审核信息</div>
            <div class="info-content">
              <el-form-item class="inline-half"
                            label="审核结果">
                <span>{{ detail.checkInfo.result }}</span>
              </el-form-item>
              <el-form-item class="inline-half"
                            :label="detail.checkInfo.reasonsFailure ? '备注':''">
                <span>{{ detail.checkInfo.reasonsFailure }}</span>
              </el-form-item>
              <el-form-item class="inline-half"
                            label="申请时间">
                <span>{{ detail.checkInfo.applyTime }}</span>
              </el-form-item>
              <el-form-item class="inline-half"
                            label="审核时间">
                <span>{{ detail.checkInfo.checkTime }}</span>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </PeaceDialog>
  </div>
</template>

<script>
import CONSTANT from './../constant'

import Service from './../service'

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },

    title: String,

    data: Object
  },

  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  data() {
    let checkStatusEmpty = (rule, value, callback) => {
      if (Peace.validate.isEmpty(value)) {
        return callback(new Error())
      }
      callback()
    }
    let checkReasonEmpty = (rule, value, callback) => {
      if (this.model.checkStatus === 4) {
        if (Peace.validate.isEmpty(value)) {
          return callback(new Error())
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      CONSTANT,

      getLoading: true,

      isLoading: false,
      visible: this.value,

      detail: {
        hosInfo: {},
        accountInfo: {},
        checkInfo: {}
      },

      model: {
        checkStatus: '',
        reasonsFailure: ''
      },

      rules: {
        checkStatus: [
          {
            validator: checkStatusEmpty,
            message: '请选择审核结果',
            trigger: 'change'
          }
        ],
        reasonsFailure: [
          {
            validator: checkReasonEmpty,
            message: '请填写驳回原因',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    imgList() {
      let imgList = []
      if (this.detail.hosInfo.license) {
        imgList.push(this.detail.hosInfo.license)
      }

      if (this.detail.hosInfo.certificate) {
        imgList.push(this.detail.hosInfo.certificate)
      }

      if (this.detail.hosInfo.structureLicense) {
        imgList.push(this.detail.hosInfo.structureLicense)
      }

      if (this.detail.hosInfo.hospitalLicense) {
        imgList.push(this.detail.hosInfo.hospitalLicense)
      }

      return imgList
    }
  },

  watch: {
    value(value) {
      this.visible = value
    },

    visible(value) {
      this.$emit('input', value)

      if (value) {
        this.getLoading = true
        this.getCertificationDetail()
      }

      this.$nextTick(() => {
        if (this.data.checkStatus === 2) {
          this.$refs.form.resetFields()
        }
      })
    }
  },

  methods: {
    getCertificationDetail() {
      const params = {
        id: this.data.id
      }

      Service.getCertificationDetail(params)
        .then((res) => {
          this.detail = res.data
        })
        .finally(() => {
          this.getLoading = false
        })
    },
    doCheck() {
      this.validateForm().then(() => {
        this.isLoading = true

        const params = Peace.util.deepClone(this.model)
        params.accountId = this.data.id

        Service.doCheck(params)
          .then((res) => {
            Peace.util.success(res.msg)
            this.visible = false
            this.$emit('refresh')
            this.isLoading = false
          })
          .catch(() => {
            this.isLoading = false
          })
      })
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
    border-radius: 4px;
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

::v-deep .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
}
</style>
