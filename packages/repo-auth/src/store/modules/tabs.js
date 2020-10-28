const state = {
  tabs: [],
  activeTab: {}
}

const mutations = {
  setTabs(state, menus) {
    state.tabs = menus
  },

  addTab(state, menu) {
    const tabIndex = state.tabs.findIndex((stateTab) => stateTab.id === menu.id)

    if (tabIndex === -1) {
      state.tabs.push(menu)
    } else {
      state.tabs[tabIndex] = menu
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
