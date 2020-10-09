<template>
  <div class="sharing-statistic">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="实验热度" name="first">
        <div class="collapse-content experimental-heat">
          <div class="cons-row1">
            <div class="sort">
              <span>排名：</span>
              <el-radio-group v-model="sortRadio" size="small">
                <el-radio-button label="top3"></el-radio-button>
                <el-radio-button label="top2"></el-radio-button>
                <el-radio-button label="top1"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="date">
              <span>时间：</span>
              <el-radio-group v-model="dateRadio" size="small">
                <el-radio-button label="week">最近7天</el-radio-button>
                <el-radio-button label="month">最近30天</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="cons-row2">
            <span>依据：</span>
            <el-radio-group v-model="basisRadio" size="small">
              <el-radio-button label="hits">点击量</el-radio-button>
              <el-radio-button label="learner">学习人次</el-radio-button>
              <el-radio-button label="complete">完成人次</el-radio-button>
              <el-radio-button label="time">学习时长</el-radio-button>
            </el-radio-group>
          </div>
          <div id="personTimeChart" style="width: 100%; height: 500px"></div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="second">
        <template slot="title">
          <div class="score-distribution-header">
            <div style="margin-right: 80px">成绩分布</div>
            <el-select
              v-model="experimentSelect"
              placeholder="请选择"
            >
              <el-option
                v-for="item in experimentList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div style="margin: 0 40px">
              <label>优秀率：<span>100%</span></label>
            </div>
            <div>
              <label>及格率：<span>100%</span></label>
            </div>
          </div>
        </template>
        <div class="collapse-content score-distribution">
          <div
            id="scoreDistributionChart"
            style="width: 100%; height: 500px"
          ></div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="three">
        <template slot="title">
          <div class="score-distribution-header">
            <div style="margin-right: 10px">详细数据</div>
            <i class="el-icon-download"></i>
          </div>
        </template>
        <div class="collapse-content detailed-data">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "SharingStatistic",
  data() {
    return {
      activeNames: ["first", "second", "three"],
      sortRadio: "top3",
      dateRadio: "week",
      basisRadio: "hits",
      experimentSelect: "",
      experimentList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ]
    };
  },
  mounted() {
    this.draw1();
    this.draw2();
  },
  methods: {
    draw1() {
      const personTimeChart = this.$echarts.init(
        document.getElementById("personTimeChart")
      );
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"],
        },
        dataZoom: [
          {
            type: "inside",
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: "empty",
            width: 30,
            height: "80%",
            showDataShadow: false,
            top: "center",
            right: 0,
          },
        ],
        series: [
          {
            type: "bar",
            data: [19325, 23438, 31000, 121594, 134141, 681807],
          },
        ],
      };
      personTimeChart.setOption(option);
      window.addEventListener("resize", function () {
        personTimeChart.resize();
      });
    },
    draw2() {
      const scoreDistributionChart = this.$echarts.init(
        document.getElementById("scoreDistributionChart")
      );
      const option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          name: "(分)",
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          name: "(人)",
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      };
      scoreDistributionChart.setOption(option);
      window.addEventListener("resize", function () {
        scoreDistributionChart.resize();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.sharing-statistic {
  .collapse-content {
    width: 100%;
    border: 1px solid #f0f0f0;
    padding: 20px;
  }
  .experimental-heat {
    .cons-row1 {
      margin-bottom: 20px;
      .sort {
        display: inline-block;
        margin-right: 20px;
      }
      .date {
        display: inline-block;
      }
    }
  }
  .score-distribution-header {
    display: flex;
    i {
      font-size: 16px;
      font-weight: 900;
      line-height: 48px;
    }
    label {
      color: #787a7d;
    }
  }
  .detailed-data {
    max-height: 600px;
    overflow-y: auto;
  }
}
// 去掉折叠面板头部和尾部的线
::v-deep .el-collapse {
  border-top: none;
  border-bottom: none;
}
// 折叠面板
::v-deep .el-collapse-item {
  margin-bottom: 20px;
}
// 折叠面板头部
::v-deep .el-collapse-item__header {
  padding: 0 20px;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid #e1e3e4;
}
// 去掉底部的线
::v-deep .el-collapse-item__wrap {
  border-bottom: none;
}
// 折叠面板内容
::v-deep .el-collapse-item__content {
  padding-bottom: 0;
}
</style>
