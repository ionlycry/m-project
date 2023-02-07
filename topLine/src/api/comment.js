import request from '@/utils/request'
// 请求 获取评论列表数据
export const getCommentListApi = (params) => {
  // console.log(params)
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params,
  })
}

// 请求 对文章或者评论进行评论
export const addCommentApi = (data) => {
  // console.log(params)
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data,
  })
}

// 请求 点赞评论
export const goToCommentLike = (commentId) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId,
    },
  })
}
// 请求 取消点赞
export const delCommentLike = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE',
  })
}
