<template>
  <div class="news">
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
          <li :class="{'active': active === 'news'}" @click="change('news')">新闻</li>
          <li :class="{'active': active === 'notice'}" @click="change('notice')">公告</li>
        </ul>
      </div>
      <div class="aside-content">
        <news :isList="isList" :type="active" v-on:changeActive="changeActive" v-on:changeIsList="changeIsList" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import news from '@/views/homePage/news/news'

export default {
  name: "AllExperiment",
  components: {
    Footer,
    news
  },
  data() {
    return {
      active: 'news',
      total: 0,
      isList: true,
      userName: null,
    }
  },
  mounted() {
    this.userName = this.$store.state.user.name;
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
      this.isList = true;
    },
    changeActive(val) {
      this.active = val
    },
    changeIsList(val) {
      this.isList = val
    }
  }

}
</script>

<style lang="scss" scoped>

.news {
  * {
    margin: 0;
    padding: 0;
  }
  .header {
    background: url(../../../assets/homePage/news.jpg) no-repeat center;
    height: 280px;
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
  }
}
</style>