<template>
  <div class="main main-sso">
    <div @click="goBack"
         class="preview-btn"
         v-if="isPreview"></div>
    <div class="preview ql-snow">
      <div class="ql-editor"
           v-html="advertisement.content"></div>
    </div>
    <div class="editing"
         ref="editor"
         v-if="!isPreview">
      <div class="info-row">
        <div class="info-row-label">
          <span>标题</span>
        </div>
        <div class="info-row-content">
          <el-input placeholder="选填，不选默认第一行内容为标题"
                    v-model="advertisement.title"></el-input>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>标签</span>
        </div>
        <div class="info-row-content">
          <el-input :maxlength="25"
                    placeholder="展示为患教内容时必填，最多25个字符"
                    ref="tag"
                    v-model="advertisement.sonTitle"></el-input>
        </div>
      </div>
      <div class="template">
        <el-dropdown @command="handleCommand"
                     size="medium"
                     trigger="click">
          <span class="el-dropdown-link">
            标题
            <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="h1">一级标题</el-dropdown-item>
            <el-dropdown-item command="h2">二级标题</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand"
                     size="medium"
                     trigger="click">
          <span class="el-dropdown-link">
            图片
            <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="image">直角图片</el-dropdown-item>
            <el-dropdown-item command="image-round">圆角图片</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand"
                     size="medium"
                     trigger="click">
          <span class="el-dropdown-link">
            文本
            <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="text">普通文本</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <quillEditor :options="editorOption"
                   class="is-editor"
                   ref="Editor"
                   v-model="advertisement.content"></quillEditor>

      <div class="inline-center btn">
        <div class="q-mb-md">
          <span>展示位置：</span>
          <el-checkbox-group inline
                             v-model="advertisement.displayPosition">
            <el-checkbox :label="2">医生端App</el-checkbox>
            <el-checkbox :label="3">患者端小程序</el-checkbox>
            <el-checkbox :label="4">患教内容</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button :disabled="!advertisement.content || !advertisement.displayPosition.length"
                   @click="submit"
                   type="primary">保存</el-button>
        <el-button @click="goBack"
                   plain
                   type="primary">取消</el-button>
      </div>
    </div>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="imageDialogVisible"
                  append-to-body
                  title="选择图片"
                  v-if="imageDialogVisible"
                  width="400px">
      <ImagesSelector :default-usage="3"
                      @close="closeImageDialog"
                      @getSelected="insertImage" />
    </peace-dialog>
  </div>
</template>
<script>
import Service from '../service/index'
import ImagesSelector from '../../../platform-department/src/components/ImagesSelector'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { Quill, quillEditor } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'AdvertisementContentModel',
  props: {
    id: String,
    preView: String
  },
  components: { ImagesSelector, quillEditor },
  data() {
    return {
      currentImageStyle: '',
      advertisement: {
        id: 0,
        title: '',
        sonTitle: '',
        content: '',
        displayPosition: [2]
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: '' }, { align: 'center' }, { align: 'right' }]
          ],
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
      },
      imageList: [],
      imageDialogVisible: false
    }
  },

  mounted() {
    this.advertisement = {
      id: 0,
      title: '',
      subTitle: '',
      content: '',
      displayPosition: [2]
    }
    if (this.preView !== 'create') {
      this.getContent(this.id)
    }
  },
  computed: {
    isPreview() {
      return this.preView === 'preview'
    }
  },
  methods: {
    // 触发生成事件
    handleCommand(command) {
      let text = ''
      switch (command) {
        case 'h1':
          text = '<h1>请输入一级标题内容</h1>'
          break
        case 'h2':
          text = '<h2>请输入二级标题内容</h2>'
          break
        case 'image':
          this.openImageDialog('image')
          break
        case 'image-round':
          this.openImageDialog('image-round')
          break
        case 'text':
          text = '<p>请输入正文内容</p>'
          break
      }
      this.advertisement.content += text
    },
    // 打开图片选择器 Dialog
    openImageDialog(style) {
      this.currentImageStyle = style
      this.imageDialogVisible = true
    },
    // 关闭图片选择器 Dialog
    closeImageDialog() {
      this.imageDialogVisible = false
    },
    // 插入图片
    insertImage(params) {
      this.closeImageDialog()
      const imageUrl = params.imageUrl
      const isRound = this.currentImageStyle === 'image-round'
      let text = ''
      let imagPath = this.imageSrc(imageUrl)
      if (!isRound) {
        text = `<p><strong><img src=${imagPath} style="width: 100%;" alt=""><strong></p>`
      } else {
        text = `<p><img src=${imagPath} style="width: 100%;" alt=""></p>`
      }
      this.advertisement.content += text
    },
    getContent(id) {
      Service.getContentById(id).then((res) => {
        const data = res.data.info
        if (this.getTitle(data.content) === data.title) {
          data.title = ''
        }
        this.advertisement = Object.assign(data, {
          displayPosition: data.displayPosition === '1' ? [2, 3, 4] : this.getDisplayPosition(data.displayPosition)
        })
      })
    },
    getDisplayPosition(data) {
      return data.split(',').map((v) => parseInt(v))
    },
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
    submit() {
      const id = this.advertisement.id || undefined
      const content = this.advertisement.content
      const title = this.advertisement.title || this.getTitle(content)
      const sonTitle = this.advertisement.sonTitle
      const currentDisplayPosition = this.advertisement.displayPosition
      const displayPosition = JSON.stringify(currentDisplayPosition)

      if (displayPosition.includes(4) && !sonTitle) {
        this.$message.warning('展示为患教内容时，需要填写标签！')
        return this.$refs.tag.focus()
      }

      // 渲染 HTML 文件
      const templateHtml = `
      <!DOCTYPE html>
      <html>

      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>${title}</title>
      </head>
      <body class="ql-snow"><div class="ql-editor">${content}</div></body>
      </html>
      `

      if (!id) {
        Service.createContent({ title, sonTitle, content, templateHtml, displayPosition }).then((res) => {
          const msg = res.msg || '内容新增成功'
          Peace.util.success(msg)
          this.goBack()
        })
      } else {
        Service.updateContent({ id, title, sonTitle, content, templateHtml, displayPosition }).then((res) => {
          const msg = res.msg || '内容编辑成功'
          Peace.util.success(msg)
          this.goBack()
        })
      }
    },
    goBack() {
      this.$emit('close')
    },
    imageSrc(path) {
      return `${process.env.VUE_APP_API_BASE}nethospital${path}`
    }
  }
}

</script>
<style lang="scss" scoped>
.info-row {
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  &-label {
    color: #606266;
    &:after {
      display: none;
    }
  }
  &-content {
    flex: 1;
    padding-left: 20px;
  }
}
// 布局样式
.main {
  height: calc(100vh - 140px);
  position: relative;
  white-space: nowrap;
  text-align: center;
  margin: 10px;
  .preview,
  .editing {
    position: relative;
    margin: 0 10px;
    height: 100%;
    text-align: left;
    font-size: 1rem;
    background-color: #fff;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
  }
  .btn {
    padding-top: 10px;
    position: absolute;
    width: 100%;
    bottom: 15px;
  }
}
.preview {
  position: relative;
  margin-left: -55px !important;
  margin-right: -55px !important;
  width: 575px;
  overflow-y: auto;
  border: 100px solid transparent;
  border-image: url('../assets/images/border-phone@1x.png') 111 round;
  background-clip: content-box;
}
.preview-btn {
  position: absolute;
  width: 52px;
  height: 51px;
  border-radius: 100%;
  bottom: 30px;
  left: calc(50% - 25.5px);
  background: transparent;
  cursor: pointer;
  z-index: 100;
  &:after {
    content: '返回';
    line-height: 51px;
    text-align: center;
    font-size: 14px;
    color: var(--q-color-primary);
    display: inline-block;
    opacity: 0.5;
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
}
.editing {
  width: calc(100% - 475px);
  .template {
    padding: 18px 0;
    width: 100%;
    height: 50px;
  }
}
.inline-center {
  padding: 0 20px;
  & > div {
    text-align: left;
  }
}
.el-dropdown {
  padding: 0 20px;
  border-right: 1px solid #eee;
  &-link {
    line-height: 14px;
    color: inherit;
    .el-icon-arrow-down {
      margin-left: 5px;
    }
  }
}
.el-checkbox-group {
  margin-left: 14px;
  display: inline-block;
}
</style>
<style lang="scss">
// 编辑器使用的样式
.is-editor.quill-editor {
  width: 100%;
  height: calc(100% - 300px);
  border-top: 10px solid #f1f2f7;
  .ql-editor {
    padding: 20px 30px 20px 30px;
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    img {
      &:hover {
        outline: 1px dashed #ccc;
      }
    }
  }
  .ql-container.ql-snow {
    border: 0;
    border-bottom: 1px solid #ddd;
  }
  .ql-toolbar.ql-snow {
    border: 0;
    border-bottom: 1px solid #ddd;
    .ql-formats {
      margin-right: 0;
      padding: 0 10px;
      &:after {
        position: relative;
        right: -10px;
        content: '';
        margin-top: 4px;
        height: 16px;
        width: 1px;
        background-color: #ddd;
        display: inline-block;
      }
      &:last-of-type:after {
        display: none;
      }
    }
    .ql-stroke {
      stroke: #666;
    }
  }
}
</style>
