<template>
  <div class="register-container">
    <el-form
      :model="registerForm"
      :rules="registerRules"
      ref="registerForm"
      label-width="100px"
      class="register-form"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          type="text"
          v-model="registerForm.userName"
        ></el-input>
      </el-form-item>

      <el-form-item label="真实姓名" prop="realName">
        <el-input
          type="text"
          v-model="registerForm.realName"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="registerForm.checkPass"
        ></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="registerForm.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="学校" prop="school">
        <el-input
          type="text"
          v-model="registerForm.school"
        ></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input
          type="text"
          v-model="registerForm.email"
        ></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="registerCode">
        <el-input
          type="text"
          v-model="registerForm.registerCode"
          style="width: 80%; margin-right: 10px;"
        ></el-input>
        <a @click="getCode">获取验证码</a>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loading" style="width:100%;" @click="handleRegister('registerForm')">注册</el-button>
        <!-- <el-button style="width:100%;" @click="toLogin">已有账号，去登录</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getCode, register} from '@/api/user'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }
    return {
      registerForm: {
        userName: "",
        realName: "",
        password: "",
        checkPass: "",
        sex: "",
        school: "",
        email: "",
        registerCode: ""
      },
      registerRules: {
        userName: [{  required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        school: [{ required: true, message: '请输入学校', trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        registerCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      loading: false,
      email: '',
    };
  },
  methods: {
    getCode() {
      getCode({email: this.registerForm.email}).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
          }
        })
    },
    handleRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          register(this.registerForm)
          .then(res => {
            if (res.code === 200) {
              this.loading = false
              this.$message.success(res.msg)
              this.$router.push({ path: '/login'})
            }
          })
          .catch(error => {
            this.loading = false
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push({ path: '/login' })
    }
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  margin: 0 auto;
  .register-form {
    width: 520px;
  }
}
.el-button+.el-button {
  margin-left: 0;
}
</style>