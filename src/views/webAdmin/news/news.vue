<!--咨询动态-->
<template>
  <div class="news-container">
    <el-card class="box-card">
      <div class="header">
        <div class="header-left">
          <el-input
            placeholder="请输入标题"
            class="title"
            v-model="title"
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="margin-left: 10px"
            @click="getAllNews"
            >搜索</el-button
          >
        </div>
        <div class="header-right">
          <el-button type="primary" @click="toAddNews">添加资讯</el-button>
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
            prop="noticeContent"
            label="标题"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column prop="noticeDate" label="发布时间" align="center">
          </el-table-column>
          <el-table-column prop="validDate" label="来源" align="center">
          </el-table-column>
          <el-table-column prop="validDate" label="类型" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="openPreviewDialog()"
                type="text"
                size="small"
                >预览</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    
    <div style="text-align: center; margin-top: 30px;">
      <el-pagination
        background
        layout="total, prev, pager, next, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
      >
      </el-pagination>
    </div>

    <!-- 预览 -->
    <el-dialog
      title="预览"
      :visible.sync="previewDialogVisible"
      width="80%"
      class="previewDialog"
    >
      <div class="preview-news">
        <div class="preview-news-header">
          <hr>
          <p>华东理工大学关于开展报送 2019 年度上海市级虚拟仿真实验教学项目认定工作的通知</p>
          <div>
            <span style="padding-right: 24px;">来源：校级内容管理员</span>
            <span>发稿时间：2019-6-5 22:53:00</span>
          </div>
        </div>
        <p class="preview-news-content">
          为深入学习贯彻全国教育大会及新时代全国高等学校本科教育工作会议精神，深入推进信息技术与高等教育实验教学的深度融合，不断加强高等教育实验教学优质资源建设、应用与共享， 打造实验“金课”，根据《教育部办公厅关于 2017—2020 年开展示范性虚拟仿真实验教学项目建设的通知》（教高厅〔2017〕4 号） 和《上海市教育委员会关于开展 2019 年度上海市级虚拟仿真实验教学项目认定工作的通知》（沪教委高〔2019〕18 号）等文件精神，学校决定组织开展报送 2019 年度上海市级虚拟仿真实验教学项目认定相关工作。现将有关事项通知如下：
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="previewDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      tableData: [],
      multipleSelection: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      isDisabled: true,
      previewDialogVisible: false
    };
  },
  mounted() {
    this.getAllNews();
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAllNews();
    },
    openPreviewDialog() {
      this.previewDialogVisible = true
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAllNews();
    },
    getAllNews() {
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
    toAddNews() {
      this.$router.push("/news/addNews");
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
                that.getAllNews();
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
.news-container {
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

  .previewDialog {
    .preview-news {
      .preview-news-header {
        margin-bottom: 20px;
        border-bottom: 1px #ccc dashed;
        line-height: 1.8;
        hr {
          margin-top: -20px;
          margin-bottom: 30px;
          color: #ccc;
        }
        p {
          text-align: center;
          font-size: 27px;
          color: #24282b;
          font-weight: normal;
        }
        div {
          font-family: serif;
          color: #666;
          text-align: center;
          padding: 20px 0;
          font-size: 15px;
        }
      }
      .preview-news-content {
        text-indent: 2em;
        line-height: 24px;
      }
    }
  }
  
}
::v-deep .el-card__body {
  padding: 40px;
}

</style>
