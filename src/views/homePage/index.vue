<template>
  <div class="all-experiment">
    <div class="header">
      <div class="header-content">
        <div class="header-top">
          <div class="header-top-left">
            <img src="../../assets/homePage/logo.png" alt="">
            <ul>
              <li>全部实验</li>
              <li>资讯动态</li>
              <li>下载中心</li>
            </ul>
          </div>
          <div class="header-top-right">
            <el-input
              placeholder="请输入实验名称"
              suffix-icon="el-icon-search"
              v-model="experimentName">
            </el-input>
            <span>登录</span>
          </div>
        </div>
        <div class="header-font">
          <h1>虚拟仿真实验教学共享平台</h1>
          <div>创新教育·引领未来</div>
        </div>
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: "AllExperiment",
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {}

}
</script>

<style lang="scss" scoped>

.all-experiment {
  * {
    margin: 0;
    padding: 0;
  }
  .header {
    background-color: #2280ff;
    height: 280px;
    // background: url('http://wenjian.rofall.net/group41/M00/00/60/wKgA0F7F3GKEebPXAAAAAAHmWbg117.png') no-repeat center #2280ff;
    .header-content {
      width: 1200px;
      margin: 0 auto;
      .header-top {
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        .header-top-left {
          flex: 1;
          display: flex;
          align-items: center;
          img {
            height: 50px;
          }
          ul {
            list-style-type: none;
            font-size: 16px;
            color: #fff;
            // line-height: 50px;
            margin-left: 20px;
            li {
              width: 100px;
              float: left;
              padding: 0 10px;
              text-align: center;
            }
          }
        }
        .header-top-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .el-input {
            width: 308px;
            height: 40px;
            // margin-top: 20px;
            margin-right: 40px;
          }
          span {
            font-family: "Microsoft Yahei";
            font-size: 18px;
            letter-spacing: 2px;
            color: #207eff;
            padding: 15px 45px;
            background-color: white;
            border-radius: 5px;
          }
        }
      }
      .header-font {
        h1 {
          font-size: 36px;
          font-family: "Microsoft Yahei";
          color: #fff;
          font-weight: bold;
          padding-top: 100px;
          padding-bottom: 25px;
        }
      }
    }
  }
}
</style>

