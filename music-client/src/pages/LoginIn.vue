<template>
<div class="login-in">
  <login-logo/>
  <div class="login">
    <div class="login-head">
      <span>Đăng nhập tài khoản</span>
    </div>
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm" >
      <el-form-item prop="username">
        <el-input placeholder="Tên tài khoản" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="Mật khẩu" v-model="loginForm.password" @keyup.enter.native="loginIn"></el-input>
      </el-form-item>
      <div class="login-btn">
        <el-button @click="goSignUp">Đăng ký</el-button>
        <el-button type="primary" @click="handleleLoginIn">Đăng nhập</el-button>
      </div>

    </el-form>
  </div>
  <div><div id="login-btn-gg"></div></div>
</div>
</template>

<script>
import mixin from '../mixins'
import LoginLogo from '../components/LoginLogo'
import { HttpManager } from '../api/index'

export default {
  name: 'login-in',
  mixins: [mixin],
  components: {
    LoginLogo
  },
  data: function () {
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Tên ngươi dung không được để trống đâu nha'))
      } else {
        callback()
      }
    }
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Xin zui lòng điền mật khẩu dùm'))
      } else {
        callback()
      }
    }
    return {
      loginForm: { // Đăng nhập tên ng dùng và mật khẩu
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateName, message: 'Vui lòng nhập tên người dùng ha', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, message: 'Nhập mật khẩu nữa chứ', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.changeIndex('Đăng nhập')
  },
  methods: {
    changeIndex (value) {
      this.$store.commit('setActiveName', value)
    },
    handleleLoginIn () {
      let _this = this
      let params = new URLSearchParams()
      params.append('username', this.loginForm.username)
      params.append('password', this.loginForm.password)
      HttpManager.loginIn(params)
        .then(res => {
          // console.log('-----------Lấy thông tin đăng nhập---------------')
          if (res.code === 1) {
            _this.$message({
              message: 'Okay được rồi đấy',
              type: 'success'
            })
            _this.setUserMsg(res.userMsg[0])
            _this.$store.commit('setLoginIn', true)
            setTimeout(function () {
              _this.changeIndex('trang đầu')
              _this.$router.push({path: '/'})
              _this.$router.go(0)
            }, 2000)
          } else {
            _this.notify('Sai cái gì rồi nha', 'error')
          }
        })
        .catch(failResponse => {})
    },
    setUserMsg (item) {
      this.$store.commit('setUserId', item.id)
      this.$store.commit('setUsername', item.username)
      this.$store.commit('setAvator', item.avator)
    },
    goSignUp () {
      this.$router.push({path: '/sign-up'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/login-in.scss';
</style>
