<template>
  <div class="edit-name-wrap">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onEditName" />
    <!-- 编辑框 -->
    <div class="text-wrap">
      <van-field
        v-model.trim="uname"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入内容"
        show-word-limit />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      uname: this.userName,
    }
  },
  methods: {
    async onEditName() {
      try {
        if (this.uname.length) {
          // 提交修改
          const { data } = await editUserProfile({
            name: this.uname,
          })
          // 更新视图
          this.$emit('updateName', this.uname)
          // 关闭popup
          this.$emit('close')
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.edit-name-wrap {
  ::v-deep .van-nav-bar {
    .van-nav-bar__content {
      background-color: #fff;
      .van-nav-bar__text {
        font-size: 30px;
      }
      .van-nav-bar__title {
        color: #333;
      }
    }
  }

  .text-wrap {
    padding: 20px;
  }
}
</style>
