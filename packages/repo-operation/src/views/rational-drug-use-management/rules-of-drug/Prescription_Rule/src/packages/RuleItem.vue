<template>
  <div class="cursor-pointer relative-position full-width flex">
    <q-menu context-menu touch-position>
      <q-list style="min-width: 100px" v-if="isEditing">
        <q-item v-for="(item, index) in menuItem"
                v-bind:key="index"
                v-close-popup
                clickable
                v-on:click="itemClicked(item)">
          <q-item-section>{{ item.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <div style="background: #EAEAEA; height:1px; top: 0; left:0; right:0" class="relative"/>
    <slot></slot>
    <div v-show="disabled || intercept" :class="{disabled_style: disabled,  intercept_style: intercept}"></div>
  </div>
</template>

<script>

export default {

  props: {
    name: String,
    disabled: Boolean,
    intercept: Boolean,
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    }
  },


  computed: {
    menuItem() {
      return [
        {name: '复制此规则', label: 0},
        {name: '删除此规则', label: 1},
      ]
    }
  },

  methods: {

    itemClicked(item) {
        this.$emit('ruleAction', item.label)
    },

    addRule() {
      this.$emit('addRule')
    },

  }
}
</script>

<style lang="scss" scoped>

.intercept_style {
  border: 1px solid red;
  background: white;
  opacity: 0.5;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.disabled_style {
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
}

.rule-item-style {
  display: flex;
  flex-direction: column;
  border: 1px solid #EAEAEA;

  .rule-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 16px;
  }
}
</style>
