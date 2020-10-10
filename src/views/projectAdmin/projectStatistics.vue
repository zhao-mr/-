<!--项目统计-->
<template>
  <div class="statistic-container">
    <div class="count">
      <ul>
        <li>
          <span>项目数</span>
          <div>48个</div>
        </li>
        <li>
          <span>覆盖学院</span>
          <div>13个</div>
        </li>
        <li>
          <span>覆盖学科</span>
          <div>16个</div>
        </li>
        <li>
          <span>总学习人次</span>
          <div>49652次</div>
        </li>
        <li>
          <span>累计学习时长</span>
          <div>13700.7小时</div>
        </li>
        <li>
          <span>累计注册人次</span>
          <div>401人</div>
        </li>
        <div class="clear"></div>
      </ul>
    </div>
    <div class="chartBox">
      <div class="left chart">
        <p>学院分布<i class="el-icon-s-unfold" @click="switchTable('college')"></i></p>
        <div class="chart-content">
          <div id="chart1" style="width: 100%; height: 300px;" v-show="isCollegeEchart"></div>
          <div class="table" v-show="!isCollegeEchart">
            <el-table :data="collegeData" style="width: 100%">
              <el-table-column prop="date" label="日期" align="center">
              </el-table-column>
              <el-table-column prop="name" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="address" label="地址" align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="right chart">
        <p>学科分布<i class="el-icon-s-unfold" @click="switchTable('subject')"></i></p>
        <div class="chart-content">
          <div id="chart2" style="width: 100%; height: 300px" v-show="isSubjectEchart"></div>
          <div class="table" v-show="!isSubjectEchart">
            <el-table :data="subjectData" style="width: 100%">
              <el-table-column prop="date" label="日期" align="center">
              </el-table-column>
              <el-table-column prop="name" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="address" label="地址" align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="tabs">
        <ul>
          <li :class="{ active: isActive === 1 }" @click="handleSelect(1)">
            共享统计
          </li>
          <li :class="{ active: isActive === 2 }" @click="handleSelect(2)">
            校内教学
          </li>
          <li :class="{ active: isActive === 3 }" @click="handleSelect(3)">
            校外教学
          </li>
          <li :class="{ active: isActive === 4 }" @click="handleSelect(4)">
            申报统计
          </li>
        </ul>
      </div>
      <div class="tab-item">
        <div v-if="navItem === 1"><sharing-statistic /></div>
        <div v-if="navItem === 2 || navItem === 3"><teach :type="type" /></div>
        <div v-if="navItem === 4"><reporting-statistics /></div>
      </div>
    </div>
  </div>
</template>

<script>
import SharingStatistic from '@/components/SharingStatistic'
import Teach from '@/components/Teach'
import ReportingStatistics from '@/components/ReportingStatistics'

export default {
  name: "projectStatistics",
  components: {
    SharingStatistic,
    Teach,
    ReportingStatistics
  },
  data() {
    return {
      isActive: 1,
      option: null,
      isCollegeEchart: true,
      collegeData: [
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
      ],
      isSubjectEchart: true,
      subjectData: [
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
      ],
      navItem: 1,
      type: ''
    };
  },
  computed: {},
  mounted() {
    this.draw();
  },
  methods: {
    handleSelect(val) {
      this.isActive = val;
      this.navItem = val;
      if (this.isActive === 2) {
        this.type = 'inside'
      } else if (this.isActive === 3) {
        this.type = 'outside'
      }
    },
    draw() {
      this.option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "outside",
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
      };

      const myChart1 = this.$echarts.init(document.getElementById("chart1"));
      myChart1.setOption(this.option);
      window.addEventListener("resize", function () {
        myChart1.resize();
      });
      const myChart2 = this.$echarts.init(document.getElementById("chart2"));
      myChart2.setOption(this.option);
      window.addEventListener("resize", function () {
        myChart2.resize();
      });
    },
    switchTable(val) {
      console.log(val)
      if (val === 'college') {
        this.isCollegeEchart = !this.isCollegeEchart
      } else {
        this.isSubjectEchart = !this.isSubjectEchart
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.statistic-container {
  padding: 32px;
  .count {
    padding: 30px 0;
    border: 1px solid #f0f0f0;
    ul {
      display: flex;
      li {
        list-style: none;
        flex: 1;
        text-align: center;
        border-right: 1px solid #f0f0f0;
        padding: 0 20px;
        span {
          color: #787a7d;
          font-size: 12px;
        }
        div {
          margin-top: 12px;
          font-size: 20px;
          color: #121315;
        }
      }
      li:nth-child(6) {
        border-right: none;
      }
    }
  }
  .chartBox {
    margin-top: 20px;
    display: flex;
    .chart {
      flex: 1;
      border: 1px solid #e1e2e2;
      p {
        margin: 0;
        padding: 15px 20px;
        font-size: 14px;
        font-weight: 600;
        border-bottom: 1px solid #e1e2e2;
        i {
          font-size: 15px;
          margin-left: 10px;
        }
      }
      .chart-content {
        padding: 20px;
        .table {
          width: 100%;
          height: 300px;
          overflow-y: auto;
        }
      }
    }
    .left {
      margin-right: 2%;
    }
  }
  .main {
    margin-top: 20px;
    .tabs {
      height: 48px;
      border: 1px solid #e1e3e4;
      background-color: #f8f8f8;
      margin-bottom: 20px;
      ul {
        margin: 0;
        padding: 0;
        li {
          list-style: none;
          float: left;
          padding: 15px 20px;
          border-right: 1px solid #e1e3e4;
          cursor: pointer;
          font-size: 14px;
        }
        .active {
          margin-top: -3px;
          background-color: #fff;
          border-top: 3px solid #4aa6fc;
          border-bottom: 1px solid #e1e3e4;
        }
      }
    }
  }
}
</style>
