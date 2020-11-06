<template>
  <div class="bg-white  q-pa-lg">
    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title ">药房基本信息</p>
      </div>
      <div class="item-content">
        <div class="item-child">
          <p class="child-key">药房编码</p>
          <p>：</p>
          <p class="child-value">{{detailData.SuborganizationCode}}</p>
        </div>
        <div class="item-child">
          <p class="child-key">药房名称</p>
          <p>：</p>
          <p class="child-value">{{detailData.CustName}}</p>
        </div>
        <div class="item-child">
          <p class="child-key">药房地址</p>
          <p>：</p>
          <p class="child-value">{{detailData.Address?detailData.Province+detailData.City+detailData.Area+detailData.Address:""}}</p>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">药房联系方式</p>
      </div>
      <div class="item-content">
        <div class="item-child">
          <p class="child-key-other">联系人姓名</p>
          <p>：</p>
          <p class="child-value">{{detailData.UserName}}</p>
        </div>
        <div class="item-child">
          <p class="child-key-other">联系人电话</p>
          <p>：</p>
          <p class="child-value">{{detailData.UserPhone}}</p>
        </div>
        <div class="item-child">
          <p class="child-key-other">联系人邮箱</p>
          <p>：</p>
          <p class="child-value">{{detailData.UserMail}}</p>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">药房基本信息</p>
      </div>
      <div class="item-content">
        <div class="item-child">
          <p class="child-key">营业时间</p>
          <p>：</p>
          <p class="child-value">{{detailData.BusinessStartDate&&detailData.BusinessEndDate?detailData.BusinessStartDate+" 至 "+ detailData.BusinessEndDate:"-"}}</p>
        </div>
        <div class="item-child">
          <p class="child-key">药房电话</p>
          <p>：</p>
          <p class="child-value">{{detailData.ContactNumber}}</p>
        </div>
        <div class="item-child">
          <p class="child-key">配送方式</p>
          <p>：</p>

          <div>
            <div v-for="item in detailData.NewDistributionMode"
                 v-bind:key="item.Value"
                 class="row">
              <template v-if="canShow(item)">
                <el-checkbox v-bind:label="item.Value"
                             disabled
                             v-model="item.Visible"
                             class="q-mb-8">{{item.Label}}</el-checkbox>
                <div class="row q-ml-48"
                     v-if="item.Visible">
                  <p class="child-key">支付方式</p>
                  <p>：</p>
                  <el-checkbox v-for="item2 in item.PayModel"
                               v-bind:key="item2.Value"
                               v-bind:label="item2.Value"
                               v-model="item2.Visible"
                               disabled>{{item2.Label}}</el-checkbox>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line"
         v-if="canShowImg"></div>
    <div class="content-item"
         v-if="canShowImg">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">药房图片</p>
      </div>
      <div class="item-content"
           style="margin-left:0">
        <div class="item-child-line">
          <div class="box"
               v-if="detailData.logoUrl">
            <el-image class="img"
                      :src="detailData.logoUrl"
                      :preview-src-list="detailData.logoUrlList"
                      fit='fill'></el-image>
            <span class="demonstration">药房门头照片</span>
          </div>
          <div class="box"
               v-if="detailData.BusinesslicenseUrl">
            <el-image class="img"
                      :preview-src-list="detailData.BusinesslicenseUrlList"
                      :src="detailData.BusinesslicenseUrl"
                      fit='fill'></el-image>
            <span class="demonstration">营业执照</span>
          </div>
          <div class="box"
               v-if="detailData.DrugManagementlicenseUrl">
            <el-image class="img"
                      :preview-src-list="detailData.DrugManagementlicenseUrlList"
                      :src="detailData.DrugManagementlicenseUrl"
                      fit='fill'></el-image>
            <span class="demonstration">药品经营许可证</span>
          </div>
          <div class="box"
               v-if="detailData.DrugManagementlicenseUrl">
            <el-image class="img"
                      v-if="detailData.GSPCertificationUrl"
                      :preview-src-list="detailData.GSPCertificationUrlList"
                      :src="detailData.GSPCertificationUrl"
                      fit='fill'></el-image>
            <span class="demonstration">药品经营质量管理规范认证证书</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  props: {
    data: {
      type: Object,
      validator(value) {
        return Object.prototype.hasOwnProperty.call(value, 'UserID')
      }
    }
  },

  data() {
    return {
      detailData: {},

      DistributSelfList: [{ code: 0, name: '自提' }],
      DistributionList: [{ code: 1, name: '配送' }],
      DistributSelfMode: [],
      DistributMode: [],
      PayselfList: [
        { code: 4, name: '在线支付' },
        { code: 2, name: '到店支付' }
      ],
      PayList: [
        { code: 1, name: '在线支付' },
        { code: 3, name: '货到付款' }
      ]
    }
  },

  created() {
    this.fetch()
  },
  computed: {
    canShowImg() {
      return this.detailData?.logoUrl ||
        this.detailData?.BusinesslicenseUrl ||
        this.detailData?.DrugManagementlicenseUrl ||
        this.detailData?.GSPCertificationUrl
        ? true
        : false
    }
  },
  methods: {
    fetch() {
      const params = { UserID: this.data.UserID }
      Service.detail(params).then((res) => {
        this.detailData = res.data
        this.detailData.logoUrlList = [res.data.logoUrl]
        this.detailData.BusinesslicenseUrlList = [res.data.BusinesslicenseUrl]
        this.detailData.DrugManagementlicenseUrlList = [res.data.DrugManagementlicenseUrl]
        this.detailData.GSPCertificationUrlList = [res.data.GSPCertificationUrl]
      })
    },
    //是否能显示自提
    canShow(item) {
      if (this.detailData.CustomerType == 80) {
        if (item.Value == 0) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #3099a6 !important;
  border-color: #3099a6 !important;
}
::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #fff !important;
}
::v-deep .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #666;
}
::v-deep .el-checkbox__input.is-disabled .el-checkbox__inner {
  background-color: #fff !important;
  border-color: #eee !important;
}
.content-item {
  display: flex;
  flex-direction: column;
  background: white;
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title-left {
  width: 4px;
  height: 16px;
  background: #3099a6;
  border-radius: 2px;
}
.title {
  color: var(--q-color-grey-333);
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
}
.item-content {
  margin: 0px 14px 10px 14px;
  display: flex;
  flex-direction: column;
}
.item-child {
  margin-top: 20px;
  display: flex;
}
.item-child-line {
  width: 100%;
  margin-top: 20px;
  display: flex;
}
.child-key {
  width: 4em;
  font-size: 14px;
  color: var(--q-color-grey-333);
  text-align: justify;
  text-align-last: justify;
}
.child-value {
  font-size: 14px;
  color: var(--q-color-grey-666);
}
.child-key-other {
  width: 5em;
  font-size: 14px;
  color: var(--q-color-grey-333);
  text-align: justify;
  text-align-last: justify;
}
.line {
  width: 100%;
  margin: 10px 0 20px 0;
  height: 1px;
  background: #e9e9e9;
}
.img {
  width: 130px;
  height: 130px;
  border-radius: 4px;
  border: 1px solid rgba(238, 238, 238, 1);
}
.box {
  width: 132px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}
.demonstration {
  text-align: center;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
  font-size: 14px;
  margin-top: 10px;
}
</style>