import { get, post } from './request'

const HttpManager = {
  loginIn: (params) => post(`user/login/status`, params),
  SignUp: (params) => post(`user/add`, params),
  updateUserMsg: (params) => post(`user/update`, params),
  getUserOfId: (id) => get(`user/detail?id=${id}`),
  getSongList: () => get('songList'),
  getSongListOfStyle: (style) => get(`songList/style/detail?style=${style}`),
  getSongListOfLikeTitle: (keywords) => get(`songList/likeTitle/detail?title=${keywords}`),
  getListSongOfSongId: (songListId) => get(`listSong/detail?songListId=${songListId}`),
  getAllSinger: () => get('singer'),
  getSingerOfSex: (sex) => get(`singer/sex/detail?sex=${sex}`),
  getCollectionOfUser: (userId) => get(`collection/detail?userId=${userId}`),
  setCollection: (params) => post(`collection/add`, params),
  setRank: (params) => post(`rank/add`, params),
  getRankOfSongListId: (songListId) => get(`rank?songListId=${songListId}`),
  setComment: (params) => post(`comment/add`, params),
  setLike: (params) => post(`comment/like`, params),
  getAllComment: (type, id) => {
    let url = ''
    if (type === 1) {
      url = `comment/songList/detail?songListId=${id}`
    } else if (type === 0) {
      url = `comment/song/detail?songId=${id}`
    }
    return get(url)
  },

  getSongOfId: (id) => get(`song/detail?id=${id}`),
  getSongOfSingerId: (id) => get(`song/singer/detail?singerId=${id}`),
  getSongOfSingerName: (keywords) => get(`song/singerName/detail?name=${keywords}`),
  downloadMusic: (url) => get(url, {}, 'blob')
}

export { HttpManager }
