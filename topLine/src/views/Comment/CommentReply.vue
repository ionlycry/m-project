<template>
  <div class="comment-replywrap">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      ">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 评论对象 -->
      <comment-item :comments="comment"></comment-item>

      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <comment-list :sourceId="comment.com_id" type="c" ref="commentList">
      </comment-list>
    </div>
    <!-- 写评论 -->
    <van-button @click="isPopShow = true" block class="postbtn"
      >写评论</van-button
    >

    <!-- 回复弹出层 -->
    <van-popup v-model="isPopShow" position="bottom">
      <CommentPost
        :targetId="comment.com_id"
        @updatePop="isPopShow = false"
        @updateComment="updateCommentFn"
        :artId="articalId" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/views/Comment/CommentItem.vue'
import CommentList from '@/views/Comment/CommentList.vue'
import CommentPost from '@/views/Comment/CommentPost.vue'
export default {
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    articalId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      isPopShow: false,
    }
  },
  methods: {
    updateCommentFn(obj) {
      this.$refs['commentList'].commentList.unshift(obj)
      this.comment.reply_count++
    },
  },
}
</script>

<style lang="less" scoped>
.comment-replywrap {
  .van-nav-bar {
    ::v-deep .van-nav-bar__content {
      background-color: #fff;
      .van-nav-bar__title {
        color: #222222;
      }
      .van-icon-cross {
        font-size: 36px;
      }
    }
  }
  .scroll-wrap {
    position: fixed;
    top: 230px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }
  .postbtn {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
}
</style>
