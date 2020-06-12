<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark title">添加账号</div>
      </el-col>
    </el-row>
    <div id="box">
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">账户</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-input v-model="input_user" placeholder="请输入新账户"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">密码</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-input placeholder="请设置密码" v-model="input_pwd" show-password></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">用户组</div>
        </el-col>
        <el-col :span="2">
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
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-dark btn">
            <el-button type="primary" @click="add">添加</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-dark btn">
            <el-button @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { accAdd } from "@/api/apis.js";
export default {
  data() {
    return {
      input_pwd: "",
      input_user: "",
      //下拉框选项
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
      // 下拉选则框选中值
      select_value: ""
    };
  },
  methods: {
    add() {
      accAdd(this.input_user, this.input_pwd, this.select_value).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加账号成功！！！",
            type: "success"
          });
          this.input_user = "";
          this.input_pwd = "";
          this.select_value = "";
        } else {
          this.$message.error("添加失败，请稍后再试~~~");
        }
      });
    },
    reset() {
      this.input_user = "";
      this.input_pwd = "";
      this.select_value = "";
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
    .grid-content:not(.btn) {
      text-align: center;
    }
  }
}
</style>