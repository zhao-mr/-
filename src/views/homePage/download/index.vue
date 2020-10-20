<template>
  <div class="download">
    <div class="header">
      <div class="header-content">
        <div class="header-top">
          <div class="header-top-left">
            <img src="../../../assets/homePage/logo.png" alt="">
            <ul>
              <li @click="toAllExperiment">全部实验</li>
              <li @click="toNews">资讯动态</li>
              <li @click="toDownload">下载中心</li>
            </ul>
          </div>
          <div class="header-top-right">
            <span @click="toPath('manager')" v-if="userName">进入</span>
            <span @click="toPath('login')" v-else>登录</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="aside">
        <ul>
          <li :class="{'active': active === 'tool'}" @click="change('tool')">工具下载</li>
          <li :class="{'active': active === 'file'}" @click="change('file')">文件下载</li>
        </ul>
      </div>
      <div class="aside-content">
        <div class="list">
          <div class="item" v-for="item in list" :key="item.uploadCentreId">
            <div class="name">{{item.uploadIntroduce}}</div>
            <a href="#"><i class="el-icon-download"></i>下载</a>
            <span>{{item.uploadDate}}</span>
          </div>
        </div>
        <div class="pagination-box" v-if="list.length > 0">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            style="margin-bottom: 30px;"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { getList } from '@/api/webAdmin'
import Footer from '@/components/Footer'

export default {
  name: "AllExperiment",
  components: {
    Footer
  },
  data() {
    return {
      active: 'tool',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      userName: null,
      list: []
    }
  },
  mounted() {
    this.userName = this.$store.state.user.name;
    this.getList();
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
            break;          
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
        path: "/dynamicInfo"
      });
    },
    toDownload() {
      this.$router.push({
        path: "/download"
      });
    },
    change(val) {
      this.active = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    getList() {
      let uploadCategory = null;
      if (this.active === 'tool') {
        uploadCategory = 0
      } else {
        uploadCategory = 1
      }
      let param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        uploadCategory
      }
      getList(param)
      .then(res => {
        if (res.code === 200) {
          res.data.list.forEach(item => {
            item.uploadDate = item.uploadDate.split(' ')[0];
          });
          this.list = res.data.list;
          this.total = res.data.total;
        }
      })
      .catch(err => {
        this.$message.error(res.msg)
      })
    }
  }

}
</script>

<style lang="scss" scoped>

.download {
  * {
    margin: 0;
    padding: 0;
  }
  .header {
    height: 280px;
    background: url(../../../assets/homePage/download.jpg) no-repeat center;
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
    }
  }
  .content {
    min-height: calc(100vh - 325px);
    .aside {
      height: 88px;
      border-bottom: 1px solid #eaeef1;
      ul {
        width: 1200px;
        margin: 0 auto;
        list-style-type: none;
        li {
          float: left;
          font-size: 24px;
          color: #24282b;
          font-family: "Microsoft Yahei";
          height: 60px;
          line-height: 60px;
          margin-top: 30px;
          margin-right: 40px;
          cursor: pointer;
        }
        .active {
          font-weight: bold;
          border-bottom: 2px solid #24282b;
        }
      }
    }
    .aside-content {
      width: 1200px;
      margin: 30px auto;
      .list {
        min-height: 436px;
        .item {
          height: 55px;
          line-height: 55px;
          padding: 0 15px;
          border-bottom: 1px solid #eaeef1;
          .name {
            float: left;
          }
          a {
            float: right;
            display: block;
            width: 75px;
            height: 28px;
            font-size: 14px;
            color: #fff;
            text-decoration: none;
            line-height: 30px;
            margin-top: 13px;
            margin-left: 20px;
            background-color: #3cafff;
            text-align: center;
            i {
              font-size: 16px;
              padding-right: 4px;
            }
          }
          span {
            float: right;
            color: #b3b6bb;
            font-family: "Microsoft Yahei";
            font-size: 12px;
          }
        }
      }
      .pagination-box {
        text-align: center;
      }
    }
  }
}
</style>