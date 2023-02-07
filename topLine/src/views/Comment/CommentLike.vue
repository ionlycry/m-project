<template>
  <div>
    <van-button
      :icon="isFollowed ? 'good-job' : 'good-job-o'"
      size="mini"
      class="good-job-btn"
      :loading="followLoading"
      @click="onLike"
      ><span class="zhan-font">{{ likeCount || '赞' }}</span></van-button
    >
  </div>
</template>

<script>
import { goToCommentLike, delCommentLike } from '@/api/comment'
export default {
  props: {
    commentId: {
      type: [Number, String, Object],
      required: true,
    },
    isFollowed: {
      type: Boolean,
      required: true,
    },
    likeCount: {
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
    prop: 'isFollowed',
    event: 'changeStatus',
  },
  methods: {
    async onLike() {
      // 开启按钮loading状态
      this.followLoading = true
      try {
        if (!this.isFollowed) {
          // 如果没有点赞
          const { data } = await goToCommentLike(this.commentId)
          console.log('comLike', data)
          this.$toast('点赞成功')
          this.$emit('clickLikeCount', true)
        } else {
          const { data } = await delCommentLike(this.commentId)
          this.$toast('取消点赞')
          this.$emit('clickLikeCount', false)
        }
        this.$emit('changeStatus', !this.isFollowed)
      } catch (error) {
        console.log(error)
        const {
          data: { message },
        } = error.response
        this.$toast(`发布失败，${message}`)
      }

      this.followLoading = false
    },
  },
}
</script>

<style lang="less" scoped>
.good-job-btn {
  font-size: 28px;
  border: 0px;
  .zhan-font {
    font-size: 18px;
  }
}
</style>
