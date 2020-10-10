<!--通知管理-->
<template>
  <div class="notice-container">
    <div class="header">
      <div class="header-left">
        <el-input placeholder="请输入标题" class="title" v-model="title"></el-input>
        <el-date-picker
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="date"
          v-model="date"
        >
        </el-date-picker>
      </div>
      <div class="header-right">
        <el-button type="primary">发布通知</el-button>
        <el-button type="primary">批量删除</el-button>
      </div>
    </div>
    <div class="main">
      <el-table
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%; margin-bottom: 16px;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="publishDate"
          label="发布时间"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="validPeriod"
          label="有效期限"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align: center;">
        <el-pagination
          background
          layout="total, prev, pager, next, sizes"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[100, 200, 300, 400]"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "teacherNotice",
  computed: {},
  data() {
    return {
      title: '',
      date: null,
      tableData: [
        {
          publishDate: '2016-05-03',
          title: '王小虎',
          validPeriod: '上海市普陀区金沙江路 1518 弄'
        },
        {
          publishDate: '2016-05-03',
          title: '王小虎',
          validPeriod: '上海市普陀区金沙江路 1518 弄'
        },
        {
          publishDate: '2016-05-03',
          title: '王小虎',
          validPeriod: '上海市普陀区金沙江路 1518 弄'
        }, 
        {
          publishDate: '2016-05-03',
          title: '王小虎',
          validPeriod: '上海市普陀区金沙江路 1518 弄'
        },
        {
          publishDate: '2016-05-03',
          title: '王小虎',
          validPeriod: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log('val', val)
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleClick(row) {
      console.log(row)
    },
    handleCurrentChange(val) {
      console.log(val)
    }
  }
};
</script>

<style lang="scss" scoped>
.notice-container {
  padding: 32px;
  .header {
    display: flex;
    justify-content: space-between;
    .header-left {
      flex: 2;
      .title {
        width: 35%;
        margin-right: 10px;
      }
      .date {
        width: 60%;
      }
    }
    .header-right {
      flex: 2;
      text-align: right;
    }
  }
  .main {
    margin-top: 16px;

  }
}
</style>
