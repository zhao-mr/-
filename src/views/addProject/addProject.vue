<!--项目列表-->
<template>
  <div>
    <div class="data-table">
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
        <
      </el-table>
    </div>
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
</template>

<script>
export default {
  name: 'addProject',
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
      viewVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
