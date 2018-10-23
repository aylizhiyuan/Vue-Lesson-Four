import Vue from 'vue'
import Router from 'vue-router'


//模版的默认样式
import Layout from '../views/layout/Layout'

Vue.use(Router)

//静态路由的配置参数在这里面
export const constantRouterMap = [
  {
    path:'/',
    component:Layout
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode:'history', //后端支持可以开启
  scrollBehavior:()=>({y:0}),
  routes:constantRouterMap
})
