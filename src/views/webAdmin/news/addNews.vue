<!--发布通知-->
<template>
  <div>
    <el-card class="add-news">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="100px"
        class="add-form"
      >
        <el-form-item label="资讯标题" prop="noticeContent">
          <el-input
            type="text"
            v-model="addForm.noticeContent"
            style="width: 46%"
          ></el-input>
        </el-form-item>

        <el-form-item label="资讯内容" prop="noticeIntroduce">
          <editor
            id="editor_id"
            height="300px"
            width="100%"
            :content.sync="addForm.noticeIntroduce"
            :loadStyleMode="false"
            @on-content-change="onContentChange"
          ></editor>
        </el-form-item>

        <el-form-item label="类型" prop="validDate">
          <!-- <el-date-picker
            v-model="addForm.validDate"
            type="date"
            placeholder="请选择有限期限"
            :picker-options="pickerOptions"
          >
          </el-date-picker> -->
          <el-select v-model="addForm.validDate" placeholder="请选择">
            <el-option label="新闻"></el-option>
            <el-option label="公告"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </el-card>
    <div class="btn">
      <el-button type="primary" round @click="handlePublish('addForm')"
        >发布</el-button
      >
      <el-button round @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import editor from "@/components/KindEditor";
import { addNotice } from "@/api/admin";

export default {
  name: "addNews",
  components: {
    editor,
  },
  data() {
    return {
      addForm: {
        noticeContent: "",
        noticeIntroduce: "",
        validDate: null,
      },
      addRules: {
        noticeContent: [
          { required: true, message: "请输入标题", trigger: "blur" },
        ],
        noticeIntroduce: [
          { required: true, message: "请输入正文", trigger: "blur" },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
    };
  },
  mounted() {},
  methods: {
    onContentChange(val) {
      this.addForm.noticeIntroduce = val;
    },
    handlePublish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addNotice(this.addForm)
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
  },
};
</script>

<style lang="scss" scoped>
.btn {
  margin-top: 30px;
  text-align: center;
  .el-button {
    width: 120px;
    }
}

</style>