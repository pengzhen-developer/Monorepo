<template>
  <div class="content">
    <div class="banner">
      <el-image :src="require('../assets/images/around_banner.jpg')"
                lazy></el-image>
    </div>
    <div class="sub-menu">
      <div class="main">
        <div class="sub-title">关于我们</div>
      </div>
    </div>
    <div class="company-item"
         style="width:100%;"
         v-for="(item,index) in companys"
         :key="index">
      <div class="title">{{item.title}}</div>
      <div class="msg"
           v-html="item.msg"></div>
      <el-image :src="require('../assets/images/'+item.img)"
                v-if="item.img"
                lazy></el-image>
    </div>
    <div class="jobs">
      <el-image class="job-bg"
                :src="require('../assets/images/job_bg.jpg')"
                lazy></el-image>
      <div class="company-item"
           style="width:100%;">
        <div class="title">{{jobTitle}}</div>
        <div class="msg"
             v-html="jobMsg"></div>
      </div>
      <div class="tip">社会招聘：
      </div>
      <div class="container">
        <div class="arrow-right"
             @click="seeMore">>></div>
        <div class="job-list"
             ref="more">
          <div class="job-item"
               v-for="(item,index) in jobs"
               :key="index"
               @click="seeDetail(item)">
            <el-image :src="require('../assets/images/job_'+item.logo)"
                      lazy></el-image>
            <div class="job-title">{{item.job}}</div>
            <div class="size-sub">职责描述:</div>
            <div class="job-info">{{item.info}}</div>
            <div class="job-more">查看详情 > </div>
          </div>
        </div>
      </div>
    </div>
    <PeaceDialog :visible.sync="dialogVisibleFlag"
                 center
                 width="980px">
      <el-image :src="require('../assets/images/job_'+dialogVisibleData.logo)"
                v-if="dialogVisibleData.logo"
                lazy></el-image>
      <div class="dia-title">{{dialogVisibleData.job}}</div>
      <p class="size-main"
         v-html="dialogVisibleData.content"></p>

    </PeaceDialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisibleData: '',
      dialogVisibleFlag: false,
      companys: [
        {
          title: '公司介绍',
          img: '',
          msg:
            '全息云通健康科技（武汉）有限公司是中国互联网医疗发展的创新实践者，公司管理团队是由一支在互联网医疗领域深耕10年的专业团队组成，根据合作伙伴的精益需求和对行业的深入理解，公司率先推出互联网医院+智慧药事服务共享平台，形成了集建设和运营一体化的独特模式。'
        },
        {
          title: '企业愿景',
          img: 'around_bg.jpg',
          msg:
            '该平台集灵活的平台应用、安全的数据保障，专业的运营服务以及自有大健康产品与服务供应链，为政府、医疗机构提供从牌照申请、平台建设到平台运营的一站式服务，为医院、医生和患者提供一个高效的大健康生态服务平台，扩大医疗机构服务半径，提高医生服务效率，实现患者便捷就医、真正通过互联网技术为老百姓提供专业、安全、信任的互联网医疗服务。'
        }
      ],
      jobTitle: '加入我们',
      jobMsg:
        '全息人才观:能力择才 品德立才 实战育才 平台留才 全息倡导“家文化”，真诚欢迎您的加入! <br>在这里我们会通过成长性的薪金和福利、完美的培训、竞升等制度的实施使这一理念成为现实。',
      jobs: [
        {
          logo: '01.png',
          job: '产品经理(武汉、北京)',
          info:
            '1.产品工作 3 年以上，有主导产品策划并完整推进产品上线经验; 2.有良好运营思维和产品架构能力，跨部门沟通能力和项目协调能力; 3.擅长业务规划、需求分析，对用户需求有敏锐的感知能力; 4.对医疗互联网行业有浓厚的兴趣或有互联网医疗从业经验者优先;5.有 C 端 APP 产品原型设计经验，能独立完成产品的 MRD PRD 文档构建，有成功的产品设计经验; 6.有疾病医疗 C 端产品、社交内容电商产品经理经验优先; 7.头部医疗互联网公司任职经验优先:平安好医生、好大夫、微医等。',
          content:
            '职责描述:<br>1.产品工作 3 年以上，有主导产品策划并完整推进产品上线经验; 2.有良好运营思维和产品架构能力，跨部门沟通能力和项目协调能力; 3.擅长业务规划、需求分析，对用户需求有敏锐的感知能力; 4.对医疗互联网行业有浓厚的兴趣或有互联网医疗从业经验者优先;5.有 C 端 APP 产品原型设计经验，能独立完成产品的 MRD PRD 文档构建，有成功的产品设计经验; 6.有疾病医疗 C 端产品、社交内容电商产品经理经验优先; 7.头部医疗互联网公司任职经验优先:平安好医生、好大夫、微医等。<br><br>任职要求:<br>1. 分析医疗市场，对于 2B/2C/2G 用户群体和客户有一定了解，擅长规划业务框架和产品定位; 2.完成需求收集、方案讨论和产品设计全流程，参与 UI 设计、产品开发及测试上线的全流程; 3.承接不同业务部门及渠道的需求对接，评估业务推广的场景和具体方案; 4.结合运营情况、各渠道用户反馈及时改进优化产品。'
          // <br>联系人:杨经理 <br>邮箱:yangjj@jk.com
        },
        {
          logo: '02.png',
          job: '产品总监(武汉、北京)',
          info:
            '1、负责建立产品部门的管理、组织、流程、绩效、分工、协同; 2、负责分析事业部各个相关业务的效能现状和情况，做好需求管理、需求分析、组织需求优先级评定; 3、主导设计产品，及持续不断的改进产品功能和体验; 4、协助内部相关方升级或迁移到新产品，确保业务能够长期保持蓬勃发展; 5、组织团队提供必要的文档和技术指导，为用户使用我们的产品(新产品以及后续更新)提供保障。 6.头部医疗互联网公司任职经验优先:平安好医生、好大夫、微医、春雨、企鹅医生等。',
          content:
            '职责描述:<br>1、负责建立产品部门的管理、组织、流程、绩效、分工、协同; 2、负责分析事业部各个相关业务的效能现状和情况，做好需求管理、需求分析、组织需求优先级评定; 3、主导设计产品，及持续不断的改进产品功能和体验; 4、协助内部相关方升级或迁移到新产品，确保业务能够长期保持蓬勃发展; 5、组织团队提供必要的文档和技术指导，为用户使用我们的产品(新产品以及后续更新)提供保障。 6.头部医疗互联网公司任职经验优先:平安好医生、好大夫、微医、春雨、企鹅医生等。<br><br>岗位要求:<br>1、必须要有互联网医疗、大健康行业五年及以上背景;<br>2、具备同时开展多个产品项目并进行管理协调的经验，抗压能力强，在快节奏环境中能够冷静开展工作并 保持良好判断;<br>3、具备出色的书面和口头沟通能力及演讲能力，能够很好的表达产品理念及其设计; 4、具备良好的团队合作精神，能够跨多个业务领域、多个部门展开协作;<br>5、有业务 0-1 成功经历，在以往工作期间表现出良好的创造和推动能力者优先; 6、有内部业务系统、平台、工具类产品工作经验及商业化思维优先<br>7、有一定的技术能力，例如 Python 等语言简单编程、使用 SQL 的经验、能构建 prototype 者优先'
          // <br>联系人:杨经理 <br>邮箱:yangjj@jk.com
        },
        {
          logo: '03.png',
          job: '商务拓展(武汉、北京)',
          info:
            '1、根据公司及部门发展的战略目标，积极开发客户资源; 2、按照公司营销计划，制订个人销售计划，并开展实施，完成公司下达的销售指标; 3、负责公司产品的市场调研、销售宣传、品牌推广等; 4、带领团队，配合公司做好新产品、新业务实施与落地服务。',
          content:
            '职责描述:<br>1、根据公司及部门发展的战略目标，积极开发客户资源; 2、按照公司营销计划，制订个人销售计划，并开展实施，完成公司下达的销售指标; 3、负责公司产品的市场调研、销售宣传、品牌推广等; 4、带领团队，配合公司做好新产品、新业务实施与落地服务。<br><br>任职要求:<br>1、本科以上学历，互联网行业 3-5 年从业背景 2、了解国家卫生政策和医疗机构的运作规律;熟悉医疗信息化行业产品市场及区域性医疗机构合作经验 3、具备出色的语言沟通表达能力提案能力;<br>4、有出色的团队搭建能力。'
          // <br>联系人:杨经理<br> 邮箱:yangjj@jk.com
        },
        {
          logo: '04.png',
          job: '运营总监(武汉、北京)',
          info:
            '1、负责医疗平台基础产品线的运营工作，制定运营目标及规划，并推动实现: 2、平台运营:制定合理的运营工作流程，建立有效的数据分析体系和运营工具，提升整天运营效率; 3、活动运营:对接各业务线终端的平台运营工作，对运营结果负责; 4、用户运营:配合相关部门，制定用户拉新、留存、召回等用户运营策略，建立用户全生命周期运营模式。 5、数据运营:对接公司 BI 团队，为各终端团队提供数据支持。',
          content:
            '职责描述:<br>1、负责医疗平台基础产品线的运营工作，制定运营目标及规划，并推动实现: 2、平台运营:制定合理的运营工作流程，建立有效的数据分析体系和运营工具，提升整天运营效率; 3、活动运营:对接各业务线终端的平台运营工作，对运营结果负责; 4、用户运营:配合相关部门，制定用户拉新、留存、召回等用户运营策略，建立用户全生命周期运营模式。 5、数据运营:对接公司 BI 团队，为各终端团队提供数据支持。<br><br>任职要求:<br>1、本科及以上学历。必须要有 5 年及以上互联网医疗行业工作经验，2 年以上团队管理经验; 2、有好奇心，对医疗行业和用户有敏锐的洞察力，目标感强，责任心强，执行力强，有很好的沟通能力和 组织协调力;<br>3、有数据分析能力，有社群运营、平台运营经验者优先。<br>联系人:杨经理 '
          // <br>邮箱:yangjj@jk.com
        },
        {
          logo: '05.png',
          job: '算法工程师',
          info:
            '1、针对不同特定场景中，制定多维度获取相关数据的策略; 2、负责基础数据挖掘，建立用户行为模型; 3、负责个性化推荐、个性化推送算法设计和优化; 4、负责推荐后台相关功能开发; 5、推荐算法的应用与调优，提升推荐效果。',
          content:
            '职责描述:<br>1、针对不同特定场景中，制定多维度获取相关数据的策略; 2、负责基础数据挖掘，建立用户行为模型; 3、负责个性化推荐、个性化推送算法设计和优化; 4、负责推荐后台相关功能开发; 5、推荐算法的应用与调优，提升推荐效果。<br><br>职位要求:<br>1、计算机相关专业本科及以上学历，有一定的算法和工程经验; 2、熟悉大规模数据挖掘、机器学习、概率统计和最优化算法、模式识别技术; 3、熟练掌握海量数据处理技术，有使用 Hadoop/Hive/MongoDb 分析存储海量数据的能力和经验; 4、编程基础扎实，熟悉算法数据结构，有较好的 Java/Python/C++等语言基础; 5、良好的团队合作和沟通能力。<br>【加分项】 1、有搜索/推荐相关领域的研发经验，并在某一个领域有深入积累; 2、有知名互联网公司工作经历'
          // <br>联系人:杨经理 <br>邮箱:yangjj@jk.com
        },
        {
          logo: '06.png',
          job: '薪酬绩效主管',
          info:
            '1、协助 HR 负责人搭建薪酬体系、制定薪酬策略和薪酬规划; 2、负责薪酬项目的设计和项目推动:职级体系、薪酬设计、销售激励、年度调薪、薪酬管理规范等; 3、负责薪酬分析、人力成本分析、人效分析为业务发展提供数据决策; 4、设计组织、员工级绩效考核方案，推广绩效考核工具、方法，协助各部门使用专业方法提取绩效指标， 保证绩效指标具有指向性;<br>5、负责考核结果的分析评估工作，为相关决策提供信息支持。',
          content:
            '职责描述:<br>1、协助 HR 负责人搭建薪酬体系、制定薪酬策略和薪酬规划; 2、负责薪酬项目的设计和项目推动:职级体系、薪酬设计、销售激励、年度调薪、薪酬管理规范等; 3、负责薪酬分析、人力成本分析、人效分析为业务发展提供数据决策; 4、设计组织、员工级绩效考核方案，推广绩效考核工具、方法，协助各部门使用专业方法提取绩效指标， 保证绩效指标具有指向性;<br>5、负责考核结果的分析评估工作，为相关决策提供信息支持。<br><br>任职要求:<br>1、人力资源相关专业本科以上学历，形象气质佳，3 年以上薪酬绩效实操工作经验，精通至少两种绩效考 核方法、流程，有互联网行业薪酬绩效实操经验为佳; 2、能独立进行薪酬、绩效、福利方案的策划及相关制度的制定; 3、熟悉人力资源管理各项实务的操作流程，熟悉国家各项劳动人事法律法规，熟悉薪酬福利管理相关规定; 4、良好的职业道德素养、仔细、认真、稳重、守秘，良好的沟通和理解能力，处事灵活、有条理、有团队 协作精神;<br>5、熟练掌握 office 办公软件，特别是 excel 函数操作熟练，具备良好的计算机操作水平，善于数据收集及分析; 6、有大型集团总部工作经验者优先。'
          // <br> 联系人:杨经理 <br>邮箱:yangjj@jk.com
        }
      ]
    }
  },
  methods: {
    seeMore() {
      let ele = document.querySelector('.job-list')
      let chgWidth = ele.offsetWidth / 4
      if (ele.scrollLeft < 2 * chgWidth) {
        ele.scrollLeft += chgWidth
      } else {
        ele.scrollLeft = 0
      }
    },
    seeDetail(data) {
      this.dialogVisibleData = Object.assign({}, data)
      this.dialogVisibleFlag = true
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.banner {
  width: 100%;
  height: 360px;
  .el-image {
    width: 100%;
    height: 100%;
  }
}
.sub-menu {
  // height: 43px;
  height: 0;
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
      // top: -240px;
      top: -330px;
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
.company-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  &:nth-child(3n) {
    padding-bottom: 110px;
    .title {
      padding: 140px 0 60px 0;
    }
  }
  &:nth-child(3n + 1) {
    padding-bottom: 90px;
    .title {
      padding: 90px 0 60px 0;
    }
  }
  &:nth-child(3n + 2) {
    padding-bottom: 40px;
    .title {
      padding: 108px 0 60px 0;
    }
  }
  .el-image {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .title {
    position: relative;
    z-index: 2;
  }
  .msg {
    color: #707070;
    font-size: 16px;
    line-height: 24px;
    width: 820px;
    position: relative;
    z-index: 2;
  }
}
.jobs {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 60px;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  position: relative;
  .company-item {
    color: #fff;
  }
  .msg {
    color: #fff;
    width: 100%;
    text-align: center;
  }
  .job-bg {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .tip {
    width: 1380px;
    color: #00c6ae;
    font-size: 17px;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 24px;
    margin-bottom: 34px;
    position: relative;
    z-index: 5;
  }
  .container {
    width: 1480px;
    padding: 0 50px;
    overflow-x: auto;
    position: relative;
    &::-webkit-scrollbar {
      display: none;
    }
    .arrow-right {
      position: absolute;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      right: 0px;
      font-size: 24px;
      top: 30%;
      z-index: 66;
      cursor: pointer;
    }
  }
  .job-list {
    width: 1392px;
    display: flex;
    position: relative;
    overflow-x: auto;
    .job-item {
      position: relative;
      z-index: 2;
      color: #fff;
      width: 348px;
      height: 434px;
      display: flex;
      flex: none;
      padding: 13px 30px 32px 30px;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      &::after {
        content: '';
        width: 1px;
        height: 150px;
        background: #d8d8d8;
        position: absolute;
        right: 0;
        top: 0;
      }
      &:first-child {
        &::before {
          content: '';
          width: 1px;
          height: 150px;
          background: #d8d8d8;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      &:hover {
        background-color: #00c6ae;
        .job-more {
          color: #fff;
          border-color: #fff;
        }
      }
      .size-sub {
        width: 100%;
      }
      .el-image {
        width: 106px;
        height: 106px;
      }
      .job-title {
        font-size: 24px;
        margin: 28px 0 16px 0;
      }
      .job-info {
        font-size: 14px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }
      .job-more {
        padding: 5px 7.5px;
        font-size: 14px;
        line-height: 20px;
        color: #00c6ae;
        border: 1px solid #00c6ae;
        border-radius: 2px;
        margin-top: 40px;
        cursor: pointer;
      }
    }
  }
}
::v-deep .el-dialog {
  background-color: #00c6ae;
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .el-dialog__body {
    padding-top: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #fff;
  }

  .el-image {
    width: 106px;
    height: 106px;
  }
  .dia-title {
    font-size: 24px;
    line-height: 32px;
    width: 100%;
    text-align: center;
    padding: 20px 0;
  }
}
</style>