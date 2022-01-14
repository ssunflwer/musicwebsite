<template>
  <div class="search-song-Lists">
    <content-list :contentList="albumDatas" path="song-list-album"></content-list>
  </div>
</template>

<script>
import mixin from '../../mixins'
import ContentList from '../ContentList'
import { HttpManager } from '../../api/index'

export default {
  name: 'search-song-Lists',
  mixins: [mixin],
  components: {
    ContentList
  },
  data () {
    return {
      albumDatas: []
    }
  },
  mounted () {
    this.getSearchList()
  },
  methods: {
    getSearchList () {
      if (!this.$route.query.keywords) return
      HttpManager.getSongListOfLikeTitle(this.$route.query.keywords)
        .then(res => {
          if (!res.length) {
            this.notify('Không có nội dung của bài hát', 'warning')
          } else {
            this.albumDatas = res
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/search-song-Lists.scss';
</style>
