<template>
  <div class="song-audio">
    <audio :src='url' controls="controls" ref="player" preload="true" @canplay="startPlay" @timeupdate="timeupdate" @ended="ended">
    </audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'song-audio',
  computed: {
    ...mapGetters([
      'id', // Id nhạc
      'url', // URL nhạc
      'listOfSongs', // Nhạc được lưu trữ
      'isPlay', // Trạng thái play
      'volume', // Âm lượng
      'curTime', // Vị trí phát lại nhạc hiện tại
      'changeTime', // Chỉ định thời gian phát lại
      'autoNext' // Được sử dụng để kích hoạt phát lại tự động bài hát tiếp theo
    ])
  },
  watch: {
    // Theo dõi phát hoặc tạm dừng
    isPlay () {
      this.togglePlay()
    },
    // Bỏ qua thời gian quy định để play
    changeTime () {
      let player = this.$refs.player
      player.currentTime = this.changeTime
    },
    volume (val) {
      this.$refs.player.volume = val
    }
  },
  methods: {






    // Bắt đầu tạm dừng
    togglePlay () {
      let player = this.$refs.player
      if (this.isPlay) {
        player.play()
      } else {
        player.pause()
      }
    },
    // Lấy liên kết bài hát và chuẩn bị play
    startPlay () {
      let player = this.$refs.player
      //  Ghi lại thời gian âm nhạc
      this.$store.commit('setDuration', player.duration)
      //  Play
      player.play()
      this.$store.commit('setIsPlay', true)
    },
    // Ghi lại vị trí phát lại của nhạc trong khi phát lại nhạc
    timeupdate () {
      let player = this.$refs.player
      this.$store.commit('setCurTime', player.currentTime)
    },
    // Được kích hoạt khi kết thúc phát lại nhạc
    ended () {
      this.$store.commit('setIsPlay', false)
      this.$store.commit('setCurTime', 0)
      this.$store.commit('setAutoNext', !this.autoNext)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/song-audio.scss';
</style>
