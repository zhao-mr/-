<!--项目列表-->
<template>
  <div>
    <h2 class="text-center">添加实验</h2>
    <div style="width: 800px;margin: 50px auto;">
      <el-form label-position="left" label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item prop="projectName" label="实验名称">
          <el-input placeholder="实验名称" maxlength="15" style="width: 400px;" v-model.trim="form.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="projectType" label="实验类型">
          <el-input placeholder="实验类型" maxlength="15" style="width: 400px;" v-model.trim="form.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="tooltip" label="浏览器提示">
          <editor id="editor_id" height="500px" width="700px" :content.sync="form.tooltip"
                  :afterChange="afterChange()"
                  :loadStyleMode="false"
                  @on-content-change="onContentChange"></editor>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button type="primary">保存</el-button>
        <el-button type="primary" class="mleft20" @click="$router.back(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import editor from '../../components/KindEditor'
export default {
  name: 'addProject',
  computed: {
  },
  components: {
    editor
  },
  data(){
    return {
      form: {
        projectName: '',
        projectType: 0,
        tooltip: ''
      },
      rules: {
        projectName: [{required:true, trigger: 'blur'}],
        projectType: [{required: true, trigger: 'blur'}]
      },
      editorText: '直接初始化值', // 双向同步的变量
      editorTextCopy: ''  // content-change 事件回掉改变的对象
    }
  },
  methods: {
    onContentChange (val) {
      this.editorTextCopy = val;
      window.console.log(this.editorTextCopy)
    },
    afterChange () {
    }
  }
}
</script>
<style>
  @import "../../styles/common.css";
</style>
<style lang="scss" scoped>
</style>
