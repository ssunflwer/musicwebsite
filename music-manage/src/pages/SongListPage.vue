<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" class="handle-del mr10" @click="delAll">Xóa hàng loạt</el-button>
        <el-input v-model="select_word" size="mini" placeholder="Lọc từ khóa" class="handle-input mr10"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">Thêm danh sách phát</el-button>
      </div>
      <el-table :data="data" border size="mini" style="width: 100%" height="550px" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="Hình ảnh" width="100" align="center">
          <template slot-scope="scope">
            <img :src="getUrl(scope.row.pic)" alt="" style="width: 80px;"/>
              <el-upload
                class="upload-demo"
                :action="uploadUrl(scope.row.id)"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <el-button size="mini">Sửa hình ảnh</el-button>
              </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Tiêu đề" width="200" align="center"></el-table-column>
        <el-table-column label="Giới thiệu">
          <template slot-scope="scope">
            <p style="height: 100px; overflow: scroll">{{ scope.row.introduction }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Thể loại" width="100" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.style }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Nội dung" width="80" align="center">
          <template  slot-scope="scope">
            <el-button size="mini" @click="getContent(data[scope.$index].id)">Nội dung</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Nhận xét" width="80" align="center">
          <template  slot-scope="scope">
            <el-button size="mini" @click="getComment(data[scope.$index].id)">Nhận xét</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Tác vụ" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">Edit
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">Xóa
            </el-button>
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

    <!--Thêm danh sách phát-->
    <el-dialog title="Thêm Album" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form :model="registerForm" status-icon ref="registerForm" label-width="70px" class="demo-ruleForm">
          <el-form-item label="Tên alb" prop="title" size="mini">
            <el-input v-model="registerForm.title" placeholder="Tên album"></el-input>
          </el-form-item>
          <el-form-item label="Mô tả" prop="introduction" size="mini">
            <el-input v-model="registerForm.introduction" placeholder="Giới thiệu album"></el-input>
          </el-form-item>
          <el-form-item label="Thể loại" prop="style" size="mini">
            <el-input v-model="registerForm.style" placeholder="Thể loại"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="centerDialogVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" size="mini" @click="addsongList">Xác nhận</el-button>
      </span>
    </el-dialog>

    <!-- Chỉnh sửa cửa sổ bật lên -->
    <el-dialog title="Chỉnh sửa" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="Title" size="mini">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Des" size="mini">
          <el-input  type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="Sty" size="mini">
          <el-input v-model="form.style"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" size="mini" @click="saveEdit">Xác nhận</el-button>
      </span>
    </el-dialog>

    <!-- Xóa chú giải công cụ -->
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
  name: 'song-list-page',
  mixins: [mixin],
  data () {
    return {
      registerForm: {
        title: '',
        introduction: '',
        style: ''
      },
      tableData: [],
      tempDate: [],
      multipleSelection: [], // Ghi lại danh sách phát sẽ bị xóa
      centerDialogVisible: false,
      editVisible: false,
      delVisible: false,
      select_word: '',
      form: {
        id: '',
        title: '',
        pic: '',
        introduction: '',
        style: ''
      },
      pageSize: 5, // Số trang
      currentPage: 1, // Trang hiện tại
      idx: -1
    }
  },
  computed: {
    // Tính toán dữ liệu trong bảng hiện tại
    data () {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  watch: {
    select_word: function () {
      if (this.select_word === '') {
        this.tableData = this.tempDate
      } else {
        this.tableData = []
        for (let item of this.tempDate) {
          if (item.title.includes(this.select_word)) {
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
    uploadUrl (id) {
      return `${this.$store.state.HOST}/songList/img/update?id=${id}`
    },
    // Nhận thông tin danh sách phát
    getData () {
      this.tableData = []
      this.tempDate = []
      HttpManager.getSongList().then((res) => {
        this.tableData = res
        this.tempDate = res
        this.currentPage = 1
      })
    },
    // Lấy trang hiện tại
    handleCurrentChange (val) {
      this.currentPage = val
    },
    getContent (id) {
      this.$router.push({path: '/listSong', query: {id: id}})
    },
    getComment (id) {
      this.$router.push({path: '/Comment', query: {id: id, type: 1}})
    },
    // Biên tập
    handleEdit (row) {
      this.idx = row.id
      this.form = {
        id: row.id,
        title: row.title,
        pic: row.pic,
        introduction: row.introduction,
        style: row.style
      }
      this.editVisible = true
    },
    // Lưu chỉnh sửa
    saveEdit () {
      let params = new URLSearchParams()
      params.append('id', this.form.id)
      params.append('title', this.form.title)
      params.append('pic', this.form.pic)
      params.append('introduction', this.form.introduction)
      params.append('style', this.form.style)
      HttpManager.updateSongListMsg(params)
        .then(res => {
          if (res.code === 1) {
            this.notify('Chỉnh sửa thành công', 'success')
            this.getData()
          } else {
            this.notify('Chỉnh sửa thất bại', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.editVisible = false
    },
    // Thêm danh sách phát
    addsongList () {
      let params = new URLSearchParams()
      params.append('title', this.registerForm.title)
      params.append('pic', '/img/songListPic/123.jpg')
      params.append('introduction', this.registerForm.introduction)
      params.append('style', this.registerForm.style)
      HttpManager.setSongList(params).then(res => {
        if (res.code === 1) {
          this.getData()
          this.registerForm = {}
          this.notify('Thêm thành công', 'success')
        } else {
          this.notify('Thêm thất bại', 'error')
        }
      }).catch(err => {
        console.log(err)
      })
      this.centerDialogVisible = false
    },
    // Xác nhận xóa
    deleteRow () {
      HttpManager.deleteSongList(this.idx)
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
.pagination {
    display: flex;
    justify-content: center;
}
</style>
