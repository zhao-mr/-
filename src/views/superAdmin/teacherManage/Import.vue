<template>
  <div>
    <el-dialog
      title="教工导入"
      :visible.sync="cloBol"
      v-if="cloBol"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <div >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分组" prop="valueopt">
              <el-cascader
                style="width: 100%;"
                v-model="ruleForm.valueopt"
                :options="optList"
                clearable
              ></el-cascader>
          </el-form-item>
          <el-form-item label="角色" prop="checkList">
            <el-checkbox-group v-model="ruleForm.checkList">
              <el-checkbox
                    v-for="city in jiaose"
                    :label="city.roleId"
                    :key="city.roleId"
                    >
                    {{ city.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="" prop="fileList">
            <div style="">
            <el-upload
              class="upload-demo"
              drag
              :action="url + 'user/importSysUser'"
              multiple
              :limit="1"
              ref="upload"
              accept=".xls,.xlsx"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeUpload"
              :on-change="handleChange"
              :file-list="ruleForm.fileList"
              :auto-upload="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                <p> 文件类型必须为xls或xlsx(即Excel格式)</p>
                <p></p>
              </div>
            </el-upload>
          </div>
          </el-form-item>
          
          <el-form-item label="" prop="">
             <div class="" style="color: red;">*注: 每位教工增加成功后的初始密码为（123456）</div>
          </el-form-item>
          <div style="text-align: center;margin-top: 10px;">
            <el-button @click="resetForm('ruleForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGroup ,importSysUser} from "@/api/superAdmin";
import { apiPath } from "@/config/env";
export default {
  data() {
    return {
      cloBol: false,
      url: apiPath,
      ruleForm: {
        checkList: [], //角色
        valueopt: [], //学院学科选中值
        fileList:[],//图片
      },
      rules: {
        checkList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "blur"
          }
        ],
        valueopt: [
          { type: 'array', required: true, message: '请选择分组', trigger: 'change' }
        ],
        fileList: [
          { type: 'array', required: true, message: '请上传文件', trigger: 'change' }
        ],
      },
      jiaose: [], //角色列表
      optList: [], //学院学科选择列表

    };
  },
  methods:{
    //  获取学院角色信息
    getGroup() {
      getGroup()
        .then(res => {
          // console.log(res);
          var xunzhi = res.role;
          this.jiaose = xunzhi.filter(item => {
            return !"5".includes(item.roleId);
          });

          var zhicollege = res.college;
          var zhimajor = res.major;

          var Bosput = [];
          for (let i = 0; i < zhicollege.length; i++) {
            Bosput.push({
              value: zhicollege[i].collegeId,
              label: zhicollege[i].collegeName,
              children: []
            });
            for (let j = 0; j < zhimajor.length; j++) {
              if (zhicollege[i].collegeId == zhimajor[j].collegeId) {
                Bosput[i].children.push({
                  value: zhimajor[j].majorId,
                  label: zhimajor[j].majorName,
                  collegeId: zhimajor[j].collegeId
                });
              }
            }
          }
          this.optList = Bosput;
        })
        .catch(err => {
          console.info(err);
        });
    },

    //判断上传文件类型
    beforeUpload(file) {
      // console.log(file);
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 xls、xlsx格式!",
          type: "warning"
        });
      }
      // if(!isLt2M) {
      //     this.$message({
      //         message: '上传文件大小不能超过 10MB!',
      //         type: 'warning'
      //     });
      // }
      // return (extension || extension2) && isLt2M
      return extension || extension2;
      //上传参数
    },

    //上传成功后
    handleAvatarSuccess(res, file) {
      console.log(res, file)
    },
    handleChange(file) {
      this.ruleForm.fileList = [file];
    },

      //确定
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const formData = new FormData();
            console.log(this.ruleForm.fileList)
            formData.append("file", this.ruleForm.fileList[0].raw);
            formData.append("roleIds", this.ruleForm.checkList);
            formData.append("collegeId", this.ruleForm.valueopt[0]);
            formData.append("majorId", this.ruleForm.valueopt[1]);
            formData.append("tbClassId", "");
            // console.log(formData)
           importSysUser(formData)
          .then(res => {
            // console.log(res);
            if (res.code == 200) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "success"
              });
              location. reload()
              this.cloBol = false
            }
           })
          .catch(err => {
            console.info(err);
          });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

  },
  mounted(){
    this.getGroup();
  }
};
</script>

<style scoped></style>
