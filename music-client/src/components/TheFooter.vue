<template>
  <div class="the-footer">
    <p v-for="(item, index) in footerList" :key="index">
      {{item}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'the-footer',
  data () {
    return {
      footerList: [
        `Giới thiệu | Trợ giúp | Điều khoản | Phản hồi`,
        `Copyright © 1781310112 Vu Thi Thanh Binh`
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/the-footer.scss';
</style>
