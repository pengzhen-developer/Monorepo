<template>
  <div class="info">
    <div class="info-row">
      <div class="info-row-label">
        <span>患教标题</span>
      </div>
      <div class="info-row-content">
        <el-input maxlength="25"
                  placeholder="请输入患教标题"
                  v-model="article.title"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>疾病</span>
      </div>
      <div class="info-row-content">
        <el-input :maxlength="25"
                  placeholder="请输入疾病标签（疾病名称），最多25个字符"
                  v-model="article.diseaseTag"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>详细内容</span>
      </div>
      <div class="info-row-content"
           style="width: 500px; height: 446px;">
        <quill-editor :options="editorOption"
                      class="is-editor"
                      ref="Editor"
                      style="height: 400px;"
                      v-model="article.content"></quill-editor>
      </div>
    </div>
    <div class="inline-center">
      <el-button @click="cancel"
                 plain
                 type="primary">取消</el-button>
      <el-button :disabled="!article.content || !article.diseaseTag"
                 @click="submit"
                 type="primary">确定</el-button>
    </div>
  </div>
</template>
<script>
import peace from '@src/library'
import { Quill } from 'vue-quill-editor'
import { quillEditor } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
import { formatImgSrc } from './imageUtils'

export default {
  name: 'PatientEducationModel.vue',
  components: { quillEditor },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      article: {
        title: '',
        diseaseTag: '',
        content: ''
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [['bold', 'italic', 'underline'], [{ align: '' }, { align: 'center' }, { align: 'right' }], ['image']],
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        }
      }
    }
  },
  methods: {
    // 获取标题
    getTitle(content) {
      // IE、Firfox 不支持 ?<= 前置断言
      // return content.match(/(?<=<(\w+)>).*(?=<\/\1>)/g)[0]
      const parseToDom = (content) => {
        const element = document.createElement('div')
        element.innerHTML = content
        return element
      }

      return parseToDom(content).firstElementChild.innerHTML
    },

    // 删除内容中被提取的标题
    removeTitleInContent(title, content) {
      const parseToDom = (content) => {
        const element = document.createElement('div')
        element.innerHTML = content
        return element
      }

      const parentDom = parseToDom(content)
      if (title === parentDom.firstElementChild.innerHTML) {
        parentDom.removeChild(parentDom.firstElementChild)
        return parentDom.innerHTML
      }

      return parentDom.innerHTML
    },

    // 获取渲染的 HTML
    getTemplateByContent(data) {
      // 渲染 HTML 文件
      const template = `
      <!DOCTYPE html>
      <html>

      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="stylesheet" href="https://devpatient.hp.aijiayi.com/static/style/quill.snow.css?t=${new Date().getTime()}">
        <title>${data.title}</title>
      </head>
      <body class="ql-snow">
        <div style="padding: 12px 15px 3px 15px; font-size: 20px;">${data.title}</div>
        <div style="height: calc(100% - 43px);">
          <div class="ql-editor">${data.content}</div>
        </div>
      </body>
      </html>
      `
      return template
    },

    // base64 转换为
    replaceImageToLinks(content) {
      return formatImgSrc(content, peace.service.patient.uploadImage)
        .then((res) => {
          return Promise.resolve(res)
        })
        .catch(() => {
          this.loading = false
        })
    },

    submit() {
      const { id, title, diseaseTag } = this.article
      let content = this.article.content
      const params = {
        id,
        title,
        diseaseTag,
        content
      }

      this.replaceImageToLinks(content).then((res) => {
        content = res

        if (!title) {
          params.title = this.getTitle(content)
        } else {
          params.content = this.removeTitleInContent(title, content)
        }

        if (!params.content) {
          this.article.content = ''
          return this.$message.warning('请输入详细内容，标题和内容第一行不能相同！')
        }

        params.templateHtml = this.getTemplateByContent(params)

        if (id) {
          this.$emit('edit', params)
        } else {
          this.$emit('submit', params)
        }
      })
    },
    cancel() {
      this.$emit('close')
    }
  },
  created() {
    if (this.data) {
      const { title, content } = this.data
      this.article = Object.assign({}, this.data, {
        content: this.removeTitleInContent(title, content)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
  width: 100%;
}
.info-row {
  display: flex;
  margin-bottom: 10px;
  &-label,
  &-content {
    line-height: 28px;
    vertical-align: middle;
  }
  &-label {
    padding-right: 10px;
    width: 80px;
    text-align: justify;
    text-align-last: justify;
  }
  &-content {
    flex: 1;
  }
}
.inline-center {
  text-align: center;
}
.is-editor {
  ::v-depp img {
    max-width: 100% !important;
  }
}
</style>
