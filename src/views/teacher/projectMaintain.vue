<!--项目维护-->
<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-input style="width: 260px;" clearable v-model="projectList.keyword" @change="getDataList()" placeholder="请输入关键字">
          <i
            class="el-icon-search el-input__icon"
            slot="prefix">
          </i>
        </el-input>
      </el-col>
      <el-col :span="4" align="right">
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
        <el-table-column prop="cover" align="center" label="实验名称" min-width="220">
          <template slot-scope="scope">
            <div class="flex-left-center">
              <img :src="scope.row.cover ? url + scope.row.cover : 'icon.png'" height="80" width="140" />
              <el-button type="text" class="mleft10" @click="toView(scope.row)">{{scope.row.projectName}}</el-button>
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column prop="projectName" align="center" label="实验名称" min-width="200">
        </el-table-column>-->
        <el-table-column prop="collegeName" align="center" label="学院" min-width="120">
        </el-table-column>
        <el-table-column prop="majorName" align="center" label="学科" min-width="120">
        </el-table-column>
       <!-- <el-table-column prop="userName" align="center" label="负责人" min-width="120">
        </el-table-column>-->
        <el-table-column prop="scaleScore" label="操作" align="center" min-width="180">
          <template slot-scope="scope">
            <!--<el-button type="primary" class="operate-view" @click="toView(scope.row.projectId)">查看</el-button>-->
            <el-button type="primary" class="operate-edit" @click="toEdit(scope.row.projectId)">编辑</el-button>
            <!--<el-button type="danger" class="operate-delete mleft20" @click="toDelete(scope.row.projectId)" v-if="scope.row.assignStatus!==1">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mtop20 text-center">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="projectList.pageNum"
        :page-size="projectList.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="projectList.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { maintainList } from "../../api/teacher";
  import { apiPath } from "../../config/env";

  export default {
  name: 'projectMaintain',
  computed: {
  },
  data(){
    return {
      url: apiPath,
      projectList: {
        loading: false,
        data: [],
        keyword: '',
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.getDataList()
    },
    getDataList(){
      this.projectList.loading = true
      maintainList({
        "pageNum": this.projectList.pageNum,
        "pageSize": this.projectList.pageSize,
        "projectName": this.projectList.keyword
      }).then(res=>{
        this.projectList.data = res.data.list
        this.projectList.total = res.data.total
      }).finally(()=>{
        this.projectList.loading = false
      })
    },
    handleCurrentChange(val){
      this.projectList.pageNum = val
      this.getDataList()
    },
    toEdit(_id){
      this.$router.push({ path: '/projectMaintain/projectEdit', query: { projectId: _id } })
    },
    toView(_row){
      this.$router.push({ path: '/teachInner/project', query: { projectId: _row.projectId }})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
