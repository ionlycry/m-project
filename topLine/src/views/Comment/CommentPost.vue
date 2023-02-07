<template>
  <div class="comment-reply-wrap">
    <van-form @submit="onSubmit">
      <van-field
        v-model.trim="message"
        rows="3"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入回复内容"
        :show-word-limit="true"
        name="content">
        <template #button>
          <van-button native-type="submit" :disabled="message === ''"
            >发布</van-button
          >
        </template>
      </van-field>
    </van-form>
  </div>
</template>

<script>
import { addCommentApi } from '@/api/comment'
export default {
  data() {
    return {
      message: '',
    }
  },
  props: {
    targetId: {
      type: [Number, String, Object],
      required: true,
    },
    artId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  methods: {
    async onSubmit(values) {
      try {
        const { data } = await addCommentApi({
          target: this.targetId,
          ...values,
          art_id: this.artId,
        })
        console.log(data)
        const { new_obj } = data.data
        this.$emit('updatePop')
        this.$emit('updateComment', new_obj)
        this.message = ''
      } catch (error) {
        console.log(error)
        const {
          data: { message },
        } = error.response
        this.$toast(`发布失败，${message}`)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.comment-reply-wrap {
  .van-field {
    padding: 30px 20px 30px 30px;
    .van-button[type='submit'] {
      border: 0px;
    }
  }
  ::v-deep .van-field__control {
    background-color: #f4f7fc;
    padding: 10px 20px 50px 20px;
  }
  ::v-deep .van-field__word-limit {
    position: absolute;
    right: 150px;
    bottom: 10px;
  }
}
</style>
