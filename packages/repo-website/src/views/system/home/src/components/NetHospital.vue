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
        title: '互联网云医院',
        list: [
          {
            url: 'hlw_ms.jpg',
            title: '产品描述',
            txt:
              '提供线上患者多维度便捷服务，方便患者，提高患者获取健康服务的效率。可在线开展部分常见病、慢性 病网上复诊服务，延伸至区域医疗协作、面向药企和保险的数据服务等，构建多边参与、高度和谐的互联 网医疗生态。实体医院机构可结合自身业务情况选择性开通标准化互联网医院部分服务。'
          },
          {
            url: 'hlw_td.jpg',
            title: '产品特点',
            txt:
              '便捷性: 聚焦医疗服务连续性，提升患者就医体验;流程线上化，提高多方协作效率 <br>及时性: 实时获取门诊、住院、支付、保险、物流等完整的诊疗数据。打破传统医疗在时间、空间的约束 限制<br>专业性: 根据国家颁布的相关法律法规，持续在医疗健康行业深耕，服务贴合真实医疗场景 <br>灵活性: 提供多场景产品服务，支持具体互联网医院结合自身实际灵活选择开通的服务种类'
          }
        ],
        imgUrl: 'net_lc.png'
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
    width: 700px;
    height: 469px;
  }
}
</style>