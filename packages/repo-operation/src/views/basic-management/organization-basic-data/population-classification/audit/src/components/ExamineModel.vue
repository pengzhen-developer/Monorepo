
<template>
  <div>
    <div class="flex justify-between">
      <div class="flex column items-center">
        <div class="subtitle text-center">机构字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">分类标签</div>
            <div class="info-item-value">{{organInfo.name}}</div>
          </div>
        </div>
      </div>
      <div class="text-primary flex column items-center justify-center q-pt-12">
        <span>已匹配平台字典</span>
        <el-image :src="require('../assets/images/ic_shuttle.png')"></el-image>
      </div>
      <div class="flex column items-center">
        <div class="subtitle text-center">平台字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">分类标签</div>
            <div class="info-item-value">{{organInfo.platformClassName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-36">
      <div class="title">配码审核</div>
      <div class="card card-search q-mt-16">
        <el-form ref="ruleForm"
                 label-suffix="："
                 label-width="auto"
                 v-bind:model="model">
          <el-form-item label="审核结果">
            <el-radio-group v-model="model.auditOperating">
              <el-radio label="Pass">通过</el-radio>
              <el-radio label="Reject">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="model.auditOperating==='Reject'">
            <el-form-item label="驳回原因"
                          prop="remarks"
                          v-bind:rules="[{ required: true, message: '请输入驳回原因', trigger: 'blur' }]">
              <peace-input show-word-limit
                           placeholder="请输入"
                           type="textarea"
                           maxlength="200"
                           v-model="model.remarks"
                           resize="none"
                           v-bind:autosize="{
                           minRows: 3, maxRows: 6
                        }"></peace-input>
            </el-form-item>
          </template>
        </el-form>
      </div>
    </div>

    <div class="flex justify-between full-width q-pt-32">
      <div class="flex items-center">
        <el-button v-on:click="skip"
                   class="skip-btn"
                   v-bind:loading="loading.skip"
                   v-bind:disabled="loading.save">跳过</el-button>
        <span style="color:#EA3930;"
              class="q-ml-8">点击进行下一条审核</span>
      </div>
      <div class="flex items-center">
        <el-button type="primary"
                   v-on:click="submit"
                   v-bind:loading="loading.save"
                   v-bind:disabled="loading.skip">确定</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'ExamineModel',
  props: {
    info: Object
  },

  data() {
    return {
      model: {
        auditOperating: 'Pass',
        remarks: ''
      },
      radioId: '',
      organInfo: {},
      loading: {
        save: false,
        skip: false
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.organInfo = this.info
    })
  },
  methods: {
    //保存配码
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    saveData() {
      if (this.loading.save) return false
      this.loading.save = true
      const params = Peace.util.deepClone(this.model)
      params.code = this.organInfo.code
      params.id = this.organInfo.id
      params.orgCode = this.organInfo.orgCode
      Service.updateHumanClassReviewStatus(params)
        .then(() => {
          Peace.util.alert('操作成功')
          this.skip()
          this.$emit('examineComplete')
        })
        .finally(() => {
          this.loading.save = false
        })
    },
    //跳过
    skip() {
      if (this.loading.skip) return false
      this.loading.skip = true
      const params = { functionOperation: 'Review', id: this.organInfo.id, orgCode: this.organInfo.orgCode }
      Service.humanClassNextData(params)
        .then((res) => {
          this.organInfo = res.data
        })
        .finally(() => {
          this.loading.skip = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.subtitle {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 24px;
  margin-bottom: 8px;
}
.info {
  border-top: 1px solid #eaeaea;
  border-left: 1px solid #eaeaea;
  width: 384px;
  .info-item-label,
  .info-item-value {
    border-bottom: 1px solid #eaeaea;
    border-right: 1px solid #eaeaea;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    padding: 9px 16px;

    color: #333333;
    line-height: 20px;
  }
  .info-item-label {
    background: #fafafa;
    font-weight: bold;
    width: 35%;
  }
  .info-item-value {
    width: 65%;
  }
}
.title {
  height: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  position: relative;
  padding-left: 12px;
  &::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #3099a6;
    border-radius: 2px;
    left: 0;
    top: 4px;
    position: absolute;
  }
}
.skip-btn {
  width: 88px;
  height: 32px;
  background: rgba(48, 153, 166, 0.1);
  border: none;
  color: #3099a6 !important;
}
</style>