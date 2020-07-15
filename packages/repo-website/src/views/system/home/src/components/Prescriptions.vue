<template>
  <div class="gary">
    <div class="content">
      <div class="title">处方流转</div>
      <div class="intro text-gary"
           v-html="txt">
      </div>
      <div class="imgbg">
        <el-image :src="require('../assets/images/cflz.png')"
                  lazy></el-image>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      txt:
        '2019 年年底，新冠病毒肺炎疫情严峻，受疫情影响，国内部分非发热定点医院的门诊部、诊所先后宣布停 诊，部分药店关门，各地交通管制措施陆续加强。在医疗资源不足情况下，慢病患者续方难，常见病患者 寻医问诊难。由于居家防疫，许多慢病患者用药断档，盲目出门又存在买不到药或交叉感染风险。交通管 制下，许多药店均出现货品不足的问题，患者甚至辗转多个药店购药，仍买不到自己所需的药品，购药难。 政策监管部门应时发文，大力推动互联网诊疗发展。<br><br> 因此，平台为医疗机构提供处方流转解决方案。当医疗机构及互联网医院所开具的处方经过系统审方、药 师审核，并加盖药师电子签章后，可为相应的应用终端提供处方流转服务，扩大医疗机构服务范围，药品 目录种类，方便患者线上购药，在线医保支付，有效解决患者特别是慢病重症患者的用药问题。'
    }
  }
}
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
  padding: 140px 0 130px;

  .intro {
    width: 590px;
    margin: 90px 0 74px;
  }
  .imgbg {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 980px;
    height: 556px;
  }
  .el-image {
    width: 769px;
    height: 427px;
  }
}
</style>