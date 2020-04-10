/** 
  * Demo 主要功能介绍：
  * 1，数据获取与传递
  * 2，数据验证
  * 3，Provide ， Inject 使用
  */

<template>
  <div>
    <!-- 初始化 -->
    <template v-if="isInitialize">
      <peace-initialize />
    </template>

    <!-- 初始化完成 -->
    <template v-else>
      <template v-if="data">
        <h4>Done</h4>
        <p>Remote Data:</p>
        <div>{{ data }}</div>
      </template>
      <template v-else>
        <peace-empty />
      </template>
    </template>
  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      /**
       * 是否初始化状态
       */
      isInitialize: true,

      data: undefined
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      this.fetch().then(() => {
        this.isInitialize = false
      })
    },

    fetch() {
      return Service.get().then(res => {
        this.data = res.data
      })
    }
  }
}
</script>

<style>
</style>