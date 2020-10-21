<!--项目维护-->
<template>
  <div class="">
    <div class="steps bg-white padding10">
      <el-steps :active="stepNumber" align-center>
        <el-step title="基本信息" icon="el-icon-edit" @click="stepNumber = 0"></el-step>
        <el-step title="视频学习" icon="el-icon-video-camera-solid" @click="stepNumber = 1"></el-step>
        <el-step title="学习资料" icon="el-icon-picture" @click="stepNumber = 2"></el-step>
        <el-step title="实验报告" icon="el-icon-s-claim" @click="stepNumber = 3"></el-step>
      </el-steps>
    </div>
    <div class="mtop15 padding10">
      <div v-if="stepNumber===0" class="bg-white padding10">
        <el-form ref="info" :model="info" :rules="rules" class="edit-info" label-position="right" label-width="120px">
          <el-form-item prop="projectName" label="实验名称">
            <el-input placeholder="请输入" maxlength="15" style="width: 400px;" v-model="info.projectName" />
          </el-form-item>
          <el-form-item prop="projectPeriod" label="学时">
            <el-input placeholder="请输入" maxlength="15" style="width: 400px;" v-model.trim="info.projectPeriod"></el-input>
          </el-form-item>
          <el-form-item label="所属学院">
            {{info.collegeName}}
          </el-form-item>
          <el-form-item prop="majorId" label="所属学科">
            <el-select v-model="info.majorId">
              <el-option v-for="item in majorList" :label="item.majorName" :value="item.majorId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="isShare" label="是否开放共享">
            <el-radio-group class="mleft20" v-model="info.isShare">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="教学教师">
            <!--<el-select v-model="info.teacherId" multiple placeholder="请选择" style="width: 400px;">
              <el-option
                v-for="item in teacherList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>-->
            <div class="check-box">
              <el-checkbox-group v-model="info.teacherId">
                <el-checkbox
                  v-for="item in teacherList"
                  :label="item.userId"
                  :name="item.userId.toString()"
                  :disabled="arrangeList.indexOf(item.userId)!==-1?true:false"
                  :key="item.userId">
                  {{item.userName}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item label="共享批改教师">
            <!--<el-select v-model="info.shareTeacherId" multiple @remove-tag="removeTag" placeholder="请选择" style="width: 400px;">
              <el-option
                class="select-tag"
                v-for="item in teacherList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>-->
            <div class="check-box">
              <el-checkbox-group v-model="info.shareTeacherId">
                <el-checkbox
                  v-for="item in teacherList"
                  :label="item.userId"
                  :name="item.userId.toString()"
                  :key="item.userId">
                  {{item.userName}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <!--<el-tag v-for="item in info.shareList">{{item.shareTeacherName}}</el-tag>-->
          </el-form-item>
          <el-form-item>
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="需设置此实验各部分的成绩比例，它可做为后续教师布置实验时的参考比例；同时若该项目是开放共享的，系统以此比例做为其在共享流程中的成绩比例。" placement="bottom">
                <i class="el-icon-info"></i>
              </el-tooltip>
              <span>成绩比例</span>
            </span>
            <span>
              视频：<el-input-number v-model="info.videoScore" style="width: 60px;" :precision="0" :controls="false" size="small" /> %
            </span>
            <span class="mleft20">
              虚拟实验：<el-input-number v-model="info.experimentScore" style="width: 60px;"  :precision="0" :controls="false" size="small" /> %
            </span>
            <span class="mleft20">
              实验报告：<el-input-number v-model="info.reportScore" style="width: 60px;" :precision="0" :controls="false" size="small" /> %
            </span>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="只能上传jpg/png文件，且不超过2M" placement="bottom">
                <i class="el-icon-info"></i>
              </el-tooltip>
              <span>实验封面</span>
            </span>
            <el-upload
            action="#"
            :fileList="info.cover"
            :on-change="coverHandleChange"
            list-type="picture-card"
            :auto-upload="false"
            accept=".png, .jpg"
            >
              <!--<el-button size="small" type="primary">点击上传</el-button>-->
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="实验介绍">
            <el-input placeholder="请输入" maxlength="300" type="textarea" v-model="info.introduce"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="stepNumber===1" class="bg-white padding10">
         <div v-if="video.list.length === 0">
           <div class="flex-left-top" >
             <div style="width: 50%;">
               <div class="flex-between-center">
                 <div class="video-name">
                   视频名称： <el-input v-model="video.name" placeholder="请输入" style="width: 200px;"></el-input>
                 </div>
                 <div>
                   <el-upload
                     :action="video.uploadAdd"
                     :auto-upload="true"
                     :headers="{
                        Authentication: token
                      }"
                       :data="{
                        videoName: video.name ||'--',
                        videoIntroduce: video.introduce||'--',
                        videoProjectId: projectId
                      }"
                     :show-file-list="false"
                     accept=".mp4"
                     :on-success="addVideoSuccess"
                   >
                     <el-button type="text">上传视频</el-button>
                   </el-upload>
                 </div>
               </div>
               <div class="video-introduce">
                 视频介绍：<el-input type="textarea" v-model="video.introduce" :rows="5"></el-input>
               </div>
             </div>
           </div>
         </div>
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
      <div v-if="stepNumber===2" class="edit-project">
        <div class="flex-left-center padding10 bg-white">
          <div class="text-right">
            <el-upload
              :action="studyResource.uploadUrl"
              :auto-upload="true"
              :headers="{
                  Authentication: token
                }"
              :data="{
                  projectId: projectId
                }"
              :show-file-list="false"
              :on-success="studyResourceSuccess"
            >
              <el-button type="primary">上传文件</el-button>
            </el-upload>
          </div>
          <!--<div class="mleft20">
            <el-upload
              :action="studyResource.uploadUrl"
              :auto-upload="true"
              :headers="{
                  Authentication: token
                }"
              :data="{
                  projectId: projectId
                }"
              :show-file-list="false"
              :on-success="videoSuccess"
              accept=".mp4"
            >
              <el-button type="primary">上传图片</el-button>
            </el-upload>
          </div>
          <div class="mleft20">
            <el-upload
              :action="studyResource.uploadUrl"
              :auto-upload="true"
              :headers="{
                  Authentication: token
                }"
              :data="{
                  videoProjectId: projectId
                }"
              :show-file-list="false"
              :on-success="videoSuccess"
              accept=".mp4"
            >
              <el-button type="primary">上传文件</el-button>
            </el-upload>
          </div>-->

        </div>
        <el-collapse v-model="studyResource.open" class="mtop15">
          <el-collapse-item name="video">
            <template slot="title">
              <span class="study-title">视频资料</span> <i class="header-icon el-icon-info"></i>
            </template>
            <div class="flex-left-center" style="flex-wrap: wrap;">
              <div v-for="item in studyResource.video" style="width: 48%; margin-right: 1%;margin-left: 1%;">
                <div style="">
                  <video :src="url+item.materialsPath" controls style="width: 100%;height: 18vw;object-fit: fill;"></video>
                </div>
                <div class="mleft10 flex-between-center">
                  <span>{{item.materialsName}}</span>
                  <el-button type="text" @click="deleteResource(item.learnId)">删除</el-button>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="studyResource.open1"  class="mtop15">
          <el-collapse-item name="images">
            <template slot="title">
              <span class="study-title">图片资料</span> <i class="header-icon el-icon-info"></i>
            </template>
            <div>
              <div class="flex-left-center">
                <div class="mleft20" v-for="item in studyResource.images">
                  <img :src="url+item.materialsPath" style="height: 100px;border: 1px solid #eee;background: #eee;" />
                  <div>{{item.materialsName}}</div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="studyResource.open2" class="mtop15">
          <el-collapse-item name="files">
            <template slot="title">
              <span class="study-title">文件资料</span> <i class="header-icon el-icon-info"></i>
            </template>
            <div>
              <div class="flex-left-center" v-for="item in studyResource.files">
                <div class="resource-name">{{item.materialsName}}</div>
                <div>
                  <el-button type="text" @click="deleteResource(item.learnId)">删除</el-button>
                  <el-button type="text" class="mleft10" @click="downloadResource(item.learnId)">下载</el-button>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div v-if="stepNumber===3">
        <div>
          <div>实验报告要求</div>
          <editor id="editor_require" class="mtop10" height="300px" width="100%" :content.sync="report.required"
                  :loadStyleMode="false">
          </editor>
        </div>
        <div class="mtop20">
          <div>实验报告模板</div>
          <editor id="editor_template" class="mtop10" height="300px" width="100%" :content.sync="report.template"
                  :loadStyleMode="false">
          </editor>
        </div>
      </div>
    </div>
    <div class="text-center bg-white mtop10 padding10">
      <el-button v-if="stepNumber===0" @click="$router.push({ path: '/projectMaintain' })">返回列表</el-button>
      <el-button v-else @click="stepNumber--">上一步</el-button>
      <el-button @click="toSave()" type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { getProInfo, editProInfo, getProVideo, editProVideo, addProVideo, delVideo, getProReport, editProReport, getStudyFiles } from "../../api/teacher";
  import { checkAssigned, getTeacherAssign } from "../../api/admin";
  import { teacherData, majorData } from "../../api/common";
  import { apiPath } from "../../config/env";
  import editor from '@/components/KindEditor'
  import store from '@/store'
  export default {
    name: 'projectMaintain',
    computed: {},
    components:{
      editor
    },
    data() {
      return {
        url: apiPath,
        token: `Bearer ${store.state.user.token}`,
        stepNumber: 0,
        projectId: '',
        isArranged: false,
        majorList: [],
        arrangeList: [],
        teacherList: [],
        info: {
          projectName: '',
          projectPeriod: 0,
          collegeId: undefined,
          collegeName: '',
          majorId: undefined,
          isShare: true,
          videoScore: 0,
          reportScore: 0,
          experimentScore: 0,
          teachList: [],
          teacherId: [],
          shareList: [],
          shareTeacherId: [],
          cover: [],
          introduce: ''
        },
        video: {
          list: [],
          name: '',
          introduce: '',
          fileList: [],
          uploadUrl: `${apiPath}/experiment/updateProjectVideo`,
          uploadAdd: `${apiPath}/experiment/editProjectVideo`
        },
        studyResource: {
          open: 'video',
          open1: 'images',
          open2: 'files',
          activeName: [],
          video: [],
          images: [],
          files: [],
          uploadUrl: `${apiPath}/experiment/uploadProjectLearn`
        },
        report: {
          required: '',
          template: ''
        },
        rules: {
          projectName: [
            {required: true, message: '请输入实验名称', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          isShare: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        }
      }
    },
    watch: {
      stepNumber: function () {
        switch (this.stepNumber){
          case 0:
            this.getBasicInfo()
            break;
          case 1:
            this.getVideo()
            break;
          case 2:
            this.getStudyList()
            break;
          case 3:
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
        this.getBasicInfo()
        this.assigned()
        this.getMajor()
        this.getTeachList()
      },
      // 判断实验是否被布置
      assigned(){
        checkAssigned({ projectId: this.projectId }).then(res=>{
          if(res.code){
            this.isArranged = res.data
          }
        })
      },
      // 获取教师列表
      getTeacherList(){
        teacherData({ collegeId: this.info.collegeId }).then(res=>{
          this.teacherList = res.data
        })
      },
      // 获取学科
      getMajor(){
        majorData({collegeId: this.collegeId}).then(res=>{
          this.majorList = res.data
        })
      },
      // 获取基本信息
      getBasicInfo(){
        getProInfo({ projectId: this.projectId }).then(res=>{
          if(res.code === 200){
            let project = res.data.project
            this.info = {
                projectName: project.projectName,
                projectPeriod: project.projectPeriod,
                collegeName: project.collegeName,
                collegeId: project.college,
                majorId: project.belongSubject,
                reportScore: project.reportScore,
                videoScore: project.videoScore,
                experimentScore: project.experimentScore,
                isShare: project.whetherOpen,
                teachList: res.data.projectTeachList,
              teacherId:[],
              shareTeacherId: [],
                shareList: res.data.projectShareList,
                cover: [{url: `${this.url}${project.cover}`}],
                introduce: project.introduce
            }
            this.info.teacherId = this.info.teachList.map(item=>{
              return item.projectTeacherId
            })
            this.info.shareTeacherId = this.info.shareList.map(item=>{
              return item.shareTeacherId
            })
            this.getTeacherList()
          }
        }).catch(err=>{

        }).finally(()=>{

        })
      },
      // 获取视频信息
      getVideo(){
        getProVideo({ projectId: this.projectId }).then(res=>{
          if (res.code == 200) {
            this.video.list = res.data
          }
        })
      },
      addVideoSuccess(res){
        if(res.code===200){
          this.getVideo()
          this.$message.success('操作成功！')
        }else{
          this.$message.error(res.msg)
        }
      },
      // 保存学习视频
      saveVideo(){
        if(this.video.list.length!==0){
          const formData = new FormData()
          formData.append('videoId', this.video.list[0].videoId)
          formData.append('videoProjectId', this.projectId)
          formData.append('videoIntroduce', this.video.list[0].videoIntroduce)
          formData.append('videoName', this.video.list[0].videoName)
          formData.append('file', null)
          editProVideo(formData).then(res=>{
            if(res.code === 200) {
              this.$message.success('保存成功！')
              this.stepNumber++
            }
          })
        } else {
          this.stepNumber++
        }
      },
      toSave(){
        switch (this.stepNumber){
          case 0:
            this.saveBasicInfo()
            break;
          case 1:
            this.saveVideo()
            break;
          case 2:
            this.stepNumber++
            break;
          case 3:
            this.editReport()
            break;
          default:
            break;
        }
      },
      // 保存基本信息
      saveBasicInfo(){
        this.$refs['info'].validate((valid) => {
          if (valid) {
            if((this.info.videoScore + this.info.reportScore + this.info.experimentScore) !== 100){
              this.$message.warning('成绩比例之和应为100%')
              return false
            }
            const formData = new FormData()
            formData.append('projectId', this.projectId)
            formData.append('videoScore', this.info.videoScore)
            formData.append('reportScore', this.info.reportScore)
            formData.append('experimentScore', this.info.experimentScore)
            formData.append('whetherOpen', this.info.isShare)
            formData.append('shareTeacherIds', this.info.shareTeacherId)
            formData.append('projectTeaIds', this.info.teacherId)
            formData.append('belongSubject', this.info.majorId)
            formData.append('projectPeriod', this.info.projectPeriod)
            formData.append('projectName', this.info.projectName)
            formData.append('introduce', this.info.introduce)
            if(this.info.cover.length === 0){
              formData.append('file', [])
            } else {
              formData.append('file', this.info.cover[0].raw || null)
            }
            editProInfo(formData).then(res=>{
              if (res.code === 200) {
                this.$message.success('操作成功!')
                this.stepNumber = 1
              } else {
                this.$message.success('操作失败!')
              }
            })
          } else {
            console.log('保存失败!');
            return false;
          }
        });
      },
      videoSuccess(res){
        if(res.code === 200) {
          this.$message.success('修改成功！')
        } else {
          this.$message.error(res.msg)
        }
        this.getVideo()
      },
      // 获取学习资料
      getStudyList(){
        getStudyFiles({ projectId: this.projectId}).then(res=>{
          if (res.code === 200) {
            this.studyResource.video = []
            this.studyResource.images = []
            this.studyResource.files = []
            for (let i = 0;i<res.data.length;i++){
              if(res.data[i].materialsCategory === 1) {
                this.studyResource.video.push(res.data[i])
              } else if(res.data[i].materialsCategory === 2) {
                this.studyResource.images.push(res.data[i])
              } else {
                this.studyResource.files.push(res.data[i])
              }
            }
          }
        })
      },
      studyResourceSuccess(res){
        if(res.code === 200){
          this.$message.success('上传成功')
          this.getStudyList()
        } else {
          this.$message.error(res.msg)
        }
      },
      // 获取实验报告
      getReport(){
        getProReport({projectId: this.projectId}).then(res=>{
          if(res.code === 200){
            this.report.required = res.data.experimentReportTemplate
            this.report.template = res.data.experimentReportContent
          }

        })
      },
      // 修改实验报告
      editReport(){
        editProReport({
          projectId: this.projectId,
          experimentReportTemplate: this.report.required,
          experimentReportContent: this.report.template
        }).then(res=>{
          if (res.code===200){
            this.$message.success('操作成功！')
            this.$router.push({ path: '/projectMaintain' })
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      // 获取布置过实验的教师名单
      getTeachList(){
        getTeacherAssign({projectId: this.projectId}).then(res=>{
          this.arrangeList = []
          if(res.code === 200){
            let arr = res.data.map(item=>{
              return item.userId
            })
            this.arrangeList = arr
          }
        })
      },
      // 删除学习视频
      deleteVideo(_id){
        this.$confirm('确定删除该视频吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delVideo({ videoId: _id}).then(res=>{
            if(res.code === 200) {
              this.$message.success('删除成功！')
              this.getVideo()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          console.info('取消删除。。。。。。。')
        })
        delVideo
      },
      // 删除资料
      deleteResource(_id){
        this.$confirm('确定删除该资源吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // deleteResource({ projectId: _id}).then(res=>{
          //   if(res.code === 200) {
          //     this.$message.success('删除成功！')
          //     this.getDataList()
          //   } else {
          //     this.$message.error(res.msg)
          //   }
          // })
        }).catch(() => {
          console.info('取消删除。。。。。。。')
        })
      },
      // 下载学习资料
      downloadResource(_id){
        window.open(`${apiPath}/experiment/downloadProjectLearnMaterials?learnId=${_id}`)
      },
      coverHandleChange(fileList){
        const isJPG = fileList.name.indexOf('.jpg') === -1  || fileList.name.indexOf('.png') === -1
        const isLt2M = fileList.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('封面图片只能是 JPG 或 PNG 格式!');
          this.coverRemoveFile(fileList)
          return false
        } else if (!isLt2M) {
          this.$message.error('封面图片大小不能超过 2MB!');
          this.coverRemoveFile(fileList)
          return false
        }
        this.info.cover = [fileList]
      },
      coverRemoveFile(file) {
        this.ruleForm.coverImg = []
      },
    }
  }
</script>

<style lang="scss" scoped>
  .edit-info{
    width: 600px;
    margin: 0 auto;
    .el-form-item{
      margin-bottom: 15px;
    }
    .check-box{
      minx-width: 400px;
      width: 100%;
      padding: 0px 10px;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      min-height: 47px;
    }
  }
  .select-tag{
    .el-tag.el-tag--info .el-tag__close{
      display: none;
    }
  }
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
  .study-title{
    font-size: 16px;
    font-weight: 600;
  }
  .resource-name{
    min-width: 400px;
  }
</style>
