<template>
  <div>
    <van-button
      round
      class="follow-btn"
      :class="{ followed: !isFollowed }"
      :loading="followLoading"
      loading-size="15"
      @click="followFn">
      {{ isFollowed ? '取消关注' : '关注' }}
    </van-button>
  </div>
</template>

<script>
import { goToFollow, delFollow } from '@/api/artical'
export default {
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      followLoading: false, //按钮loading状态，默认关闭
    }
  },
  model: {
    prop: 'isFollowed',
    event: 'changeFollowed',
  },
  methods: {
    async followFn() {
      // 开启按钮loading状态
      this.followLoading = true
      try {
        if (!this.isFollowed) {
          console.log(1)
          // 不是关注状态，点击进行关注
          const data = await goToFollow(this.userId)
          // 更新关注状态

          this.$toast('关注成功')
          console.log('关注成功', data)
        } else {
          console.log(2)
          // 关注状态，点击取消关注
          const data = await delFollow(this.userId)
          this.$toast('取消关注')
          console.log('取消关注成功', data)
        }
        this.$emit('changeFollowed', !this.isFollowed)
      } catch (error) {
        // 错误信息内容
        const errorArr = [
          {
            errId: 401,
            msg: '用户未认证，请先登录！',
          },
          {
            errId: 400,
            msg: '请求参数错误！',
          },
          {
            errId: 507,
            msg: '数据库错误，请求超时！',
          },
        ]
        // 显示错误提示
        errorArr.forEach((item) => {
          if (item.errId === error.response.status) {
            this.$toast(item.msg)
          }
        })
        console.log(error)
      }
      this.followLoading = false
    },
  },
}
</script>

<style lang="less" scoped></style>
