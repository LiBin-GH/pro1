<template>
  <div>
    <!-- 内容框 -->
    <el-container>
      <el-main>
        <el-row type="flex" justify="space-around">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="fl-div">
                <img src="../../assets/imgs/order.png" alt />
              </div>
              <div class="fr-div">
                <p>总订单</p>
                <p>{{totalOrder}}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="fl-div">
                <img src="../../assets/imgs/money.png" alt />
              </div>
              <div class="fr-div">
                <p>总销售额</p>
                <p>{{totalAmount}}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="fl-div">
                <img src="../../assets/imgs/dayorder.png" alt />
              </div>
              <div class="fr-div">
                <p>今日订单数</p>
                <p>{{todayOrder}}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple totayAmount">
              <div class="fl-div">
                <img src="../../assets/imgs/daymoney.png" alt />
              </div>
              <div class="fr-div">
                <p>今日销售额</p>
                <p>{{totayAmount}}</p>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-col :span="23">
              <div class="grid-content bg-purple-dark" id="echarts_div"></div>
            </el-col>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import echarts from "echarts";
//获取数据接口
import { gettotaldata } from "@/api/apis";
export default {
  data() {
    return {
      todayOrder: 0,
      totalAmount: 0,
      totalOrder: 0,
      totayAmount: 0
    };
  },
  mounted() {
    let echarts_div = echarts.init(document.getElementById("echarts_div"));
    gettotaldata().then(res => {
      let {
        xData,
        amountData,
        orderData,
        todayOrder,
        totalAmount,
        totalOrder,
        totayAmount
      } = res.data;
      this.todayOrder = todayOrder;
      this.totalAmount = totalAmount;
      this.totalOrder = totalOrder;
      this.totayAmount = totayAmount;

      // console.log(res);
      let option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: res.xData
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: false
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: amountData
          },
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: orderData
          }
        ]
      };
      echarts_div.setOption(option);
    });
    window.onresize = () => {
      this.$refs.first.echarts_div.resize();
    };
  }
};
</script>

<style lang="less" scoped>
.el-main {
  padding: 0;
  width: 100%;
  #echarts_div {
    width: 100%;
    height: 600px;
    background: #fff;
    overflow: hidden;
  }
  .el-col,
  .el-col-6 {
    .bg-purple-dark {
      width: 100%;
      background: #fff;
    }
    .echarts_div {
      background: #fff;
    }

    .grid-content,
    .bg-purple {
      background: #fff;
      padding: 20px;
      margin-right: 20px;
      margin-bottom: 40px;
      overflow: hidden;
      .fr-div {
        float: right;
        background: #fff;
        text-align: center;
        padding-right: 20px;
        p{
          font-size: 24px;
          line-height: 50px;
          color: #C1CBD6;
          margin: 0;
        }
        p:last-child{
          color:#000;
        }
      }
      .fl-div {
        float: left;
        background: #fff;
        img {
          width: 100px;
          height: 100px;
          margin-left: 20px;
        }
      }
    }
    .totayAmount {
      margin-right: 0;
    }
  }
}
</style>