<template>
  <div>
    <template>
      <div class="q-mx-md">
        <q-timeline layout="loose">
          <q-timeline-entry v-for="(item,index) in list"
                            :key="index"
                            :title="getText(item.Status, item.InterceptName) ">
            <div slot="default"
                 class="content-style">
              <div v-for="(item,index2) in item.RemarkList"
                   v-bind:key="index2">{{item}}</div>
            </div>
            <div slot="subtitle">
              <div class="subtitle-top">{{Peace.util.formatDate(item.CreateTime,'MM-DD')}}</div>
              <div class="subtitle-bottom">{{Peace.util.formatDate(item.CreateTime,'HH:mm:ss')}}</div>
            </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </template>
  </div>
</template>

<script>
import Service from '../service'
export default {
  props: {
    orderId: String
  },
  data() {
    return {
      list: [],
      // 流转状态
      remoteSource: {
        InterceptStatus: []
      }
    }
  },
  filters: {
    formatDictionary(value, source, format = '') {
      if (!Peace.validate.isEmpty(value)) {
        return source.find((item) => item.value.toString() === value.toString())?.label
      }
      return format
    }
  },
  async created() {
    this.remoteSource.InterceptStatus = await Peace.identity.dictionary.getList('InterceptStatus')
    Service.getInterceptOrderDetails({ orderId: this.orderId }).then((res) => {
      this.list = res.data?.list || []
    })
  },
  methods: {
    getSide(index) {
      return index % 2 == 0 ? 'left' : 'right'
    },
    getText(status, name) {
      let txt = ''
      txt = this.remoteSource.InterceptStatus.find((item) => item.value.toString() === status.toString())?.label
      if (status == 2) {
        //拼接加空格
        txt += `    ${name}`
      }
      return txt
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .q-timeline--loose .q-timeline__subtitle {
  width: 24%;
}
::v-deep .q-timeline--loose .q-timeline__content {
  width: 76%;
}
::v-deep .q-timeline--loose .q-timeline__dot {
  left: 24%;
}
::v-deep .q-timeline__content h6 {
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 18px;
  font-weight: 500;
  color: #323233;
  white-space: pre-wrap;
}
::v-deep .q-timeline__dot:before {
  width: 8px;
  height: 8px;
  box-shadow: 0px 0px 3px 3px rgba(48, 153, 166, 0.15);
}
::v-deep .q-timeline__dot:after {
  width: 2px;
  opacity: 1;
  top: 16px;
  bottom: 0;
  left: 3px;
  background: #eaeaea;
}
::v-deep .q-timeline__subtitle {
  opacity: 1;
}
.content-style {
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
}
.subtitle-top {
  font-size: 14px;
  color: #323233;
  line-height: 18px;
  font-weight: 400;
}
.subtitle-bottom {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 18px;
  font-weight: 400;
}
</style>