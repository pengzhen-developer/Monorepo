// 前置审方

<template>
  <div v-if="data">
    <div class="q-mb-lg q-mt-sm flex justify-center items-center"
         v-bind:class="getTextThemeClass()">
      <el-image style="width: 30px; height: 30px;"
                v-bind:src="getIcon()"></el-image>
      <span class="text-h5 text-weight-bold q-ml-md">
        {{ data.actionMsg }}
      </span>
    </div>

    <div class="card q-mb-md q-mx-sm"
         v-for="checkItem in data.checkInfo"
         v-bind:key="checkItem.productCode">
      <div class="flex row items-center text-weight-bold q-py-md q-px-lg bg-grey-2">
        <div v-bind:class="getBackgroudThemeClass()"
             class="relative-position"
             style="width: 4px; height: 16px; left: -24px"></div>

        <span class="col-4 text-subtitle2 text-weight-bolder">{{ checkItem.drugName }}</span>
        <span v-bind:class="getBackgroudThemeClass()"
              class="text-white text-caption q-py-none q-px-sm">{{ checkItem.actionMsg }}</span>
      </div>

      <div class="content q-px-lg q-py-md">

        <div class="row"
             v-for="(checkLastItem, index) in checkItem.checkInfo"
             v-bind:key="checkLastItem.productCode + index">
          <div class="col-2 text-weight-bold">{{ checkLastItem.ruleMsg }}</div>
          <div class="col-2 text-weight-bold"
               v-bind:class="getTextThemeClass(checkLastItem.actionCode)">{{ checkLastItem.actionMsg }}</div>
          <div class="col">{{ checkLastItem.ruleMsgText }}</div>

          <el-divider v-if="index !== checkItem.checkInfo.length - 1"
                      class="q-my-md"></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const adiutThemeMap = {
  ['OK']: 'primary',
  ['I']: 'info',
  ['R']: 'warning',
  ['D']: 'negative',
  /** 失败 */
  ['FAIL']: 'negative',
  /** 服务调用失败 */
  ['SERVER_ERR']: 'negative'
}

export default {
  props: {
    data: Object
  },

  methods: {
    getIcon() {
      return require(`./assets/img/ic_${this.data?.actionCode}@2x.png`)
    },

    getTextThemeClass(code = this.data?.actionCode) {
      const theme = adiutThemeMap[code]

      return {
        [`text-${theme}`]: true
      }
    },

    getBackgroudThemeClass(code = this.data?.actionCode) {
      const theme = adiutThemeMap[code]

      return {
        [`bg-${theme}`]: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-info {
  color: #3e96f9 !important;
}

.bg-info {
  background: #3e96f9 !important;
}

.card {
  padding: 2px;
  background: rgba(245, 245, 245, 1);
  border-radius: 4px;

  .content {
    background: #fff;
    border-radius: 4px;
  }
}
</style>