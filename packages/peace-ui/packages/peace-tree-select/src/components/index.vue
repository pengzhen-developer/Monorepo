<template>
  <div class="el-select-tree">
    <el-popover ref="elPopover"
                v-model="visible"
                transition="el-zoom-in-top"
                popper-class="peace-select-tree__popover"
                trigger="click"
                v-on:after-enter="handleScroll()"
                v-bind:disabled="disabled"
                v-bind:placement="placement"
                v-bind:width="popoverWidth">
      <!-- scrollbar wrap -->
      <el-scrollbar wrap-class="el-select-dropdown__wrap"
                    view-class="el-select-dropdown__list"
                    ref="scrollbar">
        <div v-if="filterable"
             style="margin: 0 4px 8px 4px;">
          <el-input placeholder="输入关键字进行过滤"
                    v-model="filterText">
          </el-input>
        </div>
        <el-tree ref="PeaceTreeSelect"
                 class="el-select-tree__list"
                 v-on:node-click="nodeClick"
                 v-on:check-change="checkChange"
                 v-on:transitionend.native="$refs.elPopover.updatePopper()"
                 v-bind:default-expanded-keys="defaultExpandedKeys"
                 v-bind:show-checkbox="multiple"
                 v-bind:expand-on-click-node="multiple"
                 v-bind:style="{ 'min-width': minWidth + 'px' }"
                 v-bind:data="data"
                 v-bind:props="props"
                 v-bind:node-key="propsValue"
                 v-bind:default-expand-all="defaultExpandAll"
                 v-bind:check-strictly="checkStrictly"
                 v-bind:lazy="lazy"
                 v-bind:load="load"
                 v-bind:icon-class="iconClass"
                 v-bind:indent="indent"
                 v-bind:accordion="accordion"
                 v-bind:filter-node-method="filterNodeMethod"
                 v-bind:auto-expand-parent="autoExpandParent"
                 v-bind:render-content="renderContent"
                 v-bind:render-after-expand="renderAfterExpand">
          <div class="el-select-tree__item"
               slot-scope="{ data }"
               v-bind:class="treeItemClass(data)">
            {{ data[propsLabel] }}
          </div>
        </el-tree>
      </el-scrollbar>

      <!-- trigger input -->
      <el-input v-model="selectedLabel"
                ref="reference"
                slot="reference"
                readonly
                class="peace-tree-select-input"
                v-bind:validate-event="false"
                v-bind:size="size"
                v-bind:class="{
                  'is-active': visible,
                  'is-selected': selectedLabel,
                  'is-clearable': clearable
                }"
                v-bind:disabled="disabled"
                v-bind:placeholder="placeholder">
        <i v-if="clearable"
           v-on:click.stop="clear()"
           slot="suffix"
           class="el-input__icon el-input__icon-close el-icon-circle-close"></i>
        <i slot="suffix"
           class="el-input__icon el-input__icon-arrow-down el-icon-arrow-down"></i>
      </el-input>
    </el-popover>
  </div>
</template>

<script>
import Vue from 'vue'
import Emitter from 'element-ui/lib/mixins/emitter'
import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event'

export default {
  name: 'PeaceTreeSelect',

  mixins: [Emitter],

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    // [el-tree] forwarding parameters https://element.eleme.io/#/zh-CN/component/tree#attributes
    data: {
      type: Array,
      default() {
        return []
      }
    },
    props: {
      type: Object,
      default() {
        return {
          value: 'value',
          label: 'label',
          children: 'children',
          disabled: 'disabled',
          isLeaf: 'isLeaf'
        }
      }
    },
    checkStrictly: Boolean,
    nodeKey: String,
    defaultExpandAll: Boolean,
    lazy: Boolean,
    load: Function,
    iconClass: String,
    indent: Number,
    accordion: Boolean,
    filterable: Boolean,
    filterNodeMethod: {
      type: Function,
      default(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      }
    },
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    renderContent: Function,
    renderAfterExpand: Boolean,
    // [el-tree] forwarding parameters end
    clearable: Boolean,
    placeholder: {
      type: String,
      default: '请选择'
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    size: {
      type: String,
      default: Vue.prototype.$ELEMENT ? Vue.prototype.$ELEMENT.size : ''
    },
    disabled: Boolean,
    multiple: Boolean,
    value: {
      type: [Number, String, Array],
      default: ''
    },
    popoverWidth: {
      type: [Number, String],
      default() {
        return '100%'
      }
    }
  },
  computed: {
    propsValue() {
      return this.nodeKey || this.props.value || 'value'
    },
    propsLabel() {
      return this.props.label || 'label'
    },
    propsIsLeaf() {
      return this.props.isLeaf || 'isLeaf'
    },
    defaultExpandedKeys() {
      return Array.isArray(this.value) ? this.value : this.value || this.value === 0 ? [this.value] : []
    }
  },
  data() {
    return {
      filterText: '',
      visible: false,
      selectedLabel: '',
      minWidth: 0
    }
  },
  methods: {
    valueChange(value, node) {
      this.$emit('change', value, node)
    },
    clear() {
      this.visible = false
      if (this.multiple) {
        this.valueChange([])
        this.$nextTick(() => {
          this.$refs.PeaceTreeSelect.setCheckedKeys([])
        })
      } else {
        this.valueChange('')
      }
      this.$emit('clear')
    },
    // 触发滚动条的重置
    handleScroll() {
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll()
    },
    nodeClick(data, node, component) {
      const children = data[this.props.children]
      const value = data[this.propsValue]
      if (((children && children.length) || (this.lazy && !data[this.propsIsLeaf])) && !this.checkStrictly) {
        component.handleExpandIconClick()
      } else if (!this.multiple && !data.disabled) {
        if (value !== this.value) {
          this.valueChange(value, data)
          this.selectedLabel = data[this.propsLabel]
        }
        this.visible = false
      }
    },
    checkChange() {
      const PeaceTreeSelect = this.$refs.PeaceTreeSelect
      const leafOnly = !this.checkStrictly
      const keys = PeaceTreeSelect.getCheckedKeys(leafOnly)
      const nodes = PeaceTreeSelect.getCheckedNodes(leafOnly)
      this.valueChange(keys, nodes)
      this.setMultipleSelectedLabel()
    },
    setSelected() {
      this.$nextTick(() => {
        const PeaceTreeSelect = this.$refs.PeaceTreeSelect
        if (this.multiple) {
          PeaceTreeSelect.setCheckedKeys(this.value)
          this.setMultipleSelectedLabel()
        } else {
          const selectedNode = PeaceTreeSelect.getNode(this.value)
          this.selectedLabel = selectedNode ? selectedNode.data[this.propsLabel] : ''
        }
      })
    },
    setMultipleSelectedLabel() {
      const PeaceTreeSelect = this.$refs.PeaceTreeSelect
      const selectedNodes = PeaceTreeSelect.getCheckedNodes(!this.checkStrictly)
      this.selectedLabel = selectedNodes.map((item) => item[this.propsLabel]).join(',')
    },
    treeItemClass(data) {
      return {
        'is-selected': this.multiple ? false : data[this.propsValue] === this.value,
        'is-disabled': data.disabled
      }
    },
    handleResize() {
      // set the `tree` default `min-width`
      // border's width is 2px
      this.minWidth = this.$el.clientWidth - 2
    }
  },
  watch: {
    filterText(val) {
      this.$refs.PeaceTreeSelect.filter(val)
    },
    value() {
      this.setSelected()
      // trigger parent `el-form-item` validate event
      this.dispatch('ElFormItem', 'el.form.change')
    },
    data() {
      this.setSelected()
    }
  },
  created() {
    if (this.multiple && !Array.isArray(this.value)) {
      throw new Error('[el-select-tree] props `value` must be Array if use multiple!')
    }
  },
  mounted() {
    this.setSelected()
    addResizeListener(this.$el, this.handleResize)
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) {
      removeResizeListener(this.$el, this.handleResize)
    }
  }
}
</script>

<style lang="scss">
.el-input.peace-tree-select-input:not(.element-ui-default).el-input--mini .el-input__inner {
  padding-right: 32px;
}

.peace-select-tree__popover {
  min-height: 200px !important;
  padding: 0 !important;

  .popper__arrow {
    display: none !important;
  }

  &[x-placement^='bottom'] {
    margin-top: 4px;
  }
  &[x-placement^='top'] {
    margin-bottom: 4px;
  }
}

.el-select-tree {
  display: inline-block;
  .el-input__icon {
    cursor: pointer;
    transition: transform 0.3s;
    &-close {
      display: none;
    }
  }
  .el-input__inner {
    cursor: pointer;
    padding-right: 30px;
  }
  .el-input {
    &:hover:not(.is-disabled) {
      .el-input__inner {
        // border-color: $--input-border-color-hover;
      }
      &.is-selected.is-clearable {
        .el-input__icon {
          &-close {
            display: inline-block;
          }
          &-arrow-down {
            display: none;
          }
        }
      }
    }
    &.is-active {
      .el-input__icon-arrow-down {
        transform: rotate(-180deg);
      }
      .el-input__inner {
        // border-color: $--button-primary-border-color;
      }
    }
  }
  &__popover {
    padding: 0 !important;
    // extends el-select-dropdown - start
    // border: $--select-dropdown-border !important;
    // border-radius: $--border-radius-base !important;
    // extends el-select-dropdown - end
    .popper__arrow {
      left: 35px !important;
    }
    .el-tree-node__expand-icon.is-leaf {
      cursor: pointer;
    }
  }
  &__list {
    overflow-y: auto;
    // scroll style - start
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
    }
    // scroll style - end
  }
  &__item {
    position: relative;
    white-space: nowrap;
    // padding-right: $spacing-medium;
    &.is-selected {
      // color: $--select-option-selected-font-color;
      font-weight: bolder;
    }
    &.is-disabled {
      // color: $--font-color-disabled-base;
      cursor: not-allowed;
    }
  }
}
</style>