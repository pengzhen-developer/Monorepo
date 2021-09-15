<template>
  <div>
    <el-form ref="ruleForm"
             :model="model"
             :rules="rules"
             label-suffix="："
             label-width="auto"
             space-md>
      <el-form-item label="选择机构系统"
                    prop="org">
        <el-cascader v-model="model.org"
                     :disabled="type!=='add'"
                     :options="source.orgList"
                     :props="{value: 'CustCode', label: 'CustName', children: 'Items'}"
                     clearable
                     placeholder="请选择"
                     style="width:100%;"
                     @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="接口回调配置"
                    prop="selectRules">
        <div v-for="(item, index) in source.list"
             v-bind:key="item.Code">
          <el-checkbox v-if="!item.Items || item.Items.length === 0"
                       v-model="selectedModel[`First_${item.Code}`]"
                       class="block q-mb-4"
                       @change="singleLevelAllChange(`First_${item.Code}`, index)">{{ item.Label }}
          </el-checkbox>

          <el-checkbox v-if="item.Items && item.Items.length > 0"
                       v-model="selectedModel[`checkAll_${item.Code}`]"
                       class="block  q-mb-8"
                       @change="handleCheckAllChange(`checkAll_${item.Code}`, item.Code, index)">{{ item.Label }}
          </el-checkbox>
          <el-checkbox-group v-if="item.Items && item.Items.length > 0"
                             v-model="selectedModel[`Second_${item.Code}`]"
                             class="q-px-16 q-pt-16 block q-ml-24 q-mb-8"
                             style="background: #FBFBFB;"
                             @change="handleCheckedStatusChange(item.Code, index)">
            <el-checkbox v-for="tmp in item.Items"
                         :key="tmp.Code"
                         :label="tmp.Code"
                         class="q-mb-16">{{ tmp.Label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
    </el-form>

    <div class="flex justify-end q-pt-8">
      <el-button v-on:click="cancel">取消</el-button>
      <el-button :loading="loading"
                 type="primary"
                 v-on:click="save">保存
      </el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service/index'

export default {
  name: 'CallbackSystemModel',
  props: {
    type: String,
    info: Object
  },
  data() {
    return {
      rules: {
        org: [{ required: true, message: '选择机构系统', trigger: 'change' }],
        selectRules: {
          required: true,
          message: '请选择回调配置',
          validator: (rule, value, callback) => {
            let result = false

            for (let item of this.source.list) {
              if (item.Value === 1 || item.Value === '1') {
                result = true
                break
              }

              if (item.Items && item.Items.length > 0) {
                for (let tmp of item.Items) {
                  if (tmp.Value === 1 || tmp.Value === '1') {
                    result = true
                  }
                }
              }
            }

            if (result) {
              callback()
            } else {
              callback(new Error('请选择至少一个回调配置'))
            }
          }
        }
      },
      selectedModel: {},
      deptModel: {
        CustCode: '',
        CustName: '',
        SysCode: '',
        SysName: '',
        statusSyncDtos: undefined
      },
      loading: false,
      model: {
        org: [],
        selectRules: undefined
      },
      source: {
        orgList: [],
        list: []
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.deptList()
      if (this.info.CustCode && this.info.SysCode) {
        this.model.org = [this.info.CustCode, this.info.SysCode]
        const params = { custCode: this.info.CustCode, sysCode: this.info.SysCode }
        this.init(params)
      } else {
        this.init({})
      }
    })
  },
  methods: {
    deptList() {
      Service.getDeptList().then((res) => {
        this.source.orgList = res.data.list
      })
    },
    init(params) {
      Service.getSyncStatusDetailList(params).then((res) => {
        let tmp = res.data.list
        tmp.forEach((item) => {
          if (item.Items && item.Items.length > 0) {
            this.selectedModel[`checkAll_${item.Code}`] = item.Items.every((tmp) => tmp.Value === '1' || tmp.Value === 1)
            this.selectedModel[`Second_${item.Code}`] = item.Items.filter((tmp) => tmp.Value === '1' || tmp.Value === 1).map((tmp) => tmp.Code)
          } else {
            this.selectedModel[`First_${item.Code}`] = item.Value === '1' || item.Value === 1
          }
        })
        this.selectedModel = Object.assign({}, this.selectedModel)
        this.source.list = tmp
      })
    },
    /// 单级选择事件
    singleLevelAllChange(item, index) {
      /// 获取当前响应式的Value
      const tmp = this.selectedModel[`${item}`]
      /// 更新提交model数据
      this.source.list[index].Value = tmp ? '1' : '0'
    },
    handleChange(item) {
      this.init({ custCode: item[0], sysCode: item[1] })
    },
    /// 二级全选事件
    handleCheckAllChange(val, codeName, index) {
      /// 获取当前响应式的Value
      const value = this.selectedModel[`${val}`]
      if (value) {
        /// 全选处理
        this.source.list[index].Items.forEach((tmp) => (tmp.Value = '1'))
        this.selectedModel[`Second_${codeName}`] = this.source.list[index].Items.map((tmp) => tmp.Code)
      } else {
        /// 取消全选处理
        this.source.list[index].Items.forEach((tmp) => (tmp.Value = '0'))
        this.selectedModel[`Second_${codeName}`] = []
      }
    },
    /// 二级单选事件
    handleCheckedStatusChange(codeName, index) {
      /// 获取当前所有选中项
      const value = this.selectedModel[`Second_${codeName}`]
      /// 更新提交model数据
      this.source.list[index].Items.forEach((tmp) => {
        if (value.indexOf(tmp.Code) === -1) {
          tmp.Value = '0'
        } else {
          tmp.Value = '1'
        }
      })
      /// 修改全选状态
      this.selectedModel[`checkAll_${codeName}`] = this.source.list[index].Items.every((tmp) => tmp.Value === '1' || tmp.Value === 1)
    },
    cancel() {
      if (this.type === 'add') {
        this.$emit('cancelAdd')
      } else {
        this.$emit('cancelEdit')
      }
    },
    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    saveData() {
      if (this.model.org && this.model.org.length === 2) {
        let [CustCode, SysCode] = this.model.org

        this.deptModel.CustCode = CustCode
        this.deptModel.SysCode = SysCode

        let cust = this.source.orgList.find((item) => item.CustCode === CustCode)
        this.deptModel.CustName = cust.CustName

        let sys = cust.Items.find((item) => item.CustCode === SysCode)
        this.deptModel.SysName = sys.CustName

        this.deptModel.statusSyncDtos = this.source.list
        const params = Peace.util.deepClone(this.deptModel)

        this.loading = true
        Service.saveSyncStatus(params)
          .then((res) => {
            Peace.util.success(res.msg)
            if (this.type === 'add') {
              this.$emit('completeAdd')
            } else {
              this.$emit('completeEdit')
            }
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        throw new Error('数据有误')
      }
    }
  }
}
</script>

<style lang="scss">
.el-checkbox-group {
  .el-checkbox {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
