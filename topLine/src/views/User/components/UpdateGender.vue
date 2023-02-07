<template>
  <div class="edit-gender-wrap">
    <!-- 编辑框 -->
    <div>
      <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        @confirm="onEditGender"
        @cancel="$emit('close')"
        :default-index="userGender"
        item-height="38px" />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  props: {
    userGender: {
      type: [String, Number],
      required: true,
      //   validator: function (value) {
      //     // 值必须是这些字符串中的一个
      //     return ['0', '1'].indexOf(value) !== -1
      //   },
    },
  },
  data() {
    return {
      columns: ['男', '女'],
    }
  },
  methods: {
    async onEditGender(value, index) {
      try {
        // 提交修改
        const { data } = await editUserProfile({
          gender: index,
        })
        // 更新视图
        this.$emit('updateGender', index)
        // 关闭popup
        this.$emit('close')
        console.log(data)
        this.$toast('修改成功')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
