<template>
  <div class="inside-teach">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="first">
        <template slot="title">
          <div class="usage-header">
            <div style="margin-right: 80px">使用情况</div>
            <el-radio-group size="small" v-model="usageRadio">
              <el-radio-button label="experiment">实验布置伦次</el-radio-button>
              <el-radio-button label="student">学生使用人次</el-radio-button>
            </el-radio-group>
            <div style="margin: 0 40px">
              <label>学年：</label>
              <el-select v-model="yearSelect1" placeholder="请选择">
                <el-option
                  v-for="item in yearList"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <label>学期：</label>
              <el-select v-model="termSelect1" placeholder="请选择">
                <el-option
                  v-for="item in termList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
        <div class="collapse-content usage">
          <div id="usageChart" style="width: 100%; height: 500px"></div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="second">
        <template slot="title">
          <div class="score-distribution-header">
            <div style="margin-right: 80px">成绩分布</div>
            <el-select v-model="experimentSelect" placeholder="请选择">
              <el-option
                v-for="item in experimentList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div style="margin: 0 40px">
              <label>学年：</label>
              <el-select v-model="yearSelect2" placeholder="请选择">
                <el-option
                  v-for="item in yearList"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <label>学期：</label>
              <el-select v-model="termSelect2" placeholder="请选择">
                <el-option
                  v-for="item in termList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
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
          <div class="detailed-data-header">
            <div style="margin-right: 10px">详细数据</div>
            <i class="el-icon-download"></i>
            <div style="margin: 0 40px 0 50px;">
              <label>学年：</label>
              <el-select v-model="yearSelect3" placeholder="请选择">
                <el-option
                  v-for="item in yearList"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <label>学期：</label>
              <el-select v-model="termSelect3" placeholder="请选择">
                <el-option
                  v-for="item in termList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
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
  name: "InsideTeach",
  data() {
    return {
      activeNames: ["first", "second", "three"],
      usageRadio: "experiment",
      yearSelect1: null,
      termSelect1: null,
      yearSelect2: null,
      termSelect2: null,
      yearSelect3: null,
      termSelect3: null,
      yearList: ["2020", "2019", "2018"],
      termList: [
        {
          label: "春季",
          value: "spring",
        },
        {
          label: "秋季",
          value: "autumn",
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
      const usageChart = this.$echarts.init(
        document.getElementById("usageChart")
      );
      const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        dataZoom: [
          {
            type: "inside",
          },
          {
            type: "slider",
          },
        ],
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      };

      usageChart.setOption(option);
      window.addEventListener("resize", function () {
        usageChart.resize();
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
.inside-teach {
  .collapse-content {
    width: 100%;
    border: 1px solid #f0f0f0;
    padding: 20px;
  }
  .usage-header {
    display: flex;
    align-items: center;
    label {
      color: #787a7d;
    }
  }
  .score-distribution-header {
    display: flex;
    label {
      color: #787a7d;
    }
  }
  .detailed-data-header {
    display: flex;
    align-items: center;
    label {
      color: #787a7d;
    }
    i {
      font-size: 16px;
      font-weight: 900;
      line-height: 48px;
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
// 使用情况中下拉框高度
::v-deep .el-input__inner {
  height: 30px;
}
</style>
