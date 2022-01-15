
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.scss'
import '@/assets/js/iconfont.js'
import '@/assets/js/iconfont1.js'
import '@/assets/js/iconfont2.js'
import '@/assets/js/iconfont3.js'


Vue.use(Vuex)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router: router,
  store: new Vuex.Store(store),
  render: h => h(App)
})
