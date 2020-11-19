<template>
  <SessionListContainer active="faceToFace">

    <el-button type="text"
               class="q-my-10"
               icon="el-icon-circle-plus"
               v-on:click="addPatient">新增患者</el-button>

    <div class="flex column content">

      <template v-if="patientList.length">
        <q-scroll-area class="col"
                       v-bind:thumb-style="thumbStyle">

          <div v-for="patient in patientList"
               v-bind:key="patient.patientNo"
               class="col">
            <!-- active： 当前选中的样式 -->
            <SessionListItem v-on:click.native="selectPatient(patient)"
                             v-bind:active="patient.patientNo === storePatient.patientNo"
                             v-bind:patient="patient"></SessionListItem>
          </div>

        </q-scroll-area>
      </template>

      <template v-else>
        <div class="col flex column justify-center items-center">
          <img class="q-mb-md"
               src="~@src/assets/images/inquiry/ic_no one.png">
          <span class="text-grey-5">暂无会话</span>
        </div>
      </template>

    </div>

    <peace-dialog :visible.sync="addPatientDialog.visible"
                  v-if="addPatientDialog.visible"
                  append-to-body
                  width="387px"
                  title="添加患者">

      <AddPatient ref="checkInput"
                  v-on:closeMenu="closeMenu"
                  v-on:updateList="updateList">
      </AddPatient>

    </peace-dialog>

  </SessionListContainer>
</template>

<script>
import SessionListItem from './SessionListItem'
import SessionListContainer from '@src/views/clinic/components/SessionListContainer'
import AddPatient from './AddPatient'
import Service from '../service/index'
import { mutations, store } from '../store'

export default {
  components: {
    SessionListContainer,
    AddPatient,
    SessionListItem
  },

  data() {
    return {
      addPatientDialog: {
        visible: false
      },
      patientList: []
    }
  },

  // 监听当前选中的患者
  watch: {
    storePatient: {
      handler() {
        this.$nextTick(function() {
          this.updateInfo()
        })
      },
      immediate: true
    },

    // 监听到开处方页面关闭，刷新处方列表
    closeWriteRecipe: {
      handler(val) {
        if (!val) {
          this.getRecipeList()
        }
      }
    }
  },

  computed: {
    thumbStyle() {
      return {
        right: '2px',
        borderRadius: '5px',
        background: '#bdbdbd',
        width: '5px',
        opacity: 0.75
      }
    },

    storePatient() {
      return store.activePatient
    },

    closeWriteRecipe() {
      return store.showWriteRecipe
    }
  },

  created() {
    // 获取患者列表
    this.getPatientList()
  },

  methods: {
    // 选中一个患者
    selectPatient(patient) {
      // 修改当前选中的患者, 刷新操作由 watch 监听触发
      mutations.setActivePatient(patient)
    },

    // 刷新右侧页面数据
    updateInfo() {
      // 1、清空当前处方列表
      mutations.setPatientRecipeList([])
      // 2、隐藏开处方界面
      mutations.setShowWriteRecipe(false)
      // 3、重新请求处方列表
      this.getRecipeList()
    },

    // 获取当前患者的处方列表
    getRecipeList() {
      if (Peace.validate.isEmpty(this.storePatient?.patientNo)) {
        return
      }

      const params = {
        patientNo: this.storePatient.patientNo
      }
      Service.getRecipeList(params).then((res) => {
        mutations.setPatientRecipeList(res.data.list)
      })
    },

    // 获取患者列表
    getPatientList() {
      Service.getPatientList().then((res) => {
        this.patientList = res.data.list
        if (this.patientList && this.patientList.length > 0) {
          // 刷新列表时，默认选中第一个患者
          mutations.setActivePatient(this.patientList[0])
        }
      })
    },

    // 添加患者
    addPatient() {
      this.addPatientDialog.visible = true
    },

    // 关闭添加患者界面
    closeMenu() {
      this.addPatientDialog.visible = false
    },

    // 添加患者的回调
    updateList() {
      // 刷新患者列表，新加患者应该在列表第一个
      this.getPatientList()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #efefef;
}

.content {
  flex: 1;
}
</style>