<template>
  <div class="bos">
    <div class="botntop">
      <el-row>
        <el-button type="primary" @click="turnback" v-if="blockbot"
          >返 回</el-button
        >
        <el-button type="primary" @click="turnback2" v-if="!blockbot"
          >返 回</el-button
        >
      </el-row>
    </div>

    <h2 style="text-align: center;">{{ projectName }}</h2>
    <div class="Condeaout">
      <ul>
        <li>
          <div class="Boslfeit">项目名称：</div>
          <div class="Boslrige">
            <el-input v-model="projectName" placeholder="请输入内容"></el-input>
          </div>
        </li>
        <li>
          <div class="Boslfeit">开始时间：</div>
          <div class="Boslrige">
            <el-date-picker
              v-model="startTime"
              type="date"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              :picker-options="pickerOptionsStart"
              @change="startTimeStatus"
              style="width:100%"
            >
            </el-date-picker>
          </div>
        </li>
        <li>
          <div class="Boslfeit">结束时间：</div>
          <div class="Boslrige">
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              :picker-options="pickerOptionsEnd"
              @change="endTimeStatus"
              style="width:100%"
            >
            </el-date-picker>
          </div>
        </li>
        <li>
          <div class="Boslfeit">选择学生：</div>
          <div
            class="Boslrige  rigeinp"
            style="display: flex;justify-content: space-between;"
          >
            <el-select
              v-model="collegeId"
              placeholder="请选择学院"
              @change="boshuo1"
            >
              <el-option
                v-for="item in options1"
                :key="item.collegeId"
                :label="item.collegeName"
                :value="item.collegeId"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="major"
              placeholder="请选择学科"
              @change="boshuo2"
            >
              <el-option
                v-for="item in options2"
                :key="item.majorId"
                :label="item.majorName"
                :value="item.majorId"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="tbClassId"
              placeholder="请选择班级"
              @change="boshuo3"
            >
              <el-option
                v-for="item in options3"
                :key="item.tbClassId"
                :label="item.tbClassName"
                :value="item.tbClassId"
              >
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <div class="Boslfeit"></div>
          <div class="Boslrige">
            <div class="Bosbian">
              <div>
                <el-tag
                  v-for="tag in tagsleit"
                  :key="tag.userId"
                  closable
                  type="success"
                  @close="handleClose(tag)"
                  v-if="isExist(tag.userId)"
                >
                  {{ tag.realName }}
                </el-tag>
              </div>
              <div>
                <el-tag v-for="tag in tagsleit2" :key="tag.userId" type="info">
                  {{ tag.realName }}
                </el-tag>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="Boslfeit">成绩比例：</div>
          <div class="Boslrige lrigechen">
            <div class="Leidiv">
              实验成绩
              <el-input
                v-model="experimentScore"
                placeholder="请输入"
                maxlength="3"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input
              >%
            </div>
            <div class="Leidiv">
              报告成绩<el-input
                v-model="reportScore"
                placeholder="请输入"
                maxlength="3"
              ></el-input
              >%
            </div>
            <div class="Leidiv">
              视频成绩<el-input
                v-model="videoScore"
                placeholder="请输入"
                maxlength="3"
              ></el-input
              >%
            </div>
          </div>
        </li>
        <li>
          <div class="auot">
            <el-row>
              <el-button type="primary" @click="Submit">提 交</el-button>
            </el-row>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getAssignProject,
  getStudent,
  assignExperiment,
  getAssignDetails,
  updateAssign
} from "@/api/teacher";
import { getGroup } from "@/api/superAdmin";
export default {
  data() {
    return {
      projectId: "", //项目ID值

      projectName: "", //实验名称
      experimentScore: 0, //实验成绩
      reportScore: 0, //报告成绩
      videoScore: 0, //视频成绩

      startTime: "", //开始时间值
      endTime: "", //结束时间值

      pickerOptionsStart: {
        disabledDate: time => {
          if (this.endTime) {
            return time.getTime() > new Date(this.endTime).getTime();
          } else {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.startTime) {
            return (
              time.getTime() <
              new Date(this.startTime).getTime() - 0 * 24 * 60 * 60 * 1000
            );
          } else {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      },

      options1: [], //学院列表
      collegeId: "", //学院的值
      opquan: "",
      options2: [], //学科列表
      major: "", //学科的值

      banji: "",
      options3: [], //班级列表
      tbClassId: "", //班级的值

      tagsleit: [], //学生值
      tagsleit2: [], //学生回显值

      bostagszhi: [], //传后台学生值

      assignId: "", //获取内容ID
      blockbot: true //按钮判断
    };
  },
  methods: {
    //返回
    turnback() {
      this.$router.push({ path: "/teachInner" });
    },
    //返回2
    turnback2() {
      this.$router.push({
        path: "/teachInner/projectArrangement",
        query: { projectId: this.projectId }
      });
    },

    // 时间开始选择器
    startTimeStatus: function(value) {
      this.startTime = value;
      this.endTime = "";
    },
    // 时间结束选择器
    endTimeStatus: function(value) {
      // console.log(value);
      this.endTime = value;
      if (this.startTime == "") {
        this.$message({
          showClose: true,
          message: "请先选择开始时间",
          type: "warning"
        });
        this.endTime = "";
      }
    },

    //获取信息
    getAssignProject() {
      getAssignProject({
        projectId: this.projectId
      })
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.experimentScore = res.data.experimentScore;
            this.reportScore = res.data.reportScore;
            this.videoScore = res.data.videoScore;
            this.projectName = res.data.projectName;
          }
        })
        .catch(err => {});
    },

    // 获取学院角色信息
    getGroup() {
      getGroup()
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.options1 = res.college;
            this.opquan = res.major;
            this.banji = res.tbClass;
          }
        })
        .catch(err => {
          console.info(err);
        });
    },

    //选中学院执行事件
    boshuo1(value) {
      this.collegeId = value;
      this.major = "";
      this.tbClassId = "";
      this.options2 = [];
      this.options3 = [];

      var kezhi = this.opquan;
      var boskzhi = [];
      for (let k = 0; k < kezhi.length; k++) {
        if (this.collegeId == kezhi[k].collegeId) {
          boskzhi.push({
            majorId: kezhi[k].majorId,
            majorName: kezhi[k].majorName,
            collegeId: kezhi[k].collegeId
          });
        }
      }
      this.options2 = boskzhi;
      this.getStudent();
    },
    //选中学科执行事件
    boshuo2(value) {
      this.major = value;
      this.tbClassId = "";
      this.options3 = [];

      var banzhi = this.banji;
      var zuibosban = [];
      for (let b = 0; b < banzhi.length; b++) {
        if (this.major == banzhi[b].majorId) {
          zuibosban.push({
            tbClassId: banzhi[b].tbClassId,
            tbClassName: banzhi[b].tbClassName,
            majorId: banzhi[b].majorId
          });
        }
      }
      this.options3 = zuibosban;
      this.getStudent();
    },
    //选中班级执行事件
    boshuo3(value) {
      this.tbClassId = value;
      this.getStudent();
    },

    //获取学生信息
    getStudent() {
      getStudent({
        collegeId: this.collegeId,
        majorId: this.major,
        tbClassId: this.tbClassId
      })
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.tagsleit = res.data;
          }
        })
        .catch(err => {});
    },

    handleClose(tag) {
      this.tagsleit.splice(this.tagsleit.indexOf(tag), 1);
    },

    tijiao1() {
      var xuenams = this.tagsleit;
      for (let i = 0; i < xuenams.length; i++) {
        this.bostagszhi.push(xuenams[i].userName);
      }

      var chenji1 = this.experimentScore; //实验成绩
      var chenji2 = this.reportScore; //报告成绩
      var chenji3 = this.videoScore; //视频成绩
      var boschenji = Number(chenji1) + Number(chenji2) + Number(chenji3);

      if (this.projectName == "") {
        this.$message({
          message: "请输入名称",
          type: "warning"
        });
      } else if (this.startTime == "" || this.startTime == null) {
        this.$message({
          message: "请输入开始时间",
          type: "warning"
        });
      } else if (this.endTime == "" || this.endTime == null) {
        this.$message({
          message: "请输入结束时间",
          type: "warning"
        });
      } else if (this.tagsleit == "") {
        this.$message({
          message: "请选择学生",
          type: "warning"
        });
      } else {
        if (boschenji == 100) {
          this.assignExperiment();
        } else {
          this.$message({
            message: "实验成绩，报告成绩，视频成绩三者必须共达到100%",
            type: "warning"
          });
        }
      }
    },
    tijiao2() {
      var xuenams = this.tagsleit;
      for (let i = 0; i < xuenams.length; i++) {
        this.bostagszhi.push(xuenams[i].userName);
      }

      var chenji1 = this.experimentScore; //实验成绩
      var chenji2 = this.reportScore; //报告成绩
      var chenji3 = this.videoScore; //视频成绩
      var boschenji = Number(chenji1) + Number(chenji2) + Number(chenji3);

      if (this.projectName == "") {
        this.$message({
          message: "请输入名称",
          type: "warning"
        });
      } else if (this.startTime == "" || this.startTime == null) {
        this.$message({
          message: "请输入开始时间",
          type: "warning"
        });
      } else if (this.endTime == "" || this.endTime == null) {
        this.$message({
          message: "请输入结束时间",
          type: "warning"
        });
      } else {
        if (boschenji == 100) {
          this.updateAssign();
        } else {
          this.$message({
            message: "实验成绩，报告成绩，视频成绩三者必须共达到100%",
            type: "warning"
          });
        }
      }
    },
    //提交
    Submit() {
      if (
        this.assignId == undefined ||
        this.assignId == "" ||
        this.assignId == null
      ) {
        this.tijiao1();
      } else {
        this.tijiao2();
      }
    },

    assignExperiment() {
      assignExperiment({
        assignProjectId: this.projectId, //实验ID
        assignName: this.projectName, //名称
        projectBeginTime: this.startTime, //开始时间
        projectEndTime: this.endTime, //结束时间
        experimentScore: this.experimentScore, //实验分数
        reportScore: this.reportScore, //报告分数
        videoScore: this.videoScore, //视频分数
        exercisesScore: "",
        schoolYear: "",
        userNames: this.bostagszhi //学生值
      })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
            this.$router.push({ path: "/teachInner" });
          }
        })
        .catch(err => {});
    },
    isExist(_id) {
      let status = true;
      for (let i = 0; i < this.tagsleit2.length; i++) {
        if (this.tagsleit2[i].userId === _id) {
          status = false;
        }
      }
      return status;
    },
    //获取信息
    getAssignDetails() {
      getAssignDetails({
        assignId: this.assignId
      })
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.projectName = res.data.assignName;
            this.startTime = res.data.projectBeginTime;
            this.endTime = res.data.projectEndTime;
            this.experimentScore = res.data.experimentScore;
            this.reportScore = res.data.reportScore;
            this.videoScore = res.data.videoScore;
            this.tagsleit2 = res.data.userNames;
          }
        })
        .catch(err => {});
    },
    //修改
    updateAssign() {
      updateAssign({
        assignId: this.assignId, //布置的id
        assignName: this.projectName, //名称
        projectBeginTime: this.startTime, //开始时间
        projectEndTime: this.endTime, //结束时间
        userNames: this.bostagszhi, //学生值
        experimentScore: this.experimentScore, //实验分数
        reportScore: this.reportScore, //报告分数
        videoScore: this.videoScore, //视频分数
        exercisesScore: ""
      })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
            this.$router.push({
              path: "/teachInner/projectArrangement",
              query: { projectId: this.projectId }
            });
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.projectId = this.$route.query.projectId; //项目ID
    this.assignId = this.$route.query.assignId; //布置ID

    this.getGroup();
    if (
      !this.assignId == undefined ||
      !this.assignId == "" ||
      !this.assignId == null
    ) {
      this.getAssignDetails();
      this.blockbot = false;
    } else {
      this.getAssignProject();
      this.blockbot = true;
    }
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
.Leidiv {
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
/* .Condeaout li .Boslrige .el-input {
  width: 300px;
} */
/* .Condeaout li .rigeinp .el-input {
  width: 200px;
} */
.resizeNone .el-textarea__inner {
  resize: none;
}
.Condeaout li .lrigechen .el-input {
  width: 40%;
  margin: 0 5px;
}

.Bosbian .el-tag {
  margin: 5px 8px;
}
</style>
