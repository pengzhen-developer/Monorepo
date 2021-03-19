<template>
  <div>
    <div class="info-title">基本信息</div>
    <div class="row">
      <div class="col">
        <div class="row">
          <p>姓名：</p>
          <span>{{PharmacistObj.RealName}}</span>
        </div>
        <div class="row">
          <p>身份证号：</p>
          <span>{{PharmacistObj.IdentityID}}</span>
        </div>
        <div class="row">
          <p>任职资格类型：</p>
          <span>{{PharmacistObj.PharmacistType=="0"?"药学专业技术资格证书":"执业药师资格证书"}}</span>
        </div>
        <div class="row">
          <p>资质级别：</p>
          <span>{{PharmacistObj.QualificationsLevel}}</span>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p>证书编号：</p>
          <span>{{PharmacistObj.CertificateCode}}</span>
        </div>
        <div class="row">
          <p>证书图片：</p>
          <el-image class="img"
                    :src="PharmacistObj.CertificateImageUrl"
                    :preview-src-list="CertificateImageUrlList"
                    fit='fill'
                    v-if="PharmacistObj.CertificateImageUrl"></el-image>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="info-title">账号信息</div>
    <div class="col q-mb-32">
      <div class="row">
        <p>所属部门：</p>
        <span>{{PharmacistObj.DeptName}}</span>
      </div>
      <div class="row">
        <p>账号角色：</p>
        <div class="tagsList">
          <div class="tags"
               v-for="(item,index) in roleList"
               v-bind:key="index">{{item}}</div>
        </div>
      </div>
      <div class="row">
        <p>账号：</p>
        <span>{{PharmacistObj.UserName}}</span>
      </div>
      <div class="row">
        <p>备注：</p>
        <span>{{PharmacistObj.Note}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service/index'
export default {
  props: {
    data: String
  },
  data() {
    return {
      PharmacistObj: {},
      CertificateImageUrlList: [],
      roleList: []
    }
  },
  created() {
    Service.getPharmacistInfoByID({ ID: this.data }).then((res) => {
      this.PharmacistObj = res.data
      this.CertificateImageUrlList = [res.data.CertificateImageUrl]
      if (res.data.RoleNames) {
        this.roleList = res.data.RoleNames.split(',')
      }
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
  color: #333333;
}
span {
  color: rgba(51, 51, 51, 0.6);
  margin-left: 8px;
}
.info-title {
  position: relative;
  padding-left: 14px;
  margin-bottom: 25px;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  line-height: 22px;
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
.img {
  width: 130px;
  height: 130px;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  background: #fff;
  margin-left: 8px;
}
.row {
  margin-bottom: 16px;
}
::v-deep .el-divider--horizontal {
  background-color: #e9e9e9;
  margin: 8px 0 24px 0;
}
.tagsList {
  display: flex;
  flex-wrap: wrap;
}
.tags {
  padding: 0 10px;
  background-color: hsla(0, 0%, 94.9%, 0.965);
  border-color: hsla(0, 0%, 89.4%, 0.93);
  color: rgba(0, 0, 0, 0.65);
  margin-left: 8px;
  line-height: 20px;
  border-radius: 4px;
}
</style>