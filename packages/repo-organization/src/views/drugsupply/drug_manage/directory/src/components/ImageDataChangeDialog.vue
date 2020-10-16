<template>
  <div>
    <p>药品图片上传药品图片，最多可上传9张，尺寸700*700px，图片大小1M以内</p>
    <div class="content-img">

      <el-upload class="avatar-uploader content-img-item"
                 action=""
                 v-if="isCanUploadImg"
                 :http-request="uploadmanagementLicenseImg"
                 :show-file-list="false"
                 :before-upload="beforeAvatarUpload">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <div v-for="(item,index) in imageList"
           class="content-img-item"
           :key="index">
        <img :src="item"
             style="width:120px;height:120px"
             alt="">
        <img src="../assets/img/ic_close.png"
             alt=""
             class="content-img-delete"
             @click="deleteOne(index)">
      </div>

    </div>
    <div class="bottom">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSave">确定</el-button>
    </div>
  </div>

</template>
<script>
import Service from '../service'

export default {
  props: {
    drugId: Number
  },
  data() {
    return {
      imageList: []
    }
  },

  computed: {
    isCanUploadImg() {
      return 9 - this.imageList.length || 0
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const params = { ID: this.drugId }
      Service.GetImagesByCustDrug(params).then((res) => {
        if (res.data.list != '') this.imageList = res.data.list.split(',')
      })
    },

    uploadmanagementLicenseImg(file) {
      let _this = this
      let files = file.file
      let format = files.name.substring(files.name.lastIndexOf('.') + 1)
      let reader = new FileReader()
      reader.readAsDataURL(files) //将文件读取为 DataURL,也就是base64编码
      reader.onload = function (ev) {
        //文件读取成功完成时触发
        let dataURL = ev.target.result //获得文件读取成功后的DataURL,也就是base64编码
        let param = {
          ImgFormat: format,
          Base64: dataURL
        }
        Service.uploadImage(param)
          .then((res) => {
            _this.imageList.push(res.data.SignUrl)
            Peace.util.success(res.msg)
          })
          .finally(() => {})
      }
    },

    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isLt1M
    },
    deleteOne(index) {
      this.imageList.splice(index, 1)
    },

    onCancel() {
      this.$emit('onCancel')
    },

    onSave() {
      const params = { ID: this.drugId, DrugImages: this.imageList.join(',') }
      Service.SaveImagesByCustDrug(params).then((res) => {
        this.$emit('onSucess')
        Peace.util.success(res.msg)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px dashed #c0ccda;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.content-img {
  display: flex;
  flex-wrap: wrap;
}
.content-img-item {
  width: 33%;
  margin-top: 10px;
  position: relative;
}
.content-img-delete {
  position: absolute;
  width: 16px;
  height: 16px;
  right: 72px;
  top: -8px;
}
.bottom {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;

  .el-button {
    width: 150px;
    height: 40px;
  }
}
</style>
