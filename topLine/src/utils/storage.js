// 封装本地 存储数据
// 存储数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取本地存储
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (error) {
    // 如果JSON转化不成功，catch，直接返回value
    return value
  }
}
// 删除数据
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}