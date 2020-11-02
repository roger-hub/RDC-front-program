<template>
  <div class="wrapper" id="app" ref="app">
    <div class="each" ref="each">
      <div class="eachPartTitle jobTitle" @click="clickTitle">-优秀成员-</div>
    </div>
    <div id="main"></div>
    <el-table :data="tableData" stripe height="442" class="table">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="group" label="年级" width="180"></el-table-column>
      <el-table-column prop="companies" label="公司" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    clickTitle() {
      const each = this.$refs.each;
      this.$emit("showShadow", each);
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        color: ["#D65658"],
        title: {
          text: "进入互联网大厂的人数",
        },
        tooltip: {},
        xAxis: {
          data: [
            "字节跳动",
            "腾讯",
            "阿里巴巴",
            "电信",
            "依图科技",
            "Shopee虾皮",
          ],
          axisLabel: {
            interval: 0, //横轴信息全部显示
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "人数",
            type: "bar",
            barWidth: 30,
            data: [5, 3, 1, 1, 1, 1],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    let self = this;
    let target = this.$refs.app;
    let foo = function () {
      let oTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (Boolean(
        oTop >= (target.offsetTop-200) &&
        oTop <= target.offsetTop + target.offsetHeight
      )) {
        self.$emit('showExcellentMembers');
        self.drawChart();
        //只进行一次动画，避免每次滑动都重复动画
        window.removeEventListener("scroll", foo);
      }
    };
    window.addEventListener("scroll", foo);
  },
  data() {
    return {
      tableData: [
        {
          name: "王佛铖",
          group: "17级",
          companies: "字节跳动",
        },
        {
          name: "陈泽彬",
          group: "17级",
          companies: "字节跳动",
        },
        {
          name: "冯肇浩",
          group: "17级",
          companies: "字节跳动",
        },
        {
          name: "曹润佳",
          group: "17级",
          companies: "字节跳动",
        },
        {
          name: "陈健宇",
          group: "17级",
          companies: "字节跳动",
        },
        {
          name: "黎妍",
          group: "17级",
          companies: "Shopee虾皮",
        },
        {
          name: "袁健策",
          group: "17级",
          companies: "腾讯",
        },
        {
          name: "杨子聪",
          group: "14级",
          companies: "腾讯",
        },
        {
          name: "李育震",
          group: "14级",
          companies: "腾讯",
        },
        {
          name: "周云翔",
          group: "15级",
          companies: "阿里巴巴",
        },
        {
          name: "伍家义",
          group: "13级",
          companies: "依图科技",
        },
      ],
    };
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 210px auto 0;
}

.wrapper .title {
  width: 100%;
  text-align: center;
  font-size: 36px;
  color: #333333;
  font-weight: bolder;
}

#main {
  display: inline-block;
  width: 570px;
  height: 400px;
  padding: 20px;
  margin-top: 60px;
  margin-left: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}

.table {
  display: inline-block;
  width: 550px;
  margin-left: 20px;
  border: 1px solid #ccc;
}

.wrapper /deep/ .el-table__row--striped {
  background: #d65658;
}
</style>
