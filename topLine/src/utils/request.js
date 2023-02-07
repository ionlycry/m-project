import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  // 解决大数字问题
  transformResponse: function (data) {
    // Do whatever you want to transform the data
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  },
})
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state
    // 有用户信息且有用户token，才加请求头
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
