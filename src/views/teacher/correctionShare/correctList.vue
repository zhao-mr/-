<template>
  <div>
    <!-- <h1>批改列表</h1> -->
    <div class="BosConer">
      <div class="ConerTop">
        <div class="">
          <el-button type="primary" @click="turnback">返回</el-button>
        </div>
      </div>

      <!-- 列表 -->
      <el-card class="box-card">
        <div class="Bosaote">
          <div class="">
            <el-input
              placeholder="请输入提交人"
              v-model="realName"
              @change="getCorrectList()"
              clearable
            >
              <i class="el-icon-search el-input__icon" slot="prefix"> </i>
              <!-- <i
                slot="suffix"
                class="el-input__icon el-icon-search"
                id="submit"
                @click="btnsearch"
              ></i> -->
            </el-input>
          </div>
          <div class="menu">
            <!-- <el-menu
              :default-active="correctStatus"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="">全部</el-menu-item>
              <el-menu-item index="0">待批改</el-menu-item>
              <el-menu-item index="1">已批改</el-menu-item>
            </el-menu> -->
            <div>
              <el-radio-group v-model="correctStatus" @change="handleSelect">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">待批改</el-radio-button>
                <el-radio-button label="1">已批改</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="Boslei">
          <el-table :data="bosliet" style="width: 100%">
            <el-table-column prop="totalScore" label="总成绩" width="">
              <template slot-scope="scope">
                {{ scope.row.totalScore || "待批改" }}
              </template>
            </el-table-column>
            <el-table-column prop="videoScore" label="视频成绩" width="">
              <template slot-scope="scope">
                <span v-if="scope.row.videoScore == null">
                  {{ "--" }}
                </span>
                <span v-else>
                  {{ scope.row.videoScore }} ：({{
                    scope.row.videoScoreScale
                  }}%)
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="experimentScore"
              label="实验操作成绩"
              width=""
            >
              <template slot-scope="scope">
                <span v-if="scope.row.experimentScore == null">
                  {{ "--" }}
                </span>
                <span v-else>
                  {{ scope.row.experimentScore }} ：({{
                    scope.row.experimentScoreScale
                  }}%)
                </span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="address" label="习题成绩" width="">
          </el-table-column> -->
            <el-table-column prop="reportScore" label="实验报告成绩" width="">
              <template slot-scope="scope">
                <span v-if="scope.row.reportScore == null">
                  {{ "--" }}
                </span>
                <span v-else>
                  {{ scope.row.reportScore }} ：({{
                    scope.row.reportScoreScale
                  }}%)
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="submitTime" label="	提交时间" width="">
              <template slot-scope="scope">
                {{ scope.row.submitTime || "--" }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="	学号" width="">
            </el-table-column>
            <el-table-column prop="realName" label="	提交人" width="">
            </el-table-column>
            <el-table-column label="操作" min-width="80%">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  v-if="scope.row.correctStatus == 1"
                  @click="handlelook(scope.row)"
                >
                  查看</el-button
                >

                <el-button
                  type="text"
                  size="mini"
                  @click="handcorrect(scope.row)"
                  v-if="scope.row.correctStatus == 0"
                  >批改</el-button
                >
                <!-- <el-button
                type="text"
                size="mini"
                @click="handlerevoke(scope.row)"
                v-if="scope.row.accomplishCondition == 3"
                >撤销批改</el-button
              > -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <!-- 分页 -->
      <div class="beiye">
        <el-pagination
          background
          layout="prev, pager, next,total"
          @current-change="handleCurrentChange"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getCorrectList } from "@/api/teacher";
export default {
  components: {},
  data() {
    return {
      projectId: "", //项目ID
      bosliet: [], //列表

      realName: "", //提交人
      correctStatus: "", //状态

      total: null,
      pageNum: 1
    };
  },
  methods: {
    //获取信息列表
    getCorrectList() {
      getCorrectList({
        projectId: this.projectId,
        pageNum: this.pageNum,
        pageSize: 10,
        realName: this.realName, //姓名
        correctStatus: this.correctStatus //状态
      })
        .then(res => {
          // console.log(res.data.list);
          if (res.code == 200) {
            this.bosliet = res.data.list;
            this.total = res.data.total;
          }
        })
        .catch(err => {});
    },

    //选择状态
    handleSelect(key, keyPath) {
      this.correctStatus = key;
      this.getCorrectList();
    },

    //选择第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getCorrectList();
    },
    //搜索
    btnsearch() {
      this.getCorrectList();
    },

    //返回
    turnback() {
      this.$router.push({
        path: "/correctionShare"
      });
    },
    //查看
    handlelook(val) {
      this.$router.push({
        path: "/correctionShare/Correcting",
        query: {
          projectId: this.projectId,
          correctId: val.correctId
        }
      });
    },

    //批改
    handcorrect(val) {
      this.$router.push({
        path: "/correctionShare/Correcting",
        query: {
          projectId: this.projectId,
          submitId: val.submitId,
          userName: val.userName
        }
      });
    }
    //撤销批改
    // handlerevoke(val) {
    //   repealCorrect({
    //     assignId: this.assignId,
    //     submitId: val.submitId,
    //     userName: val.userName
    //   })
    //     .then(res => {
    //       console.log(res);
    //       if (res.code == 200) {
    //         this.$message({
    //           type: "success",
    //           message: res.msg
    //         });
    //         this.correct();
    //       }
    //     })
    //     .catch(err => {});
    // }
  },
  mounted() {
    this.projectId = this.$route.query.projectId;
    this.getCorrectList();
  }
};
</script>

<style scoped>
.BosConer {
  width: 100%;
  padding: 0 50px;
}
.ConerTop {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.Bosaote {
  width: 100;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
#submit {
  cursor: pointer;
}
.Boslei {
  width: 100%;
  overflow: hidden;
}
.Boslei .Imgbos {
  width: 120px;
  height: 76px;
}
.Boslei .Imgbos img {
  width: 100%;
  height: 100%;
}
.beiye {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
<style>
.Boslei .el-table th > .cell {
  color: black;
}
.fixlring .el-input__inner {
  width: 150px;
  height: 25px;
}
.fixlring .el-input {
  width: auto;
}
.neibottom .el-checkbox {
  display: inherit;
  line-height: 30px;
}
.menu .el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
