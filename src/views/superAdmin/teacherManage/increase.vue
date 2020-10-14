<template>
  <div>
    <el-dialog
      :title="bostitle"
      :visible.sync="cloBol"
      v-if='cloBol'
      width="30%"
      center
      :close-on-click-modal="false"
      :key="timer1"
      @close="resetForms"
    >
      <div >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="ruleForm.realName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="账号/工号" prop="userName">
            <el-input v-model="ruleForm.userName"  placeholder="请输入账号/工号" :disabled="bosdisabled"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>

          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="radio">
            <el-radio-group v-model="ruleForm.radio">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
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
          <el-form-item label="学校" prop="school">
            <el-input v-model="ruleForm.school" placeholder="请输入学校名称"></el-input>
          </el-form-item>
           <el-form-item label="分组" prop="valueopt">
              <el-cascader
                style="width: 100%;"
                v-model="ruleForm.valueopt"
                :options="optList"
                clearable
              ></el-cascader>
          </el-form-item>
          <el-form-item label="" prop="">
             <div class="" style="color: red;">*注: 每位教工增加成功后的初始密码为（123456）</div>
          </el-form-item>
          <div style="text-align: center;">
            <el-button @click="resetForm('ruleForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGroup,addUser,updateUser } from "@/api/superAdmin";
export default {
  props: ["ctype"], //传过来的值
  computed: {
    normalizedSize: function () {
     return this.ctype.trim().toLowerCase()
    }
  },
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱格式"));
      }
    };
    return {
      cloBol: false,
      thistype:this.ctype,
      timer1:"",
      bosdisabled:false,
      userId:"", //用户ID
      bostitle:"",
      ruleForm: {
        realName: "", //姓名
        userName: "", //账号
        email: "", //邮箱
        phone: "", //手机号
        checkList: [], //角色
        valueopt: [], //学院学科选中值
        radio: "", //性别
        school: "" //学校
      },
      rules: {
        realName: [{ required: true, message: "请输入名称", trigger: "blur" },],
        userName: [{ required: true, message: "请输入账号", trigger: "blur" },],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (/(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/.test(value) == false) {
                callback(new Error("请输入正确的手机号(11位手机号)"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        radio: [{ required: true, message: "请选择性别", trigger: "change" }],
        school: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ],
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
      },
      jiaose: [], //角色列表
      optList: [], //学院学科选择列表
      
    };
  },
  methods: {
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

  //确定增加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ctype)
          if(this.ctype == "" || this.ctype == undefined || this.ctype == null){
          addUser({
            userName: this.ruleForm.userName, //账号
            realName: this.ruleForm.realName, //姓名
            password: "123456", //密码
            email: this.ruleForm.email, //邮箱
            sex: this.ruleForm.radio, //性别
            roleIds: this.ruleForm.checkList, //角色ID
            collegeId: this.ruleForm.valueopt[0], //学院ID
            majorId: this.ruleForm.valueopt[1], //专业ID
            phone: this.ruleForm.phone, //手机号
            school: this.ruleForm.school, //学校
            tbClassId: "" //班级
          })
          .then(res => {
            console.log(res);
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
        .catch(err => {});
          }else{
             updateUser({
               userId:this.userId,//id
            userName: this.ruleForm.userName, //账号
            realName: this.ruleForm.realName, //姓名
            password: "123456", //密码
            email: this.ruleForm.email, //邮箱
            sex: this.ruleForm.radio, //性别
            roleIds: this.ruleForm.checkList, //角色ID
            collegeId: this.ruleForm.valueopt[0], //学院ID
            majorId: this.ruleForm.valueopt[1], //专业ID
            phone: this.ruleForm.phone, //手机号
            school: this.ruleForm.school, //学校
            tbClassId: "" //班级
          })
          .then(res => {
            console.log(res);
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
        .catch(err => {});
          }

        } else {
          console.log(this.ctype)
          // console.log("error submit!!");
          return false;
        }
      });
    },
   
   resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetForms(){
      this.$refs['ruleForm'].resetFields(); 
    }
  },
  mounted() {
    // this.$refs['ruleForm'].resetFields(); 

    this.getGroup();
  },
  watch:{
    cloBol: function(){
      if(this.cloBol){
        if(this.ctype == "" || this.ctype == undefined || this.ctype == null){

          this.timer1 = new Date().getTime();
          this.ruleForm.realName = ""
          this.ruleForm.userName = ""
          this.ruleForm.email = ""
          this.ruleForm.phone = ""
          this.ruleForm.school = ""
          this.ruleForm.radio = ""
          this.ruleForm.checkList = []
          this.ruleForm.valueopt = [];
          this.bostitle = "增添教工";
          this.bosdisabled = false
        }else{
          this.bostitle = "编辑教工";
          this.bosdisabled = true
          this.ruleForm.realName = this.ctype.realName
          this.ruleForm.userName = this.ctype.userName
          this.ruleForm.email = this.ctype.email
          this.ruleForm.phone = this.ctype.phone
          this.ruleForm.school = this.ctype.school
          this.ruleForm.radio = this.ctype.sex
          this.ruleForm.valueopt[0] = this.ctype.collegeId
          this.ruleForm.valueopt[1] = this.ctype.majorId
          var biaoq = this.ctype.roles
          var pusbos = []
          for (let i = 0; i < biaoq.length; i++) {
            pusbos.push(biaoq[i].roleId)
          }
          this.ruleForm.checkList = pusbos
          this.userId = this.ctype.userId
        }

      }else{
      }
    }
  }
};
</script>

<style></style>
