<template>
  <div class="receive"
       v-if="internalData">
    <div class="card">
      <h4>个人信息</h4>
      <el-row>
        <el-col :span="8">
          <span class="label">姓名</span>
          <span class="divider">:</span>
          <span class="value">
            {{ internalData.inquiryOrderInfo.patientsName }}
          </span>
        </el-col>
        <el-col :span="8">
          <span class="label">年龄</span>
          <span class="divider">:</span>
          <span class="value">
            {{internalData.inquiryOrderInfo.age + "岁"}}
          </span>
        </el-col>
        <el-col :span="8">
          <span class="label">性别</span>
          <span class="divider">:</span>
          <span class="value">
            {{internalData.inquiryOrderInfo.sex}}
          </span>
        </el-col>
      </el-row>
      <div v-if="internalData.inquiryOrderInfo.guardianName">
        <div class="label">监护人</div>
        <span class="divider">:</span>
        <div class="value">
          {{internalData.inquiryOrderInfo.guardianName}} |
          {{internalData.inquiryOrderInfo.guardianSex}}|
          {{internalData.inquiryOrderInfo.guardianAge+'岁'}}
        </div>
      </div>
    </div>

    <div class="card">
      <h4>病情描述</h4>
      <span style="font-weight:500; color:rgba(51,51,51,1);">
        {{ internalData.inquiryOrderInfo.describe}}
      </span>
    </div>

    <div class="card"
         v-if="internalData.inquiryOrderInfo.isAgain==='1'">
      <h4>复诊信息</h4>
      <div>
        <span class="label">复诊凭证</span>
        <span class="divider">:</span>
        <span class="value"
              v-if="internalData.inquiryOrderInfo.imgs.length==0">
          确认遗失
        </span>
        <viewer class="value img-container"
                v-else
                :images="internalData.inquiryOrderInfo.imgs">
          <img v-for="(item,index) in internalData.inquiryOrderInfo.imgs"
               :key="index"
               :src="item"
               class="img">
        </viewer>
      </div>
      <div>
        <span class="label">疾病诊断</span>
        <span class="divider">:</span>
        <span class="value">
          {{internalData.inquiryOrderInfo.confirmIllness}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },

  data() {
    return {
      internalData: null
    }
  },
  watch: {
    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.receive {
  padding: 10px;
  .card {
    background: rgba(249, 249, 249, 1);
    border-radius: 4px;
    padding: 10px 20px;
    margin: 0 0 20px 0;

    h4 {
      font-size: 16px;
      color: rgba(0, 0, 0, 1);
      line-height: 22px;
      margin: 0 0 10px 0;
    }

    .label {
      display: inline-block;
      width: 4em;
      text-align: justify;
      text-align-last: justify;
      vertical-align: top;
    }

    .divider {
      margin: 0 10px 0 5px;
      vertical-align: top;
    }

    .value {
      display: inline-flex;
      flex-flow: wrap;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;

      &.img-container {
        width: calc(100% - 80px);
      }

      .img {
        max-width: 57px;
        max-height: 57px;
        background: #ccc;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>