<template>
  <div class="BosConer">
    <div class="Bostheme">
      <h1>虚拟仿真实验名称</h1>
    </div>
    <el-card class="box-card">
      <div class="content">
        <div class="lfet">
          <span>视频学习：</span>
          <span>60（=100*30%）</span>
          <span></span>
        </div>
        <div class="rieng">
          <span>评分: </span>
          <el-input v-model="input" placeholder="请输入"></el-input>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="content">
        <div class="lfet">
          <span>虚拟实验操作：</span>
          <span>40 ‘（=100*30%）</span>
          <span>查看试验台</span>
        </div>
        <div class="rieng">
          <span>评分: </span>
          <el-input v-model="input" placeholder="请输入"></el-input>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="content">
        <div class="lfet">
          <span>实验报告：</span>
          <span>20 '（=100*30%）</span>
          <span></span>
        </div>
        <div class="rieng">
          <span>评分: </span>
          <el-input v-model="input" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="">
        1111
      </div>
    </el-card>
    <h4>评语:</h4>
    <el-card class="box-card" style="margin-top: 10px;">
      <el-input
        type="textarea"
        :rows="8"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
    </el-card>
    <div class="Bosbootm">
      <el-button type="primary">提 交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      textarea: ""
    };
  },
  methods: {
    //取消
    cancel() {
      this.$router.push({ path: "/teachInner/correctList" });
    }
  },
  mounted() {}
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
</style>
<style scoped>
.BosConer .el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0 0px 12px 0 rgba(0, 0, 0, 0.2);
}
.rieng .el-input {
  width: 100px;
}
</style>
