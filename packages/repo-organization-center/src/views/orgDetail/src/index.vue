<template>
  <div class="layout-card full-height overflow-auto" v-loading="loading">
    <div v-if="currentDate.institutionInfoAuditVO">

      <div class="bg-white">

        <div class="q-pl-md q-pt-24">
          <el-button  v-on:click="back">返回上一页</el-button>
        </div>

        <div class="header">
          <div class="header-line q-mr-sm"> </div>
          <span class="header-title">基本信息</span>
        </div>

        <div class="q-ma-md q-pb-md">
          <div class="row col q-mb-12">
            <info-item label="机构名称"
                       :value="currentDate.institutionInfoAuditVO.institutionName" />
            <info-item label="机构编码"
                       :value="currentDate.institutionInfoAuditVO.institutionCode" />
            <info-item label="执业许可证登记号"
                       :value="currentDate.institutionInfoAuditVO.serviceLicenceNo" />
          </div>

          <div class="row col q-mb-12">
            <info-item label="统一社会信用代码"
                       :value="currentDate.institutionInfoAuditVO.socialNo" />
            <info-item label="机构类型"
                       :value="currentDate.institutionInfoAuditVO.institutionTypeCode" />
            <info-item label="医院类型"
                       :value="currentDate.institutionInfoAuditVO.hospitalTypeCode" />
          </div>

          <div class="row col q-mb-12">
            <info-item label="医院等级"
                       :value="currentDate.institutionInfoAuditVO.hospitalLevelCode" />
            <info-item label="所有制形式"
                       :value="currentDate.institutionInfoAuditVO.fromTypeCode" />
            <info-item label="服务对象"
                       :value="currentDate.institutionInfoAuditVO.servicerTypeCode" />
          </div>

          <div class="row col q-mb-12">
            <info-item label="机构性质"
                       :value="currentDate.institutionInfoAuditVO.institutionWayCode" />
            <info-item label="录属关系"
                       :value="currentDate.institutionInfoAuditVO.relationTypeName" />
            <info-item label="地址"
                       :value="currentDate.institutionInfoAuditVO.address" />
          </div>

          <div class="row col q-mb-12">
            <info-item label="是否分院"
                       :value="shareHosptial" />
            <info-item label="是否互联网医院"
                       :value="netHospital" />
            <div class="col"></div>
          </div>

          <image-item v-if="imageData" :value="imageData"/>

        </div>

      </div>

      <div class="bg-white">

        <div class="header">
          <div class="header-line q-mr-sm"> </div>
          <span class="header-title">营运信息</span>
        </div>

        <div class="q-pa-md">


          <info-item label="机构简介"
                     class="q-mb-12"
                     :value="currentDate.institutionInfoAuditVO.institutionDescribe" />
          <info-item label="机构官网"
                     class="q-mb-12"
                     :value="currentDate.institutionInfoAuditVO.institutionWeb" />

          <info-item label="联系电话"
                     class="q-mb-12"
                     :value="currentDate.institutionInfoAuditVO.tel" />

          <info-item label="乘车路线"
                     class="q-mb-12"
                     :value="currentDate.institutionInfoAuditVO.carWay" />

          <honor-info-item v-if="currentDate.institutionHonorAuditVOList" class="q-mt-24" :value="currentDate.institutionHonorAuditVOList"></honor-info-item>

          <special-info-item v-if="currentDate.institutionDepartmentAuditVOList" class="q-mt-24" :value="currentDate.institutionDepartmentAuditVOList"></special-info-item>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import Service from './service'
import InfoItem from '@src/components/orgDetail/InfoItem.vue'
import ImageItem from "@src/components/orgDetail/ImageItem";
import HonorInfoItem from "@src/components/orgDetail/HonorInfoItem";
import SpecialInfoItem from "@src/components/orgDetail/SpecialInfoItem";
export default {
  name: 'orgDetail',
  props: {
    orgCode: {
      required: true,
      type: String,
    }
  },
  components: {
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
      currentDate: {
        institutionInfoAuditVO: undefined,
        institutionDepartmentAuditVOList: undefined,
        institutionHonorAuditVOList: undefined
      },
      loading: false
    }
  },
  computed: {
    imageData() {
      const {
        practiceLincensePic,
        netHospitalLicensePic,
        businessLicensePic,
        otherLincesePic
      } = this.currentDate.institutionInfoAuditVO

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
    netHospital() {
       if (Peace.validate.isEmpty(this.currentDate.institutionInfoAuditVO.isNetHosptial)) {
          return ''
       } else {
         return this.currentDate.institutionInfoAuditVO.isNetHosptial ? '是' : '否'
       }
    },
    shareHosptial() {
      if (Peace.validate.isEmpty(this.currentDate.institutionInfoAuditVO.isShareHosptial)) {
        return ''
      } else {
        return this.currentDate.institutionInfoAuditVO.isShareHosptial ? '是' : '否'
      }
    }
  },
  methods: {
    fetch() {
      this.loading = true
      const params = {institutionCode: this.orgCode}
      Service.getOrgDetail(params).then((res) => {
        this.currentDate = res.data.currentDate
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
          this.loading = false
      })
    },
    back() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
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
