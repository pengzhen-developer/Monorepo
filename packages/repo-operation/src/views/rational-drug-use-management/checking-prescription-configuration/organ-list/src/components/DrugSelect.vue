<template>
  <div>
    <div class="el-dialog__body">
      <el-form inline
               label-width="auto"
               label-suffix="："
               ref="form"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="是否外延"
                      prop="source">
          <PeaceSelect placeholder="全部"
                       v-model="model.source">
            <el-option v-for="item in source.source"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </PeaceSelect>
        </el-form-item>
        <el-form-item label="是否医保"
                      prop="isMedical">
          <PeaceSelect placeholder="全部"
                       v-model="model.isMedical">
            <el-option v-for="item in source.isMedical"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </PeaceSelect>
        </el-form-item>
        <el-form-item label="药品属性"
                      prop="drugAttr">
          <PeaceSelect placeholder="全部"
                       v-model="model.drugAttr">
            <el-option v-for="item in source.drugAttr"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </PeaceSelect>
        </el-form-item>
        <el-form-item label="药品名称"
                      prop="drugName">
          <el-input placeholder="请输入"
                    v-model.trim="model.drugName"></el-input>
        </el-form-item>
        <el-form-item label="药品编码"
                      prop="drugNumber">
          <el-input placeholder="请输入"
                    v-model.trim="model.drugNumber"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家"
                      prop="drugFactory">
          <el-input placeholder="请输入"
                    v-model.trim="model.drugFactory"></el-input>
        </el-form-item>

        <el-form-item prop="drugFactory">
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>

      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn width="50px">
          <template #header>
            <el-checkbox v-model="checkAll"
                         v-bind:indeterminate="isIndeterminate"
                         v-on:change="handleCheckAllChange"></el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox v-bind:label="scope.row.drugNumber"
                         v-bind:value="multipleSelection.some(item => item.drugNumber === scope.row.drugNumber || item.Code === scope.row.drugNumber)"
                         v-on:change="value => handleCheckedItemChange(value, scope.row)"><span></span></el-checkbox>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="药品编码"
                          prop="drugNumber"></PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          prop="drugName"></PeaceTableColumn>
        <PeaceTableColumn label="药品规格"
                          prop="drugSpec"></PeaceTableColumn>
        <PeaceTableColumn label="生产厂家"
                          prop="drugFactory"></PeaceTableColumn>
        <PeaceTableColumn label="是否外延"
                          prop="source">
          <template slot-scope="scope">
            {{ scope.row.source | filterDictionary(source.source) }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="是否医保"
                          prop="isMedical">
          <template slot-scope="scope">
            {{ scope.row.isMedical | filterDictionary(source.isMedical) }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="药品属性"
                          prop="drugAttr">
          <template slot-scope="scope">
            {{ scope.row.drugAttr | filterDictionary(source.drugAttr) }}
          </template>
        </PeaceTableColumn>

        <div class="flex items-center"
             style="height: 48px;"
             slot="append">
          <span>已选择：</span>
          <span class="text-primary">{{ multipleSelection.length }}</span>
        </div>
      </PeaceTable>
    </div>

    <div class="el-dialog__footer">
      <el-button v-on:click="handleCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  props: {
    data: Array,
    custCode: String
  },

  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      multipleSelection: this.data ?? [],

      model: {
        custCode: this.custCode
      },

      source: {
        source: [
          { label: '院内目录', value: 1 },
          { label: '外流目录', value: 2 }
        ],
        isMedical: [
          { label: '医保', value: 1 },
          { label: '非医保', value: 2 }
        ],
        drugAttr: [
          { label: '基本药物', value: '基本药物' },
          { label: '抗菌药物', value: '抗菌药物' },
          { label: '麻精药物', value: '麻精药物' },
          { label: '注射药物', value: '注射药物' },
          { label: '监控药物', value: '监控药物' },
          { label: '其他属性', value: '其他属性' }
        ]
      }
    }
  },

  async mounted() {
    await this.$nextTick()
    await this.fetch()
  },

  methods: {
    fetch() {
      const fetch = Service.getDrugList
      const params = this.model
      const filter = (res) => {
        setTimeout(this.setCheckAllState)

        return res
      }

      this.$refs.table.reloadData({ fetch, params, filter })
    },

    handleCheckAllChange(val) {
      this.$refs.table.internalData.forEach((row) => {
        this.handleCheckedItemChange(val, row)
      })
      this.isIndeterminate = false
    },

    handleCheckedItemChange(value, row) {
      const index = this.multipleSelection.findIndex((item) => item.drugNumber === row.drugNumber)

      if (value) {
        if (index === -1) {
          this.multipleSelection.push(row)
        }
      } else {
        if (index !== -1) {
          this.multipleSelection.splice(index, 1)
        }
      }
      this.setCheckAllState()
    },

    setCheckAllState() {
      this.checkAll =
        this.$refs.table.internalData.every((row) => {
          return this.multipleSelection.some((item) => item.drugNumber === row.drugNumber)
        }) &&
        this.multipleSelection.length > 0 &&
        this.$refs.table.internalData.length > 0

      this.isIndeterminate =
        this.$refs.table.internalData.some((row) => {
          return this.multipleSelection.some((item) => item.drugNumber === row.drugNumber)
        }) && !this.checkAll
    },

    handleCancel() {
      this.$emit('cancel')
    },

    handleSave() {
      this.$emit('save', this.multipleSelection)
    }
  }
}
</script>

<style>
</style>