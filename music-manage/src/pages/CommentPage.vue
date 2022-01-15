<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> Thông tin bình luận
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" class="handle-del mr10" @click="delAll">Xóa hàng loạt</el-button>
        <el-input v-model="select_word" size="mini" placeholder="Lọc từ khóa" class="handle-input mr10"></el-input>
      </div>
      <el-table
        :data="tableData"
        size="mini"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="name" label="User"></el-table-column>
        <el-table-column prop="content" label="Bình luận"></el-table-column>
        <el-table-column label="Tác vụ" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">Chỉnh sửa</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">Xóa bỏ</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Chỉnh sửa cửa sổ bật lên -->
    <el-dialog title="Chỉnh sửa" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="Bình luận" size="mini">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" size="mini" @click="saveEdit">Chắc chắn</el-button>
      </span>
    </el-dialog>

    <!-- Xóa chú giải công cụ -->
    <el-dialog title="Gợi ý" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt" align="center">Không thể khôi phục thao tác xóa. Bạn có chắc chắn muốn xóa không?</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="delVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" size="mini" @click="deleteRow">Chắc chắn</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin } from '../mixins'
import { HttpManager } from '../api/index'

export default {
  name: 'comment-page',
  mixins: [mixin],
  data () {
    return {
      tableData: [],
      tempDate: [],
      multipleSelection: [],
      editVisible: false,
      delVisible: false,
      select_word: '',
      form: {
        id: '',
        userId: '',
        songId: '',
        songListId: '',
        content: '',
        type: '',
        up: ''
      },
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
    // Nhận ý kiến
    getData () {
      this.tableData = []
      this.tempDate = []
      let promise
      if (this.$route.query.type === 0) {
        promise = HttpManager.getCommentOfSongId(this.$route.query.id)
      } else if (this.$route.query.type === 1) {
        promise = HttpManager.getCommentOfSongListId(this.$route.query.id)
      }
      promise.then(res => {
        for (let item of res) {
          this.getUsers(item.userId, item)
        }
      })
    },
    getUsers (id, item) {
      HttpManager.getUserOfId(id)
        .then(res => {
          let o = item
          o.name = res[0].username
          this.tableData.push(o)
          this.tempDate.push(o)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // Edit
    handleEdit (row) {
      this.idx = row.id
      this.form = {
        id: row.id,
        userId: row.userId,
        songId: row.songId,
        songListId: row.songListId,
        content: row.content,
        type: row.type,
        up: row.up
      }
      this.editVisible = true
    },
    // Lưu chỉnh sửa
    saveEdit () {
      let params = new URLSearchParams()
      params.append('id', this.form.id)
      params.append('userId', this.form.userId)
      params.append('songId', this.form.songId === null ? '' : this.form.songId)
      params.append('songListId', this.form.songId === null ? '' : this.form.songListId)
      params.append('content', this.form.content)
      params.append('type', this.form.type)
      params.append('up', this.form.up)
      HttpManager.updateCommentMsg(params)
        .then(res => {
          if (res.code === 1) {
            this.getData()
            this.notify('Chỉnh sửa thành công nhaa', 'success')
          } else {
            this.notify('Lỗi ở đâu đó rồi', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.editVisible = false
    },
    // Xác nhận xóa
    deleteRow () {
      HttpManager.deleteComment(this.idx)
        .then(res => {
          if (res) {
            this.getData()
            this.notify('Xóa thành công hahaa', 'success')
          } else {
            this.notify('Xóa thất bại rồi, khum sao hết', 'error')
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
