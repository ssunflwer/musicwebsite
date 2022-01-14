<template>
  <div>
    <div class="comment">
      <h2>
        <span>Bình luận</span>
        <span class="part__tit_desc">Tổng {{commentList.length}} bình luận</span>
      </h2>
      <div class="comment-msg">
        <el-input
          class="comment-input"
          type="textarea"
          placeholder="Mong nhận được lời bình luận từ bạn..."
          :rows="2"
          v-model="textarea">
        </el-input>
      </div>
      <el-button type="primary" class="sub-btn" @click="postComment()">Bình luận</el-button>
    </div>
    <ul class="popular" v-for="(item, index) in commentList" :key="index">
      <li>
        <div class="popular-img">
          <img :src="attachImageUrl(userPic[index])" alt="">
        </div>
        <div class="popular-msg">
          <ul>
            <li class="name">{{userName[index]}}</li>
            <li class="content">{{item.content}}</li>
            <li class="time">{{item.createTime}}</li>
          </ul>
        </div>
        <div class="up" ref="up" @click="postUp(item.id, item.up, index)">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="ZAN"></use>
          </svg>
          {{item.up}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mixin from '../mixins'
import { mapGetters } from 'vuex'
import { HttpManager } from '../api/index'
import { ICON } from '../assets/icon/index'

export default {
  name: 'comment',
  mixins: [mixin],
  props: {
    playId: Number, // ID bài hát hoặc ID danh sách phát
    type: Number // Danh sách phát (1) / Bài hát (0)
  },
  data () {
    return {
      commentList: [], // Lưu trữ nội dung bình luận
      userPic: [], // Lưu hình đại diện người dùng nhận xét
      userName: [], // Lưu tên người dùng nhận xét
      textarea: '', // Lưu trữ đầu vào
      ZAN: ICON.ZAN
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'userId', // Tên người dùng
      'index', // Số seri trong danh sách
      'loginIn', // Cho dù người dùng đã đăng nhập
      'avator' // Ảnh đại diện
    ])
  },
  watch: {
    id () {
      this.getComment()
    }
  },
  mounted () {
    this.getComment()
  },
  methods: {
    // Nhận tất cả các bình luận
    getComment () {
      HttpManager.getAllComment(this.type, this.playId)
        .then(res => {
          this.commentList = res
          for (let item of res) {
            this.getUsers(item.userId)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // Lấy biệt hiệu và hình đại diện của người dùng bình luận
    getUsers (id) {
      HttpManager.getUserOfId(id)
        .then(res => {
          this.userPic.push(res[0].avator)
          this.userName.push(res[0].username)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // Gửi bình luận
    postComment () {
      if (this.loginIn) {
        // 0 có nghĩa là bài hát, 1 có nghĩa là danh sách phát
        let params = new URLSearchParams()
        if (this.type === 1) {
          params.append('songListId', this.playId)
        } else if (this.type === 0) {
          params.append('songId', this.playId)
        }
        params.append('userId', this.userId)
        params.append('type', this.type)
        params.append('content', this.textarea)
        HttpManager.setComment(params)
          .then(res => {
            if (res.code === 1) {
              this.textarea = ''
              this.getComment()
              this.notify('Bình luận thành công âu kây', 'success')
            } else {
              this.notify('Nói gì zạy trời, khum bình luận được nha', 'error')
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.notify('Vui lòng đăng nhập trước', 'warning')
      }
    },
    // Thích
    postUp (id, up, index) {
      if (this.loginIn) {
        let params = new URLSearchParams()
        params.append('id', id)
        params.append('up', up + 1)
        HttpManager.setLike(params)
          .then(res => {
            if (res.code === 1) {
              this.$refs.up[index].children[0].style.color = '#2796dd'
              this.getComment()
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.notify('Vui lòng đăng nhập trước', 'warning')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/comment.scss';
</style>
