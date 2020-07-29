<template>
  <div>
    <el-dialog width="500px"
               v-bind:visible.sync="visible"
               v-bind:title="title">
      <el-form ref="form"
               label-width="90px"
               v-bind:model="model"
               v-bind:rules="rules">
        <!-- 待审核 -->
        <template v-if="data.checkStatus === CONSTANT.ENUM_APPLY_STATUS.待审核">
          <el-form-item label="机构名称">
            <span>{{data.hospitalName}}</span>
          </el-form-item>
          <el-form-item label="机构类型">
            <span>{{data.role | getEnumLabel(source.ENUM_ORGANIZATION_TYPE)}}</span>
          </el-form-item>
          <el-form-item label="服务名称">
            <span>{{data.serviceName}}</span>
          </el-form-item>
          <el-form-item v-if="data.accessModeStr"
                        label="对接方式">
            <span>{{data.accessModeStr}}</span>
          </el-form-item>
          <el-form-item v-if="data.serviceContentStr"
                        label="服务内容">
            <span>{{data.serviceContentStr}}</span>
          </el-form-item>
          <el-form-item label="申请时间">
            <span>{{data.applyTime}}</span>
          </el-form-item>
          <el-form-item label="审核结果"
                        prop="checkStatus">
            <el-radio-group v-model="model.checkStatus">
              <el-radio :label="3">通过</el-radio>
              <el-radio :label="2">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="model.checkStatus === 2"
                        label="备注"
                        prop="reason">
            <el-input type="textarea"
                      placeholder="请填写驳回原因"
                      v-bind:rows="4"
                      maxlength="200"
                      show-word-limit
                      v-model="model.reason"></el-input>
          </el-form-item>
          <div class="dialog-btn">
            <el-button type="primary"
                       v-bind:loading="isLoading"
                       v-on:click="doCheck">提 交</el-button>
            <el-button v-on:click="visible = false">取 消</el-button>
          </div>
        </template>
      </el-form>

      <el-form label-width="90px">
        <template v-if="data.checkStatus === CONSTANT.ENUM_APPLY_STATUS.已通过 || data.checkStatus === CONSTANT.ENUM_APPLY_STATUS.未通过">
          <el-form-item label="机构名称">
            <span>{{data.hospitalName}}</span>
          </el-form-item>
          <el-form-item label="机构类型">
            <span>{{data.role | getEnumLabel(source.ENUM_ORGANIZATION_TYPE)}}</span>
          </el-form-item>
          <el-form-item label="服务名称">
            <span>{{data.serviceName}}</span>
          </el-form-item>
          <el-form-item v-if="data.accessModeStr"
                        label="对接方式">
            <span>{{data.accessModeStr}}</span>
          </el-form-item>
          <el-form-item v-if="data.serviceContentStr"
                        label="服务内容">
            <span>{{data.serviceContentStr}}</span>
          </el-form-item>
          <el-form-item label="申请时间">
            <span>{{data.applyTime}}</span>
          </el-form-item>
          <el-form-item label="审核结果">
            <span>{{data.checkStatus | getEnumLabel(source.ENUM_APPLY_STATUS)}}</span>
          </el-form-item>
          <template v-if="data.checkStatus === CONSTANT.ENUM_APPLY_STATUS.未通过">
            <el-form-item label="备注">
              <span>{{ checkInfo.reason }}</span>
            </el-form-item>
          </template>
          <el-form-item label="审核时间">
            <span>{{ data.checkTime }}</span>
          </el-form-item>
        </template>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CONSTANT from './../constant'
import Peace from '@src/library'
import Service from './../service'

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },

    title: String,

    data: Object
  },

  filters: {
    getEnumLabel: function (value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  data() {
    let checkStatusEmpty = (rule, value, callback) => {
      if (Peace.validate.isEmpty(value)) {
        return callback(new Error())
      }
      callback()
    }
    let checkReasonEmpty = (rule, value, callback) => {
      if (this.model.checkStatus === 2) {
        if (Peace.validate.isEmpty(value)) {
          return callback(new Error())
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      CONSTANT,

      isLoading: false,
      visible: this.value,

      source: {
        ENUM_ORGANIZATION_TYPE: CONSTANT.ENUM_ORGANIZATION_TYPE,
        ENUM_APPLY_STATUS: CONSTANT.ENUM_APPLY_STATUS
      },

      model: {
        checkStatus: '',
        reason: ''
      },

      checkInfo: {},

      rules: {
        checkStatus: [
          {
            validator: checkStatusEmpty,
            message: '请选择审核结果',
            trigger: 'change'
          }
        ],
        reason: [
          {
            validator: checkReasonEmpty,
            message: '请填写驳回原因',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  watch: {
    value(value) {
      this.visible = value
    },

    visible(value) {
      this.$emit('input', value)

      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })

      if (this.data.checkStatus === CONSTANT.ENUM_APPLY_STATUS.未通过) {
        this.getReason()
      }
    }
  },

  methods: {
    doCheck() {
      this.validateForm().then(() => {
        this.isLoading = true

        const params = Peace.util.deepClone(this.model)
        params.accountServiceId = this.data.id

        Service.doCheck(params)
          .then((res) => {
            Peace.util.success(res.msg)
            this.visible = false
            this.$emit('refresh')
            this.isLoading = false
          })
          .catch(() => {
            this.isLoading = false
          })
      })
    },

    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    },

    getReason() {
      const params = {
        accountServiceId: this.data.id
      }

      Service.getReason(params)
        .then((res) => {
          this.checkInfo = res.data
        })
        .finally(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  position: relative;
  padding-right: 30px;
  color: #333333;
  text-align: justify;
  text-align-last: justify;
  &::after {
    content: '：';
    position: absolute;
    top: 0;
    right: 18px;
  }
}

.el-form-item__content {
  span {
    color: #333333;
  }
}

.el-radio {
  color: #333333;
}

.el-form-item {
  margin-bottom: 8px;

  &.is-error {
    margin-bottom: 24px;
  }
}

.dialog-btn {
  padding-top: 30px;
  text-align: center;
  .el-button {
    width: 120px;
    & + .el-button {
      margin-left: 40px;
    }
  }
}
</style>
