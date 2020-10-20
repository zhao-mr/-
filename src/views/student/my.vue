<!--我的实验-->
<template>
  <div>
    <div class="cus-tabs">
      <div :class="activeIndex===0?'active':''" class="default" @click="activeIndex=0">必修</div>
      <div :class="activeIndex===1?'active':''" class="default" @click="activeIndex=1">选修</div>
    </div>
    <div class="mtop20">
      <div v-if="activeIndex===0" class="bg-white padding10">
        <div class="param-card1">
          <div class="mleft20">
            实验名称：<el-input type="text" placeholder="请输入" v-model="compulsory.keyword" style="width: 200px" />
          </div>
        </div>
        <div>
          <div v-for="item in compulsory.data" :key="item.projectId" class="project-card">
            <div style="height: 200px;">
              <el-image :src="url+item.cover" class="cover"></el-image>
              <div class="tag" v-if="item.rankName">{{item.rankName}}</div>
            </div>
            <div class="text">
              <div class="project-name">{{item.projectName}}</div>
              <div class="flex-between-center mtop10">
                <div></div>
                <template v-if="item.whetherOpen">
                  <el-button type="primary" class="start-experiment">
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
      </div>
      <div class="flex-left-center" style="flex-wrap: wrap;background: #fff;padding-bottom: 20px;" v-else>
        <div v-for="item in elective.data" :key="item.projectId" class="project-card" >
          <div style="height: 200px;">
            <el-image :src="url+item.cover" class="cover"></el-image>
            <div class="tag" v-if="item.rankName">{{item.rankName}}</div>
          </div>
          <div class="text">
            <div class="project-name">{{item.projectName}}</div>
            <div class="flex-between-center mtop10">
              <div></div>
              <el-button type="primary" class="start-experiment">
                实验记录
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { getOptionList, getOptionRecordList} from "../../api/student";
  import { apiPath } from "../../config/env";

  export default {
  name: 'myExperiment',
  data(){
    return {
      activeIndex: 0,
      loading: '',
      url: apiPath,
      compulsory: {
        data: [],
        keyword: '',
        pageSize: 8,
        pageNum: 1,
        total: 0
      },
      elective: {
        data: [],
        keyword: '',
        pageSize: 8,
        pageNum: 1,
        total: 0
      }
    }
  },
  computed: {
  },
  watch: {
    activeIndex:function () {
      this.activeIndex === 0 ? this.getCompulsory() : this.getElective()
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.activeIndex === 0 ? this.getCompulsory() : this.getElective()
    },
    // 获取必修列表
    getCompulsory(){

    },
    // 获取选修列表
    getElective(){
      getOptionList( {
        "pageNum": 1,
        "pageSize": 10,
        "projectName": ""
      }).then(res=>{
        if(res.code === 200){
          this.elective.data = res.data.list
          this.elective.total = res.data.total
        }else{
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .cus-tabs{
    color: #666;
    font-size: 16px;
    text-align: center;
    display: flex;

    background: #fff;
    .default{
      width: 50%;
      padding: 15px 0;
    }
    .default:hover{
      color: #409EFF;
      cursor: pointer;
    }
    .active{
      color: #409EFF;
      border-bottom: 2px solid #409EFF;
      font-weight: 600;
    }
  }
</style>
