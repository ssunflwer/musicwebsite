<template>
  <div class="setting">
    <div class="leftCol">
      <div class="settingsMainHeader">Cài đặt</div>
      <ul class="setting-aside">
        <li v-for="(item, index) in settingList" :key="index" :class="{activeColor: activeName === item.name}" @click="handleClick(item)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="contentCol">
      <component :is="componentSrc"></component>
    </div>
  </div>
</template>

<script>
import Info from '../components/Info'
import Upload from '../components/Upload'

export default {
  name: 'setting',
  components: {
    Info,
    Upload
  },
  data () {
    return {
      activeName: 'Thông tin',
      componentSrc: 'Info',
      settingList: [{
        icon: '',
        name: 'Thông tin',
        path: 'Info'
      }, {
        icon: '',
        name: 'Avatar',
        path: 'Upload'
      }]
    }
  },
  methods: {
    handleClick (item) {
      this.activeName = item.name
      this.componentSrc = item.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/setting.scss';
</style>
