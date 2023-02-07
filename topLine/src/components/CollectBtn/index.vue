<template>
  <div>
    <van-icon
      :name="isFollowed ? 'star' : 'star-o'"
      :loading="followLoading"
      :color="isFollowed ? 'rgb(255, 176, 29)' : 'rgb(107, 107, 107)'"
      @click="onActiveFn" />
  </div>
</template>

<script>
import { delCollect, goToCollect } from '@/api/artical'
export default {
  props: {
    articalId: {
      type: [Number, String, Object],
      required: true,
    },
    isFollowed: {
      type: Boolean,
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
    async onActiveFn() {
      // 开启按钮loading状态
      this.followLoading = true
      try {
        if (!this.isFollowed) {
          // 不是收藏状态，点击进行收藏
          const data = await goToCollect(this.articalId)
          // 更新收藏状态
          this.$toast('收藏成功')
          console.log('收藏成功', data)
        } else {
          // 收藏状态，点击取消收藏
          const data = await delCollect(this.articalId)
          this.$toast('取消收藏')
          console.log('取消收藏成功', data)
        }
        this.$emit('changeFollowed', !this.isFollowed)
      } catch (error) {
        // // 错误信息内容
        // const errorArr = [
        //   {
        //     errId: 401,
        //     msg: '用户未认证，请先登录！',
        //   },
        //   {
        //     errId: 400,
        //     msg: '请求参数错误！',
        //   },
        //   {
        //     errId: 507,
        //     msg: '数据库错误，请求超时！',
        //   },
        // ]
        // // 显示错误提示
        // errorArr.forEach((item) => {
        //   if (item.errId === error.response.status) {
        //     this.$toast(item.msg)
        //   }
        // })
        console.log(error)
        const {
          data: { message },
        } = error.response
        this.$toast(`操作失败，${message}`)
      }
      this.followLoading = false
    },
  },
}
</script>

<style lang="less" scoped></style>
