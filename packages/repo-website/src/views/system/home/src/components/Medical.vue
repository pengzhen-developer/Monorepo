<template>
  <div class="gary">
    <div class="content">
      <div class="title">药事服务</div>
      <div class="intro text-gary"
           v-html="txt">
      </div>
      <el-image :src="require('../assets/images/ysfw.jpg')"
                lazy></el-image>
      <el-row class="list"
              type="flex">
        <el-col :span="12"
                v-for="(item,index) in list"
                :key="index">
          <div class="item">
            <el-image :src="item.url"
                      v-if="item.url"
                      lazy></el-image>
            <p class="text-gary">{{item.txt}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      txt:
        '平台为医疗机构提供药事服务，解决处方外流后的患者用药安丘、用药方式问题。为患者提供用药疗效、 病情维护、疾病管理、用药安全服务，扩大药师价值和服务范围。',
      list: [
        { url: '', txt: '1）患者的用药安全，例如适应症、禁忌、用法用量等；' },
        { url: '', txt: '2）线上用药指导，患者随时查看处方的用药方法；' },
        { url: '', txt: '3）为患者提供药事的咨询和沟通，药师在线为患者提供用药建议；' },
        { url: '', txt: '4）药师可以为患者提供个体化指导、个体化监护，定期了解患者用药和病情；' },
        { url: '', txt: '5）建立患者病情管理档案，更全面的记录患者用药情况；' },
        { url: '', txt: '6）特殊病种的管理，例如慢病管理、癌痛管理，并给出有效的建议；' }
      ]
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
    margin: 90px 0 110px;
  }
  .el-image {
    width: 980px;
    height: 310px;
  }
  .list {
    margin-top: 30px;
    flex-wrap: wrap;
    width: 100%;
    .item {
      margin-top: 56px;
      flex: 1;
      padding-right: 90px;
      box-sizing: border-box;
      .el-image {
        width: 39px;
        height: 36px;
      }
      p {
        margin-top: 28px;
      }
    }
  }
}
</style>