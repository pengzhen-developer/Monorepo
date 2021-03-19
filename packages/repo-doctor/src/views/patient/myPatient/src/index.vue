<template>
  <div class="layout-route">

    <div class="card q-mb-md">
      <el-form inline
               space-none
               label-width="auto"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent
               v-bind:model="view.model">
        <el-form-item label="患者姓名：">
          <el-input placeholder
                    v-model="view.model.name"></el-input>
        </el-form-item>
        <el-form-item label="患者来源：">
          <el-select clearable
                     placeholder="全部"
                     v-model="view.model.source">
            <el-option :key="item.key"
                       :label="item.source"
                       :value="item.key"
                       v-for="item in source.group_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="updateList"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card q-mb-md">
      <div class="q-mb-md">
        <el-button @click="addPatient"
                   type="primary"
                   icon="el-icon-circle-plus-outline">添加患者</el-button>
      </div>

      <PeaceTable pagination
                  ref="table">

        <PeaceTableColumn label="患者姓名"
                          prop="name"
                          width="140"></PeaceTableColumn>

        <PeaceTableColumn label="基本信息"
                          width="140">
          <template slot-scope="scope">
            <span>{{ `${scope.row.sex} , ${scope.row.age}` }}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="手机号码"
                          prop="tel"
                          width="120"></PeaceTableColumn>

        <PeaceTableColumn label="疾病标签"
                          min-width="340"
                          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.diagnoseInfo.join(',') }}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="患者来源">
          <template slot-scope="scope">
            <span>{{ getSourceStr(scope.row.source) }}</span>
          </template>

        </PeaceTableColumn>

        <PeaceTableColumn label="操作">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)"
                       type="text">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>

    </div>

    <PeaceDialog :before-close="handleClose"
                 :visible.sync="addPatientDialog.visible"
                 width="387px"
                 title="添加患者">
      <AddPatient ref="checkInput"
                  @handleClose="handleClose"
                  v-on:updateList="updateList">
      </AddPatient>
    </PeaceDialog>
  </div>
</template>

<script>
import AddPatient from './components/AddPatient'
export default {
  components: {
    AddPatient
  },

  inject: ['provideGetTab', 'provideAddTab'],

  data() {
    return {
      view: {
        model: {
          name: '',
          source: '',
          group_name: ''
        }
      },
      addPatientDialog: {
        visible: false
      },
      source: {
        group_name: []
      }
    }
  },

  created() {
    Peace.service.patient.getSource().then((res) => {
      this.source.group_name = res.data
    })
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    addPatient() {
      this.addPatientDialog.visible = true
    },

    get() {
      const fetch = Peace.service.patient.patientListPc
      const params = Object.assign({}, this.view.model)
      this.$refs.table.loadData({ fetch, params })
    },

    showDetail(row) {
      const currentMenu = this.provideGetTab('PatientDetail')
      currentMenu.menuName = row.name
      currentMenu.menuRoute = '/patient/patientDetail/' + row.patientNo

      // 跳转当前路由
      this.provideAddTab(currentMenu)
    },

    getSourceStr(key) {
      const item = this.source.group_name.find((item) => item.key === key)
      return item.source
    },

    updateList() {
      const fetch = Peace.service.patient.patientListPc
      const params = this.view.model
      this.$refs.table.reloadData({ fetch, params })
    },

    handleClose() {
      const tmp = this.$refs.checkInput.isShouldSave()
      if (tmp) {
        this.$confirm('关闭后将不保存当前内容，是否关闭？')
          .then(() => {
            this.$refs.checkInput.$refs.ruleForm.resetFields()
            this.addPatientDialog.visible = false
          })
          .catch(() => {})
      } else {
        this.$refs.checkInput.$refs.ruleForm.resetFields()
        this.addPatientDialog.visible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
