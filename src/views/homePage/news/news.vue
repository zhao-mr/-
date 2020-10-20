<template>
  <div class="news">
    <div>
      <div class="news-list" v-show="isList">
        <div class="news-item" @click="toInfo">
          <div class="date">
            5
            <label>/6</label>
            <p>2020</p>
          </div>
          <div class="news-content">
            <p>华东理工大学关于开展报送 2019 年度上海市级虚拟仿真实验教学项目认定工作的通知</p>
            <a>为深入学习贯彻全国教育大会精神，提升育人水平，按照《教育部办公厅关于2017-2...</a>
            <span>来源：校级内容管理员</span>
          </div>
        </div>
        <div class="news-item">
          <div class="date">
            5
            <label>/6</label>
            <p>2020</p>
          </div>
          <div class="news-content">
            <p>华东理工大学关于开展报送 2019 年度上海市级虚拟仿真实验教学项目认定工作的通知</p>
            <a>为深入学习贯彻全国教育大会精神，提升育人水平，按照《教育部办公厅关于2017-2...</a>
            <span>来源：校级内容管理员</span>
          </div>
        </div>
        <div class="news-item">
          <div class="date">
            5
            <label>/6</label>
            <p>2020</p>
          </div>
          <div class="news-content">
            <p>华东理工大学关于开展报送 2019 年度上海市级虚拟仿真实验教学项目认定工作的通知</p>
            <a>为深入学习贯彻全国教育大会精神，提升育人水平，按照《教育部办公厅关于2017-2...</a>
            <span>来源：校级内容管理员</span>
          </div>
        </div>
        <div class="news-item">
          <div class="date">
            5
            <label>/6</label>
            <p>2020</p>
          </div>
          <div class="news-content">
            <p>华东理工大学关于开展报送 2019 年度上海市级虚拟仿真实验教学项目认定工作的通知</p>
            <a>为深入学习贯彻全国教育大会精神，提升育人水平，按照《教育部办公厅关于2017-2...</a>
            <span>来源：校级内容管理员</span>
          </div>
        </div>
        <div class="news-item">
          <div class="date">
            5
            <label>/6</label>
            <p>2020</p>
          </div>
          <div class="news-content">
            <p>华东理工大学关于开展报送 2019 年度上海市级虚拟仿真实验教学项目认定工作的通知</p>
            <a>为深入学习贯彻全国教育大会精神，提升育人水平，按照《教育部办公厅关于2017-2...</a>
            <span>来源：校级内容管理员</span>
          </div>
        </div>
      
      </div>
      <div class="pagination-box">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          style="margin-bottom: 30px;"
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
export default {
  name: "news",
  props: ['isList'],
  data() {
    return {
      total: 7
    }
  },
  mounted() {

  },
  methods: {
    toInfo() {
      this.isList = false;
    }
  }

}

</script>

<style lang="scss" scoped>
.news {
  
  font-family: "Microsoft Yahei";
  .news-list {
    width: 1080px;
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
          color: #24282b;
          font-weight: bold;
          font-size: 14px;
          line-height: 23px;
          margin-bottom: 10px;
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
