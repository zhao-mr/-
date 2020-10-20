<template>
  <div class="all-experiment">
    <div class="header">
      <div class="header-content">
        <div class="header-top">
          <div class="header-top-left">
            <img src="../../assets/homePage/logo.png" alt="">
            <ul>
              <li @click="toAllExperiment">全部实验</li>
              <li @click="toNews">资讯动态</li>
              <li @click="toDownload">下载中心</li>
            </ul>
          </div>
          <div class="header-top-right">
            <el-input
              placeholder="请输入实验名称"
              v-model="experimentName">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
            </el-input>
            <span @click="toPath('manager')" v-if="userName">进入</span>
            <span @click="toPath('login')" v-else>登录</span>
          </div>
        </div>
        <div class="header-font">
          <h1>虚拟仿真实验教学共享平台</h1>
          <div>创新教育·引领未来</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div style="background: #f6f7f8;">
        <div class="menu">
          <div class="college">
            <span>学院：</span>
            <div class="college-list">
              <span :class="{'active': selectCollege === null}" @click="handleCollege(null)">全部</span>
              <span 
                :class="{'active': selectCollege === item.collegeId}" 
                v-for="item in collegeList" 
                :key="item.collegeId"
                @click="handleCollege(item.collegeId)"
              >{{item.collegeName}}</span>
            </div>
          </div>
          <!-- <div class="centre">
            <span>中心：</span>
            <div class="centre-list">
              <span>国家级化学化工虚拟仿真实验教学中心</span>
              <span>国家级化学化工虚拟仿真实验教学中心</span>
              <span>国家级化学化工虚拟仿真实验教学中心</span>
              <span>国家级化学化工虚拟仿真实验教学中心</span>
            </div>
          </div> -->
        </div>
      </div>
      <div class="title">全部实验</div>
      <div class="course-list">

        <div class="course-item" v-for="item in courseList" :key="item.projectId">
          <img :src="url+item.cover" :alt="item.projectName">
          <div class="course-text">
            <p>{{item.projectName}}</p>
            <div class="course-info">
              <span class="level red" v-if="parseInt(item.projectRank) === 1">国家级</span>
              <span class="level pink" v-if="parseInt(item.projectRank) === 2">省级</span>
              <span class="level blue" v-if="parseInt(item.projectRank) === 3">市级</span>
              <span class="count">{{item.searchExperimentNums}}</span>
            </div>
          </div>
        </div>

      </div>
      <div class="pagination-box">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          hide-on-single-page
          style="margin-bottom: 30px;"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import { getCollegeList, getExperimentList } from '@/api/webAdmin'
import { apiPath } from '@/config/env'
  import { format } from 'echarts/lib/export'

export default {
  name: "AllExperiment",
  components: {
    Footer
  },
  data() {
    return {
      url: apiPath,
      experimentName: '',
      total: 0,
      userName: null,
      selectCollege: null,
      collegeList: [],
      pageNum: 1,
      pageSize: 10,
      courseList: []
    }
  },
  mounted() {
    this.userName = this.$store.state.user.name;
    this.getCollegeList();
    this.getCourseList();
  },
  methods: {
    toPath(value) {
      if(value === 'login') {
        this.$router.push({
          path: "/login"
        });
      } else {
        let role = this.$store.state.user.currentRole;
        let path = '';
        switch(role.roleId) {
          case 1: // 系统管理员
            path = '/userManage/teacher';
            break;
          case 2: // 项目添加人
            path = '/projectList/list';
            break;
          case 3: // 项目管理员
            path = '/projectManage';
            break;
          case 4: // 项目负责人
            path = '/projectMaintain';
            break;
          case 5:
            path = '/allExperiment';
            break;
          case 6: // 门户网站管理员
            path = '/news';
        }
        this.$router.push({
          path: path
        });
      }
    },
    toAllExperiment() {
      this.$router.push({
        path: "/home"
      });
    },
    toNews() {
      this.$router.push({
        path: "/dynamicInfo",
      });
    },
    toDownload() {
      this.$router.push({
        path: "/download"
      });
    },
    getCollegeList() {
      getCollegeList()
      .then(res => {
        if (res.code === 200) {
          this.collegeList = res.data
        }
      })
      .catch(err => {
        this.$message.error(err.msg)
      })
    },
    handleCollege(val) {
      console.log('val', val)
      this.selectCollege = val;
      this.getCourseList();
    },
    getCourseList() {
      let param = {
        collegeId: this.selectCollege,
        projectName: this.experimentName,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getExperimentList(param)
      .then(res => {
        if (res.code === 200) {
          this.courseList = res.data.list;
          console.log(this.courseList)
          this.total = res.data.total;
        }
      })
      .catch(err => {
        this.$message.error(err.msg)
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getCourseList();
    },
    search() {
      this.getCourseList();
    }
  }

}
</script>

<style lang="scss" scoped>

.all-experiment {
  * {
    margin: 0;
    padding: 0;
  }
  .header {
    height: 280px;
    background: url(../../assets/homePage/all-experiment.jpg) no-repeat center;
    .header-content {
      width: 1200px;
      margin: 0 auto;
      .header-top {
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        .header-top-left {
          flex: 1;
          display: flex;
          align-items: center;
          img {
            height: 50px;
          }
          ul {
            list-style-type: none;
            font-size: 16px;
            color: #fff;
            // line-height: 50px;
            margin-left: 20px;
            cursor: pointer;
            li {
              width: 100px;
              float: left;
              padding: 0 10px;
              text-align: center;
              &:hover {
                font-weight: bolder;
              }
            }
          }
        }
        .header-top-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .el-input {
            width: 308px;
            height: 40px;
            // margin-top: 20px;
            margin-right: 40px;
          }
          span {
            font-family: "Microsoft Yahei";
            font-size: 18px;
            letter-spacing: 2px;
            color: #207eff;
            padding: 15px 45px;
            background-color: white;
            border-radius: 5px;
            cursor: pointer;
          }
        }
      }
      .header-font {
        font-family: "Microsoft Yahei";
        color: #fff;
        h1 {
          font-size: 36px;
          font-weight: bold;
          margin-top: 10px;
          padding-bottom: 25px;
        }
        div {
          font-size: 20px;
        }
      }
    }
  }
  .content {
    min-height: calc(100vh - 325px);
    .menu {
      width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
      color: #24282b;
      font-size: 14px;
      cursor: pointer;
      font-family: "Microsoft Yahei";
      .college,.centre {
        display: flex;
        // margin-bottom: 15px;
        span {
          padding-top: 10px;
        }
      }
      .college-list,.centre-list {
        span {
          display: inline-block;
          margin: 5px 3px;
          padding: 5px 8px;
          cursor: pointer;
        }
      }
      .college-list {
        .active {
          color: #fff;
          background: #3cafff;
          border-radius: 3px;
        }
      }
      .centre-list {
        span:hover {
          text-decoration: underline;
        }
      }
    }
    .title {
      width: 1200px;
      margin: auto;
      font-size: 24px;
      color: #333;
      font-family: "Microsoft Yahei";
      font-weight: bold;
      padding: 25px 0;
    }
    .course-list {
      width: 1200px;
      margin: 0 auto;
      min-height: 458px;
      .course-item {
        width: 225px;
        height: 210px;
        margin: 0 15px 25px 0;
        display: inline-block;
        cursor: pointer;
        img {
          width: 100%;
          height: 150px;
          transition: 0.5s;
        }
        .course-text {
          margin-top: 5px;
          padding: 0 8px;
          p {
            color: #24282b;
            font-size: 14px;
            font-weight: bold;
            line-height: 22px;
            white-space:nowrap;//不换行
            overflow: hidden;//超出隐藏
            text-overflow: ellipsis;//变成..
          }
          .course-info {
            margin-top: 5px;
            color: #999;
            .level {
              font-size: 12px;
              color: #fff;
              text-align: center;
              display: block;
              padding: 3px 5px;
              border-radius: 3px;
              display: inline-block;
              float: left;
            }
            .red {
              background-color: red;
            }
            .blue {
              background-color: rgb(63, 4, 224);
            }
            .pink {
              background-color: rgb(165, 4, 144);
            }
            .count {
              display: inline-block;
              float: right;
              line-height: 20px;
              font-size: 12px;
              padding-left: 18px;
            }
          }
        }
      }
      .course-item:hover {
        box-shadow: 2px 2px 10px rgba(168, 165, 165, 0.5);
      }
    }
    .pagination-box {
      text-align: center;
    }
  }
}
</style>