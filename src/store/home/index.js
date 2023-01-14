//home组件的vuex配置 
import { reqCategoryListApi,reqBannerApi,reqFloorApi } from '@/api/api'
const state = { 
  CategoryList: [],
  BannerList: [],
  FloorList:[]
}
const actions = {
  //发请求获取数据
  async CategoryList(context) {
    const {data} = await reqCategoryListApi()
    context.commit('CATEGORYLIST',data)
  },
  async getBanner(context) {
    const {data} =await reqBannerApi()
    context.commit('GRTBANNER',data)
  },
  //获取mock中floor中的数据
  async getFloor(context) {
    const { data } =await reqFloorApi()
    context.commit('GETDLLOOR',data)
  }
}
const mutations = {
  CATEGORYLIST(state, value) {
    state.CategoryList = value
  },
  GRTBANNER(state,value) {
    state.BannerList=value
  },
  GETDLLOOR(state, value) {
    state.FloorList=value
  }
}
const getters={}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
 }