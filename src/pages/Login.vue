<template>
  <div id="box">
    <div class="grid-content bg-purple login-div">
      <h3>外卖后台管理系统</h3>
      <p>
        <el-input placeholder="用户名" prefix-icon="el-icon-user-solid" v-model="user_input"></el-input>
      </p>
      <p>
        <el-input placeholder="密码" prefix-icon="el-icon-lock" show-password v-model="pwd_input"></el-input>
      </p>
      <p>
        <el-button type="primary" @click="loginBtn">登录</el-button>
      </p>
    </div>
  </div>
</template>

<script>
//引入登录接口函数
import { login } from "@/api/apis.js";
export default {
  data() {
    return {
      // 用户名输入值
      user_input: "",
      // 密码输入值
      pwd_input: "",
      // 防抖节流判定标杆
      isrequest: false
    };
  },
  methods: {
    loginBtn() {
      // 判断是否已经发送过请求
      if (this.isrequest) return; //已发送过
      // 未发送过，立即发送请求
      login(this.user_input, this.pwd_input).then(res => {
        if (res.data.code == 0) {
          //登录成功提示
          this.$message({
            message: "恭喜您，登录成功！！！页面跳转中，请稍后~~",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push("/index/home");
          }, 1500);
          // console.log(res)
          // 保存用户id, 用户名, 用户头像
          localStorage.setItem('id',res.data.id)
          localStorage.setItem('user',res.data.account)
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('headimg',res.data.imgUrl)
          localStorage.setItem('role',res.data.role)
        } else {
          //登录错误提示
          this.$message.error("登录失败，请确认用户名和密码是否正确");
        }
      });
      this.isrequest = true; //设置为已发送请求
      //定时器，在3秒后设置为未发送
      setTimeout(() => {
        this.isrequest = false;
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
#box {
  height: 100%;
  background-color: #0a2440;
}
.login-div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  width: 350px;
  height: 250px;
  h3 {
    color: #fff;
  }
  button {
    width: 100%;
  }
}
</style>

