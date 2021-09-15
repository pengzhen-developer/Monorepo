<template>
  <div class="ql-snow">
    <div style="padding: 12px 15px 3px 15px; font-size: 20px;"
         v-html="article.title"></div>
    <div style="padding: 0 15px 0 15px; font-size: 12px; color: #999;">疾病：{{ article.diseaseTag }}</div>
    <div class="ql-editor"
         v-html="article.content"></div>
  </div>
</template>
<script>
export default {
  name: 'PatientEducationPreview',
  props: {
    data: Object
  },
  data() {
    return {
      article: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
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
.ql-snow {
  margin: -10px;
}
// .title,
// .content {
//   color: #333;
// }
// .title {
//   font-size: 20px;
//   margin-bottom: 10px;
// }
// .content ::v-deep img {
//   max-width: 100%;
//   font-size: 14px;
// }
</style>
