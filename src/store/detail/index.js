import { reqDetailInfoApi,reqAddShopCartApi }from '@/api/api'
const state = {
  detailInfo:{}
}
const actions = {
  //获取详细页的信息
 async getDetail({commit},{skuId}) {
    const result = await reqDetailInfoApi(skuId)
    if (result.code === 200) {
      commit('DETAILINFO',result.data)
    }
  },
  //加入购物车
  async addShopCart({commit},{skuId,skuNum}) {
    const result = await reqAddShopCartApi(skuId, skuNum)
    //结果不用存于仓库，因为结果没有data，只有个成功/失败提示
    //判断请求成功或者失败，通过promise return回去
    if (result.code === 200) {
      //promise中return非空字符串代表成功的回调，也就是resolve
      return 'ok'
    } else {
      //返回失败的标志
      return Promise.reject(new Error('failed'))
    }
  }
}
const mutations = {
  DETAILINFO(state,value) {
    state.detailInfo=value
  }
}
const getters = {
  //获取仓库中的skuinfo值
  skuInfo(state) {
    return state.detailInfo.skuInfo || {}
  },
  //获取仓库中的属性选择值
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || {}
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}