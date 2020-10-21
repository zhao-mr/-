<!--开始实验-->
<template>
  <div>
    <div class="bg-white">
      <el-steps :active="stepNumber" align-center>
        <el-step title="视频学习" icon="el-icon-edit"></el-step>
        <el-step title="虚拟实验" icon="el-icon-video-camera-solid"></el-step>
        <el-step title="实验报告" icon="el-icon-s-claim"></el-step>
      </el-steps>
    </div>

    <div class="mtop15 padding10">
      <div v-if="stepNumber===0">
        <div class="flex-left-top" v-for="item in video.list" >
          <div style="background: #000;" class="flex-center-center">
            <video :src="url+item.videoPath" controls style="height: 300px;overflow: hidden;"></video>
          </div>
          <div style="width: 50%;" class="mleft20">
            <div class="flex-between-center">
              <div class="video-name">
                视频名称： <el-input v-model="item.videoName" placeholder="请输入" style="width: 200px;"></el-input>
              </div>
              <div>
                <el-upload
                  :action="video.uploadUrl"
                  :auto-upload="true"
                  :headers="{
                  Authentication: token
                }"
                  :data="{
                  videoId: item.videoId,
                  videoName: item.videoName,
                  videoIntroduce: item.videoIntroduce,
                  videoProjectId: projectId
                }"
                  :show-file-list="false"
                  :on-success="videoSuccess"
                  accept=".mp4"
                >
                  <el-button type="text">重新上传</el-button>
                </el-upload>
                <el-button v-if="isArranged!=1" @click="deleteVideo(item.videoId)" type="text" class="mleft10">删除</el-button>
              </div>
            </div>
            <div class="video-introduce flex-left-top">
              视频介绍： <el-input type="textarea" v-model="item.videoIntroduce" :rows="5" style="width: 400px;"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div v-if="stepNumber===1">
        <iframe :src="link" height="700px" width="100%"></iframe>
      </div>
      <div v-if="stepNumber===2"></div>
    </div>
    <div class="text-center bg-white mtop10 padding10">
      <el-button v-if="stepNumber===0" @click="$router.push({ path: '/projectMaintain' })">返回</el-button>
      <el-button v-else @click="stepNumber--">上一步</el-button>
      <el-button @click="toSave()" type="primary">{{stepNumber===2?'暂存':'保存'}}</el-button>
      <el-button @click="toSave()" type="primary" v-if="stepNumber===2">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { getExperimentVideo, getExperimentLink, saveExperiment, updateExperimentVideo, getReportRecord } from "../../api/student";
  import {apiPath} from "../../config/env";

  export default {
    name: 'electiveExperiment',
    data() {
      return {
        loading: false,
        url: apiPath,
        stepNumber: 0,
        projectId: undefined,
        recordId: undefined,
        video: {
          list: [],
          status: 0,
        },
        link: '',
        report: {
          required: '',
          template: ''
        }
      }
    },
    watch: {
      stepNumber: function () {
        switch (this.stepNumber){
          case 0:
            this.getVideo()
            break;
          case 1:
            this.getLink()
            break;
          case 2:
            this.getReport()
            break;
          default:
            break;
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.projectId = this.$route.query.projectId
        this.recordId = this.$route.query.recordId
        this.getVideo()
        this.getLink()
      },
      toSave(){
        switch (this.stepNumber){
          case 0:
            this.updateVideo()
            break;
          case 1:
            this.getLink()
            break;
          case 2:
            this.getReport()
            break;
          default:
            break;
        }
      },
      // 获取视频学习
      getVideo() {
        getExperimentVideo({projectId: this.projectId}).then(res=>{
          if (res.code === 200) {

          }
        })
      },
      // 更新视频成绩
      updateVideo(){
        updateExperimentVideo({
          submitId: this.recordId,
          videoStatus: this.video.status
        }).then(res=>{
          if(res.code === 200){
            this.$message.success('成功！')
            this.stepNumber++
          }
        })
      },
      // 获取虚拟实验链接
      getLink(){
        getExperimentLink({
          projectId: this.projectId
        }).then(res=>{
          if(res.code === 200) {
            this.link = res.data.addressLink
          }
        })
      },
      // 实验报告
      getReport(){
        getReportRecord({
          submitId: this.projectId,
          status: 0 // 0 是选修，1 是必修
        }).then(res=>{
          if (res.code === 200) {
            this.report.template = res.data
          }
        })
      },
      // 保存实验记录
      submitExperiment(){
        saveExperiment().then(res=>{
          if(res.code === 200){

          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
