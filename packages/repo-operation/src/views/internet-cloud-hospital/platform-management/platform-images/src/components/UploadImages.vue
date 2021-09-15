<template>
  <div class="inline-center">
    <div class="q-mb-sm" style="text-align: left;">
      <span class="label q-mr-sm">使用场景</span>
      <el-select v-model="usage">
        <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-upload
        ref="upload"
        :auto-upload="false"
        :limit="20"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        action="string"
        drag
        list-type="picture"
        multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击选取图片</em>
      </div>
    </el-upload>
    <el-button
        :disabled="!fileList.length"
        class="q-mt-sm"
        type="primary"
        @click="upload">
      上传
    </el-button>
  </div>
</template>
<script>

export default {
  name: 'UploadImages',
  data() {
    return {
      fileList: [],
      usage: 1,
      options: [
        {value: 1, label: '其他'},
        {value: 2, label: '平台科室'},
        {value: 3, label: '广告图片'}
      ]
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.map(item => {
        return item.raw
      })
    },
    handleExceed() {
      this.$message.error('选择的文件数量超过限制，一次最多上传 20 个')
    },
    upload() {
      const params = {
        files: this.fileList,
        usage: this.usage
      }
      this.$emit('upload', params)
    }
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.error {
  color: red;

  &:before {
    content: '* ';
  }
}

::v-deep.el-upload {
  &--picture,
  &-list {
    display: inline-block;
    vertical-align: top;
  }

  &-list {
    margin-top: 10px;
    width: 360px;
    max-height: 210px;
    overflow-y: auto;

    &__item-name {
      margin-right: 0;
      text-align: left;
    }
  }
}
</style>
