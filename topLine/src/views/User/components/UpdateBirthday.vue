<template>
  <div class="edit-time-wrap">
    <!-- 编辑框 -->
    <div>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="生日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onEditBirthday"
        @cancel="$emit('close')" />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  props: {
    userBirthday: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(this.userBirthday),
    }
  },
  methods: {
    async onEditBirthday() {
      try {
        const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
        // 提交修改
        const { data } = await editUserProfile({
          birthday: birthday,
        })
        // 更新视图
        this.$emit('updateBirthday', birthday)
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
