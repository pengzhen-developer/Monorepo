// 快速选择诊断
// 1，支持 allowCreate
// 2，支持 【无】、【不明确】、【有】，其中：
// 【无】：[{ code: 'empty', name: '无' }]
// 【不明确】：[{ code: 'unknow', name: '不明确' }]
// 【有】：[{ code: '', name: '' }, { code: '', name: '' }]

<template>
  <div>
    <el-radio-group v-model="checkType">
      <el-radio label="无">无</el-radio>
      <el-radio label="不明确">不明确</el-radio>
      <el-radio label="有"
                v-on:change="reactive">有</el-radio>
    </el-radio-group>

    <div class="full-width"
         v-show="showSelectAllergy">
      <el-select multiple
                 clearable
                 filterable
                 remote
                 class="full-width element-ui-default"
                 value-key="code"
                 v-on:clear="reactive"
                 v-bind:loading='loading'
                 v-bind:remote-method="fetchDiagnose"
                 v-model="checkValue">
        <!-- 当前搜索项，无法检索 -->
        <template v-if="allowCreate && diagnoseList.length === 0">
          <el-option v-bind:key="queryStringOption.code"
                     v-bind:label="queryStringOption.name"
                     v-bind:value="queryStringOption">
            <!-- 搜索关键字已经被选中添加，直接显示关键字即可 -->
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
                     v-bind:value="item">
          </el-option>
        </template>
      </el-select>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },

    allowCreate: {
      type: Boolean,
      default() {
        return false
      }
    }
  },

  data() {
    return {
      queryStringOption: {},

      checkType: null,
      checkValue: null,

      commomDiagnoseList: [],
      diagnoseList: [],

      loading: false,

      emptyValue: [{ code: 'empty', name: '无' }],
      unkonwValue: [{ code: 'unknow', name: '不明确' }]
    }
  },

  computed: {
    showSelectAllergy() {
      const isEmpty = Peace.util.deepCompare(this.value, this.emptyValue)
      const isUnknow = Peace.util.deepCompare(this.value, this.unkonwValue)

      return this.checkType && !isEmpty && !isUnknow
    }
  },

  watch: {
    value: {
      handler(value) {
        const isEmpty = Peace.util.deepCompare(this.value, this.emptyValue)
        const isUnknow = Peace.util.deepCompare(this.value, this.unkonwValue)

        if (isEmpty) {
          this.checkType = '无'
        } else if (isUnknow) {
          this.checkType = '不明确'
        } else {
          this.checkType = '有'
          this.checkValue = value

          // 处理默认选中问题
          // 服务端搜索下拉框，无法通过传入 value 匹配带出 label
          // 因此，在 value 发生变化时，将 value 赋值给 source，使能正常显示
          this.diagnoseList = this.value
          this.$nextTick(() => {
            this.diagnoseList = this.commomDiagnoseList
          })
        }
      },
      immediate: true
    },

    checkType() {
      // 选中无，格式化 v-model
      if (this.checkType === '无') {
        this.$emit('input', this.emptyValue)
      }
      // 选中不明确，格式化 v-model
      else if (this.checkType === '不明确') {
        this.$emit('input', this.unkonwValue)
      }
    },

    checkValue(value) {
      if (this.checkType !== '无' && this.checkType !== '不明确') {
        this.$emit('input', value)
      }
    }
  },

  created() {
    // 初始化，获取常见过敏史供选择
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
      this.loading = true

      Service.getCommomDiagnose()
        .then((res) => {
          this.commomDiagnoseList = res.data.list
          this.diagnoseList = this.commomDiagnoseList
        })
        .finally(() => {
          this.loading = false
        })
    },

    reactive() {
      this.diagnoseList = this.commomDiagnoseList
      this.checkValue = []
    }
  }
}
</script>

<style>
</style>