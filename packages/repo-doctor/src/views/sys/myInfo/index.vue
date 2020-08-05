<template>
  <div class="about">
    <el-form :model="view.model"
             label-suffix
             label-width="120px">
      <el-form-item label="个人头像：">
        <img :src="view.model.avartor"
             class="avartor" />
        <el-upload :action="api.uploadAvatar"
                   :auto-upload="true"
                   :data="extraUploadData"
                   :headers="extraHeaders"
                   :on-success="uploadAvatarSuccess"
                   accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf, .JPG, .JPEG, .PBG, .GIF, .BMP, .PDF"
                   class="upload"
                   name="image"
                   ref="uploadAvatar">
          <img class="modify"
               slot="trigger"
               src="~@src/assets/images/sys/ic_modify.png" />
        </el-upload>
      </el-form-item>
      <el-form-item label="帐号：">{{ view.model.tel }}</el-form-item>
      <el-form-item label="姓名：">{{ view.model.name }}</el-form-item>
      <el-form-item label="医院：">{{ view.model.netHospital_name }}</el-form-item>
      <el-form-item label="科室：">{{ view.model.netdept_child }}</el-form-item>
      <el-form-item label="职称：">
        <el-select placeholder
                   v-model="view.model.doctor_title">
          <el-option label="医师"
                     value="医师"></el-option>
          <el-option label="主治医师"
                     value="主治医师"></el-option>
          <el-option label="副主任医师"
                     value="副主任医师"></el-option>
          <el-option label="主任医师"
                     value="主任医师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号：">{{ view.model.id_card }}</el-form-item>
      <el-form-item label="证书编号：">{{ view.model.cert_no }}</el-form-item>
      <el-form-item label="医师资格证书：">
        <el-upload :action="api.uploadCertFile"
                   :auto-upload="true"
                   :class="{hideUploadIcon : view.model.cert_file && view.model.cert_file.length === 2}"
                   :data="extraUploadData"
                   :file-list="view.model.cert_file"
                   :headers="extraHeaders"
                   :limit="2"
                   :on-preview="handlePictureCardPreview"
                   :on-remove="uploadCertRemove"
                   :on-success="uploadCertSuccess"
                   class="upload-list"
                   list-type="picture-card"
                   name="image">
          <div class="el-upload__tip"
               slot="tip">请上传正反面</div>
          <i class="el-icon-plus"
             v-show="view.model.cert_file && view.model.cert_file.length !== 2"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="图片要求：">支持jpg 、jpeg 、bmp 、gif 、png格式图片，大小不超过2M</el-form-item>

      <el-form-item label=" ">
        <el-button @click="save"
                   type="primary">保存</el-button>
      </el-form-item>
    </el-form>

    <peace-dialog :visible.sync="dialog.visible"
                  title="图片预览">
      <img :src="dialog.imageUrl"
           alt
           width="100%" />
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      api: {
        uploadAvatar: peace.config.api.base + '/' + 'client/v1/Personalcenter/uploadAvatar',
        uploadCertFile: peace.config.api.base + '/' + 'client/v1/Personalcenter/uploadCertFile'
      },

      extraHeaders: {
        accesstoken: this.$store.state.user.userInfo.list.loginInfo.token
      },

      extraUploadData: {
        doctorId: this.$store.state.user.userInfo.list.docInfo.doctor_id
      },

      view: {
        model: {}
      },

      dialog: {
        visible: false,
        imageUrl: ''
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const params = this.extraUploadData

      peace.service.personalCenter.getDoctorInfo(params).then((res) => {
        res.data.cert_file = JSON.parse(res.data.cert_file)
        res.data.cert_file = res.data.cert_file.map((item) => {
          return {
            url: item.img
          }
        })

        this.view.model = res.data
      })
    },

    uploadAvatarSuccess(res) {
      peace.util.alert(res.msg)

      this.get()
    },

    uploadCertSuccess(res) {
      this.view.model.cert_file.push({
        url: res.data
      })
    },

    uploadCertRemove(file, fileList) {
      this.view.model.cert_file = fileList
    },

    handlePictureCardPreview(file) {
      this.dialog.imageUrl = file.url
      this.dialog.visible = true
    },

    save() {
      const cert_file = []

      this.view.model.cert_file.forEach((item) => {
        cert_file.push({
          img: item.url
        })
      })

      if (cert_file.length !== 2) {
        peace.util.warning('请上传正反面，共2张医师资格证书')

        return
      }

      const params = {
        doctor_hosdept_id: this.view.model.doctor_hosdept_id,
        doctor_title: this.view.model.doctor_title,
        cert_file: cert_file
      }

      peace.service.personalCenter.upDoctorInfo(params).then((res) => {
        peace.util.alert(res.msg)

        this.get()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  .el-form {
    ::v-depp .el-form-item {
      display: flex;
      align-items: center;
    }

    ::v-depp .el-form-item__content {
      margin: 0 !important;
    }

    ::v-depp .el-upload-list--picture-card .el-upload-list__item {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    .avartor {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    .upload {
      display: inline-block;

      ::v-depp .el-upload-list {
        display: none;
      }

      .modify {
        cursor: pointer;

        width: 24px;
        height: 24px;
      }
    }

    .upload-list {
      &.hideUploadIcon {
        ::v-depp .el-upload--picture-card {
          display: none;
        }
      }

      ::v-depp .el-upload-list--picture-card {
        display: inline-flex;
      }
    }
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid transparent;
    margin: 20px 0;
    padding: 0;
  }
}
</style>
