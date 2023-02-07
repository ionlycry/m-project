import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文包
import 'dayjs/locale/zh-cn'


// 加载相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')  //全局使用

Vue.filter('foramtetime', value => {
  return dayjs().to(dayjs(value))
})
