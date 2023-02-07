<template>
  <div class="us-profile-wrap">
    <!-- 导航 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 用户信息 -->
    <div>
      <input type="file" @change="onSelectImg" ref="file" hidden />
      <van-cell title="头像" is-link center @click="$refs.file.click()">
        <van-image :src="user.photo" round fit="cover" />
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="user.name"
        @click="isShowName = true" />
      <van-cell
        title="性别"
        is-link
        :value="user.gender === 0 ? '男' : '女'"
        @click="isShowGender = true" />
      <van-cell
        title="生日"
        is-link
        :value="user.birthday"
        @click="isShowBirthday = true" />
    </div>
    <!-- 编辑姓名信息的弹出层 -->
    <van-popup
      v-model="isShowName"
      position="bottom"
      :style="{ height: '100%' }">
      <UpdateName
        :userName="user.name"
        @close="isShowName = false"
        @updateName="user.name = $event"
        v-if="isShowName" />
    </van-popup>

    <!-- 编辑性别的弹出层 -->
    <van-popup
      v-model="isShowGender"
      position="bottom"
      :style="{ height: '45%' }">
      <UpdateGender
        :userGender="user.gender"
        @close="isShowGender = false"
        @updateGender="user.gender = +$event"
        v-if="isShowGender" />
    </van-popup>

    <!-- 编辑生日的弹出层 -->
    <van-popup
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '45%' }">
      <UpdateBirthday
        :userBirthday="user.birthday"
        @close="isShowBirthday = false"
        @updateBirthday="user.birthday = $event"
        v-if="isShowBirthday" />
    </van-popup>

    <!-- 编辑头像弹出层 -->
    <van-popup
      v-model="isShowImg"
      position="bottom"
      :style="{ height: '100%' }">
      <UpdateImg
        :userImg="img"
        @close="isShowImg = false"
        v-if="isShowImg"
        @updatePhoto="user.photo = $event" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from '@/views/User/components/UpdateName'
import UpdateGender from '@/views/User/components/UpdateGender'
import UpdateBirthday from '@/views/User/components/UpdateBirthday'
import UpdateImg from '@/views/User/components/UpdateImg'

export default {
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateImg,
  },
  data() {
    return {
      user: {},
      isShowName: false,
      isShowGender: false,
      isShowBirthday: false,
      isShowImg: false,
      img: null,
    }
  },
  methods: {
    async loadUserPro() {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (error) {
        console.log(error)
        const { response } = error
        const {
          data: { message },
        } = response
        this.$toast(`获取用户数据失败,${message}`)
      }
    },
    // 选择头像文件
    onSelectImg() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据

      this.img = window.URL.createObjectURL(file)
      this.isShowImg = true

      // 如果选择同一文件，不会触发change时间
      // input的value赋空
      this.$refs.file.value = ''
    },
  },
  created() {
    this.loadUserPro()
  },
}
</script>

<style lang="less" scoped>
.us-profile-wrap {
  // 导航栏
  ::v-deep .van-nav-bar__content {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon-arrow-left {
      color: #fff;
    }
  }
  //   头像图片
  ::v-deep .van-image {
    height: 80px;
    width: 80px;
  }
  // van-cell标题
  .van-cell__title {
    font-size: 30px;
  }

  .van-popup {
    background-color: #f5f6f7;
  }
}
</style>
