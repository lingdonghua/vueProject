//搜索组件的小仓库
import {reqSearchListApi}  from '@/api/api'
const actions = {
  //获取服务器搜索的信息
  async getSearchData(context,params) {
    const {data} = await reqSearchListApi(params)
    context.commit('GETSEARCHDATA',data)
  }
}
const mutations = {
  GETSEARCHDATA(state,params) {
    state.SearchList=params
  }
}
const getters = {
  //计算属性计算出state中数组的值，共组件直接使用，方便取数据
  //获取各商品信息的数组
  goodsList(state) {
    console.log(state);
    return state.SearchList.goodsList
  },
  //获取商品属性的数组
  attrsList(state) {
    return state.SearchList.attrsList
  },
  //获取品牌数组
  trademarkList(state) {
    return state.SearchList.trademarkList
  },
  //获取服务器放回的商品总数total，供分页器使用
  total(state) {
    return state.SearchList.total
  }
}
const state = {
  SearchList:{}
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}