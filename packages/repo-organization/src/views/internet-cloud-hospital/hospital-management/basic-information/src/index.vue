<template>
  <div class="layout-route">

    <div class="card">
      <el-form label-position="right"
               label-suffix="："
               label-width="110px">

        <el-form-item label="医院名称">
          <span>{{ hospital.netHospital_name }}</span>
        </el-form-item>

        <el-form-item label="社会信用代码">
          <span>{{ hospital.org_id }}</span>
        </el-form-item>

        <el-form-item label="医院地址">
          <span class="q-mr-4">{{ hospital.province_name }}</span>
          <span class="q-mr-4">{{ hospital.city_name }}</span>
          <span class="q-mr-4">{{ hospital.area_name }}</span>
          <span class="q-mr-4">{{ hospital.address }}</span>
        </el-form-item>

        <el-form-item label="医院等级">
          <span>{{ hospital.level }}</span>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input :autosize="{ minRows:1, maxRows: 1 }"
                    maxlength="25"
                    resize="none"
                    type="textarea"
                    placeholder="请输入医院联系电话，该号码会公示给患者"
                    v-if="isEdit"
                    v-model="phoneNew"></el-input>
          <span v-else>{{ hospital.phoneNumber }}</span>
        </el-form-item>

        <el-form-item label="医院描述">
          <el-input :autosize="{ minRows:4, maxRows: 4 }"
                    maxlength="300"
                    resize="none"
                    show-word-limit
                    type="textarea"
                    placeholder="描述内容不超过300字"
                    v-if="isEdit"
                    v-model="descNew"></el-input>
          <span v-else>{{ hospital.desc }}</span>
        </el-form-item>

        <el-form-item label="使用状态">
          <el-switch v-model="statusNew"
                     v-if="isEdit">
          </el-switch>
          <span v-else>
            <span v-if="hospital.status">在用</span>
            <span v-else>停用</span>
          </span>
        </el-form-item>

        <el-form-item label="医院封面">
          <div class="cover-img">
            <el-image class="hospital-logo"
                      v-if="!isEdit"
                      :src="hospital.hosPhoto"
                      fit='fill'></el-image>
            <el-upload class="hospital-logo-uploader"
                       v-else
                       :action="actions"
                       :headers="headers"
                       :on-success="handleAvatarSuccess"
                       :show-file-list="false">
              <el-image class="hospital-logo"
                        v-if="hosPhotoNew"
                        :src="hosPhotoNew"
                        fit='fill'></el-image>
              <i v-else
                 class="el-icon-plus hospital-logo-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="cover-tips">(用于患者端展示，图片要求：支持jpg、jpeg 、png、bmp 、gif 格式图片，大小不超过2M，建议尺寸800*800)</div>
        </el-form-item>

        <el-form-item label=""
                      v-if="!isEdit">
          <el-button type="primary"
                     @click="edit">编辑</el-button>
        </el-form-item>

        <el-form-item label=""
                      v-else>
          <el-button type="primary"
                     @click="save">保存</el-button>
          <el-button @click="edit"
                     style="margin-left:46px;">返回</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>
<script>
import Service from './service'

export default {
  name: 'BasicInformation',
  data() {
    return {
      hospital: {},
      isEdit: false,
      actions: `${process.env.VUE_APP_API_BASE}nethospital/hospital/v1/doctor/uploadImages`,
      headers: {
        Authorization: ''
      },
      hosPhotoNew: '',
      phoneNew: '',
      descNew: '',
      statusNew: ''
    }
  },
  async mounted() {
    const token = (await Peace.identity.auth.getAuth()).access_token
    this.headers.Authorization = 'Bearer ' + token

    this.getHospitalInfo()
  },
  methods: {
    getHospitalInfo() {
      Service.getHospitalInfo().then((res) => {
        this.hospital = res.data || {}
        this.hosPhotoNew = this.hospital.hosPhoto
        this.phoneNew = this.hospital.phoneNumber
        this.descNew = this.hospital.desc
        this.statusNew = this.hospital.status === 1
      })
    },
    edit() {
      this.isEdit = !this.isEdit
    },
    save() {
      const status = this.statusNew ? 1 : 0
      let params = {
        phoneNumber: this.phoneNew,
        hosDesc: this.descNew,
        hosPhoto: this.hosPhotoNew,
        status: status
      }
      Service.updateHospitalInfo(params).then(() => {
        Peace.util.success('医院信息修改成功！')
        this.getHospitalInfo()
        this.isEdit = !this.isEdit
      })
    },

    // Image 上传成功回调
    handleAvatarSuccess(res, file) {
      this.hosPhotoNew = res.data
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  max-width: 685px;
}

.cover {
  &-tips {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
  }
  &-img {
    margin: 8px 16px 0 0;
    width: 100px;
    height: 100px;
  }
}

::v-deep .hospital-logo-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.hospital-logo-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.hospital-logo {
  display: block;
  width: 100px;
  height: 100px;
}
</style>
