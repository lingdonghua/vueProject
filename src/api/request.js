//二次封装axios
import uuid from "@/utils/uuid"
import axios from "axios"
//导入网页上方进度条包
import nprogress from "nprogress"
import 'nprogress/nprogress.css'

//利用axios的create方法配置参数
const request = axios.create({
  baseURL: '/api',
  timeout:5000
})

//设置请求拦截器
request.interceptors.request.use(function (config) {
  nprogress.start()
  config.headers.userTempId = uuid()
  if (localStorage.getItem('token')) {
    config.headers.token=localStorage.getItem('token')
  }
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