<template>
  <div class="table">
    {{id}}
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> Thông tin bộ sưu tập
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
        <el-table-column prop="name" label="ca sĩ-bài hát"></el-table-column>
        <el-table-column label="Play" width="85">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Xóa bỏ</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Xóa chú thích công cụ -->
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
  name: 'collect-page',
  mixins: [mixin],
  props: ['id'],
  data () {
    return {
      tableData: [], // Ghi lại các bài hát để hiển thị
      tempDate: [], // Ghi âm bài hát, có thể ghi tạm thời danh sách các bài hát khi được sử dụng để tìm kiếm
      tempId: [], // Id của bài hát trong danh sách đĩa hát
      multipleSelection: [], // Ghi lại bài hát sẽ bị xóa
      delVisible: false, // Hiển thị hộp xóa
      select_word: '', // Ghi lại nội dung đã nhập vào ô nhập liệu
      idx: -1 // Ghi lại bài hát hiện đang bị xóa
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
  mounted () {
    this.getData()
  },
  methods: {
    // Nhận id bài hát yêu thích của người dùng thông qua id người dùng
    getData () {
      HttpManager.getCollectionOfUser(this.$route.query.id)
        .then(res => {
          this.tableData = []
          for (let item of res) {
            this.getSongList(item.songId)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // Nhận bài hát theo ID bài hát
    getSongList (id) {
      HttpManager.getSongOfId(id)
        .then(res => {
          this.tableData.push(res[0])
          this.tempDate.push(res[0])
        })
        .catch(err => {
          console.log(err)
        })
    },
    // Xóa một bài hát
    deleteRow () {
      HttpManager.deleteCollection(this.$route.query.id, this.idx.id)
        .then(res => {
          if (res) {
            this.getData()
            this.notify('Xóa thành công, giỏi lắm', 'success')
          } else {
            this.notify('Thất bại là mẹ thành công', 'error')
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
