<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark title">
          <span>店铺管理</span>
          <el-button type="primary" @click="editsave">保存</el-button>
        </div>
      </el-col>
    </el-row>
    <div id="box">
      <!-- 店铺名称 -->
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">店铺名称</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-input v-model="name" placeholder="请输入店铺名称"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 店铺公告 -->
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">店铺公告</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input type="textarea" :rows="2" placeholder="请输入店铺描述" v-model="bulletin"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 店铺头像 -->
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="img-div bg-purple">店铺头像</div>
        </el-col>
        <el-col :span="8">
          <div class="bg-purple">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="avatar" :src="imghead" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <!-- 店铺图片 -->
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="img-div bg-purple">店铺图片</div>
        </el-col>
        <el-col :span="11">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleSuccess"
            :file-list="fileList"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 配送费 -->
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">配送费</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-input v-model="deliveryPrice" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 配送时间 -->
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">配送时间</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-input v-model="deliveryTime" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 配送描述 -->
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">配送描述</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-input v-model="description" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 店铺评分 -->
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">店铺评分</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-input v-model="score" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 销量 -->
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">销量</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-input v-model="sellCount" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 活动 -->
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">活动</div>
        </el-col>
        <el-col :span="8">
          <div class="bg-purple-light">
            <el-checkbox-group v-model="checksupports" :max="5">
              <el-checkbox v-for="item in supports" :label="item" :key="item"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
      <!-- 营业时间 -->
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">营业时间</div>
        </el-col>
        <el-col :span="16">
          <div class="bg-purple-light">
            <!-- <el-date-picker
              v-model="date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd hh:mm:ss "
              value-format="yyyy-MM-dd hh:mm:ss"
            ></el-date-picker>-->
            <el-date-picker
              v-model="date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <!-- <button @click="time">1235</button> -->
    </div>
  </div>
</template>

<script>
import { getstoreinfo } from "@/api/apis";
import { shopedit } from "@/api/apis";
export default {
  data() {
    return {
      fileList: [], //图片数组
      dialogImageUrl: [], //保存图片数组
      dialogVisible: false,
      bulletin: "", //店铺公告
      name: "", //店铺名称
      deliveryPrice: "", //配送费
      deliveryTime: "", //配送时间
      description: "", //店铺描述
      score: "", //店铺评分
      sellCount: "", //店铺销量
      supports: [
        "在线支付满28减5",
        "VC无限橙果汁全场8折",
        "单人精彩套餐",
        "特价饮品8折抢购",
        "单人特色套餐"
      ],
      checksupports: [], //活动选项
      date: [], //营业时间
      img: "http://127.0.0.1:5000/upload/shop/", //图片地址
      avatar: "", //店铺头像
      imghead: "", //头像上传框显示
      id: "" //店铺id
      //时间
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 删除店铺图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let arr = this.dialogImageUrl.filter(i => {
        return !(this.img + i).includes(file.url);
      });
      this.dialogImageUrl = arr;
    },
    //上传成功
    handleSuccess(res) {
      // console.log(res);
      this.dialogImageUrl.push(res.imgUrl);
      // console.log(this.dialogImageUrl);
    },
    // 店铺头像
    handleAvatarSuccess(res, file) {
      this.imghead = URL.createObjectURL(file.raw);
      this.avatar = res.imgUrl;
    },
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
    //店铺保存修改
    editsave() {
      //发送保存请求
      shopedit(
        this.id,
        this.name,
        this.bulletin,
        this.avatar,
        this.deliveryPrice,
        this.deliveryTime,
        this.description,
        this.score,
        this.sellCount,
        JSON.stringify(this.checksupports),
        JSON.stringify(this.dialogImageUrl),
        JSON.stringify(this.date)
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        } else {
          this.$message.error({
            title: "错误",
            message: "保存失败，请稍后再试"
          });
        }
      });
      //刷新页面
      getstoreinfo().then(res => {
        let {
          avatar,
          bulletin,
          deliveryPrice,
          deliveryTime,
          description,
          name,
          score,
          sellCount,
          supports,
          pics,
          date,
          id
        } = res.data.data;
        this.sellCount = sellCount;
        this.avatar = avatar;
        this.deliveryPrice = deliveryPrice;
        this.deliveryTime = deliveryTime;
        this.bulletin = bulletin;
        this.description = description;
        this.name = name;
        this.score = score;
        this.checksupports = supports;
        this.dialogImageUrl = pics;
        this.date = date;
        this.id = id;
        this.imghead = this.img + this.avatar;
        let arr = [];
        for (let i of pics) {
          let obj = { url: this.img + i };
          arr.push(obj);
        }
        this.fileList = arr;
      });
    }
  },
  created() {
    //钩子函数
    getstoreinfo().then(res => {
      let {
        avatar,
        bulletin,
        deliveryPrice,
        deliveryTime,
        description,
        name,
        score,
        sellCount,
        supports,
        pics,
        date,
        id
      } = res.data.data;
      this.sellCount = sellCount;
      this.avatar = avatar;
      this.deliveryPrice = deliveryPrice;
      this.deliveryTime = deliveryTime;
      this.bulletin = bulletin;
      this.description = description;
      this.name = name;
      this.score = score;
      this.date = date;
      this.id = id;
      this.dialogImageUrl = pics;
      this.imghead = this.img + this.avatar;
      this.checksupports = supports;
      let arr = [];
      for (let i of pics) {
        let obj = { url: this.img + i };
        arr.push(obj);
      }
      this.fileList = arr;
    });
  }
};
</script>

<style lang="less" scoped>
.title {
  position: relative;
  button {
    position: absolute;
    bottom: 2px;
    right: 3%;
  }
}
#box {
  .grid-content {
    text-align: center;
    margin-right: 20px;
  }
  .img-div {
    text-align: center;
  }
  padding: 20px;
  background: #fff;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .shopimg-div {
      position: relative;
      .el-icon-delete {
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
    .el-upload {
      float: left;
    }
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
}
</style>