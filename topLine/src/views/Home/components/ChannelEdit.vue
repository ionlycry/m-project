<template>
  <div class="channel-wrap">
    <van-button
      type="warning"
      plain
      round
      size="mini"
      class="btn-edit"
      @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button
    >
    <div class="GridClass myGridClass">
      <p class="title">我的频道</p>
      <van-grid :gutter="12" :border="false" :clickable="true">
        <van-grid-item
          v-for="(value, index) in channels"
          :key="index"
          :class="{ active: index === activeId }"
          @click="myChannelClick(value, index)">
          <template #icon>
            <van-icon
              name="clear"
              v-show="isEdit && !fixedChannel.includes(value.id)" />
          </template>
          <template #text>
            <span class="text">{{ value.name }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <div class="GridClass recommendGridClass">
      <p class="title">频道推荐</p>
      <van-grid
        :gutter="12"
        :border="false"
        direction="horizontal"
        icon-size="18"
        :clickable="true">
        <van-grid-item
          v-for="(value, index) in recommendChannels"
          :key="value.id"
          @click="addChannels(value, index)">
          <template #icon>
            <van-icon name="plus" v-show="isEdit" />
          </template>
          <template #text>
            <span class="text">{{ value.name }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels, addMyChannels, delMyChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  data() {
    return {
      allChannels: [], //所有频道列表
      isEdit: false,
      fixedChannel: [0, 4], //锁定的频道的id，不能操作，只能显示和跳转
    }
  },
  props: {
    channels: {
      type: Array,
      required: true,
    },
    activeId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.channels.find((key) => {
          return key.id === item.id
        })
      })
    },
  },
  methods: {
    // 初始化频道列表
    async getChannels() {
      try {
        const { data: res } = await getAllChannels()
        this.allChannels = res.data.channels
      } catch (error) {
        this.$toast('读取全部频道列表出错')
      }
    },
    // 点击我的频道中的item
    myChannelClick(value, index) {
      // 是否编辑状态
      if (this.isEdit) {
        // 1,编辑状态
        if (this.fixedChannel.includes(value.id)) {
          // 是锁定频道就返回
          return
        }
        // 点击删除频道
        if (index <= this.activeId) {
          this.myChangeActive(this.activeId - 1)
        }
        this.removeChannel(value, index)
      } else {
        // 2，非编辑状态
        // 点击设置对应标签高亮
        this.myChangeActive(index, false)
      }
    },
    // 点击对应标签高亮显示，根据点击的index
    // isShowPop:false关闭弹层，true:显示弹层（默认）
    myChangeActive(index, isShowPop = true) {
      this.$emit('changeActiveFn', index, isShowPop)
      // console.log(value, index)
    },
    // 添加频道
    async addChannels(value) {
      // console.log(value)
      this.channels.push(value)
      // 添加持久化
      // 登录状态，axios请求提交
      if (this.user) {
        try {
          await addMyChannels({
            id: value.id, //频道id
            seq: this.channels.length, //序号
          })
        } catch (error) {
          this.$toast('添加频道失败，请稍后重试')
        }
      } else {
        // console.log(this.user)
        // 未登录状态，存储到本地
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },
    // 删除频道
    async removeChannel(value, index) {
      this.channels.splice(index, 1)
      // 登录状态
      if (this.user) {
        try {
          await delMyChannels(value.id)
        } catch (error) {
          this.$toast('删除频道失败，请稍后重试')
        }
      } else {
        // 未登录状态
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },
  },
  created() {
    this.getChannels()
  },
}
</script>

<style lang="less" scoped>
.channel-wrap {
  padding-top: 64px;
  position: relative;
  .btn-edit {
    position: absolute;
    right: 26px;
    top: 92px;
    width: 104px;
    height: 48px;
    line-height: 48px;
  }
  .title {
    padding-left: 20px;
    font-size: 32px;
  }
  ::v-deep .GridClass {
    .van-grid-item {
      .van-grid-item__content {
        border-radius: 8px;
        align-items: center;
        background-color: rgb(246, 246, 246);
        padding: 18px 0px;
        border: 2px solid rgb(246, 246, 246);
        .van-grid-item__icon-wrapper {
          font-size: 28px;
        }
        .text {
          font-size: 24px;
          line-height: unset;
          margin: 0 0 0 4px;
        }
      }
    }
    .active {
      .van-grid-item__content {
        border: 2px solid rgb(235, 14, 14);
        .text {
          color: rgb(235, 14, 14);
        }
      }
    }
    &.myGridClass {
      .van-grid-item__icon-wrapper {
        font-size: 32px;
        position: absolute;
        right: 8px;
        top: -14px;
      }
    }
  }
}
</style>
