<template>
  <div class="my-music">
    <div class="album-slide">
      <div class="album-img">
        <img :src=attachImageUrl(avator) alt="">
      </div>
      <ul class="album-info">
        <li>Tên nick: {{username}}</li>
        <li>Giới tính: {{userSex}}</li>
        <li>Ngày sinh: {{birth}}</li>
        <li>Địa chỉ: {{location}}</li>
      </ul>
    </div>
    <div class="album-content">
      <div class="album-title">Mô tả về tôi: {{introduction}}</div>
      <div class="songs-body">
        <album-content :songList="collectList">
          <template slot="title">PlayList của tôi</template>
        </album-content>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins'
import AlbumContent from '../components/AlbumContent'
import { mapGetters } from 'vuex'
import { HttpManager } from '../api/index'

export default {
  name: 'my-music',
  mixins: [mixin],
  components: {
    AlbumContent
  },
  data () {
    return {
      avator: '',
      username: '',
      userSex: '',
      birth: '',
      location: '',
      introduction: '',
      collection: [],
      collectList: []
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'id',
      'listOfSongs'
    ])
  },
  mounted () {
    this.getMsg(this.userId)
    this.getCollection(this.userId)
  },
  methods: {
    getMsg (id) {
      HttpManager.getUserOfId(id)
        .then(res => {
          this.username = res[0].username
          this.getuserSex(res[0].sex)
          this.birth = this.attachBirth(res[0].birth)
          this.introduction = res[0].introduction
          this.location = res[0].location
          this.avator = res[0].avator
        })
        .catch(err => {
          console.log(err)
        })
    },
    getuserSex (sex) {
      if (sex === 0) {
        this.userSex = 'Nữ'
      } else if (sex === 1) {
        this.userSex = 'Nam'
      }
    },
    getCollection (userId) {
      HttpManager.getCollectionOfUser(userId)
        .then(res => {
          this.collection = res
          for (let item of this.collection) {
            this.getCollectSongs(item.songId)
          }
          this.$store.commit('setListOfSongs', this.collectList)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCollectSongs (id) {
      HttpManager.getSongOfId(id)
        .then(res => {
          this.collectList.push(res[0])
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/my-music.scss';
</style>
