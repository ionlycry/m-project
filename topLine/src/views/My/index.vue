<template>
  <div>
    <!-- 顶部样式 -->
    <div class="topWrap">
      <!-- 已登录顶部样式 -->
      <div class="isLogin" v-if="user">
        <!-- 头像信息区 -->
        <div class="top">
          <!-- 左边头像 -->
          <div class="left">
            <van-image
              :src="userInfo.photo"
              round
              fit="cover"
              class="portrait" />
            <span class="name">{{ userInfo.name }}</span>
          </div>
          <!-- 右边按钮编辑 -->
          <div class="right">
            <van-button
              plain
              hairline
              round
              class="edit-btn"
              to="../user/profile"
              >编辑资料</van-button
            >
          </div>
        </div>
        <!-- 详细信息区 -->
        <div class="bottom">
          <div class="item">
            <span class="num">{{ userInfo.art_count }}</span>
            <span class="item-title">头条</span>
          </div>
          <div class="item">
            <span class="num">{{ userInfo.follow_count }}</span>
            <span class="item-title">关注</span>
          </div>
          <div class="item">
            <span class="num">{{ userInfo.fans_count }}</span>
            <span class="item-title">粉丝</span>
          </div>
          <div class="item">
            <span class="num">{{ userInfo.like_count }}</span>
            <span class="item-title">获赞</span>
          </div>
        </div>
      </div>
      <!-- 未登录顶部样式 -->
      <div class="isNotLogin" v-else>
        <a
          class="phoneImg"
          href="javascript:;"
          @click.prevent="$router.push('/login')"></a>
        <p class="txt">登陆 / 注册</p>
      </div>
    </div>

    <!-- 功能按钮区 -->
    <div class="operateBtnWrap">
      <van-grid :border="false" :column-num="2">
        <van-grid-item
          icon-prefix="toutiao"
          icon="shoucang"
          text="收藏"
          clickable />
        <van-grid-item
          icon-prefix="toutiao"
          icon="lishi"
          text="历史"
          clickable />
      </van-grid>
    </div>
    <!--  动作区-->
    <div class="actionSheet">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <!-- 退出按钮 -->
    <div v-if="user">
      <van-button block class="logoutBtn" @click="onLogOut" clickable
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  data() {
    return {
      userInfo: {}, //用户信息
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    onLogOut() {
      // 弹出提示
      this.$dialog
        .confirm({
          message: '确定要退出登录吗？',
        })
        .then(() => {
          // on confirm
          // 退出清除本地和state中的信息
          this.setUser(null)
        })
        .catch(() => {
          // on cancel
        })
    },
    ...mapMutations(['setUser']),
    // axios获取用户信息
    async loadUserInfo() {
      try {
        const { data: res } = await getUserInfo()
        this.userInfo = res.data
      } catch (err) {
        console.log(err)
        const { response } = err
        const {
          data: { message },
        } = response
        this.$toast('身份认证失败，请重新登录')
      }
    },
  },
  created() {
    // 页面初始化状态
    // 如果登录成功，加载数据
    if (this.user) {
      // 加载 数据
      this.loadUserInfo()
    }
  },
}
</script>

<style scoped lang="less">
.topWrap {
  background: #fff url('~@/assets/banner.png') no-repeat;
  background-size: cover;
  height: 360px;
  width: 100%;
  .isNotLogin {
    height: 360px;
    width: 100%;
    display: flex;
    flex-direction: column; //改成垂直方向，主轴改成y了
    justify-content: center; //主轴的布局
    align-items: center; //交叉轴的布局
    .phoneImg {
      width: 132px;
      height: 132px;
      background: url('~@/assets/mobile.png') no-repeat center;
      background-size: 80%;
      border-radius: 66px;
    }
    .txt {
      font-size: 26px;
      width: 150px;
      text-align: center;
      color: #fff;
      margin: 0;
    }
  }
  // 登录状态样式
  .isLogin {
    padding: 0px 30px 0px;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 240px;
      .left {
        display: flex;
        align-items: center;
        .portrait {
          width: 116px;
          height: 116px;
          border: 4px solid #fff;
        }
        .name {
          margin-left: 18px;
          font-size: 26px;
          color: #fff;
        }
      }

      .right {
        .edit-btn {
          font-size: 18px;
          padding: 0 20px;
          height: 32px;
          line-height: 32px;
        }
      }
    }

    .bottom {
      display: flex;
      .item {
        height: 120px;
        width: 100%;
        flex: 1;
        text-align: center;
        color: #fff;
        display: flex;
        flex-direction: column;
        .num {
          font-size: 40px;
          font-weight: 300;
        }

        .item-title {
          font-size: 22px;
        }
      }
    }
  }
}
.operateBtnWrap {
  ::v-deep {
    .toutiao {
      font-size: 40px;
    }
    .toutiao-shoucang {
      color: rgb(209, 39, 39);
    }
    .toutiao-lishi {
      color: rgb(224, 104, 34);
    }
  }
}
.actionSheet {
  margin: 10px;
}
.logoutBtn {
  color: rgb(209, 39, 39);
}
</style>
