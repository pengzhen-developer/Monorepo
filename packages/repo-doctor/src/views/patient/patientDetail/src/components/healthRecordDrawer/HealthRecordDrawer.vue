<template>
  <el-drawer :visible.sync="drawer"
             :modal="false"
             :before-close="handleClose"
             :destroy-on-close="true"
             size="400px">
    <span class="title"
          slot="title">{{ titleStr }}</span>
    <Component ref="checkInput"
               :params="params"
               v-bind:is="ComponentInstance" />
  </el-drawer>
</template>

<script>
import Type from '@src/type'
import InquiryRecord from './Inquiry/InquiryRecord'

export default {
  props: {
    params: undefined
  },
  data() {
    return {
      drawer: false,
      innerDrawer: false,
      titleStr: '',
      ComponentInstance: undefined,
      currentIndex: undefined
    }
  },
  methods: {
    show(parameter) {
      this.currentIndex = parameter.index
      switch (parameter.index) {
        case Type.HEALTH_RECORD.ACTION_TYPE.咨询:
          {
            this.ComponentInstance = InquiryRecord
            this.titleStr = '咨询记录'
          }
          break
      }

      this.drawer = true

      this.$nextTick(function() {
        setTimeout(() => {
          this.clearFocus()
        }, 60)
      })
    },
    clearFocus() {
      const focusElements = this.$el.querySelectorAll(':focus')
      focusElements.forEach((element) => {
        element.blur()
      })
    },
    isAllEmpty(params) {
      for (const key in params) {
        if (!Peace.validate.isEmpty(params[key])) {
          return false // 终止程序
        }
      }
      return true
    },
    handleClose(done) {
      Peace.$emit('hideDrawer', this.currentIndex)
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  text-align: center;
  /* 这里因为关闭按钮宽度为34px, 文字要居中设置偏移 */
  margin-left: 34px;
}

::v-deep .el-drawer {
  outline: none;
}

.el-drawer__wrapper {
  height: calc(100vh - 113px);
  position: absolute;
  right: 90px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;

  ::v-deep .el-drawer__header {
    margin-bottom: 20px;

    .el-drawer__close-btn {
      outline: none;
    }
  }

  ::v-deep .el-drawer__body {
    height: calc(100% - 66px);
  }
}
</style>
