<template>
  <div class="full-width full-height">
    <div class="q-mb-lg">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:keyup.enter.native="save"
               v-on:submit.native.prevent>

        <el-form-item prop="sysCode"
                      label="对接系统：">
          <div class="flex">
            <el-select class="col"
                       clearable
                       v-model.trim="model.sysCode">
              <el-option v-for="item in dockingSystemDict"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item prop="sysAttributeCode"
                      label="系统属性：">
          <div class="flex">
            <el-select class="col"
                       clearable
                       v-model.trim="model.sysAttributeCode">
              <el-option v-for="item in systemAttributeDict"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>

      </el-form>
    </div>

    <div class="tips"><i class="el-icon-warning"></i>切换对接系统可能会影响业务数据流向，请谨慎操作</div>

    <div class="text-center">
      <peace-button style="width: 80px;"
                    v-on:click="cancel">取消</peace-button>
      <peace-button style="width: 80px;"
                    throttle
                    type="primary"
                    v-on:click="save">保存</peace-button>
    </div>
  </div>
</template>

<script>
import Service from '../service/index'

const DEFAULT_MODEL = {
  custcode: '', // 机构编码
  sysAttributeCode: '', // 属性编码
  sysAttributeName: '', // 属性名称
  sysCode: '', // 系统编码
  sysName: '' // 系统名称
}

export default {
  props: {},

  data() {
    return {
      model: Object.assign({}, DEFAULT_MODEL),

      rules: {
        sysCode: [{ required: true, message: '请选择对接系统', trigger: 'change' }],
        sysAttributeCode: [{ required: true, message: '请选择系统属性', trigger: 'change' }]
      },

      // 对接系统 字典
      dockingSystemDict: [],
      // 系统属性 字典
      systemAttributeDict: []
    }
  },

  async created() {
    this.dockingSystemDict = await Peace.identity.dictionary.getList('sysdocking')
    this.systemAttributeDict = await Peace.identity.dictionary.getList('sysattribute')
  },

  methods: {
    init(custCode) {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        Service.getDockingConfig({ custcode: custCode }).then((res) => {
          this.model = res.data ? res.data : Object.assign({}, DEFAULT_MODEL)
          this.model.custcode = custCode
        })
      })
    },

    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.model.sysAttributeName = this.systemAttributeDict.find((item) => item.value === this.model.sysAttributeCode).label
          this.model.sysName = this.dockingSystemDict.find((item) => item.value === this.model.sysCode).label
          const params = this.model
          Service.saveDockingConfig(params).then((res) => {
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