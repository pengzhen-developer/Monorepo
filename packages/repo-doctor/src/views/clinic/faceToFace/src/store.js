import Vue from 'vue'

export const store = Vue.observable({
  // 当前选择的患者
  activePatient: {},
  // 患者的处方列表
  patientRecipeList: [],
  // 显示开具处方
  showWriteRecipe: false,
  // 添加患者动作
  showAddPatient: false,

  //显示面诊挂号患者详情
  showRegisterPatient: false,
  //当前选择的挂号的患者
  activeRegisterPatient: {},

  //需要添加的患者数据
  shouldAddPatient: {},
  //去开处方的患者
  gotoMakeRecipePatient: {}
})

export const mutations = {
  setPatientRecipeList(list) {
    store.patientRecipeList = list
  },

  setActivePatient(objc) {
    store.activePatient = objc
  },

  setShowWriteRecipe(show) {
    store.showWriteRecipe = show
  },

  setShowAddPatient(show) {
    store.showAddPatient = show
  },

  setShowRegisterPatient(show) {
    store.showRegisterPatient = show
  },

  setShouldAddPatient(objc) {
    store.shouldAddPatient = objc
  },
  setActiveRegisterPatient(objc) {
    store.activeRegisterPatient = objc
  },
  setGotoMakeRecipePatient(objc) {
    store.gotoMakeRecipePatient = objc
  }
}
