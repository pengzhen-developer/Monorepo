<template>
  <div>
    <Component v-bind:is="ComponentInstance"></Component>

    <!-- 编辑模式下,需要实时预览 -->
    <template v-if="isEditorPreview">
      <!-- 分隔符 -->
      <q-separator class="q-my-xl bg-primary"></q-separator>

      <!-- 标题 -->
      <div class="text-body1 text-center">预览详情</div>

      <!-- 预览详情 -->
      <Component v-bind:data="data"
                 v-bind:type="type"
                 v-bind:is="ComponentPreviewInstance"></Component>
    </template>
  </div>
</template>

<script>
import CONSTANT from './../constant'
import DrugFlowList from './components/DrugFlowList'
import DrugFlowEditor from './components/DrugFlowEditor'
import DrugFlowView from './components/DrugFlowView'

export default {
  provide() {
    return {
      provideSetDispalyView: this.setDispalyView,
      providePreview: this.preview
    }
  },

  data() {
    return {
      CONSTANT,

      displayView: CONSTANT.DISPLAY_VIEW.列表,

      type: undefined,
      data: undefined
    }
  },

  computed: {
    isEditorPreview() {
      return this.displayView === CONSTANT.DISPLAY_VIEW.编辑
    },

    ComponentPreviewInstance() {
      return DrugFlowView
    },

    ComponentInstance() {
      const displayViewComponentMap = {
        [CONSTANT.DISPLAY_VIEW.列表]: DrugFlowList,
        [CONSTANT.DISPLAY_VIEW.编辑]: DrugFlowEditor,
        [CONSTANT.DISPLAY_VIEW.详情]: DrugFlowView
      }

      return displayViewComponentMap[this.displayView]
    }
  },

  methods: {
    setDispalyView(displayView) {
      this.displayView = displayView
    },

    preview(data, type) {
      this.type = type
      this.data = data
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 10px 0 0;

  &.primary {
    background: #e4e4e4;
  }
  &.info {
    background: var(--q-color-warning);
  }
  &.success {
    background: var(--q-color-primary);
  }
  &.danger {
    background: var(--q-color-negative);
  }
}
</style>