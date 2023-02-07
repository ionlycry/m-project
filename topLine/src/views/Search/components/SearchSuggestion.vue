<template>
  <div class="suggestion-list">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
      @click="$emit('search', item)">
      <div slot="title" v-html="toHightLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionListApi } from '@/api/search'
// 引入防抖函数
import { debounce } from 'lodash'
export default {
  props: {
    // 接收父组件的输入的值
    inputVal: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // 联想建议的数组
      suggestions: [],
    }
  },
  watch: {
    inputVal: {
      // handler(newVal, oldVal) {
      //   // console.log('newVal', newVal)
      //   // console.log('oldVal', oldVal)
      //   this.loadSuggestions(newVal)
      // },
      handler: debounce(function (newVal) {
        this.loadSuggestions(newVal)
      }, 300),
      immediate: true, //侦听开始之后立调用
    },
  },
  methods: {
    async loadSuggestions(val) {
      // console.log(val)
      // 如果搜索有值，发送请求

      if (val) {
        try {
          // 输入框有值，发送请求
          const { data: res } = await getSuggestionListApi(val)
          // console.log(res.data)
          this.suggestions = res.data.options
          // 建议列表返回为null
          if (res.data.options[0] === null) {
            this.suggestions = []
          }
          console.log(this.suggestions)
        } catch (error) {
          this.$toast('数据获取失败，请稍后重试')
        }
      } else {
        //  val为''
        this.suggestions = []
      }
    },
    toHightLight(text) {
      const htmlStr = `<span class='active'>${this.inputVal}</span>`
      // 正则/abc/gi
      const reg = new RegExp(this.inputVal, 'gi')
      // console.log('reg', reg)
      // console.log('text', text)
      return text.replace(reg, htmlStr)
    },
  },
}
</script>

<style lang="less" scoped>
.suggestion-list {
  ::v-deep .active {
    color: #3296fa;
  }
}
</style>
