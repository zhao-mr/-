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
            prop="newsTitle"
            label="标题"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column prop="newsDate" label="发布时间" align="center">
          </el-table-column>
          <el-table-column prop="newsSource" label="来源" align="center">
          </el-table-column>
          <!-- <el-table-column prop="validDate" label="类型" align="center">
          </el-table-column> -->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="openPreviewDialog(scope.row.newsId)"
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
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
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
          <p>{{obj.title}}</p>
          <div>
            <span style="padding-right: 24px;">来源：{{obj.source}}</span>
            <span>发稿时间：{{obj.date}}</span>
          </div>
        </div>
        <p class="preview-news-content" v-html="obj.content">
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="previewDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllNews, getNewsById, batchDelNews } from "@/api/webAdmin";

export default {
  name: "news",
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
      previewDialogVisible: false,
      obj: {
        id: null,
        title: '',
        source: '',
        date: '',
        content: ''
      }
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
    openPreviewDialog(newsId) {
      this.previewDialogVisible = true;
      this.obj.id = newsId;
      this.getNewsById();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAllNews();
    },
    getAllNews() {
      let param = {
        newsTitle: this.title,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        year: null,
        month: null
      };
      getAllNews(param)
        .then((res) => {
          if (res.code === 200) {
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
        ids.push(item.newsId);
      });
      let that = this;
      that
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          let param = {
            newsId: ids.join(',')
          }
          batchDelNews(param)
            .then((res) => {
              if (res.code === 200) {
                that.$message({
                  type: "success",
                  message: "删除成功!",
                });
                that.getAllNews();
              }
            })
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getNewsById() {
      let param = {
        newsId: this.obj.id
      }
      getNewsById(param)
      .then(res => {
        if (res.code === 200) {
          this.obj.title = res.data.newsTitle;
          this.obj.source = res.data.newsSource;
          this.obj.date = res.data.newsDate;
          this.obj.content = res.data.newsContent;
        }
      })
      .catch(err => {
        this.$message.error(err.msg)
      })
    }
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
