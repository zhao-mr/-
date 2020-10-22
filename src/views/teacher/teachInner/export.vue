<template>
  <div>
    <el-dialog
      title="成绩导出"
      :visible.sync="cloBol"
      v-if="cloBol"
      width="40%"
      center
      :close-on-click-modal="false"
    >
      <div>
        <el-form>
          <el-form-item label="实验名称: " :label-width="formLabelWidth">
            <el-select
              v-model="projectId"
              placeholder="请选择"
              @change="xiaxuan"
            >
              <el-option
                v-for="item in datalist"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="已布置实验: " :label-width="formLabelWidth">
            <div class="neirong">
              <el-table
                :data="tablelist"
                style="width: 100%"
                height="100%"
                :header-cell-style="{ textAlign: 'left' }"
                :cell-style="{ textAlign: 'left' }"
                @selection-change="selectAll"
                class="customer-table"
              >
                <el-table-column
                  type="selection"
                  prop="assignId"
                  label="全选"
                  width="50px"
                >
                </el-table-column>
                <el-table-column label="全选" prop="assignName" width="">
                  <template slot-scope="scope">
                    {{ scope.row.assignName }}
                  </template>
                </el-table-column>
                <el-table-column align="right" width="">
                  <template slot="header" slot-scope="scope">
                    <el-input
                      placeholder="请输入项目名称"
                      v-model="assignName"
                      @change="checkAssign()"
                      clearable
                    >
                      <i class="el-icon-search el-input__icon" slot="prefix">
                      </i>
                      <!-- <i
                        slot="suffix"
                        class="el-input__icon el-icon-search"
                        id="submit"
                        @click="btnsearch"
                      ></i> -->
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="exportbiao"> 导 出</el-button> -->

        <el-link
          :underline="false"
          :href="url + '/schoolTeaching/exportScore?assignId=' + assignId"
          :disabled="disabled"
        >
          <el-button type="primary" :disabled="disabled">导 出</el-button>
        </el-link>

        <el-button @click="cloBol = false" style="margin-left: 15px;"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getChargeProject, checkAssign } from "@/api/teacher";
import { apiPath } from "@/config/env";
export default {
  computed: {},
  data() {
    return {
      cloBol: false,
      url: apiPath, //地址
      formLabelWidth: "120px",
      datalist: [], //下拉列表
      projectId: "", //下拉值
      assignName: "", //名称

      tablelist: [], //列表
      assignId: "", //ID
      disabled: true
    };
  },
  methods: {
    //获取列表
    getChargeProject() {
      getChargeProject({
        pageNum: "",
        pageSize: "",
        projectName: ""
      })
        .then(res => {
          // console.log(res.data.list);
          this.datalist = res.data.list;
        })
        .catch(err => {});
    },

    //下拉选中值
    xiaxuan(val) {
      // console.log(val);
      this.projectId = val;
      this.checkAssign();
    },
    //获取实验列表
    checkAssign() {
      checkAssign({
        assignName: this.assignName,
        pageNum: "",
        pageSize: "",
        projectId: this.projectId
      })
        .then(res => {
          // console.log(res.data.list);
          this.tablelist = res.data.list;
        })
        .catch(err => {});
    },

    //搜索
    btnsearch() {
      this.checkAssign();
    },

    selectAll(val) {
      // console.log(val);
      var zhiIds = [];
      for (let i = 0; i < val.length; i++) {
        zhiIds.push(val[i].assignId);
      }
      this.assignId = zhiIds;
      // console.log(this.assignId);
      if (this.assignId == "") {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },

    //确定导出
    exportbiao() {
      // console.log(this.assignId);
      if (!this.projectId == "" && !this.assignId == "") {
        // exportScore({
        //   assignId: this.assignId
        // })
        //   .then(res => {
        //     console.log(res);
        //     // this.tablelist = res.data.list;
        //   })
        //   .catch(err => {});
      } else {
        this.$message({
          showClose: true,
          message: "请选择!",
          type: "warning"
        });
      }
    }
  },
  mounted() {
    this.getChargeProject();
  }
};
</script>

<style scoped>
.neirong {
  width: 98%;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* overflow-x: auto; */
}
.neirong .clearfix {
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
/* .neibottom::-webkit-scrollbar {
  width: 4px;
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
} */
</style>
<style>
.customer-table th > .cell {
  padding-left: 14px;
  padding-right: 14px;
}

/* // 去掉表格单元格边框 */
.customer-table th {
  border: none;
}
.customer-table td,
.customer-table th.is-leaf {
  border: none;
}
/* // 表格最外边框 */
.el-table--border,
.el-table--group {
  border: none;
}
/* // 头部边框 */
.customer-table thead tr th.is-leaf {
  border-right: none;
  border-bottom: 1px dashed #ccc;
}
/* // 表格最外层边框-底部边框 */
.el-table--border::after,
.el-table--group::after {
  width: 0;
}
.customer-table::before {
  width: 0;
}
.customer-table .el-table__fixed-right::before,
.el-table__fixed::before {
  width: 0;
}
/* // 表格有滚动时表格头边框 */
/* .el-table--border th.gutter:last-of-type {
  border: 1px solid #ebeef5;
  border-left: none;
} */
</style>
