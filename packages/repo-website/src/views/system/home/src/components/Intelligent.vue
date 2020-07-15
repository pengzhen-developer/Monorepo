<template>
  <div class="content">
    <div class="title">智能审方</div>
    <div class="item"
         :class="index%2==1&&'reverse'"
         v-for="(item,index) in list"
         :key="index">
      <div class="img">
        <el-image :src="require('../assets/images/znsf_'+item.url)"
                  lazy></el-image>
      </div>
      <div class="intro"
           :class="index%2==1?'right':'left'">
        <p class="text-gary"
           v-html="item.txt"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          url: '01.jpg',
          txt:
            '1）合理用药系统 <br>20 类药品审核项目<br> 药品规则自定义 <br>药品规则可视化编辑 <br>联合审方 <br>机构自定义规则管理<br> 处方实时查询 <br>知识库查询 <br>处方及用药统计分析'
        },
        {
          url: '02.jpg',
          txt:
            '2）医生用药干预系统（HIS 前置审方系统） <br>处方前置审核 <br>药师在线审方 <br>处方审核设置 <br>统计分析 <br>报表统计'
        },
        {
          url: '03.jpg',
          txt: '3）合理用药分析系统（处方点评系统） <br>处方点评 <br>医嘱点评 <br>点评设置 <br>处方审核统计'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  min-height: 1071px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f5f5f7;
  padding-top: 140px;
  padding-bottom: 110px;
  .title {
    margin-bottom: 90px;
  }
  .item {
    display: flex;
    width: 100%;
    height: 500px;
    margin-bottom: 30px;
    &.reverse {
      flex-direction: row-reverse;
    }
    .img {
      width: 55.16%;
      height: 100%;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
    .intro {
      flex: 1;
      display: flex;
      align-items: center;
      background-color: #fff;
      &.left {
        justify-content: flex-start;
        padding-left: 90px;
        margin-left: 30px;
      }
      &.right {
        justify-content: flex-start;
        padding-left: 140px;
        margin-right: 30px;
      }
    }
  }
}
</style>