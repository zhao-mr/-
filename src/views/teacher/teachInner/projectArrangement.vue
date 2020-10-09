<template>
  <div>
    <div class="BosConer">
      <h1>查看布置</h1>
      <div class="Bosaote">
        <div class="">
          <el-button type="primary" @click="turnback">返回</el-button>
        </div>
        <div class="">
          <el-input placeholder="请输入已布置实验名称" v-model="input">
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
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="实验名称" min-width="100%">
            <template slot-scope="scope">
              <!-- <a href="">实验的名字倒是</a> -->
              <el-button
                type="text"
                size="mini"
                @click="handJump(scope.$index, scope.row)"
                >实验的名字倒是</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="教学教师" width="">
          </el-table-column>
          <el-table-column prop="address" label="实验人数	" width="">
          </el-table-column>
          <el-table-column prop="address" label="实验时间" width="">
          </el-table-column>
          <el-table-column prop="address" label="待批改" width="">
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
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  components: {},
  data() {
    return {
      input: "", //搜索值
      //列表
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区"
        }
      ],
      region: ""
    };
  },
  methods: {
    //选择第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //搜索
    btnsearch() {
      alert(11);
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
  mounted() {}
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
