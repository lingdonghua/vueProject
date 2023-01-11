import vue from 'vue'
import vueRouter from 'vue-router'
import routes from '@/router/routes'
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
  }
})
export default router