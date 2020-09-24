<template>
  <div>
    <div class="card card-search q-mb-10">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="85px"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="药品名称：">
          <el-input v-model.trim="model.drugName"
                    placeholder="请输入药品名称"></el-input>
        </el-form-item>

        <el-form-item label="编码：">
          <el-input v-model.trim="model.drugCode"
                    placeholder="请输入编码"></el-input>
        </el-form-item>

        <el-form-item label="厂家：">
          <el-input v-model.trim="model.enterpriseName"
                    placeholder="请输入厂家"></el-input>
        </el-form-item>

        <el-form-item label="药品大类：">
          <el-input v-model.trim="model.pharmacologyClass"
                    placeholder="请输入药品大类"></el-input>
        </el-form-item>

        <el-form-item label="药品子类：">
          <el-input v-model.trim="model.pharmacologySubClass"
                    placeholder="请输入药品子类"></el-input>
        </el-form-item>

        <el-form-item label="药品小类：">
          <el-input v-model.trim="model.pharmacologyMinorClass"
                    placeholder="请输入药品小类"></el-input>
        </el-form-item>

        <el-form-item label-width="0">
          <el-button type="primary"
                     v-on:click="fetch">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <peace-table ref="table"
                   stripe
                   pagination
                   size="mini">
        <el-table-column label="编号"
                         type="index"
                         align="center"
                         width="80px"></el-table-column>

        <el-table-column label="药品名称"
                         prop="productname"
                         align="center"
                         min-width="80px"></el-table-column>

        <el-table-column label="规格"
                         prop="drugspecifications"
                         align="center"
                         min-width="80px"></el-table-column>

        <el-table-column label="厂家"
                         prop="enterprisename"
                         align="center"
                         min-width="80px"></el-table-column>

        <el-table-column label="药学大类"
                         prop="pharmacologyclass"
                         align="center"
                         min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.pharmacologyclass || '---' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="药学子类"
                         prop="pharmacologysubclass"
                         align="center"
                         min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.pharmacologysubclass || '---' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="药学小类"
                         prop="pharmacologyminorclass"
                         align="center"
                         min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.pharmacologyminorclass || '---' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间"
                         prop="lastmodifytime"
                         align="center"
                         min-width="80px"></el-table-column>
      </peace-table>
    </div>
  </div>
</template>

<script>
import Service from './service'
export default {
  data() {
    return {
      model: {
        drugName: '',
        drugCode: '',
        enterpriseName: '',
        pharmacologyClass: '',
        pharmacologySubClass: '',
        pharmacologyMinorClass: ''
      }
    }
  },

  beforeMount() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.getDrugList
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>