import vue from 'vue'
import vueRouter from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'
vue.use(vueRouter)


//编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDup....警告错误
//所以要重写push和replace方法
//先备份一下原型对象上的push和replace方法
let originPush = vueRouter.prototype.push
let originReplace = vueRouter.prototype.replace

vueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //用call方法来改变this的指向
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
vueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}


//定义路由规则
const router = new vueRouter({
  routes,
  //vue-router滚动行为
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {
      y: 0
    }
  },
})
//路由守卫
router.beforeEach(async (to, from, next) => {  
    //用户是否登录了
  if (localStorage.getItem('token')) {
    if (to.path === '/login') {
      //登陆了不等再去登录页面
      //已经登录，跳回home
      next('/home')
    } else {
    //不去登录页面，去其他页面
    //判断仓库是否有用户信息，没有就请求发
      if (!store.state.user.autoLoginUserInfo.nickName) {
      try {
      //获取用户信息
        await store.dispatch('user/autoLogin')
        next()
      } catch (error) {
        //token可能过期，清楚token，重新登录
        alert('token过期，请重新登录')
        localStorage.removeItem('token')
        next('/login')
      }
      } else {
        //仓库有用户信息，直接放行
        next()
    }
    }
  } else {
  //  === '/shopcart' || to.path === '/tarde' || to.path === '/pay'
    //用户未登录
    //定义需要登录才能进入的路由
    var str='/shopcart /tarde /pay /paySuccess /center'
    if (str.indexOf(to.path)!==-1) {
      //未登录不能看购物车
      alert('未登录，请先登录！')
      next(`/login?redirect=${to.path}`)
    }
      next()
    }
 
})
export default router