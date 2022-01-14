<template>
  <div class="song-list">
    <ul class="song-list-header">
      <li
        v-for="(item, index) in songStyle"
        :key="index"
        :class="{active: item.name === activeName}"
        @click="handleChangeView(item.name)">
        {{item.name}}
      </li>
    </ul>
    <div class="song-content">
      <content-list :contentList="data" path="song-list-album"></content-list>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="total, prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="albumDatas.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import { mapGetters } from 'vuex'
import { songStyle } from '../assets/data/songList'
import { HttpManager } from '../api/index'

export default {
  name: 'song-list',
  components: {
    ContentList
  },
  data () {
    return {
      songStyle: songStyle,
      activeName: 'Tất cả',
      pageSize: 15,
      currentPage: 1,
      albumDatas: []
    }
  },
  computed: {
    ...mapGetters([
      'songsList'
    ]),

    data () {
      return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  mounted () {
    this.handleChangeView('Tất cả')
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleChangeView: function (name) {
      console.log('name', name)
      if(this.$route.query.keywords){
        name = this.$route.query.keywords
      }
      this.activeName = name
      this.albumDatas = []
      if (name === 'Tất cả') {
        this.getSongList(this.cur_page)
      } else {
        this.getSongListOfStyle(name)
      }
    },
    getSongList (page) {
      HttpManager.getSongList()
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
        .catch(err => {
          console.log(err)
        })


    },
    getSongListOfStyle (style) {
      HttpManager.getSongListOfStyle(style)
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
        .catch(err => {
          console.log(err)
        })


    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/song-list.scss';
</style>
