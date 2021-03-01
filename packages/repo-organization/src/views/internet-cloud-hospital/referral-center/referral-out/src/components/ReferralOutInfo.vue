<template>
  <div class="referral">
    <img :src="imgSrc"
         class="status-image"
         v-if="imgSrc" />
    <div class="referral-no">No.{{ info.referral_no }}</div>
    <div class="title">
      <span>{{ info.netHospital_name }}</span>
      <br />
      <span>转诊单</span>
    </div>
    <div class="referral-info">
      <div class="info-title">转出信息</div>
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>患者姓名</span>
        </div>
        <div class="info-row-content">{{ info.out.family_name }}</div>
        <div class="info-row-label">
          <span>性别</span>
        </div>
        <div class="info-row-content">{{ info.out.family_sex }}</div>
      </div>
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>年龄</span>
        </div>
        <div class="info-row-content">
          <span v-if="info.out.family_age">{{ info.out.family_age }}</span>
          <span v-else>—</span>
        </div>
        <div class="info-row-label">
          <span>科别</span>
        </div>
        <div class="info-row-content">{{ info.out.netdept_child }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>转出医生</span>
        </div>
        <div class="info-row-content">{{ info.out.doctor_name }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>初步判断</span>
        </div>
        <div class="info-row-content">{{ info.out.diagnose }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>转诊原因</span>
        </div>
        <div class="info-row-content">
          <span>{{ info.out.referral_cause }}</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label t-6">
          <span>期望转诊时间</span>
        </div>
        <div class="info-row-content">
          <span>{{ info.out.expect_time }}</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label t-6">
          <span>申请提交时间</span>
        </div>
        <div class="info-row-content">
          <span>{{ info.out.created_time }}</span>
        </div>
      </div>
    </div>
    <div class="referral-info">
      <div class="info-title">转入信息</div>
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>转入医生</span>
        </div>
        <div class="info-row-content">{{ info.in.doctor_name }}</div>
        <div class="info-row-label">
          <span>科别</span>
        </div>
        <div class="info-row-content">{{ info.in.netdept_child }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>转入机构</span>
        </div>
        <div class="info-row-content">{{ info.in.netHospital_name }}</div>
      </div>
    </div>
    <div class="referral-info"
         v-if="!(info.transfer_status === 7 && info.out_examine_opinion.transfer_status === '待审核')">
      <div class="info-title">转出机构审核信息</div>
      <template v-if="info.transfer_status !== 7 && info.out_examine_opinion.transfer_status === '待审核'">
        <div class="info-row">
          <div class="info-row-label">
            <span>审核结果</span>
          </div>
          <div class="info-row-content">
            <el-radio :label="0"
                      v-model="examineResult">通过</el-radio>
            <el-radio :label="1"
                      v-model="examineResult">驳回</el-radio>
          </div>
        </div>
        <div class="info-row mt-sm">
          <div class="info-row-label">
            <span>审核意见</span>
          </div>
          <div class="info-row-content">
            <el-input :rows="3"
                      placeholder="请输入审核意见"
                      type="textarea"
                      v-if="examineResult"
                      v-model="examineOpinion"></el-input>
            <el-input :rows="3"
                      placeholder="请输入审核意见（选填）"
                      type="textarea"
                      v-else
                      v-model="examineOpinion"></el-input>
          </div>
        </div>
        <div class="submit-btn mt-md">
          <el-button @click="submitExamine"
                     v-bind:disabled="processing"
                     type="primary">提交</el-button>
        </div>
      </template>
      <template v-else>
        <div class="info-row">
          <div class="info-row-label">
            <span>审核结果</span>
          </div>
          <div class="info-row-content">{{ info.out_examine_opinion.transfer_status }}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">
            <span>审核意见</span>
          </div>
          <div class="info-row-content">
            {{
              info.out_examine_opinion.transfer_status === "通过" &&
              info.out_examine_opinion.check_suggest === '' ?
                '同意转诊' :
                info.out_examine_opinion.check_suggest
            }}
          </div>
        </div>
        <div class="info-row">
          <div class="info-row-label">
            <span>审核时间</span>
          </div>
          <div class="info-row-content">{{ info.out_examine_opinion.check_time }}</div>
        </div>
      </template>
    </div>
    <div class="referral-info"
         v-if="[4,5,6].includes(info.transfer_status)">
      <div class="info-title">转入机构审核信息</div>
      <div class="info-row">
        <div class="info-row-label">
          <span>审核结果</span>
        </div>
        <div class="info-row-content">{{ info.in_examine_opinion.transfer_status }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>审核意见</span>
        </div>
        <div class="info-row-content">
          {{
            info.in_examine_opinion.transfer_status === "通过" &&
            info.in_examine_opinion.check_suggest === '' ?
              '同意转诊' :
              info.in_examine_opinion.check_suggest
          }}
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>审核时间</span>
        </div>
        <div class="info-row-content">{{ info.in_examine_opinion.check_time }}</div>
      </div>
    </div>
    <div class="referral-info"
         v-if="[6, 7].includes(info.transfer_status)">
      <div class="info-title">转诊结果</div>
      <div class="info-row">
        <div class="info-row-label">
          <span>转诊反馈</span>
        </div>
        <div class="info-row-content">
          <strong>{{ info.referral_suggest }}</strong>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>提交时间</span>
        </div>
        <div class="info-row-content">
          <strong>{{ info.referral_time }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CONSTANT from '../constant'
import Service from '../service'

const REFERRAL_OUT_IMAGE_MAP = {
  1: require('@src/views/internet-cloud-hospital/referral-center/referral-out/src/assets/images/1.png'),
  2: require('@src/views/internet-cloud-hospital/referral-center/referral-out/src/assets/images/2.png'),
  3: require('@src/views/internet-cloud-hospital/referral-center/referral-out/src/assets/images/3.png'),
  4: require('@src/views/internet-cloud-hospital/referral-center/referral-out/src/assets/images/4.png'),
  5: require('@src/views/internet-cloud-hospital/referral-center/referral-out/src/assets/images/5.png'),
  6: require('@src/views/internet-cloud-hospital/referral-center/referral-out/src/assets/images/6.png'),
  7: require('@src/views/internet-cloud-hospital/referral-center/referral-out/src/assets/images/7.png')
}

export default {
  name: 'ReferralOutInfo',
  props: {
    id: String,
    info: Object
  },
  data() {
    return {
      source: {
        ENUM_REFERRAL_STATUS: CONSTANT.ENUM_REFERRAL_STATUS
      },
      processing: false,

      examineResult: 0,
      examineOpinion: ''
    }
  },
  computed: {
    imgSrc() {
      return REFERRAL_OUT_IMAGE_MAP[this.info.transfer_status]
    }
  },
  methods: {
    submitExamine() {
      this.processing = true

      const referralId = this.id
      const referral_no = this.info.referral_no
      const examineResult = this.examineResult
      const examineOpinion = this.examineOpinion

      if (examineResult && !examineOpinion) {
        Peace.util.warning('驳回时，审核意见不能为空！')
        return
      }

      Service.examineReferral({
        referral_log_id: referralId,
        referral_no: referral_no,
        examine_type: 0,
        examine_result: examineResult,
        examine_opinion: examineOpinion
      })
        .then((res) => {
          Peace.util.success(res.msg)
          this.$emit('update')
          this.$emit('close')
        })
        .finally(() => {
          this.processing = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.referral {
  position: relative;
  padding: 7px 0px;
  .status-image {
    position: absolute;
    top: 26px;
    right: 40px;
    width: 100px;
    display: block;
  }
  &-no {
    font-size: 14px;
    line-height: 22px;
    color: #999;
  }
  & > .title {
    margin-top: 2px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #bfbfbf;
    font-size: 22px;
    line-height: 25px;
    font-weight: bold;
    text-align: center;
    color: #333;
  }
  &-info {
    padding: 10px 11px 9px 11px;
    border-bottom: 1px solid #f3f3f3;
    &:last-of-type {
      border-bottom: none;
    }
    .info-title {
      padding-left: 8px;
      margin-bottom: 8px;
      font-size: 16px;
      color: #333;
      border-left: 4px solid var(--q-color-primary);
    }
  }
  &-status {
    & > span {
      padding: 5px 10px;
      border-radius: 20px;
      border: 1px solid;
      display: inline-block;
      &.success {
        color: #22c36a;
      }
      &.warning {
        color: #f7b32b;
      }
      &.error {
        color: #f1483f;
      }
    }
  }
  .submit-btn {
    text-align: center;
    .el-button {
      border-radius: 4px;
    }
  }
}

.info-row {
  font-size: 0;
  display: flex;
  &-label,
  &-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  &-label {
    color: #778899;
    white-space: nowrap;
    & > span {
      width: 4.3em;
      text-align: right;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      display: inline-block;
    }
    &.t-6 > span {
      width: 6em;
    }
    &.t-6 + .info-row-content {
      width: calc(100% - 7em);
    }
    &.t-7 > span {
      width: 7em;
    }
    &.t-7 + .info-row-content {
      width: calc(100% - 8em);
    }
    &:after {
      content: '：';
    }
  }
  &-content {
    padding-left: 2px;
    width: calc(100% - 1em - 4.3em);
    font-weight: bold;
    word-break: break-all;
    color: #23313f;
    & > img {
      height: 20px;
      display: block;
    }
  }
  &.two-cols {
    .info-row-label.t-6 + .info-row-content {
      width: calc(50% - 7em);
    }
    .info-row-content {
      width: calc(50% - 1em - 4.3em);
    }
  }
}
</style>
