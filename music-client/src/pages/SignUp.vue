<template>
<div class="signUp-page">
  <loginLogo/>
  <div class="signUp">
    <div class="signUp-head">
      <span>Đăng ký người dùng</span>
    </div>
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="70px" class="demo-ruleForm">
      <el-form-item prop="username" label="Tên tk">
        <el-input v-model="registerForm.username" placeholder="Tên tài khoản"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="Mkhẩu">
        <el-input type="password" placeholder="Mật khẩu" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="sex" label="Gtính">
        <el-radio-group v-model="registerForm.sex">
          <el-radio :label="0">Nữ</el-radio>
          <el-radio :label="1">Nam</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="phoneNum" label="SĐT" >
        <el-input  placeholder="Số điện thoại" v-model="registerForm.phoneNum"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="Email">
        <el-input v-model="registerForm.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item prop="birth" label="Nsinh">
        <el-date-picker type="date" placeholder="Ngày sinh" v-model="registerForm.birth" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item prop="introduction" label="Gthiệu">
        <el-input  type="textarea" placeholder="Mô tả bản thân" v-model="registerForm.introduction" ></el-input>
      </el-form-item>
      <el-form-item prop="location" label="Khu vực">
        <el-select v-model="registerForm.location" placeholder="Khu vực sinh sống" style="width:100%">
          <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <div class="login-btn">
        <el-button @click="goback(-1)">Hủy bỏ</el-button>
        <el-button type="primary" @click="SignUp">Xác nhận</el-button>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
import mixin from '../mixins'
import loginLogo from '../components/LoginLogo'
import { rules, cities } from '../assets/data/form'
import { HttpManager } from '../api/index'

export default {
  name: 'SignUp-page',
  mixins: [mixin],
  components: {
    loginLogo
  },
  data () {
    return {
      registerForm: {
        username: '',
        password: '',
        sex: '',
        phoneNum: '',
        email: '',
        birth: '',
        introduction: '',
        location: ''
      },
      rules: rules,
      cities: cities
    }
  },
  methods: {
    SignUp () {
      let _this = this
      let d = this.registerForm.birth
      let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      let params = new URLSearchParams()
      params.append('username', this.registerForm.username)
      params.append('password', this.registerForm.password)
      params.append('sex', this.registerForm.sex)
      params.append('phone_num', this.registerForm.phoneNum)
      params.append('email', this.registerForm.email)
      params.append('birth', datetime)
      params.append('introduction', this.registerForm.introduction)
      params.append('location', this.registerForm.location)
      params.append('avator', '/img/user.jpg')
      HttpManager.SignUp(params)
        .then(res => {
          console.log(res)
          if (res.code === 1) {
            _this.notify('Đăng ký thành công dùi nha', 'success')
            setTimeout(function () {
              _this.$router.push({path: '/'})
            }, 2000)
          } else {
            _this.notify('Đăng ký không thành cônggg', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    goback (index) {
      this.$router.go(index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/sign-up.scss';
</style>
