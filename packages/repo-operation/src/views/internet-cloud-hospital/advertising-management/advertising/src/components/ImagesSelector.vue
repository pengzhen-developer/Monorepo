<template>
  <div>
    <div class="hd">
      <span class="tips"
            v-if="!imageList.length">暂无此类别图片，请先上传图片至平台图库！</span>
      <el-select @change="getImageList()"
                 class="ml-lg"
                 v-model="usage">
        <el-option :value="0"
                   label="全部"></el-option>
        <el-option :key="item.label"
                   :label="item.label"
                   :value="item.value"
                   v-for="item in options"></el-option>
      </el-select>
    </div>
    <div class="icon">
      <div :key="icon.id"
           class="icon-item"
           v-for="icon in imageList">
        <img :class="{'actived': icon.isSelected}"
             :src="baseUrl + icon[imageKey]"
             @click="selected(icon)" />
      </div>
    </div>
    <div class="text-center mb-sm">
      <slot class="tips"
            name="tips"></slot>
      <el-button :disabled="!selectedItem"
                 @click="saved"
                 type="primary">确定</el-button>
    </div>
  </div>
</template>
<script>
import PlatformService from '../service'
import CONSTANT from '../constant'

export default {
  name: 'DepartmentIcons',
  props: {
    defaultUsage: {
      type: Number,
      default: 0
    },
    imageKey: {
      type: String,
      default: 'imageUrl'
    }
  },
  data() {
    return {
      imageList: [],
      usage: this.defaultUsage,
      options: CONSTANT.ImageUsage,
      baseUrl: process.env.VUE_APP_API_BASE + 'nethospital/',
      selectedItem: ''
    }
  },
  methods: {
    getImageList() {
      // 获取图片列表
      const usage = this.usage

      PlatformService.getImages({ imageName: '', usageScenarios: usage }).then((res) => {
        const data = res.data

        if (!data.list.length) {
          return (this.imageList = [])
        }

        this.imageList = data.list
      })
    },
    // 选中图片
    selected(icon) {
      const imageUrl = icon[this.imageKey]
      const list = [].concat(this.imageList)

      list.forEach((element) => {
        element.isSelected = false
        if (imageUrl && imageUrl === element.imageUrl) {
          element.isSelected = true
          this.selectedItem = element
        }
      })

      this.imageList = list
    },
    toPlatformImages() {
      this.$router.replace({ name: '平台图库' })
      this.close()
    },
    close() {
      this.$emit('close')
    },
    // 保存选择
    saved() {
      const element = this.selectedItem

      this.$emit('getSelected', element)
    }
  },
  created() {
    this.getImageList()
    this.isSelected = false
  }
}
</script>
<style lang="scss" scoped>
.hd {
  text-align: right;
  .el-select {
    width: 100px;
  }
}
.icon {
  font-size: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-height: 300px;
  overflow: auto;
  &-item {
    margin: 6px 0;
    padding: 0 5px;
    width: 33.3333%;
    text-align: center;
    display: inline-block;
    & > img {
      max-width: 100%;
      padding: 5px;
      height: 60px;
      border-radius: 3px;
      display: inline-block;
      cursor: pointer;
      &:hover,
      &.actived {
        box-shadow: 0 0 0 2px var(--q-color-primary);
      }
    }
  }
}
.tips {
  width: 100%;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #f56c6c;
  .el-button {
    padding: 0;
  }
}
</style>