<template>
  <div class="home">
    <el-carousel class="swiper-container" :interval="4000" type="card" height="280px">
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item.picImg"/>
      </el-carousel-item>
    </el-carousel>
    <!--Danh sách phát phổ biến-->
    <div class="section">
      <div class="section-title">Danh sách bài hát</div>
      <content-list :contentList="songList" path="song-list-album"></content-list>
    </div>
    <!--Ca sĩ nổi tiếng-->
    <div class="section">
      <div class="section-title">Ca sĩ</div>
      <content-list :contentList="singerList" path="singer-album"></content-list>
    </div>
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import { swiperList } from '../assets/data/swiper'
import { HttpManager } from '../api/index'

export default {
  name: 'home',
  components: {
    ContentList
  },
  data () {
    return {
      swiperList: swiperList, // Danh sách biểu đồ băng chuyền
      songList: [], // Danh sách phát
      singerList: [] // Danh sách ca sỹ
    }
  },
  created () {
    // Nhận danh sách phát
    this.getSongList()
    // Nhận danh sách ca sỹ
    this.getSingerList()
  },
  methods: {
    getSongList () {
      HttpManager.getSongList()
        .then(res => {
          this.songList = res.sort().slice(0, 10)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSingerList () {
      HttpManager.getAllSinger()
        .then(res => {
          this.singerList = res.sort().slice(0, 10)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>
