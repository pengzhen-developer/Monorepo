const state = {
    messageList: [],
    unread: 0
}

const getters =  {
    messageList: state => {
        return state.messageList;
    },
    unread: state => {
        return state.unread;
    },
}
const mutations = {
    setList(state, params) {
        state.messageList = params;
        console.log('setList',state.messageList )
    },
    setUnread(state, params) {
        state.unread = params;
    }
}
const actions= {
    getList (context) {
        let p = 1;
        let size = 100;
        let params = {p, size}
        $peace.service.personalCenter.getMsgList(params).then(res => {
            context.commit('setList',res.data.list);
            context.commit('setUnread',res.data.unRead);

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
