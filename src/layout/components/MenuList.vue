<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        router
        mode="vertical"
      >
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <!--项目添加员-->
        <template v-if="roles === 'addProject'">
          <el-menu-item index="/projectList/list">
            <i class="el-icon-set-up"></i>
            <span slot="title">项目列表</span>
          </el-menu-item>
        </template>

        <!--教师-->
        <template v-if="roles === 'teacher'">
          <el-menu-item index="/projectMaintain">
            <i class="el-icon-set-up"></i>
            <span slot="title">项目维护</span>
          </el-menu-item>
          <el-menu-item index="/teachInner">
            <i class="el-icon-school"></i>
            <span slot="title">校内教学</span>
          </el-menu-item>
          <el-menu-item index="/correctionShare">
            <i class="el-icon-share"></i>
            <span slot="title">批改共享</span>
          </el-menu-item>
          <el-menu-item index="/teacherNotice">
            <i class="el-icon-message"></i>
            <span slot="title">通知管理</span>
          </el-menu-item>
        </template>

        <!--项目管理员-->
        <template v-if="roles === 'projectAdmin'">
          <el-menu-item index="/projectManage">
            <i class="el-icon-set-up"></i>
            <span slot="title">项目管理</span>
          </el-menu-item>
          <el-menu-item index="/projectStatistics">
            <i class="el-icon-school"></i>
            <span slot="title">项目统计</span>
          </el-menu-item>
          <el-menu-item index="/adminNotice">
            <i class="el-icon-share"></i>
            <span slot="title">通知管理</span>
          </el-menu-item>
        </template>

        <!--学生-->
        <template v-if="roles === 'student'">
          <el-menu-item index="/allExperiment">
            <i class="el-icon-menu"></i>
            <span slot="title">全部实验</span>
          </el-menu-item>
          <el-menu-item index="/myExperiment">
            <i class="el-icon-user-solid"></i>
            <span slot="title">我的实验</span>
          </el-menu-item>
        </template>

        <!--系统管理员-->
        <template v-if="roles === 'superAdmin'">
          <el-submenu index="/userManage">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/userManage/teacher">教师管理</el-menu-item>
            <el-menu-item index="/userManage/student">学生管理</el-menu-item>
          </el-submenu>
          <el-submenu index="/groupManage">
          <template slot="title">
            <i class="el-icon-notebook-1"></i>
            <span>分组管理</span>
          </template>
          <el-menu-item index="/groupManage/college">院校管理</el-menu-item>
          <el-menu-item index="/groupManage/clazz">班级管理</el-menu-item>
        </el-submenu>
        </template>
        <!--<sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />-->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Sidebar/Logo'

  import variables from '@/styles/variables.scss'

  export default {
    components: { Logo },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        // if (meta.activeMenu) {
        //   return meta.activeMenu
        // }
        // console.info(path)
        return path
      },
      showLogo() {
        return true
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      },
      roles(){
        // console.info(this.$store.state.user.roles)
        // teacher 教师；projectAdmin 项目管理员；superAdmin 系统管理员；student 学生; addProject 项目添加员
        return 'addProject'
      }
    }
  }
</script>
