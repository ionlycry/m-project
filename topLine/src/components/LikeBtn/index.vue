<template>
  <div>
    <van-icon
      :name="attitude === 1 ? 'good-job' : 'good-job-o'"
      :loading="followLoading"
      :color="attitude === 1 ? 'rgb(255, 176, 29)' : 'rgb(107, 107, 107)'"
      @click="onActiveFn" />
  </div>
</template>

<script>
import { delLike, goToLike } from '@/api/artical'
export default {
  props: {
    articalId: {
      type: [Number, String, Object],
      required: true,
    },
    attitude: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      followLoading: false, //按钮loading状态，默认关闭
    }
  },
  model: {
    prop: 'attitude',
    event: 'changeFollowed',
  },
  methods: {
    async onActiveFn() {
      // 开启按钮loading状态
      this.followLoading = true
      try {
        if (this.attitude === -1) {
          // 不是点赞状态，点击进行点赞
          const data = await goToLike(this.articalId)
          // 更新点赞状态
          this.$toast('点赞成功')
          console.log('点赞成功', data)
        } else {
          // 点赞状态，点击取消点赞
          const data = await delLike(this.articalId)
          this.$toast('取消点赞')
          console.log('取消点赞成功', data)
        }
        this.$emit('changeFollowed', this.attitude === 1 ? -1 : 1)
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
