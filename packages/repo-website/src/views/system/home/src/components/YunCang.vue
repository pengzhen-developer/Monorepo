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
        title: '多店云仓配送',
        list: [
          {
            url: 'yc_ms.jpg',
            title: '产品描述',
            txt:
              '平台搭建的多渠道药品供应保障体系，可同时提供“供应商仓直配”以及“药品自提以及药店送药上门” 模式。平台可接入药品供应企业、B2C 电商平台、DTP 药店、院内药房及院外药店，并在相应的应用终端将处方转化为药品订单，实现处方流转及药品供应。'
          },
          {
            url: 'yc_td.jpg',
            title: '产品特点',
            txt:
              '药品库存：实时同步各供应商库房药品库存。<br>处方订单：患者线上下单支付，药品智能调配。<br>药品配送： 供应商仓库直配，同步配送信息。<br>智能分单：支持多供应商接入，智能化调配分单规则。'
          }
        ],
        imgUrl: 'yc_lc.png'
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
    width: 588px;
    height: 481px;
  }
}
</style>