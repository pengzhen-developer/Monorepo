<template>
  <div style="width: 100%">
    <template v-if="numPages">
      <pdf v-for="i in numPages"
           :key="i"
           :page="i"
           :src="pdfSrc"></pdf>
    </template>
  </div>
</template>



<script>
import pdf from 'vue-pdf'
export default {
  name: 'PDFViewer',
  components: {
    pdf
  },
  props: {
    urlStr: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      pdfSrc: '',
      numPages: undefined //  pdf 文件总页数
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getNumPages(this.urlStr)
    })
  },
  methods: {
    getNumPages(url) {
      var loadingTask = pdf.createLoadingTask(url)
      loadingTask.promise
        .then((pdf) => {
          this.pdfSrc = loadingTask
          this.numPages = pdf.numPages
        })
        .catch((err) => {
          console.error(`pdf加载失败${err}`)
        })
    }
  }
}
</script>
