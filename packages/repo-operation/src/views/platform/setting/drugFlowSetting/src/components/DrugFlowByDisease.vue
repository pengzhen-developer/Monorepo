/** 按病种 */

<template>
  <div>
    <div class="flex q-mb-md">
      <div class="em-6 text-justify">选择流向药店</div>
      <div class="q-mr-md">：</div>
      <div class="col">
        <el-tabs>
          <el-tab-pane label="普通订单"
                       lazy>
            <PharmacySelect v-bind:pharmacyRule="setRule('按病种')"
                            v-bind:pharmacyConf="setConf('普通')"
                            v-bind:data.sync="data"></PharmacySelect>
          </el-tab-pane>

          <el-tab-pane label="慢病重症订单"
                       lazy>
            <PharmacySelect v-bind:pharmacyRule="setRule('按病种')"
                            v-bind:pharmacyConf="setConf('重症')"
                            v-bind:data.sync="data"></PharmacySelect>
          </el-tab-pane>

          <el-tab-pane label="其它订单"
                       lazy>
            <PharmacySelect v-bind:pharmacyRule="setRule('按病种')"
                            v-bind:pharmacyConf="setConf('其它')"
                            v-bind:data.sync="data"></PharmacySelect>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANT from './../../constant'

import PharmacySelect from './../components/PharmacySelect'

export default {
  components: {
    PharmacySelect
  },

  props: {
    data: Array
  },

  methods: {
    setRule(type) {
      return CONSTANT.RULE_FLAG_MAP.find((item) => item.label === type)
    },

    setConf(type) {
      return CONSTANT.CONF_TYPE_MAP.find((item) => item.label === type)
    }
  }
}
</script>


<style lang="scss" scoped>
.em-6 {
  width: 6em;
  display: inline-block;
  text-align: justify;
  text-align-last: justify;
}

.el-tabs {
  ::v-deep .el-tabs__header {
    background: #fbfbfb;
    padding: 0 16px;
    border: 1px solid #e2e2e2;
    margin: 0;
  }

  ::v-deep .el-tab-pane {
    border: 1px solid #e2e2e2;
    padding: 16px;
  }

  ::v-deep .el-tabs__nav-wrap::after {
    top: -10px;
  }
}
</style>