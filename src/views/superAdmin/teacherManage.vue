<!--教师管理-->
<template>
  <div>
    <div class="Bosxx">
      <div class="BosTop">
        <el-button @click="adduser">添加教工</el-button>
        <el-button @click="bosdeletion">批量删除</el-button>
        <el-button @click="firing">批量启用</el-button>
        <el-button type="primary" @click="importadd">教工导入</el-button>
        <a :href="exporturl"><el-button type="primary">教工导出</el-button></a>
        <el-button type="text"><a :href="Temurl">下载模板</a></el-button>
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
          <el-table-column
            type="selection"
            prop="userId"
            label="全选"
            width="80px"
          >
          </el-table-column>
          <el-table-column prop="realName" label="姓名" width="">
          </el-table-column>
          <el-table-column prop="userName" label="账号 / 工号" width="">
          </el-table-column>
          <el-table-column prop="collegeName" label="所属院系" width="">
          </el-table-column>
          <el-table-column prop="majorName" label="专业" width="">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width=""> </el-table-column>
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
            layout="total, prev, pager, next,sizes"
            :total="zongshu"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 增加用户 -->
      <div class="Tanchuang">
        <!-- <Logins :key="timer1" ref="son"></Logins> -->
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
import increase from "@/views/superAdmin/teacherManage/increase";
import Import from "@/views/superAdmin/teacherManage/Import";
import {
  getAllUser,
  disabledUser,
  startUsingUser,
  getGroup,
  addUser,
  deleteUser
} from "@/api/superAdmin";
import { apiPath } from "@/config/env";
export default {
  name: "teacherManage",
  computed: {},
  components: {
    increase,
    Import
  },
  data() {
    return {
      ctype: "", //传值

      Boslist: [], //列表
      userIds: [], //启用禁用id
      url: apiPath,
      Temurl: `${apiPath}user/getTemplate`, //下载模板地址
      exporturl: `${apiPath}user/export`, //导出

      bostitle: "",

      zongshu: null, //共多少条
      pageSize: 10, //每页多少条
      currentPage: 1 //页数
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
      this.currentPage = val;
      this.getAllUser();
      // console.log(`当前页: ${val}`);
    },

    //编辑用户信息
    modify(data) {
      this.ctype = data;
      this.$refs.son.cloBol = true;
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

    //获取列表数据
    getAllUser() {
      getAllUser({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        roleIds: [],
        userName: "",
        collegeId: ""
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
    //单个禁用
    Disable(scope) {
      this.userIds = scope;
      this.disabledUser();
    },
    //单个启用
    Enable(scope) {
      this.userIds = [scope];
      this.startUsingUser();
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

    //增加用户弹窗
    adduser() {
      // this.timer1 = new Date().getTime();
      this.ctype = "";
      this.$refs.son.cloBol = true;
    },

    //  获取学院角色信息
    getGroup() {
      getGroup()
        .then(res => {
          // console.log(res);

          // this.jiaose = res.role
          var xunzhi = res.role;

          this.jiaose = xunzhi.filter(item => {
            return !"5".includes(item.roleId);
          });

          var zhicollege = res.college;
          var zhimajor = res.major;

          var Bosput = [];
          for (let i = 0; i < zhicollege.length; i++) {
            Bosput.push({
              value: zhicollege[i].collegeId,
              label: zhicollege[i].collegeName,
              children: []
            });
            for (let j = 0; j < zhimajor.length; j++) {
              if (zhicollege[i].collegeId == zhimajor[j].collegeId) {
                Bosput[i].children.push({
                  value: zhimajor[j].majorId,
                  label: zhimajor[j].majorName,
                  collegeId: zhimajor[j].collegeId
                });
              }
            }
          }
          // console.log(Bosput);
          this.optList = Bosput;
          // this.optigeId = res.major.collegeId;
          // this.major = res.major;
        })
        .catch(err => {
          console.info(err);
        });
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

    //导入
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
  margin-bottom: 20px;
}
.BosTop button {
  margin-right: 15px;
}
.Bospaging {
  width: 100%;
  overflow: hidden;
  margin-top: 35px;
  text-align: center;
}
</style>
