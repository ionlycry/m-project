<template>
  <div>
    <van-cell :to="{ name: 'artical', params: { article_id: artical.art_id } }">
      <template #title>
        <span
          class="custom-title van-multi-ellipsis--l2"
          :class="{ largeTitle: artical.cover.type === 1 }"
          >{{ artical.title }}</span
        >
      </template>
      <template #default v-if="artical.cover.type === 1" class="right-img">
        <van-image fit="cover" :src="artical.cover.images[0]" />
      </template>
      <template #label>
        <!-- <div class="img-wrap" v-if="artical.cover.type === 3">
          <van-image fit="cover" v-for="(imgurl,index) in artical.cover.images" :key="index" :src="imgurl" />
        </div> -->
        <van-grid
          :column-num="3"
          :border="false"
          gutter="10"
          v-if="artical.cover.type === 3">
          <van-grid-item
            v-for="(imgurl, index) in artical.cover.images"
            :key="index">
            <van-image :src="imgurl" fit="cover" />
          </van-grid-item>
        </van-grid>
        <p class="text">
          <span>{{ artical.aut_name }}</span
          ><span>{{ artical.comm_count }} 评论</span
          ><span>{{ artical.pubdate | foramtetime }}</span>
        </p>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['artical'],
}
</script>

<style lang="less" scoped>
.van-cell__value {
  width: 234px;
  height: 146px;
  flex: unset;
}
.right-img {
  .van-image {
    width: 234px;
    height: 146px;
  }
}

::v-deep .van-grid-item {
  .van-grid-item__content {
    padding: 0px;
    .van-image {
      width: 100%;
      height: 100%;
    }
  }
}

.custom-title {
  font-size: 32px;
}
.largeTitle {
  height: 72px;
  line-height: 72px;
}
.img-wrap {
  display: flex;
  justify-content: space-between;
  height: 146px;
}
.text {
  span {
    margin-right: 25px;
    font-size: 20px;
  }
}
</style>
