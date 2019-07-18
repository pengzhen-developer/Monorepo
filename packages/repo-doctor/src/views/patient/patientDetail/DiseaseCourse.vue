<template>
  <div>
    <div class="info-row-first">
      <span class="name">郑涛</span>
      <span class="sex">男</span>
      <span class="age">24岁</span>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>标签</span>
      </div>
      <div class="info-row-content">无</div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>诊断</span>
      </div>
      <div class="info-row-content">无</div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>基本病情</span>
      </div>
      <div class="info-row-content">无</div>
    </div>
    <div class="info-detail">
      <div class="title">患者病程</div>
      <div class="tabs">
        <el-button type="text">最早病程置顶</el-button>/
        <el-button type="text">最新病程置顶</el-button>
      </div>
      <div class="info-detail-item">
        <div class="item-title">
          <span class="text">首诊</span>
          <span class="date">2018-12-23</span>
        </div>
        <div class="item-conytent"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DiseaseCourse',
  data() {
    return {}
  },
  created() {}
}
</script>
<style lang="scss" scoped>
</style>
