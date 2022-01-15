<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> Thông tin bài hát
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" class="handle-del mr10" @click="delAll">Xóa hàng loạt</el-button>
        <el-input v-model="select_word" size="mini" placeholder="Lọc từ khóa" class="handle-input mr10"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">Thêm bài hát</el-button>
      </div>
      <el-table :data="data" size="mini" border style="width: 100%" ref="multipleTable" height="550px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="Ava" width="110" align="center">
          <template slot-scope="scope">
            <div style="width: 80px; height: 80px; overflow: hidden">
              <img :src="getUrl(scope.row.pic)" alt="" style="width: 100%;"/>
            </div>
            <div class="play" @click="setSongUrl(scope.row.url, scope.row.name)">
              <div v-if="toggle !== scope.row.name">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="BOFANG"></use>
                </svg>
              </div>
              <div v-if="toggle === scope.row.name">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="playIcon"></use>
                </svg>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tên" prop="name" width="150" align="center"></el-table-column>
        <el-table-column label="Mô tả" prop="introduction" width="150" align="center"></el-table-column>
        <el-table-column label="Lyrics" align="center">
          <template slot-scope="scope">
            <ul style="height: 100px; overflow: scroll">
              <li>
              <li v-for="(item, index) in parseLyric(scope.row.lyric)" :key="index">
                {{ item}}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="Edit" width="100" align="center">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              :action="uploadUrl(scope.row.id)"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              >
                <el-button size="mini">Hình ảnh</el-button>
            </el-upload>
            <br>
            <el-upload
              class="upload-demo change"
              :action="uploadSongUrl(scope.row.id)"
              :show-file-list="false"
              :on-success="handleSongSuccess"
              :before-upload="beforeSongUpload">
              <el-button size="mini">Bài hát</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="Cmts" width="80" align="center">
            <template  slot-scope="scope">
                <el-button size="mini" @click="getComment(data[scope.$index].id)">Nhận xét</el-button>
            </template>
        </el-table-column>
        <el-table-column label="Tác vụ" width="150" align="center">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">Xóa</el-button>
            </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="total, prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="tableData.length">
        </el-pagination>
      </div>
    </div>

    <!--Thêm bài hát-->
    <el-dialog title="Thêm bài hát" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form action="" :model="registerForm" id="tf">
        <div>
          <label>Tên bài hát</label>
          <el-input type="text" name="name"></el-input>
        </div>
        <div>
          <label>Album</label>
          <el-input type="text" value="" name="introduction"></el-input>
        </div>
        <div>
          <label>Lời bài hát</label>
          <el-input type="textarea" value="" name="lyric"></el-input>
        </div>
        <div>
          <label>Tải lên bài hát</label>
          <br>
          <input type="file" name="file" id="upadte-file-input">
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" @click="addSong">Xác nhận</el-button>
      </span>
    </el-dialog>

    <!-- Chỉnh sửa cửa sổ bật lên -->
    <el-dialog title="Chỉnh sửa" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="Tên" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Des" size="mini">
          <el-input v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="Addr" size="mini">
          <el-input  type="textarea" v-model="form.lyric"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" size="mini" @click="saveEdit">Xác nhận</el-button>
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
import SongAudio from '../components/SongAudio'
import { mixin } from '../mixins'
import { mapGetters } from 'vuex'
import { ICON } from '../assets/icon/index'
import { HttpManager } from '../api/index'

export default {
  name: 'song-page',
  components: {
    SongAudio
  },
  mixins: [mixin],
  data () {
    return {
      toggle: false, // Kiểm soát trạng thái của biểu tượng play
      singerId: '',
      singerName: '',
      registerForm: {
        name: '',
        singerName: '',
        introduction: '',
        lyric: ''
      },
      tableData: [],
      tempDate: [],
      is_search: false,
      multipleSelection: [], // Ghi lại bài hát sẽ bị xóa
      centerDialogVisible: false,
      editVisible: false,
      delVisible: false,
      select_word: '',
      form: {
        id: '',
        singerId: '',
        name: '',
        introduction: '',
        createTime: '',
        updateTime: '',
        pic: '',
        lyric: '',
        url: ''
      },
      pageSize: 5, // Số trang
      currentPage: 1, // Trang hiện tại
      idx: -1,
      BOFANG: ICON.BOFANG,
      ZANTING: ICON.ZANTING
    }
  },
  computed: {
    ...mapGetters([
      'isPlay' // Trạng thái play
    ]),
    // Tính toán dữ liệu trong bảng hiện tại
    data () {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    playIcon () {
      if (this.isPlay) {
        return this.ZANTING
      } else {
        return this.BOFANG
      }
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
    this.singerId = this.$route.query.id
    this.singerName = this.$route.query.name
    this.getData()
  },
  destroyed () {
    this.$store.commit('setIsPlay', false)
  },
  methods: {
    // Nhận bài hát
    getData () {
      this.tableData = []
      this.tempDate = []
      HttpManager.getSongOfSingerId(this.singerId).then((res) => {
        this.tableData = res
        this.tempDate = res
        this.currentPage = 1
      }).catch(err => {
        console.log(err)
      })
    },
    setSongUrl (url, name) {
      this.$store.commit('setUrl', this.$store.state.HOST + url)
      this.toggle = name
      if (this.isPlay) {
        this.$store.commit('setIsPlay', false)
      } else {
        this.$store.commit('setIsPlay', true)
      }
    },
    // Cập nhật hình ảnh bài hát
    uploadUrl (id) {
      return `${this.$store.state.HOST}/song/img/update?id=${id}`
    },
    // Cập nhật url bài hát
    uploadSongUrl (id) {
      return `${this.$store.state.HOST}/song/url/update?id=${id}`
    },
    beforeSongUpload (file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'mp3'
      if (!extension) {
        this.$message({
          message: 'Các tệp tải lên chỉ có thể ở định dạng mp3!',
          type: 'error'
        })
      }
      return extension
    },
    // Lấy trang hiện tại
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleSongSuccess (res, file) {
      if (res.code === 1) {
        this.getData()
        this.notify('Thành công', 'success')
      } else {
        this.notify('Thất bại', 'error')
      }
    },
    // Thêm nhạc
    addSong () {
      let _this = this
      var form = new FormData(document.getElementById('tf'))
      form.append('singerId', this.singerId)
      form.set('name', this.singerName + '-' + form.get('name'))
      if (!form.get('lyric')) {
        form.set('lyric', '[00:00:00]Không có lời bài hát')
      }
      var req = new XMLHttpRequest()
      req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
          let res = JSON.parse(req.response)
          if (res.code) {
            _this.getData()
            _this.registerForm = {}
            _this.notify(res.msg, 'success')
          } else if (!res.code) {
            _this.notify('Tải lên thất bại', 'error')
          }
        }
      }
      req.open('post', `${_this.$store.state.HOST}/song/add`, false)
      req.send(form)
      _this.centerDialogVisible = false
    },
    // Biên tập
    handleEdit (row) {
      this.idx = row.id
      this.form = {
        id: row.id,
        singerId: row.singerId,
        name: row.name,
        introduction: row.introduction,
        createTime: row.createTime,
        updateTime: row.updateTime,
        pic: row.pic,
        lyric: row.lyric,
        url: row.url
      }
      this.editVisible = true
    },
    getComment (id) {
      this.$router.push({path: '/Comment', query: {id: id, type: 0}})
    },
    // Lưu chỉnh sửa
    saveEdit () {
      let params = new URLSearchParams()
      params.append('id', this.form.id)
      params.append('singerId', this.form.singerId)
      params.append('name', this.form.name)
      params.append('introduction', this.form.introduction)
      params.append('lyric', this.form.lyric)
      HttpManager.updateSongMsg(params)
        .then(res => {
          if (res) {
            this.getData()
            this.notify('Chỉnh sửa thành công', 'success')
          } else {
            this.notify('Chỉnh sửa không thành công', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.editVisible = false
    },
    // Xác nhận xóa
    deleteRow () {
      HttpManager.deleteSong(this.idx)
        .then(response => {
          if (response) {
            this.getData()
            this.notify('Đã xóa thành công', 'success')
          } else {
            this.notify('Xóa thất bại', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.delVisible = false
    },
    // Phân tích cú pháp lời bài hát
    parseLyric (text) {
      let lines = text.split('\n')
      let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g
      let result = []

      // Xử lý đặc biệt cho định dạng lời bài hát sai
      if (!(/\[.+\]/.test(text))) {
        return [text]
      }
      for (let item of lines) {
        if (pattern.test(item)) {
          let value = item.replace(pattern, '') // Lưu lời bài hát
          result.push(value)
        }
      }
      return result
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
.el-input__inner{
  background-color: aqua
}
.play {
    position: absolute;
    z-index: 100;
    width: 80px;
    height: 80px;
    top: 18px;
    left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon {
  width: 2em;
  height: 2em;
  color: white;
  fill: currentColor;
  overflow: hidden;
}
.pagination {
    display: flex;
    justify-content: center;
}
</style>
