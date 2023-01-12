// 登录与注册仓库
import {reqCodeApi,reqRegisterApi,reqLoginApi,reqAutoLogin,reqLoginOut} from '@/api/api'
const state = {
  //验证码
  code: '',
  autoLoginUserInfo:{}
}
const actions = {
  //获取验证码
  async getCode({commit},phone) {
    const result = await reqCodeApi(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取验证码失败！'))
    }
  },
  //注册
  async register({commit},data) {
    const result = await reqRegisterApi(data)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('注册失败，该手机号已被注册！！'))
    }
  },
  // 登录
  async login({commit},data) {
    const result = await reqLoginApi(data)
    if (result.code === 200) {
      //登录成功，保存token到本地存储
      localStorage.setItem('token', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('登录失败，手机号或密码错误！'))
    }
  },
  //自动登录
  async autoLogin({commit}) {
    const result = await reqAutoLogin()
    if (result.code === 200) {
      commit('AUTOLOGIN', result.data)
      return 'ok'
    }else {
      return Promise.reject(new Error('自动登录失败！'))
    }
  },
  //退出登录
  async reqLoginOut({commit}) {
    const result = await reqLoginOut()
    if (result.code === 200) {
      //跳转至mutations清楚参考用户信息，且删除本地存储的token
      localStorage.removeItem('token')
      commit('LOGINOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('退出错误！！'))
    }
  }
}
const mutations = {
  //保存验证码
  GETCODE(state, value) {
    state.code=value
  },
  //自动登录
  AUTOLOGIN(state,data) {
    state.autoLoginUserInfo=data
  },
  //退出登录
  LOGINOUT(state) {
    state.autoLoginUserInfo={}
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}