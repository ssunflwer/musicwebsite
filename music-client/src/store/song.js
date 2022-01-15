import { BASE_URL } from '../api/config'
import { ICON } from '../assets/icon/index'

const song = {
  state: {
    isPlay: false, // Play
    playButtonUrl: ICON.BOFANG, // Biểu tượng trạng thái đang phát
    id: null, // ID Bài hát
    url: '', // URL Bài hát
    duration: 0, // Thời lượng âm nhạc
    curTime: 0, // Vị trí phát nhạc hiện tại
    changeTime: 0, // Chỉ định thời gian phát lại
    title: '', //  Tiêu đề
    artist: '', //  Ca sỹ
    picUrl: '', // URL ảnh
    autoNext: true, // Được sử dụng để kích hoạt tự động phát bản nhạc tiếp theo
    lyric: [], // Lời bài hát
    listOfSongs: [], // Danh sách bài hát
    tempList: {}, // Thông tin danh sách phát
    listIndex: null, // Vị trí của bài hát hiện tại trong danh sách bài hát
    volume: 50
  },
  getters: {
    isPlay: state => state.isPlay,
    playButtonUrl: state => {
      let playButtonUrl = state.playButtonUrl
      if (!playButtonUrl) {
        playButtonUrl = JSON.parse(window.sessionStorage.getItem('playButtonUrl') || null)
      }
      return playButtonUrl
    },
    id: state => {
      let id = state.id
      if (!id) {
        id = JSON.parse(window.sessionStorage.getItem('id') || null)
      }
      return id
    },
    url: state => {
      let url = state.url
      if (!url) {
        url = JSON.parse(window.sessionStorage.getItem('url') || null)
      }
      return url
    },
    duration: state => {
      let duration = state.duration
      if (!duration) {
        duration = JSON.parse(window.sessionStorage.getItem('duration') || 0)
      }
      return duration
    },
    curTime: state => {
      let curTime = state.curTime
      if (!curTime) {
        curTime = JSON.parse(window.sessionStorage.getItem('curTime') || 0)
      }
      return curTime
    },
    changeTime: state => {
      let changeTime = state.changeTime
      if (!changeTime) {
        changeTime = JSON.parse(window.sessionStorage.getItem('changeTime') || 0)
      }
      return changeTime
    },
    title: state => {
      let title = state.title
      if (!title) {
        title = JSON.parse(window.sessionStorage.getItem('title') || null)
      }
      return title
    },
    artist: state => {
      let artist = state.artist
      if (!artist) {
        artist = JSON.parse(window.sessionStorage.getItem('artist') || null)
      }
      return artist
    },
    picUrl: state => {
      let picUrl = state.picUrl
      if (!picUrl) {
        picUrl = JSON.parse(window.sessionStorage.getItem('picUrl')) || `${BASE_URL}/img/songPic/tubiao.jpg`
      }
      return picUrl
    },
    autoNext: state => {
      let autoNext = state.autoNext
      if (!autoNext) {
        autoNext = JSON.parse(window.sessionStorage.getItem('autoNext') || null)
      }
      return autoNext
    },
    lyric: state => {
      let lyric = state.lyric
      if (lyric.length === 0) {
        lyric = JSON.parse(window.sessionStorage.getItem('lyric') || null)
      }
      return lyric
    },
    tempList: state => {
      let tempList = state.tempList
      if (JSON.stringify(tempList) === '{}') {
        tempList = JSON.parse(window.sessionStorage.getItem('tempList') || null)
      }
      return tempList
    },
    listOfSongs: state => {
      let listOfSongs = state.listOfSongs
      if (!listOfSongs.length) {
        listOfSongs = JSON.parse(window.sessionStorage.getItem('listOfSongs') || null)
      }
      return listOfSongs
    },
    listIndex: state => {
      let listIndex = state.listIndex
      if (!listIndex) {
        listIndex = JSON.parse(window.sessionStorage.getItem('listIndex') || null)
      }
      return listIndex
    },
    volume: state => {
      let volume = state.volume
      if (!volume) {
        volume = JSON.parse(window.sessionStorage.getItem('volume') || null)
      }
      return volume
    }
  },
  mutations: {
    setIsPlay: (state, isPlay) => {
      state.isPlay = isPlay
      window.sessionStorage.setItem('isPlay', JSON.stringify(isPlay))
    },
    setPlayButtonUrl: (state, playButtonUrl) => {
      state.playButtonUrl = playButtonUrl
      window.sessionStorage.setItem('playButtonUrl', JSON.stringify(playButtonUrl))
    },
    setId: (state, id) => {
      state.id = id
      window.sessionStorage.setItem('id', JSON.stringify(id))
    },
    setUrl: (state, url) => {
      state.url = url
      window.sessionStorage.setItem('url', JSON.stringify(url))
    },
    setDuration: (state, duration) => {
      state.duration = duration
      window.sessionStorage.setItem('duration', JSON.stringify(duration))
    },
    setCurTime: (state, curTime) => {
      state.curTime = curTime
      window.sessionStorage.setItem('curTime', JSON.stringify(curTime))
    },
    setChangeTime: (state, changeTime) => {
      state.changeTime = changeTime
      window.sessionStorage.setItem('changeTime', JSON.stringify(changeTime))
    },
    setTitle: (state, title) => {
      state.title = title
      window.sessionStorage.setItem('title', JSON.stringify(title))
    },
    setArtist: (state, artist) => {
      state.artist = artist
      window.sessionStorage.setItem('artist', JSON.stringify(artist))
    },
    setpicUrl: (state, picUrl) => {
      state.picUrl = picUrl
      window.sessionStorage.setItem('picUrl', JSON.stringify(picUrl))
    },
    setAutoNext: (state, autoNext) => {
      state.autoNext = autoNext
      window.sessionStorage.setItem('autoNext', JSON.stringify(autoNext))
    },
    setLyric: (state, lyric) => {
      state.lyric = lyric
      window.sessionStorage.setItem('lyric', JSON.stringify(lyric))
    },
    setTempList: (state, tempList) => {
      state.tempList = tempList
      window.sessionStorage.setItem('tempList', JSON.stringify(tempList))
    },
    setListOfSongs: (state, listOfSongs) => {
      state.listOfSongs = listOfSongs
      window.sessionStorage.setItem('listOfSongs', JSON.stringify(listOfSongs))
    },
    setListIndex: (state, listIndex) => {
      state.listIndex = listIndex
      window.sessionStorage.setItem('listIndex', JSON.stringify(listIndex))
    },
    setVolume: (state, volume) => {
      state.volume = volume
      window.sessionStorage.setItem('volume', JSON.stringify(volume))
    }
  },
  actions: {}
}

export default song
