<template>
  <div class="search-container">
    <!-- 顶部输入框 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="onCancel"
        @search="onSearch"
        class="serach-form"
        :clearable="false">
        <template #right-icon>
          <van-icon
            name="clear"
            @click="value = ''"
            v-show="value"
            color="#b5b5b5"></van-icon>
        </template>
      </van-search>
    </form>
    <!-- 逻辑：是否显示搜索结果，默认不显示，如果不显示搜索结果，判断是否有搜索值，没有搜索值，就显示历史记录 -->
    <!-- 搜索结果 -->
    <SearchResult v-if="isShowResult" :inputVal="value"></SearchResult>
    <!-- 搜索建议 -->
    <SearchSuggestion
      :inputVal="value"
      v-else-if="value"
      @search="onSearch"></SearchSuggestion>
    <!-- 搜索历史 -->
    <SearchHistory
      v-else
      :searchHistoryArr="searchHistories"
      @delSearchHistory="searchHistories = []"
      @search="onSearch"></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  data() {
    return {
      value: '',
      isShowResult: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [],
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion,
  },
  methods: {
    onCancel() {
      // this.$router.back()
      console.log('取消')
    },
    onSearch(val) {
      console.log(val)
      // 更新文本框内容
      this.value = val
      // 存储历史记录，不能有重复记录，最新的排在最前面
      // array.indexof（val）,如果找到即！== -1，则移除对应项
      // array.unshift
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        // 有重复值
        // splice删除
        this.searchHistories.splice(index, 1)
      }
      // 向前插入值
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isShowResult = true
    },
  },
  watch: {
    searchHistories(val) {
      // 最新的数组传入
      setItem('TOUTIAO_SEARCH_HISTORIES', val)
    },
  },
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .serach-form {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    .van-search__action {
      color: #fff;
    }
  }
}
</style>
