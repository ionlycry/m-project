import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
// 设置成变量，可以实时监控，如果是字符串，无法检测到
const TOKEN_KEY = 'toutiaoUser'
const store = new Vuex.Store({
  state: {
    // 设置用户信息
    // 字符串转换成对象JSON.parse
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 增加本地存储，持久化
      //对象转换成json字符串JSON.stringify
      setItem(TOKEN_KEY, data)
    }
  }
})

export default store
