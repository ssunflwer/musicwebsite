<template>
  <div class="song-lyric">
    <h1 class="lyric-title">Lời bài hát</h1>
    <transition-group name="lyric-fade">
      <!--Có lời bài hát-->
      <ul :style="{top:lrcTop}" class="has-lyric" v-if="lyr.length" key="has-lyric">
        <li v-for="(item, index) in lyr" v-bind:key="index">
          {{ item[1] }}
        </li>
      </ul>
      <!--Không có lời bài hát-->
      <div v-else class="no-lyric" key="no-lyric">
        <span>Chưa có lời bài hát</span>
      </div>
    </transition-group>
    <comment :playId="id" :type="0"></comment>
  </div>
</template>

<script>
import mixin from '../mixins'
import Comment from '../components/Comment'
import { mapGetters } from 'vuex'

export default {
  name: 'lyric',
  mixins: [mixin],
  components: {
    Comment
  },
  data () {
    return {
      lrcTop: '200px',
      showLrc: false,
      lyr: []
    }
  },
  computed: {
    ...mapGetters([
      'curTime',
      'id',
      'lyric',
      'listOfSongs',
      'listIndex'
    ])
  },
  watch: {
    id: function () {
      this.lyr = this.parseLyric(this.listOfSongs[this.listIndex].lyric)
    },
    curTime: function () {
      if (this.lyr.length !== 0) {
        for (let i = 0; i < this.lyr.length; i++) {
          if (this.curTime >= this.lyr[i][0]) {
            for (let j = 0; j < this.lyr.length; j++) {
              document.querySelectorAll('.has-lyric li')[j].style.color = '#000'
              document.querySelectorAll('.has-lyric li')[j].style.fontSize = '15px'
            }
            if (i >= 0) {
              document.querySelectorAll('.has-lyric li')[i].style.color = '#95d2f6'
              document.querySelectorAll('.has-lyric li')[i].style.fontSize = '25px'
            }
          }
        }
      }
    }
  },
  created () {
    this.lyr = this.lyric ? this.lyric : []
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/lyric.scss';
</style>
