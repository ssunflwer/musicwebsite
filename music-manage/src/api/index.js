import { get, post } from './request'

const HttpManager = {
  getLoginStatus: (params) => post(`admin/login/status`, params),
  getAllUser: () => get(`user`),
  getUserOfId: (id) => get(`user/detail?id=${id}`),
  setUser: (params) => post(`user/add`, params),
  updateUserMsg: (params) => post(`user/update`, params),
  deleteUser: (id) => get(`user/delete?id=${id}`),
  getCollectionOfUser: (userId) => get(`collection/detail?userId=${userId}`),
  deleteCollection: (userId, songId) => get(`/collection/delete?userId=${userId}&&songId=${songId}`),
  getCommentOfSongId: (songId) => get(`comment/song/detail?songId=${songId}`),
  getCommentOfSongListId: (songListId) => get(`comment/songList/detail?songListId=${songListId}`),
  updateCommentMsg: (params) => post(`comment/update`, params),
  deleteComment: (id) => get(`comment/delete?id=${id}`),
  getAllSinger: () => get(`singer`),
  setSinger: (params) => post(`singer/add`, params),
  updateSingerMsg: (params) => post(`singer/update`, params),
  deleteSinger: (id) => get(`singer/delete?id=${id}`),
  getAllSong: () => get(`song`),
  getSongOfSingerId: (id) => get(`song/singer/detail?singerId=${id}`),
  getSongOfId: (id) => get(`song/detail?id=${id}`),
  getSongOfSingerName: (id) => get(`song/singerName/detail?name=${id}`),
  updateSongMsg: (params) => post(`song/update`, params),
  deleteSong: (id) => get(`song/delete?id=${id}`),
  setSongList: (params) => post(`songList/add`, params),
  getSongList: () => get(`songList`),
  updateSongListMsg: (params) => post(`songList/update`, params),
  deleteSongList: (id) => get(`songList/delete?id=${id}`),
  setListSong: (params) => post(`ListSong/add`, params),
  getListSongOfSongId: (songListId) => get(`listSong/detail?songListId=${songListId}`),
  deleteListSong: (songId) => get(`ListSong/delete?songId=${songId}`)

}

export { HttpManager }
