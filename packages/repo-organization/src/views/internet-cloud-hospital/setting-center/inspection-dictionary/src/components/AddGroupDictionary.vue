
<template>
  <div class="q-mx-40 q-px-40">
    <el-form v-bind:model="model"
             v-bind:rules="rules"
             ref="ruleForm"
             label-width="auto"
             label-suffix="：">
      <el-form-item label="组套编码"
                    prop="comboNo">
        <peace-input v-model.trim="model.comboNo"
                     placeholder="请输入"
                     v-bind:disabled="type === 'edit'"></peace-input>
      </el-form-item>

      <el-form-item label="组套名称"
                    prop="comboName">
        <peace-input v-model.trim="model.comboName"
                     placeholder="请输入"
                     maxlength="100"
                     v-on:blur="getAbbreviation"></peace-input>
      </el-form-item>
      <el-form-item label="简码"
                    prop="abbreviation">
        <peace-input v-model.trim="model.abbreviation"
                     placeholder="请输入"></peace-input>
      </el-form-item>
      <el-form-item label="组套类型"
                    prop="type">
        <peace-select v-model="model.type"
                      placeholder="请选择"
                      style="width:100%;">
          <el-option v-for="item in source.type"
                     v-bind:key="item.value"
                     v-bind:label="item.label"
                     v-bind:value="item.value"></el-option>
        </peace-select>
      </el-form-item>
      <el-form-item label="执行科室"
                    prop="deptId">
        <peace-select v-model="model.deptId"
                      placeholder="请选择"
                      style="width:100%;">
          <el-option v-for="item in source.dept"
                     v-bind:key="item.deptId"
                     v-bind:label="item.netdeptChild"
                     v-bind:value="item.deptId"></el-option>
        </peace-select>
      </el-form-item>
    </el-form>
    <div class="flex justify-end full-width q-pt-32">
      <el-button v-on:click="cancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="submit"
                 v-bind:loading="loading">确定</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'EditModel',
  props: {
    info: Object,
    type: String
  },

  data() {
    return {
      isGetAbbreviation: false,
      hasClickSubmit: false,
      model: {
        comboNo: '',
        comboName: '',
        abbreviation: '',
        type: '',
        deptId: ''
      },
      rules: {
        comboNo: [{ required: true, message: '请输入组套编码', tragger: 'blur' }],
        comboName: [{ required: true, message: '请输入组套名称', tragger: 'blur' }],
        abbreviation: [{ required: true, message: '请输入简码', tragger: 'blur' }],
        type: [{ required: true, message: '请选择组套类型', tragger: 'change' }],
        deptId: [{ required: true, message: '请选择执行科室', tragger: 'change' }]
      },
      loading: false,
      source: {
        dept: [],
        type: [
          { label: '检验', value: 'check' },
          { label: '检查', value: 'pacs' }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDeptList()
      if (this.type === 'edit') {
        this.getEditInfo()
      }
    })
  },
  methods: {
    getDeptList() {
      Service.getDeptList().then((res) => {
        this.source.dept = res.data.list
      })
    },
    getAbbreviation() {
      if (this.model.comboName) {
        this.isGetAbbreviation = true
        const params = { name: this.model.comboName }
        Service.getAbbreviation(params)
          .then((res) => {
            this.model.abbreviation = res.data
          })
          .finally(() => {
            this.isGetAbbreviation = false
            if (this.hasClickSubmit) {
              this.submit()
            }
          })
      }
    },
    getEditInfo() {
      Service.getcheckComboInfo({ id: this.info.id }).then((res) => {
        this.model.comboNo = res.data.comboNo
        this.model.comboName = res.data.comboName
        this.model.abbreviation = res.data.abbreviation
        this.model.type = res.data.type
        this.model.deptId = res.data.deptId
      })
    },
    submit() {
      this.hasClickSubmit = true
      if (this.isGetAbbreviation) {
        return
      }

      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    saveData() {
      this.loading = true

      if (this.type === 'add') {
        const params = Peace.util.deepClone(this.model)
        Service.addCheckCombo(params)
          .then(() => {
            Peace.util.alert('新建成功')
            this.$emit('complete')
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        const params = Peace.util.deepClone(this.model)
        params.id = this.info.id
        Service.editCheckCombo(params)
          .then(() => {
            Peace.util.alert('修改成功')
            this.$emit('complete')
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>