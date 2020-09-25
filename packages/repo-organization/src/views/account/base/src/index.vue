<template>
  <div class="layout-route">
    <div class="q-pa-lg bg-white full-height">
      <div class="content-item">
        <div class="item-title">
          <div class="title-left"></div>
          <p class="title">账号信息</p>
        </div>
        <div class="item-content">
          <div class="item-child">
            <p class="child-key">登录账号</p>
            <p>：</p>
            <p class="child-value">{{ accountInfo.tel }}</p>
          </div>
          <div class="item-child">
            <p class="child-key">联系人</p>
            <p>：</p>
            <p class="child-value">{{ accountInfo.linkman }}</p>
          </div>
          <div class="item-child">
            <p class="child-key">手机号码</p>
            <p>：</p>
            <p class="child-value">{{ accountInfo.tel }}</p>
          </div>
          <div class="item-child">
            <p class="child-key">邮箱</p>
            <p>：</p>
            <p class="child-value">{{ accountInfo.email }}</p>
          </div>
        </div>
      </div>

      <div class="line"></div>

      <div class="content-item">
        <div class="item-title">
          <div class="title-left"></div>
          <p class="title"> 机构信息</p>
        </div>
        <div class="item-content">
          <div class="item-child">
            <p class="child-key">机构类型</p>
            <p>：</p>
            <p class="child-value">{{ hosInfo.role }}</p>
          </div>
          <div class="item-child">
            <p class="child-key">机构名称</p>
            <p>：</p>
            <p class="child-value">{{ hosInfo.hospitalName }}</p>
          </div>
          <div class="item-child">
            <p class="child-key-other">统一社会信用代码</p>
            <p>：</p>
            <p class="child-value">{{ hosInfo.socialCreditCode }}</p>
          </div>
          <div class="item-child"
               v-if="hosInfo.hospitalAttribute">
            <p class="child-key">医院属性</p>
            <p>：</p>
            <p class="child-value">{{ hosInfo.hospitalAttribute }}</p>
          </div>
          <div class="item-child">
            <p class="child-key">详细地址</p>
            <p>：</p>
            <p class="child-value">{{ hosInfo.hospitalAddres }}</p>
          </div>
          <div class="item-child"
               v-if="hosInfo.level">
            <p class="child-key">医院等级</p>
            <p>：</p>
            <p class="child-value">{{ hosInfo.level }}</p>
          </div>
          <div class="item-child-line"
               v-if="canShowCertificate">
            <p class="child-key">资质证明</p>
            <p>：</p>
            <el-image class="img"
                      v-if="hosInfo.license"
                      :src="hosInfo.license"
                      :preview-src-list="hosInfo.licenseList"
                      fit='fill'></el-image>
            <el-image class="img"
                      v-if="hosInfo.structureLicense"
                      :preview-src-list="hosInfo.structureLicenseList"
                      :src="hosInfo.structureLicense"
                      fit='fill'></el-image>
            <el-image class="img"
                      v-if="hosInfo.certificate"
                      :preview-src-list="hosInfo.certificateList"
                      :src="hosInfo.certificate"
                      fit='fill'></el-image>
            <el-image class="img"
                      v-if="hosInfo.hospitalLicense"
                      :preview-src-list="hosInfo.hospitalLicenseList"
                      :src="hosInfo.hospitalLicense"
                      fit='fill'></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './service'

export default {
  name: 'AccountBase',

  data() {
    return {
      accountInfo: {},
      hosInfo: {}
    }
  },

  created() {
    this.getUserData()
  },
  computed: {
    canShowCertificate() {
      return this.hosInfo?.license || this.hosInfo?.structureLicense || this.hosInfo?.certificate || this.hosInfo?.hospitalLicense ? true : false
    }
  },
  methods: {
    getUserData() {
      Service.getAccountDetailInfo().then((res) => {
        res.data.hosInfo.licenseList = [res.data.hosInfo.license]
        res.data.hosInfo.certificateList = [res.data.hosInfo.certificate]
        res.data.hosInfo.hospitalLicenseList = [res.data.hosInfo.hospitalLicense]
        res.data.hosInfo.structureLicenseList = [res.data.hosInfo.structureLicense]
        this.accountInfo = res.data.accountInfo
        this.hosInfo = res.data.hosInfo
      })
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
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
  width: 8em;
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
  margin-right: 20px;
  border-radius: 4px;
  border: 1px solid rgba(238, 238, 238, 1);
}
</style>