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
               v-bind:key="patient.patientId"
               class="col">
            <SessionListItem v-on:click.native="selectPatient(patient)"
                             v-bind:active="patient.patientId === storePatient.patientId"
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

    <peace-dialog :before-close="handleClose"
                  :visible.sync="addPatientDialog.visible"
                  append-to-body
                  width="387px"
                  title="添加患者">

      <AddPatient ref="checkInput"
                  @handleClose="handleClose"
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

  watch: {
    storePatient: {
      handler() {
        this.$nextTick(function() {
          this.getRecipeList()
        })
      },
      immediate: true
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
    }
  },

  created() {
    this.getPatientList()
  },

  methods: {
    // 选中一个患者
    selectPatient(patient) {
      mutations.setPatientRecipeList([])
      mutations.setActivePatient(patient)
      mutations.setShowWriteRecipe(false)
      this.getRecipeList()
    },

    // 获取当前患者的处方列表
    getRecipeList() {
      const params = {
        patientNo: this.storePatient.patientNo,
        patientId: this.storePatient.patientId
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
          mutations.setActivePatient(this.patientList[0])
        }
      })
    },

    // 添加患者
    addPatient() {
      this.addPatientDialog.visible = true
    },

    handleClose() {},

    updateList() {}
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