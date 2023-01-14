import Home from '@/pages/Home/Home'
import Search from '@/pages/Search/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess/index'
import ShopCart from '@/pages/ShopCart'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//路由懒加载
export default [
  //订单详情页
  {
    path: '/center',
    component: Center,
    //重定向
    redirect:'/center/myOrder',
    meta: {
      footerShow: true
    },
    children: [
       //二级路由我的订单
      {
        path: 'myOrder',
        //路由懒加载
        component:()=>import('@/pages/Center/MyOrder')
      },
      //二级路由团购订单
      {
        path: 'groupOrder',
        component:()=>import('@/pages/Center/GroupOrder')
      }
    ]
  },
  //支付成功组件
  {
    path: '/paySuccess',
    component: PaySuccess,
    meta: {
      footerShow: true
    },
    beforeEnter(to,from,next) {
      from.path.indexOf('/pay')!==-1?next():next(false)
    }
  },
  //支付页面
  {
    path: '/pay',
    component: Pay,
    meta: {
      footerShow: true
    },
    beforeEnter(to, from, next) {
      from.path.indexOf('/trade')!==-1?next():next(false)
    }
  },
  //结算页面组件
  {
    path: '/trade',
    component: Trade,
    meta: {
      footerShow: true
    },
    //独享守卫
   beforeEnter: (to, from,next) => {
     from.path==='/shopcart'?next():next(false)
    },
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
    },
    beforeEnter(to, from, next) {
      from.path.indexOf('/detail')!==-1?next():next(false)
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