<template>
  <div class="bos">
    <div class="botntop">
      <el-row>
        <el-button type="primary" @click="turnback">返 回</el-button>
      </el-row>
    </div>
    <h2 style="text-align: center;">基于时空数据的政策评估虚拟仿真</h2>
    <div class="Condeaout">
      <ul>
        <li>
          <div class="Boslfeit">项目名称：</div>
          <div class="Boslrige">
            <el-input v-model="inputname" placeholder="请输入内容"></el-input>
          </div>
        </li>
        <li>
          <div class="Boslfeit">开始时间：</div>
          <div class="Boslrige">
            <el-input v-model="inputname" placeholder="请输入内容"></el-input>
          </div>
        </li>
        <li>
          <div class="Boslfeit">结束时间：</div>
          <div class="Boslrige">
            <el-input v-model="inputname" placeholder="请输入内容"></el-input>
          </div>
        </li>
        <li>
          <div class="Boslfeit">选择学生：</div>
          <div
            class="Boslrige  rigeinp"
            style="display: flex;justify-content: space-between;"
          >
            <el-input v-model="inputname" placeholder="请输入内容"></el-input>
            <el-input v-model="inputname" placeholder="请输入内容"></el-input>
            <el-input v-model="inputname" placeholder="请输入内容"></el-input>
          </div>
        </li>
        <li>
          <div class="Boslfeit"></div>
          <div class="Boslrige">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              v-model="textarea"
              class="resizeNone"
            >
            </el-input>
          </div>
        </li>
        <li>
          <div class="Boslfeit">成绩比例：</div>
          <div class="Boslrige lrigechen">
            <div>
              实验成绩<el-input
                v-model="inputname"
                placeholder="请输入内容"
              ></el-input
              >%
            </div>
            <div>
              报告成绩<el-input
                v-model="inputname"
                placeholder="请输入内容"
              ></el-input
              >%
            </div>
            <div>
              视频成绩<el-input
                v-model="inputname"
                placeholder="请输入内容"
              ></el-input
              >%
            </div>
          </div>
        </li>
        <li>
          <div class="auot">
            <el-row>
              <el-button type="primary">提 交</el-button>
            </el-row>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputname: "",
      textarea: ""
    };
  },
  methods: {
    //返回
    turnback() {
      this.$router.push({ path: "/teachInner" });
    }
  }
};
</script>

<style scoped>
.bos {
  padding: 0 50px;
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
</style>
