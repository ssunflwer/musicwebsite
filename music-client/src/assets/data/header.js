// Thanh điều hướng bên trái
const navMsg = [{
  name: 'Trang Chủ',
  path: '/'
}, {
  name: 'Thể loại',
  path: '/song-list'
}, {
  name: 'Ca Sĩ',
  path: '/singer'
}, {
  name: 'Yêu thích',
  path: '/my-music'
}]

// Thanh điều hướng bên phải
const loginMsg = [{
  name: 'Đăng Nhập',
  path: '/login-in'
}, {
  name: 'Đăng Ký',
  path: '/sign-up'
}]

// Mục menu thả xuống của người dùng
const menuList = [{
  name: 'Cài đặt',
  path: '/setting'
}, {
  name: 'Đăng Xuất',
  path: 0
}]

export {
  navMsg,
  loginMsg,
  menuList
}
