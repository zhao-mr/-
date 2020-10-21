<!--项目列表-->
<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-input type="text" style="width: 260px;" v-model="projectList.keyword" placeholder="请输入关键字">
          <i
            class="el-icon-search el-input__icon"
            slot="prefix">
          </i>
        </el-input>
      </el-col>
      <el-col :span="4" align="right">
        <el-button type="primary" @click="toAdd()">添加实验</el-button>
      </el-col>
    </el-row>
    <div class="data-table">
      <el-table
        :data="projectList.data"
        v-loading="projectList.loading"
        stripe>
        <el-table-column label="序号" align="center" width="80">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="projectName" align="center" label="实验名称" min-width="120">
        </el-table-column>
        <el-table-column prop="totalScore" label="类型" align="center" min-width="180">
          <template slot-scope="scope">
            {{getName(scope.row.experimentKind)}}
          </template>
        </el-table-column>
        <el-table-column prop="scaleScore" label="操作" align="center" min-width="180">
          <template slot-scope="scope">
            <!--<el-button type="primary" class="operate-view" @click="toView(scope.row.projectId)">查看</el-button>-->
            <el-button type="primary" class="operate-edit" @click="toEdit(scope.row.projectId)">编辑</el-button>
            <el-button type="danger" class="operate-delete mleft20" @click="toDelete(scope.row.projectId)" v-if="scope.row.assignStatus!==1">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mtop20 text-center">
        <el-pagination
          background
          :current-page.sync="projectList.pageNum"
          :page-size="projectList.pageSize"
          :page-sizes="[10, 15, 20, 30]"
          layout="total, prev, pager, next, sizes, jumper"
          :total="projectList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { addProjectList, deleteProject } from "../../api/addProject";
  import { getTypeName } from "../../utils/default";
  import variables from '@/styles/variables.scss'

  export default {
  name: 'projectList',
  computed: {
  },
  data(){
    return {
      projectList: {
        loading: false,
        data: [],
        keyword: '',
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      viewVisible: false,
      addVisible: false
    }
  },
  mounted(){
    this.getDataList()
  },
  methods:{
    // 实验类型
    getDataList(){
      this.projectList.loading = true
      addProjectList({
        "pageNum": 1,
          "pageSize": 10,
          "projectName": ""
      }).then(res=>{
        this.projectList.data = res.data.list
        this.projectList.total = res.data.total
      }).finally(()=>{
        this.projectList.loading = false
      })
    },
    toDelete(_id){
      this.$confirm('确定删除该实验吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProject({ projectId: _id}).then(res=>{
          if(res.code === 200) {
            this.$message.success('删除成功！')
            this.getDataList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        console.info('取消删除。。。。。。。')
      })
    },
    toAdd(){
      this.$router.push({path: '/projectList/addProject'})
    },
    toView(_id){

    },
    toEdit(_id){
      this.$router.push({path: '/projectList/addProject', query: {projectId: _id}})
    },
    // 获取实验类型名称
    getName(val){
      return getTypeName(val) || '--'
    }
  }
}
</script>
<style>
  @import "../../styles/common.scss";
</style>
<style lang="scss" scoped>
  .data-table{
    .el-table thead td{
      background: #409EFF;
      color: #fff;
    }
  }
</style>
