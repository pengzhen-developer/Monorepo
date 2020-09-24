<template>

  <div class="imports">
    <el-upload :action="actions"
               :auto-upload="false"
               :headers="headers"
               :multiple="false"
               :on-error="onError"
               :on-success="onSuccess"
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
          {{ tipText }}
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
    <!-- 进度条 -->
    <div class="footer mt-sm">
      <el-button @click="submit"
                 v-loading.fullscreen.lock="fullscreenLoading"
                 element-loading-text="服务器正在处理中"
                 type="primary">导入</el-button>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/src/util/modules/user'

export default {
  name: 'DrugImport',
  props: {
    id: String
  },
  data() {
    return {
      actions: `${process.env.VUE_APP_BASE_API}/Drug/importDrug`,
      headers: {
        token: getUserInfo().token
      },
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
    close() {
      this.$emit('close')
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
}
</style>
