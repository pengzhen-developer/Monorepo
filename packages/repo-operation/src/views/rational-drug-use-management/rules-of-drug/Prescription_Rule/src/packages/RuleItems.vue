<template>

  <div class="rule-item-style full-width">
    <div class="rule-item-header">
      <div v-html="title"></div>
      <el-button primary
                 type="text"
                 v-on:click="action"
                 v-if="showButton">{{buttonTitle}}</el-button>
    </div>
    <slot v-if="showSlot"></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String
    },
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    }
  },

  computed: {
    title() {
      if (this.name === '相互作用') {
        return `<span style="font-size: 16px; font-weight: 500;">${this.name}</span><span style="font-size: 16px; font-weight: 400; color: #999999">（系统将根据药品本位码获取药品成分信息，依据相互作用规则进行用药风险判断与提示）</span>`
      } else if (this.name === '重复用药') {
        return `<span style="font-size: 16px; font-weight: 500;">${this.name}</span><span style="font-size: 16px; font-weight: 400; color: #999999">（系统将根据药品本位码获取药品成分信息进行重复用药风险判断，提示内容为：处方中含有成分/治疗效果重复的药品）</span>`
      } else {
        return `<span style="font-size: 16px; font-weight: 500;">${this.name}</span>`
      }
    },
    buttonTitle() {
      if (this.name === '相互作用') {
        return '查看相互作用规则'
      } else if (this.name === '重复用药') {
        return '查看特殊规则'
      } else {
        return '添加'
      }
    },
    showSlot() {
      if (this.name === '相互作用') {
        return false
      } else if (this.name === '重复用药') {
        return false
      } else {
        return true
      }
    },
    showButton() {
      if (this.name === '相互作用') {
        return true
      } else if (this.name === '重复用药') {
        return true
      } else {
        return this.isEditing
      }
    }
  },

  methods: {
    action() {
      if (this.name === '相互作用') {
        this.$emit('checkInteractionRules')
      } else if (this.name === '重复用药') {
        this.$emit('checkSpecialRules')
      } else {
        this.$emit('addRule')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-item-style {
  display: flex;
  flex-direction: column;
  border: 1px solid #eaeaea;

  .rule-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 16px;

    .rule-item-title {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
