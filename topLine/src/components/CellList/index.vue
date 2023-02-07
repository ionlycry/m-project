<template>
  <div class="cell-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessTxt"
      loading-text="加载中..."
      success-duration="1000">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载">
        <CellContent
          v-for="(item, index) in itemlist"
          :key="index"
          :artical="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getItemListApi } from '@/api/artical'
import CellContent from '@/components/CellContent'
export default {
  data() {
    return {
      itemlist: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      refreshSuccessTxt: '刷新成功',
    }
  },
  components: {
    CellContent,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // 请求获取数据
      console.log(this.channel.id)
      try {
        const { data: res } = await getItemListApi({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(), //timestamp相当于当前页，res会返回一个pre-timestamp,相当于下一页
        })

        const { results } = res.data
        this.itemlist.push(...results) //数组追加 数组形式的数据，用展开语法合并
        // console.log(results)

        // 加载状态结束
        this.loading = false
        // 测试 40条数据
        if (this.itemlist.length > 40) {
          return (this.finished = true)
        }
        // 数据全部加载完成
        // if (results.length) {
        //   // 请求回来的数据有就更新timestamp
        //   this.timestamp = res.data.pre_timestamp
        // } else {
        //   this.finished = true;
        // }
      } catch (error) {
        console.log('出错了')
        this.error = true
        this.loading = false //请求失败loading关闭
      }
    },
    async onRefresh() {
      try {
        // 成功读数据
        const { data: res } = await getItemListApi({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        })

        // // 制造报错
        // if (Math.random() < 0.5) {
        //   JSON.parse('ASHDLKSAHJ')
        // }

        const { results } = res.data
        this.itemlist.unshift(...results) //向前插入10条数据
        this.refreshSuccessTxt = `刷新成功！ 更新了${results.length}条数据`
        // 刷新状态结束
        this.isRefreshLoading = false
      } catch (error) {
        this.refreshSuccessTxt = '刷新失败！'
        this.isRefreshLoading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.cell-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
