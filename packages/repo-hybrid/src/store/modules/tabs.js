const state = {
  tabs: [],
  activeTab: {}
}

const mutations = {
  setTabs(state, menus) {
    state.tabs = menus
  },

  addTab(state, menu) {
    if (state.tabs.findIndex((stateTab) => stateTab.id === menu.id) === -1) {
      state.tabs.push(menu)
    }
  },

  selectTab(state, menu) {
    state.activeTab = menu
  },

  removeTab(state, menu) {
    const index = state.tabs.findIndex((stateTab) => stateTab.id === menu.id)

    if (index !== -1) {
      state.tabs.splice(index, 1)
    }
  },

  removeRightTab(state, menu) {
    console.log(menu)
  },

  removeOtherTab(state, menu) {
    console.log(menu)
  },

  clearTab(state) {
    state.tabs = []
  }
}

export default {
  namespaced: true,

  state,
  mutations
}
