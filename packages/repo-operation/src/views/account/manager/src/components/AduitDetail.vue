<template>
  <div>
    <el-dialog width="500px"
               v-bind:visible.sync="visible"
               v-bind:title="title">
      <el-form ref="form"
               label-width="150px"
               label-suffix=""
               v-bind:model="model"
               v-bind:rules="rules">
        <el-form-item label="联系人：">
          <span>{{ data.linkman }}</span>
        </el-form-item>
        <el-form-item label="手机号码：">
          <span>{{ data.tel }}</span>
        </el-form-item>
        <el-form-item label="注册时间：">
          <span>{{ data.createdTime }}</span>
        </el-form-item>
        <el-form-item label="所属医院：">
          <span>{{ data.hospitalName }}</span>
        </el-form-item>
        <el-form-item label="统一社会信用代码：">
          <span>{{ data.socialCreditCode }}</span>
        </el-form-item>
        <el-form-item label="申请时间：">
          <span>{{ data.applyTime }}</span>
        </el-form-item>

        <!-- 待审核 -->
        <template v-if="data.checkStatus === 2">
          <el-form-item label="审核结果："
                        prop="checkStatus">
            <el-radio-group v-model="model.checkStatus">
              <el-radio label="3">已通过</el-radio>
              <el-radio label="4">未通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="未通过原因："
                        prop="reasonsFailure"
                        v-if="showReasonsFailure">
            <el-input type="textarea"
                      v-bind:rows="4"
                      v-model="model.reasonsFailure"></el-input>
          </el-form-item>

          <el-form-item label=" ">
            <el-button v-on:click="visible = false">取 消</el-button>
            <el-button type="primary"
                       v-bind:loading="isLoading"
                       v-on:click="doCheck">确 定</el-button>
          </el-form-item>
        </template>

        <!-- 已通过  -->
        <template v-if="data.checkStatus === 3">
          <el-form-item label="审核结果：">
            <span>{{ data.checkStatus | getEnumLabel(Constant.ENUM_CHECK_STATUS) }}</span>
          </el-form-item>
          <el-form-item label="审核时间：">
            <span>{{ data.checkTime }}</span>
          </el-form-item>
        </template>

        <!-- 未通过 -->
        <template v-if="data.checkStatus === 4">
          <el-form-item label="审核结果：">
            <span>{{ data.checkStatus | getEnumLabel(Constant.ENUM_CHECK_STATUS) }}</span>
          </el-form-item>
          <el-form-item label="未通过原因：">
            <span>{{ data.reasonsFailure }}</span>
          </el-form-item>
          <el-form-item label="审核时间：">
            <span>{{ data.checkTime }}</span>
          </el-form-item>
        </template>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Constant from './../constant'
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

  data() {
    return {
      Constant,

      isLoading: false,
      visible: this.value,

      model: {
        checkStatus: '',
        reasonsFailure: ''
      },

      rules: {
        checkStatus: [{ required: true, message: '请选择审核结果', trigger: 'blur' }],
        reasonsFailure: [{ required: true, message: '请输入未通过原因', trigger: 'blur' }]
      }
    }
  },

  computed: {
    showReasonsFailure() {
      return this.model.checkStatus === '2' || this.model.checkStatus === '4'
    }
  },

  watch: {
    value(value) {
      this.visible = value
    },

    visible(value) {
      this.$emit('input', value)
    }
  },

  methods: {
    doCheck() {
      this.validateForm().then(() => {
        this.isLoading = true

        const params = Peace.util.deepClone(this.model)
        params.accountId = this.data.id

        Service.doCheck(params)
          .then(res => {
            Peace.util.success(res.msg)

            this.isLoading = false
          })
          .finally(() => {
            this.visible = false
            this.$emit('refresh')
          })
      })
    },

    validateForm() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item__content {
  span {
    color: #9da4af;
  }
}

.el-form-item {
  margin-bottom: 8px;

  &.is-error {
    margin-bottom: 24px;
  }
}
</style>
