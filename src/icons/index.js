import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
Vue.componet('svg-icon',SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
//引入所有的svg文件夹下的.svg文件
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
