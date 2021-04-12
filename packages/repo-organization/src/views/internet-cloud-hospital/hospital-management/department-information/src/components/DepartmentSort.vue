<template>
  <div class="draggable">
    <draggable class="draggable-list"
               handle=".handle"
               v-model="draggableList">
      <div :key="item.id"
           class="draggable-item"
           v-for="(item, index) in draggableList">
        <span :title="item.parentDeptName"
              class="name">{{ item.parentDeptName }}</span>
        <span class="placeholder"
              v-if="index < 6">医院首页</span>
        <span class="placeholder"
              v-else>全部</span>
        <span class="handle-icon">
          <i class="el-icon-s-operation handle"></i>
          <!-- v-if="item.isCurrent" -->
        </span>
      </div>
    </draggable>
    <div class="flex justify-center">
      <el-button @click="saved"
                 type="primary">确认</el-button>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'DepartmentSort',
  props: {
    list: Array,
    isSingle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      draggableList: this.list
    }
  },
  components: { draggable },
  methods: {
    saved() {
      const list = this.draggableList
      const length = list.length
      const isSingle = this.isSingle
      if (!isSingle) {
        this.$emit('getSorts', list)
        return
      }
      for (let i = 0; i < length; i += 1) {
        // const element = list[i]
        // if (element.isCurrent) {
        // 结尾
        let index
        if (i === length - 1) {
          index = length
        } else {
          index = list[i + 1].sort
        }
        this.$emit('getSortIndex', index, list)
        return
        // }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.draggable {
  position: relative;
  height: 100%;
  user-select: none;
  &-list {
    // height: calc(100% - 38px);
    padding-bottom: 38px;
    height: 100%;
    overflow: auto;
  }
  .inline-center {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
.draggable-item {
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  .image,
  .name,
  .handle-icon {
    vertical-align: middle;
    text-align: center;
    display: inline-block;
  }
  .name {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 240px);
    overflow: hidden;
  }
  .placeholder {
    width: 5em;
  }
  .image,
  .handle-icon {
    padding: 4px;
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
  .handle-icon {
    color: #ccc;
    line-height: 32px;
    cursor: pointer;
  }
}
</style>
