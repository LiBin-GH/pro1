<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark title">
          <span>商品分类</span>
          <el-button type="primary" @click="centerDialogVisible = true">添加分类</el-button>
        </div>
      </el-col>
    </el-row>
    <div id="table-div">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <!-- 分类名称 -->
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.cateName"></el-input>
            <span v-show="!scope.row.show">{{scope.row.cateName}}</span>
          </template>
        </el-table-column>
        <!-- 是否启用开关 -->
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="!scope.row.show"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.show" @click="edit(scope.row)">编辑</el-button>
            <el-button type="success" v-else @click="edit(scope.row)">保存</el-button>
            <el-button type="danger" @click="goodscatedel(scope.row.id)">删除</el-button>
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
        :total="total"
      ></el-pagination>
      <!-- 添加分类model -->
      <div id="model">
        <el-dialog title="添加分类" :visible.sync="centerDialogVisible" width="30%" center>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">添加分类</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-input v-model="model_input" placeholder="请输入内容"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">是否启用</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-switch v-model="switch_model" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </div>
            </el-col>
          </el-row>

          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveaddcate">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
//商品分类接口
import { goodscatelist } from "@/api/apis";
//添加商品分类接口
import { addcate } from "@/api/apis";
//删除商品分类
import { goodsdelcate } from "@/api/apis";
//编辑商品分类
import { editcate } from "@/api/apis";
export default {
  data() {
    return {
      //模态框中的input框
      model_input: "",
      //是否显示模态框，默认隐藏
      centerDialogVisible: false,
      //添加分类中的开关
      switch_model: false,
      // 列表数组
      tableData: [],
      //总条数
      total: 0,
      //每页多少条数据
      pageSize: 5,
      //下拉框页数选择
      pageSizes: [5, 10, 15, 20],
      //默认页
      currentPage: 1
    };
  },

  methods: {
    //删除商品分类
    goodscatedel(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          goodsdelcate(id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.refreshtable(this.currentPage);
            } else {
              this.$message.error({
                title: "错误",
                message: "删除失败，请稍后再试"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑&保存
    edit(row) {
      row.show = !row.show;
      if (row.show == false) {
        row.state = row.state.toString(row.state);
        editcate(row.id, row.cateName, row.state).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.refreshtable(this.currentPage)
          } else {
            this.$message.error("保存失败，请稍后再试~~~");
          }
        });
      }else{
        for(let i of this.tableData){
          i.show = false
        }
        row.show = true

      }
    },
    //确定添加分类
    saveaddcate() {
      this.switch_model = this.switch_model.toString(this.switch_model);
      addcate(this.model_input, this.switch_model).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "商品分类添加成功",
            type: "success"
          });
          this.model_input = "";
          this.switch_model = false;
          this.refreshtable(this.currentPage);
        } else {
          this.$message.error("商品分类添加失败，请稍后再试~~~");
        }
      });
    },
    // 列表刷新函数
    refreshtable(currentPage) {
      goodscatelist(currentPage, this.pageSize).then(res => {
        this.total = res.data.total;
        if (this.total / this.pageSize + 1 == currentPage) {
          goodscatelist(currentPage-1, this.pageSize).then(res => {
            this.total = res.data.total;
            // console.log(res.data);
            let list = res.data.data;
            list.forEach(element => {
              element["show"] = false;
            });
            list.forEach(item => {
              if (item.state == 1) {
                item.state = true;
                // console.log(item.state)
              } else {
                item.state = false;
                // console.log(item.state)
              }
            });
            // console.log(list)
            this.tableData = list;
          });
        }else{
        // console.log(res.data);
        let list = res.data.data;
        list.forEach(element => {
          element["show"] = false;
        });
        list.forEach(item => {
          if (item.state == 1) {
            item.state = true;
            // console.log(item.state)
          } else {
            item.state = false;
            // console.log(item.state)
          }
        });
        // console.log(list)
        this.tableData = list;}
      });
    },
    //每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.refreshtable(this.currentPage);
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refreshtable(this.currentPage);
    }
  },
  //初始化完毕钩子函数
  created() {
    this.refreshtable(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
.title {
  position: relative;
  button {
    position: absolute;
    bottom: 2px;
    right: 30px;
  }
}
#table-div {
  background: #fff;
  padding: 20px;
  .el-table {
    margin-bottom: 20px;
  }
}
#model {
  .el-row:first-child {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>