//配置vuex
import Vue from 'vue'
import vuex from 'vuex'
import home from '@/store/home'
import search from '@/store/search/index'
import detail from '@/store/detail'
import shopCart from '@/store/shopCart'
import user from '@/store/user'
import trade from '@/store/trade'
//注册插件
Vue.use(vuex)

export default new vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade
  }
})