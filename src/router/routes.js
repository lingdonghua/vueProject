import Home from '@/pages/Home/Home'
import Search from '@/pages/Search/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess/index'
import ShopCart from '@/pages/ShopCart'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
export default [
  //支付页面
  {
    path: '/pay',
    component: Pay,
    meta: {
      footerShow: true
    }
  },
  //结算页面组件
  {
    path: '/trade',
    component: Trade,
    meta: {
      footerShow: true
    }
  },
  {
    path: '/',
    redirect: '/home',
    meta: {
      footerShow: true
    }
  },
  {
    path: '/home',
    name: 'home',
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
    name: 'detail',
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
  {
    path: '/shopcart',
    component: ShopCart,
    name: 'shopcart',
    meta: {
      footerShow: true,
      navNotShow: true
    }
  },
  //登录路由
  {
    path: '/login',
    name: 'name',
    component: Login
  },
  //注册路由
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]