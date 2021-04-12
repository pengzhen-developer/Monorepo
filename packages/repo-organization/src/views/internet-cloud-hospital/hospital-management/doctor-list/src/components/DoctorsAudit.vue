<template>
  <div class="audit">
    <el-tabs v-model="activeName"
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
      <div style="height:8px;width:calc(100% + 40px );margin:10px 0 10px -20px;background-color:#f5f5f5;">
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
                       style="width: 120px;"
                       type="primary">确定</el-button>
            <el-button @click="cancel"
                       style="width: 120px;"
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
      let isPass = this.radio === '2' ? 'off' : 'on'
      let passReason = this.reason
      let params = { ...this.submitInfo, ...{ isPass, passReason } }
      if (this.reason.length == 0 && this.radio === '2') {
        Peace.util.warning('请输入未通过原因')
        return
      }
      Service.editDoctorInfo(params).then((res) => {
        Peace.util.success(res.msg || '医生信息编辑成功！')
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
.audit {
  max-height: 100%;
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