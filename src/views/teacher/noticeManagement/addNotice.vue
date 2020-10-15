<!--发布通知-->
<template>
  <div class="add-notice">
    <el-form
      :model="addForm"
      :rules="addRules"
      ref="addForm"
      label-width="100px"
      class="add-form"
    >
      <el-form-item label="通知标题" prop="noticeContent">
        <el-input
          type="text"
          v-model="addForm.noticeContent"
          style="width: 46%"
        ></el-input>
      </el-form-item>

      <el-form-item label="通知正文" prop="noticeIntroduce">
        <editor
          id="editor_id"
          height="300px"
          width="100%"
          :content.sync="addForm.noticeIntroduce"
          :loadStyleMode="false"
          @on-content-change="onContentChange"
        ></editor>
      </el-form-item>

      <el-form-item label="有效期限" prop="validDate">
        <el-date-picker
          v-model="addForm.validDate"
          type="date"
          placeholder="请选择有限期限"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="选择实验" prop="experimentId">
        <el-select
          placeholder="请选择"
          v-model="addForm.experimentId"
          @change="handleExperimentChange"
        >
          <el-option
            v-for="item in experimentList"
            :key="item.projectId"
            :label="item.projectName"
            :value="item.projectId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择安排" prop="assignId">
        <el-select
          placeholder="请选择"
          v-model="addForm.assignId"
          @change="handleAssignChange"
        >
          <el-option
            v-for="item in assignList"
            :key="item.assignId"
            :label="item.assignName"
            :value="item.assignId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择学生" prop="userIds">
        <div class="studentBox">
          <div class="allCheck">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
          </div>
          <div class="studentList">
            <el-checkbox-group
              v-model="checkedStudents"
              @change="handleCheckedStudentsChange"
            >
              <el-checkbox
                v-for="student in allStudents"
                :label="student"
                :key="student.userId"
                >{{ `${student.userName}（${student.realName}）` }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
      </el-form-item>

      <el-form-item class="btn">
        <el-button type="primary" round @click="handlePublish('addForm')"
          >发布</el-button
        >
        <el-button round @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import editor from "@/components/KindEditor";
import {
  getExperimentList,
  getAssignList,
  getStudentList,
  addNoticeOfTeacher
} from "@/api/admin";
import { number } from "echarts/lib/export";

export default {
  name: "addNotice",
  components: {
    editor,
  },
  data() {
    var validateUser = (rule, value, callback) => {
      if (this.checkedStudents.length < 0) {
        callback(new Error("请选择"));
      } else {
        callback();
      }
    };
    return {
      addForm: {
        noticeContent: "",
        noticeIntroduce: "",
        validDate: null,
        experimentId: null,
        assignId: null,
        userIds: [],
      },
      addRules: {
        noticeContent: [
          { required: true, message: "请输入标题", trigger: "blur" },
        ],
        noticeIntroduce: [
          { required: true, message: "请输入正文", trigger: "blur" },
        ],
        experimentId: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        assignId: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        userIds: [
          { validator: validateUser, trigger: "blur" },
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      experimentId: Number,
      experimentList: [],
      assignId: Number,
      assignList: [],
      checkAll: false,
      checkedStudents: [],
      allStudents: [],
      isIndeterminate: false,
    };
  },
  mounted() {
    this.getExperimentList();
  },
  methods: {
    onContentChange(val) {
      this.addForm.noticeIntroduce = val;
    },
    handlePublish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let ids = [];
          this.checkedStudents.forEach(item => {
            ids.push(item.userId)
          })
          let param = {
            ...this.addForm,
            userIds: ids
          }
          addNoticeOfTeacher(param)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.$router.go(-1);
              }
            })
            .catch((err) => {
              this.$message.error(err.msg);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    handleExperimentChange(val) {
      console.log("val", val);
      this.experimentId = val;
      this.getAssignList();
    },
    handleAssignChange(val) {
      console.log("val", val);
      this.assignId = val;
      this.getStudentList();
    },
    getExperimentList() {
      getExperimentList()
        .then((res) => {
          if (res.code === 200) {
            res.data.forEach((item) => {
              this.experimentList.push({
                projectId: item.projectId,
                projectName: item.projectName,
              });
            });
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    getAssignList() {
      getAssignList(this.experimentId)
        .then((res) => {
          if (res.code === 200) {
            res.data.forEach((item) => {
              this.assignList.push({
                assignId: item.assignId,
                assignName: item.assignName,
              });
            });
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    getStudentList() {
      getStudentList(this.assignId)
        .then((res) => {
          if (res.code === 200) {
            this.allStudents = []
            res.data.forEach((item) => {
              this.allStudents.push({
                userId: item.userId,
                userName: item.userName,
                realName: item.realName,
              });
            });
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    handleCheckAllChange(val) {
      console.log(val);
      this.checkedStudents = val ? this.allStudents : [];
      console.log(this.checkedStudents);
      this.isIndeterminate = false;
    },
    handleCheckedStudentsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allStudents.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allStudents.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-notice {
  padding-top: 15px;
  .btn {
    .el-button {
      width: 120px;
    }
  }
  .studentBox {
    border: 1px solid #ddd;
    .allCheck {
      padding: 5px 10px;
      border-bottom: 1px dashed #ddd;
    }
    .studentList {
      padding: 5px 10px;
      min-height: 294px;
    }
  }
}

.btn ::v-deep .el-form-item__content {
  margin-left: 0;
  text-align: center;
}
</style>