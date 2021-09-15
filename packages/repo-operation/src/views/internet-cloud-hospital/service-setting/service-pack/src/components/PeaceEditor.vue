<template>
  <div id='peace-editor'
       v-loading="loading">
    <el-upload class="peace-editor-uploader"
               :action="uploadUrl"
               :headers="headers"
               name="file"
               :accept="'image/jpg, image/jpeg, image/png, image/gif'"
               :show-file-list="false"
               :multiple="false"
               :before-upload="beforeUpload"
               :on-success="uploadSuccess"
               :on-error="uploadError">
    </el-upload>
    <quill-editor class="peace-quill-editor"
                  v-model="editorContent"
                  ref="customQuillEditor"
                  :options="editorOption">
    </quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

//自定义编辑器的工作条
const toolbarOptions = [
  ['image', 'link'],
  ['bold', 'italic', 'underline', 'strike']
]

export default {
  name: 'PeaceEditor',
  components: {
    quillEditor
  },
  model: {
    prop: 'content'
  },
  props: {
    content: String
  },
  data() {
    return {
      loading: false,
      uploadUrl: `${process.env.VUE_APP_API_BASE}nethospital/operate/Hospital/uploadCover`,
      headers: {
        Authorization: ''
      },
      editorContent: '',
      editorOption: {
        placeholder: '请输入',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector('#peace-editor .peace-editor-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  watch: {
    content(newVal) {
      this.editorContent = newVal
    },
    editorContent(newVal) {
      this.$emit('input', newVal)
    }
  },
  async mounted() {
    const token = (await Peace.identity.auth.getAuth()).access_token
    this.headers.Authorization = 'Bearer ' + token
    this.editorContent = this.content
  },
  methods: {
    beforeUpload(file) {
      this.loading = true
      let isImg = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let isLimitt5M = file.size / 1024 / 1024 < 5
      if (!isImg) {
        this.loading = false
        Peace.util.warning('图片只能是 jpg、jpeg、png、gif 格式')
        return false
      }
      if (!isLimitt5M) {
        this.loading = false
        Peace.util.warning('图片大小不能超过 5M ')
        return false
      }
      return true
    },
    uploadSuccess(res) {
      if (res.code === 200 && res.data) {
        // 获取富文本组件实例
        let quill = this.$refs.customQuillEditor.quill
        // 获取光标所在位置
        let index = quill.getSelection().index
        // 插入图片  res.data为服务器返回的图片地址
        quill.insertEmbed(index, 'image', res.data)
        // 调整光标到最后
        quill.setSelection(index + 1)
      } else {
        Peace.util.error('上传图片失败')
      }
      this.loading = false
    },
    uploadError() {
      Peace.util.error('上传图片失败')
      this.loading = false
    }
  }
}
</script>

<style scoped>
.peace-editor-uploader {
  display: none;
}
</style>