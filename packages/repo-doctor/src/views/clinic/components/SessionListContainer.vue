
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
             class="flex justify-between items-center full-width q-px-md"
             v-on:click="gotoPath(item)">
          <div class="flex items-center">
            <img class="q-mr-md"
                 v-bind:src="require('@src/assets/images/inquiry/archives_icon_baby.png')">
            <span>{{ item.title }}</span>
          </div>

          <div>
            ( <span class="text-red">2</span> )
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
          routePath: '/clinic/inquiry'
        },
        {
          name: 'returnVisit',
          title: '复诊续方',
          routePath: '/clinic/returnVisit'
        },
        {
          name: 'faceToFace',
          title: '面诊开方',
          routePath: '/clinic/faceToFace'
        },
        {
          name: 'consultation',
          title: '我的会诊',
          routePath: '/clinic/consultation'
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
::v-deep .el-collapse-item {
  &.is-disabled .el-collapse-item__header {
    color: rgb(39, 39, 39);
    cursor: pointer;
  }

  &.is-active {
    display: flex;
    flex-direction: column;
    flex: 1;

    .el-collapse-item__wrap,
    .el-collapse-item__content {
      height: 100%;
    }
  }

  .el-collapse-item__content {
    margin-bottom: 0;
  }

  .el-collapse-item__arrow.el-icon-arrow-right {
    display: none;
  }
}
</style>