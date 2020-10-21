<!--学生管理-->
<template>
  <div>
    <div class="Bosxx">
      <div class="BosTop">
        <div class="Topleift">
          <el-button @click="adduser">添加用户</el-button>
          <el-button @click="bosdeletion">批量删除</el-button>
          <el-button @click="firing">批量启用</el-button>
          <el-button type="primary" @click="importadd">导入学生</el-button>
          <a :href="exporturl">
            <el-button type="primary">导出学生</el-button>
          </a>
          <el-button type="text"><a :href="Temurl">下载模板</a></el-button>
        </div>
        <div class="Toprihng">
          <el-select v-model="college" placeholder="请选择学院">
            <el-option
              v-for="item in collegeleis"
              :key="item.collegeId"
              :label="item.collegeName"
              :value="item.collegeId"
            >
            </el-option>
          </el-select>
          <el-input v-model="userName" placeholder="请输入学生姓名"></el-input>
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
      </div>
      <div class="Bosleist">
        <el-table
          :data="Boslist"
          border
          style="width: 100%"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
          @selection-change="selectAll"
        >
          <!-- <el-checkbox-group v-model="checkList">
            <el-table-column prop="" label="" width="50%">
              <el-checkbox label=""></el-checkbox>
            </el-table-column>
          </el-checkbox-group> -->
          <el-table-column
            type="selection"
            prop="userId"
            label="全选"
            width="80px"
          >
          </el-table-column>
          <el-table-column prop="realName" label="学生姓名" width="">
          </el-table-column>
          <el-table-column prop="userName" label="学号/账号" width="">
          </el-table-column>
          <el-table-column prop="tbClassName" label="班级" width="">
          </el-table-column>
          <el-table-column prop="collegeName" label="院系" width="">
          </el-table-column>
          <el-table-column prop="majorName" label="专业" width="">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width=""> </el-table-column>
          <el-table-column prop="phone" label="电话" width="">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="">
          </el-table-column>
          <el-table-column
            prop="delStatus"
            label="状态"
            :formatter="delStatusList"
            width=""
          >
          </el-table-column>
          <el-table-column label="操作" width="">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="modify(scope.row)"
                >编辑</el-button
              >
              <el-button
                v-if="scope.row.delStatus == 0"
                type="text"
                size="mini"
                style="color: #e6a23c;"
                @click="Disable(scope.row.userId)"
                >禁用</el-button
              >
              <el-button
                v-if="scope.row.delStatus == 2"
                type="text"
                size="mini"
                @click="Enable(scope.row.userId)"
                >启用</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click="deleteout(scope.row.userId)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="Bospaging">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 15, 20]"
            :page-size="pageSize"
            layout="total, prev, pager, next, sizes, jumper"
            :total="zongshu"
          >
          </el-pagination>
        </div>
      </div>
      <div class="Tanchuang">
        <increase ref="son" :ctype="ctype"></increase>
      </div>
      <!-- //导入 -->
      <div class="Tanchuang">
        <Import ref="sonport"></Import>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  getAllUser,
  disabledUser,
  startUsingUser,
  getGroup,
  addUser,
  deleteUser
} from "@/api/superAdmin";
import { apiPath } from "@/config/env";
import increase from "@/views/superAdmin/studentManage/increase";
import Import from "@/views/superAdmin/studentManage/Import";

export default {
  name: "studentManage",
  computed: {},
  components: {
    increase,
    Import
  },
  data() {
    return {
      url: apiPath,
      Temurl: `${apiPath}user/getTemplate`, //下载模板地址
      exporturl: `${apiPath}user/export?roleIds=5`, //导出
      ctype: "", //传值

      roleIds: 5,

      Boslist: [], //列表
      pageSize: 10, //每页多少条
      zongshu: null, //共多少条
      currentPage: 1, //页数

      userIds: [], //批量启用/批量删除id

      collegeleis: [], //学院列表
      college: "", //学院值
      userName: "", //学生姓名

      checkList: [],
      radio: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      input: ""
    };
  },
  watch: {},
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getAllUser();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getAllUser();
    },

    //获取列表
    getAllUser() {
      getAllUser({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        roleIds: [5],
        userName: this.userName,
        collegeId: this.college
      })
        .then(res => {
          // console.log(res);
          this.Boslist = res.data.list;
          this.zongshu = res.data.total;
          this.currentPage = res.data.pageNum;
          this.pageSize = res.data.pageSize;
        })
        .catch(err => {});
    },

    //状态判断
    delStatusList(row) {
      return row.delStatus == 0 ? "正常" : "禁用";
    },

    //获取全选的值
    selectAll(val) {
      // console.info(val);
      var zhiIds = [];
      for (let i = 0; i < val.length; i++) {
        zhiIds.push(val[i].userId);
      }
      this.userIds = zhiIds;
    },

    //增加
    adduser() {
      this.ctype = "";
      this.$refs.son.cloBol = true;
    },
    //编辑修改用户信息
    modify(data) {
      this.ctype = data;
      this.$refs.son.cloBol = true;
    },

    //单个禁用
    Disable(scope) {
      this.userIds = scope;
      this.disabledUser();
    },
    disabledUser() {
      disabledUser({ userIds: [this.userIds] })
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "warning"
            });
            this.getAllUser();
          }
        })
        .catch(err => {});
    },
    //单个启用
    Enable(scope) {
      this.userIds = [scope];
      this.startUsingUser();
    },
    startUsingUser() {
      startUsingUser({ userIds: this.userIds })
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "warning"
            });
            this.getAllUser();
          }
        })
        .catch(err => {});
    },
    //点击批量启用
    firing() {
      if (this.userIds == "") {
        this.$message({
          showClose: true,
          message: "请选择"
        });
      } else {
        this.startUsingUser();
      }
    },
    //删除
    deleteout(scope) {
      this.userIds = [scope];
      this.$confirm("确定是否要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser();
        })
        .catch(() => {});
    },
    deleteUser() {
      deleteUser({ userIds: this.userIds })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.getAllUser();
          }
        })
        .catch(err => {
          console.info(err);
        });
    },

    //批量删除
    bosdeletion() {
      if (this.userIds == "") {
        this.$message({
          showClose: true,
          message: "请选择"
        });
      } else {
        this.$confirm("确定是否要删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.deleteUser();
        });
      }
    },

    //  获取学院角色信息
    getGroup() {
      getGroup()
        .then(res => {
          this.collegeleis = res.college;
        })
        .catch(err => {
          console.info(err);
        });
    },

    //搜索
    search() {
      this.getAllUser();
    },
    //学生导入
    importadd() {
      this.$refs.sonport.cloBol = true;
    }
  },
  mounted() {
    this.getAllUser();
    this.getGroup();
  }
};
</script>

<style lang="scss" scoped>
.Bosxx {
  width: 80%;
  overflow: hidden;
  margin: 50px auto;
}
.BosTop {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.BosTop button {
  margin-right: 15px;
}
.BosTop .Toprihng {
  display: flex;
  align-items: center;
}
.Bospaging {
  width: 100%;
  overflow: hidden;
  margin-top: 35px;
  text-align: center;
}
.Toprihng .el-input {
  width: 200px;
  margin: 0 20px;
}
</style>
