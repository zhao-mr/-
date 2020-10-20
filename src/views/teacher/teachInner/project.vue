<template>
  <div class="bos">
    <div class="botntop">
      <el-row>
        <el-button type="primary" @click="turnback">返 回</el-button>
      </el-row>
    </div>
    <div class="Boaoute">
      <div class="imglfet">
        <img :src="cover" alt="图片" />
      </div>
      <div class="conring">
        <h2>{{ projectName }}</h2>
        <div class="clearfix">
          <ul>
            <li>
              所属学院：<span>{{ collegeName }}</span>
            </li>
            <li>
              是否开放共享：<span>{{ whetherOpen }}</span>
            </li>
            <li>
              所属学科：<span>{{ majorName }}</span>
            </li>
            <li style="width: 55%;">
              成绩比例：<span></span>实验成绩 : {{ experimentScore }} %
              ，报告成绩 ： {{ reportScore }} %，视频成绩 ： {{ videoScore }} %
            </li>
            <li>
              项目学时：<span>{{ projectPeriod }}</span>
            </li>
            <li>
              项目负责人：<span>{{ userName }}</span>
            </li>
            <li>
              教学教师：<span
                v-for="item in projectTeachList"
                :key="item.projectTeacherId"
                >{{ item.projectTeacherName }}</span
              >
            </li>
            <li>
              共享批改教师：<span
                v-for="item in projectShareList"
                :key="item.shareTeacherId"
                >{{ item.shareTeacherName }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="Bosboorm">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目介绍" name="first">
          {{ introduce }}
        </el-tab-pane>
        <el-tab-pane label="实验资源" name="second">
          {{ addressLink }}
        </el-tab-pane>
        <el-tab-pane label="学习资料" name="xuexi">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="视频资料" name="1">
              <div>
                <video
                  controls="controls"
                  :src="url + imgurl2"
                  width="700"
                  height="330px"
                  autoplay="autoplay"
                  loop="loop"
                >
                  您的浏览器不支持播放
                </video>
              </div>
            </el-collapse-item>
            <el-collapse-item title="图片资料" name="2">
              <div>
                <img :src="url + imgurl" alt="图片" />
              </div>
            </el-collapse-item>
            <el-collapse-item title="文件资料" name="3">
              <div>
                <el-link :href="url + imgurl3" type="primary">
                  {{ imgurl3materialsName }}
                </el-link>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="视频" name="third">
          <div class="Vidnei">
            <video
              controls="controls"
              :src="url + bosshipin"
              width="600"
              height="330px"
              autoplay="autoplay"
              loop="loop"
            >
              您的浏览器不支持播放
            </video>
          </div>
          <div class="Vidnei">
            <div class="neireb" style="width: 500px;">
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                :model="formLabelAlign"
              >
                <el-form-item label="视频名称">
                  <el-input
                    v-model="formLabelAlign.videoName"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="formLabelAlign.videoIntroduce"
                    :disabled="true"
                  >
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="实验报告" name="fourth">
          <div class="Baogao">
            <p>1.实验报告要求</p>
            <p>{{ experimentReportContent }}</p>
          </div>
          <div class="Baogao">
            <p>2.实验报告模板</p>
            <p>{{ experimentReportTemplate }}</p>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="实验报告模板" name="moban"
          >实验报告模板</el-tab-pane
        > -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getProInfo,
  getProjectLearnMaterials,
  getProVideo,
  getProjectReport
} from "@/api/teacher";
import { apiPath } from "@/config/env";
export default {
  name: "project",
  components: {},
  data() {
    return {
      url: apiPath,
      projectId: "", //项目id

      cover: "", //图片
      projectName: "", //名称
      collegeName: "", //学院
      majorName: "", //学科
      projectPeriod: "", //学时
      whetherOpen: true, //开放
      experimentScore: 0, //实验成绩
      reportScore: 0, //报告成绩
      videoScore: 0, //视频成绩
      userName: "", //负责人

      projectTeachList: [], // 老师列表
      projectShareList: [], //共享老师列表

      introduce: "", //项目介绍
      addressLink: "", //实验资源

      imgurl: "", //学习资料图片
      imgurl2: "", //学习资料视频
      imgurl3: "", //学习资料文件
      imgurl3materialsName: "",

      activeName: "first", //默认第一个项目介绍

      bosshipin: "", //视频

      labelPosition: "right",
      formLabelAlign: {
        videoName: "",
        videoIntroduce: ""
      },
      experimentReportContent: "", //报告内容
      experimentReportTemplate: "", //报告内容

      activeNames: ["1", "2", "3"] //折叠
    };
  },
  methods: {
    //获取详细信息
    getProInfo() {
      getProInfo({
        projectId: this.projectId
      })
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            var urlimg = this.url + res.data.project.cover;
            this.cover = urlimg;
            this.projectName = res.data.project.projectName;
            this.collegeName = res.data.project.collegeName;
            this.majorName = res.data.project.majorName;
            this.projectPeriod = res.data.project.projectPeriod;
            if (res.data.project.whetherOpen == true) {
              this.whetherOpen = "是";
            } else {
              this.whetherOpen = "否";
            }
            this.experimentScore = res.data.project.experimentScore;
            this.reportScore = res.data.project.reportScore;
            this.videoScore = res.data.project.videoScore;
            this.userName = res.data.project.userName;
            this.projectTeachList = res.data.projectTeachList;
            this.projectShareList = res.data.projectShareList;
            this.introduce = res.data.project.introduce;
            this.addressLink = res.data.project.addressLink;
          }
        })
        .catch(err => {});
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    handleChange(val) {
      console.log(val);
    },

    //获取学习资料的文件
    getProjectLearnMaterials() {
      getProjectLearnMaterials({
        projectId: this.projectId
      })
        .then(res => {
          // console.log(res);

          if (res.code == 200) {
            var bostup = []; //图片
            var bosship = []; //视频
            var boswenjia = []; //文件
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].materialsCategory == 2) {
                bostup.push(res.data[i]);
              } else if (res.data[i].materialsCategory == 1) {
                bosship.push(res.data[i]);
              } else if (res.data[i].materialsCategory == 3) {
                boswenjia.push(res.data[i]);
              }
            }
            this.imgurl = bostup[0].materialsPath;
            this.imgurl2 = bosship[0].materialsPath;
            this.imgurl3 = boswenjia[0].materialsPath;
            this.imgurl3materialsName = boswenjia[0].materialsName;
            // console.log(bostup[0].materialsPath);
            // console.log(boswenjia);
          }
        })
        .catch(err => {});
    },

    //获取视频
    getProVideo() {
      getProVideo({
        projectId: this.projectId
      })
        .then(res => {
          if (res.code == 200) {
            this.bosshipin = res.data[0].videoPath;
            this.formLabelAlign.videoName = res.data[0].videoName;
            this.formLabelAlign.videoIntroduce = res.data[0].videoIntroduce;
          }
        })
        .catch(err => {});
    },

    //获取实验的内容
    getProjectReport() {
      getProjectReport({
        projectId: this.projectId
      })
        .then(res => {
          console.log(res);

          if (res.code == 200) {
            this.experimentReportContent = res.data.experimentReportContent;
            this.experimentReportTemplate = res.data.experimentReportTemplate;
          }
        })
        .catch(err => {});
    },

    //返回
    turnback() {
      this.$router.push({ path: "/projectMaintain" });
    }
  },
  mounted() {
    this.projectId = this.$route.query.projectId;
    this.getProInfo();
    this.getProjectLearnMaterials();
    this.getProVideo();
    this.getProjectReport();
  }
};
</script>

<style scoped>
.bos {
  padding: 10px 50px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 15px #e6ecf1;
}
.botntop {
  width: 100%;
}
.Boaoute {
  width: 100%;
  overflow: hidden;
  margin: 20px 0;
}
.Boaoute .imglfet {
  float: left;
  width: 300px;
  height: 185px;
}
.Boaoute .imglfet img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.Boaoute .conring {
  float: right;
  height: 185px;
  width: calc(100% - 320px);
}
.conring h2 {
  margin: 10px 0;
}
.conring .clearfix {
  width: 100%;
  height: 140px;
  background-color: #f4f7f9;
}
.clearfix ul {
  overflow: hidden;
  padding: 0 10px;
}
.clearfix li {
  list-style: none;
  width: 45%;
  line-height: 32px;
  float: left;
}
.Bosboorm {
  width: 100%;
  overflow: hidden;
  margin-top: 10px;
}
.Vidnei {
  float: left;
  margin-right: 60px;
}
.Baogao {
  width: 100%;
  margin-bottom: 20px;
}
</style>
<style>
.Bosboorm .el-tabs__item {
  font-size: 20px;
  /* padding: 5px 20px; */
  height: 48px;
}
</style>
