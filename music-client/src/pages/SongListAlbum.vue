<template>
  <div class="song-list-album">
    <div class="album-slide">
      <div class="album-img">
        <img :src=attachImageUrl(singers.pic) alt="">
      </div>
      <div class="album-info">
        <h2>Giới thiệu: </h2>
        <span>
          {{singers.introduction}}
        </span>
      </div>
    </div>
    <div class="album-content">
      <div class="album-title">
        <p>{{singers.title}}</p>
      </div>
      <div class="album-score">
        <div>
          <h3>Xếp hạng：</h3>
          <div>
            <el-rate v-model="value5" disabled></el-rate>
          </div>
        </div>
        <span>{{value5 * 2}}</span>
        <div>
          <h3>Đánh giá: </h3>
          <div @click="pushValue()">
            <el-rate v-model="value3" show-text allow-half></el-rate>
          </div>
        </div>
      </div>
      <div class="songs-body">
        <album-content :songList="listOfSongs">
          <template slot="title">Danh sách bài hát</template>
        </album-content>
        <comment :playId="songListId" :type="1"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins'
import AlbumContent from '../components/AlbumContent'
import Comment from '../components/Comment'
import { mapGetters } from 'vuex'
import { HttpManager } from '../api/index'

export default {
  name: 'song-list-album',
  mixins: [mixin],
  components: {
    AlbumContent,
    Comment
  },
  data () {
    return {
      songLists: [],
      singers: {},
      count: 0,
      songListId: '',
      value3: 0,
      value5: 0
    }

},





  computed: {
    ...mapGetters([
      'loginIn',
      'tempList',
      'listOfSongs',
      'userId',
      'avator'
    ])
  },






  created () {
    this.songListId = this.tempList.id
    this.singers = this.tempList
    this.getSongId()
    this.getRank(this.songListId)







  },
  methods: {





    getSongId () {
      HttpManager.getListSongOfSongId(this.songListId)
        .then(res => {
          for (let item of res) {
            this.getSongList(item.songId)
          }
          this.$store.commit('setListOfSongs', this.songLists)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSongList (id) {
      HttpManager.getSongOfId(id)
        .then(res => {
          this.songLists.push(res[0])
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRank (id) {
      HttpManager.getRankOfSongListId(id)
        .then(res => {
          this.value5 = res / 2
        })
        .catch(err => {
          console.log(err)
        })
    },
    pushValue () {
      if (this.loginIn) {
        let params = new URLSearchParams()
        params.append('songListId', this.songListId)
        params.append('consumerId', this.userId)
        params.append('score', this.value3 * 2)
        HttpManager.setRank(params)
          .then(res => {
            if (res.code === 1) {
              this.getRank(this.songListId)
              this.notify('Thành cônggg', 'success')
            } else {
              this.notify('Thất bạiii', 'error')
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.value3 = null
        this.notify('Cảnh báooo', 'warning')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/song-list-album.scss';
</style>
