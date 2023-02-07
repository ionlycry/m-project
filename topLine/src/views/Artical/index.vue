<template>
  <div class="artical-content">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="onClickLeft"
      :placeholder="true"
      :fixed="true" />
    <!-- 中间展示内容 -->
    <div class="artical-main-wrap">
      <!-- loading模块 -->
      <van-loading size="48px" vertical v-if="isLoading">加载中...</van-loading>
      <!-- 文章详情 -->
      <div class="artical-main" v-else-if="artical.title">
        <h2 class="title">{{ artical.title }}</h2>
        <!-- 头像，用户信息，关注按钮部分 -->
        <div class="artical-info">
          <van-image
            width="40"
            height="40"
            :src="artical.aut_photo"
            fit="cover"
            round
            class="img-wrap">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <div class="info-wrap">
            <p class="name">
              {{ artical.aut_name }}
            </p>
            <span class="time">{{ artical.pubdate | foramtetime }}</span>
          </div>
          <!-- 关注按钮 -->
          <FollowBtn
            class="follow-btn-wrap"
            v-model="artical.is_followed"
            :userId="artical.aut_id"></FollowBtn>
        </div>
        <!-- 文章正文部分 -->
        <div
          class="artical-context markdown-body"
          v-html="artical.content"
          ref="artContext"></div>

        <!-- 正文结束 -->
        <van-divider class="divider">正文结束</van-divider>

        <!-- 评论列表 -->
        <CommentList
          :sourceId="artical.art_id"
          type="a"
          ref="commentList"
          @showReplyPopup="showReplyPopupfn"
          @onLoadSuccess="commTotal = $event.total_count" />

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPopShow = true"
            >写评论</van-button
          >
          <van-icon
            name="comment-o"
            color="#777777"
            class="comment-icon"
            :badge="commTotal" />
          <CollectBtn
            :articalId="artical.art_id"
            v-model="artical.is_collected"
            class="icon-btn" />
          <LikeBtn
            :articalId="artical.art_id"
            v-model="artical.attitude"
            class="icon-btn" />
        </div>
        <!-- /底部区域 -->
        <!-- 回复弹出层 -->
        <van-popup v-model="isPopShow" position="bottom">
          <CommentPost
            :targetId="artical.art_id"
            @updatePop="isPopShow = false"
            @updateComment="updateCommentFn" />
        </van-popup>

        <!-- 子回复弹出层 -->
        <van-popup
          v-model="isPopReplyShow"
          position="bottom"
          round
          :style="{
            height: '93%',
          }">
          <CommentReply
            :comment="comment"
            :articalId="artical.art_id"
            @close="isPopReplyShow = false"
            v-if="isPopReplyShow"></CommentReply>
        </van-popup>
      </div>
      <!-- 错误提示 404 -->
      <!-- 通用错误 -->
      <van-empty
        image="error"
        description="找不到指定内容，错误提示404"
        v-else-if="errorId === 404" />

      <!-- 错误提示 网络，数据库引起的数据加载错误 -->
      <!-- 网络错误 -->
      <van-empty image="network" description="数据加载失败，请点击重试" v-else>
        <van-button plain hairline type="info" @click="loadArtical(article_id)"
          >点击重试</van-button
        >
      </van-empty>
    </div>
  </div>
</template>

<script>
import { getArtical } from '@/api/artical'
import { ImagePreview } from 'vant'

import FollowBtn from '@/components/FollowBtn'
import CollectBtn from '@/components/CollectBtn'
import LikeBtn from '@/components/LikeBtn'
import CommentPost from '@/views/Comment/CommentPost'
import CommentList from '../Comment/CommentList.vue'
import CommentReply from '../Comment/CommentReply.vue'
export default {
  name: 'ArticalIndex',
  components: {
    ImagePreview,
    FollowBtn,
    CollectBtn,
    LikeBtn,
    CommentPost,
    CommentList,
    CommentReply,
  },
  props: {
    // 文章id，从路由处获取
    article_id: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      artical: {}, //请求的文章数据
      isLoading: false, //状态加载
      errorId: 0, //错误代码commentList: [],
      isPopShow: false, //控制显示回复弹出层
      isPopReplyShow: false, //子列表回复评论的弹出层
      comment: {}, //子列表单个对象
      commTotal: 0, //评论总数
    }
  },
  methods: {
    // 点击左箭头按钮，返回
    onClickLeft() {
      this.$router.back()
    },
    async loadArtical(articleId) {
      this.isLoading = true
      try {
        const { data } = await getArtical(articleId)

        // // 模拟加载失败的代码
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsadsa')
        // }

        console.log(data)
        this.artical = data.data
        //this指向问题要用箭头函数，数据驱动视图，会有延迟性，要渲染出来，才能引用的ref的内容，所以加个异步延迟操作
        // setTimeout(() => {
        //   console.log(this.$refs['artContext'])
        // }, 0)
        setTimeout(() => {
          // 请求数据成功，添加图片预览函数
          this.imgFn()
        }, 0)
      } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 404) {
          this.errorId = 404
        }
      }
      // 无论成功，失败都关闭loading
      this.isLoading = false
    },
    // 图片预览
    imgFn() {
      //获取文章内容
      const content = this.$refs['artContext']
      // 获取图片节点
      const imgs = content.querySelectorAll('img')
      // 获取图片url
      const imgurl = []
      imgs.forEach((img, index) => {
        // 存入图片地址
        imgurl.push(img.src)
        // 添加点击事件
        img.addEventListener('click', () => {
          ImagePreview({
            images: imgurl,
            startPosition: index,
          })
        })
      })
    },
    // 写评论，更新评论视图
    updateCommentFn(obj) {
      this.$refs['commentList'].commentList.unshift(obj)
      this.commTotal++
    },
    showReplyPopupfn(obj) {
      this.isPopReplyShow = true
      this.comment = obj
    },
  },
  created() {
    this.loadArtical(this.article_id)
  },
}
</script>

<style scoped lang="less">
@import url('./github-markdown.css');
.artical-content {
  ::v-deep .van-nav-bar__content {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon-arrow-left {
      color: #fff;
    }
  }

  .artical-main-wrap {
    padding: 0px 34px 100px 34px;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    & > .van-loading {
      padding-top: 50px;
    }
    .artical-main {
      .title {
        font-size: 48px;
      }
      .artical-info {
        display: flex;
        padding-top: 10px;
        padding-bottom: 50px;
        .img-wrap {
          flex-shrink: 0; //不缩小
        }
        .info-wrap {
          flex-shrink: 1;
          width: 100%;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          .name {
            font-size: 24px;
            margin: 10px 0 0;
            padding: 0;
          }
          .time {
            font-size: 18px;
            margin: 0;
            color: rgb(119, 119, 119);
          }
        }
        // 关注按钮
        .follow-btn-wrap {
          flex-shrink: 0; //不缩小

          ::v-deep .follow-btn {
            height: 52px;
            width: 180px;
            font-size: 18px;
            color: #3296fa;
            border-color: #3296fa;
          }
          ::v-deep .followed {
            background-color: rgb(244, 87, 86);
            border-color: rgb(244, 87, 86);
            color: #fff;
          }
        }
      }

      // 分割线样式
      .divider {
        margin-top: 50px;
        margin-bottom: 30px;
      }
    }
  }

  .article-bottom {
    border-top: 1px solid #e5e5e5;
    background-color: #fff;
    height: 94px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .comment-btn {
      width: 320px;
    }
    .comment-icon {
      position: relative;
      top: 4px;
      font-size: 44px;
    }
    .icon-btn {
      ::v-deep .van-icon {
        font-size: 44px;
      }
    }
  }
}
</style>
