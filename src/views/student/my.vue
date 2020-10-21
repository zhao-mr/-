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
            实验名称：<el-input type="text" placeholder="请输入" @change="getCompulsory()" clearable v-model="compulsory.keyword" style="width: 220px" />
            <span class="mleft20">
                实验状态：
                <el-radio-group v-model="compulsory.type">
                  <el-radio-button label="待学习"></el-radio-button>
                  <el-radio-button label="待完成"></el-radio-button>
                  <el-radio-button label="待批改"></el-radio-button>
                  <el-radio-button label="已批改"></el-radio-button>
                </el-radio-group>
            </span>
          </div>
        </div>
        <div>
          <div class="flex-left-center" style="flex-wrap: wrap;">
            <div v-for="item in compulsory.data" :key="item.projectId" class="project-card">
              <div style="height: 200px;">
                <el-image :src="url+item.cover" class="cover"></el-image>
              </div>
              <div class="text">
                <div class="project-name">{{item.assignName}}</div>
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
            <div class="flex-center-center" style="height: 100px;width: 100%;" v-if="compulsory.data.length===0">
              暂无数据
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
              <el-button type="primary" @click="getOptionRecord(item.projectId)" class="start-experiment">
                实验记录
              </el-button>
            </div>
          </div>
        </div>
        <div class="text-center width100" v-if="elective.data.length===0">
          <img src="@/assets/img/nodata.png" height="80px" />
          <div class="mtop10">
            暂无数据
          </div>
        </div>
      </div>
    </div>
    <!--选修实验记录-->
    <el-dialog
      :visible.sync="record.visible"
      :close-on-click-modal="true"
      width="800px"
      align="center"
      title="实验记录"
    >
      <el-table
        :data="record.data"
        tooltip-effect="dark"
        style="width: 100%; margin-bottom: 16px;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="submitStartTime" label="最近实验时间" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.submitStartTime || '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="submitTime" label="提交时间" align="center">
          <template slot-scope="scope">
            {{scope.row.submitTime || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="批改时间" align="center">
          <template slot-scope="scope">
            {{scope.row.submitTotalScore || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="总成绩" align="center">
          <template slot-scope="scope">
            {{scope.row.submitTotalScore || '--' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.correctScore===1">查看结果</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.submitStatus!==0">正在批改</el-button>
            <el-button @click="continueExperiment(scope.row)" type="text" size="small" v-else>继续实验</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

  import { getOptionList, getOptionRecordList, getMustProject } from "../../api/student";
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
        type: '待学习',
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
      },
      record: {
        data: [],
        pageSize: 10,
        pageNum: 1,
        total: 0,
        visible: false
      }
    }
  },
  computed: {
  },
  watch: {
    activeIndex:function () {
      this.activeIndex === 0 ? this.getCompulsory() : this.getElective()
    },
    'compulsory.type': function () {
      this.getCompulsory()
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
      let mapping = {
        '待学习': 0,
        '待完成': 1,
        '待批改': 2,
        '已批改': 3
      }
      getMustProject({
        "pageNum": this.compulsory.pageNum,
        "pageSize": this.compulsory.pageSize,
        "projectName": this.compulsory.keyword,
        "accomplishCondition": mapping[this.compulsory.type]
      }).then(res=>{
        if(res.code === 200){
          this.compulsory.data = res.data.list
          this.compulsory.total = res.data.total
        }
      })
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
    },
    // 获取选修记录
    getOptionRecord(_id){
      getOptionRecordList({
        "pageNum": 1,
        "pageSize": 10,
        "projectId": _id
      }).then(res=>{
        if(res.code === 200){
          this.record.data = res.data.list
          this.record.total = res.data.total
          this.record.visible = true
        }
      })
    },
    // 继续选修实验
    continueExperiment(_row){

    },
    handleSelectionChange(){

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

    background: rgba(238, 238, 238, 0.81);
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
      background: #fff;
    }
  }
</style>
