<template>
  <div class="content">
    <div class="banner">
      <el-carousel trigger="click"
                   :autoplay="true"
                   height="828px">
        <el-carousel-item v-for="(item,index) in banner"
                          :key="index">
          <el-image style="width:100%;height:828px;"
                    :src="require('../assets/images/banner_'+item.url)"></el-image>
        </el-carousel-item>
      </el-carousel>
      <div class="banner-msg">
        <div class="title">智药云平台</div>
        <div class="pro-list">
          <div class="pro-item"
               v-for="item in proList"
               :key="item.text">{{item.text}}</div>
        </div>
        <div class="pro-tip">-综合解决方案-</div>
      </div>
    </div>
    <div class="flowChart">
      <el-image :src="require('../assets/images/home_lc.jpg')"></el-image>
    </div>
    <div class="web-hospital">
      <div class="title main-pd"><span>互联网+医疗行业趋势分析</span></div>
    </div>
    <div class="policys">
      <div class="pol-item">
        <div class="policy-left">
          <el-image :src="require('../assets/images/pol-bg.jpg')"
                    lazy></el-image>
        </div>
        <div class="policy-right">
          <p>
            政策利好不断释放，国家鼓励互联网+医疗行业发展。借助互联网+健康医疗服务，可精准匹配优质医疗资源与患者就医需求，让患者享受到更好的医疗服务。同时，专业药品供给与配送服务不断成熟，打通市民用药最后一公里。互联网+医疗行业一站式解决方案成大势所趋。
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="policys">
      <div class="policy-item"
           :class="item.bg"
           v-for="(item,index) in policys"
           :key="index">
        <div class="sub-title">{{item.title}}</div>
        <div class="policys-content text-gary"
             v-html="item.content"></div>
        <el-image :src="require('../assets/images/pro_'+item.img)"
                  lazy></el-image>
      </div>
    </div> -->

    <div class="introducing">
      <div class="title main-pd"><span>平台特性</span></div>
      <el-row :gutter="30"
              type="flex">
        <el-col :span="index<4?8:16"
                v-for="(item,index) in introducs"
                :key="index">
          <div class="grid-content">
            <el-image class="grid-bg"
                      :src="require('../assets/images/intro_bg_'+item.bgImg)"
                      lazy></el-image>
            <div class="before center"
                 :style="{paddingRight:index==4&&'calc(100%/2 - 30px)'}">
              <el-image class="grid-logo"
                        :src="require('../assets/images/intro_logo_'+item.logo)"
                        lazy></el-image>
              <div class="title">{{item.title}}</div>
              <div class="grid-tip"
                   :style="{width:index<4&&'65%'}"
                   v-html="item.content"></div>
            </div>
            <div class="after center"
                 :style="{paddingRight:index==4&&'calc(100%/2 - 30px)'}">
              <el-image class="grid-logo"
                        :src="require('../assets/images/intro_logo_'+item.logo)"
                        lazy></el-image>
              <div class="title">{{item.title}}</div>
              <div class="grid-line"></div>
              <div class="grid-tip"
                   :style="{width:index<4&&'65%'}"
                   v-html="item.content"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="partners">
      <div class="title"><span>合作伙伴</span></div>
      <div class="part-list">
        <div class="part-item"
             v-for="(item,index) in partners"
             :key="index">
          <el-image :src="require('../assets/images/partner_'+item.img)"
                    lazy></el-image>

        </div>
      </div>
    </div>
    <div class="customer">
      <div class="title"><span>客戶</span></div>
      <div class="cust-list">
        <div class="cust-item"
             v-for="(item,index) in customer"
             :key="index">
          <el-image class="cust-bg"
                    :src="require('../assets/images/customer_'+item.logo)"
                    lazy></el-image>
          <div class="before">
            <div class="logo"></div>
            <div class="content">{{item.content}}</div>
          </div>
          <div class="after">
            <div class="logo">
              <el-image :src="require('../assets/images/customer_'+item.logo)"
                        lazy></el-image>
            </div>
            <div class="content">{{item.content}}</div>
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
      banner: [{ url: '01.jpg' }, { url: '02.jpg' }, { url: '03.jpg' }],
      proList: [{ text: '互联网云医院' }, { text: '处方管理服务' }, { text: '药事管理服务' }, { text: '多店云仓配送' }],
      policys: [
        {
          title: '• 政策利好不断释放',
          content: '国家鼓励互联网+医疗行业发展',
          img: '01.png',
          bg: 'bg_purple'
        },
        {
          title: '• 互联网+健康医疗创新模式，体现“以患者为核心”',
          content: '借助互联网+健康医疗服务，<br>精准匹配优质医疗资源与患者就医需求，<br>让患者享受到更好地医疗服务。',
          img: '02.png',
          bg: 'bg_cyan'
        },
        {
          title: '• 专业药品供给与配送，打通市民用药最后一公里',
          content: '全过程可监管、可追溯，<br>确保市民合理用药和用药安全',
          img: '03.png',
          bg: 'bg_azure'
        }
      ],
      introducs: [
        {
          bgImg: '01.jpg',
          logo: '01.png',
          title: '开放性',
          content: '任何具有资质的机构都可以享受医疗服务、药品配送服务、线上支付服务'
        },
        {
          bgImg: '02.jpg',
          logo: '02.png',
          title: '组件化',
          content: '标准化的产品功能组件，即插即用、按需定制接入、定期无感升级'
        },
        {
          bgImg: '03.jpg',
          logo: '03.png',
          title: '智能化',
          content: '智能审方系统、店配/仓配偏好配送算法、医保报销比例自动计算，提升服务体验'
        },
        {
          bgImg: '04.jpg',
          logo: '04.png',
          title: '安全性',
          content: '用户医疗数据全程留痕可追溯、数据传输加密、定期风险评估和审计、完善的灾备方案'
        },
        {
          bgImg: '05.jpg',
          logo: '05.png',
          title: '可监管',
          content: '• 电子处方及流转数据实时传输和共享 <br> • 异常处方风险提示与上报<br>• 监测医保统筹消耗主体'
        }
      ],
      partners: [{ img: '01.png' }, { img: '02.png' }, { img: '03.png' }, { img: '04.png' }],
      customer: [
        { logo: '01.jpg', content: '五莲县人民医院互联网医院' },
        { logo: '02.jpg', content: '与微医强强联合，实现店配和仓配两种药品配送模式' },
        { logo: '03.jpg', content: '湖北省人民医院云药房合作' },
        { logo: '04.jpg', content: '承接武汉市中心医院 B2C 药品配送模式' }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.auto {
  margin: 0 auto;
}
::v-deep .el-carousel__indicator--horizontal {
  padding: 12px 10px;
  .el-carousel__button {
    background-color: #fff;
    width: 48px;
    height: 4px;
  }

  &.is-active {
    .el-carousel__button {
      background-color: #00c6ae;
      width: 48px;
      height: 4px;
    }
  }
}

.banner,
.customer,
.partners {
  width: 100%;
}
.banner {
  position: relative;
  .banner-msg {
    position: absolute;
    top: 23%;
    left: 0;
    width: 100%;
    z-index: 777;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    .title {
      font-family: FZZZHONGJW--GB1-0, FZZZHONGJW--GB1;
    }
    .pro-list {
      display: flex;
      justify-content: center;
      align-items: center;
      .pro-item {
        margin-top: 5px;
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 24px;
        padding: 0 10px;
        border-right: 1px solid #fff;
        &:last-child {
          border: 0;
        }
      }
    }
    .pro-tip {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      line-height: 25px;
      margin-top: 28px;
    }
  }
}
.title {
  text-align: center;
  span {
    position: relative;
    z-index: 10;
    // &::after {
    //   content: '';
    //   position: absolute;
    //   width: calc(100% + 20px);
    //   height: 16px;
    //   bottom: 4px;
    //   left: -10px;
    //   background: linear-gradient(311deg, rgba(72, 214, 153, 1) 0%, rgba(68, 204, 119, 1) 100%);
    //   z-index: -1;
    // }
  }
}
.sub-title {
  text-align: center;
}
.flowChart {
  background-color: #edfcff;
  text-align: center;
  .el-image {
    width: 1200px;
    height: 600px;
  }
}
.main-pd {
  padding: 140px 0 60px 0;
}
.web-hospital {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-content: center;
  justify-content: center;
  position: relative;
}
.pol-item {
  height: 560px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .policy-left {
    flex: 1;
    height: 100%;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  .policy-right {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00c6ae;
    color: #fff;
    font-size: 28px;
    line-height: 39px;
    p {
      width: 65%;
    }
  }
}
.policy-item {
  height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &.bg_purple {
    background: radial-gradient(rgba(234, 242, 253, 1) 0%, rgba(227, 238, 252, 1) 25%, rgba(190, 203, 224, 1) 100%);
    .el-image {
      width: 1185px;
      height: 369px;
    }
  }
  &.bg_cyan {
    background: radial-gradient(rgba(234, 241, 253, 1) 0%, rgba(227, 246, 252, 1) 25%, rgba(198, 207, 224, 1) 100%);
    .el-image {
      width: 846px;
      height: 359px;
      margin-top: 60px;
    }
  }
  &.bg_azure {
    background: radial-gradient(rgba(234, 253, 243, 1) 0%, rgba(227, 252, 251, 1) 25%, rgba(198, 213, 224, 1) 100%);
    .el-image {
      width: 754px;
      height: 360px;
      margin-top: 80px;
    }
  }

  .policys-content {
    text-align: center;
    margin: 20px 0 15px 0;
  }
}

.introducing {
  background: #f6f6f6;

  .el-row {
    flex-wrap: wrap;
    margin: 0 !important;
    padding: 0 15px;
  }
  .grid-content {
    height: 400px;
    position: relative;
    margin-bottom: 30px;
    color: #ffffff;
    overflow: hidden;
    &:hover {
      .after {
        top: 0;
      }
      .before {
        opacity: 0;
      }
    }
    .grid-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .before {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: #000;
      opacity: 0.6;
      transition: all 1s ease-in-out;
      .title {
        margin: 52px 0 16px 0;
      }
    }
    .after {
      top: -100%;
      transition: all 1s ease-in-out;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 12;
      background-color: #00c6ae;
      opacity: 0.8;
      .title {
        margin: 40px 0 34px 0;
      }
    }
    .grid-logo {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .grid-tip {
      font-size: 16px;
    }
    .grid-line {
      width: 80px;
      height: 4px;
      background: #fff;
      margin-bottom: 28px;
    }
  }
}
.partners {
  height: 474px;
  padding: 110px 0 90px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background: linear-gradient(rgba(234, 241, 253, 1) 0%, rgba(227, 246, 252, 1) 25%, rgba(198, 207, 224, 1) 100%);
  .part-list {
    width: 1072px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .part-item {
      width: 268px;
      height: 156px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-image {
        max-width: 90%;
        max-height: 90%;
      }
      &:hover {
        background: rgba(255, 255, 255, 0.4);
        box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.customer {
  height: 650px;
  background-color: #f6f6f6;
  padding: 140px 0 90px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  .cust-list {
    margin-top: 60px;
    width: 1374px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cust-item {
      width: 321px;
      height: 233px;
      position: relative;
      overflow: hidden;
      &:hover {
        .after {
          opacity: 1;
        }
      }
      .cust-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 170px;
        z-index: 1;
      }
      .before {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.6);
        .content {
          background: #e6e6e6;
          padding: 0 50px;
        }
      }
      .after {
        transition: all 1s ease-in-out;
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 12;
        background-color: #ffffff;
        left: 0;
        bottom: 0;
        .content {
          background: #00c6ae;
          color: #fff;
          padding: 0 50px;
        }
      }
      .logo {
        height: 170px;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-image {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 63px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        line-height: 24px;
        text-align: center;
      }
    }
  }
}
</style>