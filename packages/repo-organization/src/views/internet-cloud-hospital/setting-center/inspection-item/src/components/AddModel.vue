
<template>
  <div class="q-mx-40 q-px-40">
    <el-form v-bind:model="model"
             v-bind:rules="rules"
             ref="ruleForm"
             label-width="auto"
             label-suffix="：">
      <el-form-item label="组套名称"
                    prop="comboNo">
        <peace-select v-model="model.comboNo"
                      placeholder="请选择(支持搜索)"
                      style="width:100%;"
                      remote
                      filterable
                      :remote-method="getCheckComboList"
                      v-bind:loading="comboLoading">
          <el-option v-for="item in source.combo"
                     v-bind:key="item.comboNo"
                     v-bind:label="item.comboName"
                     v-bind:value="item.comboNo"></el-option>
        </peace-select>
      </el-form-item>
      <el-form-item label="项目名称"
                    prop="itemNo">
        <peace-select v-model="model.itemNo"
                      placeholder="请选择(支持搜索)"
                      style="width:100%;"
                      remote
                      filterable
                      v-bind:loading="itemLoading"
                      :remote-method="getCheckItemList">
          <el-option v-for="item in source.item"
                     v-bind:key="item.itemNo"
                     v-bind:label="item.itemName"
                     v-bind:value="item.itemNo"></el-option>
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
  props: {},

  data() {
    return {
      model: {
        comboNo: '',
        itemNo: ''
      },
      rules: {
        comboNo: [{ required: true, message: '请选择组套', tragger: 'change' }],
        itemNo: [{ required: true, message: '请选择项目', tragger: 'change' }]
      },
      loading: false,
      comboLoading: false,
      itemLoading: false,
      source: {
        combo: [],
        item: []
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getCheckComboList()
      this.getCheckItemList()
    })
  },
  methods: {
    //获取组套列表
    getCheckComboList(query = '') {
      this.comboLoading = true
      Service.getCheckComboList({ name: query })
        .then((res) => {
          this.source.combo = res.data.list
        })
        .finally(() => (this.comboLoading = false))
    },
    //获取项目列表
    getCheckItemList(query = '') {
      this.itemLoading = true
      Service.getCheckItemList({ name: query })
        .then((res) => {
          this.source.item = res.data.list
        })
        .finally(() => (this.itemLoading = false))
    },
    submit() {
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
      const params = Peace.util.deepClone(this.model)
      Service.addComboItem(params)
        .then(() => {
          Peace.util.alert('操作成功')
          this.$emit('complete')
        })
        .finally(() => {
          this.loading = false
        })
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  padding-right: 24px !important;
}
</style>