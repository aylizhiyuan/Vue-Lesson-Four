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
  baseURL:process.env.BASE_API, //api的基地址,在config的dev_env.js里面修改
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
  response=>{
    //自定义的错误
    const res = response.data
    if(res.code !== 20000){
      Message({
        message:res.message,
        type:'error',
        duration:5*1000
      })
      //token验证失败或者是token过期的时候必须拦截处理下
      //我们可以规定401的错误
      if(res.code === 401){
        Message.confirm(
          '你已被登出,可以取消继续留在该页面,或者重新登录',
          '确定登出',
          {
            confirmButtonText:'重新登录',
            cancelButtonText:'取消登录',
            type:'warning'
          }
        ).then(()=>{
          store.dispatch('FedLogOut').then(()=>{
            location.reload() //为了重新实例vue-router
          })
        })
      }
      return Promise.reject('error')
    }else{
      //如果没有错误的话，就直接结果返回
      return response.data
    }
  },
  error => {
    //这种错误是拦截时候的错误
    //为了debug的时候方便
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
