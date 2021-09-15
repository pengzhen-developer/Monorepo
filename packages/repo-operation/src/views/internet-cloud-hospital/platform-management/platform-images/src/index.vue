<template>
  <div class="image-list">
    <div class="content">
      <div class="content-hd">
        <el-button @click="openUploadDialog"
                   type="primary">新增</el-button>
        <el-select @change="getImages(1)"
                   class="q-ml-lg"
                   v-model="search.usage">
          <el-option :value="0"
                     label="全部"></el-option>
          <el-option :key="item.label"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in options"></el-option>
        </el-select>
      </div>
      <div class="list">
        <div :key="item.id"
             class="img-item"
             v-for="item in list">

          <el-image class="preview-img"
                    :src="imageSrc(item.imageUrl)"
                    fit="scale-down"
                    :preview-src-list="[imageSrc(item.imageUrl)]">
          </el-image>
          <p :title="item.imageName"
             class="image-name">{{ item.imageName }}</p>
        </div>
      </div>
      <el-pagination :current-page.sync="search.pageNumber"
                     :page-size.sync="search.pageSize"
                     :page-sizes="[12, 24, 48, 96, 120]"
                     :total="count"
                     @current-change="getImages"
                     @size-change="getImages(1)"
                     background
                     layout="total, sizes ,->, prev, pager,  next"></el-pagination>
    </div>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="uploadDialogVisible"
                  title="上传图片"
                  v-if="uploadDialogVisible"
                  append-to-body
                  width="400px">
      <UploadImages @upload="upload" />
    </peace-dialog>
  </div>
</template>
<script>
import UploadImages from './components/UploadImages'
import Service from './service/index'

export default {
  name: 'ImageList',
  data() {
    return {
      search: {
        name: '',
        usage: 0,
        pageNumber: 1,
        pageSize: 24
      },
      list: [],
      count: 0,
      uploadDialogVisible: false,
      options: [
        { value: 1, label: '其他' },
        { value: 2, label: '平台科室' },
        { value: 3, label: '广告图片' }
      ]
    }
  },
  components: { UploadImages },
  methods: {
    // 获取图片列表
    getImages(number) {
      if (number && this.search.pageNumber !== number) {
        this.search.pageNumber = number
      }

      const { name, usage, pageNumber, pageSize } = this.search

      Service.getImages(name, usage, pageNumber, pageSize).then((res) => {
        const data = res.data
        this.list = data.list
        this.count = data.total
      })
    },
    // 打开上传 Dialog
    openUploadDialog() {
      this.uploadDialogVisible = true
    },
    // 关闭上传 Dialog
    closeUploadDialog() {
      this.uploadDialogVisible = false
    },
    // 上传
    upload(params) {
      const _file = params.files
      const usageScenarios = params.usage
      const file = new FormData()

      file.append('usageScenarios', usageScenarios)

      for (let [i, len] = [0, _file.length]; i < len; i += 1) {
        file.append(`file[${i}]`, _file[i])
      }

      Service.uploadImage(file).then((res) => {
        const msg = res.msg || '图片上传成功！'
        Peace.util.success(msg)
        this.getImages(1)
        this.uploadDialogVisible = false
      })
    },

    imageSrc(path) {
      return `${process.env.VUE_APP_API_BASE}nethospital${path}`
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getImages()
    })
  }
}
</script>
<style lang="scss" scoped>
.container .main.image-list {
  margin: 0;
  padding: 0;
  background-color: #f1f2f7;
}
.content {
  position: relative;
  margin: 0;
  padding: 30px 30px 80px;
  height: calc(100vh - 120px);
  background: transparent;
  .list {
    margin-left: -10px;
    margin-right: -10px;
    padding-top: 15px;
    height: calc(100% - 25px);
    overflow: auto;
  }
}
.img-item {
  margin: 10px;
  padding: 15px 10px 4px;
  width: 140px;
  height: 100px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
  display: inline-block;
  .preview-img {
    max-width: 100%;
    height: 50px;
    overflow: hidden;
    & > img {
      width: auto;
    }
  }
  .image-name {
    margin-top: 7px;
    font-size: 12px;
    line-height: 17px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.el-pagination {
  position: absolute;
  width: calc(100% - 60px);
  bottom: 30px;
}
</style>
