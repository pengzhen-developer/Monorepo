
<template>
  <div class="flex column full-height">
    <el-collapse class="flex column col collapse"
                 v-model="activeName"
                 accordion>
      <el-collapse-item v-for="item in source"
                        v-bind:key="item.name"
                        v-bind:name="item.name"
                        disabled>
        <div slot="title"
             class="flex justify-between items-center full-width"
             v-on:click="gotoPath(item)">

          <div class="flex items-center">
            <img class="q-mr-md"
                 style="width: 20px; height: 20px;"
                 v-bind:src="item.icon">
            <span class="text-subtitle1">{{ item.title }}</span>
          </div>

        </div>
        <div class="flex column full-height">
          <slot></slot>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>
<script>
export default {
  props: {
    active: {
      type: String,
      default() {
        return 'inquriy'
      }
    }
  },

  data() {
    return {
      activeName: '',

      source: [
        {
          name: 'inquiry',
          title: '在线咨询',
          icon: require('./assets/img/ic_online@2x.png'),
          routePath: '/clinic/inquiry'
        },
        {
          name: 'returnVisit',
          title: '复诊续方',
          icon: require('./assets/img/ic_return visit@2x.png'),
          routePath: '/clinic/returnVisit'
        },
        {
          name: 'faceToFace',
          title: '面诊开方',
          icon: require('./assets/img/ic_face to face@2x.png'),
          routePath: '/clinic/faceToFace'
        }
      ]
    }
  },

  watch: {
    active: {
      handler() {
        const index = this.source.findIndex((item) => item.name === this.active)

        this.source.unshift(this.source.splice(index, 1)[0])
      },
      immediate: true
    }
  },

  created() {
    this.activeName = this.active
  },

  methods: {
    gotoPath(item) {
      this.activeName = this.active

      this.$router.push(item.routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-collapse {
  border: 0;
}

.add_button_style {
  width: 20px;
}

::v-deep .el-collapse-item {
  &.is-disabled .el-collapse-item__header {
    color: rgb(39, 39, 39);
    cursor: pointer;
  }

  &.is-active {
    display: flex;
    flex-direction: column;
    flex: 1;

    .el-collapse-item__header {
      padding: 0 16px;
    }

    .el-collapse-item__wrap {
      height: 100%;
      border-top: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
    }

    .el-collapse-item__content {
      height: 100%;
    }
  }

  &:not(.is-active) {
    padding: 0 0 0 16px;

    .el-collapse-item__header {
      padding: 0 16px 0 0;
    }
  }

  .el-collapse-item__content {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .el-collapse-item__arrow.el-icon-arrow-right {
    display: none;
  }
}
</style>