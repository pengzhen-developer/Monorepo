<template>
  <div>
    <div class="gary">
      <div class="intro">
        <div class="title">互联网医院</div>
        <div class="sub-title">标准解决方案</div>
        <div class="text-gary">
          <p v-html="txt"></p>
        </div>
      </div>
    </div>
    <div class="white">
      <div class="process">
        <el-image class="img"
                  :src="require('../assets/images/cp_hlw_lc.png')"
                  lazy></el-image>
      </div>
    </div>
    <div class="gary">
      <div class="plan">
        <div class="sub-title">应用场景</div>
        <div class="list">
          <div class="item"
               v-for="(item,index) in list"
               :key="index">
            <el-image :src="require('../assets/images/sol_net_'+item.url)"
                      lazy></el-image>
            <p class="text-gary">{{item.txt}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      txt:
        '1）对患者，构建“便捷、高效、安全”的互联网医院，实现患者面诊外延，在线续方，用药安全，送药到 家的全程在线的医疗服务。<br>2）对医务工作者，打造智能化的高效工作平台，实现智能分诊，智能审方，智能调度等功能，提高全院的 医疗服务效率，减轻医生、药师、护士等医务工作者的劳动负担。<br> 3）对医院及医联体，打造以中心医院为主体的互联网医联体医院，扩大院内药事服务能力，遵循“构建 1 套系统、共享 1 套数据、通用 1 套规则、服从 1 套管理”的原则，整个系统由医院统一管理授权，资源分权共享，数据实时同步。<br>4）已对接并对外提供成熟的处方管理、药品供应等下游服务，同时开放对接其他厂家，满足不同医院的多 样化需求',
      list: [
        {
          url: '01.jpg',
          txt: '1)传统医院 为实体医院建设互联网医院，并因地制宜进行云部署/本地部署，协助医院开展互联网医院诊疗服务。 '
        },
        {
          url: '02.jpg',
          txt:
            '2）自有互联网医院 为互联网医院提供已对接的成熟的处方管理、药品供应升级服务或院方指定的第三方处方管理、药品供应 服务厂商对接服务 '
        },
        {
          url: '03.jpg',
          txt:
            '3）医联体 为医联体成员提供互联网医院便民服务、复诊续方等基础服务，提供双向转诊、远程会诊服务，服务开通、 服务流程可配置，患者诊疗数据在获取患者授权后全程医联体内共享 '
        },
        {
          url: '04.jpg',
          txt:
            '4）社区医院、村卫生室 为村卫生室、社区医院等初级医院提供远程问诊服务，支持基层医生通过手机、PC、电视等设备向中心医 院医生发起远程问诊，帮助基层医院更好的服务居民'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.gary {
  width: 100%;
  background-color: #f5f5f7;
}
.white {
  width: 100%;
  background-color: #fff;
}
.intro,
.process,
.plan {
  width: 960px;
  margin: 0 auto;
}
.intro {
  padding: 139px 196px 90px;

  .title {
    text-align: center;
  }
  .sub-title {
    margin-top: 90px;
    text-align: center;
    margin-bottom: 8px;
  }
}
.process {
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    width: 980px;
    height: 474px;
  }
}
.plan {
  height: 644px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .sub-title {
    margin: 0 auto 85px;
  }
  .list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .item {
      width: 206px;
      .el-image {
        width: 206px;
        height: 140px;
        margin-bottom: 26px;
      }
    }
  }
}
</style>