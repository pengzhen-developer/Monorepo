<template>
  <div class="record">
    <div class="status-image">
      <img :src="`./static/images/consultation/${ getState() }.png`" v-if="getState()">
    </div>

    <div class="record-no">
      <span>No.{{ internalData.consultNo }}</span>
    </div>
    <div class="record-title">
      <span>{{ internalData.fromHospitalName }}</span>
      <br>
      <span>会诊单</span>
    </div>

    <!-- 转出信息 -->
    <div class="record-content">
      <span class="title">申请信息</span>

      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="患者姓名">
              <span>{{ internalData.familyName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <span slot="label">性别</span>
              <span>{{ internalData.familySex }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄">
              <span slot="label">年龄</span>
              <span>{{ internalData.familyAge }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科别">
              <span slot="label">科别</span>
              <span>{{ internalData.fromDeptName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="申请医生">
              <span>{{ internalData.fromDoctorName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="初步诊断">
              <span>{{ internalData.familyDisagnose }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="申请会诊说明">
              <span>{{ internalData.consultExplain }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="期望会诊时间">
              <span>{{ internalData.expectTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="申请提交时间">
              <span>{{ internalData.createdTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 受邀会诊医生 -->
    <div class="record-content">
      <span class="title">受邀会诊医生</span>

      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="医生姓名">
              <span>{{ internalData.toDoctorName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科别">
              <span slot="label">科别</span>
              <span>{{ internalData.toDeptName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="机构名称">
              <span>{{ internalData.toHospitalName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 发起机构审核信息 -->
    <div class="record-content" v-if="internalData.consultStatus >= 2 ">
      <span class="title">发起机构审核信息</span>

      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果">
              <span>{{ formatterCheckStatus(internalData.outCheckStatus) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见">
              <span>{{ internalData.outCheckSuggest }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核时间">
              <span>{{ internalData.outCheckTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 受邀机构审核信息 -->
    <div class="record-content" v-if="internalData.consultStatus >= 4 ">
      <span class="title">受邀机构审核信息</span>

      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果">
              <span>{{ formatterCheckStatus(internalData.inCheckStatus) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见">
              <span>{{ internalData.inCheckSuggest }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核时间">
              <span>{{ internalData.inCheckTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 会议记录 -->
    <div class="record-content" v-if="internalData.consultStatus >= 7 ">
      <!-- 会诊关闭 -->
      <template v-if="internalData.consultStatus === 8">
        <span class="title">会诊关闭信息</span>

        <el-form>
          <el-row>
            <el-col :span="24">
              <el-form-item label="关闭时间">
                <span>{{ internalData.consultEndTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="关闭原因">
                <span>{{ internalData.closeReason || '期望会诊时间已过期' }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>

      <!-- 会诊正常完成 -->
      <template v-else>
        <span class="title">会议记录</span>

        <el-form>
          <el-row>
            <el-col :span="24">
              <el-form-item label="开始时间">
                <span>{{ internalData.consultStartTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="结束时间">
                <span>{{ internalData.consultEndTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="会诊意见">
                <span>{{ internalData.consultSuggest }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
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
      checkStatus: [{ checkStatus: 1, checkTxt: '未审核' }, { checkStatus: 2, checkTxt: '已拒绝' }, { checkStatus: 3, checkTxt: '已通过' }],

      consultStatus: [
        { consultStatus: 1, consultTxt: '发起待审核' },
        { consultStatus: 2, consultTxt: '发起已拒绝' },
        { consultStatus: 3, consultTxt: '邀请待审核' },
        { consultStatus: 4, consultTxt: '邀请已拒绝' },
        { consultStatus: 5, consultTxt: '等待会诊' },
        { consultStatus: 6, consultTxt: '会诊中' },
        { consultStatus: 7, consultTxt: '会诊已完成' },
        { consultStatus: 8, consultTxt: '会诊已关闭' }
      ]
    }
  },

  methods: {
    getState() {
      return this.formatterConsultStatus(this.internalData.consultStatus)
    },

    formatterCheckStatus(v) {
      const temp = this.checkStatus.find(item => item.checkStatus === v)

      return temp && temp.checkTxt
    },

    formatterConsultStatus(v) {
      const temp = this.consultStatus.find(item => item.consultStatus === v)

      return temp && temp.consultTxt
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
    top: 20px;
    width: 102px;
    height: 55px;

    img {
      width: 102px;
      height: 55px;
    }
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
