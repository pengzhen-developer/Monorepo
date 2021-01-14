<template>
  <div>
    <el-form ref="form"
             label-width="115px"
             label-position="right"
             v-bind:model="model"
             v-bind:rules="model.userId ? editRules : addRules">
      <div class="info-title">账户信息</div>
      <el-form-item :prop="model.userId ? '' : 'username'">
        <span slot="label"
              class="form-label">账号</span>
        <el-input v-model.trim="model.username"
                  :disabled="model.userId ? true : false"
                  maxlength="11"
                  placeholder="请输入"
                  style="width:160px"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <span slot="label"
              class="form-label">姓名</span>
        <el-input v-model.trim="model.name"
                  placeholder="请输入"
                  style="width:160px"></el-input>
      </el-form-item>
      <el-form-item v-if="!model.userId"
                    prop="lockFlag">
        <span slot="label"
              class="form-label">账号状态</span>
        <el-radio-group v-model="model.lockFlag">
          <el-radio label="0">启用</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <el-form label-width="115px"
             label-position="right">
      <div class="info-title">选择角色<span class="q-ml-12">必须选择一个角色才能提交成功</span></div>

      <el-form-item v-for="item in source.product"
                    v-bind:key="item.productCode"
                    v-bind:label="item.productName">
        <el-select v-model="tempaleteModel[`product${item.productCode}Checked`]"
                   multiple
                   placeholder="请选择"
                   style="width:336px">
          <el-option v-for="role in item.role"
                     v-bind:key="role.roleId"
                     v-bind:label="role.roleName"
                     v-bind:value="role.roleId"></el-option>
        </el-select>
        <div v-if="item.productName=='药品供应服务'">
          <div class="store-tip">请选择门店<span>(选择门店后才能查看对应门店的基础信息、商品信息、订单信息)</span></div>
          <div class="store-card">
            <q-scroll-area v-bind:thumb-style="thumbStyle"
                           v-bind:style="scrollAreaStyle"
                           style="height: 132px;">
              <div v-if="source.store.length>0">
                <el-checkbox v-model="isCheckAllStores"
                             class="q-mb-sm"
                             style="line-height:1;"
                             v-bind:indeterminate="isCheckAllStoresIndeterminate"
                             v-on:change="onCheckAllStores">全选</el-checkbox>
                <el-checkbox-group v-model="model.store"
                                   class="row full-width">
                  <el-checkbox v-for="store in source.store"
                               class="checkbox-style col-6"
                               v-bind:label="store.Code"
                               v-bind:key="store.Code">{{ store.Name }}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-else>暂无数据</div>
            </q-scroll-area>

          </div>
        </div>
      </el-form-item>
    </el-form>

    <div class="text-center">
      <el-button v-on:click="close">取 消</el-button>
      <el-button type="primary"
                 v-bind:loading="isLoading"
                 v-on:click="submit">提 交</el-button>
    </div>
  </div>
</template>

<script>
import CONSTANT from '../constant'

import Util from '@src/util'
import Service from '../service'

export default {
  props: {
    userId: Number
  },

  data() {
    // 校验中英文
    let validateChineseEnglish = (rule, value, callback) => {
      let pattern = /^[\u4e00-\u9fa5_a-zA-Z]*$/
      if (pattern.test(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    // 校验电话
    let validateTel = (rule, value, callback) => {
      if (Peace.validate.isMobile(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    return {
      CONSTANT,
      isLoading: false,
      isCheckAllStores: null,
      isCheckAllStoresIndeterminate: null,

      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        width: '5px',
        opacity: 0.75
      },
      scrollAreaStyle: {},
      source: {
        product: [],
        store: []
      },
      tempaleteModel: {},
      model: {
        clientId: Util.user.getUserInfo().clientId,
        organCode: Util.user.getUserInfo().custCode,
        username: '',
        name: '',
        role: [],
        store: [],
        lockFlag: ''
      },

      addRules: {
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateTel, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '姓名长度为1 - 10位', trigger: 'blur' },
          { validator: validateChineseEnglish, message: '姓名仅支持中英文字符', trigger: 'blur' }
        ],
        lockFlag: [{ required: true, message: '请选择账号状态', trigger: 'change' }]
      },

      editRules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '姓名长度为1 - 10位', trigger: 'blur' },
          { validator: validateChineseEnglish, message: '姓名仅支持中英文字符', trigger: 'blur' }
        ]
      }
    }
  },

  watch: {
    'model.store': {
      handler() {
        if (this.source.store.length > 0) {
          this.isCheckAllStores = this.model.store.length === this.source.store.length

          if (this.model.store.length === 0) {
            this.isCheckAllStoresIndeterminate = false
          } else {
            this.isCheckAllStoresIndeterminate = !this.isCheckAllStores
          }
        }
      },
      immediate: true
    }
  },

  computed: {},

  created() {
    this.init()
  },

  methods: {
    init() {
      this.model.userId = this.userId || ''

      this.$nextTick(() => {
        Service.user()
          .toOptUserOfConsole()
          .then((res) => {
            const roles = res.data.role

            this.source.product = res.data.product
            this.source.store = res.data.store || []
            this.source.product.forEach((item) => {
              item.role = roles.filter((role) => item.productCode == role.productCode)
              // 动态创建的服务,利用服务的唯一Code作为标识动态创建对应数组,来保存服务选中的角色
              this.tempaleteModel[`product${item.productCode}Checked`] = []
              this.tempaleteModel = Object.assign({}, this.tempaleteModel)
            })

            if (this.model.userId) {
              const params = { id: this.model.userId }
              Service.user()
                .get(params)
                .then((res) => {
                  this.model.name = res.data.name
                  this.model.username = res.data.username
                  this.model.store = res.data.storeList
                  this.model.lockFlag = res.data.lockFlag

                  res.data.roleList.forEach((item) => {
                    this.tempaleteModel[`product${item.productCode}Checked`].push(item.roleId)
                  })
                })
            }
          })
      })
    },
    onCheckAllStores(value) {
      this.model.store = value ? this.source.store.map((item) => item.Code) : []
    },

    submit() {
      this.validateForm().then(() => {
        const params = Peace.util.deepClone(this.model)
        Object.values(this.tempaleteModel).forEach((item) => {
          params.role = params.role.concat(item)
        })
        if (params.role.length === 0) {
          return Peace.util.error('必须选择一个角色才能提交成功')
        }
        this.isLoading = true
        if (this.model.userId) {
          Service.user()
            .edit(params)
            .then(() => {
              Peace.util.success('保存成功')
              this.$emit('close')
              this.$emit('refresh')
              this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            })
        } else {
          Service.user()
            .add(params)
            .then(() => {
              Peace.util.success('保存成功')
              this.$emit('close')
              this.$emit('refresh')
              this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            })
        }
      })
    },

    close() {
      this.$emit('close')
    },

    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
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
::v-deep .el-input.is-disabled .el-input__inner {
  background-color: #fafafa;
  border-color: #dcdfe6;
  color: #333333;
  opacity: 1 !important;
}

.form-label {
  position: relative;
  display: inline-block;
  width: 70px;
  padding-right: 12px;
  text-align: justify;
  text-align-last: justify;
  &::after {
    content: '：';
    position: absolute;
    top: 0;
    right: 0;
  }
}
.info-title {
  position: relative;
  padding-left: 14px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    width: 4px;
    height: 16px;
    background-color: var(--q-color-primary);
    border-radius: 2px;
  }
  span {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-weight: 400;
  }
}
.store-card {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 9px 12px 4px 12px;
}
.store-tip {
  line-height: 20px;
  margin: 18px 0 5px 0;
  span {
    color: rgba(0, 0, 0, 0.45);
  }
}
.checkbox-style {
  margin-bottom: 8px;
  margin-right: 0;
}
</style>
