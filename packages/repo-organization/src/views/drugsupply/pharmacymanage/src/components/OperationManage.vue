<template>
  <div>
    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">配送服务</p>
      </div>
      <el-radio-group v-model="resource">
        <el-radio label="1">免费配送</el-radio>
        <el-radio label="2">
          收费配送，配送费<el-input placeholder="请输入"
                    maxlength="5"></el-input>元
        </el-radio>
        <el-radio label="3">
          满<el-input placeholder="请输入"
                    maxlength="5"></el-input>元免配送费，否则收配送费
          <el-input placeholder="请输入"
                    maxlength="5"></el-input>元
        </el-radio>
      </el-radio-group>
    </div>
    <div class="line"></div>
    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">优惠活动</p>
      </div>
      <el-radio-group v-model="resource2">
        <el-radio label="1">没有优惠活动</el-radio>
        <el-radio label="2">
          满减活动，满<el-input placeholder="请输入"
                    maxlength="5"></el-input>元减
          <el-input placeholder="请输入"
                    maxlength="5"></el-input>元
        </el-radio>
      </el-radio-group>
    </div>
    <div class="line"></div>
    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">标签设置</p>
      </div>
      <el-checkbox-group v-model="checkboxGroup1"
                         class="q-mb-48">
        <el-checkbox-button v-for="city in cities"
                            :label="city"
                            :key="city">{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <el-button type="primary">保存</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resource: '',
      resource2: '',
      checkboxGroup1: [],
      cities: ['政府监督', '正品保证', '到店医保', '到店有礼']
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
.content-item {
  display: flex;
  flex-direction: column;
  background: white;
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
}
.title-left {
  width: 4px;
  height: 16px;
  background: #3099a6;
  border-radius: 2px;
}
.title {
  color: var(--q-color-grey-333);
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
}
.line {
  width: 100%;
  margin: 24px 0;
  height: 1px;
  background: #e9e9e9;
}
.el-radio-group .el-radio {
  display: block;
  margin-bottom: 16px;
}
::v-deep .el-button--mini,
.el-button--mini.is-round {
  padding: 9px 56px;
}
::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #999 !important;
}
::v-deep .el-input {
  width: 140px !important;
  margin: 0 8px;
}
::v-deep .el-checkbox-button__inner {
  margin-right: 10px;
  border-left: 1px solid #eee;
  border-radius: 4px;
  padding: 9px 32px;
}
::v-deep .el-checkbox-button:last-child .el-checkbox-button__inner {
  border-radius: 4px;
}
::v-deep .el-checkbox-button:first-child .el-checkbox-button__inner {
  border-radius: 4px;
}
::v-deep .el-checkbox-button.is-checked .el-checkbox-button__inner {
  background-color: #eaf4f6;
  color: #3099a6;
  box-shadow: none;
}
</style>