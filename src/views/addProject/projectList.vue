<!--项目列表-->
<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-input type="text" style="width: 260px;" v-model="projectList.keyword" placeholder="请输入关键字" />
      </el-col>
      <el-col :span="4" align="right">
        <el-button type="primary" @click="addVisible = true">添加实验</el-button>
      </el-col>
    </el-row>
    <div class="data-table mtop10">
      <el-table
        :data="projectList.data"
        stripe>
        <el-table-column label="序号" align="center" width="80">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="userName" align="center" label="实验名称" min-width="120">
        </el-table-column>
        <el-table-column prop="totalScore" label="类型" align="center" min-width="180">
        </el-table-column>
        <el-table-column prop="scaleScore" label="操作" align="center" min-width="180">
        </el-table-column>
      </el-table>
      <div class="mtop20 text-right">
        <el-pagination
          background
          :current-page.sync="projectList.pageNum"
          :page-size="projectList.pageSize"
          :page-sizes="[10, 15, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="projectList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'projectList',
  computed: {
  },
  data(){
    return {
      projectList: {
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

  },
  methods:{
    // 实验类型
    getDataList(){

    }
  }
}
</script>
<style>
  @import "../../styles/common.css";
</style>
<style lang="scss" scoped>
  .data-table{

  }
</style>
