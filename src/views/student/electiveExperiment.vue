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

    <div class="mtop15">
      <div v-if="stepNumber===0" class="bg-white padding10">
        <div class="flex-left-top" >
          <div style="background: #000;position: relative;" class="flex-center-center">
            <video :src="url+video.videoPath" controls style="height: 240px;overflow: hidden;" ref="video"></video>
            <div style="position: absolute;top: 0px;right: 0px;padding: 5px 10px;background: rgba(0,0,0,.8);color: #fff;">{{video.status?'已看完':'未看完'}}</div>
          </div>
          <div style="width: 50%;" class="mleft20">
            <div class="flex-between-center">
              <div class="video-name">
                视频名称：{{video.videoName}}
              </div>
            </div>
            <div class="video-introduce flex-left-top">
              视频介绍： {{video.videoIntroduce}}
            </div>
          </div>
        </div>
        <div v-if="video.list.length===0">
          没有要学习的视频
        </div>
      </div>
      <div v-if="stepNumber===1">
        <iframe :src="link" height="700px" width="100%"></iframe>
      </div>
      <div v-if="stepNumber===2" class="bg-white padding10">
        <h2>实验报告要求</h2>
        <div style="border: 1px solid #eee;" class="padding10" v-html="report.required||'暂无数据'"></div>
        <h2 class="mtop30">实验报告内容</h2>
        <div v-html="report.template"></div>
      </div>
    </div>
    <div class="text-center bg-white mtop10 padding10">
      <el-button v-if="stepNumber===0" @click="$router.go(-1)">返回</el-button>
      <el-button v-else @click="stepNumber--">上一步</el-button>
      <el-button @click="toSave(0)" type="primary">{{stepNumber===2?'暂存':'继续实验'}}</el-button>
      <el-button @click="toSave(1)" type="primary" v-if="stepNumber===2">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { getExperimentVideo, getExperimentLink, submitArranged, submitElective, updateExperimentVideo, getReportRecord, getRecordDetail } from "../../api/student";
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
          videoPath: '',
          videoName: '',
          videoIntroduce: '',
          status: 0,
        },
        link: '',
        report: {
          required: '',
          template: ''
        },
        isElective: true, // 是否为选修
      }
    },
    watch: {
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.projectId = this.$route.query.projectId
        this.recordId = this.$route.query.recordId
        this.isElective = this.$route.name === 'electiveExperiment'
        this.recordDetail()
        this.getVideo()
        this.getLink()
        this.getReport()

        // 视频播放器监听
        var video = this.$refs.video
        console.info(video && this.video.status === 0)
        if (video && this.video.status === 0) {
          video.autoplay = false
          let _this = this
          video.loop = false;
          video.addEventListener('ended', function () {
            _this.video.status = 1
            _this.updateVideo()
          }, false);
        }
      },
      toSave(status){
        switch (this.stepNumber){
          case 0:
            this.stepNumber++
            // this.updateVideo()
            break;
          case 1:
            this.stepNumber++
            // this.getLink()
            break;
          case 2:
            if(this.isElective){
              this.submitElectiveExperiment(status)
            } else {
              this.submitArrangedExperiment(status)
            }
            // this.getReport()
            break;
          default:
            break;
        }
      },
      // 获取视频学习
      getVideo() {
        getExperimentVideo({projectId: this.projectId}).then(res=>{
          if (res.code === 200) {
            this.video.list = [res.data]
            this.video.videoPath = res.data.videoPath
            this.video.videoIntroduce = res.data.videoIntroduce
            this.video.videoName = res.data.videoName
            // console.info(res.data)
          }
        })
      },
      // 更新视频成绩
      updateVideo(){
        updateExperimentVideo({
          submitId: this.recordId,
          videoStatus: this.video.status,
          status: this.isElective ? 0 : 1
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
      // 实验报告要求
      getReport(){
        getReportRecord({
          submitId: this.projectId,
          status: this.isElective ? 0 : 1
        }).then(res=>{
          if (res.code === 200) {
            this.report.required = res.data
          }
        })
      },
      // 获取记录详情
      recordDetail(){
        getRecordDetail({
          submitId: parseInt(this.recordId),
          status: this.isElective ? 0 : 1
        }).then(res=>{
          if (res.code === 200) {
            this.report.template = res.data.experimentTemplate
            this.video.status = res.data.videoStatus ? 1 : 0
          }
        })
      },
      // 必修 - 保存实验记录
      submitArrangedExperiment(status){
        submitArranged({
          "submitId": this.recordId,
          "mustExperimentContent": this.report.template,
          "submitStatus": status
        }).then(res=>{
          if(res.code === 200){
            this.$router.push({path: '/myExperiment'})
          }
        })
      },
      // 选修 - 保存实验记录
      submitElectiveExperiment(status){
        submitElective( {
          "submitId": this.recordId,
          "experimentContent": this.report.template,
          "submitStatus": status
        }).then(res=>{
          if (res.code === 200) {
            // console.info(this.$route)
            // if(this.$route.from.name === 'myExperiment') {
            //
            // } else {
            //
            // }
            // this.$router.push({path: '/allExperiment'})
            this.$router.go(-2)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .video-name{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
  .video-introduce{
    /* padding: 10px;
     background: #eee;*/
    margin-top: 10px;
    width: 98%;
    margin-top: 10px;
    min-height: 200px;
    border-radius: 4px;
    font-size: 14px;
  }
</style>
