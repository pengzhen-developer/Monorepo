<template>
  <div>
    <q-scroll-area v-bind:thumb-style="thumbStyle"
                   v-bind:style="scrollAreaStyle">
      <el-tree ref="tree"
               default-expand-all
               highlight-current
               v-bind:data="data">
      </el-tree>
    </q-scroll-area>
  </div>
</template>

<script>
import Service from '../service'
export default {
  data() {
    return {
      data: [],
      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        width: '5px',
        opacity: 0.75
      },
      scrollAreaStyle: {
        height: '350px'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getTree()
    })
  },
  methods: {
    getTree() {
      Service.getDepartTree().then((res) => {
        this.data = res.data.list
      })
    }
  }
}
</script>

<style>
</style>