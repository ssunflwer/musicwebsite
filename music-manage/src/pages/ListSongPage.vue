<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> Thông tin bài hát danh sách phát
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" class="handle-del mr10" @click="delAll">Xóa hàng loạt</el-button>
        <el-input v-model="select_word" size="mini" placeholder="Lọc từ khóa" class="handle-input mr10"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">Thêm bài hát</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        size="mini"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="name" label="ca sĩ-bài hát"></el-table-column>
        <el-table-column label="Play" width="80">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">Xóa bỏ</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--Thêm bài hát-->
    <el-dialog title="Thêm bài hát" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form
        :model="registerForm"
        status-icon
        ref="registerForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item prop="singerName" label="Tên ca sĩ" size="mini">
          <el-input v-model="registerForm.singerName" placeholder="Tên ca sĩ"></el-input>
        </el-form-item>
        <el-form-item prop="songName" label="Tên bài hát" size="mini">
          <el-input v-model="registerForm.songName" placeholder="Tên bài hát"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="centerDialogVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" size="mini" @click="getSongId">Xác nhận</el-button>
      </span>
    </el-dialog>

    <!-- Xóa chú thích công cụ -->
    <el-dialog title="Gợi ý" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt" align="center">Không thể khôi phục thao tác xóa. Bạn có chắc chắn muốn xóa không?</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="delVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" size="mini" @click="deleteRow">Xác nhận</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin } from '../mixins'
import { HttpManager } from '../api/index'

export default {
  name: 'list-song-page',
  mixins: [mixin],
  data () {
    return {
      registerForm: {
        singerName: '',
        songName: ''
      },
      tableData: [],
      tempDate: [],
      multipleSelection: [],
      centerDialogVisible: false,
      editVisible: false,
      delVisible: false,
      select_word: '',
      idx: -1
    }
  },
  watch: {
    select_word: function () {
      if (this.select_word === '') {
        this.tableData = this.tempDate
      } else {
        this.tableData = []
        for (let item of this.tempDate) {
          if (item.name.includes(this.select_word)) {
            this.tableData.push(item)
          }
        }
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // Nhận danh sách phát
    getData () {
      this.tableData = []
      this.tempDate = []
      HttpManager.getListSongOfSongId(this.$route.query.id)
        .then(res => {
          console.log(res)
          for (let item of res) {
            this.getSong(item.songId)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // Nhận nhạc tương ứng trong danh sách phát
    getSong (id) {
      HttpManager.getSongOfId(id)
        .then(res => {
          this.tableData.push(res[0])
          this.tempDate.push(res[0])
        })
        .catch(err => {
          console.log(err)
        })
    },
    // Lấy ID của bài hát bạn muốn thêm
    getSongId () {
      let _this = this
      var id = _this.registerForm.singerName + '-' + _this.registerForm.songName
      HttpManager.getSongOfSingerName(id)
        .then(res => {
          this.addSong(res[0].id)
        })
    },
    // Thêm bài hát
    addSong (id) {
      let params = new URLSearchParams()
      params.append('songId', id)
      params.append('songListId', this.$route.query.id)
      HttpManager.setListSong(params)
        .then(res => {
          if (res.code === 1) {
            this.getData()
            this.notify('Thêm thành công', 'success')
          } else {
            this.notify('Thêm thất bại', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.centerDialogVisible = false
    },
    // Xác nhận xóa
    deleteRow () {
      HttpManager.deleteListSong(this.idx)
        .then(res => {
          if (res) {
            this.getData()
            this.notify('Xóa thành công', 'success')
          } else {
            this.notify('Xóa thất bại', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.delVisible = false
    }
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
</style>
