import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import TypeNav from '@/components/TypeNav/TypeNav'
import store from '@/store/index'
import Carousel from '@/components/Carousel/Carousel'
import Pagination from '@/components/Pagination/Pagination'
//为了练习不用vuex开发，后期的开发就不用vuex了
//统一引入
import * as API from '@/api/api'
//导入一下mock，让其运行
import './mock/mockServer'
//引入element-ui的弹框
import { MessageBox } from 'element-ui'
//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
//引入懒加载用图
import ly from '@/assets/1.jpg'
//注册插件
Vue.use(VueLazyload, {
  loading:ly  //懒加载的图片
})

Vue.config.productionTip = false
//TypeNav组件注册位全局组件（用的地方很多）
Vue.component('TypeNav', TypeNav)
//将轮播图组件注册位全局组件
Vue.component('Carousel', Carousel)
//分页器注册为全局组件
Vue.component('Pagination', Pagination)


new Vue({
  render: h => h(App),
  router,
  store,
  //注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    //挂载接口对象
    Vue.prototype.$API = API
    //挂载element-ui的弹框
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
}).$mount('#app')
