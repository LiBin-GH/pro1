<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark title">商品添加</div>
      </el-col>
    </el-row>
    <div id="box">
      <!-- 名称 -->
      <el-row>
        <el-col :span="2">
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
        <el-col :span="2">
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
        <el-col :span="2">
          <div class="grid-content bg-purple">商品价格</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-input-number v-model="price" :min="1" :max="1000" label="描述文字"></el-input-number>
          </div>
        </el-col>
      </el-row>
      <!-- 图片 -->
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">商品图片</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="img" :src="img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <!-- 描述 -->
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">商品描述</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-input type="textarea" :rows="2" placeholder="请输入商品描述内容" v-model="goodsDesc"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 添加 -->
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="addgoodsBtn">添加商品</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
//商品分类接口
import { goodscatelist } from "@/api/apis";
import { addgoods } from "@/api/apis";

export default {
  data() {
    return {
      img:'',
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
      category: ""
    };
  },
  methods: {
    //图片上传成功
    handleAvatarSuccess(res, file) {
      this.img = URL.createObjectURL(file.raw);
      this.imgUrl = res.imgUrl
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
    //添加
    addgoodsBtn() {
      // console.log(this.goodsDesc);
      console.log(this.imgUrl);
      // console.log(this.price);
      // console.log(this.name);
      // console.log(this.category);
      addgoods(
        this.name,
        this.category,
        this.price,
        this.imgUrl,
        this.goodsDesc
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "商品添加成功!"
          });
          this.name = "";
          this.category = "";
          this.imgUrl = "";
          this.goodsDesc = "";
          this.price = "";
        } else {
          this.$message.error({
            title: "错误",
            message: "添加商品失败，请稍后再试"
          });
        }
      });
    }
  },
  created() {//初始化即获取商品分类
    goodscatelist(1, 1000).then(res => {
      // console.log( res.data)
      this.catelist = res.data.data.map(item => (item = item.cateName));
      // console.log(this.catelist)
    });
  }
};
</script>

<style lang="less" scoped>
.title {
  background: #fff;
  padding: 20px;
  border-bottom: 1px solid #c8dcf1;
}
#box {
  background: #fff;
  padding: 20px;
  .el-row {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed blue;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>