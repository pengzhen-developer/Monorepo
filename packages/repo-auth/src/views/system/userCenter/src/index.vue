<template>
  <div class="flex justify-center"
       style="padding-top: 10vh">
    <!-- <el-form v-bind:model="model"
             label-width="auto">
      <el-form-item>
        <div class="flex inline"
             slot="label">
          <span class="text-justify em-4">账号名称</span>
          <span class="text-center q-ml-sm">：</span>
        </div>

        <span>{{ model.userName }}</span>
      </el-form-item>

      <el-form-item>
        <div class="flex inline"
             slot="label">
          <span class="text-justify em-4">姓名</span>
          <span class="text-center q-ml-sm">：</span>
        </div>

        <span>{{ model.realName }}</span>
      </el-form-item>

      <el-form-item>
        <div class="flex inline"
             slot="label">
          <span class="text-justify em-4">所属部门</span>
          <span class="text-center q-ml-sm">：</span>
        </div>

        <span>{{ model.sectorName }}</span>
      </el-form-item>

      <el-form-item>
        <div class="flex inline"
             slot="label">
          <span class="text-justify em-4">密码</span>
          <span class="text-center q-ml-sm">：</span>
        </div>

        <span class="q-mr-lg">******</span>
        <i class="cursor-pointer el-icon-edit text-primary text-weight-bold"
           v-on:click="openDialog"></i>
      </el-form-item>
    </el-form> -->

    <peace-dialog title="修改密码"
                  width="470px"
                  v-if="dialog.visible"
                  v-bind:visible.sync="dialog.visible">
      <el-form ref="form"
               size="larger"
               label-width="auto"
               v-bind:model="dialog.model"
               v-bind:rules="dialog.rules">

        <el-form-item prop="oldPwd">
          <div class="flex inline label-color"
               slot="label">
            <span class="text-justify em-4">原密码</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-input type="text"
                    minlength="6"
                    maxlength="20"
                    placeholder="请输入原密码"
                    v-model="dialog.model.oldPwd">
          </el-input>
        </el-form-item>

        <el-form-item prop="newPwd">
          <div class="flex inline label-color"
               slot="label">
            <span class="text-justify em-4">新密码</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-input :type="dialog.showNewPwd ? 'text':'password'"
                    minlength="6"
                    maxlength="20"
                    placeholder="请输入新密码"
                    @focus="dialog.showNewPwdIcon = true"
                    @blur="dialog.showNewPwdIcon = false"
                    v-model="dialog.model.newPwd">
            <i v-show="dialog.showNewPwdIcon || dialog.model.newPwd"
               @click="dialog.showNewPwd = !dialog.showNewPwd"
               slot="suffix"
               :class="{'zyy-icon': true, 'zyy-xianshimima1': dialog.showNewPwd && dialog.model.newPwd, 'zyy-yincangmima': !dialog.showNewPwd && dialog.model.newPwd}"></i>
          </el-input>
        </el-form-item>

        <div class="text-center q-pt-md">
          <el-button style="min-width: 140px;margin-right: 30px;"
                     size="large"
                     type="primary"
                     v-on:click="save">确定</el-button>
          <el-button style="min-width: 140px;"
                     size="large"
                     v-on:click="cancelDialog">取消</el-button>
        </div>

      </el-form>
    </peace-dialog>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './service'
import Util from '@src/util'

export default {
  data() {
    return {
      model: {
        userName: '',
        realName: '',
        sectorName: ''
      },

      dialog: {
        visible: false,

        showNewPwdIcon: false,
        showNewPwd: false,

        model: {
          oldPwd: '',
          newPwd: ''
        },

        rules: {
          oldPwd: [
            { required: true, message: '请输入原密码' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符' },
            { pattern: Peace.validate.pattern.password, message: '支持输入字母、数字、下划线' }
          ],

          newPwd: [
            { required: true, message: '请输入新密码' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符' },
            { pattern: Peace.validate.pattern.password, message: '支持输入字母、数字、下划线' }
          ]
        }
      }
    }
  },

  created() {
    this.setDataToCache()
    this.getPersonBaseInfo()
  },

  methods: {
    setDataToCache() {
      this._$data = Peace.util.deepClone(this.$data)
    },

    getPersonBaseInfo() {
      const params = {
        id: Util?.user?.getUserInfo()?.id
      }
      Service.user()
        .get(params)
        .then((res) => {
          this.model = Object.assign({}, this.model, res.data)
        })
    },

    openDialog() {
      this.dialog.visible = true

      this.dialog.model = Peace.util.deepClone(this._$data.dialog.model)
    },

    cancelDialog() {
      this.dialog.visible = false

      this.dialog.model = Peace.util.deepClone(this._$data.dialog.model)
    },

    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          Service.modifyPass(this.dialog.model).then((res) => {
            Peace.util.success(res.msg)

            this.cancelDialog()
          })
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.label-color {
  color: #333;
}

.text-justify {
  text-align: justify;
  text-align-last: justify;
}

.em-4 {
  width: 4em;
}
</style>