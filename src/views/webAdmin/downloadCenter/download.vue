<!--咨询动态-->
<template>
  <div class="download-container">
    <el-card class="box-card">
      <div class="header">
        <div class="header-left">
          <el-input
            placeholder="请输入名称"
            class="title"
            v-model="title"
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="margin-left: 10px"
            @click="getAll"
            >搜索</el-button
          >
        </div>
        <div class="header-right">
          <el-button type="primary">上传</el-button>
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
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column
            prop="uploadIntroduce"
            label="名称"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column prop="uploadDate" label="时间" align="center">
          </el-table-column>
          <!-- <el-table-column prop="validDate" label="上传人" align="center">
          </el-table-column> -->
          <el-table-column prop="uploadCategory" label="类型" align="center">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    
    <div style="text-align: center; margin-top: 30px;">
      <el-pagination
        background
        layout="total, prev, pager, next, sizes"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { getAllNotice, batchDel } from "@/api/admin";
import { getList } from "@/api/webAdmin";

export default {
  name: "download",
  data() {
    return {
      title: "",
      tableData: [],
      multipleSelection: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      isDisabled: true,
    };
  },
  mounted() {
    this.getAll();
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
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAll();
    },
    getAll() {
      let param = {
        // noticeContent: this.title,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      getList(param)
        .then(res => {
          if (res.code === 200) {
            res.data.list.forEach(item => {
              if (item.uploadCategory === 0) {
                item.uploadCategory = '工具'
              } else if (item.uploadCategory === 1) {
                item.uploadCategory = '文件'
              }
            })
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
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
                that.getAll();
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
.download-container {
  // padding-top: 15px;
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
::v-deep .el-card__body {
  padding: 40px;
}

</style>
