<template>
  <div class="news">
    <div>
      <div class="news-list" v-show="isList">
        <div class="news-item" v-for="item in list" :key="item.id" @click="toInfo">
          <div class="date">
            {{item.day}}
            <label>/{{item.month}}</label>
            <p>{{item.year}}</p>
          </div>
          <div class="news-content">
            <p>{{item.title}}</p>
            <a>{{item.content}}</a>
            <span>来源：{{item.source}}</span>
          </div>
        </div>
      </div>
      <div class="pagination-box" v-show="type === 'news'">
        <el-pagination
          layout="prev, pager, next"
          :total="newsTotal"
          style="margin-bottom: 30px;"
          @current-change="handleNewsCurrentChange"
        >
        </el-pagination>
      </div>

      <div class="pagination-box" v-show="type === 'notice'">
        <el-pagination
          layout="prev, pager, next"
          :total="noticeTotal"
          style="margin-bottom: 30px;"
          @current-change="handleNoticeCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

    <div class="info" v-show="!isList">
      <div class="info-header">
        <p>
          华东理工大学关于开展报送 2019
          年度上海市级虚拟仿真实验教学项目认定工作的通知
        </p>
        <div>
          <span style="padding-right: 24px">来源：校级内容管理员</span>
          <span>发稿时间：2019-6-5 22:53:00</span>
        </div>
      </div>
      <p class="info-content">
        为深入学习贯彻全国教育大会及新时代全国高等学校本科教育工作会议精神，深入推进信息技术与高等教育实验教学的深度融合，不断加强高等教育实验教学优质资源建设、应用与共享，
        打造实验“金课”，根据《教育部办公厅关于 2017—2020
        年开展示范性虚拟仿真实验教学项目建设的通知》（教高厅〔2017〕4 号）
        和《上海市教育委员会关于开展 2019
        年度上海市级虚拟仿真实验教学项目认定工作的通知》（沪教委高〔2019〕18
        号）等文件精神，学校决定组织开展报送 2019
        年度上海市级虚拟仿真实验教学项目认定相关工作。现将有关事项通知如下：
      </p>
    </div>

  </div>
</template>

<script>
import { getNewsList, getNoticeList } from '@/api/webAdmin'

export default {
  name: "news",
  props: ['isList', 'type'],
  data() {
    return {
      list: [],
      newsPageNum: 1,
      newsPageSize: 4,
      newsTotal: 0,
      noticePageNum: 1,
      noticePageSize: 4,
      noticeTotal: 0,
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    type(val) {
      console.log('val', val)
      if (val === 'news') {
        this.getNewsList();
      } else {
        this.getNoticeList();
      }
    }
  },
  methods: {
    toInfo() {
      this.isList = false;
    },
    getNewsList() {
      let param = {
        pageNum: this.newsPageNum,
        pageSize: this.newsPageSize,
      }
      getNewsList(param)
      .then(res => {
        if (res.code === 200) {
          this.list = [];
          res.data.list.forEach(item => {
            let date = item.newsDate.split(" ")[0];
            console.log('date', date);
            let year = date.split("-")[0];
            let month = date.split("-")[1];
            let day = date.split("-")[2];
            console.log('year', year, month, day);
            let content = "";
            if (item.newsContent.length < 39) {
              content = item.newsContent;
            } else {
              content = item.newsContent.substr(0,39)+"...";
            }
            this.list.push({
              id: item.newsId,
              title: item.newsTitle,
              source: item.newsSource,
              content,
              year,
              month,
              day
            })
          });
          this.newsTotal = res.data.total;
        }
      })
      .catch(err => {
        this.$message.error(err.msg)
      })
    },

    getNoticeList() {
      let param = {
        pageNum: this.noticePageNum,
        pageSize: this.noticePageSize,
      }
      getNoticeList(param)
      .then(res => {
        if (res.code === 200) {
          this.list = [];
          res.data.list.forEach(item => {
            let date = item.announcementDate.split(" ")[0];
            console.log('date', date);
            let year = date.split("-")[0];
            let month = date.split("-")[1];
            let day = date.split("-")[2];
            console.log('year', year, month, day);
            let content = "";
            if (item.announcementContent.length < 39) {
              content = item.announcementContent;
            } else {
              content = item.announcementContent.substr(0,39)+"...";
            }
            this.list.push({
              id: item.announcementId,
              title: item.announcementTitle,
              source: item.announcementSource,
              content,
              year,
              month,
              day
            })
          });
        }
      })
      .catch(err => {
        this.$message.error(err.msg)
      })
    },
    getList() {
      console.log('this.type', this.type)
      if (this.type === 'news') {
        this.getNewsList();
      } else {
        this.getNoticeList();
      }
    },
    handleNewsCurrentChange(val) {
      this.newsPageNum = val;
    },
    handleNoticeCurrentChange(val) {
      this.noticePageNum = val;
    },
  }

}

</script>

<style lang="scss" scoped>
.news {
  
  font-family: "Microsoft Yahei";
  .news-list {
    width: 1080px;
    min-height: 362px;
    margin: 50px auto;
    .news-item {
      width: 450px;
      height: 135px;
      background: #f4f7f9;
      position: relative;
      margin: 25px 45px;
      display: inline-block;
      cursor: pointer;
      .date {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        background: #fff;
        position: absolute;
        left: -40px;
        top: -30px;
        box-shadow: 1px 3px 20px 1px rgba(80, 80, 80, 0.14);
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        line-height: 68px;
        font-family: Arial;
        label {
          font-size: 18px;
        }
        p {
          font-size: 14px;
          color: #999;
          height: 25px;
          line-height: 25px;
          text-align: center;
          position: absolute;
          top: 50px;
          width: 100%;
        }
      }
      .news-content {
        padding-left: 60px;
        padding-right: 55px;
        padding-top: 15px;
        color: #89939c;
        font-size: 12px;
        line-height: 22px;
        p {
          height: 46px;
          color: #24282b;
          font-weight: bold;
          font-size: 14px;
          line-height: 23px;
          margin-bottom: 10px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        a {
          text-decoration: none;
        }
        span {
          float: right;
        }
      }
    }
  }
  .pagination-box {
    text-align: center;
  }

  .info {
    width: 1200px;
    margin: auto;
    margin-top: 30px;
    padding-bottom: 50px;
    .info-header {
      margin-bottom: 20px;
      border-bottom: 1px #ccc dashed;
      line-height: 1.8;
      p {
        text-align: center;
        font-size: 27px;
        color: #24282b;
        font-weight: normal;
      }
      div {
        font-family: serif;
        color: #666;
        text-align: center;
        padding: 20px 0;
        font-size: 15px;
      }
    }
    .info-content {
      text-indent: 2em;
      line-height: 24px;
    }
  }

}

</style>
