<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="grid-content bg-purple">时间范围</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div>
            <el-date-picker
              v-model="time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
              value-format="yyyy-MM-dd hh:mm:ss"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button size="mini" type="primary" @click="searchorder">查询</el-button>
        </div>
      </el-col>
    </el-row>
    <div id="echarts_div">您可以使用上方的查询模块，自由选择您想了解的时间段的订单统计，点击查询即可</div>
  </div>
</template>

<script>
import echarts from "echarts";
import { ordertotal } from "@/api/apis";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      orderTime: [],
      orderAmount: [],
      time: ""
    };
  },
  methods: {
    searchorder() {
      console.log(JSON.stringify(this.time));
      ordertotal(JSON.stringify(this.time)).then(res => {
        console.log(res.data);
        this.orderAmount = res.data.data.map(item => item.orderAmount);
        this.orderTime = res.data.data.map(item => {
          item.orderTime = item.orderTime.replace("T", " ").substr(0, 19);
          return item.orderTime;
        });

        let myecharts = echarts.init(document.getElementById("echarts_div"));
        let option = {
          title: {
            text: "订单数据"
          },
          xAxis: {
            type: "category",
            data: this.orderTime
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: this.orderAmount,
              type: "bar"
            }
          ]
        };
        myecharts.setOption(option);
      });
    }
  },

  mounted() {
    ordertotal(
      JSON.stringify(["2020-06-01 12:00:00", "2020-07-31 12:00:00"])
    ).then(res => {
      // console.log(res.data);
      this.orderAmount = res.data.data.map(item => item.orderAmount);
      this.orderTime = res.data.data.map(item => {
        item.orderTime = item.orderTime.replace("T", " ").substr(0, 19);
        return item.orderTime;
      });
      let myecharts = echarts.init(document.getElementById("echarts_div"));
      let option = {
        title: {
          text: "订单数据"
        },
        xAxis: {
          type: "category",
          data: this.orderTime
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.orderAmount,
            type: "bar"
          }
        ]
      };
      myecharts.setOption(option);
    });
    // let myecharts = echarts.init(document.getElementById("echarts_div"));
    // let option = {
    //   xAxis: {
    //     type: "category",
    //     data: this.orderTime
    //   },
    //   yAxis: {
    //     type: "value"
    //   },
    //   series: [
    //     {
    //       data: this.orderAmount,
    //       type: "bar"
    //     }
    //   ]
    // };
    // myecharts.setOption(option);
  }
};
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
}
#echarts_div {
  width: 100%;
  height: 600px;
}
</style>