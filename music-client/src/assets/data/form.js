// RULES
const rules = {
  username: [
    { required: true, trigger: 'blur' }
  ],
  password: [
    { required: true, trigger: 'blur' }
  ],
  sex: [
    { required: true, message: 'Zui lòng chọn giới tính', trigger: 'change' }
  ],
  phoneNum: [
    { essage: 'Zui lòng chọn một ngày', trigger: 'blur' }
  ],
  email: [
    { message: 'Nhập địa chỉ email ikkk', trigger: 'blur' },
    { type: 'email', message: 'Vui lòng nhập địa chỉ email chính xác', trigger: ['blur', 'change'] }
  ],
  birth: [
    { required: true, type: 'date', message: 'Chọn ngày sinhh', trigger: 'change' }
  ],
  introduction: [
    { message: 'Vui lòng nhập phần giới thiệu', trigger: 'blur' }
  ],
  location: [
    { message: 'Vui lòng nhập một khu vực', trigger: 'change' }
  ]
}

// Lựa chọn khu vực
const cities = [{
  value: 'Hà Nội',
  label: 'Hà Nội'
}, {
  value: 'Hải Dương',
  label: 'Hải Dương'
}, {
  value: 'Sa Pa',
  label: 'Sa Pa'
}, {
  value: 'Đà Nẵng',
  label: 'Đà Nẵng'
}, {
  value: 'Phú Quốc',
  label: 'Phú Quốc'
}, {
  value: 'Cô Tô',
  label: 'Cô Tô'
}, {
  value: 'Cát Bà',
  label: 'Cát Bà'
}, {
  value: 'Nha Trang',
  label: 'Nha Trang'
}, {
  value: 'Sài Gòn',
  label: 'Sài Gòn'
}, {
  value: 'Hải Phòng',
  label: 'Hải Phòng'
}, {
  value: 'Ninh Bình',
  label: 'Ninh Bình'
}, {
  value: 'Hà Nam',
  label: 'Hà Nam'
}, {
  value: 'Hội An',
  label: 'Hội An'
}, {
  value: 'Vĩnh Phúc',
  label: 'Vĩnh Phúc'
}, {
  value: 'Yến Bái',
  label: 'Yến Bái'
}, {
  value: 'Điện Biên Phủ',
  label: 'Điện Biên Phủ'
}, {
  value: 'Mộc Châu',
  label: 'Mộc Châu'
}, {
  value: 'Đà Lạt',
  label: 'Đà Lạt'
}, {
  value: 'Nghệ An',
  label: 'Nghệ An'
}, {
  value: 'Hà Tĩnh',
  label: 'Hà Tĩnh'
}, {
  value: 'Thanh Hóa',
  label: 'Thanh Hóa'
}, {
  value: 'Mê Linh',
  label: 'Mê Linh'
}, {
  value: 'Sóc Sơn',
  label: 'Sóc Sơn'
}, {
  value: 'Buôn Mê',
  label: 'Buôn Mê'
}, {
  value: 'Trà vinh',
  label: 'Trà vinh'
}, {
  value: 'Huế',
  label: 'Huế'
}, {
  value: 'Quảng Nam',
  label: 'Quảng Nam'
}, {
  value: 'Quảng Ngãi',
  label: 'Quảng Ngãi'
}, {
  value: 'Hồ Chí Minh',
  label: 'Hồ Chí Minh'
}, {
  value: 'Quảng Ninh',
  label: 'Quảng Ninh'
}, {
  value: 'Bình Định',
  label: 'Bình Định'
}, {
  value: 'Khánh Hòa',
  label: 'Khánh Hòa'
}]

export {
  rules,
  cities
}
