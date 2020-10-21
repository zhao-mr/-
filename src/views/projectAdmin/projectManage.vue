<!--项目管理-->
<template>
  <div>
    <div class="param-card flex-between-center mtop20">
      <div class="flex-left-center">
        <div>
          学院名称：
          <el-input placeholder="请输入" v-model="keyword" style="width: 200px" />
        </div>
        <div class="mleft20">
          学科分类：
          <el-input placeholder="请输入" v-model="keyword" style="width: 200px" />
        </div>
        <div class="mleft20">
          实验名称：<el-input placeholder="请输入" v-model="keyword" style="width: 200px" />
        </div>
      </div>

      <el-button type="primary" @click="downloadList()">导出项目</el-button>
    </div>
    <div class="data-table ">
      <el-table
        :data="list.data"
        v-loading="list.loading"
        stripe>
        <el-table-column label="序号" align="center" width="80">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="projectName" align="center" label="实验名称" min-width="220">
          <template slot-scope="scope">
            <div class="project-name-link">{{scope.row.projectName || '--'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="collegeName" align="center" label="学院" min-width="120">
        </el-table-column>
        <el-table-column prop="majorName" align="center" label="学科" min-width="120">
        </el-table-column>
        <el-table-column prop="rankName" align="center" label="级别" min-width="120">
          <template slot-scope="scope">
            {{scope.row.rankName || '--'}}
          </template>
        </el-table-column>
        <el-table-column prop="userName" align="center" label="负责人" min-width="120">
          <template slot-scope="scope">
            {{scope.row.userName || '未指派'}}
          </template>
        </el-table-column>
        <el-table-column prop="scaleScore" label="操作" align="center" min-width="180">
          <template slot-scope="scope">
            <!--<el-button type="primary" class="operate-view" @click="toView(scope.row.projectId)">查看</el-button>-->
            <el-button type="primary" class="operate-edit" @click="toEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mtop20 text-center">
        <el-pagination
          background
          :current-page.sync="list.pageNum"
          :page-size="list.pageSize"
          :page-sizes="[10, 15, 20, 30]"
          layout="total, prev, pager, next, sizes, jumper"
          :total="list.total">
        </el-pagination>
      </div>
    </div>
    <!--修改基本信息-->
    <el-dialog
       :visible.sync="edit.visible"
       :close-on-click-modal="true"
       align="center"
       title="修改基本信息"
    >
      <el-form :model="edit" :rules="rules" ref="edit" label-position="right" label-width="100px" align="left" style="width: 400px;margin: 0 auto;" >
        <el-form-item label="实验名称" prop="projectName">
          <el-input type="text" v-model="edit.projectName" autocomplete="off" maxlength="20" style="width: 300px;" />
        </el-form-item>
        <el-form-item label="学    时">
          <el-input type="number" v-model="edit.projectPeriod" style="width: 200px;padding-right: 0px;" />
        </el-form-item>
        <el-form-item label="学院名称">
          <el-select v-model="edit.collegeId" clearable placeholder="请选择" :disabled="isAssigned===1">
            <el-option
              v-for="item in collegeList"
              :key="item.collegeId"
              :label="item.collegeName"
              :value="item.collegeId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学科名称">
          <el-select v-model="edit.majorId" placeholder="请选择">
            <el-option
              v-for="item in majorList"
              :label="item.majorName"
              :value="item.majorId"
              :key="item.majorId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="edit.teacherId" placeholder="请选择">
            <el-option
              v-for="item in teacherList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('edit')">提交</el-button>
          <el-button @click="edit.visible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { manageProList, updateBasicInfo, checkAssigned } from "../../api/admin";
  import { collegeData, majorData, teacherData } from "../../api/common";
  // import { apiPath } from "../../config/env";
  import '@/utils/index'

  export default {
  name: 'projectManage',
  data(){
    var checkChargeMan = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('负责人不能为空'));
      }
    };

    return {
      keyword: '',
      list: {
        loading: false,
        data: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      editVisible: false,
      collegeList: [],
      majorList: [],
      teacherList: [],
      isAssigned: 0,
      edit: {
        visible: false,
        projectId: '',
        projectName: '',
        collegeId: '',
        majorId: '',
        teacherId: '',
        chargeMan: '',
        projectPeriod: 0
      },
      rules: {
        projectName: [
          { trigger:'blur', required:true, message: '请输入实验名称' }
        ],
        chargeMan: [
          { validator: checkChargeMan, trigger: 'blur' }
        ]
      }
    }
  },
    watch: {
      'edit.collegeId': function () {
        this.edit.majorId = ''
        this.edit.teacherId = ''
        this.getMajor()
        this.getTeacher()
      }
    },
  mounted(){
    // console.info(new Date().customTime(-365, "2018-01-01"))
    this.init()
  },
  methods:{
    init(){
      this.getList()
      this.getCollege()
    },
    // 获取学院
    getCollege(){
      collegeData().then(res=>{
        this.collegeList = res.data
      })
    },
    // 获取学科
    getMajor(){
      majorData({collegeId: this.edit.collegeId}).then(res=>{
        this.majorList = res.data
      })
    },
    // 获取教师
    getTeacher(){
      teacherData({collegeId: this.edit.collegeId}).then(res=>{
        this.teacherList = res.data
      })
    },
    getList(){
      manageProList( {
        "pageNum": this.list.pageNum,
        "pageSize": this.list.pageSize,
        "collegeId": '',
        "majorId": '',
        "projectName": this.keyword
      }).then(res=>{
        if (res.code == 200) {
          this.list.data = res.data.list
          this.list.total = res.data.total
        }
      })
    },
    toEdit(item){
      // console.info(item)
      this.edit.projectId = item.projectId
      this.edit.projectName = item.projectName
      this.edit.collegeId = item.college
      this.edit.majorId = item.belongSubject
      this.edit.userId = item.projectPrincipal
      this.edit.projectPeriod = item.projectPeriod
      this.checkExperiment()
      this.edit.visible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            "projectId": this.edit.projectId,
            "college": this.edit.collegeId,
            "belongSubject": this.edit.majorId,
            "projectRank": 2,
            "projectPeriod": this.edit.projectPeriod,
            "projectPrincipal": this.edit.teacherId
          }
          updateBasicInfo(params).then(res=>{
            if (res.code === 200) {
              this.$message.success('修改成功！')
              this.edit.visible = false
              this.getList()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 查看实验是否被布置
    checkExperiment(){
      checkAssigned({ projectId: this.edit.projectId }).then(res=>{
        if(res.code === 200) {
          this.isAssigned = res.data
        }
      })
    },
    // 导出列表
    downloadList(){
      window.open(`${apiPath}/experiment/exportProject`,'_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
  .project-name-link{
    color: #409eff;
  }
  .project-name-link:hover{
    cursor: pointer;
  }
</style>
