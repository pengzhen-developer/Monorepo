<template>
  <div class="record">
    <img :src="`./static/images/transfer/${ getState() }.png`" class="status-image" v-if="getState()">

    <div class="record-no">
      <span>No.{{ internalData.referral_no }}</span>
    </div>
    <div class="record-title">
      <span>{{ internalData.send_hos_name }}</span>
      <br>
      <span>转诊单</span>
    </div>

    <!-- 转出信息 -->
    <div class="record-content">
      <span class="title">转出信息</span>

      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="患者姓名">
              <span>{{ internalData.family_name }}</span>
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
              <span>{{ internalData.send_dept_child }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="转出医生">
              <span>{{ internalData.send_doc_name }}</span>
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
              <span>{{ internalData.created_time }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 转入信息 -->
    <div class="record-content">
      <span class="title">转入信息</span>

      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="转入医生">
              <span>{{ internalData.receive_doc_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科别">
              <span slot="label">科别</span>
              <span>{{ internalData.receive_dept_child }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="转入机构">
              <span>{{ internalData.receive_hos_name }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 转出机构审核信息 -->
    <div class="record-content" v-if="internalData.send_check_time">
      <span class="title">转出机构审核信息</span>

      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果">
              <span>{{ internalData.send_check_status }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见">
              <span>{{ internalData.send_check_suggest || '无' }}</span>
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

    <!-- 转入机构审核信息 -->
    <div class="record-content" v-if="internalData.receive_check_time">
      <span class="title">转入机构审核信息</span>

      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果">
              <span>{{ internalData.receive_check_status }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见">
              <span>{{ internalData.receive_check_suggest || '无' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核时间">
              <span>{{ internalData.receive_check_time }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 转诊结果 - 转给我的 - 需审核 -->
    <div class="record-content" v-if="type === 'in' &&  internalData.transfer_status === 4">
      <span class="title">转诊结果</span>

      <el-form :model="view.model" inline>
        <el-row>
          <el-col :span="24">
            <el-form-item label="转诊意见" prop="referral_suggest">
              <el-input :rows="4" placeholder="请输入转诊意见" style="width: 400px;" type="textarea" v-model="view.model.referral_suggest"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="24" style="text-align: center;">
            <el-button :disabled="!view.model.referral_suggest" @click="receiveReferralPc" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 转诊结果 -->
    <div class="record-content" v-else-if="internalData.referral_time">
      <span class="title">转诊结果</span>

      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label="转诊意见">
              <span>{{ internalData.referral_suggest || '无' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="internalData.transfer_status === 7 ? '关闭时间' : '提交时间'">
              <span>{{ internalData.referral_time }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import config from './config'

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
      const temp = $peace.util.clone(this.data)

      return temp
    }
  },

  data() {
    return {
      config,

      view: {
        model: {
          referral_suggest: ''
        }
      },

      dialog: {
        visible: false,
        data: []
      }
    }
  },

  methods: {
    getState() {
      return this.internalData.referral_status
    },

    receiveReferralPc() {
      const params = {
        referral_no: this.internalData.referral_no,
        referral_suggest: this.view.model.referral_suggest
      }

      this.$http.post(this.config.api.receiveReferralPc, params).then(res => {
        $peace.util.alert(res.msg)

        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.record {
  padding: 0 20px;

  .status-image {
    position: relative;
    float: right;
    top: 25px;
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
