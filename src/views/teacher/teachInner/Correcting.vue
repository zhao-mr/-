<template>
  <div class="BosConer">
    <div class="Bostheme">
      <h1>{{ assignName }}</h1>
    </div>
    <div class="zongfei" v-if="bosshow">
      <h2>
        总分:
        <span ref="namezong">
          {{
            (videoScoreScale * mustVideoStatus) / 100 +
              (experimentScoreScale * experimentScore) / 100 +
              (reportScoreScale * this.inputbaogao) / 100
          }}
        </span>
      </h2>
    </div>
    <div class="zongfei" v-if="!bosshow">
      <h2>总分:{{ totalScore }}</h2>
    </div>
    <el-card class="box-card" v-if="bosshow">
      <div class="content">
        <div class="lfet">
          <span>视频学习：</span>
          <span
          >评分:
            <span ref="nameshipin">{{
              (videoScoreScale * mustVideoStatus) / 100
            }}</span></span
          >
          <span>（={{ mustVideoStatus }}*{{ videoScoreScale }}%）</span>
          <span></span>
        </div>
        <!-- bosshow -->
        <div class="rieng"></div>
      </div>
    </el-card>
    <el-card class="box-card" v-if="!bosshow">
      <div class="content">
        <div class="lfet">
          <span>视频学习：</span>
          <span>评分: {{ videoScore }} </span>
          <span>占比:（{{ videoScoreScale }}%）</span>
          <span></span>
        </div>
      </div>
    </el-card>

    <el-card class="box-card" v-if="bosshow">
      <div class="content">
        <div class="lfet">
          <span>虚拟实验操作：</span>
          <span
          >评分:
            <span ref="nameshiyan">{{
              (experimentScoreScale * experimentScore) / 100
            }}</span>
          </span>
          <span> （={{ experimentScore }}*{{ experimentScoreScale }}%）</span>
          <!-- <span>查看试验台</span> -->
        </div>
        <div class="rieng"></div>
      </div>
    </el-card>

    <el-card class="box-card" v-if="!bosshow">
      <div class="content">
        <div class="lfet">
          <span>虚拟实验操作：</span>
          <span>评分: {{ experimentScore }}</span>
          <span>占比:（{{ experimentScoreScale }}%）</span>
        </div>
      </div>
    </el-card>

    <el-card class="box-card" v-if="bosshow">
      <div class="content">
        <div class="lfet">
          <span>实验报告：</span>
          <span>
            评分:
            <span ref="namebaogaon">{{
              (reportScoreScale * this.inputbaogao) / 100
            }}</span>
          </span>
          <span
          >（=<el-input
            v-model="inputbaogao"
            placeholder="请输入"
            class="Bosinput"
            @input="gaibian"
            maxlength="3"
            oninput="value=value.replace(/[^\d]/g,'')"
            clearable
          ></el-input
          >*{{ reportScoreScale }}%）</span
          >
          <span></span>
        </div>
        <div class="rieng">
          <!-- <span>评分: </span>
          <el-input v-model="input" placeholder="请输入"></el-input> -->
        </div>
      </div>
      <div class="" style="margin-top: 10px;">
        <div v-html="mustExperimentContent"></div>
        <!-- <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="mustExperimentContent"
        >
        </el-input> -->
      </div>
    </el-card>

    <el-card class="box-card" v-if="!bosshow">
      <div class="content">
        <div class="lfet">
          <span>实验报告：</span>
          <span> 评分:{{ reportScore }} </span>
          <span>占比:（{{ reportScoreScale }}%）</span>
        </div>
      </div>
    </el-card>

    <h4>评语:</h4>
    <el-card class="box-card" style="margin-top: 10px;">
      <el-input
        type="textarea"
        :rows="8"
        placeholder="请输入内容"
        v-model="teacherComment"
      >
      </el-input>
    </el-card>
    <div class="Bosbootm">
      <el-button type="primary" @click="Result" v-if="bosshow">提 交</el-button>
      <el-button @click="cancel" v-if="bosshow">取消</el-button>
      <el-button @click="cancel" v-if="!bosshow">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {correctUser, correctResult, lookCorrect} from "@/api/teacher";

  export default {
    data() {
      return {
        projectId: "", //项目ID
        assignId: "", //布置ID
        submitId: "", //成绩ID
        userName: "", //用户名

        assignName: "", //名称

        videoScoreScale: "", //视频成绩比例
        mustVideoStatus: "", //视频成绩分数
        experimentScoreScale: "", //实验成绩比例
        experimentScore: "", //实验成绩
        mustExperimentContent: "", //报告内容
        reportScoreScale: "", //报告比例

        inputbaogao: "", //输入的值
        teacherComment: "", //评语

        bosshow: true,
        totalScore: "", //总分
        videoScore: "", //视频批改后得分
        reportScore: "" //报告批改后得分
      };
    },
    methods: {
      //获取信息列表
      correctUser() {
        correctUser({
          submitId: this.submitId
        })
          .then(res => {
            // console.log(res);
            if (res.code == 200) {
              this.assignName = res.data.assignName;
              this.videoScoreScale = res.data.videoScoreScale;
              if (res.data.mustVideoStatus == true) {
                this.mustVideoStatus = "100";
              } else {
                this.mustVideoStatus = "0";
              }
              this.experimentScoreScale = res.data.experimentScoreScale;
              this.experimentScore = res.data.experimentScore;
              this.mustExperimentContent = res.data.mustExperimentContent;
              this.reportScoreScale = res.data.reportScoreScale;
            }
          })
          .catch(err => {
          });
      },

      //填写报告成绩
      gaibian(val) {
        this.inputbaogao = val;
      },

      //提交
      Result() {
        if (!this.inputbaogao == "" || !this.inputbaogao == null) {
          this.correctResult();
        } else {
          this.$message({
            showClose: true,
            message: "请填写实验报告成绩",
            type: "warning"
          });
        }
      },

      correctResult() {
        correctResult({
          userName: this.userName, //用户名
          experimentScore: this.$refs.nameshiyan.innerHTML, //实验成绩
          reportScore: this.$refs.namebaogaon.innerHTML, //报告成绩
          videoScore: this.$refs.nameshipin.innerHTML, //视频成绩
          exercisesScore: 0, //习题成绩
          experimentScoreScale: this.experimentScoreScale, //实验成绩比例
          reportScoreScale: this.reportScoreScale, //报告成绩比例
          videoScoreScale: this.videoScoreScale, //视频成绩比例
          exercisesScoreScale: "", //习题成绩比例
          submitId: this.submitId, //学生成绩id
          assignId: this.assignId, //布置id
          teacherComment: this.teacherComment, //评语
          totalScore: this.$refs.namezong.innerHTML //总分
        })
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.$router.push({
                path: "/teachInner/correctList",
                query: {projectId: this.projectId, assignId: this.assignId}
              });
            }
          })
          .catch(err => {
          });
      },

      //取消/返回
      cancel() {
        // this.$router.push({
        //   path: "/teachInner/correctList",
        //   query: { projectId: this.projectId, assignId: this.assignId }
        // });
        this.$router.go(-1)
      },

      //查看批改结果
      lookCorrect() {
        lookCorrect({
          assignId: this.assignId,
          submitId: this.submitId
        })
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.assignName = res.data.assignName;
              this.totalScore = res.data.totalScore;
              this.videoScore = res.data.videoScore;
              this.videoScoreScale = res.data.videoScoreScale;
              //   if (res.data.mustVideoStatus == true) {
              //     this.mustVideoStatus = "100";
              //   } else {
              //     this.mustVideoStatus = "0";
              //   }
              this.experimentScoreScale = res.data.experimentScoreScale;
              this.experimentScore = res.data.experimentScore;
              this.reportScore = res.data.reportScore;
              this.reportScoreScale = res.data.reportScoreScale;
              this.teacherComment = res.data.teacherComment;
            }
          })
          .catch(err => {
          });
      }
    },
    mounted() {
      this.projectId = this.$route.query.projectId;
      this.assignId = this.$route.query.assignId;
      this.submitId = this.$route.query.submitId;
      this.userName = this.$route.query.userName;
      console.log(this.$route.query.userName);
      if (
        this.$route.query.userName == undefined ||
        this.$route.query.userName == null ||
        this.$route.query.userName == ""
      ) {
        this.bosshow = false;
        this.lookCorrect();
      } else {
        this.correctUser();
        this.bosshow = true;
      }
    }
  };
</script>

<style scoped>
  .BosConer {
    width: 100%;
    padding: 0 50px;
  }

  .Bostheme {
    width: 100%;
    text-align: center;
  }

  .content {
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .content .lfet {
    width: 80%;
    display: flex;
    align-items: center;
  }

  .content .rieng {
    width: 20%;
    display: flex;
    align-items: center;
  }

  .content .rieng span {
    margin-right: 10px;
  }

  .content .lfet span {
    margin-right: 20px;
  }

  .box-card {
    margin: 50px 0;
  }

  .Bosbootm {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .Bosbootm button {
    font-size: 16px;
    padding: 12px 50px;
    margin: 0 20px;
  }

  .zongfei {
    width: 100%;
    text-align: right;
    color: red;
  }
</style>
<style scoped>
  .BosConer .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    box-shadow: 0 0px 12px 0 rgba(0, 0, 0, 0.2);
  }

  .Bosinput {
    width: 100px;
  }
</style>
