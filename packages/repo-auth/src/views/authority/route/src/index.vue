

<template>
  <div class="layout-route q-ma-md bg-white">
    <el-alert title="路由配置是非常专业的事情，不建议非工程师操作"
              type="warning" />
    <vue-json-editor v-model="json"
                     :show-btns="false" />
    <div align="center">
      <el-button @click="edit()">更新</el-button>
    </div>
  </div>
</template>
<script>
import vueJsonEditor from 'vue-json-editor'
import Service from './service'
import Peace from '@/src/library'
export default {
  name: 'Route',
  // 注入vueJsonEditor组件
  components: {
    vueJsonEditor
  },
  data() {
    return {
      json: null
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList(type = '') {
      Service.getRoute().then((res) => {
        const result = res.data
        for (var i = 0; i < result.length; i++) {
          const route = result[i]
          if (route.predicates) {
            const predicates = route.predicates
            route.predicates = JSON.parse(predicates)
          }
          if (route.filters) {
            const filters = route.filters
            route.filters = JSON.parse(filters)
          }
        }
        this.json = result
        if (type == 'refresh') {
          Peace.util.success('更新成功')
        }
      })
    },

    edit() {
      Service.editRoute(this.json).then(() => {
        this.getList('refresh')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
div.jsoneditor-contextmenu div.jsoneditor-icon {
  position: relative;
}
</style>
