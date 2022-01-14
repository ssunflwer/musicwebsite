<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button class="handle-del mr10" type="primary" size="mini" @click="delAll">Xóa hàng loạt</el-button>
        <el-input v-model="select_word" class="handle-input mr10" size="mini" placeholder="Lọc từ khóa"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">Thêm ca sĩ</el-button>
      </div>
      <el-table ref="multipleTable" size="mini" border style="width: 100%" height="550px" :data="data" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="Ava" width="110" align="center">
          <template slot-scope="scope">
            <div class="singer-img">
              <img :src="getUrl(scope.row.pic)" alt="" style="width: 100%;"/>
            </div>
            <el-upload
              class="upload-demo"
              :action="uploadUrl(scope.row.id)"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              >
              <el-button size="mini">Sửa ava</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Tên" width="120" align="center"></el-table-column>
        <el-table-column label="Gtính" width="50" align="center">
          <template slot-scope="scope">
            <div>{{changeSex(scope.row.sex) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="NSinh" width="120" align="center">
          <template slot-scope="scope">
              <div>{{attachBirth(scope.row.birth) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="location" label="Khu vực" width="100" align="center"></el-table-column>
        <el-table-column label="Mô tả">
          <template slot-scope="scope">
            <p style="height: 100px; overflow: scroll">{{ scope.row.introduction }}</p>
          </template>
        </el-table-column>
        <el-table-column label="DS Bài hát" width="110" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="songEdit(scope.row.id, scope.row.name)">Bài hát</el-button>
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
          background
          layout="total, prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="tableData.length"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="Thêm ca sĩ" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form
        class="demo-ruleForm"
        :model="registerForm"
        status-icon
        ref="registerForm"
        label-width="80px"
        >
        <el-form-item prop="name" label="Tên" size="mini">
          <el-input v-model="registerForm.name" placeholder="Tên"></el-input>
        </el-form-item>
        <el-form-item label="Giới tính" size="mini">
          <el-radio-group v-model="registerForm.sex">
            <el-radio :label="0">Nữ</el-radio>
            <el-radio :label="1">Nam</el-radio>
            <el-radio :label="2">Nhóm nhạc</el-radio>
            <el-radio :label="3">Chưa rõ</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="location" label="Quốc gia" size="mini">
          <el-input v-model="registerForm.location" placeholder="Quốc gia"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="NSinh" size="mini">
          <el-date-picker
            type="date"
            placeholder="Chọn ngày"
            v-model="registerForm.birth"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="introduction" label="Mô tả" size="mini">
          <el-input v-model="registerForm.introduction" type="textarea" placeholder="Giới thiệu ca sĩ"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button size="mini" @click="centerDialogVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" size="mini" @click="addsinger">Xác nhận</el-button>
      </span>
    </el-dialog>

    <!-- Chỉnh sửa cửa sổ bật lên -->
    <el-dialog title="Chỉnh sửa" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="Tên" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Gtính" size="mini">
          <el-radio-group v-model="form.sex">
            <el-radio :label="0">Nữ</el-radio>
            <el-radio :label="1">Nam</el-radio>
            <el-radio :label="2">Nhóm nhạc</el-radio>
            <el-radio :label="3">Chưa rõ</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="NSinh" size="mini">
          <el-date-picker type="date" placeholder="Chọn ngày" v-model="form.birth" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="KVực" size="mini">
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item label="Mô tả" size="mini">
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini"  @click="editVisible = false">Hủy bỏ</el-button>
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
import { mixin } from '../mixins'
import { HttpManager } from '../api/index'

export default {
  name: 'singer-page',
  mixins: [mixin],
  data () {
    return {
      registerForm: {
        // Thêm thông tin hộp
        name: '',
        sex: '',
        birth: '',
        location: '',
        introduction: ''
      },
      tableData: [],
      tempDate: [],
      multipleSelection: [],
      centerDialogVisible: false,
      editVisible: false,
      delVisible: false,
      select_word: '',
      form: {
        // Chỉnh sửa thông tin hộp
        id: '',
        name: '',
        sex: '',
        pic: '',
        birth: '',
        location: '',
        introduction: ''
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
    // Lấy trang hiện tại
    handleCurrentChange (val) {
      this.currentPage = val
    },
    uploadUrl (id) {
      return `${this.$store.state.HOST}/singer/avatar/update?id=${id}`
    },
    // Thêm ca sĩ
    addsinger () {
      let d = this.registerForm.birth
      let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      let params = new URLSearchParams()
      params.append('name', this.registerForm.name)
      params.append('sex', this.registerForm.sex)
      params.append('pic', '/img/singerPic/hhh.jpg')
      params.append('birth', datetime)
      params.append('location', this.registerForm.location)
      params.append('introduction', this.registerForm.introduction)
      HttpManager.setSinger(params)
        .then(res => {
          if (res.code === 1) {
            this.getData()
            this.registerForm = {}
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
    // Nhận một ca sĩ
    getData () {
      this.tableData = []
      this.tempDate = []
      HttpManager.getAllSinger().then(res => {
        this.tableData = res
        this.tempDate = res
        this.currentPage = 1
      })
    },
    // Biên tập
    handleEdit (row) {
      this.editVisible = true
      this.idx = row.id
      let datetime = row.birth
      this.form = {
        id: row.id,
        name: row.name,
        sex: row.sex,
        pic: row.pic,
        birth: datetime,
        location: row.location,
        introduction: row.introduction
      }
    },
    // Lưu chỉnh sửa
    saveEdit () {
      let d = new Date(this.form.birth)
      let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      let params = new URLSearchParams()
      params.append('id', this.form.id)
      params.append('name', this.form.name)
      params.append('sex', this.form.sex)
      params.append('pic', this.form.pic)
      params.append('birth', datetime)
      params.append('location', this.form.location)
      params.append('introduction', this.form.introduction)
      HttpManager.updateSingerMsg(params)
        .then(res => {
          if (res.code === 1) {
            this.getData()
            this.notify('Chỉnh sửa thành công', 'success')
          } else {
            this.notify('Chỉnh sửa thất bại', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.editVisible = false
    },
    // Xác nhận xóa
    deleteRow () {
      HttpManager.deleteSinger(this.idx)
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
    },
    songEdit (id, name) {
      this.$router.push({path: `/song`, query: {id: id, name: name}})
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

.singer-img {
  width: 100%;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>
