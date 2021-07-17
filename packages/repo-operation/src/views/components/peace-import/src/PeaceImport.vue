<template>
  <div class="imports">

    <el-form label-width="auto"
             label-position="left">
      <el-form-item class="step">
        <Steps v-bind:list='stepsData.list'
               v-bind:active="stepsData.active"></Steps>
      </el-form-item>

      <el-form-item class="updata">
        <template v-if="stepsData.active===0">

          <el-button @click="download"
                     v-if="templateDownloadUrl"
                     icon="el-icon-download"> 模板下载</el-button>
          <el-upload :action="actions"
                     :auto-upload="false"
                     :headers="headers"
                     :limit="1"
                     :multiple="false"
                     :on-error="onError"
                     :on-success="onSuccess"
                     :before-upload="beforeUpload"
                     accept=".xls, .xlsx"
                     class="upload"
                     drag
                     ref="upload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或 <em>点击上传</em>
              <p class="el-upload-tips">请按照模板格式上传 Excel 文件(.xls | .xlsx)，且文件大小不得超过{{max}}M</p>
            </div>
          </el-upload>

        </template>

        <template v-else-if="stepsData.active===1">
          <div class="import-error">
            <div class="import-error-title">
              <i class="import-error-icon el-icon-error"></i>
              <span>校验数据</span>
            </div>
            <span class="import-error-tips">{{errorTipText}}</span>
            <el-button type="text"
                       v-if="havePaper"
                       @click="downloadPaper"
                       class="import-error-download">下载错误报告</el-button>
          </div>
        </template>

        <template v-else>
          <div class="import-success">
            <i class="improt-success-icon el-icon-success"></i>
            <span class="import-success-text">数据导入成功</span>
            <span class="import-success-text-tips">{{ successTipText }}</span>

          </div>
        </template>

      </el-form-item>

      <el-form-item class="bottom">
        <el-button @click="close"
                   v-if="stepsData.active===0 || stepsData.active===1"
                   type="default">取消</el-button>
        <el-button @click="next"
                   v-if="stepsData.active===0 "
                   type="primary">下一步</el-button>
        <el-button @click="upAgain"
                   v-if="stepsData.active===1 "
                   type="primary">重新上传</el-button>
        <el-button @click="upSuccess"
                   v-if="stepsData.active===2 "
                   type="primary">完成</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import Steps from '@views/components/peace-steps'

export default {
  name: 'PeaceImport',

  props: {
    actions: String,
    templateDownloadUrl: String,
    templateName: String,
    maxSize: Number,
    stepsDataInput: Object
  },

  components: { Steps },

  data() {
    return {
      done: false,
      headers: {
        Authorization: ''
      },
      errorTipText: '',
      successTipText: '',
      havePaper: false,
      paperUrl: '',
      max: 5,
      stepsData: {
        active: 0,
        list: [
          {
            title: '导入数据',
            content: '请上传指定格式文件'
          },
          {
            title: '数据检验',
            content: '检查数据格式是否正确'
          },
          {
            title: '写入数据',
            content: '正在执行写入数据'
          }
        ]
      }
    }
  },

  watch: {
    stepsDataInput: {
      handler() {
        if (typeof this.stepsDataInput == 'object') {
          this.stepsData = Object.assign({}, this.stepsDataInput)
        }
      },
      immediate: true
    },
    maxSize: {
      handler() {
        if (this.maxSize > 0) {
          this.max = this.maxSize
        }
      },
      immediate: true
    }
  },

  async mounted() {
    const token = (await Peace.identity.auth.getAuth()).access_token
    this.headers.Authorization = 'Bearer ' + token
  },
  methods: {
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    close() {
      this.$emit('close')
    },
    // 批量导入成功回调
    onSuccess(res) {
      this.done = true
      if (res.code === 200 && res.success) {
        this.stepsData.active = 2
        this.successTipText = res.msg
      } else if (res.code == 203) {
        this.stepsData.active = 1
        this.errorTipText = res.msg
        this.havePaper = true
        this.paperUrl = res.data.url
      } else {
        this.stepsData.active = 1
        this.errorTipText = res.msg
        this.havePaper = false
      }
      this.clearFiles()
    },
    // 批量导入失败回调
    onError() {
      this.errorTipText = '文件上传失败!'
      this.clearFiles()
    },
    //下一步
    next() {
      this.$refs.upload.submit()
    },
    //重新上传
    upAgain() {
      this.stepsData.active = 0
    },
    //完成
    upSuccess() {
      this.$emit('success')
    },
    //下载报告
    downloadPaper() {
      this.$confirm('下载 <strong>错误报告<strong> ？', '文件下载', {
        dangerouslyUseHTMLString: true,
        type: 'info',
        closeOnClickModal: false
      }).then(() => {
        const url = this.paperUrl
        window.open(url, '_blank')
        this.$alert('', '错误报告获取成功！', {
          message: <div class="alert-text">若无法正常下载,请复制链接至其他浏览器重试{url}</div>
        })
      })
    },

    /* 下载导入模板 */
    download() {
      this.$confirm(`下载 <strong>${this.templateName}模板<strong> ？`, '文件下载', {
        dangerouslyUseHTMLString: true,
        type: 'info',
        closeOnClickModal: false
      }).then(() => {
        const url = this.templateDownloadUrl
        window.open(url, '_blank')
        this.$alert('', `${this.templateName}模板获取成功！`, {
          message: <div class="alert-text">若无法正常下载,请复制链接至其他浏览器重试{url}</div>
        })
      })
    },

    // 校验上传文件
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.max

      if (!isLt2M) {
        this.$message.error(`上传文件大小不能超过${this.max}M`)
      }
      return isLt2M
    }
  }
}
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.info-row {
  margin: 10px 0;
}
.upload {
  margin-top: 16px;

  ::v-deep .el-upload {
    width: 100%;
    &-dragger {
      width: 100%;
    }
    &__tip {
      text-align: center;
      color: #ff3a30;
    }
  }
}
.footer {
  text-align: center;
}

.step {
  padding: 0px 20px 20px;
}
.updata {
  padding: 0px 20px;
}
.bottom {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0 !important;
  padding-top: 24px;
}

.el-upload-tips {
  line-height: 0px;
  font-size: 12px;
  padding-top: 6px;
  color: rgba(51, 51, 51, 0.4);
}
.import-error {
  background: #fff5f4;
  border: 1px solid #ffb0ac;
  padding: 16px;
  display: flex;
  font-size: 14px;
  align-items: flex-start;
  flex-direction: column;

  .import-error-title {
    display: flex;
    font-size: 16px;
    color: #333;
    font-weight: 500;
    align-items: center;

    .import-error-icon {
      margin: 0 10px 0 0;
      color: #ff4d4f;
    }
  }

  .import-error-tips {
    color: #858585;
    margin: 0px 0px 0px 26px;
  }
  .import-error-download {
    margin: 10px 0px 0px 26px;
  }
}
.import-success {
  display: flex;
  flex-direction: column;
  align-items: center;

  .improt-success-icon {
    font-size: 50px;
    color: #3099a6;
    margin: 20px 0px 0px;
  }
  .import-success-text {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin: 16px 0px 0px;
  }
  .import-success-text-tips {
    font-size: 14px;
    color: rgba(51, 51, 51, 0.6);
  }
}

.alert-text {
  word-break: break-all;
}
</style>