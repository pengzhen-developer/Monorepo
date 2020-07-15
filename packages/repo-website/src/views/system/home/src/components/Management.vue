<template>
  <div>
    <div class="white">
      <div class="title">{{data.title}}</div>
      <div class="list">
        <div class="item"
             :class="index%2==1&&'reverce'"
             v-for="(item,index) in data.list"
             :key="index">
          <div class="left">
            <el-image class="smallImg"
                      :src="require('../assets/images/cp_'+item.url)"
                      lazy></el-image>
          </div>
          <div class="right"
               :class="index%2==1?'pr':'pl'">
            <div class="sub-title">{{item.title}}</div>
            <p class="size-main"
               v-html="item.txt"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="gary">
      <div class="sub-title">产品架构/流程</div>
      <div class="bigImg">
        <el-image :src="require('../assets/images/cp_'+data.imgUrl)"
                  lazy></el-image>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        title: '处方管理服务',
        list: [
          {
            url: 'cf_ms.jpg',
            title: '产品描述',
            txt:
              '解决处方的合规合理问题，为医疗机构提供最全面的处方审核服务，配套产品主要为：合理用药系统、医 生用药干预系统和合理用药分析系统。线下实体医院、线上互联网医院、医联体及其他医疗机构均可接入 厨房审核中心，对于医联体、实体医院及其对应的互联网医院，可实现“构建一套系统、共享一套数据、 通用一套规则、服从一套管理”的目标.'
          },
          {
            url: 'cf_td.jpg',
            title: '产品特点',
            txt:
              '系统专业性：联合全国 20 余家三甲医院共同制定临床用药通用规则，处方审核项目达 20 条，涵盖适应症、 禁忌症、给药途径、用药频次、相互作用、年龄等《医疗机构处方审核规范》中要求必须审核的内容。 <br>系统审方便捷性：审方系统和医院系统可以通过多种接口方式进行对接，以达到实时干预、实时审方、实 时分析的效果，平均审核一张处方仅需要 0.6 秒。<br>人工审方快速性：直接通过浏览器网页登录处方审核及流转平台即可审方。 <br>审方规则完善性：系统已完成 12,500 个药品的通用规则，共有 140,000 条处方审核规则.处方可追溯：从 医生开方、药师审方到患者将处方转订单、下单购药再到药品配送、患者签收，全程数据追逐，做到可监 控、可检查、可追溯。<br>处方真实性：平台要求对接的处方源需要有医生真实的电子签名作为开处方的凭据，平台也为处方提供药 师的电子签名作为处方审核的唯一凭据，保障处方的真实性、权威性和可追溯性。<br>规则自定义：医疗机构可对药品规则进行自定义编辑和维护，规则库对接入平台的医疗机构开放。<br>药学知识库：系统提供 44,000 多份药品说明书信息，药师及医生可以查询对应的药品说明书信息。'
          }
        ],
        imgUrl: 'cf_lc.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gary {
  background-color: #f5f5f7;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.white {
  background-color: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.white {
  .title {
    padding: 140px 0 60px 0;
  }
}

.smallImg {
  width: 490px;
  height: 564px;
  // height: 300px;
}
.list {
  width: 100%;
  padding: 0 30px;
  .item {
    width: 100%;
    display: flex;
    margin-bottom: 30px;
    &.reverce {
      flex-direction: row-reverse;
    }
    .right {
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      background: #00c6ae;
      padding-left: 60px;
      color: #fff;
      &.pr {
        margin-right: 30px;
      }
      &.pl {
        margin-left: 30px;
      }
      p {
        margin-top: 10px;
        width: 66.66%;
      }
    }
  }
}
.gary {
  .sub-title {
    padding: 140px 0 60px 0;
    background: #fff;
    width: 100%;
    text-align: center;
  }
}
.bigImg {
  width: 100%;
  height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-image {
    width: 975px;
    height: 444px;
  }
}
</style>