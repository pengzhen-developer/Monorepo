
<template>
  <div>
    <div class="flex justify-between">
      <div class="flex column items-center">
        <div class="subtitle text-center">机构字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">给药频次编码</div>
            <div class="info-item-value">{{detail.extCode}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">给药频次名称</div>
            <div class="info-item-value">{{detail.name}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">给药频次缩写名</div>
            <div class="info-item-value">{{detail.abbreviation}}</div>
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
            <div class="info-item-label">给药频次编码</div>
            <div class="info-item-value">{{detail.platformCode}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">给药频次名称</div>
            <div class="info-item-value">{{detail.platformName}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">给药频次缩写名</div>
            <div class="info-item-value">{{detail.platformAbbreviation}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-36">
      <div class="title">配码审核</div>
      <div class="q-mt-16">
        <el-form ref="form"
                 label-suffix="："
                 label-width="90px"
                 v-bind:model="model"
                 v-bind:rules="model.auditOperating === 'Pass' ? {}:rules">
          <el-form-item prop="auditOperating"
                        label="审核结果">
            <template v-if="type === 'audit'">
              <el-radio-group v-model="model.auditOperating">
                <el-radio label="Pass">通过</el-radio>
                <el-radio label="Reject">驳回</el-radio>
              </el-radio-group>
            </template>
            <template v-if="type === 'edit'">
              <span style="color:#EA3930;">驳回</span>
            </template>
          </el-form-item>
          <el-form-item v-if="model.auditOperating === 'Reject'"
                        prop="remarks"
                        label="驳回原因">
            <el-input type="textarea"
                      v-bind:rows="4"
                      v-model="model.remarks"
                      maxlength="200"
                      show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="flex justify-between full-width q-pt-32">
      <div class="flex items-center">
        <template v-if="type === 'audit'">
          <el-button class="skip-btn"
                     v-bind:disabled="loading.save"
                     v-bind:loading="loading.skip"
                     @click="skip">跳过</el-button>
          <span style="color:#EA3930;"
                class="q-ml-8">点击进行下一条审核</span>
        </template>
      </div>
      <div class="flex items-center">
        <el-button v-bind:disabled="loading.save || loading.skip"
                   @click="cancel">取消</el-button>
        <el-button type="primary"
                   v-bind:disabled="loading.skip"
                   v-bind:loading="loading.save"
                   @click="save">{{type === 'audit' ? '确定':'保存'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'Model',
  props: {
    data: Object,
    type: String
  },

  data() {
    return {
      loading: {
        save: false,
        skip: false
      },
      detail: {},
      model: {
        id: '',
        code: '',
        orgCode: '',
        auditOperating: 'Pass',
        remarks: ''
      },
      rules: {
        remarks: [{ required: true, message: '请输入驳回原因', trigger: 'blur' }]
      }
    }
  },

  created() {
    if (this.type === 'edit') {
      this.model.auditOperating = 'Reject'
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.detail = Peace.util.deepClone(this.data)
      this.model.id = this.detail.id
      this.model.code = this.detail.code
      this.model.orgCode = this.detail.orgCode
    })
  },

  methods: {
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.loading.save) return false
          this.loading.save = true
          let params = Peace.util.deepClone(this.model)
          params.remarks = params.auditOperating === 'Pass' ? '' : params.remarks
          Service.audit(params)
            .then((res) => {
              Peace.util.success(res.data.message || '保存成功')
              this.$emit('refresh')
              this.$emit('clear')
              if (this.type === 'audit') {
                this.skip()
              } else {
                this.$emit('close')
              }
            })
            .finally(() => {
              this.loading.save = false
            })
        } else {
          return false
        }
      })
    },
    cancel() {
      this.$emit('close')
    },
    skip() {
      if (this.loading.skip) return false
      this.loading.skip = true
      let params = {
        functionOperation: 'Review',
        id: this.detail.id,
        orgCode: this.detail.orgCode
      }
      Service.nextData(params)
        .then((res) => {
          this.detail = res.data
          this.$emit('clear')

          this.$refs['form'].clearValidate()

          this.model.id = this.detail.id
          this.model.code = this.detail.code
          this.model.orgCode = this.detail.orgCode
          this.model.auditOperating = 'Pass'
          this.model.remarks = ''
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

.skip-btn {
  width: 88px;
  height: 32px;
  background: rgba(48, 153, 166, 0.1);
  border: none;
  color: #3099a6 !important;
}
</style>