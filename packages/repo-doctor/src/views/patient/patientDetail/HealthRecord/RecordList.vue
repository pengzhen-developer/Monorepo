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
    </div>
</template>

<script>
  import peace from '@src/library'
  import NoData from '@src/views/components/NoData'

  export default {
    name: "RecordList",
    props: {
      noDataText: String,
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
        list: [],
        count: 0,
        loading: false,
        p: 1,
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
        let {data, request} = this.requestData;
        // p、size 为组件内部管理的参数
        const params = {p: this.p, size: 10, ...data}
        request(params).then(res => {
          if (res.data && res.data.list && Array.isArray(res.data.list)) {
            this.list = this.list.concat(res.data.list)
            this.count = res.data.count
            this.p = this.p + 1
          }
          this.loading = false
        })
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
