
<template>
  <div v-loading="loading">
    <div class="flex justify-between">
      <div class="flex column items-center">
        <div class="subtitle text-center">机构字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">疾病名称</div>
            <div class="info-item-value">{{innerInfo.name}}</div>
          </div>
        </div>
      </div>
      <div class="text-primary flex column items-center">
        <span>已匹配平台字典</span>
        <el-image v-bind:src="require('../assets/images/ic_shuttle.png')"></el-image>
      </div>
      <div class="flex column items-center">
        <div class="subtitle text-center">平台字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">疾病名称</div>
            <div class="info-item-value">{{innerInfo.platformDiseaseName}}</div>
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
          <template v-if="info.type==='examine'">
            <el-form-item label="审核结果">
              <el-radio-group v-model="model.auditOperating">
                <el-radio v-bind:label="'Pass'">通过</el-radio>
                <el-radio v-bind:label="'Reject'">驳回</el-radio>
              </el-radio-group>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="审核结果">
              <span style="color:#EA3930">{{model.auditOperating==='Pass'?'通过':'驳回'}}</span>
            </el-form-item>
          </template>
          <template v-if="model.auditOperating==='Reject'">
            <el-form-item label="驳回原因"
                          prop="remarks"
                          v-bind:rules="[{ required: true, message: '请输入原因', trigger: 'blur' }]">
              <el-input show-word-limit
                        resize="none"
                        v-bind:autosize="{
                           minRows: 3, maxRows: 6
                        }"
                        placeholder="请输入"
                        type="textarea"
                        maxlength="200"
                        v-model="model.remarks"></el-input>
            </el-form-item>
          </template>
        </el-form>
      </div>
    </div>

    <template v-if="info.type==='examine'">
      <div class="flex justify-between full-width q-pt-32">
        <div class="flex items-center">
          <el-button v-on:click="skip"
                     class="skip-btn">跳过</el-button>
          <span style="color:#EA3930;"
                class="q-ml-8">点击进行下一条审核</span>
        </div>
        <div class="flex items-center">
          <el-button type="primary"
                     v-on:click="submit">确定</el-button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-end full-width q-pt-32">
        <el-button v-on:click="cancel">取消</el-button>
        <el-button type="primary"
                   v-on:click="submit">保存</el-button>
      </div>
    </template>

  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'EditModel',
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

      innerInfo: {},

      loading: false
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.innerInfo = Object.assign({}, this.info)
      this.model.auditOperating = this.innerInfo.auditStatus === 'check' ? 'Pass' : 'Reject'
    })
  },
  methods: {
    //保存配码
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.updateReviewStatus()
        } else {
          return false
        }
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    clear() {
      this.$emit('clear')
    },
    refresh() {
      this.$emit('refresh')
    },
    updateReviewStatus() {
      this.loading = true
      const params = Peace.util.deepClone(this.model)
      params.code = this.innerInfo.code
      params.extCode = this.innerInfo.extCode
      params.orgCode = this.innerInfo.orgCode
      if (params.auditOperating === 'Pass') {
        params.remarks = ''
      }
      Service.updateReviewStatus(params)
        .then((res) => {
          Peace.util.success(res.message)
          if (this.info.type === 'examine') {
            this.skip()
          }
          this.clear()
          this.refresh()
        })
        .finally(() => {
          this.loading = false
        })
    },
    //跳过
    skip() {
      this.loading = true
      const params = {
        functionOperation: 'Review',
        id: this.innerInfo.id,
        orgCode: this.innerInfo.orgCode
      }
      Service.nextData(params)
        .then((res) => {
          this.innerInfo = Object.assign({}, this.innerInfo, res.data)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.skip-btn {
  width: 88px;
  height: 32px;
  background: rgba(48, 153, 166, 0.1);
  border: none;
  color: #3099a6 !important;
}
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
  min-width: 384px;
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
</style>