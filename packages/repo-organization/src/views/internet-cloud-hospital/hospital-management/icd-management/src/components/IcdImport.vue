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
        <!-- <i class="el-icon-upload"></i> -->
        <svg t="1602577362199"
             class="icon el-icon-upload"
             viewBox="0 0 1347 1024"
             version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="4117"
             width="48"
             height="48">
          <path d="M678.4 441.6l230.4 230.4-48 48-185.6-185.6-185.6 185.6L448 672l230.4-230.4z m-32 70.4h67.2v332.8h-67.2V512z m176 444.8c-60.8 0-112-51.2-112-112h-67.2c0 99.2 80 176 176 176l3.2-64z m275.2-464c3.2-22.4 6.4-44.8 6.4-67.2 0-236.8-192-425.6-425.6-425.6C448 0 262.4 182.4 252.8 406.4c-144 28.8-252.8 153.6-252.8 307.2C0 886.4 137.6 1024 310.4 1024h153.6v-67.2H310.4c-64 0-128-25.6-172.8-70.4-44.8-44.8-70.4-108.8-70.4-172.8 0-64 25.6-128 70.4-172.8 32-32 73.6-54.4 118.4-67.2 19.2-3.2 35.2-6.4 54.4-6.4h9.6v-41.6-22.4c6.4-86.4 41.6-169.6 105.6-230.4 67.2-67.2 156.8-105.6 252.8-105.6s185.6 38.4 252.8 105.6c67.2 67.2 105.6 156.8 105.6 252.8 0 22.4-3.2 48-6.4 70.4-6.4 25.6-12.8 51.2-22.4 73.6 22.4-9.6 44.8-12.8 70.4-12.8h6.4c51.2 0 99.2 22.4 137.6 57.6 38.4 38.4 57.6 89.6 57.6 140.8 0 54.4-22.4 102.4-57.6 140.8-38.4 38.4-89.6 57.6-140.8 57.6h-259.2V1024H1088c144-3.2 259.2-121.6 259.2-265.6-3.2-140.8-112-256-249.6-265.6z"
                fill="#333333"
                p-id="4118"></path>
        </svg>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip"
             slot="tip">请按照模板格式上传 Excel 文件</div>
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
             style="font-size: 48px; color: #3099A6;"
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
  name: 'IcdImport',
  data() {
    return {
      done: false,
      isSuccess: false,
      actions: `${process.env.VUE_APP_API_BASE}nethospital/hospital/v1/diagnose/importData`,
      headers: {
        Authorization: ''
      },
      tipText: ''
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

      if (res.code === 200) {
        // this.isSuccess = true
        // const okCount = res.data.excel_info.ok || 0
        // const notOkCount = res.data.excel_info.not || 0
        // this.tipText = `文件上传成功，成功导入有效数据 ${okCount} 条，忽略无效数据 ${notOkCount} 条`
        this.isSuccess = true
        this.tipText = res.msg
        this.$emit('refresh')
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
      background-color: #f7f7f7;
    }
    &__tip {
      text-align: left;
      color: #ff4609;
    }
  }
}
.footer {
  text-align: center;
}
</style>
