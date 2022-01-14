export const mixin = {
  methods: {
    // Thông tin nhanh chóng
    notify (title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    getUrl (url) {
      return `${this.$store.state.HOST}/${url}`
    },
    // Lấy id của danh sách sẽ bị xóa
    handleDelete (id) {
      this.idx = id
      this.delVisible = true
    },
    // Nhận danh sách được xóa hàng loạt
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // Xóa hàng loạt
    delAll () {
      for (let item of this.multipleSelection) {
        this.handleDelete(item.id)
        this.deleteRow(item.id)
      }
      this.multipleSelection = []
    },
    // Lấy tên bài hát
    replaceFName (str) {
      let arr = str.split('-')
      return arr[1]
    },
    // Lấy tên ca sĩ
    replaceLName (str) {
      let arr = str.split('-')
      return arr[0]
    },
    attachBirth (val) {
      let birth = String(val).match(/[0-9-]+(?=\s)/)
      return Array.isArray(birth) ? birth[0] : birth
    },
    changeSex (value) {
      if (value === 0) {
        return 'Nữ'
      } else if (value === 1) {
        return 'Nam'
      } else if (value === 2) {
        return 'Giới tính khác'
      } else if (value === 3) {
        return 'Không xác định'
      } else if (value === 'Nam' || value === 'Nữ') {
        return value
      }
    },
    toggleSex (value) {
      if (value === 'Nữ') {
        return 0
      } else if (value === 'Nam') {
        return 1
      }
    },
    // Cập nhật hình ảnh
    handleAvatarSuccess (res, file) {
      let _this = this
      if (res.code === 1) {
        _this.imageUrl = URL.createObjectURL(file.raw)
        _this.getData()
        _this.$notify({
          title: 'Thành công',
          type: 'success'
        })
      } else {
        _this.$notify({
          title: 'Thất bại',
          type: 'error'
        })
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('Ảnh hồ sơ đã tải lên chỉ có thể ở định dạng JPG!')
      }
      if (!isLt2M) {
        this.$message.error('Kích thước của ảnh đại diện tải lên không được vượt quá 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
