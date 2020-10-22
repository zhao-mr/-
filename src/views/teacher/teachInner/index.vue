<template>
  <div>
    <div class="BosConer">
      <div class="Bosaote">
        <div class="">
          <el-input
            placeholder="请输入实验名称"
            v-model="projectName"
            clearable
            @change="getChargeProject()"
          >
            <i class="el-icon-search el-input__icon" slot="prefix"> </i>
            <!-- <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              id="submit"
              @click="btnsearch"
            ></i> -->
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
        <el-card class="box-card">
          <el-table :data="datalist" style="width: 100%">
            <el-table-column min-width="60%">
              <template slot-scope="scope">
                <div class="Imgbos">
                  <img :src="url + scope.row.cover" alt="图片" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="实验名称"
              :show-overflow-tooltip="true"
              min-width="100%"
            >
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
            <el-table-column
              prop="collegeName"
              label="学院"
              :show-overflow-tooltip="true"
              width=""
            >
            </el-table-column>
            <el-table-column
              prop="majorName"
              label="学科"
              :show-overflow-tooltip="true"
              width=""
            >
            </el-table-column>
            <el-table-column prop="projectPeriod" label="学时" width="">
            </el-table-column>
            <el-table-column prop="userName" label="项目负责人" width="">
            </el-table-column>
            <el-table-column label="操作" min-width="60%">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="handleEdit(scope.row.projectId)"
                  >布置实验</el-button
                >
                <el-button
                  type="text"
                  size="mini"
                  @click="handleDelete(scope.row.projectId)"
                  >查看布置</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <!-- 分页 -->
      <div class="beiye">
        <!-- <el-pagination
          background
          layout="prev, pager, next,total"
          @current-change="handleCurrentChange"
          :total="1000"
        >
        </el-pagination> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          background
          layout="total,prev, pager, next, jumper"
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
import { getChargeProject } from "@/api/teacher";
import { apiPath } from "@/config/env";
import bosexport from "@/views/teacher/teachInner/export";

export default {
  components: {
    bosexport
  },
  data() {
    return {
      url: apiPath,
      datalist: [], //列表
      projectName: "", //项目名称
      pageNum: 1, //默认页
      total: null, //总条数
      pageSize: 10 //每页数量
    };
  },
  methods: {
    //获取列表
    getChargeProject() {
      getChargeProject({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        projectName: this.projectName
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
      this.getChargeProject();
    },

    // 导出
    exportbiao() {
      alert(111);
    },

    //点击名称查看
    handJump(data) {
      this.$router.push({
        path: "/teachInner/project",
        query: { projectId: data }
      });
    },
    //布置实验
    handleEdit(val) {
      // console.log(val);
      this.$router.push({
        path: "/teachInner/release",
        query: { projectId: val }
      });
    },
    //查看布置
    handleDelete(val) {
      this.$router.push({
        path: "/teachInner/projectArrangement",
        query: { projectId: val }
      });
    },

    //点击成绩导出
    addexport() {
      this.$refs.son.cloBol = true;
    }
  },
  mounted() {
    this.getChargeProject();
  }
};
</script>

<style scoped>
.BosConer {
  width: 100%;
}
.Bosaote {
  width: 100%;
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
  margin-top: 35px;
  /* position: relative;
  top: 50px; */
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
