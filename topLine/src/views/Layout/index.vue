<template>
  <div>
    <router-view></router-view>
    <div class="tabBar-wrap">
      <van-tabbar route>
        <van-tabbar-item icon-prefix='toutiao' icon="shouye" to='/layout/' replace><span class="text">首页</span></van-tabbar-item>
        <van-tabbar-item icon-prefix='toutiao' icon="wenda" to='/layout/qa' replace><span class="text">问答</span></van-tabbar-item>
        <van-tabbar-item icon-prefix='toutiao' icon="shipin" to='/layout/video' replace><span class="text">视频</span></van-tabbar-item>
        <van-tabbar-item icon-prefix='toutiao' icon="wode" to='/layout/my' replace><span class="text">{{$store.state.user?'我的':'未登录'}}</span></van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

    };
  },
};
</script>

<style lang='less' scoped>
.tabBar-wrap {
  ::v-deep {
    .van-tabbar {
      height: 100px;
      .toutiao {
        font-size: 40px;
      }
      .text {
        font-size: 22px;
      }
    }
  }
}
</style>