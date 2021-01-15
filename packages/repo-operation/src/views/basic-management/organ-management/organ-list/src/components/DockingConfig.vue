<template>
  <div class="full-width full-height">
    <div class="q-mb-lg">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="save"
               v-on:submit.native.prevent>

        <el-form-item v-if="hasPrescription"
                      label="订单来源系统："
                      prop="ChannelSysCode"
                      :rules="[{ type: 'array', required: true, message: '请选择订单来源系统', trigger: 'change' }]">
          <div class="flex">
            <el-select class="col"
                       clearable
                       multiple
                       v-model.trim="model.ChannelSysCode">
              <el-option v-for="item in dockingSystemDict"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item v-if="hasDrug"
                      label="订单承接系统："
                      prop="ReceiveSysCode"
                      :rules="[{ required: true, message: '请选择订单承接属性', trigger: 'change' }]">
          <div class="flex">
            <el-select class="col"
                       clearable
                       v-model.trim="model.ReceiveSysCode">
              <el-option v-for="item in dockingSystemDict"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>

      </el-form>
    </div>

    <el-alert class="docking-tips"
              type="warning"
              :closable="false"
              show-icon>
      <div slot="title"
           class="docking-tips-text">
        切换对接系统可能会影响业务数据流向，请谨慎操作！
      </div>
    </el-alert>

    <div class="text-right">
      <el-button style="width: 80px;"
                 v-on:click="cancel">取消</el-button>
      <el-button style="width: 80px;"
                 :loading="loading.save"
                 type="primary"
                 v-on:click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import Service from '../service/index'

const DEFAULT_MODEL = {
  CustCode: '', // 机构编码
  ChannelSysCode: [], // 来源系统
  ReceiveSysCode: '' // 承接系统
}

export default {
  props: {
    data: Object,
    default: () => {
      return {
        custCode: '',
        serviceTypes: []
      }
    }
  },

  data() {
    return {
      loading: {
        save: false
      },
      model: Object.assign({}, DEFAULT_MODEL),

      ChannelSysCodeRules: [{ required: true, message: '请选择订单来源系统', trigger: 'change' }],
      ReceiveSysCodeRules: [{ required: true, message: '请选择订单承接属性', trigger: 'change' }],

      // 对接系统 字典
      dockingSystemDict: []
    }
  },

  computed: {
    hasPrescription() {
      return this.data.serviceTypes.find((item) => item == CONSTANT.ENUM_ORGANIZATION_SERVICE.处方共享服务)
    },
    hasDrug() {
      return this.data.serviceTypes.find((item) => item == CONSTANT.ENUM_ORGANIZATION_SERVICE.药品供应服务)
    }
  },

  async created() {
    this.dockingSystemDict = await Peace.identity.dictionary.getList('sysdocking')
  },

  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },

  methods: {
    init() {
      this.$refs.form.resetFields()
      Service.getDockingConfig({ CustCode: this.data.custCode }).then((res) => {
        let ChannelList = res.data.ChannelList || []
        this.model.Custcode = this.data.custCode
        this.model.ChannelSysCode = ChannelList.map((item) => item.ChannelSysCode)
        this.model.ReceiveSysCode = res.data.ReceiveSysCode || ''
      })
    },

    save() {
      if (this.loading.save) {
        return false
      }
      this.loading.save = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          let result = {
            CustCode: this.model.Custcode,
            ChannelList: this.model.ChannelSysCode.map((code) => {
              return {
                ChannelSysName: this.dockingSystemDict.find((sys) => sys.value === code)?.label,
                ChannelSysCode: code
              }
            }),
            ReceiveSysCode: this.model.ReceiveSysCode,
            ReceiveSysName: this.dockingSystemDict.find((sys) => sys.value === this.model.ReceiveSysCode)?.label
          }
          Service.saveDockingConfig(result)
            .then((res) => {
              Peace.util.success(res.msg)
              this.$emit('close')
              this.$emit('refresh')
            })
            .finally(() => {
              this.loading.save = false
            })
        } else {
          this.loading.save = false
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
.docking-tips {
  width: auto;
  margin-bottom: 48px;
  border: 1px solid #ffd99e;
  background-color: #fffaf3;
}

.docking-tips .docking-tips-text {
  font-size: 14px;
  color: #333;
}
</style>