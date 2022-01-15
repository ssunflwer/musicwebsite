<template>
  <div class="upload">
    <p class="title">Sửa đổi hình đại diện</p>
    <hr/>
    <div class="section">
      <el-upload
        drag
        :action="uploadUrl()"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Kéo tệp vào đây, hoặc<em>đổi ảnh đại diện</em></div>
        <div class="el-upload__tip" slot="tip">Chỉ có thể tải lên các tệp jpg/png và không quá 10M</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins'
import { mapGetters } from 'vuex'

export default {
  name: 'upload',
  mixins: [mixin],
  data () {
    return {
      imageUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    uploadUrl () {
      return `${this.$store.state.configure.HOST}/user/avatar/update?id=${this.userId}`
    },
    handleAvatarSuccess (res, file) {
      if (res.code === 1) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.$store.commit('setAvator', res.avator)
        this.$message({
          message: 'Sửa đổi thành công gòi nha',
          type: 'success'
        })
      } else {
        this.notify('Có lỗi ở đoạn nàyyy', 'error')
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        this.$message.error('Ảnh hồ sơ đã tải lên chỉ có thể ở định dạng JPG!')
      }
      if (!isLt2M) {
        this.$message.error('Kích thước của ảnh đại diện tải lên không được vượt quá 10MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/upload.scss';
</style>
