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
        title: '药事管理服务',
        list: [
          {
            url: 'ys_ms.jpg',
            title: '产品描述',
            txt:
              '以医院药师为主导，利用药学专业知识和工具，向患者、患者家属及其他关心用药的群体提供直接的、负 责的与药物使用相关的各类服务。药事服务是一种以病人为中心的主动服务，使病人得到安全、有效、经 济、合法的治疗药物。'
          },
          {
            url: 'ys_td.jpg',
            title: '产品特点',
            txt:
              '线上咨询：支持患者与药师线上咨询用药建议。<br>用药指导：支持患者通过处方查看药品用法用量，药品使用详情。<br>患者报告；为患者提供患者用药报告，包括患者处方记录，患者历史用药，用药疗程，咨询记录。<br>用药提醒：为患者提供用药提醒，并记录用药记录。'
          }
        ],
        imgUrl: 'ys_lc.png'
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
    width: 790px;
    height: 470px;
  }
}
</style>