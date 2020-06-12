<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark title">账号列表</div>
      </el-col>
    </el-row>
    <div id="table-div">
      <el-table
        ref="multipleTable"
        :data="tableData.data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column label="账号" width="120">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>-->
        <!-- 账号 -->
        <el-table-column label="账号" width="200px">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.account"></el-input>
            <span v-show="!scope.row.show">{{scope.row.account}}</span>
          </template>
        </el-table-column>
        <!-- 用户组 -->
        <el-table-column label="用户组" width="200px">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.userGroup"></el-input>
            <span v-show="!scope.row.show">{{scope.row.userGroup}}</span>
          </template>
        </el-table-column>

        <!-- 创建时间 -->
        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip width="300px"></el-table-column>

        <!-- 操作按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="centerDialogVisible = true;editBtn(scope.row.account,scope.row.userGroup,scope.row.id)"
            >编辑</el-button>
            <!-- <el-button @click="editBtn()">编辑</el-button> -->
            <el-button type="danger" @click="delBtn(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      ></el-pagination>
      <div style="margin-top: 20px">
        <!-- <el-button type="danger" @click="toggleSelection(multipleSelection)">批量删除</el-button> -->
        <el-button type="danger" @click="open(multipleSelection)">批量删除</el-button>
        <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
    <div id="model-div">
      <el-dialog title="修改账户" :visible.sync="centerDialogVisible" width="30%" center>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">账户</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light">
              <el-input v-model="model_acc" placeholder="请输入新账户"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">用户组</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light">
              <el-select v-model="select_value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editsave(model_id,model_acc,select_value)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { acclist } from "@/api/apis.js";
import { accdel } from "@/api/apis.js";
import { accsdel } from "@/api/apis.js";
import { edit } from "@/api/apis.js";
export default {
  data() {
    return {
      // 模态框
      centerDialogVisible: false,
      //model下拉框选项
      options: [
        {
          value: "超级管理员",
          label: "超级管理员"
        },
        {
          value: "普通管理员",
          label: "普通管理员"
        }
      ],
      // model下拉选则框选中值
      select_value: "",
      // model 账户
      model_acc: "",
      //model id
      model_id: "",
      // 账户列表
      tableData: [],
      //批量选择
      multipleSelection: [],
      //每条多少页
      pageSize: 5,
      //下拉框页数选择
      pageSizes: [5, 10, 15, 20],
      //默认页
      currentPage: 1
    };
  },

  methods: {
    //批量删除
    open(rows) {
      if (rows.length == 0 || !rows) {
        this.$message({
          message: "请先选择您要删除的数据",
          type: "error"
        });
        return;
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = rows.map(item => item.id);
          accsdel(JSON.stringify(ids)).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: "批量删除成功",
                type: "success"
              });
              acclist(this.currentPage, this.pageSize).then(res => {
                res.data.data.forEach(item => {
                  item.ctime = item.ctime.replace("T", " ").substr(0, 19);
                  // console.log(item.ctime)
                });
                this.tableData = res.data;
              });
            }
          });
        })
        .catch(() => {
          return;
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    //每页多少条
    handleSizeChange(pageSize) {
      acclist(this.currentPage, pageSize).then(res => {
        res.data.data.forEach(item => {
        item.ctime = item.ctime.replace("T", " ").substr(0, 19);
        // console.log(item.ctime)
      });
        this.tableData = res.data;
      });
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      acclist(val, this.pageSize).then(res => {
        res.data.data.forEach(item => {
        item.ctime = item.ctime.replace("T", " ").substr(0, 19);
        // console.log(item.ctime)
      });
        this.tableData = res.data;
      });
    },
    //单项删除
    delBtn(id) {
      // console.log(id);
      if (confirm("是否确认删除？此操作不可逆！！")) {
        accdel(id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            acclist(this.currentPage, this.pageSize).then(res => {
              res.data.data.forEach(item => {
        item.ctime = item.ctime.replace("T", " ").substr(0, 19);
        // console.log(item.ctime)
      });
              this.tableData = res.data;
            });
          }
        });
      }
    },
    // 点击编辑
    editBtn(acc, group, id) {
      // console.log(acc)
      // console.log(value)
      // console.log(id)
      this.model_acc = acc;
      this.select_value = group;
      this.model_id = id;
    },
    // 编辑确定
    editsave(acc, group, id) {
      edit(acc, group, id).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          acclist(1, this.pageSize).then(res => {
            res.data.data.forEach(item => {
              item.ctime = item.ctime.replace("T", " ").substr(0, 19);
              // console.log(item.ctime)
            });
            this.tableData = res.data;
          });
        } else {
          this.$message.error("操作失败，请稍后再试~~~");
        }
      });
      this.centerDialogVisible = false;
    }
  },
  // 初始化钩子函数，发送请求，调用用户数据
  created() {
    acclist(1, 5).then(res => {
      let list = res.data;
      list.data.forEach(element => {
        element["show"] = false;
        element["flag"] = true;
      });

      res.data.data.forEach(item => {
        item.ctime = item.ctime.replace("T", " ").substr(0, 19);
        // console.log(item.ctime)
      });
      this.tableData = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
#table-div {
  background: #fff;
  padding: 20px;
  .el-table {
    margin-bottom: 20px;
    border-bottom: 1px solid #c8dcf1;
  }
}
#model-div {
  .el-row {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
}
</style>