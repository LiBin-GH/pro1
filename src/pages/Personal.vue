<template>
  <div id="admin">
    <div class="title">管理员信息</div>
    <div>
      <div>
        管理员ID：
        <span>{{ id }}</span>
      </div>
      <div>
        账号：
        <span>{{ acc }}</span>
      </div>
      <div>
        用户组：
        <span>{{ group }}</span>
      </div>
      <div>
        创建时间：
        <span>{{ ctime }}</span>
      </div>
      <div>
        头像：
        <img :src="oldimageUrl" alt />
      </div>
      <div>
        点击更换头像：
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="data"
        >
          <img v-if="newimageUrl" :src="newimageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { getinfo } from "@/api/apis.js";
export default {
  data() {
    return {
      id: "",
      acc: "",
      group: "",
      ctime: "",
      oldimageUrl: "",
      newimageUrl: "",
      data: { id: localStorage.getItem("id") }
    };
  },
  methods: {
    //头像上传成功
    handleAvatarSuccess(res, file) {

      this.newimageUrl = URL.createObjectURL(file.raw);
      // console.log(URL.createObjectURL(file.raw))
      window.location.reload();
      getinfo(this.id).then(() => {

      });
      this.oldimageUrl = URL.createObjectURL(file.raw);
    },
    //头像上传验证
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
    }
  },
  created() {//初始化钩子函数
    let id = localStorage.getItem("id");
    getinfo(id).then(res => {
      this.id = res.data.accountInfo.id;
      this.acc = res.data.accountInfo.account;
      this.group = res.data.accountInfo.userGroup;
      this.ctime = res.data.accountInfo.ctime.replace('T',' ').substr(0,19);
      this.oldimageUrl = res.data.accountInfo.imgUrl;
      //   console.log(this.headimg);
    });
  }
};
</script>

<style lang="less" scoped>
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
  margin-bottom: 20px;
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
img {
  width: 80px;
}
#admin {
  height: 100%;
  width: 100%;
  background: #fff;
  box-sizing: border-box;

  & > div {
    background: white;
    padding: 20px;
    div {
      line-height: 50px;
      border-bottom: 1px solid #f0f2f5;
    }
  }
}
</style>