<template>
  <div class="the-header">
    <!--Biểu tượng-->

    <div class="header-logo" @click="goHome">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="ERJI"></use>
      </svg>
      <span>{{musicName}}</span>
    </div>
    <ul class="navbar" ref="change">
      <li :class="{active: item.name === activeName}" v-for="item in navMsg" :key="item.path" @click="goPage(item.path, item.name)">
        {{item.name}}
      </li>

          <!-- Search giọng nói -->
          <li>
            <div>
            <span class="microphone">mic
              <i class="fas fa-microphone"></i>
              <span class="recording-icon"></span>
            </span>
            </div>
          </li>
          <!-- End Search giọng nói -->
      <li>
        <div class="header-search">
          <input id="search-input" @change="goSearch()" type="text" placeholder="Tìm kiếm nhạc"  v-model="keywords">
          <div class="search-btn"   @click="goSearch()"   >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="SOUSUO"></use>
            </svg>
          </div>
        </div>
      </li>


      <li v-show="!loginIn" :class="{active: item.name === activeName}" v-for="item in loginMsg" :key="item.type" @click="goPage(item.path, item.name)">{{item.name}}</li>
    </ul>
    <!--Cài đặt-->
    <div class="header-right" v-show="loginIn">
      <div id="user">
        <img :src="attachImageUrl(avator)" alt="">
      </div>
      <ul class="menu">
        <li v-for="(item, index) in menuList" :key="index" @click="goMenuList(item.path)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins'
import { mapGetters } from 'vuex'
import { navMsg, loginMsg, menuList } from '../assets/data/header'
import { ICON } from '../assets/icon/index'


export default {
  name: 'the-header',
  mixins: [mixin],
  data () {
    return {
      musicName: 'Podcast',
      navMsg: navMsg, // Thanh điều hướng bên trái
      loginMsg: loginMsg, // Thanh điều hướng bên phải
      menuList: menuList, // Mục menu thả xuống của người dùng
      keywords: '',
      ERJI: ICON.ERJI,
      SOUSUO: ICON.SOUSUO,
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'activeName',
      'avator',
      'username',
      'loginIn',
      'id'
    ])
  },
  mounted () {
    document.querySelector('#user').addEventListener('click', function (e) {
      document.querySelector('.menu').classList.add('show')
      e.stopPropagation()// Điều quan trọng là không abcxyz
    }, false)
    // Ngăn sự kiện abcxyz khi bạn nhấp vào bên trong "menu". (Bằng cách này, khi bạn nhấp vào bên trong, menu sẽ không đóng lại)
    document.querySelector('.menu').addEventListener('click', function (e) {
      e.stopPropagation()
    }, false)
    document.addEventListener('click', function () {
      document.querySelector('.menu').classList.remove('show')
    }, false)

//
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
recognition.lang = 'vi-VI';
recognition.continuous = false;
const microphone = document.querySelector('.microphone');
const searchInput = document.querySelector('#search-input');
//

microphone.addEventListener('click', (e) => {
    e.preventDefault();
    recognition.start();
    microphone.classList.add('recording');
});

recognition.onspeechend = () => {
    recognition.stop();
    microphone.classList.remove('recording');
}

recognition.onerror = (err) => {
    console.error(err);
    microphone.classList.remove('recording');
}

recognition.onresult = (e) => {
    console.log('onresult', e);
    const text = e.results[0][0].transcript;
    handleVoice(text);
}

//

const speak = (text) => {
    if (synth.speaking) {
        console.error('Busy. Speaking...');
        return;
    }

    const utter = new SpeechSynthesisUtterance(text);

    utter.onend = () => {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utter.onerror = (err) => {
        console.error('SpeechSynthesisUtterance.onerror', err);
    }

    synth.speak(utter);
};

const handleVoice = (text) => {
    console.log('Tìm kiếm: ', text);

    const handledText = text.toLowerCase();
    if (handledText.includes('tìm kiếm bài hát là')) {
        const songs = handledText.split('là')[1].trim();

        console.log('Bài hát: ', songs);
        searchInput.value = songs;
        this.keywords = songs;
        this.goSearch()
        // const changeEvent = new Event('change');
        // searchInput.dispatchEvent(changeEvent);
        // return;
    }
    if (handledText.includes('tôi muốn nghe bài')) {
        const songs = handledText.split('bài')[1].trim();

        console.log('Bài hát: ', songs);
        let player = this.$refs.player
        //  Ghi lại thời gian âm nhạc
      this.$store.commit('setDuration', 'id')
      //  Play
      player.play()
      this.$store.commit('setIsPlay', true)
    }
    // if (handledText.includes('chuyển hướng trang đến')) {
    //     const songs = handledText.split('đến')[1].trim();

    //     console.log('chuyển hướng trang đến: ', songs);
    //     if(songs==='trang chủ'){
    //       this.$router.push({path: '/'})
    //     }
    //     if(songs==='ca sĩ'){
    //       this.$router.push({path: '/singer'})
    //     }
    //     if(songs==='danh sách nhạc'){
    //       this.$router.push({path: '/song-list'})
    //     }
    // }

    //oke
    if (handledText.includes('chuyển hướng trang đến')) {
        const songs = handledText.split('đến')[1].trim();

        console.log('chuyển hướng trang đến: ', songs);
        if(songs==='trang chủ'){
          this.$router.push({path: '/'})
        }
        if(songs==='ca sĩ'){
          this.$router.push({path: '/singer'})
        }
        if(songs==='thể loại'){
          this.$router.push({path: '/song-list'})
        }
        if(songs==='yêu thích'){
          this.$router.push({path: '/my-music'})

        }
    }

    //oke
    // if (handledText.includes('chọn danh sách tất cả nghệ sĩ')) {

    //     console.log('chọn danh sách tất cả nghệ sĩ: ');
    //       this.$router.push({path: '/singer',query: {keywords: 'Tất cả'}})
    // }
    // if (handledText.includes('chọn danh sách nghệ sĩ nam')) {

    //     console.log('chọn danh sách nghệ sĩ nam ');
    //       this.$router.push({path: '/singer',query: {keywords: 'Nghệ sĩ nam'}})
    // }
    // if (handledText.includes('chọn danh sách nghệ sĩ nữ')) {

    //     console.log('chọn danh sách nghệ sĩ nữ ');
    //       this.$router.push({path: '/singer',query: {keywords: 'Nghệ sĩ nữ'}})
    // }

    if (handledText.includes('chọn nghệ sĩ')) {

        const songs = handledText.split('sĩ')[1].trim();
        if(songs==='tất cả'){
          this.$router.push({path: '/singer',query: {keywords: 'Tất cả'}})
        }
        if(songs==='nam'){
          this.$router.push({path: '/singer',query: {keywords: 'Nghệ sĩ Nam'}})
        }
        if(songs==='nữ'){
          this.$router.push({path: '/singer',query: {keywords: 'Nghệ sĩ Nũ'}})
        }
         if(songs==='nhóm nhạc'){
          this.$router.push({path: '/singer',query: {keywords: 'Nhóm nhạc'}})
        }


    }

    //oke
    // if (handledText.includes('chọn thể loại nhạc tất cả')) {

    //     console.log('chọn danh sách thể loại tất cả');
    //       this.$router.push({path: '/song-list',query: {keywords: 'Tất cả'}})
    // }
    if (handledText.includes('chọn danh sách thể loại')) {
        const songs = handledText.split('loại')[1].trim();
        if(songs==='radio'){
          this.$router.push({path: '/song-list',query: {keywords: 'Radio'}})
        }
        if(songs==='lofi'){
          this.$router.push({path: '/song-list',query: {keywords: 'Lofi'}})
        }
        if(songs==='remix'){
          this.$router.push({path: '/song-list',query: {keywords: 'Remix'}})
          //  location.reload()
        }
         if(songs==='nhạc nhẹ'){
          this.$router.push({path: '/song-list',query: {keywords: 'Nhạc nhẹ'}})
        }
        if(songs==='ost'){
          this.$router.push({path: '/song-list',query: {keywords: 'OST'}})
        }
         if(songs==='ballad'){
          this.$router.push({path: '/song-list',query: {keywords: 'Ballad'}})
        }

    }

    //chưa getSongId
      // if (handledText.includes('muốn nghe bài')) {
      //   const songs = handledText.split('bài')[1].trim();

      //   console.log('Bài hát: ', songs);
      //   // searchInput.value = songs;
      //   // this.keywords = songs;
      //   this.getSongId()
      // }
    //oke
    if (handledText.includes('bật nhạc')) {

        this.$store.commit('setIsPlay', true)
    }

    //oke
    if (handledText.includes('tắt nhạc')) {

        this.$store.commit('setIsPlay', false)
    }

    //no
    if (handledText.includes('chuyển tiếp')) {

        this.$store.commit('setListIndex',true)
    }

    //no
     if (handledText.includes('quay lại')) {
       console.log('quay lại')
        this.$store.commit('setListIndex',true)
    }

    //no
     if (handledText.includes('download')) {
       console.log('down')
        this.$store.downloadMusic(true)
    }

    speak('Try again');
}

//

searchInput.addEventListener('change', (e) => {
  console.log(e)
    this.$store.commit('setSearchword', this.keywords)
    this.$router.push({path: '/search', query: {keywords: this.keywords}})
});


//


  },

  methods: {
    goHome () {
      this.$router.push({path: '/'})
    },
    goPage (path, value) {
      document.querySelector('.menu').classList.remove('show')
      this.changeIndex(value)
      if (!this.loginIn && path === '/my-music') {
        this.notify('Đăng nhập trước dùm', 'warning')
      } else {
        this.$router.push({path: path})
      }
    },
    changeIndex (value) {
      this.$store.commit('setActiveName', value)
    },
    goMenuList (path) {
      if (path === 0) {
        this.$store.commit('setIsActive', false)
      }
      document.querySelector('.menu').classList.remove('show')
      if (path) {
        this.$router.push({path: path})
      } else {
        this.$store.commit('setLoginIn', false)
        this.$router.go(0)
      }
    },
    goSearch () {
      console.log('áđá')
      this.$store.commit('setSearchword', this.keywords)
      this.$router.push({path: '/search', query: {keywords: this.keywords}})
    }



  }

}




</script>

<style lang="scss" scoped>
@import '../assets/css/the-header.scss';
</style>
