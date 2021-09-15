
<template>
  <div class="q-mx-40 q-px-40">
    <el-form v-bind:model="model"
             v-bind:rules="rules"
             ref="ruleForm"
             label-width="auto"
             label-suffix="：">
      <el-form-item label="项目编码"
                    prop="itemNo">
        <peace-input v-model.trim="model.itemNo"
                     placeholder="请输入"
                     v-bind:disabled="type === 'edit'"></peace-input>
      </el-form-item>

      <el-form-item label="项目名称"
                    prop="itemName">
        <peace-input v-model.trim="model.itemName"
                     placeholder="请输入"
                     maxlength="100"
                     v-on:blur="getAbbreviation"></peace-input>
      </el-form-item>
      <el-form-item label="简码"
                    prop="abbreviation">
        <peace-input v-model.trim="model.abbreviation"
                     placeholder="请输入"
                     maxlength="100"></peace-input>
      </el-form-item>
      <el-form-item label="项目单价"
                    prop="price">
        <el-input-number placeholder="请输入"
                         v-bind:min="0"
                         v-bind:max="9999.9999"
                         v-bind:precision="4"
                         v-bind:controls="false"
                         v-model="model.price"
                         style="width:100%"></el-input-number>
      </el-form-item>
      <el-form-item label="项目单位"
                    prop="unit">
        <peace-input v-model.trim="model.unit"
                     placeholder="请输入"></peace-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <peace-input v-model.trim="model.remark"
                     placeholder="请输入"
                     type="textarea"
                     maxlength="200"
                     resize="none"
                     show-word-limit
                     v-bind:autosize="{
                           minRows: 3, maxRows: 6
                        }"></peace-input>
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
      hasClickSubmit: false,
      isGetAbbreviation: false,

      model: {
        itemNo: '',
        itemName: '',
        abbreviation: '',
        price: undefined,
        unit: '',
        remark: ''
      },
      rules: {
        itemNo: [{ required: true, message: '请输入项目编码', tragger: 'blur' }],
        itemName: [{ required: true, message: '请输入项目名称', tragger: 'blur' }],
        abbreviation: [{ required: true, message: '请输入简码', tragger: 'blur' }],
        price: [{ type: 'number', required: true, message: '请输入项目单价' }],
        unit: [{ required: true, message: '请输入项目单位', tragger: 'blur' }]
      },
      loading: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.type === 'edit') {
        Service.getCheckItemInfo({ id: this.info.id }).then((res) => {
          this.model.itemNo = res.data.itemNo
          this.model.itemName = res.data.itemName
          this.model.abbreviation = res.data.abbreviation
          this.model.price = res.data.price
          this.model.unit = res.data.unit
          this.model.remark = res.data.remark
        })
      }
    })
  },
  methods: {
    getAbbreviation() {
      if (this.model.itemName) {
        const params = { name: this.model.itemName }

        this.isGetAbbreviation = true

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
        Service.addCheckItem(params)
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
        Service.editCheckItem(params)
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