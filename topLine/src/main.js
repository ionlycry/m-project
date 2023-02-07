import Vue from 'vue'

import App from './App.vue'
// 引入路由
import router from './router'
import store from './store'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 动态设置 rem 基准值
import 'amfe-flexible'
import '@/styles/index.less'
// 导入dayjs
import '@/utils/dayjs.js'
// 注册 vant 组件
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
