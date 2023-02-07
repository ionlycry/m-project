import request from '@/utils/request.js'

export const getAllChannels = () => {
  return request({
    url: 'v1_0/channels',
    method: 'GET',
  })
}
// 添加用户频道
export const addMyChannels = (channel) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel],
    },
  })
}
// 删除用户频道
export const delMyChannels = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE',
  })
}
