const state = {
    appointList: [],
    loaded: false
    // unread: 0
}

const getters =  {
    appointList: state => {
        return state.appointList;
    },
    loaded: state => {
        return state.loaded;
    },
}
const mutations = {
    setList(state, params) {
        state.appointList = params;
        console.log('setList',state.appointList )
    },
    setLoaded(state, params) {
        state.loaded = params;
        console.log('setList',state.appointList )
    }
}
const actions= {
    getList (context) {
        $peace.service.patient.getOrderList({ orderType: 'register' }).then(res => {
            context.commit('setList',res.data.list);
            context.commit('setLoaded', true);
            // context.commit('setList',res.data.list);
            // context.commit('setUnread',res.data.unRead);
            // this.loaded = true;
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
