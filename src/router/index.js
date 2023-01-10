import vue from 'vue'
import vueRouter from 'vue-router'
import Home from '@/pages/Home/Home'
import Login from '@/pages/Login/Login'
import Search from '@/pages/Search/Search'
import Register from '@/pages/Register/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess/index'
import ShopCart from '@/pages/ShopCart'
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
  routes: [{
      path: '/',
      redirect: '/home',
      meta: {
        footerShow: true
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        footerShow: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        footerShow: false
      }
    },
    {
      path: '/search/:keyword?',
      component: Search,
      name: 'search',
      meta: {
        footerShow: true,
        //三级导航的隐藏
        navNotShow: true
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        footerShow: false
      }
    },
    {
      path: '/detail/:skuId',
      name:'detail',
      component: Detail,
      meta: {
        footerShow: true,
        //三级导航的隐藏
        navNotShow: true
      }
    },
    {
      path: '/addcartsuccess',
      name: 'addcartsuccess',
      component: AddCartSuccess,
      meta: {
        footerShow: true
      }
    },
    //购物车路由
    {path:'/shopcart',component:ShopCart,name:'shopcart',meta: {
      footerShow: true,
              navNotShow: true
      } }
  ],
  //vue-router滚动行为
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {
      y: 0
    }
  }
})
export default router