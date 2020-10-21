<template>
  <div class="bos">
    <div class="botntop">
      <el-row>
        <el-button type="primary" @click="turnback">返 回</el-button>
      </el-row>
    </div>

    <h2 style="text-align: center;">{{ assignName }}</h2>
    <div class="Condeaout">
      <ul>
        <li>
          <div class="Boslfeit">项目名称：</div>
          <div class="Boslrige">
            <el-input v-model="assignName" placeholder="请输入内容"></el-input>
          </div>
        </li>
        <li>
          <div class="Boslfeit">开始时间：</div>
          <div class="Boslrige">
            <el-input
              v-model="projectBeginTime"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </li>
        <li>
          <div class="Boslfeit">结束时间：</div>
          <div class="Boslrige">
            <el-input
              v-model="projectEndTime"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </li>

        <li>
          <div class="Boslfeit">学生名单：</div>
          <div class="Boslrige">
            <div class="Bosbian">
              <el-tag v-for="tag in tagsleit" :key="tag.userId" type="info">
                {{ tag.realName }}
              </el-tag>
            </div>
          </div>
        </li>
        <li>
          <div class="Boslfeit">成绩比例：</div>
          <div class="Boslrige lrigechen">
            <div>
              实验成绩
              <el-input
                v-model="experimentScore"
                placeholder="请输入"
                maxlength="3"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input
              >%
            </div>
            <div>
              报告成绩<el-input
                v-model="reportScore"
                placeholder="请输入"
                maxlength="3"
              ></el-input
              >%
            </div>
            <div>
              视频成绩<el-input
                v-model="videoScore"
                placeholder="请输入"
                maxlength="3"
              ></el-input
              >%
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getAssignDetails } from "@/api/teacher";
export default {
  data() {
    return {
      projectId: "", //项目ID值
      assignId: "", //布置的ID

      assignName: "", //名称
      projectBeginTime: "", //开始时间
      projectEndTime: "", //结束时间

      experimentScore: 0, //实验成绩
      reportScore: 0, //报告成绩
      videoScore: 0, //视频成绩
      tagsleit: "" //学生名单
    };
  },
  methods: {
    //返回
    turnback() {
      this.$router.push({
        path: "/teachInner/projectArrangement",
        query: { projectId: this.projectId }
      });
    },

    //获取信息
    getAssignDetails() {
      getAssignDetails({
        assignId: this.assignId
      })
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.assignName = res.data.assignName;
            this.projectBeginTime = res.data.projectBeginTime;
            this.projectEndTime = res.data.projectEndTime;
            this.experimentScore = res.data.experimentScore;
            this.reportScore = res.data.reportScore;
            this.videoScore = res.data.videoScore;
            this.tagsleit = res.data.userNames;
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.projectId = this.$route.query.projectId;
    this.assignId = this.$route.query.assignId;
    this.getAssignDetails();
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
.Condeaout {
  width: 55%;
  /* height: 500px; */
  overflow: hidden;
  margin: 0 auto;
}
.Condeaout ul {
  overflow: hidden;
  padding: 0 0;
}
.Condeaout li {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 30px 0;
}
.Condeaout li .Boslfeit {
  width: 20%;
  text-align: right;
  padding-right: 15px;
}
.Condeaout li .Boslrige {
  width: 80%;
}
.Condeaout li .lrigechen {
  display: flex;

  justify-content: space-between;
}
.Condeaout li .auot {
  width: 100%;
  text-align: center;
}
.Bosbian {
  width: 100%;
  height: 220px;
  display: block;
  border: 1px solid #dcdfe6;
  /* padding: 5px 15px; */
  line-height: 1.5;
  border-radius: 4px;
  overflow-y: auto;
}
</style>
<style>
.Condeaout li .Boslrige .el-input {
  width: 300px;
}
.Condeaout li .rigeinp .el-input {
  width: 200px;
}
.resizeNone .el-textarea__inner {
  resize: none;
}
.Condeaout li .lrigechen .el-input {
  width: 100px;
  margin: 0 5px;
}

.Bosbian .el-tag {
  margin: 5px 8px;
}
</style>
