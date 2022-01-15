<template>
  <div class="singer">
    <ul class="singer-header">
      <li
        v-for="(item, index) in singerStyle"
        :key="index"
        :class="{active: item.name === activeName}"
        @click="handleChangeView(item)">
        {{item.name}}
      </li>
    </ul>
    <content-list :contentList="data"  path="singer-album"></content-list>
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
</template>

<script>
import ContentList from '../components/ContentList'
import { singerStyle } from '../assets/data/singer'
import { HttpManager } from '../api/index'

export default {
  name: 'singer',
  components: {
    ContentList
  },
  data () {
    return {
      singerStyle: singerStyle,
      activeName: 'Tất cả',
      pageSize: 15,
      currentPage: 1,
      albumDatas: []
    }
  },
  computed: {
    data () {
      return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  created () {
    this.getAllSinger()
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleChangeView (item) {
      this.activeName = item.name
      this.albumDatas = []
      if (item.name === 'Tất cả') {
        this.getAllSinger()
      } else {
        this.getSingerSex(item.type)
      }
    },
    getAllSinger () {
      console.log('inittt')
        HttpManager.getAllSinger()
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
        .catch(err => {
          console.log(err)
        })
      if(this.$route.query.keywords==='Nghệ sĩ nam'){
        this.getSingerSex(1)
      }else if(this.$route.query.keywords==='Nghệ sĩ nữ'){
        this.getSingerSex(0)
      }else if(this.$route.query.keywords==='Nhóm nhạc'){
        this.getSingerSex(2)
      }

    },
    getSingerSex (sex) {
      console.log('sex', sex)
      HttpManager.getSingerOfSex(sex)
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
@import '../assets/css/singer.scss';
</style>
