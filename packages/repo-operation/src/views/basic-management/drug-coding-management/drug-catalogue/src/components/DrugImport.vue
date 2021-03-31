<template>
  <div class="imports">
    <el-upload action=""
               :auto-upload="false"
               :multiple="false"
               :http-request="uploadFiles"
               :on-remove="onRemove"
               :on-change="onChange"
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
        <template v-if="!isErrorTip">
          <div>
            <p> {{ tipText }}</p>
            <p class="download"
               @click="download">模板下载</p>
          </div>
        </template>
        <template v-else>
          <div class="errorContent">
            <el-divider>药品编号重复数据如下:</el-divider>
            <div v-for="(item,index) in tipText"
                 :key="index">{{item}}</div>
            <el-divider>END</el-divider>
          </div>
        </template>
      </div>
    </el-upload>
    <div class="footer q-mt-md">
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
      isErrorTip: false,
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
          billType: 16
        }
        Service.uploadFiles(param)
          .then((res) => {
            this.onSuccess(res)
          })
          .catch((res) => {
            Peace.util.error(res.data.msg)
            this.canClick = false
            this.hasExceed = false
          })
          .finally(() => {
            this.clearFiles()
            this.fullscreenLoading = false
          })
      }
    },
    // 批量导入成功回调
    onSuccess(res) {
      this.isErrorTip = false
      if (res.code === 200 && res.success) {
        const okCount = res.data.ok || 0
        const notOkCount = res.data.not || 0
        this.tipText = `文件上传成功，成功导入有效数据 ${okCount} 条，忽略无效数据 ${notOkCount} 条`
      } else {
        this.tipText = res.msg
        if (res.code === 202) {
          this.isErrorTip = true
        }
      }
      setTimeout(() => {
        this.fullscreenLoading = false
        this.canClick = false
      }, 300)
      this.clearFiles()
    },
    // 批量导入失败回调
    onError() {
      this.tipText = '文件上传失败!'
      this.clearFiles()
    },
    submit() {
      if (this.canClick) {
        this.fullscreenLoading = true
      }
      this.$refs.upload.submit()
    },
    /* 下载导入模板 */
    download() {
      this.$confirm('下载 <strong>药品目录导入模板<strong> ？', '文件下载', {
        dangerouslyUseHTMLString: true,
        type: 'info',
        closeOnClickModal: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_BASE}psd/Template/DrugTemplate.xlsx`
        window.open(url, '_blank')
        this.$alert('', '药品目录导入模板获取成功！', {
          message: <div class="alert-text">若无法正常下载,请复制链接至其他浏览器重试{url}</div>
        })
      })
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
::v-deep .upload {
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
    }
    .el-upload__tip {
      text-align: center;
      color: #f56c6c;
    }
  }
}
.download {
  width: 15%;
  color: #3099a6;
  cursor: pointer;
}
.footer {
  text-align: center;
}
</style>
