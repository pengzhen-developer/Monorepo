<template>
  <div class="row q-gutter-md q-mb-20">
    <div class="col">
      <div class="card-style">
        <img src="../assets/img/noCheckPre.png" />
        <p class="green">{{data.uncheckedCount}}</p>
        <span>未审处方</span>
      </div>
    </div>
    <div class="col">
      <div class="card-style">
        <img src="../assets/img/checkedPre.png" />
        <p class="blue">{{data.checkedCount}}</p>
        <span>已审处方</span>
      </div>
    </div>
    <div class="col">
      <div class="card-style">
        <img src="../assets/img/matchDrug.png" />
        <p class="yellow">{{data.MappingCount}}</p>
        <span>匹配药品</span>
      </div>
    </div>
    <div class="col">
      <div class="card-style">
        <img src="../assets/img/auditDrug.png" />
        <p class="purple">{{data.AwaitExamineCount}}</p>
        <span>待审核药品</span>
      </div>
    </div>
    <div class="col">
      <div class="card-style">
        <img src="../assets/img/noMatchDrug.png" />
        <p class="blue">{{data.NotMappingCount}}</p>
        <span>尚未配码</span>
      </div>
    </div>
    <div class="col">
      <div class="card-style">
        <img src="../assets/img/applyRule.png" />
        <p class="yellow">{{data.applyCount}}</p>
        <span>通用规则</span>
      </div>
    </div>
    <div class="col">
      <div class="card-style">
        <img src="../assets/img/customRule.png" />
        <p class="green">{{data.customCust}}</p>
        <span>自定义规则</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style  lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.card-style {
  height: 196px;
  background: #ffffff;
  border-radius: 4px;
  padding-top: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 64px;
    height: 64px;
    margin-bottom: 18px;
  }
  p {
    height: 32px;
    font-size: 28px;
    font-weight: bold;
    line-height: 32px;
    margin-bottom: 9px;
  }
  .green {
    color: #06c3a2;
  }
  .blue {
    color: #1391ff;
  }
  .yellow {
    color: #fdab1a;
  }
  .purple {
    color: #915dd4;
  }
  span {
    height: 25px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 25px;
  }
}
</style>