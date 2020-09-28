import {login, logout, getInfo} from '@/api/user'
import {resetRouter} from '@/router'

const user = {
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    name: '',
    avatar: '',
    roles: [],
    userInfo: {}
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
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    login({commit}, userInfo) {
      const {username, password} = userInfo
      return new Promise((resolve, reject) => {
        login({userName: username.trim(), password: password}).then(response => {
          const {data, token} = response
          commit('SET_NAME', data.userName)
          commit('SET_AVATAR', data.avatar)
          commit('SET_ROLES', data.roles)
          commit('SET_USER_INFO', data)
          commit('SET_TOKEN', token)
          localStorage.setItem('token', token)
          resolve(response)
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
          commit('SET_TOKEN', null)
          commit('SET_USER_INFO', null)
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

