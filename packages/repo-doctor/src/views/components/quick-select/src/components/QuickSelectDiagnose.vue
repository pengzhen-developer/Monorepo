// 快速选择诊断
// 1，支持 allowCreate
// 2，不允许 【无】、【不明确】、【有】

<template>
  <el-select clearable
             filterable
             remote
             class="element-ui-default"
             value-key="code"
             v-model="checkValue"
             v-bind:loading='loading'
             v-bind:multiple="multiple"
             v-bind:remote-method="fetchDiagnose">

    <template v-if="allowCreate && diagnoseList.length === 0">
      <el-option v-bind:key="queryStringOption.code"
                 v-bind:label="queryStringOption.name"
                 v-bind:value="queryStringOption">
        <!-- 当前搜索项，已经无法检索，而且之前已经被选中添加，直接显示关键字即可 -->
        <template v-if="value.findIndex(item => item.code === queryStringOption.code) === -1">
          <span class="text-primary">【{{ queryStringOption.name }}】</span>
          <span>暂无匹配项，选中则新增成功</span>
        </template>
        <template v-else>
          {{ queryStringOption.name }}
        </template>
      </el-option>
    </template>

    <template v-else>
      <el-option v-for="item in diagnoseList"
                 v-bind:key="item.code"
                 v-bind:label="item.name"
                 v-bind:value="item"></el-option>
    </template>
  </el-select>
</template>

<script>
import Service from './../service'

export default {
  props: {
    value: {
      type: [Array, Object],
      default() {
        return []
      }
    },

    allowCreate: {
      type: Boolean,
      default() {
        return false
      }
    },

    multiple: {
      type: Boolean,
      default() {
        return true
      }
    }
  },

  data() {
    return {
      queryStringOption: {},

      checkValue: [],

      commomDiagnoseList: [],
      diagnoseList: [],

      loading: false
    }
  },

  watch: {
    value: {
      handler() {
        this.checkValue = this.value

        // 处理默认选中问题
        // 服务端搜索下拉框，无法通过传入 value 匹配带出 label
        // 因此，在 value 发生变化时，将 value 赋值给 source，使能正常显示
        this.diagnoseList = this.value
        this.$nextTick(() => {
          this.diagnoseList = this.commomDiagnoseList
        })
      },
      immediate: true
    },

    checkValue(value) {
      this.$emit('input', value)
    }
  },

  created() {
    // 初始化，获取常见诊断供选择
    this.getCommomDiagnose()
  },

  methods: {
    // 根据输入关键字，查询诊断
    fetchDiagnose(q) {
      if (q) {
        // 未检索到关键字，queryStringOption 做为新增项，支持选择
        this.queryStringOption = {
          isAdd: true,
          code: Peace.util.encode(q),
          name: q
        }

        this.loading = true

        Service.getDisease({ name: q })
          .then((res) => {
            this.diagnoseList = res.data.list
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.diagnoseList = this.commomDiagnoseList
      }
    },

    // 获取常见诊断
    getCommomDiagnose() {
      Service.getCommomDiagnose().then((res) => {
        this.commomDiagnoseList = res.data.list
        this.diagnoseList = this.commomDiagnoseList
      })
    }
  }
}
</script>

<style>
</style>