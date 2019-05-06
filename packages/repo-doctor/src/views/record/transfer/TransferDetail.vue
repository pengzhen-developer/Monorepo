<template>
  <div class="record">
    <div class="record-no">
      <span>No.ZHSSKJDF70237</span>
    </div>
    <div class="record-title">
      <span>{{ internalData.netHospital_name }}</span>
      <br>
      <span>转诊单</span>
    </div>
    <div class="record-content">
      <span class="title">转出信息</span>

      <el-form :model="view.model">
        <el-row>
          <el-col :span="12">
            <el-form-item label="患者姓名">
              <span>{{ internalData.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <span slot="label">性别</span>
              <span>{{ internalData.sex }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄">
              <span slot="label">年龄</span>
              <span>{{ internalData.age }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科别">
              <span slot="label">科别</span>
              <span>{{ internalData.netdept_child }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="转出医生">
              <span>{{ internalData.doc_name }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="初步诊断">
              <span>{{ internalData.diagnose }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="转诊原因">
              <span>{{ internalData.referral_cause }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="期望转诊时间">
              <span>{{ internalData.expect_time }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="申请提交时间">
              <!-- <span>{{ internalData.expect_time }}</span> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="record-content">
      <span class="title">转入信息</span>

      <el-form :model="view.model">
        <el-row>
          <el-col :span="12">
            <el-form-item label="转入医生">转入医生</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科别">
              <span slot="label">科别</span>
              <span>科别</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="转入机构">转入机构</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="record-content">
      <span class="title">转出机构审核信息</span>

      <el-form :model="view.model">
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果">审核结果</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见">审核意见</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核时间">审核时间</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="record-content">
      <span class="title">转入机构审核信息</span>

      <el-form :model="view.model">
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果">
              <span>{{ internalData.send_referral_suggest   }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见">
              <span>{{ internalData.send_check_suggest }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核时间">
              <span>{{ internalData.send_check_time }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="record-content">
      <span class="title">转诊结果</span>

      <el-form :model="view.model">
        <el-row>
          <el-col :span="24">
            <el-form-item label="转诊意见">审核结果</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="提交时间">审核意见</el-form-item>
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
    }
  },

  computed: {
    internalData() {
      const temp = $peace.util.clone(this.data)

      return temp
    }
  },

  data() {
    return {
      view: {
        mode: {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.record {
  padding: 0 20px;

  .record-no {
    font-size: 14px;
    line-height: 22px;
    color: #999;
  }

  .record-title {
    text-align: center;

    padding-bottom: 20px;
    margin-bottom: 20px;
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
        border-right: 4px solid #00c6ae;

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
