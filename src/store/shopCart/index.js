import {reqShopCartListApi,reqUpdateStatus,reqDeleteOneGoods} from '@/api/api'
const state = {
  shopCartList:{}
}
const actions = {
  //获取购物车列表
  async getShopCartList({commit}) {
    const result = await reqShopCartListApi()
    if (result.code === 200) {
      commit('SHOPCARTLIST',result.data[0])
    }
  },
  //修改选中状态
  async updateStatus({ commit },{skuId,isChecked}) {
    const result = await reqUpdateStatus(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error("修改失败!!"))
    }
  },
  //删除单个商品
  async deleteOneGoods({commit},skuId) {
    const result = await reqDeleteOneGoods(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('删除失败！！'))
    }
  }
}
const mutations = {
  SHOPCARTLIST(state,value) {
    state.shopCartList=value || {}
  }
}
const getters = {
  //获取购物车具体数据
  shopCartList(state) {
    return state.shopCartList.cartInfoList || []
  }

}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}