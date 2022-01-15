<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-1">
            <div class="grid-cont-right">
              <div class="grid-num">{{userCount}}</div>
              <div>Tổng số người dùng</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-2">
            <div class="grid-cont-right">
              <div class="grid-num">{{songCount}}</div>
              <div>Tổng số bài hát</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-3">
            <div class="grid-cont-right">
              <div class="grid-num">{{singerCount}}</div>
              <div>Số lượng ca sĩ</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-4">
            <div class="grid-cont-right">
              <div class="grid-num">{{songListCount}}</div>
              <div>Số lượng bài hát</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <h3 style="margin-bottom: 20px">Tỷ lệ giới tính người dùng</h3>
        <div class="cav-info" style="background-color: white">
          <ve-pie :data="userSex" :theme="options"></ve-pie>
        </div>
      </el-col>
      <el-col :span="12">
        <h3 style="margin-bottom: 20px">Phân loại bài hát</h3>
        <div class="cav-info" style="background-color: white">
          <ve-histogram :data="songStyle" :theme="options3"></ve-histogram>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <h3 style="margin: 20px 0">Tỷ lệ giới tính của nghệ sĩ</h3>
        <div class="cav-info" style="background-color: white">
          <ve-pie :data="singerSex" :theme="options1"></ve-pie>
        </div>
      </el-col>
      <el-col :span="12">
        <h3 style="margin: 20px 0">Quốc tịch ca sĩ</h3>
        <div class="cav-info" style="background-color: white">
          <ve-histogram :data="country" :theme="options2"></ve-histogram>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mixin } from '../mixins'
import { HttpManager } from '../api/index'

export default {
  mixins: [mixin],
  data () {
    return {
      user: [],
      userSex: {
        columns: ['Giới tính', 'Tổng'],
        rows: [
          { 'Giới tính': 'Nam', 'Tổng': 0 },
          { 'Giới tính': 'Nữ', 'Tổng': 0 }
        ]
      },
      singerSex: {
        columns: ['Giới tính', 'Tổng'],
        rows: [
          { 'Giới tính': 'Nam', 'Tổng': 0 },
          { 'Giới tính': 'Nữ', 'Tổng': 0 }
        ]
      },
      country: {
        columns: ['Quốc gia', 'Tổng số'],
        rows: [
          { 'Quốc gia': 'Việt', 'Tổng số': 0 },
          { 'Quốc gia': 'Hàn', 'Tổng số': 0 },
          { 'Quốc gia': 'Ý', 'Tổng số': 0 },
          { 'Quốc gia': 'Sing', 'Tổng số': 0 },
          { 'Quốc gia': 'Hoa Kỳ', 'Tổng số': 0 },
          { 'Quốc gia': 'Malaysia', 'Tổng số': 0 },
          { 'Quốc gia': 'TBN', 'Tổng số': 0 },
          { 'Quốc gia': 'Japan', 'Tổng số': 0 }
        ]
      },
      options: {
        color: ['#87CEFA', '#FFC0CB']
      },
      options1: {
        color: ['#1E90FF', '#7B68EE']
      },
      options2: {
        color: ['#FEED78'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // Chỉ báo trục tọa độ, trình kích hoạt trục tọa độ hợp lệ
            type: 'shadow' // Mặc định là một đường thẳng, tùy chọn：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      },
      options3: {
        color: ['#FD8A61'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // Chỉ báo trục tọa độ, trình kích hoạt trục tọa độ hợp lệ
            type: 'shadow' // Mặc định là một đường thẳng, có thể được chọn là：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      },
      songStyle: {
        columns: ['Thể loại', 'Tổng số'],
        rows: [
          { 'Thể loại': 'Radio', 'Tổng số': 0 },
          { 'Thể loại': 'Nhạc nhẹ', 'Tổng số': 0 },
          { 'Thể loại': 'Lofi', 'Tổng số': 0 },
          { 'Thể loại': 'Remix', 'Tổng số': 0 },
          { 'Thể loại': 'BGM', 'Tổng số': 0 },
          { 'Thể loại': 'OST', 'Tổng số': 0 },
          { 'Thể loại': 'Ballad', 'Tổng số': 0 }
        ]
      },
      userCount: 0,
      songCount: 0,
      singerCount: 0,
      songListCount: 0
    }
  },
  mounted () {
    this.getUser()
    this.getSinger()
    this.getSong()
    this.getSongList()
  },
  methods: {
    getUser () {
      HttpManager.getAllUser().then(res => {
        this.userCount = res.length
        this.userSex.rows[0]['Tổng'] = this.setSex(1, res)
        this.userSex.rows[1]['Tổng'] = this.setSex(0, res)
      })
    },
    setSex (sex, arr) {
      let count = 0
      for (let item of arr) {
        if (sex === item.sex) {
          count++
        }
      }
      return count
    },
    getCountry (val) {
      for (let item of this.country.rows) {
        if (val.includes(item['Quốc gia'])) {
          item['Tổng số']++
          break
        }
      }
    },
    getStyle (val) {
      for (let item of this.songStyle.rows) {
        if (val.includes(item['Thể loại'])) {
          item['Tổng số']++
        }
      }
    },
    getSinger () {
      HttpManager.getAllSinger().then(res => {
        this.singerCount = res.length
        this.singerSex.rows[0]['Tổng'] = this.setSex(1, res)
        this.singerSex.rows[1]['Tổng'] = this.setSex(0, res)
        for (let item of res) {
          this.getCountry(item.location)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getSong () {
      HttpManager.getAllSong().then(res => {
        this.songCount = res.length
      }).catch(err => {
        console.log(err)
      })
    },
    getSongList () {
      HttpManager.getSongList().then(res => {
        this.songListCount = res.length
        for (let item of res) {
          this.getStyle(item.style)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .cav-info {
    border-radius: 6px;
    overflow: hidden;
  }
</style>
