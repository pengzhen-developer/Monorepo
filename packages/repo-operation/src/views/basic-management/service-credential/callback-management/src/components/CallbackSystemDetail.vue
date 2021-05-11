<template>
  <div>
    <template v-if="!isEdit">
      <div>
        <div class="title">机构名称</div>
        <div class="subtitle">{{ info.CustName }}/{{ info.SysName }}</div>
      </div>
      <el-divider></el-divider>
      <div>
        <div class="title">接口回调配置 <i class=" zyy-icon zyy-xiugai2 text-primary q-ml-6"
             @click="isEdit=true"></i>
        </div>

        <div v-for="(item, index) in list"
             v-bind:key="item.Code">
          <div class="subtitle">{{ index + 1 }}.{{ item.Label }}</div>
          <div v-if="showTxt(item)"
               class="txt">{{showResultText(item)}}</div>
        </div>

        <div class="q-mb-20"></div>
      </div>
    </template>
    <template v-else>
      <CallbackSystemModel :type="'edit'"
                           :info='info'
                           v-on:cancelEdit="cancelEdit"
                           v-on:completeEdit="completeEdit"
                           @onCancelEdit="isEdit=false"
                           @onSaveEdit="getInfo" />
    </template>
  </div>
</template>

<script>
import CallbackSystemModel from './CallbackSystemModel'
import Service from '../service/index'
export default {
  name: 'CallbackSystemDetail',
  components: { CallbackSystemModel },
  props: {
    info: Object
  },
  data() {
    return {
      isEdit: false,
      list: []
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.getInfo()
    })
  },
  methods: {
    getInfo() {
      const params = { custCode: this.info.CustCode, sysCode: this.info.SysCode }
      Service.getSyncStatusDetailList(params).then((res) => {
        this.list = res.data.list.filter((item) => {
          if (item.Value && (item.Value === 1 || item.Value === '1')) {
            return true
          } else {
            let array = item.Items ?? []
            return array.some((item) => item.Value === 1 || item.Value === '1')
          }
        })
      })
    },
    cancelEdit() {
      this.isEdit = false
      this.getInfo()
    },
    completeEdit() {
      this.$emit('refreshList')
      this.isEdit = false
      this.getInfo()
    },
    showTxt(item) {
      return item.Items && item.Items.length > 0 && item.Items.some((tmp) => tmp.Value === '1' || tmp.Value === 1)
    },
    showResultText(item) {
      return item.Items.filter((tmp) => tmp.Value === '1' || tmp.Value === 1)
        .map((tmp) => tmp.Label)
        .join('、')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 20px 0;
  background: #e9e9e9;
}
.title {
  position: relative;
  padding-left: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  line-height: 24px;
  margin-bottom: 24px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 22px;
    background: var(--q-color-primary);
    border-radius: 2px;
  }
}
.subtitle {
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
  margin-top: 12px;
}
.txt {
  background: #f9f9f9;
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.6);
  line-height: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
