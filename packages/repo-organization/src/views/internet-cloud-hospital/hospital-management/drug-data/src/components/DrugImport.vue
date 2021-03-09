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
             style="font-size: 48px; color: #3099A6;"
             v-if="isSuccess"></i>
          <i class="el-icon-warning-outline"
             style="font-size: 48px; color: #ED3B18;"
             v-if="!isSuccess"></i>
        </div>
        <div style="margin: 0 0 10px 0;">
          <h4>{{ isSuccess ? '上传成功' : '上传失败' }}</h4>
        </div>
        <div v-if="!isSuccess && failInfo.code == 203"
             style="margin: 0 0 40px 0;font-size: 12px;color: #999999;line-height:18px;text-align: left;">
          <div>一共{{ failInfo.data.total }}条错误</div>
          <div v-for="item in failList"
               :key="item">{{ item }}</div>
          <div v-if="failInfo.data.list.length > 5">...</div>
        </div>
        <div v-else
             style="margin: 0 0 40px 0;">
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
  name: 'DrugImport',
  props: {
    id: String
  },
  data() {
    return {
      done: false,
      isSuccess: false,
      failInfo: {
        code: '',
        data: ''
      },
      actions: `${process.env.VUE_APP_API_BASE}nethospital/hospital/v1/Drug/importDrug`,
      headers: {
        Authorization: ''
      },
      tipText: ''
    }
  },
  computed: {
    failList() {
      let list = this.failInfo.data.list
      if (list.length > 5) {
        return list.slice(0, 5)
      } else {
        return list
      }
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
        this.isSuccess = true
        const okCount = res.data.ok || 0
        const notOkCount = res.data.not || 0
        this.tipText = `文件上传成功，成功导入有效数据 ${okCount} 条，忽略无效数据 ${notOkCount} 条`
      } else {
        this.isSuccess = false
        this.failInfo.code = res.code
        this.failInfo.data = res.data
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
    }
    &__tip {
      text-align: center;
      color: #f1483f;
      margin: 8px;
    }
  }
}
.footer {
  text-align: center;
}
</style>
