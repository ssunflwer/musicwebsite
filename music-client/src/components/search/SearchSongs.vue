<template>
  <div class="search-songs">
    <album-content :songList="listOfSongs"></album-content>
  </div>
</template>

<script>
import mixin from '../../mixins'
import AlbumContent from '../AlbumContent'
import { mapGetters } from 'vuex'

export default {
  name: 'search-songs',
  mixins: [mixin],
  components: {
    AlbumContent
  },
  computed: {
    ...mapGetters([
      'listOfSongs' // Nhạc được lưu trữ
    ])
  },
  mounted () {
    this.getSong()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/search-songs.scss';
</style>
