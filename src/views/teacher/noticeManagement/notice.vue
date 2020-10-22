<!--通知管理-->
<template>
  <div class="notice-container">
    <el-card>
      <div class="header">
        <div class="header-left">
          <el-input
            placeholder="请输入标题"
            class="title"
            v-model="title"
          ></el-input>
          <!-- <el-input placeholder="请输入标题" class="title" v-model="title">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input> -->
          <el-date-picker
            v-model="date"
            align="right"
            type="date"
            placeholder="选择发布时间"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="margin-left: 10px"
            @click="getAllNotice"
            >搜索</el-button
          >
        </div>
        <div class="header-right">
          <el-button type="primary" @click="turnAddNotice">发布通知</el-button>
          <el-button type="primary" @click="batchDel" :disabled="isDisabled"
            >批量删除</el-button
          >
        </div>
      </div>
      <div class="main">
        <el-table
          border
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%; margin-bottom: 16px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column
            prop="noticeContent"
            label="标题"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column prop="noticeDate" label="发布时间" align="center">
          </el-table-column>
          <el-table-column prop="validDate" label="有效期限" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="toLook(scope.row.noticeId)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <div style="text-align: center; margin-top: 30px;">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllNotice, batchDel } from "@/api/admin";

export default {
  name: "adminNotice",
  computed: {},
  data() {
    return {
      title: "",
      date: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      tableData: [],
      multipleSelection: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      isDisabled: true,
    };
  },
  mounted() {
    this.getAllNotice();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    toLook(noticeId) {
      console.log(noticeId);
      this.$router.push({
        path: "/teacherNotice/lookNotice",
        query: {
          noticeId: noticeId,
          isNoReadPage: false
        },
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAllNotice();
    },
    getAllNotice() {
      let d = new Date(this.date);
      let datetime =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      let param = {
        noticeContent: this.title,
        noticeDate: datetime === "1970-1-1 8:0:0" ? null : datetime,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      getAllNotice(param)
        .then((res) => {
          if (res.code === 200) {
            let date = new Date();
            let yesterday = date.setTime(date.getTime()-24*60*60*1000)
            res.data.list.forEach((item) => {
              if (item.validDate === null) {
                item.validDate = "长期有效";
              }
              if (yesterday > new Date(item.validDate)) {
                item.validDate = item.validDate + "(已过期)";
              }
            });
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    turnAddNotice() {
      this.$router.push("/teacherNotice/addNotice");
    },
    batchDel() {
      let ids = [];
      this.multipleSelection.forEach((item) => {
        ids.push(item.noticeId);
      });
      let that = this;
      that
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          batchDel(ids)
            .then((res) => {
              if (res.code === 200) {
                that.$message({
                  type: "success",
                  message: "删除成功!",
                });
                that.getAllNotice();
              }
            })
            .catch((err) => {
              that.$message({
                type: "error",
                message: err.msg,
              });
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice-container {
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
    margin-top: 24px;
  }
}
</style>
