//封装请求的api
import axios from '@/api/request'
import reqMock from '@/api/reqMock'
//三级联动的api
export const reqCategoryListApi = () => axios({
  url: '/product/getBaseCategoryList',
  method: 'get'
})
//封装mock模拟数据banner轮播图请求接口
export const reqBannerApi = () => reqMock.get('/banner')
//封装mock模拟数据floor请求接口
export const reqFloorApi = () => reqMock.get('/floor')
//搜索组件的api接口封装
export const reqSearchListApi = (params) => axios({
  url: '/list',
  method: 'post',
  data: params
})
//详情页的api接口封装
export const reqDetailInfoApi = (shuId) => axios({
  url: `/item/${shuId}`,
  method: 'get'
})
//加入购物车接口
export const reqAddShopCartApi = (skuId, skuNum) => axios({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
})
//获取购物车列表接口
export const reqShopCartListApi = () => axios.get('/cart/cartList') 
//购物车修改选中状态
export const reqUpdateStatus = (skuId, isChecked) => axios({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
//购物车删除单个商品接口
export const reqDeleteOneGoods = (skuId) => axios({ url: `cart/deleteCart/${skuId}`, method: 'delete' })
//获取验证码接口
export const reqCodeApi=(phone)=>axios.get(`/user/passport/sendCode/${phone}`)
//注册接口
export const reqRegisterApi = (params) => axios({ url: '/user/passport/register', method: 'post', data: params })
//登录接口
export const reqLoginApi = (params) => axios({ url: '/user/passport/login', method: 'post', data: params })
//自动登录接口
export const reqAutoLogin = () => axios.get('/user/passport/auth/getUserInfo')
//退出登录接口
export const reqLoginOut=()=>axios.get('/user/passport/logout')