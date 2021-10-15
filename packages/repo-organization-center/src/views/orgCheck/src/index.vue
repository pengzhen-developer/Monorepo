<template>
  <div v-loading="loading" class="layout-card">

    <empty v-if="isError" description="抱歉，请求错误请稍后再试">
      <el-button type="primary" v-on:click="back">返回</el-button>
    </empty>

    <div v-else>

      <div v-if="newInstitutionInfoAuditDetails.institutionInfoAuditVO">

        <div class="bg-white">

          <div class="q-pl-md q-pt-24">
            <el-button  v-on:click="back">返回上一页</el-button>
          </div>

          <div class="header">
            <div class="header-line q-mr-sm"></div>
            <span class="header-title">基本信息</span>
          </div>

          <div class="q-ma-md q-pb-md">

            <div class="row col q-mb-12">
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionName"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionName"
                         label="机构名称"/>
              <info-item :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionCode"
                         label="机构编码"/>
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.serviceLicenceNo"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.serviceLicenceNo"
                         label="执业许可证登记号"/>
            </div>

            <div class="row col q-mb-12">
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.socialNo"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.socialNo"
                         label="统一社会信用代码"/>
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionTypeName"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionTypeName"
                         label="机构类型"/>
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.hospitalTypeName"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.hospitalTypeName"
                         label="医院类型"/>
            </div>

            <div class="row col q-mb-12">
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.hospitalLevelName"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.hospitalLevelName"
                         label="医院等级"/>
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.fromTypeName"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.fromTypeName"
                         label="所有制形式"/>
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.servicerTypeName"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.servicerTypeName"
                         label="服务对象"/>
            </div>

            <div class="row col q-mb-12">
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionWayName"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionWayName"
                         label="机构性质"/>
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.relationTypeName"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.relationTypeName"
                         label="录属关系"/>
              <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.address"
                         :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.address"
                         label="地址"/>
            </div>

            <div class="row col q-mb-12" v-if="showNetHospitalInfo">
              <info-item :preValue="oldNetHospital"
                         :value="netHospital"
                         label="是否分院"/>
              <info-item :preValue="oldShareHosptial"
                         :value="shareHosptial"
                         label="是否互联网医院"/>
              <div class="col"></div>
            </div>

            <div class="row col q-mb-12" v-if="showHasShop">
              <info-item :preValue="oldHasShop"
                         :value="hasShop"
                         label="是否门店"/>
              <div class="col"></div>
              <div class="col"></div>
            </div>

            <image-item v-if="imageData" :preValue="preImageData" :value="imageData"/>

          </div>

        </div>

        <div class="bg-white">

          <div class="header">
            <div class="header-line q-mr-sm"></div>
            <span class="header-title">营运信息</span>
          </div>

          <div class="q-pa-md q-pb-md">

            <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionDescribe"
                       :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionDescribe"
                       class="q-mb-12"
                       label="机构简介"/>
            <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionWeb"
                       :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.institutionWeb"
                       class="q-mb-12"
                       label="机构官网"/>

            <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.tel"
                       :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.tel"
                       class="q-mb-12"
                       label="联系电话"/>

            <info-item :preValue="oldInstitutionInfoAuditDetails.institutionInfoAuditVO.carWay"
                       :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.carWay"
                       class="q-mb-12"
                       label="乘车路线"/>

            <honor-info-item v-if="newInstitutionInfoAuditDetails.institutionHonorAuditVOList"
                             :preValue="oldInstitutionInfoAuditDetails.institutionHonorAuditVOList"
                             :value="newInstitutionInfoAuditDetails.institutionHonorAuditVOList"
                             class="q-mt-24"></honor-info-item>

            <special-info-item v-if="newInstitutionInfoAuditDetails.institutionDepartmentAuditVOList"
                               :preValue="oldInstitutionInfoAuditDetails.institutionDepartmentAuditVOList"
                               :value="newInstitutionInfoAuditDetails.institutionDepartmentAuditVOList"
                               class="q-mt-24"></special-info-item>

          </div>

        </div>

        <div class="bg-white q-mt-md">

          <div class="header">
            <div class="header-line q-mr-sm"></div>
            <span class="header-title">信息来源</span>
          </div>

          <div class="q-pa-md q-pb-md">

            <div class="row col q-mb-12">
              <info-item :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.channelSourceName"
                         label="应用来源"/>
              <info-item :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.auditerType | auditerName"
                         label="审核类型"/>
              <info-item :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.updateTime"
                         label="提交时间"/>
            </div>

          </div>

        </div>

        <div class="bg-white q-mt-md" v-if="newInstitutionInfoAuditDetails.institutionInfoAuditVO.auditStatus !== 'report'">

          <div class="header">
            <div class="header-line q-mr-sm"></div>
            <span class="header-title">审核记录</span>
          </div>

          <div class="q-pa-md q-pb-md">

            <div class="row col q-mb-12">
              <info-item :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.auditStatus | checkStatus"
                         label="审核结果"/>
              <info-item :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.auditerName"
                         label="审核人"/>
              <info-item :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.checkTime"
                         label="审核时间"/>
            </div>

            <div class="row col q-mb-12" v-if="newInstitutionInfoAuditDetails.institutionInfoAuditVO.remark">
              <info-item :value="newInstitutionInfoAuditDetails.institutionInfoAuditVO.remark"
                         label="备      注"/>
            </div>

          </div>

        </div>

      </div>

      <div v-if="newInstitutionInfoAuditDetails.institutionInfoAuditVO && newInstitutionInfoAuditDetails.institutionInfoAuditVO.auditStatus === 'report'"
           class="bg-white q-my-md q-py-md q-pr-md">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px">
          <el-form-item label="审核结果：" prop="auditStatus">
            <el-radio-group v-model="form.auditStatus">
              <el-radio label="通过"></el-radio>
              <el-radio label="不通过"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备      注：" prop="remark" v-if="form.auditStatus !== '通过'">
            <el-input v-model="form.remark" :rows="4" resize="none" type="textarea" maxlength="500" show-word-limit></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="onSubmit" v-bind:loading="submitLoading">确定</el-button>
            <el-button v-on:click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>

</template>

<script>
import Service from './service'
import Empty from '@src/components/result/Empty'
import InfoItem from '@src/components/orgDetail/InfoItem.vue'
import ImageItem from "@src/components/orgDetail/ImageItem"
import HonorInfoItem from "@src/components/orgDetail/HonorInfoItem"
import SpecialInfoItem from "@src/components/orgDetail/SpecialInfoItem"
const shopStoreIds = ['P', 'P1', 'P4', 'P9', 'P110', 'P120', 'P300', 'P410', 'P420', 'P430', 'P440', 'P490', 'P500', 'P600']
export default {
  name: 'orgCheck',
  props: {
    orgCode: {
      required: true,
      type: String,
    }
  },
  components: {
    Empty,
    InfoItem,
    ImageItem,
    HonorInfoItem,
    SpecialInfoItem
  },
  created() {
    this.fetch()
  },
  data() {
    return {
      newInstitutionInfoAuditDetails: {
        institutionInfoAuditVO: {},
        institutionDepartmentAuditVOList: [],
        institutionHonorAuditVOList: []
      },
      oldInstitutionInfoAuditDetails: {
        institutionInfoAuditVO: {},
        institutionDepartmentAuditVOList: [],
        institutionHonorAuditVOList: []
      },
      form: {
        auditStatus: '',
        remark: undefined,
      },
      rules: {
        remark: [
          {required: true, message: '请输入备注', trigger: 'blur'},
        ],
        auditStatus: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
      },
      loading: false,
      submitLoading: false,
      isError: false
    }
  },
  filters: {
    checkStatus: function (value) {
      if (Peace.validate.isEmpty(value)) {
        return '--'
      }
      return {success: '成功', fail: "失败", report: '待审核'}[value] ?? '--'
    },
    auditerName: function (value) {
      return value === 'save' ? '机构入驻' : '修改信息'
    }
  },
  computed: {
    imageData() {

      const {
        practiceLincensePic,
        netHospitalLicensePic,
        businessLicensePic,
        otherLincesePic
      } = this.newInstitutionInfoAuditDetails.institutionInfoAuditVO

      if (Peace.validate.isEmpty(practiceLincensePic) && Peace.validate.isEmpty(netHospitalLicensePic) && Peace.validate.isEmpty(businessLicensePic) && Peace.validate.isEmpty(otherLincesePic)) {
        return undefined
      }

      return {
        practiceLincensePic: practiceLincensePic ?? undefined,
        netHospitalLicensePic: netHospitalLicensePic ?? undefined,
        businessLicensePic: businessLicensePic ?? undefined,
        otherLincesePic: otherLincesePic ?? undefined
      }
    },

    preImageData() {
      const {
        practiceLincensePic,
        netHospitalLicensePic,
        businessLicensePic,
        otherLincesePic
      } = this.oldInstitutionInfoAuditDetails.institutionInfoAuditVO

      if (Peace.validate.isEmpty(practiceLincensePic) && Peace.validate.isEmpty(netHospitalLicensePic) && Peace.validate.isEmpty(businessLicensePic) && Peace.validate.isEmpty(otherLincesePic)) {
        return undefined
      }

      return {
        practiceLincensePic: practiceLincensePic ?? undefined,
        netHospitalLicensePic: netHospitalLicensePic ?? undefined,
        businessLicensePic: businessLicensePic ?? undefined,
        otherLincesePic: otherLincesePic ?? undefined
      }
    },

    showNetHospitalInfo() {
      const typeCode = this.newInstitutionInfoAuditDetails.institutionInfoAuditVO?.hospitalTypeCode ?? ""
      if (Peace.validate.isEmpty(typeCode)) {
        return false
      } else {
        return typeCode.startsWith("A")
      }

    },

    showHasShop() {
      const typeCode = this.newInstitutionInfoAuditDetails.institutionInfoAuditVO?.hospitalTypeCode ?? ""
      if (Peace.validate.isEmpty(typeCode)) {
        return false
      } else {
        return shopStoreIds.some((item) => item === typeCode)
      }

    },

    hasShop() {
      if (Peace.validate.isEmpty(this.newInstitutionInfoAuditDetails.institutionInfoAuditVO.isShareShop)) {
        return ''
      } else {
        return this.newInstitutionInfoAuditDetails.institutionInfoAuditVO.isShareShop ? '是' : '否'
      }
    },

    oldHasShop() {
      if (Peace.validate.isEmpty(this.oldInstitutionInfoAuditDetails.institutionInfoAuditVO.isShareShop)) {
        return ''
      } else {
        return this.oldInstitutionInfoAuditDetails.institutionInfoAuditVO.isShareShop ? '是' : '否'
      }
    },

    netHospital() {
      if (Peace.validate.isEmpty(this.newInstitutionInfoAuditDetails.institutionInfoAuditVO.isNetHosptial)) {
        return ''
      } else {
        return this.newInstitutionInfoAuditDetails.institutionInfoAuditVO.isNetHosptial ? '是' : '否'
      }
    },
    shareHosptial() {
      if (Peace.validate.isEmpty(this.newInstitutionInfoAuditDetails.institutionInfoAuditVO.isShareHosptial)) {
        return ''
      } else {
        return this.newInstitutionInfoAuditDetails.institutionInfoAuditVO.isShareHosptial ? '是' : '否'
      }
    },

    oldNetHospital() {
      if (Peace.validate.isEmpty(this.oldInstitutionInfoAuditDetails.institutionInfoAuditVO.isNetHosptial)) {
        return ''
      } else {
        return this.oldInstitutionInfoAuditDetails.institutionInfoAuditVO.isNetHosptial ? '是' : '否'
      }
    },
    oldShareHosptial() {
      if (Peace.validate.isEmpty(this.oldInstitutionInfoAuditDetails.institutionInfoAuditVO.isShareHosptial)) {
        return ''
      } else {
        return this.oldInstitutionInfoAuditDetails.institutionInfoAuditVO.isShareHosptial ? '是' : '否'
      }
    }

  },
  methods: {
    fetch() {
      this.loading = true
      const params = {institutionId: this.orgCode}
      Service.getOrgDetail(params).then((res) => {

        this.newInstitutionInfoAuditDetails.institutionInfoAuditVO = res.data?.newInstitutionInfoAuditDetails?.institutionInfoAuditVO ?? {}
        this.newInstitutionInfoAuditDetails.institutionDepartmentAuditVOList = res.data?.newInstitutionInfoAuditDetails?.institutionDepartmentAuditVOList ?? []
        this.newInstitutionInfoAuditDetails.institutionHonorAuditVOList = res.data?.newInstitutionInfoAuditDetails?.institutionHonorAuditVOList ?? []

        this.oldInstitutionInfoAuditDetails.institutionInfoAuditVO = res.data?.oldInstitutionInfoDetail?.institutionInfoAuditVO ?? {}
        this.oldInstitutionInfoAuditDetails.institutionDepartmentAuditVOList = res.data?.oldInstitutionInfoDetail?.institutionDepartmentAuditVOList ?? []
        this.oldInstitutionInfoAuditDetails.institutionHonorAuditVOList = res.data?.oldInstitutionInfoDetail?.institutionHonorAuditVOList ?? []

      }).catch(() => {
        this.isError = true
      }).finally(() => {
        this.loading = false
      })
    },

    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submit()
        }
      });
    },

    submit() {

      const params = {
        id:  this.newInstitutionInfoAuditDetails.institutionInfoAuditVO.auditId,
        remark: this.form.auditStatus === "通过" ? undefined : this.form.remark,
        auditStatus: this.form.auditStatus === "通过" ? 'success' : 'fail'
      }

      this.submitLoading = true
      Service.checkOrg(params).then(() => {
        this.$emit('refresh')
      }).finally(() => {
        this.submitLoading = false
      })

    },

    back() {
      this.$emit('close')
    },
  }
}
</script>

<style lang="scss" scoped>

::v-deep .el-form-item--mini .el-form-item__label {
  text-align: justify-all !important;
}

.layout-card {
  padding: 16px;
  background: #f5f5f5;

  .header {
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #eeeeee;

    .header-line {
      width: 4px;
      height: 16px;
      background: var(--q-color-primary);
      border-radius: 2px;
    }

    .header-title {
      font-weight: 500;
      font-size: 16px;
      color: #333333;
      line-height: 26px;
    }
  }
}
</style>
