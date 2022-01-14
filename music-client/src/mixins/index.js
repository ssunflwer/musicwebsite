import { mapGetters } from 'vuex'
import { HttpManager } from '../api/index'

const mixin = {
  computed: {
    ...mapGetters([
      'userId',
      'loginIn'
    ])
  },
  methods: {
    // Thông tin nhanh chóng
    notify (title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    // Lấy thông tin hình ảnh
    attachImageUrl (srcUrl) {
      return srcUrl ? this.$store.state.configure.HOST + srcUrl || '../assets/img/user.jpg' : ''
    },
    attachBirth (val) {
      let birth = String(val).match(/[0-9-]+(?=\s)/)
      return Array.isArray(birth) ? birth[0] : birth
    },
    // Lấy phần cuối của tên
    replaceFName (str) {
      let arr = str.split('-')
      return arr[1]
    },
    // Lấy phần đầu của tên
    replaceLName (str) {
      let arr = str.split('-')
      return arr[0]
    },
    // PLAY
    toplay: function (id, url, pic, index, name, lyric) {
      this.$store.commit('setId', id)
      this.$store.commit('setListIndex', index)
      this.$store.commit('setUrl', this.$store.state.configure.HOST + url)
      this.$store.commit('setpicUrl', this.$store.state.configure.HOST + pic)
      this.$store.commit('setTitle', this.replaceFName(name))
      this.$store.commit('setArtist', this.replaceLName(name))
      this.$store.commit('setLyric', this.parseLyric(lyric))
      if (this.loginIn) {
        this.$store.commit('setIsActive', false)
        HttpManager.getCollectionOfUser(this.userId)
          .then(res => {
            for (let item of res) {
              if (item.songId === id) {
                this.$store.commit('setIsActive', true)
                break
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // Phân tích cú pháp lời bài hát
    parseLyric (text) {
      let lines = text.split('\n')
      let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g
      let result = []

      // Xử lý đặc biệt cho định dạng lời bài hát sai
      if (!(/\[.+\]/.test(text))) {
        return [[0, text]]
      }

      while (!pattern.test(lines[0])) {
        lines = lines.slice(1)
      }

      lines[lines.length - 1].length === 0 && lines.pop()
      for (let item of lines) {
        let time = item.match(pattern) // Lưu khoảng thời gian trước đó
        let value = item.replace(pattern, '') // Lưu lời bài hát
        for (let item1 of time) {
          let t = item1.slice(1, -1).split(':')
          if (value !== '') {
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
          }
        }
      }
      result.sort(function (a, b) {
        return a[0] - b[0]
      })
      return result
    },
    // Tìm kiếm nhạc
    getSong () {
      if (!this.$route.query.keywords) {
        this.$store.commit('setListOfSongs', [])
        return
      }
      HttpManager.getSongOfSingerName(this.$route.query.keywords)
        .then(res => {
          if (!res.length) {
            this.$store.commit('setListOfSongs', [])
            this.notify('Linh tinh quá, không có bài nào như zạy', 'warning')
          } else {
            this.$store.commit('setListOfSongs', res)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

export default mixin
