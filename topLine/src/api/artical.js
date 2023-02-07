import request from '@/utils/request'
// 请求 获取文章列表数据
export const getItemListApi = (params) => {
  // console.log(params)
  return request({
    url: 'v1_0/articles',
    method: 'GET',
    params,
  })
}
// 请求 获取文章详情数据
export const getArtical = (article_id) => {
  return request({
    url: `/v1_0/articles/${article_id}`,
    method: 'GET',
  })
}
// 请求 进行关注
export const goToFollow = (userId) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId,
    },
  })
}
// 请求 取消关注
export const delFollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE',
  })
}

// 请求 收藏文章
export const goToCollect = (articalId) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: articalId,
    },
  })
}
// 请求 取消收藏
export const delCollect = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE',
  })
}

// 请求 点赞文章
export const goToLike = (articalId) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: articalId,
    },
  })
}
// 请求 取消点赞
export const delLike = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE',
  })
}
