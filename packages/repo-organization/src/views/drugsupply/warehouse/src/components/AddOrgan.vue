<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="140px"
             label-suffix="："
             v-bind:model="model"
             v-bind:rules="rules">
      <div class="info-content">
        <el-form-item label="开户机构"
                      prop="Code">
          <el-select clearable
                     filterable
                     v-model="model.Code"
                     placeholder="请输入机构名称查询"
                     style="width: 100%;"
                     class="org-type"
                     @change="changeValue">
            <el-option v-for="item in custList"
                       v-bind:key="item.Code"
                       v-bind:label="item.Name"
                       v-bind:value="item.Code"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-for="item in currentOrg.item"
                      :key="item.Name"
                      :label="item.Label"
                      :prop="item.Name"
                      :rules="[
      { required: true, message: `请输入${item.Label}`, trigger: 'blur' },
      { validator: validateOrgField, trigger: 'blur' }
    ]">
          <el-input placeholder="请输入"
                    v-model.trim="model[item.Name]"
                    maxlength="20"></el-input>
        </el-form-item>

        <el-form-item label="使用状态"
                      prop="Effective">
          <el-select clearable
                     v-model="model.Effective"
                     placeholder="请选择"
                     style="width: 100%;"
                     class="org-type">
            <el-option v-for="(value,label) in source.ORGANIZATION_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="text-center">

        <el-button class="large hasmargin"
                   v-on:click="cancelDialog">取 消</el-button>
        <el-button type="primary"
                   class="large"
                   v-bind:disabled="loading"
                   v-on:click="save">提 交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import Service from '../service'

// 机构基本信息
const DEFAULT_MODEL = {
  Id: '',
  PrentId: '',
  Name: '',
  Code: '',
  Type: '',
  Effective: ''
}

// 机构配置
const DEFAULT_ORG = {
  SystemCode: '',
  Name: '',
  Type: '',
  item: []
}

export default {
  props: {
    data: {
      type: Object
    },
    config: {
      type: Object
    }
  },

  data() {
    return {
      loading: false,
      // 机构信息
      model: DEFAULT_MODEL,
      // 当前所选系统配置
      currentOrg: DEFAULT_ORG,

      rules: {
        Code: [
          {
            required: true,
            message: '请选择开户机构',
            trigger: 'change'
          }
        ],
        Effective: [
          {
            required: true,
            message: '请选择使用状态',
            trigger: 'change'
          }
        ]
      },
      custList: [],
      source: {
        ORGANIZATION_STATUS: CONSTANT.ORGANIZATION_STATUS
      }
    }
  },
  mounted() {
    this.getCust()

    this.model = Object.assign({}, DEFAULT_MODEL, this.data)
    this.currentOrg = Peace.util.deepClone(this.config)
    this.$nextTick(() => {
      this.model.Type = this.currentOrg.Type
      // 动态设置表单字段
      this.currentOrg.item.forEach((item) => {
        this.model = Object.assign({}, this.model, { [item.Name]: this.data[item.Name] || '' })
      })
    })
  },

  methods: {
    getCust() {
      Service.getCustlist().then((res) => {
        this.custList = res.data.list
      })
    },
    changeValue(value) {
      console.log(value)
      let options = {}
      options = this.custList.find((item) => {
        return item.Code === value
      })
      this.model.Name = options.Name
    },
    validateOrgField(rule, value, callBack) {
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
        this.loading = true
        const params = Peace.util.deepClone(this.model)
        if (params.Id == 0) {
          Service.InsertCircconfig(params)
            .then(() => {
              Peace.util.success('新建成功')
              this.cancelDialog()
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          Service.updateCircconfig(params)
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
      this.$emit('onCloseOrgan')
    }
  }
}
</script>

<style lang="scss" scoped>
.large {
  width: 120px;
  height: 34px;
}
.hasmargin {
  margin-right: 40px;
}
.info-content {
  padding: 5px 15px 22px 15px;
}
</style>