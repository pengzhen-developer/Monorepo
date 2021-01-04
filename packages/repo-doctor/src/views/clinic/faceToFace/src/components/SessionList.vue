<template>
  <SessionListContainer active="faceToFace">
    <div class="q-ma-8">

      <el-select class="col"
                 remote
                 filterable
                 v-model="search"
                 placeholder="请输入患者名字"
                 v-bind:remote-method="querySearchAsync"
                 @focus="querySearchAsync('')"
                 @change="handleSelect">
        <el-option v-bind:key="item.patientNo"
                   v-bind:label="item.text"
                   v-bind:value="item.patientNo"
                   v-for="item in searchPatientList">
          <div class="flex items-center autocomplete-item">
            <span class="q-mr-10 text-bold"> {{ item.name }} </span>
            <span class="q-mr-10 text-bold"> {{ item.sex }} </span>
            <span class="q-mr-10 text-bold"> {{ item.age }} </span>
          </div>
        </el-option>
      </el-select>

    </div>

    <div class="flex column content">
      <template v-if="patientList.length">
        <q-scroll-area class="col"
                       id="scrollView"
                       v-bind:thumb-style="thumbStyle">
          <SessionListItem v-for="patient in patientList"
                           v-bind:key="patient.patientNo"
                           v-on:click.native="selectPatient(patient)"
                           v-bind:active="patient.patientNo === storePatient.patientNo"
                           v-bind:patient="patient"></SessionListItem>
        </q-scroll-area>
      </template>

      <template v-else>
        <div class="col flex column justify-center items-center">
          <img class="q-mb-md"
               src="~@src/assets/images/inquiry/ic_no one.png" />
          <span class="text-grey-5">暂无会话</span>
        </div>
      </template>
    </div>

    <peace-dialog :visible.sync="addPatientDialog.visible"
                  v-if="addPatientDialog.visible"
                  :before-close="closeMenu"
                  append-to-body
                  width="387px"
                  title="添加患者">
      <AddPatient ref="checkInput"
                  v-on:closeMenu="closeMenu"
                  v-on:sendRecipe="sendRecipe"
                  v-on:updateList="updateList"> </AddPatient>
    </peace-dialog>
  </SessionListContainer>
</template>

<script>
import SessionListItem from './SessionListItem'
import SessionListContainer from '@src/views/clinic/components/SessionListContainer'
import AddPatient from './AddPatient'
import Service from '../service/index'
import { mutations, store } from '../store'

import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  components: {
    SessionListContainer,
    AddPatient,
    SessionListItem
  },

  data() {
    return {
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        background: '#bdbdbd',
        width: '5px',
        opacity: 0.75
      },

      addPatientDialog: {
        visible: false
      },
      patientList: [],
      showWriteRecipe: false,
      search: '',
      searchPatientList: []
      //position: 0
    }
  },

  // 监听当前选中的患者
  watch: {
    storePatient: {
      handler(val) {
        this.$nextTick(function() {
          const activePatient = function(el) {
            return el.patientNo == val.patientNo
          }
          const index = this.patientList.findIndex(activePatient)
          const position = index > 0 ? index : 0
          this.scrollPosition(position * 80)

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
    },

    showAddPatient: {
      handler(val) {
        this.$nextTick(function() {
          if (val) {
            this.addPatient()
          }
        })
      },
      immediate: true
    }
  },

  computed: {
    storePatient() {
      return store.activePatient
    },

    closeWriteRecipe() {
      return store.showWriteRecipe
    },

    showAddPatient() {
      return store.showAddPatient
    }
  },

  created() {
    // 获取患者列表
    this.getPatientList()

    setTimeout(() => {
      window.sc = this?.$refs.scrollArea
    }, 3000)
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

      // 新增患者已经存在，点击开处方按钮的情况
      if (this.showWriteRecipe) {
        this.showWriteRecipe = false
        // 显示开处方页面
        mutations.setShowWriteRecipe(true)
      }
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

    hiddenPatient() {
      this.addPatientDialog.visible = false
      mutations.setShowAddPatient(false)
    },

    // 关闭添加患者界面
    closeMenu() {
      const tmp = this.$refs.checkInput.isShouldSave()
      if (tmp) {
        this.$confirm('关闭后将不保存当前内容，是否关闭？')
          .then(() => {
            this.hiddenPatient()
          })
          .catch(() => {})
      } else {
        this.hiddenPatient()
      }
    },

    // 添加患者的回调
    updateList() {
      // 刷新患者列表，新加患者应该在列表第一个
      this.getPatientList()
    },

    sendRecipe() {
      // 设置开处方标记
      this.showWriteRecipe = true
      // 刷新患者列表，新加患者应该在列表第一个
      this.getPatientList()
    },

    querySearchAsync(queryString) {
      Service.searchPatient(queryString).then((res) => {
        res?.data?.list.forEach((item) => {
          item.text = item.name + ' ' + item.sex + ' ' + item.age
        })
        this.searchPatientList = res?.data?.list
      })
    },

    handleSelect(patientNo) {
      const item = this.searchPatientList.find((element) => element.patientNo == patientNo)
      mutations.setActivePatient(item)
    },

    scrollPosition(position) {
      const ele = document.getElementById('scrollView')?.firstChild
      if (ele) {
        const target = getScrollTarget(ele)
        setScrollPosition(target, position, 300)
      }
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

.autocomplete-item:hover {
  color: var(--q-color-primary);
}
</style>
