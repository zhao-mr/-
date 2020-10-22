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
          <el-button type="primary" @click="openUploadDialog">上传</el-button>
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
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="上传"
      :visible.sync="dialogVisible"
      width="30%"
    >
      类型：<el-radio-group v-model="uploadType">
        <el-radio :label="0">工具</el-radio>
        <el-radio :label="1">文件</el-radio>
      </el-radio-group>
      <!-- <div class="upload">
        内容：<el-button type="primary">选择文件</el-button>
        <input type="file" id="file" />
      </div> -->
      <div class="upload-box">
        <span>内容：</span>
        <div class="upload">
          <el-upload
            class="upload-demo"
            action="#"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :http-request="upload"
            :auto-upload="false"
            :file-list="fileList"
            >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </span>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <div class="">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          <input type="file" id="file" />
        </div>
      </span> -->
    </el-dialog>


  </div>
</template>

<script>
import { getList, upload, batchDelUpload } from "@/api/webAdmin";

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
      dialogVisible: false,
      uploadType: 0,
      fileList: [],
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
        uploadIntroduce: this.title,
        uploadCategory: null,
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
        ids.push(item.uploadCentreId);
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
            uploadCentreId: ids.join(',')
          }
          batchDelUpload(param)
            .then((res) => {
              if (res.code === 200) {
                that.$message({
                  type: "success",
                  message: "删除成功!",
                });
                that.getAll();
              }
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    openUploadDialog() {
      this.dialogVisible = true;
    },
    upload() {
      // let file = document.getElementById('file').files[0];
      let file = this.fileList[0];
      console.log('file', file)
      let fileName = file.name.split('.')[0]
      let form = new FormData();
      form.append("file",file);
      form.append("uploadIntroduce",fileName);
      form.append("uploadCategory",this.uploadType);
      upload(form)
      .then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.dialogVisible = false;
          this.fileList = []
          this.getAll();
        }
      })
      .catch(err => {
          this.$message.error(err.msg);
      })
    },
    handleChange(file) {
      this.fileList = [];
      this.fileList.push(file.raw)
    },
    handleRemove() {
      this.fileList = [];
    },
    handleExceed() {
      this.$message.warning('一次只能选择一个文件');
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
  .upload-box {
    margin-top: 25px;
    height: 67px;
    span {
      float: left;
      padding-top: 6px;
    }
    .upload {
      display: inline-block;
      #file {
        position: absolute;
        width: 98px;
        height: 40px;
        top: 1px;
        left: 42px;
        opacity: 0;
      }
  }
  }
}
::v-deep .el-card__body {
  padding: 40px;
}

.demo ::v-deep .upload-demo {
  display: inline-block;
}
</style>
