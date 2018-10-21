import store from '@/store'
const {body} = document
const WIDTH = 1024
const RATIO = 3
export default {
  watch:{
    //这个应该是监听当前的路由
    //如果你是以手机模式打开的话，就将侧边栏关掉
    $route(route){
      if(this.device === 'mobile' && this.sidebar.opened){
        store.dispatch('CloseSideBar',{ withoutAnimation:false})
      }
    }
  },
  beforeMount(){
    //监听窗口的resize事件
    window.addEventListener('reize',this.resizeHandler)
  },
  mounted(){
    const isMobile = this.isMobile()
    if(isMobile){
      //如果是手机模式，切换设备，隐藏侧边栏
      store.dispatch('ToggleDevice','mobile')
      store.dispatch('CloseSideBar',{withoutAnimation: true})
    }
  },
  methods:{
    //根据当前的分辨率来判断是否进入了手机模式
    isMobile(){
      const rect  = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    //用户如果改变窗口的大小了
    //切换当前的设备，并且如果是手机模式的话，就直接隐藏侧边栏
    resizeHandler(){
      if(!document.hidden){
        const isMobile = this.isMobile()
        store.dispatch('ToggleDevice',isMobile ? 'mobile':'desktop')
        if(isMobile){
          store.dispatch('CloseSideBar',{withoutAnimation:true})
        }
      }
    }
  }
}
