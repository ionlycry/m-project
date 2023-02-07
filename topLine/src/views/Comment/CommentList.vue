<template>
  <div>
    <van-list
      v-model="commentLoading"
      :finished="commentFinished"
      finished-text="没有更多了"
      @load="onLoad">
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :comments="item"
        @showReplyPop="$emit('showReplyPopup', $event)"></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentListApi } from '@/api/comment'
import CommentItem from '@/views/Comment/CommentItem'
export default {
  components: {
    CommentItem,
  },
  props: {
    sourceId: {
      type: [Number, String, Object],
      required: true,
    },
    // 评论类型，a是文章，c是评论
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      commentLoading: false,
      commentFinished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      commentList: [],
    }
  },
  methods: {
    // 加载评论列表
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.commentLoading = true
      try {
        const { data } = await getCommentListApi({
          type: this.type,
          source: this.sourceId,
          offset: this.offset,
          limit: this.limit,
        })
        console.log(data)
        this.$emit('onLoadSuccess', data.data)
        const { results } = data.data
        this.commentList.push(...results)
        // 加载状态结束
        this.commentLoading = false
        // console.log('返回结果的长度', results.length)
        if (results.length) {
          // 数据有长度，说明有内容
          this.offset = data.data.last_id
          // console.log('lastid', data.data.last_id)
          // console.log('endid', data.data.end_id)
        } else {
          this.commentFinished = true
        }
      } catch (error) {
        console.log(error)
        // 加载状态结束
        this.commentLoading = false
      }
    },
  },
  created() {
    this.onLoad()
  },
}
</script>

<style lang="scss" scoped></style>
