<!--项目维护-->
<template>
  <div>
    编辑实验
    <el-steps :active="1">
      <el-step title="基本信息" icon="el-icon-edit"></el-step>
      <el-step title="学习视频" icon="el-icon-upload"></el-step>
      <el-step title="学习资料" icon="el-icon-picture"></el-step>
      <el-step title="实验报告" icon="el-ico"></el-step>
    </el-steps>
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
    toEdit(_id){

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
