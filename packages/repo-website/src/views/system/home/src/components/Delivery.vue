<template>
  <div class="gary">
    <div class="content">
      <div class="title">药品配送</div>
      <div class="intro text-gary">为满足医院业务需求，实现药品库存托管，减轻医院药品成本，为医院创建云仓。
        多供应商支持、配送范围可覆盖全国、药品库存随时调配、可保障安全供应
      </div>
      <div class="imgbg">
        <el-image :src="require('../assets/images/ypps.png')"
                  lazy></el-image>
      </div>
    </div>
  </div>

</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.gary {
  background-color: #f5f5f7;
}
.content {
  width: 980px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 140px 0;

  .intro {
    width: 570px;
    margin: 89px 0 66px;
  }
  .imgbg {
    width: 980px;
    height: 632px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .el-image {
    width: 759px;
    height: 455px;
  }
}
</style>