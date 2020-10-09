<!--学生管理-->
<template>
  <div>
    <div class="Bosxx">
      <div class="BosTop">
        <div class="Topleift">
          <el-button @click="adduser">添加用户</el-button>
          <el-button>批量删除</el-button>
          <el-button>批量启用</el-button>
          <el-button type="primary">导出学生</el-button>
          <el-button type="primary">导入学生</el-button>
          <el-button type="text">下载模板</el-button>
        </div>
        <div class="Toprihng">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            v-model="input"
            placeholder="请输入学生姓名或学号"
          ></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
      <div class="Bosleist">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
        >
          <!-- <el-checkbox-group v-model="checkList">
            <el-table-column prop="" label="" width="50%">
              <el-checkbox label=""></el-checkbox>
            </el-table-column>
          </el-checkbox-group> -->
          <el-table-column prop="" label="" width="50%">
            <template slot="header" slot-scope="{ column, $index }">
              <input
                type="checkbox"
                id="checkbox"
                v-model="checked"
                @change="changeAllChecked()"
              />
            </template>
            <template slot-scope="scope">
              <input
                type="checkbox"
                id="runoob"
                value="Runoob"
                v-model="checkedNames"
              />
              <!-- v-model="checkedNames" -->
              <!-- scope.$index, scope.row -->
              <span>{{ scope.row.zhiti }}</span>
              <!-- <label for="runoob">
                  Runoob
                       v-if="city in checkedArr"
                :label="city"
                :key="city"
                </label> -->
            </template>
            <!-- <el-checkbox label=""></el-checkbox> -->
          </el-table-column>
          <el-table-column prop="name" label="学生姓名" width="">
          </el-table-column>
          <el-table-column prop="name" label="学号/账号" width="">
          </el-table-column>
          <el-table-column prop="name" label="班级" width=""> </el-table-column>
          <el-table-column prop="address" label="院系" width="">
          </el-table-column>
          <el-table-column prop="name" label="专业" width=""> </el-table-column>
          <el-table-column prop="name" label="性别" width=""> </el-table-column>
          <el-table-column prop="name" label="电话" width=""> </el-table-column>
          <el-table-column prop="name" label="邮箱" width=""> </el-table-column>
          <el-table-column prop="name" label="状态" width=""> </el-table-column>
          <el-table-column label="操作" width="">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
                >禁用</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click="handle(scope.$index, scope.row)"
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
            :current-page.sync="currentPage1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, prev, pager, next,sizes"
            :total="1000"
          >
          </el-pagination>
        </div>
      </div>
      <div class="Tanchuang">
        <el-dialog
          title="增加教工"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
          :close-on-click-modal="false"
        >
          <div>
            <el-form label-width="80px" :model="formLabelAlign">
              <el-form-item label="姓名">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="学号">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-form-item>
              <el-form-item label="班级">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <div>
                  <el-radio v-model="radio" label="1">男</el-radio>
                  <el-radio v-model="radio" label="2">女</el-radio>
                </div>
              </el-form-item>
              <el-form-item label="分组">
                <div style="display: flex;justify-content: space-between;">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "studentManage",
  computed: {},
  data() {
    return {
      centerDialogVisible: false,
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
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
      input: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          zhiti: "1",
          address: "上海市普陀"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          zhiti: "2",
          address: "上海市普陀"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          zhiti: "2",
          address: "上海市普陀"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          zhiti: "4",
          address: "上海市普陀"
        }
      ],
      currentPage1: 5,
      checked: false,
      checkedNames: [], //值
      checkedArr: ["1", "2", "3", "4", "5"]
    };
  },
  watch: {
    checkedNames: function() {
      if (this.checkedNames == this.checkedArr) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeAllChecked: function() {
      if (this.checked) {
        this.checkedNames = this.checkedArr;
      } else {
        this.checkedNames = [];
      }
    },
    //增加
    adduser() {
      this.centerDialogVisible = true;
    }
  },
  mounted() {}
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
