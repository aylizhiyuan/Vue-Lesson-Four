//封装一个通用的request方法，用来发请求，使用的时候如下
/*
import request from '@/utils/request'
export function getInfo(params){
  return request({
    url:'/user/info',
    method:'get',
    params
  })
}*/
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import  { getToken } from '@/utils/auth'

//创建一个axios的实例对象
const service = axios.create({
  baseURL:process.env.BASE_API, //api的基地址
  timeout:5000 //请求超时的时间
})
//设置请求前的拦截器
service.interceptors.request.use(
  config => {
    if(store.getters.token){
      //让每一个请求都带着token x-token是自己定义的key
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    //如果请求错误的话
    console.log(error)
    Promise.reject(error)
  }
)
//响应的拦截器
service.interceptors.response.use(
  response=>response,
  error => {
    console.log('err' + error)
    Message({
      message:error.message,
      type:'error',
      duration:5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
