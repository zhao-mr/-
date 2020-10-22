<!--全部实验-查看实验-->
<template>
  <div class="edit-project">
    <div class="bg-white padding10 flex-left-top">
      <div style="min-width: 200px;">
        <img :src="url+info.cover" class="info-cover" height="200" />
      </div>
      <div class="mleft20">
        <div class="flex">
          <div class="info-title">项目名称：</div>
          <div class="info-content">{{info.projectName||'--'}}</div>
        </div>
        <div class="flex">
          <span class="info-title">项目学时：</span>
          <span class="info-content">{{info.projectPeriod||'--'}}</span>
        </div>
        <div class="flex">
          <span class="info-title">所属学院：</span>
          <span class="info-content">{{info.collegeName||'--'}}</span>
        </div>
        <div class="flex">
          <span class="info-title">所属学科：</span>
          <span class="info-content">{{info.majorName||'--'}}</span>
        </div>
        <div class="flex">
          <span class="info-title">项目负责人：</span>
          <span class="info-content">{{info.userName||'--'}}</span>
        </div>
        <div class="mtop15">
          <el-button @click="start()" style="padding: 10px 30px;border-radius: 20px;">开始实验</el-button>
        </div>

      </div>
    </div>
    <div class="bg-white padding10 mtop10" style="min-height: 0px;">
      <el-tabs v-model="activeName">
        <el-tab-pane label="实验介绍" name="introduce">
          {{info.introduce || '暂无实验介绍'}}
        </el-tab-pane>
        <el-tab-pane label="学习资料" name="files">
          <div></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="activeName==='files'" class="mtop10">
      <el-collapse v-model="learnInfo.open" class="">
        <el-collapse-item name="video">
          <template slot="title">
            <span class="study-title">视频资料</span> <i class="header-icon el-icon-info"></i>
          </template>
          <div class="flex-left-center" style="flex-wrap: wrap;">
            <div v-for="item in learnInfo.video" style="width: 48%; margin-right: 1%;margin-left: 1%;">
              <div style="">
                <video :src="url+item.materialsPath" controls
                       style="width: 100%;height: 18vw;object-fit: fill;"></video>
              </div>
              <div class="mleft10 flex-between-center">
                <span>{{item.materialsName}}</span>
                <span></span>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-collapse v-model="learnInfo.open1" class="mtop10">
        <el-collapse-item name="images">
          <template slot="title">
            <span class="study-title">图片资料</span> <i class="header-icon el-icon-info"></i>
          </template>
          <div>
            <div class="flex-left-center">
              <div class="mleft20" v-for="item in learnInfo.images">
                <img :src="url+item.materialsPath" style="height: 100px;border: 1px solid #eee;background: #eee;"/>
                <div>{{item.materialsName}}</div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-collapse v-model="learnInfo.open2" class="mtop10">
        <el-collapse-item name="files">
          <template slot="title">
            <span class="study-title">文件资料</span> <i class="header-icon el-icon-info"></i>
          </template>
          <div>
            <div class="flex-left-center" v-for="item in learnInfo.files">
              <div class="resource-name">{{item.materialsName}}</div>
              <div>
                <el-button type="text" class="mleft10" @click="downloadResource(item.learnId)">下载</el-button>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="mtop10 text-center">
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script>

  import { getProjectInfo, createRecord, updateStartTime } from "../../api/student";
  import {apiPath} from "../../config/env";

  export default {
    name: 'electiveView',
    data() {
      return {
        loading: false,
        url: apiPath,
        activeName: 'introduce',
        projectId: undefined,
        info: {},
        recordId: undefined,
        assignId: null,
        learnInfo: {
          open: 'video',
          open1: 'images',
          open2: 'files',
          video: [],
          images: [],
          files: []
        }
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.projectId = this.$route.query.projectId
        this.recordId = this.$route.query.recordId
        this.assignId = this.$route.query.assignId
        this.getInfo()
      },
      // 获取基本数据
      getInfo() {
        getProjectInfo({
          projectId: this.projectId
        }).then(res => {
          if (res.code === 200) {
            this.info = res.data.roProject
            let learn=res.data.learnMaterialsList
            this.learnInfo.video = []
            this.learnInfo.images = []
            this.learnInfo.files = []
            for (let i = 0;i<learn.length;i++){
              if(learn[i].materialsCategory === 1) {
                this.learnInfo.video.push(learn[i])
              } else if(learn[i].materialsCategory === 2) {
                this.learnInfo.images.push(learn[i])
              } else {
                this.learnInfo.files.push(learn[i])
              }
            }
          }
        })
      },
      // 下载学习资料
      downloadResource(_id){
        window.open(`${apiPath}/experiment/downloadProjectLearnMaterials?learnId=${_id}`)
      },
      // 开始实验
      start(){
        let isOption = this.$route.name === 'electiveView'
        if(this.recordId === undefined || this.recordId === null){
          // 生成记录
          createRecord({
            projectId: this.projectId,
            assignId: isOption ? null : this.assignId,
            status: isOption ? 0 : 1 // 0为选修，1为必修
          }).then(res=>{
            if(res.code === 200){
              if(isOption){
                this.$router.push({ path: '/allExperiment/electiveExperiment', query: { projectId: this.projectId, recordId: res.data }})
              } else {
                this.$router.push({ path: '/myExperiment/arrangedExperiment', query: { projectId: this.projectId, recordId: res.data }})
              }
            }
          })
        } else {
          // 更新最近时间
          updateStartTime({
            status: isOption ? 0 : 1,
            submitId: this.recordId
          })
          if(isOption){
            this.$router.push({ path: '/allExperiment/electiveExperiment', query: { projectId: this.projectId, recordId: this.recordId }})
          } else {
            this.$router.push({ path: '/myExperiment/arrangedExperiment', query: { projectId: this.projectId, recordId: this.recordId }})
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .info-cover{

  }
  .info-title{
    color: #666;
    font-weight: bold;
    width: 120px;
    font-size: 14px;
    margin-top: 15px;
  }
  .info-content{
    color: #666;
    font-size: 14px;
    margin-top: 15px;
  }
</style>
