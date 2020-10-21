<!--全部实验-->
<template>
  <div>
    <div class="param-card flex-left-center">
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
    <div class="mtop20">
      <div class="flex-left-center" style="flex-wrap: wrap;background: #fff;padding-bottom: 20px;">
        <div v-for="item in list.data" :key="item.projectId" class="project-card">
          <div style="height: 200px;">
            <el-image :src="url+item.cover" class="cover"></el-image>
            <div class="tag" v-if="item.rankName">{{item.rankName}}</div>
          </div>
          <div class="text">
            <div class="project-name">{{item.projectName}}</div>
            <div class="flex-between-center mtop10">
              <div></div>
              <template v-if="item.whetherOpen">
                <el-button type="primary" class="start-experiment" @click="toView(item.projectId)">
                  开始实验
                </el-button>
              </template>
              <template v-else>
                <div class="no-share">暂不共享</div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="mtop20 text-center">
        <el-pagination
          background
          :current-page.sync="list.pageNum"
          :page-size="list.pageSize"
          :page-sizes="[10, 15, 20, 30]"
          layout="total, prev, pager, next, sizes, jumper"
          @change="pageChange"
          :total="list.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllProject } from "../../api/student";
import { apiPath } from "../../config/env";

export default {
  name: 'allExperiment',
  data(){
    return {
      loading: false,
      url: apiPath,
      keyword: '',
      list: {
        data: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
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
      this.loading = true
      getAllProject( {
        "collegeId": "",
        "majorId": "",
        "projectName": "",
        "pageNum": 1,
        "pageSize": 10
      }).then(res=>{
        this.list.data = res.data.list
        this.list.total = res.data.total
      }).finally(()=>{
        this.loading = false
      })
    },
    pageChange(){

    },
    toView(_id){
      this.$router.push({ path: '/allExperiment/electiveView', query:{ projectId: _id} })
    }
  }
}
</script>

<style lang="scss" scoped>


</style>
