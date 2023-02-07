import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data,
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET',
  })
}
export const getChannelsApi = () => {
  return request({
    url: 'v1_0/user/channels',
    method: 'GET',
  })
}
// 获取用户信息
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET',
  })
}
// 编辑用户信息
export const editUserProfile = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data,
  })
}
// 上传图像
export const editPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data,
  })
}
