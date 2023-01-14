//二次封装axios
import axios from "axios"
import nprogress from "nprogress"
import 'nprogress/nprogress.css'
import uuid from '@/utils/uuid'
//利用axios的create方法配置参数

const request = axios.create({
  baseURL: '/mock',
  timeout:5000
})

//设置请求拦截器
request.interceptors.request.use(function (config) {
  nprogress.start()
  return config
}, function (error) {
  return Promise.reject(error)
})
//响应拦截器
request.interceptors.response.use(function (response) {
  nprogress.done()
  return response.data
},function (error) {
  return Promise.reject(error)
})

export default request