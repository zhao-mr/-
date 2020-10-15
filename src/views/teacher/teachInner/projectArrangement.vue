<template>
  <div>
    <div class="BosConer">
      <h1>查看布置</h1>
      <div class="Bosaote">
        <div class="">
          <el-button type="primary" @click="turnback">返回</el-button>
        </div>
        <div class="">
          <el-input placeholder="请输入已布置实验名称" v-model="assignName">
            <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              id="submit"
              @click="btnsearch"
            ></i>
          </el-input>
        </div>
      </div>
      <!-- 列表 -->
      <div class="Boslei">
        <el-table :data="bosliet" style="width: 100%">
          <el-table-column label="实验名称" min-width="100%">
            <template slot-scope="scope">
              <!-- <a href="">实验的名字倒是</a> -->
              <el-button
                type="text"
                size="mini"
                @click="handJump(scope.row.assignId)"
                >{{ scope.row.assignName }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="realName" label="教学教师" width="">
          </el-table-column>
          <el-table-column
            prop="count"
            label="实验人数"
            :formatter="formcount"
            width=""
          >
          </el-table-column>
          <el-table-column prop="" label="实验时间" width="">
            <template slot-scope="scope">
              {{ scope.row.projectBeginTime }} ~ {{ scope.row.projectEndTime }}
            </template>
          </el-table-column>
          <el-table-column
            prop="waitCount"
            label="待批改"
            :formatter="formwait"
            width=""
          >
          </el-table-column>
          <el-table-column label="操作" min-width="60%">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >
                批改</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click="handleshan(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="beiye">
        <el-pagination
          background
          layout="prev, pager, next,total"
          @current-change="handleCurrentChange"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { checkAssign } from "@/api/teacher";
export default {
  components: {},
  data() {
    return {
      projectId: "", //id
      bosliet: [], //列表
      assignName: "", //名称

      total: null, //总条数
      pageNum: 1 //当前页
    };
  },
  methods: {
    //获取信息列表
    checkAssign() {
      checkAssign({
        projectId: this.projectId,
        pageNum: this.pageNum,
        pageSize: 10,
        assignName: this.assignName
      })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.bosliet = res.data.list;
            this.total = res.data.total;
          }
        })
        .catch(err => {});
    },

    formcount: function(row, column, val) {
      return val + "人";
    },
    formwait: function(row, column, val) {
      return val + "人";
    },

    //点击实验名称查看实验信息
    handJump(val) {
      alert(val);
    },

    //选择第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.checkAssign();
    },
    //搜索
    btnsearch() {
      this.checkAssign();
    },

    //返回
    turnback() {
      this.$router.push({ path: "/teachInner" });
    },
    //编辑
    handleDelete() {
      this.$router.push({ path: "/teachInner/release" });
      // alert(111);
    },
    //批改
    handleEdit() {
      this.$router.push({ path: "/teachInner/correctList" });
    }
  },
  mounted() {
    this.projectId = this.$route.query.projectId;
    this.checkAssign();
  }
};
</script>

<style scoped>
.BosConer {
  width: 100%;
  padding: 0 50px;
}
.Bosaote {
  width: 100;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
#submit {
  cursor: pointer;
}
.Boslei {
  width: 100%;
  overflow: hidden;
}
.Boslei .Imgbos {
  width: 120px;
  height: 76px;
}
.Boslei .Imgbos img {
  width: 100%;
  height: 100%;
}
.beiye {
  width: 100%;
  overflow: hidden;
  text-align: center;
  position: relative;
  top: 50px;
}
</style>
<style>
.Boslei .el-table th > .cell {
  color: black;
}
.fixlring .el-input__inner {
  width: 150px;
  height: 25px;
}
.fixlring .el-input {
  width: auto;
}
.neibottom .el-checkbox {
  display: inherit;
  line-height: 30px;
}
</style>
