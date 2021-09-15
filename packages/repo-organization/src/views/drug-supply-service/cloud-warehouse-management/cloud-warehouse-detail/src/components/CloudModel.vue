<template>
  <div>
    <template v-if="edit && view">
      <el-form ref="form"
               label-position="right"
               label-width="138px"
               label-suffix="："
               space-md
               v-bind:model="viewModel">
        <div class="info-content">
          <el-form-item label="云仓名称">
            <div class="flex justify-between align-center">
              <span>{{viewModel.Name}}</span>
              <el-button class="q-mr-32"
                         type="text"
                         size="mini"
                         icon="el-icon-edit"
                         v-on:click="view = false">修改</el-button>
            </div>
          </el-form-item>
          <el-form-item label="云仓系统">
            {{systemName}}
          </el-form-item>
          <el-form-item v-for="item in currentSystem.item"
                        :key="item.Name"
                        :label="item.Label">
            {{viewModel[item.Name]}}
          </el-form-item>
        </div>
      </el-form>
    </template>
    <template v-else>
      <el-form ref="form"
               label-position="right"
               label-width="138px"
               label-suffix="："
               v-bind:model="model"
               v-bind:rules="rules">
        <div class="info-content">
          <el-form-item label="云仓名称"
                        prop="Name">
            <el-input placeholder="请输入"
                      v-model.trim="model.Name"
                      maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="云仓系统"
                        prop="SystemCode">
            <el-select v-model="model.SystemCode"
                       @change="selectSystem"
                       :disabled="edit"
                       clearable
                       placeholder="请选择"
                       style="width:100%;">
              <el-option v-for="item in systemConfig"
                         :key="item.SystemCode"
                         :label="item.Name"
                         :value="item.SystemCode"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-for="item in currentSystem.item"
                        :key="item.Name"
                        :label="item.Label"
                        :prop="item.Name"
                        :rules="[
      { required: true, message: `请输入${item.Label}`, trigger: 'blur' },
      { validator: validateSystemField, trigger: 'blur' }
    ]">
            <el-input placeholder="请输入"
                      v-model.trim="model[item.Name]"
                      maxlength="70"></el-input>
          </el-form-item>

        </div>
        <template v-if="edit">
          <div class="text-right">
            <el-button v-on:click="cancelEdit">取消修改</el-button>
            <el-button type="primary"
                       v-bind:disabled="saveing"
                       v-on:click="save">保存</el-button>
          </div>
        </template>
        <template v-else>
          <div class="text-right">
            <el-button v-on:click="cancelDialog">取消</el-button>
            <el-button type="primary"
                       v-bind:disabled="saveing"
                       v-on:click="save">保存</el-button>
          </div>
        </template>
      </el-form>
    </template>
  </div>
</template>

<script>
import Service from '../service'

// 云仓基本信息
const DEFAULT_MODEL = {
  Id: '',
  Name: '',
  SystemCode: '',
  Type: '',
  PrentCustList: []
}

// 系统配置
const DEFAULT_SYSTEM = {
  SystemCode: '',
  Name: '',
  Type: '',
  item: []
}

export default {
  components: {},
  props: {
    edit: {
      type: Boolean
    },
    data: {
      type: Object
    },
    config: {
      type: Array
    }
  },
  data() {
    return {
      view: true,
      viewModel: DEFAULT_MODEL,
      saveing: false,
      // 云仓信息
      model: DEFAULT_MODEL,
      // 系统配置
      systemConfig: [],
      // 当前所选系统配置
      currentSystem: DEFAULT_SYSTEM,

      rules: {
        Name: [
          {
            required: true,
            message: '请填写云仓名称',
            trigger: 'blur'
          }
        ],
        SystemCode: [
          {
            required: true,
            message: '请选择系统',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    systemName() {
      return this.systemConfig.find((item) => item.SystemCode == this.viewModel.SystemCode)?.Name
    }
  },
  mounted() {
    this.view = true
    this.viewModel = Object.assign({}, DEFAULT_MODEL, this.data)
    this.model = Object.assign({}, DEFAULT_MODEL, this.data)
    this.systemConfig = Peace.util.deepClone(this.config)
    this.$nextTick(() => {
      // 初始化系统名称
      if (this.model.Id) {
        this.selectSystem(this.model.SystemCode, true)
      } else {
        let hasErp = this.systemConfig.find((item) => item.SystemCode === 'erp')
        if (hasErp) {
          this.model.SystemCode = 'erp'
          this.selectSystem('erp', true)
        }
      }
    })
  },

  methods: {
    // 选择系统
    selectSystem(code, init) {
      if (code) {
        let currentSystem = this.systemConfig.find((item) => item.SystemCode === code)
        this.currentSystem = currentSystem
        this.model.Type = currentSystem.Type
        // 清除校验结果
        this.$refs.form.clearValidate()
        // 动态设置表单字段
        currentSystem.item.forEach((item) => {
          if (init) {
            this.model = Object.assign({}, this.model, { [item.Name]: this.data[item.Name] })
          } else {
            this.model = Object.assign({}, this.model, { [item.Name]: '' })
          }
        })
      } else {
        this.model.SystemCode = ''
        this.model.Type = ''
        this.currentSystem = DEFAULT_SYSTEM
      }
    },
    validateSystemField(rule, value, callBack) {
      console.log(rule)
      let reg = /[a-zA-Z]|[0-9]|[\u4e00-\u9fa5]/
      if (!reg.test(value)) {
        return callBack('请输入中英文数字')
      } else {
        return callBack()
      }
    },
    save() {
      this.validateForm().then(() => {
        this.saveing = true

        const params = Peace.util.deepClone(this.model)
        if (this.data?.Id) {
          if (params.SystemCode != this.data.SystemCode && this.data.PrentCustList.length > 0) {
            Peace.util.warning('已创建开户机构的云仓不支持修改系统')
            this.saveing = false
            return false
          }

          Service.updateWarehouseInfo(params)
            .then(() => {
              Service.getInfo({
                ID: this.data.Id
              }).then((res) => {
                let couldInfo = res.data.GetCustIn3PartRes || Object.assign({}, DEFAULT_MODEL)
                this.view = true
                this.viewModel = Object.assign({}, DEFAULT_MODEL, couldInfo)
                this.model = Object.assign({}, DEFAULT_MODEL, couldInfo)
              })

              Peace.util.success('修改云仓信息成功')
              this.$emit('onRefresh')
            })
            .finally(() => {
              this.saveing = false
            })
        } else {
          Service.InsertCircconfig(params)
            .then(() => {
              Peace.util.success('新建成功')
              this.cancelDialog()
            })
            .finally(() => {
              this.saveing = false
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
      this.$emit('onCloseWare')
    },
    cancelEdit() {
      this.view = true
      this.model = Object.assign({}, DEFAULT_MODEL, this.data)
    }
  }
}
</script>

