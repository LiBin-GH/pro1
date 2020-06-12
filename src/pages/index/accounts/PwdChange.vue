<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark title">修改密码</div>
      </el-col>
    </el-row>
    <div id="box">
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">原密码</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-input v-model="oldpwd" placeholder="请输入原密码" @blur="checkoldpwd"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">新密码</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-input placeholder="请输入新密码" v-model="newpwd" show-password @blur="checknewpwd"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">确认新密码</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-input placeholder="再次输入密码" v-model="againpwd" show-password @blur="againnewpwd"></el-input>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="editpwd">确定</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-dark">
            <el-button @click="reset">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { checkpwd } from "@/api/apis.js";
import { editpwd } from "@/api/apis.js";
export default {
  data() {
    return {
      oldpwd: "",
      oldpwdflag: false,
      newpwd: "",
      newpwdflag: false,
      againpwd: "",
      againpwdflag: false,
      options: [
        {
          value: "选项1",
          label: "超级管理员"
        },
        {
          value: "选项2",
          label: "普通管理员"
        }
      ],
      select_value: ""
    };
  },
  methods: {
    checkoldpwd() {
      let id = JSON.parse(sessionStorage.getItem("id"));
      checkpwd(this.oldpwd, id).then(res => {
        if (res.data.code !== 0) {
          this.$message.error("原密码错误");
          this.oldpwdflag = false;
          return;
        } else {
          this.oldpwdflag = true;
        }
      });
    },
    checknewpwd() {
      if (this.newpwd == this.oldpwd) {
        this.$message.error("与原密码相同");
        this.newpwdflag = false;
        return;
      } else {
        this.newpwdflag = true;
      }
    },
    againnewpwd() {
      if (this.newpwd !== this.againpwd) {
        this.$message.error("两次密码不一致");
        this.againpwdflag = false;
        return;
      } else {
        this.againpwdflag = true;
      }
    },
    editpwd() {
      this.checkoldpwd
      this.checknewpwd
      this.againnewpwd
      let id = JSON.parse(sessionStorage.getItem("id"));
      if (this.oldpwdflag && this.newpwdflag && this.againpwdflag) {
        editpwd(this.newpwd, id).then(res => {
          if (res.data.code !== 0) {
            this.$message.error("密码修改失败，请稍后再试~~~");
            return;
          } else {
            this.$message({
              message: "恭喜您，登录成功！！！跳转登录中~~~",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push("/");
            }, 1500);
          }
        });
      } else {
        this.$message.error("请确认输入正确");
        return
      }
    },
    reset() {
      this.oldpwd = "";
      this.newpwd = "";
      this.againpwd = "";
    }
  }
};
</script>

<style lang="less" scoped>
#box {
  background: #fff;
  padding: 20px;
  .el-row {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
  }
}
</style>