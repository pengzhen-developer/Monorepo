<template>
  <div class="full-width full-height">
    <div class="q-mb-lg">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:keyup.enter.native="save"
               v-on:submit.native.prevent>

        <el-form-item prop="DockingSystem"
                      label="对接系统：">
          <div class="flex">
            <el-select class="col"
                       clearable
                       v-model.trim="model.DockingSystem">
              <el-option v-for="item in source.DockingSystem"
                         v-bind:key="item.id"
                         v-bind:label="item.name"
                         v-bind:value="item.id"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item prop="SystemAttribute"
                      label="系统属性：">
          <div class="flex">
            <el-select class="col"
                       clearable
                       v-model.trim="model.SystemAttribute">
              <el-option v-for="item in source.SystemAttribute"
                         v-bind:key="item.id"
                         v-bind:label="item.name"
                         v-bind:value="item.id"></el-option>
            </el-select>
          </div>
        </el-form-item>

      </el-form>
    </div>

    <div class="tips"><i class="el-icon-warning"></i>切换对接系统后，订单将流向对应系统，请谨慎操作！</div>

    <div class="text-center">
      <el-button style="width: 80px;"
                 v-on:click="cancel">取消</el-button>
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service/index'

export default {
  props: {},

  data() {
    return {
      model: {
        id: '',
        DockingSystem: '',
        SystemAttribute: ''
      },

      rules: {
        DockingSystem: [{ required: true, message: '请选择对接系统', trigger: 'change' }],
        SystemAttribute: [{ required: true, message: '请选择系统属性', trigger: 'change' }]
      },

      source: {
        DockingSystem: [],
        SystemAttribute: []
      }
    }
  },

  created() {},

  methods: {
    init(id) {
      this.model.id = id || 0
      this.$nextTick(() => {
        this.$refs.form.resetFields()

        if (this.model.id) {
          Service.getOrganizationInfo({ id: this.model.id }).then((res) => {
            this.model = res.data
          })
        }
      })
    },

    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const request = Peace.validate.isEmpty(this.model.id) ? Service.addUseAccount : Service.editUseAccount
          const params = this.model
          request(params).then((res) => {
            Peace.util.success(res.msg)
            this.$emit('close')
            this.$emit('refresh')
          })
        } else {
          return false
        }
      })
    },

    cancel() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  margin-bottom: 32px;
  padding: 8px 10px;
  background-color: rgba(252, 159, 0, 0.1);
  border-radius: 4px;
  font-size: 12px;
  color: #fc9f00;
}
.el-icon-warning {
  margin-right: 10px;
  font-size: 12px;
  color: #fc9f00;
}
</style>