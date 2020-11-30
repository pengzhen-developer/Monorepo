<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="140px"
             label-suffix="："
             v-bind:model="query"
             v-bind:rules="rules">
      <div class="info-content">
        <el-form-item label="菜单类型"
                      prop="type">
          <el-select v-model="query.type"
                     placeholder="请选择菜单类型">
            <el-option v-for="item in menuTypes"
                       :key="item.value"
                       :label="item.value"
                       :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称"
                      prop="name">
          <el-input v-model.trim="query.name"
                    placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="图标字体">
          <el-input v-model="query.icon">
            <el-tooltip slot="suffix"
                        placement="top">
              <div slot="content">
                <p class="text-subtitle2 q-mb-sm">目前只支持iconfont字体图标</p>
                <p>##eg 实际iconfont : icon-home ; 需填写 zyy-cion icon-home</p>
              </div>
              <i class="el-input__icon el-icon-warning"></i>
            </el-tooltip>
          </el-input>
        </el-form-item>
        <el-form-item label="菜单权限标识"
                      prop="permission"
                      v-if="query.type=='1'">
          <el-input v-model.trim="query.permission"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model.trim="query.sort"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-tooltip content="不显示时，脱离权限控制，但拥有访问权限"
                      placement="top">
            <el-switch v-model="query.isDisplay"
                       active-value="1"
                       inactive-value="0"></el-switch>
          </el-tooltip>
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
import Service from '../service'
import Contant from '../contant'
export default {
  name: 'MenuModel',
  props: {
    info: Object
  },
  data() {
    return {
      menuTypes: Contant.menuTypes,
      query: {
        //菜单父id(根菜单约定为-1)
        parentId: -1,
        //终端id
        clientId: '',
        //菜单名称
        name: '',
        //产品编码
        productCode: '',
        //菜单图标
        icon: '',
        //排序值 	integer($int32)
        sort: '',
        //菜单类型,0:菜单 1:按钮 2:顶菜单
        type: ''
      },
      loading: false,
      rules: {
        name: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择菜单类型',
            trigger: 'blur'
          }
        ],
        permission: [
          {
            required: true,
            message: '菜单权限标识',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  mounted() {
    if (this.info?.mode !== 'update') {
      const info = {
        parentId: this.info.parentId,
        clientId: this.info.clientId,
        productCode: this.info.productCode
      }
      this.query = Object.assign({}, this.query, info)
    } else {
      this.query = Object.assign({}, this.query, this.info)
    }
  },
  methods: {
    save() {
      this.validateForm().then(() => {
        this.loading = true
        const params = Peace.util.deepClone(this.query)
        if (this.info?.mode != 'update') {
          Service.menu()
            .post(params)
            .then(() => {
              Peace.util.success('新建成功')

              this.$nextTick(() => {
                this.$refs.form.resetFields()
                this.cancelDialog()
              })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          Service.menu()
            .put(params)
            .then(() => {
              Peace.util.success('修改成功')

              this.$nextTick(() => {
                this.$refs.form.resetFields()
                this.cancelDialog()
              })
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
.el-select {
  width: 100%;
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