<template>
  <div>
    <van-cell title="历史记录">
      <div v-if="isDelShow">
        <span @click="$emit('delSearchHistory')">全部删除</span>
        &nbsp;
        <span @click="isDelShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDelShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      @click="onSearchItemClick(item, index)"
      v-for="(item, index) in searchHistoryArr"
      :key="index">
      <van-icon name="close" v-show="isDelShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    // 接受历史记录数组
    searchHistoryArr: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDelShow: false,
    }
  },
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDelShow) {
        // 点击删除
        this.searchHistoryArr.splice(index, 1)
      } else {
        // 点击搜索
        this.$emit('search', item)
      }
    },
  },
}
</script>

<style></style>
