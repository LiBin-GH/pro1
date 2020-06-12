<template>
  <el-container>
    <!-- 导航框 -->
    <el-aside width="200px">
      <div class="grid-content">
        <el-col>
          <el-menu
            router
            unique-opened
            :default-active="navActive"
            class="el-menu-vertical-demo"
            background-color="#0a2440"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <!-- 管理系统图标 -->
            <el-menu-item>
              <i>
                <svg
                  t="1591198462380"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4420"
                  width="48"
                  height="48"
                >
                  <path
                    d="M512.26546 0c-278.26813 0-503.773775 225.566092-503.773775 503.773775 0 278.204661 225.504638 503.772768 503.773775 503.772768 278.26813 0 503.773775-225.566092 503.773775-503.772768C1016.039235 225.566092 790.533589 0 512.26546 0zM827.124699 755.660159 197.407228 755.660159c0 0-10.885354-62.973863 0-62.973863l629.716464 0L827.124699 755.660159 827.124699 755.660159zM827.124699 629.715456 197.407228 629.715456c0 0 0-41.331099 0-53.376013 0-164.624229 130.494287-236.944082 295.17997-246.969085-0.123915 1.598802 0-101.713835 0-101.713835l-43.293586 24.228853c-10.885354 0-15.742206-32.961315-15.742206-43.662308 0-10.699986 8.793915-19.30954 19.679269-19.30954l118.06957 0c10.887369 0 19.679269 8.609554 19.679269 19.30954 0 10.700993-4.855845 43.662308-15.743214 43.662308l-43.291571-24.228853 0 101.713835c164.685683 10.023995 295.178963 82.342841 295.178963 246.969085C827.124699 588.383349 827.124699 629.715456 827.124699 629.715456z"
                    p-id="4421"
                    fill="#1296db"
                  />
                </svg>
              </i>
              <span>
                <strong>
                  <big>外卖商家中心</big>
                </strong>
              </span>
            </el-menu-item>

            <div v-for="item in newtreeList" :key="item.index">
              <!-- submenu: 可展开带二级选项卡 -->
              <el-submenu v-if="item.children" :index="item.index">
                <template slot="title">
                  <i :class="item.iconClass"></i>
                  <span>{{ item.title }}</span>
                </template>

                <!-- 二级标题 -->
                <el-menu-item
                  v-for="child in item.children"
                  :key="child.index"
                  :index="child.index"
                >
                  <i :class="child.iconClass"></i>
                  <span slot="title">{{ child.title }}</span>
                </el-menu-item>
              </el-submenu>
              <!-- menu-item: 一级选项卡，不带展开 -->
              <el-menu-item v-else :index="item.index">
                <i :class="item.iconClass"></i>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-col>
      </div>
    </el-aside>
    <!-- 右框 -->
    <el-container>
      <!-- 头像栏 -->
      <el-header>
        <el-row type="flex" justify="space-between" class="row-bg">
          <el-col :span="12">
            <!-- 面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="item in breadList" :key="item">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="6">
            <!-- 用户头像 -->
            <div class="head-div">
              <span>欢迎您</span>
              <router-link to="/index/personal">
                <span>{{username}}</span>
              </router-link>
              <router-link to="/index/personal">
                <img :src="headimg" alt />
              </router-link>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 主要内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, getinfo } from "@/api/apis.js";
// import { headupload } from "@/api/apis.js";
export default {
  data() {
    return {
      //用户名
      username: "",
      //用户头像
      headimg: "",
      // 树菜单数组
      treeList: [
        {
          index: "/index/home",
          iconClass: "el-icon-s-home",
          title: "后台首页",
          role: ["normal", "super"]
        },
        {
          index: "/index/order",
          iconClass: "el-icon-s-order",
          title: "订单管理",
          role: ["normal", "super"]
        },
        {
          index: "/index/store",
          iconClass: "el-icon-office-building",
          title: "店铺管理",
          role: ["super"]
        },
        {
          index: "/index/goods",
          iconClass: "el-icon-goods",
          title: "商品管理",
          role: ["normal", "super"],
          children: [
            {
              index: "/index/goods/goodslist",
              iconClass: "",
              title: "商品列表"
            },
            {
              index: "/index/goods/goodsadd",
              iconClass: "",
              title: "商品添加"
            },
            {
              index: "/index/goods/goodsclass",
              iconClass: "",
              title: "商品分类"
            }
          ]
        },
        {
          index: "/index/sales",
          iconClass: "el-icon-s-home",
          title: "销售统计",
          role: ["super"],
          children: [
            {
              index: "/index/sales/salesgoods",
              iconClass: "",
              title: "商品统计"
            },
            {
              index: "/index/sales/salesorder",
              iconClass: "",
              title: "订单统计"
            }
          ]
        },
        {
          index: "/index/accounts",
          iconClass: "el-icon-time",
          title: "账号管理",
          role: ["super"],
          children: [
            {
              index: "/index/accounts/acclist",
              iconClass: "",
              title: "账号列表"
            },
            {
              index: "/index/accounts/accadd",
              iconClass: "",
              title: "添加账号"
            },
            {
              index: "/index/accounts/pwdchange",
              iconClass: "",
              title: "修改密码"
            }
          ]
        }
      ],
      //用户权限
      role: "",
      // 面包屑数组
      breadList: ["首页"],
      // 导航菜单激活样式
      navActive: ""
    };
  },
  methods: {
    // 根据hash值变化，切换面包屑
    changeBreadList(hash) {
      let arr = [];
      switch (hash) {
        case "/index/home":
          arr = ["首页"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
        case "/index/store":
          arr = ["店铺管理"];
          break;
        case "/index/goods/goodslist":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/goods/goodsadd":
          arr = ["商品管理", "商品添加"];
          break;
        case "/index/goods/goodsclass":
          arr = ["商品管理", "商品分类"];
          break;
        case "/index/sales/salesgoods":
          arr = ["销售统计", "商品统计"];
          break;
        case "/index/sales/salesorder":
          arr = ["销售统计", "订单统计"];
          break;
        case "/index/accounts/acclist":
          arr = ["账号管理", "账号列表"];
          break;
        case "/index/accounts/accadd":
          arr = ["账号管理", "添加账号"];
          break;
        case "/index/accounts/pwdchange":
          arr = ["账号管理", "修改密码"];
          break;
        case "/index/personal":
          arr = ["个人中心"];
          break;
      }
      this.breadList = arr;
    },
    uploadBtn() {
      console.log(11);
      console.log(this.fileList);
    }
  },
  computed: {
    //根据用户权限过滤返回新的树菜单数组
    newtreeList() {
      // let arr = this.treeList.filter((item)=>{
      //   return item.role.includes(this.role)
      // })
      // return arr
      return this.treeList.filter(item => item.role.includes(this.role));
    }
  },
  // 监听hash值变化
  watch: {
    $route: {
      handler: val => {
        //此处this指向不对，需要提前将this挂载到window上，然后取出this
        // 已经在created钩子函数中保存了this
        window._indexthis.changeBreadList(val.path);
      },
      deep: true
    }
  },
  created() {
    //初始化完毕，钩子函数
    // this.username = localStorage.getItem('user')
    // this.headimg = localStorage.getItem('headimg')
    //在初始化完毕后将这个this保存到window上
    window._indexthis = this;

    //获取当前页面hash值
    let hash = this.$route.path;

    //刷新页面，根据当前hash值改变导航菜单的激活对象
    this.navActive = hash;

    //根据当前hash值改变面包屑数组，面包屑正确显示当前页面
    this.changeBreadList(hash);
    getinfo(localStorage.getItem("id")).then(res => {
      // console.log(res)
      this.headimg = res.data.accountInfo.imgUrl;
    });
    //验证token
    checktoken(localStorage.getItem("token")).then(res => {
      if (res.data.code == 0) {
        // console.log(res)
        this.username = localStorage.getItem("user");
      } else {
        this.$message.error("登录状态已失效，跳转登陆中~~~");
        setTimeout(() => {
          this.$router.push("/");
        }, 1500);
      }
    });
    //权限
    this.role = localStorage.getItem("role");
  }
};
</script>

<style lang="less" scoped>
img {
  width: 60px;
}
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
  border: 1px dashed #409eff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-container {
  height: 100%;
  .el-aside {
    background: #0a2440;
    height: 100%;
    .el-menu {
      border-right: 0;
    }
  }
  .el-header {
    .row-bg {
      height: 60px;
    }
    .el-col {
      display: flex;
      align-items: center;
    }
    .head-div {
      display: flex;
      align-items: center;
    }
  }
  .el-main {
    background: #e9eef3;
  }
}
</style>