<template>
    <div class="infinite-list-wrapper">
        <template v-if="list && list.length > 0">
            <div class="list"
                 v-infinite-scroll="load"
                 infinite-scroll-disabled="disabled">
                <div v-for="(item, index) in list"
                     :key="index">
                    <slot v-bind="item"></slot>
                </div>
            </div>
        </template>
        <template v-else>
            <NoData type="health"
                    :text="noDataText"></NoData>
        </template>
        <p v-if="loading">加载中...</p>
        <!-- <p v-if="noMore">没有更多了</p> -->
    </div>
</template>

<script>
  import peace from '@src/library'
  import NoData from '@src/views/components/NoData'
  export default {
    name: "RecordList",
    props: {
      noDataText: {
        type: String,
        default: '暂无数据'
      },
      requestData: {
        type: Object,
        default: () => {
        },
      }
    },
    components: {
      NoData
    },
    data() {
      return {
        list: [], //列表数据源
        count: 0, //列表总数
        loading: false, //加载状态
        pageIndex: 1, //请求页
      }
    },
    computed: {
      noMore() {
        return this.count <= this.list.length
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        if (peace.validate.isEmpty(this.requestData)) { return }
        //data 外部传入的请求参数、 request请求函数
        let {data, request} = this.requestData;
        // p、size 为组件内部管理的参数
        if (request && typeof request == "function") {
          const params = {p: this.pageIndex, size: 10, ...data}
          request(params).then(res => {
            if (res.data && res.data.list && Array.isArray(res.data.list)) {
              this.list = this.list.concat(res.data.list)
              this.count = res.data.count
              this.pageIndex = this.pageIndex + 1
            }
            this.loading = false
          })
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
    .infinite-list-wrapper {
        width: 380px;

        p {
            text-align: center;
        }

        .list {
            margin: 0 10px;
        }
    }
</style>
