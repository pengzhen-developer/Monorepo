<template>
  <el-dialog title="服务设置"
             v-bind:visible.sync="visible"
             width="480px"
             center>
    <el-form ref="form"
             label-position="right"
             label-width="150px"
             label-suffix="："
             v-bind:model="model"
             v-bind:rules="rules">
      <el-form-item label="服务名称">
        <span>{{data.serviceName}}</span>
      </el-form-item>

      <el-form-item label="使用状态"
                    prop="isOpen">
        <el-radio-group v-model="model.isOpen">
          <el-radio :label="2">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="对接方式"
                    v-if="showAccessModeSelect"
                    prop="accessMode">
        <el-radio-group v-model="model.accessMode">
          <el-radio v-for="item in data.accessModeArr"
                    v-bind:key="item.id"
                    :label="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="服务内容"
                    v-if="data.serviceType === 3 && showServiceSelect"
                    prop="serviceContent">
        <el-radio-group v-model="model.radioServiceContent">
          <el-radio v-for="item in data.serviceContentArr"
                    v-bind:key="item.id"
                    :label="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="服务内容"
                    v-else-if="data.serviceType != 3 && showServiceSelect"
                    prop="serviceContent">
        <el-checkbox-group v-model="model.serviceContent">
          <el-checkbox v-for="item in data.serviceContentArr"
                       v-bind:key="item.id"
                       :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    </el-form>

    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 style="width:120px; margin-right: 30px;"
                 v-on:click="submit">确 定</el-button>
      <el-button v-on:click="visible = false"
                 style="width:120px;">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Peace from '@src/library'
import Service from './../service'

export default {
  name: 'edit-service',

  props: {
    value: {
      required: true,
      type: Boolean
    },
    data: {
      accountId: '',
      serviceId: '',
      serviceName: '',
      isOpen: 1,
      serviceType: 1,
      serviceContentArr: [],
      accessModeArr: [],
      accessMode: '',
      serviceContent: ''
    }
  },

  watch: {
    value(value) {
      this.visible = value
    },
    visible(value) {
      this.$emit('input', value)
      if (value) {
        this.model.isOpen = this.data.isOpen
        this.model.accessMode = this.data.accessMode
        if (Peace.validate.isEmpty(this.data.serviceContent)) {
          this.model.serviceContent = []
        } else {
          this.model.serviceContent = this.data.serviceContent.split(',') || []
        }
        if (this.data.serviceType === 3) {
          this.model.radioServiceContent = this.data.serviceContent
        }
      }
    }
  },

  data() {
    return {
      visible: false,
      model: {
        accessMode: '',
        isOpen: 1,
        serviceContent: [],
        radioServiceContent: ''
      },
      rules: {
        isOpen: [
          {
            required: true,
            message: '请选择使用状态',
            trigger: 'change'
          }
        ],
        accessMode: [
          {
            required: true,
            message: '请选择对接方式',
            trigger: 'change'
          }
        ],
        serviceContent: [
          {
            required: true,
            message: '请选择服务内容',
            trigger: 'change'
          }
        ]
      }
    }
  },

  computed: {
    showServiceSelect() {
      return this.data.serviceContentArr && this.data.serviceContentArr.length > 0
    },

    showAccessModeSelect() {
      return this.data.accessModeArr && this.data.accessModeArr.length > 0
    }
  },

  methods: {
    submit() {
      this.validateForm().then(() => {
        const params = {
          accountId: this.data.accountId,
          accountServiceId: this.data.serviceId,
          isOpen: this.model.isOpen,
          accessMode: this.model.accessMode,
          serviceContent: this.data.serviceType === 3 ? this.model.radioServiceContent : this.model.serviceContent.join()
        }
        Service.operateService(params).then((res) => {
          Peace.util.success(res.msg)
          this.$emit('updateServiceList')
          this.visible = false
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
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  font-size: 14px;
  color: black;
  font-weight: 500;
}

::v-deep .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: '';
  color: #000;
  margin-right: 0;
}
</style>