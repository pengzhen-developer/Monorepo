<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="140px"
             label-suffix="："
             v-bind:model="query"
             v-bind:rules="rules">
      <div class="info-content">

        <el-form-item label="终端名称"
                      prop="clientName">
          <el-input v-model.trim="query.clientName"
                    placeholder="请输入终端名称"></el-input>
        </el-form-item>
        <el-form-item label="编号"
                      class="tow-col"
                      prop="clientId">
          <el-input v-model.trim="query.clientId"
                    placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="密钥"
                      class="tow-col"
                      prop="clientSecret">
          <el-input v-model.trim="query.clientSecret"
                    placeholder="请输入密钥"></el-input>
        </el-form-item>
        <el-form-item label="域"
                      class="tow-col"
                      prop="scope">
          <el-input v-model.trim="query.scope"
                    placeholder="请输入域"></el-input>
        </el-form-item>
        <el-form-item label="自动放行"
                      class="tow-col"
                      prop="autoapprove">
          <el-radio-group v-model="query.autoapprove">
            <el-radio :label="false"
                      border>否</el-radio>
            <el-radio :label="true"
                      border>是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="授权模式"
                      prop="authorizedGrantTypes">
          <el-checkbox-group v-model="query.authorizedGrantTypes"
                             size="mini">
            <el-checkbox :label="item.value"
                         border
                         v-for="(item,index) in authorizedGrantTypesList"
                         :key="index">{{item.key}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="令牌时效"
                      class="tow-col">
          <el-input v-model.trim="query.accessTokenValidity"
                    maxlength="9"
                    placeholder="请输入令牌时效"></el-input>
        </el-form-item>
        <el-form-item label="刷新时效"
                      class="tow-col">
          <el-input v-model.trim="query.refreshTokenValidity"
                    maxlength="9"
                    placeholder="请输入刷新时效"></el-input>
        </el-form-item>
        <el-form-item label="回调地址"
                      class="tow-col">
          <el-input v-model.trim="query.webServerRedirectUri"
                    placeholder="请输入回调地址"></el-input>
        </el-form-item>
        <el-form-item label="权限"
                      class="tow-col">
          <el-input v-model.trim="query.authorities"
                    placeholder="请输入权限"></el-input>
        </el-form-item>
        <el-form-item label="扩展信息">
          <el-input v-model.trim="query.additionalInformation"
                    type="textarea"
                    placeholder="请输入扩展信息"></el-input>
        </el-form-item>
      </div>
      <div class="text-center">
        <el-button type="primary"
                   class="large hasmargin "
                   v-bind:disabled="loading"
                   v-on:click="save">确 定</el-button>
        <el-button class="large"
                   v-on:click="cancelDialog">取 消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from '../service'
import Constant from '../constant'
export default {
  name: 'TerminalModel',
  props: {
    info: Object
  },
  data() {
    return {
      authorizedGrantTypesList: Constant.authorizedGrantTypes,

      query: {
        //授权模式
        authorizedGrantTypes: [],
        //终端名称
        clientName: '',
        //编号
        clientId: '',
        //密钥
        clientSecret: '',
        //域
        scope: '',
        //自动放行
        autoapprove: false,

        //令牌时效
        accessTokenValidity: '',
        //刷新时效
        refreshTokenValidity: '',
        //回调地址
        webServerRedirectUri: '',
        //权限
        authorities: '',
        //扩展信息
        additionalInformation: ''
      },
      loading: false,
      rules: {
        clientName: [
          {
            required: true,
            message: '请输入终端名称',
            trigger: 'blur'
          }
        ],
        cilentId: [
          {
            required: true,
            message: '请输入编号',
            trigger: 'blur'
          }
        ],
        clientSecret: [
          {
            required: true,
            message: '请输入密钥',
            trigger: 'blur'
          }
        ],
        scope: [
          {
            required: true,
            message: '请输入域',
            trigger: 'blur'
          }
        ],
        autoapprove: [
          {
            required: true,
            message: '请选择是否自动放行',
            trigger: 'blur'
          }
        ],
        authorizedGrantTypes: [
          {
            required: true,
            message: '请选择授权模式',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.query = Object.assign({}, this.query, this.info)
  },
  methods: {
    save() {
      this.validateForm().then(() => {
        this.loading = true
        const params = Peace.util.deepClone(this.query)
        if (!this.info?.id) {
          Service.client()
            .post(params)
            .then(() => {
              Peace.util.success('新建成功')
              this.cancelDialog()
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          Service.client()
            .put(params)
            .then(() => {
              Peace.util.success('修改成功')
              this.cancelDialog()
            })
            .finally(() => {
              this.loading = false
            })
        }
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
    cancelDialog() {
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  width: 100%;
  &.tow-col {
    width: 50%;
  }
}
::v-deep .el-checkbox {
  margin-right: 15px;
}
.info-content {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>