<template>
  <div class="bos">
    <div class="botntop">
      <el-row>
        <el-button type="primary" @click="turnback">返 回</el-button>
      </el-row>
    </div>
    <div class="Boaoute">
      <div class="imglfet">
        <img
          src="http://wenjian.rofall.net/group41/M00/00/1E/wKgAP15wa-2ELn6lAAAAAEpcK7I478.png"
          alt="图片"
        />
      </div>
      <div class="conring">
        <h2>基于时空数实验名称</h2>
        <div class="clearfix">
          <ul>
            <li>所属学院：<span></span></li>
            <li>是否开放共享：<span></span></li>
            <li>所属学科：<span></span></li>
            <li style="width: 55%;">
              成绩比例：<span></span>实验成绩 : 100 % ，报告成绩 ： 100
              %，视频成绩 ： 100 %，习题成绩 ： 100 %
            </li>
            <li>项目学时：<span></span></li>
            <li>项目负责人：<span></span></li>
            <li>教学教师：<span></span></li>
            <li>共享批改教师：<span></span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="Bosboorm">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目介绍" name="first">项目介绍</el-tab-pane>
        <el-tab-pane label="实验资源" name="second">实验资源</el-tab-pane>
        <el-tab-pane label="视频" name="third">视频</el-tab-pane>
        <el-tab-pane label="实验报告要求" name="fourth"
          >实验报告要求</el-tab-pane
        >
        <el-tab-pane label="实验报告模板" name="moban"
          >实验报告模板</el-tab-pane
        >
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "project",
  components: {},
  data() {
    return {
      activeName: "first" //默认第一个项目介绍
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //返回
    turnback() {
      this.$router.push({ path: "/teachInner" });
    }
  },
  mounted() {}
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
</style>
<style>
.Bosboorm .el-tabs__item {
  font-size: 20px;
  /* padding: 5px 20px; */
  height: 48px;
}
</style>
