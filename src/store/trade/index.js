//结算组件仓库
import {reqAddressListApi,reqTradeInfo,reqCommitOrder} from '@/api/api'
const state = {
  address: [],
  //核对页具体商品信息
  tradeInfoList: {},
  //订单号
  orderId:0
}
const actions = {
  //获取用户地址信息
  async getAddress({commit}) {
    const result = await reqAddressListApi()
    if (result.code === 200) {
      //获取成功保存地址信息
      commit('GETADDRESS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取用户地址失败！！'))
    }
  },
  //获取订单核对页具体信息
  async getGoodsInfo({commit}) {
    const result = await reqTradeInfo()
    if (result.code === 200) {
      commit('GETGOODSLIST', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取成功！'))
    }
  },
  //提交订单给服务器
  async commitOrder({commit},{traderNo,data}) {
    const result = await reqCommitOrder(traderNo, data)
    if (result.code === 200) {
      commit('ORDERNUM', result.data)
      return'ok'
    } else {
      return Promise.reject(new Error('订单提交失败！！'))
    }
  }

}
const mutations = {
  //用户地址信息
  GETADDRESS(state, value) {
    state.address=value
  },
  //用户下单的商品信息
  GETGOODSLIST(state,data) {
    state.tradeInfoList=data
  },
  //保存订单号
  ORDERNUM(state, value) {
    state.orderId=value
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