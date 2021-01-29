<template>
  <div class="record">
    <div class="status-image">

    </div>

    <div class="record-title">
      <span>{{ internalData.doctorInfo.hospitalName }}</span>
      <br />
      <span>检查单</span>
    </div>

    <!-- 患者信息 -->
    <div class="record-content">
      <span class="title">患者信息</span>

      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="患者姓名">
              <span>{{ internalData.patientInfo.familyName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <span slot="label">性别</span>
              <span>{{ internalData.patientInfo.familySex }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄">
              <span slot="label">年龄</span>
              <span>{{ internalData.patientInfo.familyAge }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科别">
              <span slot="label">科别</span>
              <span>{{ internalData.doctorInfo.doctorDept }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="创建医生">
              <span>{{ internalData.doctorInfo.doctorName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="疾病诊断">
              <span>{{ internalData.diagnose }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 检查项信息 -->
    <div class="record-content">
      <span class="title">检查项目</span>

      <template v-for="(item, index) in internalData.checkList">
        <div :key="item.itemId + 'content'"
             style="display: flex; justify-content: space-between; align-items: center; margin: 12px 0;">
          <span style="font-size: 14px; color: #333333; font-weight: bold;">{{ item.name }}</span>
          <span style="font-size: 14px; color: #333333; font-weight: bold; width: 40px; text-align: right;">x1</span>
        </div>

        <div :key="item.itemId + 'line'"
             v-if="index < internalData.checkList.length - 1"
             style="width: 100%;
                    height: 1px;
                    background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
                    background-size: 8px 1px;
                    background-repeat: repeat-x;">
        </div>
      </template>
    </div>

    <div class="record-content"
         v-if="internalData.remark">
      <el-form style="margin: 20px 0 10 0;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <span slot="label">备注</span>
              <span>{{ internalData.remark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="record-content">
      <div style="display: flex; justify-content: space-between; margin: 20px 0 10 0;">
        <span style="font-size: 16px; color: #333333;">已添加 {{ internalData.checkCount }} 种检查项</span>
        <span style="font-size: 16px; color: #333333;">
          <span>总金额</span>
          <span style="color: #FF0000; font-size:16px; margin: 0 0 0 8px; font-weight: 500;">¥{{ internalData.orderMoney }}</span>
        </span>
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="record-content">
      <span class="title">订单信息</span>

      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label="订单编号">
              <span>{{ internalData.checkOrderNo }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="创建时间">
              <span>{{ internalData.createdTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },

    type: {
      type: String
    }
  },

  computed: {
    internalData() {
      const temp = Peace.util.deepClone(this.data)

      return temp
    }
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.record {
  padding: 0 20px;

  .status-image {
    position: relative;
    float: right;
    top: 20px;
    width: 102px;
    height: 55px;
  }

  .record-no {
    font-size: 14px;
    line-height: 22px;
    color: #999;
  }

  .record-title {
    text-align: center;

    padding-bottom: 20px;
    padding-left: 100px;
    margin: 20px 0;
    border-bottom: 1px dashed #bfbfbf;

    span {
      font-size: 22px;
      line-height: 25px;
      font-weight: 700;
      text-align: center;
      color: #333;
    }
  }

  .record-content {
    border-bottom: 1px solid #f3f3f3;
    padding-bottom: 10px;
    margin-bottom: 10px;

    .title {
      display: inline-block;
      font-size: 16px;
      font-weight: 400;
      margin: 0 0 8px 0;

      &::before {
        content: '';
        border-right: 4px solid #3099a6;

        height: 18px;
        display: inline-block;
        vertical-align: sub;
        margin: 0 10px 0 0;
      }
    }

    /deep/ .el-form-item--mini.el-form-item {
      margin: 0;

      .el-form-item__content {
        font-weight: 700;
        word-break: break-all;
        color: #333;
      }
    }

    /deep/ .el-form-item--mini .el-form-item__label {
      &::after {
        content: '：';
      }

      span {
        text-align-last: justify;
        text-align: justify;
        text-justify: distribute-all-lines;
        width: 4em;
        display: inline-block;
      }

      padding: 0 4px 0 0;
    }

    /deep/ .el-form-item--mini .el-form-item__label,
    /deep/ .el-form-item--mini .el-form-item__content {
      line-height: 24px;
    }
  }
}
</style>
