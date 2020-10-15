<template>
  <div>
    <div class="BosConer">
      <h1>教学列表</h1>
      <div class="Bosaote">
        <div class="">
          <el-input placeholder="请输入实验名称" v-model="projectName">
            <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              id="submit"
              @click="btnsearch"
            ></i>
          </el-input>
        </div>
        <div class="">
          <el-button type="primary" @click="centerDialogVisible = true"
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
                <img :src="scope.row.cover" alt="图片" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="实验名称" min-width="100%">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handJump(scope.row)">
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
                @click="handleDelete(scope.$index, scope.row)"
                >查看布置</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 导出内容 -->

    <el-dialog
      title="实验成绩导出"
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      width="40%"
      center
    >
      <el-form>
        <el-form-item label="实验名称: " :label-width="formLabelWidth">
          <el-select v-model="region" placeholder="请选择项目">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已布置实验: " :label-width="formLabelWidth">
          <div class="neirong">
            <div class="clearfix">
              <div class="fixltefe">
                <div>
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                </div>
                <div style="margin-left: 10px;">已选中<span>0</span>项</div>
              </div>
              <div class="fixlring">
                <span>搜索实验：</span>
                <el-input v-model="inputsou" placeholder=""></el-input>
              </div>
            </div>
            <!-- 选项 -->
            <div class="neibottom">
              <el-checkbox-group
                v-model="checkedCities"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{
                  city
                }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="exportbiao">导 出</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
import { getChargeProject } from "@/api/teacher";
export default {
  components: {},
  data() {
    return {
      input: "", //搜索值
      datalist: [], //列表
      projectName: "", //项目名称
      pageNum: 1, //默认页
      total: null, //总条数
      pageSize: 10, //每页数量

      centerDialogVisible: false, // 导出弹窗
      region: "",
      formLabelWidth: "120px",
      inputsou: "", //搜索实验

      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true
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

    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },

    //点击名称查看
    handJump(data) {
      this.$router.push({ path: "/teachInner/project" });
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
    handleDelete() {
      this.$router.push({ path: "/teachInner/projectArrangement" });
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
.neirong {
  width: 98%;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.neirong .clearfix {
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  width: 100%;
  overflow: hidden;
  border-bottom: 1px dashed #ccc;
  padding: 0 20px;
}
.clearfix .fixltefe {
  float: left;
  width: 50%;
  display: flex;
}
.clearfix .fixlring {
  width: 50%;
  float: right;
  display: flex;
  justify-content: flex-end;
}
.neibottom {
  width: 100%;
  height: 255px;
  overflow: auto;
  padding: 0 20px;
}

/*滚动条样式*/
.neibottom::-webkit-scrollbar {
  width: 4px;
  /*height: 4px;*/
}
.neibottom::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.neibottom::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
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
