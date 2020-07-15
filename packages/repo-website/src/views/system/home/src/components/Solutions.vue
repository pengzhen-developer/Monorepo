<template>
  <div>

    <div class="banner">
      <el-image :src="require('../assets/images/sol_banner'+url)"
                lazy></el-image>
    </div>
    <div class="sub-menu">
      <div class="main">
        <div class="sub-title">解决方案/{{title}}</div>
        <el-tabs v-model="model">
          <el-tab-pane v-for="item in subMenu"
                       :key="item.index"
                       :label="item.title"
                       :name="item.name">
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div>
      <Component :is="model"></Component>
    </div>
  </div>
</template>

<script>
import Constant from '../constant'
import Hospital from './Hospital'
import Delivery from './Delivery'
import Intelligent from './Intelligent'
import Prescriptions from './Prescriptions'
import Medical from './Medical'
export default {
  components: {
    Hospital,
    Delivery,
    Intelligent,
    Prescriptions,
    Medical
  },
  data() {
    return {
      subMenu: Constant.subMenuSol,
      model: Constant.subMenuSol[0].name
    }
  },
  computed: {
    title() {
      return this.subMenu.filter(item => item.name == this.model)[0].title
    },
    url() {
      return this.subMenu.filter(item => item.name == this.model)[0].url
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 255px;
  .el-image {
    width: 100%;
    height: 100%;
  }
}
.sub-menu {
  height: 43px;
  background-color: #f1f1f2;
  .main {
    width: 960px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .sub-title {
      position: absolute;
      left: 0;
      top: -240px;
      color: #fff;
      z-index: 6666;
      font-size: 21px;
    }
    ::v-deep .el-tabs__item {
      padding: 0 32px !important;
      text-align: center;
      height: 43px;
      line-height: 43px;
      color: #000;
      font-size: 16px;
      &.is-active {
        color: #333;
        background-color: #fff;
      }
    }
  }
}
</style>