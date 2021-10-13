<template>
  <div class="layout-card full-height overflow-auto" v-loading="loading">
    <div v-if="currentDate.institutionInfovo">

      <div class="q-pl-md q-pt-24">
        <el-button  v-on:click="back">返回上一页</el-button>
      </div>

      <div class="bg-white">

        <div class="header">
          <div class="header-line q-mr-sm"> </div>
          <span class="header-title">基本信息</span>
        </div>

        <div class="q-ma-md q-pb-md">
          <div class="row col q-mb-12">
            <info-item label="机构名称"
                       :value="currentDate.institutionInfovo.institutionName" />
            <info-item label="机构编码"
                       :value="currentDate.institutionInfovo.institutionCode" />
            <info-item label="执业许可证登记号"
                       :value="currentDate.institutionInfovo.serviceLicenceNo" />
          </div>

          <div class="row col q-mb-12">
            <info-item label="统一社会信用代码"
                       :value="currentDate.institutionInfovo.socialNo" />
            <info-item label="机构类型"
                       :value="currentDate.institutionInfovo.institutionTypeCode" />
            <info-item label="医院类型"
                       :value="currentDate.institutionInfovo.hospitalTypeCode" />
          </div>

          <div class="row col q-mb-12">
            <info-item label="医院等级"
                       :value="currentDate.institutionInfovo.hospitalLevelCode" />
            <info-item label="所有制形式"
                       :value="currentDate.institutionInfovo.fromTypeCode" />
            <info-item label="服务对象"
                       :value="currentDate.institutionInfovo.servicerTypeCode" />
          </div>

          <div class="row col q-mb-12">
            <info-item label="机构性质"
                       :value="currentDate.institutionInfovo.institutionWayCode" />
            <info-item label="录属关系"
                       :value="currentDate.institutionInfovo.relationTypeName" />
            <info-item label="地址"
                       :value="currentDate.institutionInfovo.address" />
          </div>

          <div class="row col q-mb-12">
            <info-item label="是否分院"
                       :value="currentDate.institutionInfovo.isShareHosptial" />
            <info-item label="是否互联网医院"
                       :value="currentDate.institutionInfovo.isNetHosptial" />
            <div class="col"></div>
          </div>

          <image-item :value="imageData"/>

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
                     :value="currentDate.institutionInfovo.institutionDescribe" />
          <info-item label="机构官网"
                     class="q-mb-12"
                     :value="currentDate.institutionInfovo.institutionWeb" />

          <info-item label="联系电话"
                     class="q-mb-12"
                     :value="currentDate.institutionInfovo.tel" />

          <info-item label="乘车路线"
                     class="q-mb-12"
                     :value="currentDate.institutionInfovo.carWay" />

          <honor-info-item v-if="currentDate.epartmenes" class="q-mt-24" :value="currentDate.epartmenes"></honor-info-item>

          <special-info-item v-if="currentDate.institutionHonorvo" class="q-mt-24" :value="currentDate.institutionHonorvo"></special-info-item>

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
        institutionInfovo: undefined,
        epartmenes: undefined,
        institutionHonorvo: undefined
      },
      loading: false
    }
  },
  computed: {
    imageData() {
      const {practiceLincensePic, netHospitalLicensePic, businessLicensePic, otherLincesePic} = this.currentDate.institutionInfovo
      return {
        practiceLincensePic: practiceLincensePic,
        netHospitalLicensePic: netHospitalLicensePic,
        businessLicensePic: businessLicensePic,
        otherLincesePic: otherLincesePic
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
      background: #1890ff;
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
