<template>
  <div id="box">
    <el-row type="flex" align="middle" justify="space-around" class="row-bg">
      <el-col :span="1">
        <div>订单号</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-input size="mini" placeholder="请输入内容" v-model="searchorderNO"></el-input>
        </div>
      </el-col>
      <el-col :span="1">
        <div>收货人</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-input size="mini" placeholder="请输入内容" v-model="searchperson"></el-input>
        </div>
      </el-col>
      <el-col :span="1">
        <div>手机号</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-input size="mini" placeholder="请输入内容" v-model="searchphone"></el-input>
        </div>
      </el-col>
      <el-col :span="1">
        <div>订单状态</div>
      </el-col>
      <el-col :span="6">
        <div class="bg-purple">
          <el-select v-model="searchstate" placeholder="订单状态">
            <el-option v-for="item in statearr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <!-- 时间选择框 -->
    <el-row type="flex" align="middle" class="row-bg time-div">
      <el-col :span="1">
        <p>选择时间</p>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <el-date-picker
            v-model="searchtime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
            value-format="yyyy-MM-dd hh:mm:ss"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button type="primary" size="mini" @click="searchBtn">查询</el-button>
          <el-button size="mini" @click="searchcancelBtn">取消</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <el-table :data="tableData.data" border style="width: 100%">
      <el-table-column prop="orderNo" label="订单号" width="100px"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="phone" label="手机" width="130px"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="deliverAddress" label="收货地址" width="250px"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
      <el-table-column prop="remarks" label="用户备注"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="100px"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="100px"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100px">
        <template slot-scope="scope">
          <el-button type="text" @click="checkBtn(scope.row)" size="small">查看</el-button>
          <!-- <el-button @click="checkBtn(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button type="text" @click="editBtn(scope.row)" size="small">编辑</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
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

    <!-- model -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- 订单号 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">订单号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input v-model="orderNo" placeholder="订单号" :disabled="disabled"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 下单时间 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">下单时间</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input v-model="orderTime" placeholder="下单时间" :disabled="disabled"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 电话 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">电话</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input v-model="phone" placeholder="电话" :disabled="disabled"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 收货人 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">收货人</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input v-model="consignee" placeholder="收货人" :disabled="disabled"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 送货地址 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">地址</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input v-model="deliverAddress" placeholder="地址" :disabled="disabled"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 送达时间 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">送达时间</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input v-model="deliveryTime" placeholder="送达时间" :disabled="disabled"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 备注 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">备注</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input v-model="remarks" placeholder="备注" :disabled="disabled"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 金额 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">订单金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input-number
              v-model="orderAmount"
              :min="1"
              :max="1000"
              label="金额"
              :disabled="disabled"
            ></el-input-number>
          </div>
        </el-col>
      </el-row>
      <!-- 状态 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">状态</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-select v-model="orderState" placeholder="订单状态" :disabled="disabled">
              <el-option v-for="(item,index) in statearr" :key="index" :value="item"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editcancelBtn">取 消</el-button>
        <el-button type="primary" @click="editsaveBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderlist } from "@/api/apis";
import { orderedit } from "@/api/apis";
export default {
  methods: {
    //model
    handleClose() {
      this.dialogVisible = false;
    },
    //查看按钮
    checkBtn(row) {
      this.dialogVisible = true;
      this.disabled = true;
      // console.log(row);
      this.orderNo = row.orderNo;
      this.orderTime = row.orderTime;
      this.phone = row.phone;
      this.consignee = row.consignee;
      this.deliverAddress = row.deliverAddress;
      this.deliveryTime = row.deliveryTime;
      this.remarks = row.remarks;
      this.orderAmount = row.orderAmount;
      this.orderState = row.orderState;
    },
    //编辑按钮
    editBtn(row) {
      this.dialogVisible = true;
      this.disabled = false;
      this.id = row.id;
      this.orderNo = row.orderNo;
      this.orderTime = row.orderTime;
      this.phone = row.phone;
      this.consignee = row.consignee;
      this.deliverAddress = row.deliverAddress;
      this.deliveryTime = row.deliveryTime;
      this.remarks = row.remarks;
      this.orderAmount = row.orderAmount;
      this.orderState = row.orderState;
      // console.log(row);
    },
    //保存编辑
    editsaveBtn() {
      this.dialogVisible = false;
      // console.log(JSON.stringify(this.deliveryTime),this.orderTime)
      orderedit(
        this.id,
        this.orderNo,
        this.orderTime,
        this.phone,
        this.consignee,
        this.deliverAddress,
        this.deliveryTime,
        this.remarks,
        this.orderAmount,
        this.orderState
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message.error("保存失败，请稍后再试~~~");
        }
      });
    },
    //取消编辑
    editcancelBtn() {
      this.dialogVisible = false;
      this.orderNo = "";
      this.orderTime = "";
      this.phone = "";
      this.consignee = "";
      this.deliverAddress = "";
      this.deliveryTime = "";
      this.remarks = "";
      this.orderAmount = "";
      this.orderState = "";
    },
    // 列表刷新函数
    refreshtable(currentPage) {
      orderlist(currentPage, this.pageSize).then(res => {
        // console.log(res.data.data)
        res.data.data.forEach(item => {
          item.deliveryTime = item.deliveryTime.replace("T", " ").substr(0, 19);
          // console.log(item.deliveryTime)
          item.orderTime = item.orderTime.replace("T", " ").substr(0, 19);
          // console.log(item.orderTime)
        });
        // console.log(res.data.data.ctime)
        this.tableData = res.data;
      });
    },
    //查询列表刷新
    searchRefreshtable(currentPage) {
      orderlist(
        currentPage,
        this.pageSize,
        this.searchorderNO,
        this.searchperson,
        this.searchphone,
        this.searchstate,
        JSON.stringify(this.searchtime)
      ).then(res => {
        res.data.data.forEach(item => {
          item.deliveryTime = item.deliveryTime.replace("T", " ").substr(0, 19);
          // console.log(item.deliveryTime)
          item.orderTime = item.orderTime.replace("T", " ").substr(0, 19);
          // console.log(item.orderTime)
        });
        // console.log(res.data.data.ctime)
        this.tableData = res.data;
      });
    },
    // 分页器函数
    handleSizeChange(val) {
      if (
        this.searchorderNO ||
        this.searchperson ||
        this.searchphone ||
        this.searchstate ||
        JSON.stringify(this.searchtime)
      ) {
        this.pageSize = val;
        this.searchRefreshtable(this.currentPage);
      } else {
        this.pageSize = val;
        this.refreshtable(this.currentPage);
      }
    },
    handleCurrentChange(val) {
      if (
        this.searchorderNO ||
        this.searchperson ||
        this.searchphone ||
        this.searchstate ||
        JSON.stringify(this.searchtime)
      ) {
        this.currentPage = val;
        this.searchRefreshtable(this.currentPage);
      } else {
        this.currentPage = val;
        this.refreshtable(this.currentPage);
      }
    },
    //查询
    searchBtn() {
      this.currentPage = 1;
      this.searchRefreshtable(this.currentPage);
      console.log(this.searchtime)
    },
    //取消查询
    searchcancelBtn() {
      this.searchorderNO = "";
      this.searchperson = "";
      this.searchphone = "";
      this.searchstate = "";
      this.searchtime = "";
      this.refreshtable(this.currentPage);
    }
  },
  data() {
    return {
      disabled: false,
      //model
      dialogVisible: false,
      //每页多少条数据
      pageSize: 5,
      //下拉框页数选择
      pageSizes: [5, 10, 15, 20],
      //默认页
      currentPage: 1,
      //订单状态数组
      statearr: ["已完成", "已受理", "派送中"],
      //获取列表数组
      tableData: [],
      //搜索订单号
      searchorderNO: "",
      //搜索收货人
      searchperson: "",
      //搜索手机
      searchphone: "",
      //搜索状态
      searchstate: "",
      //搜索时间
      searchtime: [],
      //model
      id: "",
      orderNo: "",
      orderTime: [],
      phone: "",
      consignee: "",
      deliverAddress: "",
      deliveryTime: [],
      remarks: "",
      orderAmount: "",
      orderState: ""
    };
  },
  created() {
    this.refreshtable(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
#box {
  background: #fff;
  padding: 15px;
  .el-row {
    margin-bottom: 10px;
  }
  .time-div {
    margin-bottom: 25px;
  }
  .grid-content {
    text-indent: 0px;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>