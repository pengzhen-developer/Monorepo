<template>
  <div class="row q-gutter-md">
    <div class="col"
         v-if="canShowcard('DASHBOARD_E')"
         v-on:click="gotoPage('DASHBOARD_E',{tabPosition:'left',status:20})">
      <div class="card-style">
        <img src="../assets/img/matchDrug.png" />
        <div>
          <p class="yellow">{{data.MappingCount}}</p>
          <span>匹配药品</span>
        </div>
      </div>
    </div>
    <div class="col"
         v-if="canShowcard('DASHBOARD_F')"
         v-on:click="gotoPage('DASHBOARD_F',{tabPosition:'right'})">
      <div class="card-style">
        <img src="../assets/img/auditDrug.png" />
        <div>
          <p class="purple">{{data.AwaitExamineCount}}</p>
          <span>待审核药品</span>
        </div>
      </div>
    </div>
    <div class="col"
         v-if="canShowcard('DASHBOARD_G')"
         v-on:click="gotoPage('DASHBOARD_G',{tabPosition:'left',status:0})">
      <div class="card-style">
        <img src="../assets/img/noMatchDrug.png" />
        <div>
          <p class="blue">{{data.NotMappingCount}}</p>
          <span>尚未配码</span>
        </div>
      </div>
    </div>
    <div class="col"
         v-if="canShowcard('DASHBOARD_H')"
         v-on:click="gotoPage('DASHBOARD_H',{checkPos:'2'})">
      <div class="card-style">
        <img src="../assets/img/applyRule.png" />
        <div>
          <p class="yellow">{{data.applyCount}}</p>
          <span>通用规则</span>
        </div>
      </div>
    </div>
    <div class="col"
         v-if="canShowcard('DASHBOARD_I')"
         v-on:click="gotoPage('DASHBOARD_I',{checkPos:'2'})">
      <div class="card-style">
        <img src="../assets/img/customRule.png" />
        <div>
          <p class="green">{{data.customCust}}</p>
          <span>自定义规则</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '@src/util'
export default {
  props: {
    data: {
      type: Object
    },
    controlledMenuList: {
      type: Array
    }
  },

  methods: {
    canShowcard(controlledSign) {
      return Util.control.canShowcard(controlledSign, this.controlledMenuList)
    },
    gotoPage(controlledSign, query = {}) {
      Util.control.gotoPage(controlledSign, query, this.controlledMenuList)
    }
  }
}
</script>

<style  lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.col {
  cursor: pointer;
}
.card-style {
  height: 134px;
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  img {
    width: 64px;
    height: 64px;
  }
  p {
    height: 32px;
    font-size: 28px;
    font-weight: bold;
    line-height: 32px;
    text-align: right;
  }
  .green {
    color: #06c3a2;
  }
  .blue {
    color: #1391ff;
  }
  .yellow {
    color: #fdab1a;
  }
  .purple {
    color: #915dd4;
  }
  span {
    height: 25px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 25px;
    text-align: right;
  }
}
</style>