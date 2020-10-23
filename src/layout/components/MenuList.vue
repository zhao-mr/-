<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        router
        mode="vertical"
      > -->
      <el-menu
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :collapse-transition="false"
        router
        mode="vertical"
      >
        <el-menu-item index="/home" :class="{'is-active': selectItem === '/home'}">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <!--项目添加员-->
        <template v-if="roles === 2">
          <el-menu-item index="/projectList/list" :class="{'is-active': selectItem === '/projectList/list'}">
            <i class="el-icon-set-up"></i>
            <span slot="title">项目列表</span>
          </el-menu-item>
        </template>

        <!--教师-->
        <template v-if="roles === 4">
          <el-menu-item index="/projectMaintain" :class="{'is-active': selectItem === '/projectMaintain'}">
            <i class="el-icon-set-up"></i>
            <span slot="title">项目维护</span>
          </el-menu-item>
          <el-menu-item index="/teachInner" :class="{'is-active': selectItem === '/teachInner'}">
            <i class="el-icon-school"></i>
            <span slot="title">校内教学</span>
          </el-menu-item>
          <el-menu-item index="/correctionShare" :class="{'is-active': selectItem === '/correctionShare'}">
            <i class="el-icon-share"></i>
            <span slot="title">批改共享</span>
          </el-menu-item>
          <el-menu-item index="/teacherNotice" :class="{'is-active': selectItem === '/teacherNotice'}">
            <i class="el-icon-message"></i>
            <span slot="title">通知管理</span>
          </el-menu-item>
        </template>

        <!--项目管理员-->
        <template v-if="roles === 3">
          <el-menu-item index="/projectManage" :class="{'is-active': selectItem === '/projectManage'}">
            <i class="el-icon-set-up"></i>
            <span slot="title">项目管理</span>
          </el-menu-item>
          <el-menu-item index="/projectStatistics" :class="{'is-active': selectItem === '/projectStatistics'}">
            <i class="el-icon-school"></i>
            <span slot="title">项目统计</span>
          </el-menu-item>
          <el-menu-item index="/adminNotice" :class="{'is-active': selectItem === '/adminNotice'}">
            <i class="el-icon-share"></i>
            <span slot="title">通知管理</span>
          </el-menu-item>
        </template>

        <!--学生-->
        <template v-if="roles === 5">
          <el-menu-item index="/allExperiment" :class="{'is-active': selectItem === '/allExperiment'}">
            <i class="el-icon-menu"></i>
            <span slot="title">全部实验</span>
          </el-menu-item>
          <el-menu-item index="/myExperiment" :class="{'is-active': selectItem === '/myExperiment'}">
            <i class="el-icon-user-solid"></i>
            <span slot="title">我的实验</span>
          </el-menu-item>
        </template>

        <!--系统管理员-->
        <template v-if="roles === 1">
          <el-submenu index="/userManage">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/userManage/teacher" :class="{'is-active': selectItem === '/userManage/teacher'}">
              <span>教师管理</span>
            </el-menu-item>
            <el-menu-item index="/userManage/student" :class="{'is-active': selectItem === '/userManage/student'}">
              <span>学生管理</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/groupManage">
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span>分组管理</span>
            </template>
            <el-menu-item index="/groupManage/college" :class="{'is-active': selectItem === '/groupManage/college'}">
              <span>院校管理</span>
            </el-menu-item>
            <el-menu-item index="/groupManage/clazz" :class="{'is-active': selectItem === '/groupManage/clazz'}">
              <span>班级管理</span>
            </el-menu-item>
          </el-submenu>
        </template>
        <!--<sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />-->

        <!--网络管理员-->
        <template v-if="roles === 6">
          <el-menu-item index="/news" :class="{'is-active': selectItem === '/news'}">
            <i class="el-icon-message"></i>
            <span slot="title">资讯动态</span>
          </el-menu-item>
          <el-menu-item index="/downloadCenter" :class="{'is-active': selectItem === '/downloadCenter'}">
            <i class="el-icon-upload"></i>
            <span slot="title">下载中心</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Sidebar/Logo";

import variables from "@/styles/variables.scss";
import user from '@/store/modules/user';

export default {
  components: { Logo },
  data() {
    return {
      roles: null,
      selectItem: '',
    }
  },
  computed: {
    ...mapGetters(["sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      // if (meta.activeMenu) {
      //   return meta.activeMenu
      // }
      // console.info(path)
      return path;
    },
    showLogo() {
      return true;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  watch:{
    $route:{
      handler(val){
        console.log(val);//新路由信息
        this.matchRouter(val)
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted() {
    this.getRole();
    this.$bus.on('changeRole',roleId => {
      console.log('this.$bus.on====changeRole')
      this.roles = roleId;
      let path = '';
      switch(roleId) {
        case 1:
          path = '/userManage/teacher';
          break;
        case 2:
          path = '/projectList/list';
          break;
        case 3:
          path = '/projectManage';
          break;
        case 4:
          path = '/projectMaintain';
          break;
        case 5: // 学生
          path = '/allExperiment';
          break;
        case 6:
          path = '/news';
          break;          
      }
      this.$router.push({
        path: path
      })
    });
    this.matchRouter(this.$route)
  },
  methods: {
    getRole() {
      // console.info(this.$store.state.user.roles)
      // teacher 教师；projectAdmin 项目管理员；superAdmin 系统管理员；student 学生; addProject 项目添加员
      // 1：系统管理员；2：项目添加员； 3：项目管理员；4：教师；5：student
      
      if (this.$store.state.user.currentRole) {
        this.roles = this.$store.state.user.currentRole.roleId
      } else {
        let arr = this.$store.state.user.roles;
        let role = arr[0]; // 最大的角色
        arr.forEach(item => {
          if (item.roleId < role.roleId) {
            role = item
          }
        });
        this.$store.dispatch('setCurrentRole', role)
        this.roles = this.$store.state.user.currentRole.roleId
      }
    },
    matchRouter(val) {
      if (val.path.indexOf('/home') !== -1) {
        this.selectItem = '/home'
      } else if (val.path.indexOf('/projectList/list') !== -1) {
        this.selectItem = '/projectList/list'
      } else if (val.path.indexOf('/projectMaintain') !== -1) {
        this.selectItem = '/projectMaintain'
      } else if (val.path.indexOf('/teachInner') !== -1) {
        this.selectItem = '/teachInner'
      } else if (val.path.indexOf('/correctionShare') !== -1) {
        this.selectItem = '/correctionShare'
      } else if (val.path.indexOf('/teacherNotice') !== -1) {
        this.selectItem = '/teacherNotice'
      } else if (val.path.indexOf('/projectManage') !== -1) {
        this.selectItem = '/projectManage'
      } else if (val.path.indexOf('/projectStatistics') !== -1) {
        this.selectItem = '/projectStatistics'
      } else if (val.path.indexOf('/adminNotice') !== -1) {
        this.selectItem = '/adminNotice'
      } else if (val.path.indexOf('/allExperiment') !== -1) {
        this.selectItem = '/allExperiment'
      } else if (val.path.indexOf('/myExperiment') !== -1) {
        this.selectItem = '/myExperiment'
      } else if (val.path.indexOf('/userManage/teacher') !== -1) {
        this.selectItem = '/userManage/teacher'
      } else if (val.path.indexOf('/userManage/student') !== -1) {
        this.selectItem = '/userManage/student'
      } else if (val.path.indexOf('/groupManage/college') !== -1) {
        this.selectItem = '/groupManage/college'
      } else if (val.path.indexOf('/groupManage/clazz') !== -1) {
        this.selectItem = '/groupManage/clazz'
      } else if (val.path.indexOf('/news') !== -1) {
        this.selectItem = '/news'
      } else if (val.path.indexOf('/downloadCenter') !== -1) {
        this.selectItem = '/downloadCenter'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.is-active {
  color: #409EFF !important;
}
</style>
