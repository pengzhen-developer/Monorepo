<template>
  <div>
    <div class="draggable">
      <div class="info-row">
        <div class="info-row-label">
          <span>广告位置</span>
        </div>
        <div class="info-row-content">
          <el-select v-model="displayPosition">
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in displayPositionOptions"></el-option>
          </el-select>
        </div>
      </div>
      <div class="draggable-item">
        <span class="small-text">
          <strong>图片</strong>
        </span>
        <span class="name">
          <strong>关联内容</strong>
        </span>
        <span class="name">
          <strong>展示位置</strong>
        </span>
        <span class="handle-icon small-text">
          <strong>操作</strong>
        </span>
      </div>
      <draggable class="draggable-list"
                 handle=".handle"
                 v-model="draggableList">
        <div :key="item.id"
             class="draggable-item"
             v-for="item in draggableList">
          <span class="image">
            <img :src="baseUrl + item.imgUrl"
                 alt />
          </span>
          <span :title="item.content"
                class="name">{{ item.name }}</span>
          <span :title="item.displayPosition"
                class="name">{{ item.displayPosition |  filterDictionary(CONSTANT.AdvertisementPosition, '--')  }}</span>
          <span class="handle-icon">
            <i class="el-icon-s-operation handle"
               v-if="item.isCurrent"></i>
          </span>
        </div>
      </draggable>
    </div>
    <div class="text-center q-mt-20">
      <el-button @click="saved"
                 type="primary">确认</el-button>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import CONSTANT from '../constant'

const DoctorPositionValue = 2
const PatientPositionValue = 3

export default {
  props: {
    list: Array
  },
  data() {
    return {
      CONSTANT,
      baseUrl: process.env.VUE_APP_API_BASE + 'nethospital/',
      array: [],
      draggableList: [],
      displayPosition: 2,
      displayPositionOptions: CONSTANT.AdvertisementPosition
    }
  },
  watch: {
    displayPosition(val) {
      // 暂存当前列表（val 是切换之后的值，所以判断逻辑要反过来）
      if (val === DoctorPositionValue) {
        this.array[1] = this.draggableList
      } else {
        this.array[0] = this.draggableList
      }

      this.draggableList = this.array[val - 2]
    }
  },
  components: { draggable },
  methods: {
    filterList(val) {
      const list = [].concat(this.list)
      list.sort((a, b) => a.sort - b.sort)

      return list.filter((item) => item.displayPosition === val)
    },
    saved() {
      this.array[this.displayPosition - 2] = this.draggableList
      const list = this.array

      this.$emit('getSorts', list[0].concat(list[1]))
    }
  },
  created() {
    this.array = [this.filterList(DoctorPositionValue), this.filterList(PatientPositionValue)]
    this.draggableList = this.array[this.displayPosition - 2]
  }
}
</script>
<style lang="scss" scoped>
.draggable {
  position: relative;
  height: 100%;
  user-select: none;
  &-list {
    height: calc(100% - 120px);
    overflow: auto;
  }
  .inline-center {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
.small-text {
  width: 80px;
  white-space: nowrap;
  text-align: center;
  //font-size: 1rem !important;
  font-size: 14px !important;
  color: #606266 !important;
}
.draggable-item {
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  &:nth-child(odd) {
    background-color: #f5f7fa;
  }
  .image,
  .name,
  .handle-icon {
    vertical-align: middle;
    text-align: center;
    display: inline-block;
    font-weight: normal;
  }
  .name {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 340px);
    overflow: hidden;
  }
  .placeholder {
    width: 5em;
  }
  .image,
  .handle-icon {
    padding: 4px;
    height: 50px;
    font-size: 24px;
  }
  .image {
    width: 80px;
    overflow: hidden;
    & > img {
      height: 42px;
    }
  }
  .handle-icon {
    width: 50px;
    color: #ddd;
    line-height: 42px;
    cursor: pointer;
  }
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
</style>
