<template>
  <div class='login-container'>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class='page-nav-bar'>
      <template #left>
        <van-icon name="cross" size="24" color="#fff" @click='$router.back()' />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 表单 -->
    <van-form ref='loginForm' @submit="onSubmit">
      <van-field v-model="user.mobile" left-icon='shouji' center icon-prefix='toutiao' name="mobile" placeholder="请输入手机号" :rules="regRules.regPhone" type='number' maxlength='11' autocomplete='off' />
      <van-field v-model="user.code" left-icon='yanzhengma' center icon-prefix='toutiao' name="code" placeholder="请输入验证码" :rules="regRules.regCode" type='number' maxlength='6' autocomplete='off'>
        <template #button>
          <van-count-down :time="6*1000" format='ss s' @finish='isShowCountDown=false' v-if="isShowCountDown">
            <template #default="timeData">
              <span class="block">{{ timeData.seconds+' s' }}</span>
            </template>
          </van-count-down>
          <van-button size="small" round plain type='info' @click="sendSms" native-type="button" v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- /表单 -->
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      isShowCountDown: false,
      user: {
        mobile: '18612345678',
        code: '246810'
      },
      regRules: {
        regPhone: [
          {
            required: true,
            message: '请填写手机号'
          },
          {
            pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: '手机号格式错误'
          }
        ],
        regCode: [
          {
            required: true,
            message: '请填写验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          },
        ]
      }
    };
  },
  methods: {
    async onSubmit () {
      const user = this.user
      // 显示loading
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0  //持续展示
      });
      //  发起请求，获取数据
      try {
        const { data } = await login(user)
        // console.log('登录成功', res)
        // 通过vuex设置state中user的信息，包含token和refresh token
        this.$store.commit('setUser', data.data)
        this.$toast.success({
          message: '登录成功',
          duration: 800
        })
        this.$router.back()
      } catch (error) {
        // console.log(error)
        if (error.response.status === 400) {
          this.$toast.fail({
            message: error.response.data.message,
            duration: 800
          })
        } else {
          this.$toast.fail({
            message: '登陆失败',
            duration: 800
          })
          console.log('登录失败', error)
        }
      }

    },
    async sendSms () {
      // 验证 手机号
      // validate('mobile') 返回promise对象
      try {
        // console.log(1)
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('手机号格式错误', error)
      }
      this.isShowCountDown = true
      // 通过，显示倒计时
      // 请求发送验证码
    }
  },
};
</script>

<style lang='less' scoped>
::v-deep .toutiao {
  font-size: 36px;
}
.block {
  border: 1px solid #e2e2e2;
  height: 62px;
  line-height: 62px;
  padding: 0 36px;
  font-size: 24px;
  display: inline-block;
  text-align: center;
  color: #e2e2e2;
  border-radius: 32px;
}
</style>