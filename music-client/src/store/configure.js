import { BASE_URL } from '../api/config'

const configure = {
  state: {
    HOST: BASE_URL,
    loginIn: false, // Người dùng đã đăng nhập
    searchword: '', // Tìm từ khóa
    showAside: false, // Hiển thị thanh bên
    activeName: '', // Tên loại danh sách phát
    index: 0, // Số thứ tự trong danh sách
    isActive: false
  },
  getters: {
    isActive: state => {
      let isActive = state.isActive
      if (!isActive) {
        isActive = JSON.parse(window.sessionStorage.getItem('isActive') || null)
      }
      return isActive
    },
    loginIn: state => {
      let loginIn = state.loginIn
      if (!loginIn) {
        loginIn = JSON.parse(window.sessionStorage.getItem('loginIn') || null)
      }
      return loginIn
    },
    activeName: state => {
      let activeName = state.activeName
      if (!activeName) {
        activeName = JSON.parse(window.sessionStorage.getItem('activeName') || null)
      }
      return activeName
    },
    showAside: state => {
      let showAside = state.showAside
      if (!showAside) {
        showAside = JSON.parse(window.sessionStorage.getItem('showAside') || null)
      }
      return showAside
    },
    index: state => {
      let index = state.index
      if (!index) {
        index = JSON.parse(window.sessionStorage.getItem('index') || null)
      }
      return index
    },
    searchword: state => state.searchword
  },
  mutations: {
    setIsActive: (state, isActive) => {
      state.isActive = isActive
      window.sessionStorage.setItem('isActive', JSON.stringify(isActive))
    },
    setLoginIn: (state, loginIn) => {
      state.loginIn = loginIn
      window.sessionStorage.setItem('loginIn', JSON.stringify(loginIn))
    },
    setActiveName: (state, activeName) => {
      state.activeName = activeName
      window.sessionStorage.setItem('activeName', JSON.stringify(activeName))
    },
    setShowAside: (state, showAside) => {
      state.showAside = showAside
      window.sessionStorage.setItem('showAside', JSON.stringify(showAside))
    },
    setIndex: (state, index) => { state.index = index },
    setSearchword: (state, searchword) => { state.searchword = searchword }
  },
  actions: {}
}

export default configure
