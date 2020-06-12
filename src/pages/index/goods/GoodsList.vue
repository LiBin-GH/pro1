<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark title" @click="refreshtable(currentPage)">商品列表</div>
      </el-col>
    </el-row>

    <div id="table-div">
      <!-- 列表 -->
      <el-table :data="tableData.data" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>-->
              <!-- <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>-->
              <!-- <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>-->
              <!-- <el-form-item label="商品图片">
                <img :src="img  + props.row.imgUrl" />
              </el-form-item>-->
              <!-- <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>-->
              <el-form-item label="商品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="评级">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 直接显示 -->
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="props">
            <img :src="img  + props.row.imgUrl" />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="editBtn(scope.row)">编辑</el-button>
            <el-button type="danger" @click="goodsdelBtn(scope.row.id)">删除</el-button>
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
      <!-- 编辑model框 -->
      <el-dialog
        id="model"
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <!-- 名称 -->
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">商品名称</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-input v-model="name" placeholder="商品名称"></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 分类 -->
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">商品分类</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-select v-model="category" placeholder="请选择商品分类">
                <el-option v-for="(item,index) in catelist" :key="index" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <!-- 价格 -->
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">商品价格</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-input-number v-model="price" :min="1" :max="1000" label="描述文字"></el-input-number>
            </div>
          </el-col>
        </el-row>
        <!-- 原图片 -->
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">原图</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                disabled
              >
                <img v-if="img+oldimg" :src="img+oldimg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">更换图片</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="editimg" :src="editimg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <!-- 描述 -->
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">商品描述</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-input type="textarea" :rows="2" placeholder="请输入商品描述内容" v-model="goodsDesc"></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveeditBtn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//获取商品列表
import { goodslist } from "@/api/apis";
//删除商品
import { goodsdel } from "@/api/apis";
//商品分类
import { goodscatelist } from "@/api/apis";

//编辑商品
import { editgoods } from "@/api/apis";
//获取分类名称
// import { getcatename } from "@/api/apis";

export default {
  data() {
    return {
      //编辑model框默认隐藏
      dialogVisible: false,
      // 列表数组
      tableData: [],
      //每页多少条数据
      pageSize: 5,
      //下拉框页数选择
      pageSizes: [5, 10, 15, 20],
      //默认页
      currentPage: 1,
      img: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      //原图
      oldimg: "",
      //更换图片
      editimg: "",
      //商品分类数组
      catelist: [],
      //商品描述
      goodsDesc: "",
      //商品图片
      imgUrl: "",
      //商品价格
      price: "2",
      //商品名称
      name: "",
      //商品分类
      category: "",
      //id
      id: ""
    };
  },

  methods: {
    // 列表刷新函数
    refreshtable(currentPage) {
      goodslist(currentPage, this.pageSize).then(res => {
        res.data.data.forEach(item => {
          item.ctime = item.ctime.replace('T',' ').substr(0,19)
          // console.log(item.ctime)
        });
        // console.log(res.data.data.ctime)
        this.tableData = res.data;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.refreshtable(this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refreshtable(this.currentPage);
    },
    //删除商品
    goodsdelBtn(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          goodsdel(id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.refreshtable(this.currentPage);
            } else {
              this.$notify.error({
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
    //编辑商品model框关闭按钮函数
    handleClose() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {
          this.dialogVisible = true;
        });
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      this.editimg = URL.createObjectURL(file.raw);
      this.imgUrl = res.imgUrl;
    },
    //图片验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //编辑
    editBtn(row) {
      this.dialogVisible = true;
      // console.log(row.goodsDesc);
      this.goodsDesc = row.goodsDesc;
      // console.log(row.imgUrl);
      this.oldimg = row.imgUrl;
      // console.log(row.price);
      this.price = row.price;
      // console.log(row.name);
      this.name = row.name;
      // console.log(row.category);
      this.category = row.category;
      // console.log(row.id);
      this.id = row.id;
    },
    //保存编辑
    saveeditBtn() {
      this.dialogVisible = false;
      // console.log(this.goodsDesc);
      // console.log(this.imgUrl);
      // console.log(this.price);
      // console.log(this.name);
      // console.log(this.category);
      // console.log(this.id);
      if(!this.imgUrl){
        this.imgUrl = this.oldimg
      }
      editgoods(
        this.name,
        this.category,
        this.price,
        this.imgUrl,
        this.goodsDesc,
        this.id
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.name = "";
          this.category = "";
          this.imgUrl = "";
          this.goodsDesc = "";
          this.price = "";
          this.id = "";
          this.refreshtable(this.currentPage)
        } else {
          this.$message.error({
            title: "错误",
            message: "修改失败，请稍后再试"
          });
          console.log(res)
        }
      });
    }
  },
  //初始化完毕钩子函数
  created() {
    this.refreshtable(this.currentPage);


    // getcatename().then(res=>{
    //   console.log(res)
    //   this.catelist = res.data
    // })
    goodscatelist(1, 1000).then(res => {
      // console.log( res.data)
      this.catelist = res.data.data.map(item => (item = item.cateName));
      // console.log(this.catelist)
    });
  }
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
#table-div {
  img {
    width: 60px;
  }
  .el-row {
    //   background: #fff;
    padding: 0px;
  }
  .cell {
    margin: 0;
  }
  background: #fff;
  padding: 20px;
  .el-table {
    margin-bottom: 20px;
  }
}
#model {
  .el-row {
    margin-bottom: 20px;
    padding: 0px;
  }
  img {
    width: 80px;
    height: 80px;
  }
}
// 图片上传框样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px dashed blue;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>