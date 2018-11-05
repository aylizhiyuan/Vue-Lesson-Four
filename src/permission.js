import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from "@/utils/auth"
const whiteList = ['/login'] //不重定向白名单
router.beforeEach((to,from,next)=>{
  NProgress.start()
  if(getToken()){
    if(to.path === '/login'){
      next({path:'/'}) //如果在已经登录的情况下访问登录页面，直接重定向首页
      NProgress.done();
    }else{
      //在有权限的情况下，访问正常的页面
      if(store.getters.roles.length === 0){
        store.dispatch('GetInfo').then(res=>{
          next() //拉取用户信息
        }).catch(err=>{
          store.dispatch('FedLogOut').then(()=>{
            Message.error(err || 'Verification failed,please login again')
            next({path:'/'})
          })
        })
      }else{
        next()
      }
    }
  }else{
    //如果没有拿到token
    if(whiteList.indexOf(to.path) !== -1){
      next()
    }else{
      next(`/login?redirect=${to.path}`) //否则全部重定向到登录页
      NProgress.done()
    }
  }
})
router.afterEach(()=>{
  NProgress.done() //结束progress
})
