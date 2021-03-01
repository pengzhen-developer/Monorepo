<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>姓名</span>
            <span>：</span>
          </span>
          <el-input v-model="model.name"
                    @keyup.enter.native="getList()"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     @click="getList()">查询</el-button>
        </el-form-item>

      </el-form>

    </div>

    <div class="card">

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination>
        <PeaceTableColumn label="姓名"
                          prop="name"></PeaceTableColumn>
        <PeaceTableColumn label="性别"
                          prop="sex"></PeaceTableColumn>
        <PeaceTableColumn label="出生年月"
                          prop="birthday"></PeaceTableColumn>
        <PeaceTableColumn label="身份证号"
                          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.idcard }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="问诊量"
                          prop="wzl"></PeaceTableColumn>
        <PeaceTableColumn label="处方量"
                          prop="cfl"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作">
          <template slot-scope="scope">
            <el-button @click="getPatientDetail(scope.row.patientNo, scope.row.name)"
                       type="text">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from './service'

export default {
  name: 'PatientList',
  data() {
    return {
      model: {
        name: ''
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
    })
  },
  methods: {
    getList() {
      const fetch = Service.getPatientList
      let params = Peace.util.deepClone(this.model)

      this.$refs.table.reloadData({ fetch, params })
    },
    getPatientDetail(patientNo, name) {
      this.$router.push({
        path: '/internet-cloud-hospital/patient-management/patient-detail',
        query: { patientNo, name, type: 'inquiry' }
      })
    }
  }
}
</script>

<style scoped>
</style>