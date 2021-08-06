<template>
  <div class="layout-route">
    <div class="flex justify-between items-end card q-mb-md">
      <div>
        <div class="q-mb-md">
          <el-button icon="el-icon-arrow-left"
                     v-on:click="back">返回上一页</el-button>
        </div>

        <div class="text-subtitle1 text-weight-bold q-mb-sm">
          <span class="text-grey-333">{{data.ruleName}}</span>
        </div>

      </div>
    </div>

    <div class="card"
         style="margin-bottom: 72px">
      <management-rule ref="ruleView"
                style="padding: 0;"
                v-bind:id="data.id"></management-rule>
    </div>

    <div class="fixed-bottom card text-right" style="box-shadow: 0px 1px 8px 0px #e0e0e0;">
      <el-button v-on:click="back">退出编辑</el-button>
      <el-button type="primary"
                 v-bind:loading="loading"
                 v-on:click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  props: {
    data: Object,
    visible: Boolean
  },

  components: {
    ManagementRule: () => import('./ManagementRule')
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    internalVisible: {
      get() {
        return this.visible
      },

      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },

  methods: {
    back() {
      this.internalVisible = false

      this.$emit('fetch')
    },

    save() {
      this.$refs.ruleView.validate().then((data) => {
        this.loading = true
        this.$refs.ruleView.loading = true
        const params = Object.assign({}, data)
        Service.saveRules(params)
            .then(() => {
              Peace.util.success('保存成功')
              this.loading = false
              this.$refs.ruleView.loading = false
              this.back()
            })
            .catch(() => {
              this.loading = false
              this.$refs.ruleView.loading = false
            })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.layout-route {
  padding: 0 !important;
}
</style>
