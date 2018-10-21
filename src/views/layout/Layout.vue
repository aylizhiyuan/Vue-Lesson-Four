<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
  //引入侧边栏组件/导航组件/主体组件
  import { Navbar,Sidebar,AppMain } from './components'
  //这个应该是一种对Vue的扩展
  import ResizeMixin from './mixin/ResizeHandler'

  export default {
    name: "Layout",
    components:{
      Navbar,
      Sidebar,
      AppMain
    },
    //这应该是对默认模版组件的一个功能的扩展，直接用minxins混合到了一起
    mixins:[ResizeMixin],
    computed:{
      sidebar(){
        return this.$store.state.app.sidebar
      },
      device(){
        return this.$store.state.app.device
      },
      classObj(){
        return {
          hideSidebar:!this.sidebar.opened,
          openSidebar:!this.sidebar.opened,
          withoutAnimation:this.sidebar.withoutAnimation,
          mobile:this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
