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
        <el-form-item label="资讯标题" prop="title">
          <el-input
            type="text"
            v-model="addForm.title"
            style="width: 46%"
          ></el-input>
        </el-form-item>

        <el-form-item label="资讯简介" prop="introduce">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="addForm.introduce">
          </el-input>
        </el-form-item>

        <el-form-item label="资讯内容" prop="content">
          <editor
            id="editor_id"
            height="300px"
            width="100%"
            :content.sync="addForm.content"
            :loadStyleMode="false"
            @on-content-change="onContentChange"
          ></editor>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择">
            <el-option label="news" value="news"></el-option>
            <el-option label="notice" value="notice"></el-option>
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
import { addNews, addNotice } from "@/api/webAdmin"

export default {
  name: "addNews",
  components: {
    editor,
  },
  data() {
    return {
      addForm: {
        title: "",
        introduce: "",
        content: "",
        type: "",
      },
      addRules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "请输入简介", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入正文", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择", trigger: "blur" },
        ]
      }
    };
  },
  mounted() {},
  methods: {
    onContentChange(val) {
      this.addForm.content = val;
    },
    handlePublish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addForm.type === 'news') {
            this.addNews()
          } else {
            this.addNotice();
          }
        } else {
          console.log("请输入正确格式");
          return false;
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    addNews() {
      let param = {
        newsTitle: this.addForm.title,
        newsIntroduce: this.addForm.introduce,
        newsContent: this.addForm.content,
        newsSource: this.$store.state.user.name
      }
      addNews(param)
      .then(res => {
        if (res.code === 200){
          this.$message.success(res.msg);
          this.$router.go(-1);
        }
      })
      .catch(err => {
        this.$message.error(err.msg);
      })
    },
    addNotice() {
      let param = {
        announcementTitle: this.addForm.title,
        announcementContent: this.addForm.content,
        announcementSource: this.$store.state.user.name
      }
      addNotice(param)
      .then(res => {
        if (res.code === 200){
          this.$message.success(res.msg);
          this.$router.go(-1);
        }
      })
      .catch(err => {
        this.$message.error(err.msg);
      })
    }
    
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