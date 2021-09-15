<template>
  <div class="imports">
    <template v-if="!done">
      <el-upload :action="actions"
                 :auto-upload="false"
                 :headers="headers"
                 :limit="1"
                 :multiple="false"
                 :on-error="onError"
                 :on-success="onSuccess"
                 accept=".xls, .xlsx"
                 class="upload"
                 drag
                 ref="upload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip"
             slot="tip">请按照模板格式上传 Excel 文件(.xls | .xlsx)</div>
      </el-upload>
      <div class="footer mt-sm">
        <el-button @click="submit"
                   type="primary">导入</el-button>
      </div>
    </template>
    <template v-if="done">
      <div style="text-align: center;">
        <div style="margin: 0 0 10px 0;">
          <i class="el-icon-circle-check"
             style="font-size: 48px; color: #3099a6;"
             v-if="isSuccess"></i>
          <i class="el-icon-warning-outline"
             style="font-size: 48px; color: #ED3B18;"
             v-if="!isSuccess"></i>
        </div>
        <div style="margin: 0 0 10px 0;">
          <h4>{{ isSuccess ? '上传成功' : '上传失败' }}</h4>
        </div>
        <div style="margin: 0 0 40px 0;">
          <span style="color: #999999; font-size: 12px;">{{ tipText }}</span>
        </div>
        <div>
          <el-button @click="done = false"
                     type="primary">{{ isSuccess ? '继续导入' : '重新导入' }}</el-button>
        </div>
        <div v-if="isSuccess">
          <el-button @click="close"
                     style="color: black;"
                     type="text">完成</el-button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'DoctorImport',
  data() {
    return {
      done: false,
      isSuccess: false,
      actions: '',
      headers: {
        Authorization: ''
      },
      tipText: ''
    }
  },
  async mounted() {
    this.actions = `${process.env.VUE_APP_API_BASE}nethospital/operate/Doctor/importDoctor`
    this.headers.Authorization = 'Bearer ' + (await Peace.identity.auth.getAuth()).access_token
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
        this.isSuccess = true
        const okCount = res.data.ok || 0
        const notOkCount = res.data.not || 0
        this.tipText = `文件上传成功，成功导入有效数据 ${okCount} 条，忽略无效数据 ${notOkCount} 条`
      } else {
        this.isSuccess = false
        this.tipText = res.msg
      }
      this.clearFiles()
    },
    // 批量导入失败回调
    onError() {
      this.tipText = '文件上传失败!'
      this.clearFiles()
    },
    submit() {
      this.$refs.upload.submit()
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
    &-dragger {
      width: 100%;
    }
    &__tip {
      text-align: center;
      color: #f56c6c;
    }
  }
}
.footer {
  text-align: center;
}
</style>
