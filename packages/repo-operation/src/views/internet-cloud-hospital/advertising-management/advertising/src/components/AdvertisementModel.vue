<template>
  <div class="advertisement">
    <div class="info-row"
         v-if="detail.id">
      <div class="info-row-label">
        <span>广告ID</span>
      </div>
      <div class="info-row-content">
        <el-input disabled
                  v-model="detail.id"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>广告名称</span>
      </div>
      <div class="info-row-content">
        <el-input v-model="detail.name"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>属性</span>
      </div>
      <div class="info-row-content">
        <el-select v-model="detail.attribute">
          <el-option :key="item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in displayAttrs"></el-option>
        </el-select>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>展示位置</span>
      </div>
      <div class="info-row-content">
        <el-select v-model="detail.displayPosition">
          <el-option :key="item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in displayPositions"></el-option>
        </el-select>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>功能</span>
      </div>
      <div class="info-row-content">
        <el-select v-model="detail.usefulness">
          <el-option :key="item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in features"></el-option>
        </el-select>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>生效时间</span>
      </div>
      <div class="info-row-content">
        <el-date-picker format="yyyy-MM-dd HH:mm"
                        placeholder="选择日期时间"
                        type="datetime"
                        v-model="detail.startTime"
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>失效时间</span>
      </div>
      <div class="info-row-content">
        <el-date-picker format="yyyy-MM-dd HH:mm"
                        placeholder="选择日期时间（不选即长期有效）"
                        type="datetime"
                        v-model="detail.endTime"
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>广告图片</span>
      </div>
      <div class="info-row-content">
        <div>
          <el-button @click="openImagesDialog"
                     class="p-none"
                     type="text"
                     v-if="!detail.imgUrl">选择图片</el-button>
          <el-button @click="openImagesDialog"
                     class="p-none"
                     type="text"
                     v-else>重新选择图片</el-button>
        </div>
        <div v-if="detail.imgUrl">
          <PreviewImg :src="baseUrl + detail.imgUrl"
                      class="select-icon" />
        </div>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>关联内容</span>
      </div>
      <div class="info-row-content">
        <el-button @click="openAssociatedContentDialog"
                   class="p-none"
                   type="text"
                   v-if="!detail.contentId">选择关联内容</el-button>
        <div @click="openAssociatedContentDialog"
             class="p-none cursor-pointer"
             type="text"
             v-else
             style="color:var(--q-color-primary);font-weight:500">{{ detail.content || '重新选择关联内容' }}</div>
      </div>
    </div>
    <div class="text-center">
      <el-button @click="submit"
                 type="primary">保存</el-button>
    </div>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="imagesDialogVisible"
                  append-to-body
                  title="广告图片"
                  v-if="imagesDialogVisible"
                  width="400px">
      <ImagesSelector :default-usage="3"
                      @close="closeImagesDialog"
                      @getSelected="getSelectedImage">
        <span class="tips"
              slot="tips">* 建议选择 1035*315 相同比例图片，以保证显示效果！</span>
      </ImagesSelector>
    </peace-dialog>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="AssociatedContentDialogVisible"
                  append-to-body
                  title="关联内容"
                  v-if="AssociatedContentDialogVisible"
                  width="600px">
      <AdvertisementAssociatedContent :list="associatedContents"
                                      @submit="getSelectedAssociatedContent" />
    </peace-dialog>
  </div>
</template>
<script>
import AdvertisementService from '../service'
import CONSTANT from '../constant'
import ImagesSelector from './ImagesSelector.vue'
import AdvertisementAssociatedContent from './AdvertisementAssociatedContent'
import PreviewImg from './PreviewImg'

export default {
  name: 'AdvertisementModels',
  components: { ImagesSelector, AdvertisementAssociatedContent, PreviewImg },
  props: {
    info: Object
  },
  data() {
    return {
      CONSTANT,
      baseUrl: process.env.VUE_APP_API_BASE + 'nethospital/',
      detail: Object.assign({}, this.info),
      imageList: [],
      imagesDialogVisible: false,
      associatedContents: [],
      AssociatedContentDialogVisible: false
    }
  },
  computed: {
    displayAttrs() {
      return CONSTANT.DisplayAttr
    },
    displayPosition() {
      return this.detail.displayPosition
    },
    displayPositions() {
      return CONSTANT.AdvertisementPosition
    },
    features() {
      return CONSTANT.AdvertisementFeature
    }
  },
  watch: {
    'detail.displayPosition'() {
      this.detail.content = ''
      this.detail.contentId = ''
    }
  },
  methods: {
    // 打开图片列表
    openImagesDialog() {
      this.imagesDialogVisible = true
    },
    // 关闭图片列表
    closeImagesDialog() {
      this.imagesDialogVisible = false
    },
    // 获取选择的图片
    getSelectedImage(params) {
      this.detail.imgUrl = params.imageUrl
      this.closeImagesDialog()
    },
    // 获取关联内容
    getAssociatedContents() {
      const displayPosition = this.displayPosition

      return AdvertisementService.getAssociatedContentList({ displayPosition }).then((res) => {
        const data = res.data
        if (!data.list || !data.list.length) return []
        return Promise.resolve(data.list)
      })
    },
    // 打开关联内容列表
    openAssociatedContentDialog() {
      this.getAssociatedContents()
        .then((list) => {
          this.associatedContents = list
          this.AssociatedContentDialogVisible = true
        })
        .catch((msg) => {
          this.$message.warning(msg)
        })
    },
    // 关闭关联内容列表
    closeAssociatedContentDialog() {
      this.AssociatedContentDialogVisible = false
    },
    // 获取选中的关联内容
    getSelectedAssociatedContent(params) {
      this.detail.content = params.title
      this.detail.contentId = params.id
      this.closeAssociatedContentDialog()
    },
    // 提交广告内容
    submit() {
      const params = this.detail

      if (params.startTime >= params.endTime) {
        return this.$message.warning('失效时间须晚于生效时间，不填即长期有效！')
      }

      if (this.detail.id) {
        this.$emit('update', params)
      } else {
        this.$emit('create', params)
      }
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
.tips {
  font-size: 12px;
  display: inline-block;
  transform: scale(0.8, 0.8);
}
.info-row {
  font-size: 0;
  display: flex;
  &-label,
  &-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  &-label {
    color: #778899;
    white-space: nowrap;
    & > span {
      width: 4.3em;
      text-align: right;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      display: inline-block;
    }
    &.t-6 > span {
      width: 6em;
    }
    &.t-6 + .info-row-content {
      width: calc(100% - 7em);
    }
    &.t-7 > span {
      width: 7em;
    }
    &.t-7 + .info-row-content {
      width: calc(100% - 8em);
    }
    &:after {
      content: '：';
    }
  }
  &-content {
    padding-left: 2px;
    width: calc(100% - 1em - 4.3em);
    font-weight: bold;
    word-break: break-all;
    color: #23313f;
    & > img {
      height: 20px;
      display: block;
    }
  }
  &.two-cols {
    .info-row-label.t-6 + .info-row-content {
      width: calc(50% - 7em);
    }
    .info-row-content {
      width: calc(50% - 1em - 4.3em);
    }
  }
}
.advertisement {
  padding: 20px 40px;
  .info-row {
    margin-bottom: 15px;
    &-label {
      &:after {
        display: none;
      }
    }
    &-content {
      padding-left: 20px;
    }
  }
  .select-icon {
    height: 60px;
    display: inline-block;
  }
}
::v-deep .el-select {
  width: 100%;
}
::v-deep .el-input {
  width: 100%;
}
</style>
