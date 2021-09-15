<template>
  <div class="audit">
    <el-tabs v-model="activeName"
             class="element-ui-default"
             type="card">
      <el-tab-pane label="基本信息"
                   name="first">
        <div v-if='currentDoctorInfo.id_card'>
          <DoctorBasicInfo :info.sync="currentDoctorInfo"
                           @getSubmitInfo="getSubmitInfo" />
        </div>

      </el-tab-pane>
      <el-tab-pane label="多点执业信息"
                   name="second">
        <div v-if='currentDoctorEntryInfo.baseInfo'>
          <DoctorEntryInfo :entryInfo.sync="currentDoctorEntryInfo" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <template name="from-check"
              v-if="info.is_pass=='wait'">
      <div style="height:8px;width:calc(100% + 32px );margin:10px 0 10px -16px;background-color:#f5f5f5;">
      </div>
      <el-form>
        <el-row>
          <el-col :span='5'>审核意见：</el-col>
          <el-col :span="19">
            <el-radio v-model="radio"
                      label="1">通过</el-radio>
            <el-radio v-model="radio"
                      label="2">未通过</el-radio>
          </el-col>
        </el-row>
        <el-row v-if="radio==2">
          <el-col :span='5'>未通过原因：</el-col>
          <el-col :span="19">
            <el-input type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入未通过原因"
                      maxlength="200"
                      show-word-limit
                      v-model="reason">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="19"
                  :offset="5">
            <el-button @click="comfirmAudit"
                       type="primary">确定</el-button>
            <el-button @click="cancel"
                       type="default">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>

  </div>
</template>
<script>
import DoctorBasicInfo from './DoctorBasicInfo'
import DoctorEntryInfo from './DoctorEntryInfo'
import Service from '../service'
export default {
  name: 'DoctorsAudit',
  components: { DoctorBasicInfo, DoctorEntryInfo },
  props: {
    info: [String, Object],
    entryinfo: [String, Object]
  },
  data() {
    return {
      activeName: 'first',
      radio: 0,
      reason: '',
      currentDoctorInfo: '',
      currentDoctorEntryInfo: '',
      submitInfo: {}
    }
  },
  watch: {
    info: {
      handler() {
        if (typeof this.info == 'object') {
          this.currentDoctorInfo = Object.assign({}, this.info)
        }
      },
      immediate: true
    },
    entryinfo: {
      handler() {
        if (typeof this.entryinfo == 'object') {
          this.currentDoctorEntryInfo = Object.assign({}, this.entryinfo)
        }
      },
      immediate: true
    }
  },
  methods: {
    getSubmitInfo(info) {
      this.submitInfo = Object.assign({}, info)
    },
    closeDoctorsAuditDialog() {
      this.$emit('closeDoctorsAuditDialog')
    },
    comfirmAudit() {
      /* eslint-disable */
      // [暂时不允许后续流程 at 2020-01-16]
      if (true) {
        this.$message({
          type: 'info',
          message: '功能暂未开放'
        })
        return
      }

      let isPass = this.radio === '2' ? 'off' : 'on'
      let passReason = this.reason
      let params = { ...this.submitInfo, ...{ isPass, passReason } }
      if (this.radio !== '1' && this.radio !== '2') {
        this.$message.warning('请选择审核意见')
        return
      }
      if (this.radio === '1' && (this.submitInfo.netdeptNameId == '' || this.submitInfo.netdeptChildId == '')) {
        this.$message.warning('请选择平台科室信息')
        return
      }
      if (this.reason.length == 0 && this.radio === '2') {
        this.$message.warning('请输入未通过原因')
        return
      }
      Service.editDoctorInfo(params).then((res) => {
        const msg = res.msg || '医生信息编辑成功！'
        Peace.util.success(msg)
        this.closeDoctorsAuditDialog()
      })
    },
    cancel() {
      this.closeDoctorsAuditDialog()
    }
  }
}
</script>

<style lang="scss">
::v-deep .audit {
  max-height: 100%;
  .el-tabs--card > .el-tabs__header {
    border-bottom: 0;
    height: 32px;
    .el-tabs__item {
      width: 110px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      height: 30px;
      border: none;

      &:first-child {
        border-radius: 4px 0 0 4px;
        transform: translate(0.5px, -0.5px);
      }
      &:last-child {
        border-radius: 0 4px 4px 0;
        transform: translate(-0.5px, -0.5px);
      }
      &.is-active {
        color: #fff;
        background-color: var(--q-color-primary);
      }
    }
    .el-tabs__nav-wrap {
      border: none;
      margin-bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-tabs__nav.is-top {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      border-color: var(--q-color-primary);
      border-bottom: 1px solid var(--q-color-primary);
    }
  }
}
.el-row {
  margin-bottom: 10px;
}
.el-tab {
  padding-bottom: 10px;
  border-bottom: 10px;
  margin-bottom: 10px;
  overflow: auto;
}
</style>