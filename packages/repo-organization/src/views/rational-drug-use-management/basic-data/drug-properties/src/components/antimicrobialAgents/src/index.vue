<template>
  <div>
    <div class="card card-search q-mb-10">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="115px"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="药品名称：">
          <el-input v-model.trim="model.drugName"
                    placeholder="请输入药品名称"></el-input>
        </el-form-item>

        <el-form-item label="编号：">
          <el-input v-model.trim="model.drugCode"
                    placeholder="请输入编号"></el-input>
        </el-form-item>

        <el-form-item label="厂家：">
          <el-input v-model.trim="model.enterpriseName"
                    placeholder="请输入厂家"></el-input>
        </el-form-item>

        <el-form-item label="抗菌药物级别：">
          <el-select v-model="model.antiLevel"
                     placeholder="全部"
                     style="width: 100%;"
                     class="org-type">
            <el-option v-for="(value,label) in source.ANTIMICROBIAL_LEVEL"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="0">
          <el-button type="primary"
                     v-on:click="fetch">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <peace-table ref="table"
                   pagination
                   size="mini">

        <el-table-column label="编号"
                         prop="custdrugscode"
                         align="center"
                         min-width="80px"></el-table-column>

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

        <el-table-column label="非限制使用"
                         prop="antilevel"
                         align="center"
                         min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.antilevel === source.ANTIMICROBIAL_LEVEL.非限制使用 ? '√' : ''}}</span>
          </template>
        </el-table-column>

        <el-table-column label="限制使用"
                         prop="antilevel"
                         align="center"
                         min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.antilevel === source.ANTIMICROBIAL_LEVEL.限制使用 ? '√' : ''}}</span>
          </template>
        </el-table-column>

        <el-table-column label="特殊使用"
                         prop="antilevel"
                         align="center"
                         min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.antilevel === source.ANTIMICROBIAL_LEVEL.特殊使用 ? '√' : ''}}</span>
          </template>
        </el-table-column>

        <el-table-column label="给药途径"
                         prop="drugusage"
                         align="center"
                         min-width="80px"></el-table-column>

        <el-table-column label="限定日剂量(DDD)"
                         prop="ddd"
                         align="center"
                         min-width="80px"></el-table-column>

        <el-table-column label="剂量单位"
                         prop="dddunit"
                         align="center"
                         min-width="80px"></el-table-column>

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
import CONSTANT from '../constant'
export default {
  data() {
    return {
      model: {
        drugName: '',
        drugCode: '',
        enterpriseName: '',
        antiLevel: -1
      },
      source: {
        ANTIMICROBIAL_LEVEL: CONSTANT.ANTIMICROBIAL_LEVEL
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