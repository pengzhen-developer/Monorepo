import Vue from 'vue'

export const store = Vue.observable({
  // 当前选择的患者
  activePatient: {},
  // 患者的处方列表
  patientRecipeList: [],
  // 显示开具处方
  showWriteRecipe: false,
  // 添加患者动作
  showAddPatient: false
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
  }
}
