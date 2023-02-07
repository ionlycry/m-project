<template>
  <div class="home-wrap">
    <!-- navbar导航栏 -->
    <div>
      <van-nav-bar class="page-nav-bar" fixed>
        <template #title>
          <van-button type="info" icon="search" round block to="../search">
            搜索
          </van-button>
        </template>
      </van-nav-bar>
    </div>

    <!-- tab选项卡 -->
    <div class="tabs-wrap">
      <!-- 汉堡 按钮  -->
      <div class="hangber-btn">
        <van-button
          icon="gengduo"
          icon-prefix="toutiao"
          @click="isShowPop = true"></van-button>
      </div>
      <van-tabs
        line-width="20px"
        color="#3296fa"
        v-model="active"
        :swipeable="true"
        :border="true"
        :swipe-threshold="4">
        <van-tab
          v-for="item in tablist"
          :title="item.name"
          :key="item.id"
          title-class="vantab-class">
          <CellList :channel="item" />
        </van-tab>
      </van-tabs>
    </div>

    <!-- pop弹出层 -->

    <van-popup
      v-model="isShowPop"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      round
      @close="changeEditState">
      <!-- 自定义组件 ChannelEdit-->
      <ChannelEdit
        :channels="tablist"
        :activeId="active"
        @changeActiveFn="changeActive"
        ref="ChannelEditID" />
    </van-popup>
  </div>
</template>

<script>
import CellList from '@/components/CellList'
import { getChannelsApi } from '@/api/user.js'
import ChannelEdit from './components/ChannelEdit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  data() {
    return {
      active: 0,
      tablist: [], //频道列表
      isShowPop: false,
    }
  },
  components: {
    CellList,
    ChannelEdit,
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    // 获取tab标签
    async getChannels() {
      try {
        // 登录状态：直接请求用户数据
        let channels = []
        if (this.user) {
          const { data: res } = await getChannelsApi()
          channels = res.data.channels
          // console.log(res.data)
        } else {
          // 未登录状态：
          // 1：有本地存储，读取本地存储
          if (getItem('TOUTIAO_CHANNELS')) {
            channels = getItem('TOUTIAO_CHANNELS')
          } else {
            // 2：无本地存储，请求匿名用户数据
            const { data: res } = await getChannelsApi()
            channels = res.data.channels
          }
        }
        this.tablist = channels
      } catch (error) {
        console.log('请求失败')
      }
    },
    // 改变激活tab标签
    changeActive(value, isShowPop) {
      this.active = value
      // console.log(value)
      // 关闭pop弹层
      this.isShowPop = isShowPop
    },
    changeEditState() {
      this.$refs.ChannelEditID.isEdit = false
    },
  },
  created() {
    this.getChannels()
  },
}
</script>

<style lang="less" scoped>
.page-nav-bar {
  .van-button {
    height: 64px;
    width: 400px;
    background-color: #52a7fc;
    border: 0;
    .van-icon {
      color: #fff;
    }
  }
}
.tabs-wrap::v-deep {
  padding-top: 178px;
  padding-bottom: 100px;
  box-sizing: border-box;
  .van-tabs__content {
    min-height: 800px;
  }
  .van-tabs--line {
    .van-tabs__wrap {
      height: 86px;
      position: fixed;
      left: 0px;
      right: 0px;
      top: 92px;
      z-index: 9;
    }
  }
  .van-tabs__nav {
    padding: 0px;
    .van-tabs__line {
      bottom: 10px;
    }
  }
  .hangber-btn {
    position: fixed;
    z-index: 10;
    right: 0px;
    top: 92px;
    height: 84px;
    background: rgba(255, 255, 255, 0.9) url('~@/assets/gradient-gray-line.png')
      no-repeat left center;
    background-size: contain;
    padding-left: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-button {
      height: 84px;
      border: 0px;
      width: 64px;
      background-color: transparent;
      .toutiao-gengduo {
        font-size: 28px;
      }
    }
  }
}
.pop-wrap {
  position: relative;
}
</style>
<style lang="less">
.vantab-class {
  border: 1px solid rgb(243, 243, 243);
  min-width: 190px;
}
</style>
