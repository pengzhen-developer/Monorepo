<template>

  <div class="imports">
    <el-upload action=""
               :auto-upload="false"
               :multiple="false"
               :on-remove="onRemove"
               :on-change="onChange"
               :http-request="uploadFiles"
               accept=".xls, .xlsx"
               class="upload"
               drag
               :limit="1"
               ref="upload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text"
           v-if="!hasExceed">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__text"
           v-else>
        请点击下方导入按钮，开始导入药品数据
      </div>
      <div class="el-upload__tip"
           slot="tip">
        <template>
          <div>
            <p> {{ tipText }}</p>
            <p class="download"
               @click="download">模板下载</p>
          </div>
        </template>

      </div>
    </el-upload>
    <!-- 进度条 -->
    <div class="footer mt-md">
      <el-button @click="submit"
                 v-loading.fullscreen.lock="fullscreenLoading"
                 element-loading-text="服务器正在处理中"
                 type="primary">导入</el-button>
    </div>
  </div>
</template>
<script>
import Service from '../service'

export default {
  name: 'DrugImport',

  data() {
    return {
      tipText: '请按照模板格式上传 Excel 文件(.xls | .xlsx)',
      fullscreenLoading: false,
      canClick: false,
      hasExceed: false
    }
  },
  methods: {
    onChange(file, fileList) {
      if (file.status === 'ready' && fileList.length > 0) {
        this.canClick = true
      }
      if (fileList.length == 1) {
        this.hasExceed = true
      } else {
        this.hasExceed = false
      }
    },
    onRemove() {
      this.hasExceed = false
      this.fullscreenLoading = false
      this.canClick = false
    },
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    close() {
      this.$emit('close')
    },

    submit() {
      if (this.canClick) {
        this.fullscreenLoading = true
      }
      this.$refs.upload.submit()
    },

    /* 下载导入模板 */
    download() {
      this.$confirm('下载 <strong>药品批量修改编码模板<strong> ？', '文件下载', {
        dangerouslyUseHTMLString: true,
        type: 'info',
        closeOnClickModal: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_BASE}Template/UpdateBatchOrderCodeTemplate.xls`
        window.open(url, '_blank')
        this.$alert('', '药品批量修改编码模板获取成功！', {
          message: <div class="alert-text">若无法正常下载,请复制链接至其他浏览器重试{url}</div>
        })
      })
    },

    uploadFiles(file) {
      let files = file.file
      let format = files.name.substring(files.name.lastIndexOf('.') + 1)
      let reader = new FileReader()
      reader.readAsDataURL(files) //将文件读取为 DataURL,也就是base64编码
      reader.onload = (ev) => {
        //文件读取成功完成时触发
        let dataURL = ev.target.result //获得文件读取成功后的DataURL,也就是base64编码
        let param = {
          Format: format,
          Basic64: dataURL,
          billType: 14
        }
        Service.ImportExcelByZYY(param)
          .then((res) => {
            this.onSuccess(res)
          })
          .catch((res) => {
            Peace.util.error(res.data.msg)
            this.canClick = false
          })
          .finally(() => {
            this.clearFiles()
            this.fullscreenLoading = false
          })
      }
    },
    // 批量导入成功回调
    onSuccess(res) {
      if (res.code === 200 && res.success) {
        Peace.util.success(res.msg)
        this.$emit('onSucess')
      } else {
        this.tipText = res.msg
      }
      setTimeout(() => {
        this.fullscreenLoading = false
        this.canClick = false
      }, 300)
      this.clearFiles()
    }
  }
}
</script>
<style lang="scss" scoped>
.imports {
  margin: 20px 0;
  margin-bottom: 5px;
}
.el-select {
  width: 100%;
}
.info-row {
  margin: 10px 0;
}
.upload {
  ::v-deep .el-upload {
    width: 100%;
    &-dragger {
      width: 100%;
    }
    &__tip {
      text-align: center;
      color: #ff0000;
    }
  }
}
.footer {
  text-align: center;
  margin-top: 30px;
}
::v-deep .el-upload__tip {
  text-align: left !important;
}
.download {
  color: #3099a6;
}
::v-deep .el-notification {
  width: 500px !important;
}

.alert-text {
  word-break: break-all;
}
</style>
