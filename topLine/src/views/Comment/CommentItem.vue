<template>
  <div class="comment-wrap">
    <van-cell>
      <template #icon>
        <van-image round :src="comments.aut_photo" fit="cover" />
      </template>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="custom-name">{{ comments.aut_name }}</div>
      </template>
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <comment-like
          v-model="comments.is_liking"
          :commentId="comments.com_id"
          :likeCount="comments.like_count"
          @clickLikeCount="clickLikeCountFn" />
      </template>
      <template #label>
        <div class="reply-content">{{ comments.content }}</div>
        <div class="reply-aside">
          <span class="pub-time">{{ comments.pubdate | foramtetime }}</span>
          <van-button
            class="reply-btn"
            @click="$emit('showReplyPop', comments)">
            回复 {{ comments.reply_count }}
          </van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import CommentLike from '@/views/Comment/CommentLike'
export default {
  components: {
    CommentLike,
  },
  data() {
    return {}
  },
  props: {
    comments: {
      type: Object,
      dafault: () => {},
    },
  },
  methods: {
    // 更新点赞视图，数字++
    clickLikeCountFn(bool) {
      bool ? this.comments.like_count++ : this.comments.like_count--
      console.log(this.comments)
    },
  },
}
</script>

<style lang="less" scoped>
.comment-wrap {
  margin-bottom: 10px;
  .van-image {
    height: 64px;
    width: 64px;
  }

  .custom-name {
    display: block;
    padding-left: 20px;
    color: #4b4b4b;
    font-size: 18px;
  }

  .van-cell__label {
    padding-left: 20px;
    padding-top: 16px;
    .reply-content {
      font-size: 26px;
      color: #000;
      font-weight: bold;
    }
    .reply-aside {
      padding-top: 34px;
      display: flex;
      .pub-time {
        font-size: 16px;
        display: block;
        margin-right: 40px;
      }
      .reply-btn {
        height: 40px;
        font-size: 16px;
        padding: 8px;
      }
    }
  }
}
</style>
