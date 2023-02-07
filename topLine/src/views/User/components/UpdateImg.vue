<template>
  <div class="edit-img-wrap">
    <img :src="userImg" ref="img" />
    <div class="tool-bar">
      <div class="btn" @click="$emit('close')">取消</div>
      <div class="btn" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import { editPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import dayjs from 'dayjs'
export default {
  props: {
    userImg: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    }
  },
  methods: {
    onConfirm() {
      const photoFile = this.cropper.getCroppedCanvas().toBlob((blob) => {
        // 普通js对象 application/json
        // editPhoto(blob)
        // multipart/form-data 必须传FormData对象
        this.updateUserPhoto(blob)
      })
    },

    async updateUserPhoto(blob) {
      this.$toast.loading({
        message: '保存中...',
        duration: 0,
        forbidClick: true,
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)

        const { data } = await editPhoto(formData)
        console.log('上传图片', data)
        // 关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('updatePhoto', data.data.photo)
        this.$toast.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    // 初始化图片裁剪，要在dom挂载完进行
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1, //自动截取区域
      cropBoxMovable: false, //裁剪框是否移动
      cropBoxResizable: false, //裁剪框是否可以缩放
      background: false,
      movable: true,
    })
  },
}
</script>

<style lang="less" scoped>
.edit-img-wrap {
  height: 100%;
  background-color: #000;
  .portrait {
    display: block;
    max-width: 100%;
  }
  .tool-bar {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .btn {
      width: 160px;
      height: 90px;
      text-align: center;
      color: #fff;
      font-size: 38px;
    }
  }
}
</style>
