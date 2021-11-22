// 前置审方

<template>
  <div>
    <el-empty v-if="propsError"
              description="请检查Props"></el-empty>
    <div v-loading="loading"
         style="min-height: 300px">

      <el-timeline>
        <time-line-item v-for="(log, index) in rulestData"
                        :key="index"
                        type="primary"
                        placement="left"
                        v-bind:timestamp="log.timestamp"
                        v-bind:timestampSpan="log.timestampSpan">
          <div class="column items-start">

            <span :style="{color: tagTextColor(log.action), 'border-color': tagBorderColor(log.action), 'background-color': tagBackgroundColor(log.action)}"
                  class="item-tag-style">
              {{tagText(log.action)}}
            </span>

            <div class="q-mt-8">
              <span class="q-mr-16 text-grey-333"
                    style="font-size: 12px;">{{log.name}}</span>
              <span class="text-grey-999"
                    style="font-size: 12px;">{{log.note}}</span>
            </div>
          </div>
        </time-line-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import TimeLineItem from './components/TimeLineItem'
import CONSTANT from './constant'
import Service from './service'
export default {
  name: 'PrescriptionCheckRecode',
  props: {
    data: {
      type: Array,
      required: false
    },
    id: {
      type: String,
      required: false
    }
  },

  components: {
    TimeLineItem
  },
  watch: {
    data: {
      handler: function(val, oldVal) {
        if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
          if (val && Object.keys(val).length > 0) {
            this.propsError = false
            this.rulestData = val
          } else {
            this.propsError = true
          }
        }
      },
      immediate: true
    },
    id: {
      handler: function(val, oldVal) {
        if (val !== oldVal) {
          if (!Peace.validate.isEmpty(val)) {
            this.propsError = false
            this.getResultInfo()
          } else {
            this.propsError = true
          }
        }
      },
      immediate: true
    }
  },
  // mounted() {
  //   if (!Peace.validate.isEmpty(this.id)) {
  //     this.getResultInfo()
  //   } else {
  //     this.propsError = true
  //   }
  // },

  data() {
    return {
      propsError: false,
      loading: false,
      rulestData: [],
      source: {
        PRESCRIPTION_CHECK_RESULT: CONSTANT.PRESCRIPTION_CHECK_RESULT
      }
    }
  },
  methods: {
    tagText(type) {
      return this.source.PRESCRIPTION_CHECK_RESULT[`${type}`].label
    },

    tagTextColor(type) {
      return this.source.PRESCRIPTION_CHECK_RESULT[`${type}`].color
    },

    tagBorderColor(type) {
      return this.source.PRESCRIPTION_CHECK_RESULT[`${type}`].borderColor
    },

    tagBackgroundColor(type) {
      return this.source.PRESCRIPTION_CHECK_RESULT[`${type}`].bgColor
    },

    getResultInfo() {
      this.loading = true
      Service.getPrescriptionLog({ jztClaimNo: this.id })
        .then((result) => {
          const list = result.data.map((item) => {
            let tmp = item
            let time = tmp.CreateTime
            item.timestamp = time.substring(0, 10)
            item.timestampSpan = time.substring(11, 19)
            return tmp
          })
          this.rulestData = list
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  font-size: 12px;
  .timeline-item {
    position: relative;
    padding: 20px 0 30px 10px;
    &:last-child {
      padding-bottom: 0;
      &::after {
        height: 90%;
      }
    }
    &::after {
      content: ' ';
      width: 1px;
      height: 100%;
      background-color: var(--q-color-primary);
      position: absolute;
      left: 0;
      top: 0;
    }
    &::before {
      content: ' ';
      width: 7px;
      height: 7px;
      border-radius: 7px;
      background-color: var(--q-color-primary);
      left: -3px;
      top: 0;
      position: absolute;
    }
    .time {
      position: absolute;
      left: 10px;
      top: -5px;
    }
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      line-height: 1;
      &.other {
        .el-image {
          width: 44px;
          height: 15px;
        }
      }
      .el-image {
        width: 13px;
        height: 13px;
        margin-right: 5px;
      }
    }
  }
}

.item-tag-style {
  text-align: center;
  padding: 0 7px;
  line-height: 15px;
  margin: 0;
  min-width: 44px !important;
  color: rgba(51, 51, 51, 0.6);
  font-size: 10px;
  border-radius: 8px;
  border: 1px solid rgba(51, 51, 51, 0.2);
}
</style>