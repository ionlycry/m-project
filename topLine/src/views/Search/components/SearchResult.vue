<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad">
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="index + ' ' + item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultApi } from '@/api/search'
export default {
  props: {
    inputVal: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 15,
      error: false,
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      //ajax 请求
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResultApi({
          page: this.page,
          per_page: this.per_page,
          q: this.inputVal,
        })
        // 模拟加载失败的代码
        if (Math.random() > 0.5) {
          JSON.parse('dsadsa')
        }
        console.log(data.data)

        // 2. 将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)

        //3. 加载状态结束
        this.loading = false

        //4.判断是否还有数据
        if (results.length) {
          // 有page++
          this.page++
        } else {
          // 没有，显示没有更多数据了
          this.finished = true
        }
      } catch (error) {
        // 加载失败提示
        this.error = true
        // 加载失败，loading=false 关闭
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
