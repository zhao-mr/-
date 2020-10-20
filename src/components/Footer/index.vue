<template>
  <div class="footer">
    <div class="main">
      <div class="part1">友情链接：国家虚拟仿真实验教学项目共享平台</div>
      <div class="part2">建设单位：xxxxxx</div>
      <div class="part3">技术支持：上海形拓网络科技有限公司</div>
      <div class="part4">推荐使用：Chrome或Firefox等主流浏览器</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
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
.footer {
  background: #040522;
  height: 45px;
  line-height: 45px;
  min-width: 1200px;
  width: 100%;
  .main {
    height: 45px;
    text-align: center;
    font-size: 14px;
    color: #b2b6bb;
    font-family: "Microsoft Yahei";
    div {
      display: inline-block;
      padding: 0 25px;
    }
  }
}
</style>