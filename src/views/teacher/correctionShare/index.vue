<template>
  <div>
    <div class="BosConer">
      <h1>批改共享</h1>
      <div class="Bosaote">
        <div class="">
          <el-input placeholder="请输入实验名称" v-model="message">
            <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              id="submit"
              @click="btnsearch"
            ></i>
          </el-input>
        </div>
        <div class="">
          <el-button type="primary" @click="addexport"
            ><i class="el-icon-upload el-icon--left"></i>成绩导出</el-button
          >
        </div>
      </div>
      <!-- 列表 -->
      <div class="Boslei">
        <el-table :data="datalist" style="width: 100%">
          <el-table-column min-width="60%">
            <template slot-scope="scope">
              <div class="Imgbos">
                <img :src="url + scope.row.cover" alt="图片" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="实验名称" min-width="100%">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handJump(scope.row.projectId)"
              >
                {{ scope.row.projectName }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="collegeName" label="学院" width="">
          </el-table-column>
          <el-table-column prop="majorName" label="学科" width="">
          </el-table-column>
          <el-table-column prop="projectPeriod" label="学时" width="">
          </el-table-column>
          <el-table-column
            prop="projectPrincipalName"
            label="项目负责人"
            width=""
          >
          </el-table-column>
          <el-table-column prop="count" label="待批改" width="">
            <template slot-scope="scope"> {{ scope.row.count }}人 </template>
          </el-table-column>
          <el-table-column label="操作" min-width="60%">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleEdit(scope.row.projectId)"
                >批改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="beiye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          background
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 导出内容 -->
    <bosexport ref="son"></bosexport>
  </div>
</template>

<script>
import { getChargeProject, getAllCorrectShareProject } from "@/api/teacher";
import { apiPath } from "@/config/env";
import bosexport from "@/views/teacher/correctionShare/export";
export default {
  components: {
    bosexport
  },
  data() {
    return {
      url: apiPath,
      input: "", //搜索值
      datalist: [], //列表
      message: "", //项目名称
      pageNum: 1, //默认页
      total: null, //总条数
      pageSize: 10 //每页数量
    };
  },
  methods: {
    //获取列表

    getAllCorrectShareProject() {
      getAllCorrectShareProject({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        message: this.message
      })
        .then(res => {
          // console.log(res.data.list);
          this.datalist = res.data.list;
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
          this.pageNum = res.data.pageNum;
        })
        .catch(err => {});
    },

    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getChargeProject();
    },
    //选择第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      console.log(`当前页: ${val}`);
      this.getChargeProject();
    },
    //搜索
    btnsearch() {
      this.getAllCorrectShareProject();
    },

    // 导出

    //点击名称查看
    handJump(data) {
      this.$router.push({
        path: "/teachInner/project",
        query: { projectId: data }
      });
    },
    //批改
    handleEdit(val) {
      this.$router.push({
        path: "/correctionShare/correctList",
        query: { projectId: val }
      });
    },
    //点击成绩导出
    addexport() {
      this.$refs.son.cloBol = true;
    }
  },
  mounted() {
    this.getAllCorrectShareProject();
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
