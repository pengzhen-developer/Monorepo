<template>
  <div>
    <el-form :model="view.model"
             inline>
      <el-form-item label="患者姓名">
        <el-input placeholder
                  v-model="view.model.name"></el-input>
      </el-form-item>
      <el-form-item label="患者来源">
        <el-select clearable
                   placeholder="全部"
                   v-model="view.model.source">
          <el-option :key="item.key"
                     :label="item.source"
                     :value="item.key"
                     v-for="item in source.group_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="get"
                   round
                   type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="addPatient"
               type="primary"
               icon="el-icon-circle-plus-outline">添加患者</el-button>
    <hr />

    <peace-table pagination
                 ref="table">
      <peace-table-column label="患者姓名"
                          prop="name"
                          width="140"></peace-table-column>
      <peace-table-column label="基本信息"
                          width="140">
        <template slot-scope="scope">
          <span>{{ `${ scope.row.sex } , ${ scope.row.age }岁` }}</span>
        </template>
      </peace-table-column>
      <peace-table-column label="联系方式"
                          prop="tel"
                          width="120"></peace-table-column>
      <peace-table-column label="疾病标签"
                          min-width="340"
                          show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.diagnoseInfo.join(',') }}</span>
        </template>
      </peace-table-column>
      <peace-table-column :formatter="(r,c,v) => { return this.source.group_name.find(item => item.key === v).source }"
                          label="患者来源"
                          prop="source"></peace-table-column>
      <peace-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)"
                     type="text">查看详情</el-button>
        </template>
      </peace-table-column>
    </peace-table>

    <peace-dialog :before-close="handleClose"
                  :visible.sync="addPatientDialog.visible"
                  width="387px"
                  title="添加患者">
      <AddPatient ref="checkInput"
                  @close="handleClose"
                  v-on:updateList="updateList">
      </AddPatient>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import AddPatient from './components/AddPatient'
export default {
  components: {
    AddPatient
  },
  data() {
    return {
      view: {
        model: {
          name: undefined,
          source: undefined,
          group_name: undefined
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
    peace.service.patient.getSource().then(res => {
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
      const fetch = peace.service.patient.patientListPc
      const params = this.view.model

      this.$refs.table.loadData({ fetch, params })
    },

    showDetail(row) {
      const currentMenu = {
        id: 1,
        pid: null,
        closable: true,
        name: row.name,
        title: row.name,
        path: '/patient/patientDetail/' + row.patientNo
      }

      // 将当前选中的项，添加到 tab
      this.$store.commit('layout/pushTab', currentMenu)

      // 选中当前 tab
      this.$store.commit('layout/selectTab', currentMenu.path)

      // 跳转当前路由
      this.$router.push(currentMenu.path)
    },
    updateList() {
      this.get()
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
.private-doctor {
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  background: #00c6ae;
  color: #ffffff;
  line-height: 17px;
  padding: 0 4px;

  margin: 0 10px 0 0;
}

.character {
  display: inline-flex;

  &:before {
    content: '';
    background: #e7e7e1;
    width: 15px;
    height: 1px;
    position: relative;
    top: -4px;
    margin: 0 10px;
  }
}

.el-form-item {
  margin-right: 40px;

  /deep/ .el-input {
    width: 140px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.13);
    border-radius: 3px;
  }
}

.no-data {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  img {
    display: block;
    width: 150px;
    height: 150px;
  }

  span {
    margin-top: 20px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
  }
}
</style>
