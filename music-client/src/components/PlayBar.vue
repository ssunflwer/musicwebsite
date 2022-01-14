<template>
  <div class="play-bar" :class="{show:!toggle}">
    <div @click="toggle=!toggle" class="item-up" :class="{turn: toggle}">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="ZHEDIE"></use>
      </svg>
    </div>
    <div class="kongjian" >
      <!--Bài hát trước-->
      <div class="item" @click="prev">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="SHANGYISHOU"></use>
        </svg>
      </div>
      <!--Play-->
      <div class="item" @click="togglePlay">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="playButtonUrl"></use>
        </svg>
      </div>
      <!--Bài hát tiếp theo-->
      <div class="item" @click="next">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="XIAYISHOU"></use>
        </svg>
      </div>
      <!--Hình ảnh bài hát-->
      <div class="item-img" @click="goPlayerPage">
         <img :src=picUrl alt="">
      </div>
      <!--Tiến trình phát lại-->
      <div class="playing-speed">
        <!--Thời gian bắt đầu play-->
        <div class="current-time">{{ nowTime }}</div>
        <div class="progress-box">
          <div class="item-song-title">
            <div>{{this.title}}</div>
            <div>{{this.artist}}</div>
          </div>
          <div ref="progress" class="progress" @mousemove="mousemove">
            <!--Thanh tiến trình-->
            <div ref="bg" class="bg" @click="updatemove">
              <div ref="curProgress" class="cur-progress" :style="{width: curLength+'%'}"></div>
            </div>
            <!--Thanh tiến trình end -->
            <!--Kéo điểm-->
            <div ref="idot" class="idot" :style="{left: curLength+'%'}" @mousedown="mousedown" @mouseup="mouseup"></div>
            <!--Kéo điểm kết thúc -->
          </div>
        </div>
        <!--Thời gian kết thúc chơi-->
        <div class="left-time">{{ songTime }}</div>
      </div>
      <!--Âm lượng-->
      <div class="item icon-volume" >
        <svg v-if="volume !== 0" class="icon" aria-hidden="true">
          <use :xlink:href="YINLIANG"></use>
        </svg>
        <svg v-else class="icon" aria-hidden="true">
          <use :xlink:href="JINGYIN"></use>
        </svg>
        <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
      </div>
      <!--Thêm vào-->
      <div class="item" @click="collection">
        <svg :class="{ active: isActive }" class="icon" aria-hidden="true">
          <use :xlink:href="XIHUAN"></use>
        </svg>
      </div>
      <!--Tải xuống-->
      <div class="item" @click="downloadMusic">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="XIAZAI"></use>
        </svg>
      </div>
      <!--Danh sách bài hát-->
      <div class="item" @click="changeAside">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="LIEBIAO"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins'
import { mapGetters } from 'vuex'
import { HttpManager } from '../api/index'
import { ICON } from '../assets/icon/index'

export default {
  name: 'play-bar',
  mixins: [mixin],
  data () {
    return {
      tag: false,
      nowTime: '00:00',
      songTime: '00:00',
      curLength: 0, // Vị trí của thanh tiến trình
      progressLength: 0, // Chiều dài của thanh tiến trình
      mouseStartX: 0, // Kéo vị trí bắt đầu
      toggle: true,
      volume: 50,
      XIAZAI: ICON.XIAZAI,
      ZHEDIE: ICON.ZHEDIE,
      SHANGYISHOU: ICON.SHANGYISHOU,
      XIAYISHOU: ICON.XIAYISHOU,
      YINLIANG: ICON.YINLIANG1,
      JINGYIN: ICON.JINGYIN,
      LIEBIAO: ICON.LIEBIAO,
      XIHUAN: ICON.XIHUAN
    }
  },
  computed: {
    ...mapGetters([
      'loginIn', // Trạng thái đăng nhập của người dùng
      'userId', // Tên người dùng
      'isPlay', // Trạng thái play
      'playButtonUrl', // Biểu tượng trạng thái play
      'id', // Id nhạc
      'url', // Url nhạc
      'title', // Tên bài hát
      'artist', // Tên ca sĩ
      'picUrl', // Hình ảnh bài hát
      'curTime', // Vị trí phát lại nhạc hiện tại
      'duration', // Thời lượng âm nhạc
      'listOfSongs', // Danh sách danh sách phát hiện tại
      'listIndex', // Vị trí của bài hát hiện tại trong danh sách bài hát
      'showAside', // Có hiển thị thanh bên hay không
      'autoNext', // Được sử dụng để kích hoạt phát lại tự động bài hát tiếp theo
      'isActive'
    ])
  },
  watch: {
    // Biểu tượng để chuyển trạng thái phát lại
    isPlay (val) {
      if (val) {
        this.$store.commit('setPlayButtonUrl', ICON.ZANTING)
      } else {
        this.$store.commit('setPlayButtonUrl', ICON.BOFANG)
      }
    },
    volume () {
      this.$store.commit('setVolume', this.volume / 100)
    },
    // Bắt đầu và kết thúc thời gian chơi
    curTime () {
      this.nowTime = this.formatSeconds(this.curTime)
      this.songTime = this.formatSeconds(this.duration)
      // Thanh tiến trình di động
      this.curLength = (this.curTime / this.duration) * 100
      // Xử lý vị trí và màu sắc của lời bài hát
    },
    // Tự động phát bài hát tiếp theo
    autoNext () {
      this.next()
    }
  },
  mounted () {
    this.progressLength = this.$refs.progress.getBoundingClientRect().width
    document.querySelector('.icon-volume').addEventListener('click', function (e) {
      document.querySelector('.volume').classList.add('show-volume')
      e.stopPropagation()
    }, false)
    document.querySelector('.volume').addEventListener('click', function (e) {
      e.stopPropagation()
    }, false)
    document.addEventListener('click', function () {
      document.querySelector('.volume').classList.remove('show-volume')
    }, false)
  },
  methods: {
    // Tải xuống
    downloadMusic () {
      HttpManager.downloadMusic(this.url)
        .then(res => {
          let content = res.data
          let eleLink = document.createElement('a')
          eleLink.download = `${this.artist}-${this.title}.mp3`
          eleLink.style.display = 'none'
          // Nội dung nhân vật được chuyển đổi thành địa chỉ blob
          let blob = new Blob([content])
          eleLink.href = URL.createObjectURL(blob)
          // Kích hoạt nhấp chuột
          document.body.appendChild(eleLink)
          eleLink.click()
          // Sau đó loại bỏ
          document.body.removeChild(eleLink)
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeAside () {
      let temp = !this.showAside
      this.$store.commit('setShowAside', temp)
    },
    // Kiểm soát phát / tạm dừng nhạc
    togglePlay () {
      if (this.isPlay) {
        this.$store.commit('setIsPlay', false)
      } else {
        this.$store.commit('setIsPlay', true)
      }
    },
    // Phân tích thời gian phát lại
    formatSeconds (value) {
      let theTime = parseInt(value)
      let theTime1 = 0
      let theTime2 = 0
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60) // Phút
        theTime = parseInt(theTime % 60) // Giây
        // Có phải hơn một giờ không
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60) // Giờ
          theTime1 = 60 // Phút
        }
      }
      // Bao nhiêu giây
      if (parseInt(theTime) < 10) {
        var result = '0:0' + parseInt(theTime)
      } else {
        result = '0:' + parseInt(theTime)
      }
      // Bao nhiêu phút
      if (theTime1 > 0) {
        if (parseInt(theTime) < 10) {
          result = '0' + parseInt(theTime)
        } else {
          result = parseInt(theTime)
        }
        result = parseInt(theTime1) + ':' + result
      }
      // Có bao nhiêu giờ
      if (theTime2 > 0) {
        if (parseInt(theTime) < 10) {
          result = '0' + parseInt(theTime)
        } else {
          result = parseInt(theTime)
        }
        result = parseInt(theTime2) + ':' + parseInt(theTime1) + ':' + result
      }
      return result
    },
    // Kéo bắt đầu
    mousedown (e) {
      this.mouseStartX = e.clientX
      this.tag = true
    },
    // Kéo để kết thúc
    mouseup () {
      this.tag = false
    },
    // Kéo
    mousemove (e) {
      if (!this.duration) {
        return false
      }
      if (this.tag) {
        let movementX = e.clientX - this.mouseStartX
        let curLength = this.$refs.curProgress.getBoundingClientRect().width
        //  Tính phần trăm
        this.progressLength = this.$refs.progress.getBoundingClientRect().width
        let newPercent = ((curLength + movementX) / this.progressLength) * 100
        if (newPercent > 100) {
          newPercent = 100
        }
        this.curLength = newPercent
        this.mouseStartX = e.clientX
        // Giới thiệu thời gian phát lại tương ứng theo tỷ lệ phần trăm
        this.changeTime(newPercent)
      }
    },
    // Thay đổi tiến trình bài hát
    changeTime (percent) {
      let newCurTime = this.duration * (percent * 0.01)
      this.$store.commit('setChangeTime', newCurTime)
    },
    updatemove (e) {
      if (!this.tag) {
        let curLength = this.$refs.bg.offsetLeft
        this.progressLength = this.$refs.progress.getBoundingClientRect().width
        let newPercent = ((e.clientX - curLength) / this.progressLength) * 100
        if (newPercent < 0) {
          newPercent = 0
        } else if (newPercent > 100) {
          newPercent = 100
        }
        this.curLength = newPercent
        this.changeTime(newPercent)
      }
    },
    // Bài hát trước
    prev () {
      if (this.listIndex !== -1 && this.listOfSongs.length > 1) {
        if (this.listIndex > 0) {
          this.$store.commit('setListIndex', this.listIndex - 1)
          this.toPlay(this.listOfSongs[this.listIndex].url)
        } else {
          this.$store.commit('setListIndex', this.listOfSongs.length - 1)
          this.toPlay(this.listOfSongs[this.listIndex].url)
        }
      }
    },
    // Bài hát tiếp theo
    next () {
      if (this.listIndex !== -1 && this.listOfSongs.length > 1) {
        console.log('this.listIndex')
        if (this.listIndex < this.listOfSongs.length - 1) {
          this.$store.commit('setListIndex', this.listIndex + 1)
          this.toPlay(this.listOfSongs[this.listIndex].url)
        } else {
          this.$store.commit('setListIndex', 0)
          this.toPlay(this.listOfSongs[0].url)
        }
      }
    },
    // Chọn để play
    toPlay (url) {
      if (url && url !== this.url) {
        this.$store.commit('setId', this.listOfSongs[this.listIndex].id)
        this.$store.commit('setUrl', this.$store.state.configure.HOST + url)
        this.$store.commit('setpicUrl', this.$store.state.configure.HOST + this.listOfSongs[this.listIndex].pic)
        this.$store.commit('setTitle', this.replaceFName(this.listOfSongs[this.listIndex].name))
        this.$store.commit('setArtist', this.replaceLName(this.listOfSongs[this.listIndex].name))
        this.$store.commit('setLyric', this.parseLyric(this.listOfSongs[this.listIndex].lyric))
      }
    },
    goPlayerPage () {
      this.$router.push({path: `/lyric/${this.id}`})
    },
    collection () {
      if (this.loginIn) {
        var params = new URLSearchParams()
        params.append('userId', this.userId)
        params.append('type', 0) // 0 có nghĩa là bài hát, 1 có nghĩa là danh sách phát
        params.append('songId', this.id)
        HttpManager.setCollection(params)
          .then(res => {

            // if (res.code === 1) {
              this.$store.commit('setIsActive', true)
              if(res.code === 2)
                this.$store.commit('setIsActive', false)
              this.notify('Thành công haa', 'success')
            // } else if (res.code === 2) {
              // this.$store.commit('setIsActive', false)
              // this.notify('Đã có rồi mà', 'warning')
            // } else {
              // this.$notify.error({
              //   title: 'Khum thành công',
              //   showClose: false
              // })
            // }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.notify('Đã đăng nhập đâu má', 'warning')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/play-bar.scss';
</style>
