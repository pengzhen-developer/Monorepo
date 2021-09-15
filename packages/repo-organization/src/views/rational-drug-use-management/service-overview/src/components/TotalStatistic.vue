<template>
  <div class="row q-gutter-md q-mb-20">
    <div class="col"
         v-if="canShowcard('DASHBOARD_A')"
         v-on:click="gotoPage('DASHBOARD_A',{})">
      <div class="card-style">
        <div class='row'>
          <img class="img "
               src="../assets/img/drugCount.png">
          <div class="line"></div>
        </div>
        <div class="conut">
          <p>{{data.custDrugCount}}</p>
          <span>药品总数</span>
        </div>
      </div>
    </div>
    <div class="col"
         v-if="canShowcard('DASHBOARD_B')"
         v-on:click="gotoPage('DASHBOARD_B',{})">
      <div class="card-style">
        <div class="row">
          <img class="img "
               src="../assets/img/pharmacistCount.png">
          <div class="line"></div>
        </div>
        <div class="conut">
          <p>{{data.PharCount}}</p>
          <span>药师总数</span>
        </div>
      </div>
    </div>
    <div class="col"
         v-if="canShowcard('DASHBOARD_C')"
         v-on:click="gotoPage('DASHBOARD_C',{})">
      <div class="card-style">
        <div class="row">
          <img class="img "
               src="../assets/img/preCount.png">
          <div class="line"></div>
        </div>
        <div class="conut">
          <p>{{data.totalCount}}</p>
          <span>处方/医嘱总数</span>
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
  data() {
    return {}
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

<style scoped>
p {
  margin: 0;
  padding: 0;
}
.col {
  cursor: pointer;
}
.card-style {
  height: 126px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(48, 153, 166, 0.1);
  border-radius: 4px;
  padding: 36px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.img {
  width: 52px;
  height: 52px;
  margin-right: 50px;
}
.line {
  width: 1px;
  height: 60px;
  border-right: 1px solid #efefef;
  margin-top: 4px;
}
.conut p {
  height: 35px;
  line-height: 35px;
  font-size: 30px;
  font-weight: bold;
  color: #3099a6;
  margin-bottom: 10px;
  text-align: right;
}
.conut span {
  display: block;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 25px;
  text-align: right;
}
</style>