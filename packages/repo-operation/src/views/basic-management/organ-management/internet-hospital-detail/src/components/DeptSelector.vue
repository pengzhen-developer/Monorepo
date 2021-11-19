<template>
  <!-- @focus.once 不知道为啥这么写，但会导致点击是出现无数据过一会又出来的情况，已暂时在created请求处理 -->
  <el-select :filter-method="getDeptList"
             @focus.once="getDeptList(value)"
             filterable
             placeholder="请选择科室名称"
             v-loadmore="loadMore"
             v-model="currentValue">
    <el-option :key="item.name"
               :label="item.name"
               :value="item.name"
               v-for="item in options"></el-option>
  </el-select>
</template>
<script>
import Service from '../service'

/**
 *
 * @param {String} value 查询的值
 * @param {Number} delay 防抖函数的延迟
 * @param {Number} parentDeptName 父级科室名称，没有名称则一级科室
 */

export default {
  name: 'DeptSelector',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      require: true
    },
    delay: {
      type: Number,
      default: 300
    },
    parentDeptName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      query: {
        pageNumber: 1,
        pageSize: 20
      },
      options: [],
      total: 0,
      debounce: '',
      currentValue: this.value
    }
  },
  watch: {
    currentValue(val) {
      this.$emit('change', val)
    },
    value(val) {
      this.currentValue = val
    },
    parentDeptName(val) {
      this.currentValue = ''
      this.getList('', val).then((rs) => {
        this.options = rs
      })
    }
  },
  created() {
    this.getDeptList(this.value)
  },
  methods: {
    // 搜索科室
    getDeptList(value) {
      if (typeof value !== 'string') {
        value = ''
      }
      // 防抖
      if (this.debounce) clearTimeout(this.debounce)

      this.debounce = setTimeout(() => {
        this.query.pageNumber = 1
        this.currentValue = value

        this.getList(this.currentValue, this.parentDeptName).then((rs) => {
          this.options = rs
        })
      }, this.delay)
    },
    // 加载更多科室
    loadMore() {
      // 如果没有更多科室了就不再请求了
      if (this.options.length % this.query.pageSize || this.options.length >= this.total) {
        return
      }

      this.query.pageNumber += 1

      this.getList(this.currentValue, this.parentDeptName).then((rs) => {
        this.options = [...this.options, ...rs]
      })
    },
    // 获取科室
    getList(value, pname) {
      const deptName = value
      const { pageNumber, pageSize } = this.query

      // 存在父级科室，查询二级科室列表
      if (pname) {
        if (pname === 'no-select') return Promise.resolve([])

        return Service.getLevel2DeptList({
          platdeptName: pname,
          platdeptLevel2Name: deptName,
          p: pageNumber,
          size: pageSize
        }).then((res) => {
          this.total = res.data.total
          return Promise.resolve(res.data.list)
        })
      }

      // 查询一级科室列表
      return Service.getDeptList({ platDeptName: '', p: pageNumber, size: pageSize }).then((res) => {
        this.total = res.data.total
        return Promise.resolve(res.data.list)
      })
    }
  },
  directives: {
    loadmore: {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
        SELECTWRAP_DOM.addEventListener('scroll', function() {
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
          if (condition) {
            binding.value()
          }
        })
      }
    }
  }
}
</script>
