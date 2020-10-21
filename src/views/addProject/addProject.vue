<!--项目列表-->
<template>
  <div class="bg-white padding10">
    <h2 class="text-center">{{experimentId?'编辑实验':'添加实验'}}</h2>
    <div style="width: 800px;margin: 50px auto;">
      <el-form label-position="left" label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item prop="projectName" label="实验名称">
          <el-input placeholder="请输入" maxlength="15" style="width: 400px;" v-model.trim="form.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="projectType" label="实验类型">
          <el-select v-model.trim="form.projectType" style="width: 400px;">
            <el-option v-for="item in experimentTypeList" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="form.projectType === 1">
          <el-form-item prop="projectType" label="实验链接">
            <el-input placeholder="请输入" style="width: 400px;" v-model.trim="form.link"></el-input>
            <el-radio-group class="mleft20" v-model="form.isHref">
              <el-radio :label="0">嵌套</el-radio>
              <el-radio :label="1">跳转</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
        <template v-if="form.projectType == 2 ||form.projectType === 3">
          <el-form-item prop="projectType" label="实验资源">
            <el-upload
              action="#"
              :multiple="false"
              :show-file-list="true"
              :fileList="fileList"
              :before-upload="beforeUpload"
              :on-change="handleChange"
              :auto-upload="false"
            >
              <el-button type="button" size="small">上传资料</el-button>
            </el-upload>
          </el-form-item>
        </template>
        <el-form-item prop="tooltip" label="浏览器提示">
          <editor id="editor_id" height="300px" width="700px" :content.sync="form.tooltip"
                  :afterChange="afterChange()"
                  :loadStyleMode="false"
                  @on-content-change="onContentChange"></editor>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button type="primary" class="mleft20" @click="$router.back(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import editor from '../../components/KindEditor'
  import { addProject, getProjectInfo, updateProject } from "../../api/addProject";
  import {experimentType} from "../../utils/default";

  export default {
    name: 'addProject',
    computed: {},
    components: {
      editor
    },
    data() {
      return {
        experimentTypeList: experimentType,
        experimentId: '',
        form: {
          projectName: '',
          projectType: undefined,
          tooltip: '',
          link: '',
          isHref: 0
        },
        rules: {
          projectName: [{required: true, trigger: 'blur'}],
          projectType: [{required: true, trigger: 'blur'}]
        },
        fileList: [],
        editorText: '直接初始化值', // 双向同步的变量
        editorTextCopy: ''  // content-change 事件回掉改变的对象
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init(){
        this.experimentId = this.$route.query.projectId || ''
        if(this.experimentId!==''){
          this.getDetail()
        }
      },
      onContentChange(val) {
        this.editorTextCopy = val;
        window.console.log(this.editorTextCopy)
      },
      afterChange() {
      },
      // 查看详细信息
      getDetail(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getProjectInfo({ projectId: this.experimentId }).then(res=>{
          if(res.code===200){
            this.form.projectName = res.data.projectName
            this.form.tooltip = res.data.browserHint
            this.form.isHref = res.data.hrefStatus
            this.form.link = res.data.addressLink
            this.form.projectType = res.data.experimentKind
          }
        }).finally(()=>{
          loading.close()
        })
      },
      // 保存
      save() {
        const formData = new FormData()
        formData.append('projectName', this.form.projectName) // 项目名称
        formData.append('browserHint', this.form.tooltip) // 浏览器提示
        formData.append('experimentKind', this.form.projectType || 1) // 实验类型 	1为链接实验，2为客户端实验,3为演示实验
        formData.append('addressLink', this.form.projectType === 1 ? this.form.link : null) // 实验链接
        formData.append('experimentTableWidth', '1000') // 实验台宽
        formData.append('experimentTableHeight', '600') // 实验台高
        formData.append('hrefStatus', this.form.isHref) // 0为嵌套，1为跳转
        formData.append('whetherDeclare', false) // 是否申报
        formData.append('whetherStandard', false) // 是否标准对接接口对接
        // formData.append('experimentReportTemplate', null)
        formData.append('file', this.form.projectType !== 1 ? this.fileList[0].raw : null)
        if(this.experimentId === ''){
          addProject(formData).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.$router.push({path: '/projectList/list'})
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          updateProject(formData).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.$router.push({path: '/projectList/list'})
            } else {
              this.$message.error(res.msg)
            }
          })
        }

      },
      handleChange (fileList) {
        this.fileList = [fileList]
        // this.fileList.push(fileList)
      },
      removeFile(file){
        this.fileList = []
      },
      beforeUpload(){
      },
    }
  }
</script>
<style>
  @import "../../styles/common.scss";
</style>
<style lang="scss" scoped>
</style>
