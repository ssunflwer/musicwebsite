<template>
  <div class="song-audio">
    <audio
      id="player"
      controls="controls"
      preload="true"
      :src="url"
      @canplay="startPlay"
      @ended="ended"
    ></audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'song-audio',
  computed: {
    ...mapGetters([
      'id', // Id nhạc
      'url', // Liên kết âm nhạc
      'isPlay' // Trạng thái
    ])
  },
  watch: {
    // Theo dõi phát hoặc tạm dừng
    isPlay: function () {
      this.togglePlay()
    }
  },
  methods: {
    // Bắt đầu tạm dừng
    togglePlay () {
      let player = document.querySelector('#player')
      if (this.isPlay) {
        player.play()
      } else {
        player.pause()
      }
    },
    // Lấy liên kết bài hát và chuẩn bị play
    startPlay () {
      let player = document.querySelector('#player')
      //  play
      player.play()
    },
    // Được kích hoạt khi kết thúc phát lại nhạc
    ended () {
      this.isPlay = false
    }
  }
}
</script>

<style>
#player {
  display: none;
}
</style>
