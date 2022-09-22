const state = {
    isAuth: false,
    token: ''
}
const mutations = {
    SET_AUTH(state, status) {
        state.isAuth = status
    },
    SET_TOKEN(state, token) {
        state.token = token;
    },
}
const actions = {
    setToken: ({commit}, token) => {
        commit("SET_TOKEN", token)
    },
    setAuth: ({commit}, status) => {
        commit("SET_AUTH", status)
    }
}
const getters = {
    isAuth: state => state.isAuth,
    token: state => state.token
}


export default {
    state,
    mutations,
    getters,
    actions
}