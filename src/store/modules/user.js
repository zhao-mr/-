import {login, logout, getInfo} from '@/api/user'
import {resetRouter} from '@/router'

const user = {
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    // 登录
    login({commit}, userInfo) {
      const {username, password} = userInfo
      return new Promise((resolve, reject) => {
        login({username: username.trim(), password: password}).then(response => {
          const {data} = response
          commit('SET_TOKEN', data.token)
          localStorage.setItem('token', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出登录
    logout({commit, state}) {
      return new Promise((resolve, reject) => {
        try {
          localStorage.clear()
          commit('SET_TOKEN', '')
          resetRouter()
          resolve()
        } catch (error) {
          reject(error)
        }
        // logout(state.token).then(() => {
        //   localStorage.clear()
        //   resetRouter()
        //   commit('RESET_STATE')
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 清楚token
    resetToken({commit}) {
      return new Promise(resolve => {
        localStorage.clear()
        commit('SET_TOKEN', null)
        commit('RESET_STATE')
        resolve()
      })
    }
  }
}

export default user

