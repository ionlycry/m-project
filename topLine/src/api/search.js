import request from '@/utils/request'
// 请求 获取文章列表数据
export const getSuggestionListApi = (q) => {
  // console.log(params)
  return request({
    url: 'v1_0/suggestion',
    method: 'GET',
    params: {
      q,
    },
  })
}
export const getSearchResultApi = (params) => {
  // console.log(params)
  return request({
    url: 'v1_0/search',
    method: 'GET',
    params,
  })
}
