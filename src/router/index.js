import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
//  */


const routerMain = () => import('@/layout/components/AppMain')

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/homePage/index'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/homePage/allExperiment'),
        hidden: true,
      },
      {
        path: 'dynamicInfo',
        component: () => import('@/views/homePage/news/index'),
        hidden: true,
      },
      {
        path: 'download',
        component: () => import('@/views/homePage/download/index'),
        hidden: true,
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    mark: true,
    children: [
      // {
      //   path: 'home',
      //   name: 'home',
      //   component: () => import('@/views/index'),
      //   meta: {
      //     title: '首页',
      //     icon: 'user'
      //   },
      // },
      {
        path: 'projectList',
        name: 'projectList',
        redirect: '/projectList/list',
        component: routerMain,
        meta: {
          title: '项目列表',
          icon: ''
        },
        children: [{
          path: 'list',
          name: 'list',
          component: () => import('@/views/addProject/projectList'),
          meta: {
            title: '所有项目',
            icon: ''
          },
        },
        {
          path: 'addProject',
          name: 'addProject',
          component: () => import('@/views/addProject/addProject'),
          meta: {
            title: '添加项目',
            icon: ''
          },
          hidden: true
        }
        ]
      },
      {
        path: 'projectMaintain',
        name: 'projectMaintain',
        component: routerMain,
        redirect: '/projectMaintain',
        meta: {title: '项目维护', icon: ''},
        children: [
          {
          path: '/',
          component: () => import('@/views/teacher/projectMaintain'),
          },
          {
            path: 'projectEdit',
            name: 'projectEdit',
            component: () => import('@/views/teacher/projectEdit'),
            meta: {title: '编辑项目', icon: ''},
          }
        ]
      },
      {
        path: 'projectManage',
        name: 'projectManage',
        component: () => import('@/views/projectAdmin/projectManage'),
        meta: {
          title: '项目管理',
          icon: ''
        },
      },
      {
        path: 'projectStatistics',
        name: 'projectStatistics',
        component: () => import('@/views/projectAdmin/projectStatistics'),
        meta: {
          title: '项目统计',
          icon: ''
        },
      },
      {
        path: 'adminNotice',
        component: () => import('@/views/projectAdmin/noticeManagement/index'),
        meta: {
          title: '通知公告',
          icon: ''
        },
        children: [
          {
            path: '/',
            name: 'adminNotice',
            component: () => import('@/views/projectAdmin/noticeManagement/notice'),
          },
          {
            path: 'addNotice',
            name: 'addNotice',
            component: () => import('@/views/projectAdmin/noticeManagement/addNotice'),
            meta: {
              title: '发布通知',
              icon: ''
            }
          },
          {
            path: 'lookNotice',
            name: 'lookNotice',
            component: () => import('@/views/projectAdmin/noticeManagement/lookNotice'),
            meta: {
              title: '查看通知',
              icon: ''
            }
          }
        ]
      },

      {
        path: 'teachInner',
        redirect: '/teachInner',
        component: routerMain,
        // meta: {
        //   title: '校内教学',
        //   icon: ''
        // },
        children: [{
          path: '/teachInner',
          name: 'teachInner',
          component: () => import('@/views/teacher/teachInner'),
          meta: {
            title: '校内教学',
            icon: ''
          },
        },
        {
          path: 'project',
          name: 'project',
          component: () => import('@/views/teacher/teachInner/project'),
          meta: {
            title: '项目信息查看',
            icon: ''
          },
          hidden: true
        },
        {
          path: 'release',
          name: 'release',
          component: () => import('@/views/teacher/teachInner/release'),
          meta: {
            title: '项目发布',
            icon: ''
          },
          hidden: true
        },
        {
          path: 'projectArrangement',
          name: 'projectArrangement',
          component: () => import('@/views/teacher/teachInner/projectArrangement'),
          meta: {
            title: '实验布置列表',
            icon: ''
          },
          hidden: true
        },
        ,
        {
          path: 'seeassign',
          name: 'seeassign',
          component: () => import('@/views/teacher/teachInner/seeassign'),
          meta: {
            title: '查看布置实验',
            icon: ''
          },
          hidden: true
        },
        {
          path: 'correctList',
          name: 'correctList',
          component: () => import('@/views/teacher/teachInner/correctList'),
          meta: {
            title: '批改列表',
            icon: ''
          },
          hidden: true
        },
        {
          path: 'Correcting',
          name: 'Correcting',
          component: () => import('@/views/teacher/teachInner/Correcting'),
          meta: {
            title: '批改内容',
            icon: ''
          },
          hidden: true
        }
        ]
      },

      {
        path: 'correctionShare',
        // name: 'correctionShare',
        // component: () => import('@/views/teacher/correctionShare'),
        // meta: {
        //   title: '批改共享',
        //   icon: ''
        // },
        component: routerMain,
        children:[
          {
            path: '/correctionShare',
            name: 'correctionShare',
            component: () => import('@/views/teacher/correctionShare'),
            meta: {
              title: '批改共享',
              icon: ''
            },
          },
          ,
        {
          path: 'correctList',
          name: 'correctList',
          component: () => import('@/views/teacher/correctionShare/correctList'),
          meta: {
            title: '批改列表',
            icon: ''
          },
          hidden: true
        },
        {
          path: 'Correcting',
          name: 'Correcting',
          component: () => import('@/views/teacher/correctionShare/Correcting'),
          meta: {
            title: '批改内容',
            icon: ''
          },
          hidden: true
        }
        ]
      },

      {
        path: 'teacherNotice',
        component: () => import('@/views/teacher/noticeManagement/index'),
        meta: {
          title: '通知列表',
          icon: ''
        },
        children: [
          {
            path: '/',
            name: 'teacherNotice',
            component: () => import('@/views/teacher/noticeManagement/notice')
          },
          {
            path: 'addNotice',
            name: 'addNotice',
            component: () => import('@/views/teacher/noticeManagement/addNotice'),
            meta: {
              title: '发布通知',
              icon: ''
            }
          },
          {
            path: 'lookNotice',
            name: 'lookNotice',
            component: () => import('@/views/teacher/noticeManagement/lookNotice'),
            meta: {
              title: '查看通知',
              icon: ''
            }
          }
        ]
      },
      {
        path: 'allExperiment',
        name: 'allExperiment',
        component: routerMain,
        meta: { title: '全部实验', icon: 'user'},
        redirect: '/allExperiment',
        children: [
          {
            path: '/',
            component: () => import('@/views/student/all')
          },
          {
            path: 'electiveView',
            name: 'electiveView',
            component: () => import('@/views/student/electiveView'),
            meta: {
              title: '',
              icon: ''
            }
          },
          {
            path: 'electiveExperiment',
            name: 'electiveExperiment',
            component: () => import('@/views/student/electiveExperiment'),
            meta: {
              title: '开始实验',
              icon: ''
            }
          }
        ]
      },
      {
        path: 'myExperiment',
        name: 'myExperiment',
        component: routerMain,
        meta: {title: '我的实验', icon: 'user'},
        redirect: '/myExperiment',
        children: [
          {
            path: '/',
            component: () => import('@/views/student/my')
          },
          {
            path: 'arrangedView',
            name: 'arrangedView',
            component: () => import('@/views/student/electiveView'),
            meta: {
              title: '',
              icon: ''
            }
          },
          {
            path: 'arrangedExperiment',
            name: 'arrangedExperiment',
            component: () => import('@/views/student/electiveExperiment'),
            meta: {
              title: '开始实验',
              icon: ''
            }
          }
        ]
      },
      {
        path: '/userManage',
        redirect: '/userManage/teacher',
        component: () => import('@/layout/components/AppMain'),
        meta: {
          title: '用户管理',
          icon: 'user'
        },
        children: [{
          path: 'teacher',
          name: 'teacher',
          component: () => import('@/views/superAdmin/teacherManage'),
          meta: {
            title: '教师管理',
            icon: 'user'
          },
        },
        {
          path: 'student',
          name: 'student',
          component: () => import('@/views/superAdmin/studentManage'),
          meta: {
            title: '学生管理',
            icon: 'user'
          },
        },
        ]
      },
      {
        path: '/groupManage',
        redirect: '/groupManage/college',
        component: () => import('@/layout/components/AppMain'),
        meta: {
          title: '分组管理',
          icon: 'user'
        },
        children: [{
          path: 'college',
          name: 'college',
          component: () => import('@/views/superAdmin/collegeManage'),
          meta: {
            title: '院校管理',
            icon: 'user'
          },
        },
        {
          path: 'clazz',
          name: 'clazz',
          component: () => import('@/views/superAdmin/classManage'),
          meta: {
            title: '班级管理',
            icon: 'user'
          },
        },
        ]
      },
      {
        path: 'noReadNotice',
        component: () => import('@/views/noReadNotice'),
        meta: {
          title: '通知列表',
          icon: ''
        },
        children: [
          {
            path: '/',
            name: 'noReadNotice',
            component: () => import('@/views/noReadNotice/list'),
          },
          {
            path: 'lookNotice',
            name: 'lookNotice',
            component: () => import('@/views/noReadNotice/noticeInfo'),
            meta: {
              title: '查看通知',
              icon: ''
            },
          }
        ]
      },
      {
        path: 'news',
        component: () => import('@/views/webAdmin/news/index'),
        meta: {
          title: '资讯动态',
          icon: ''
        },
        children: [
          {
            path: '/',
            name: 'news',
            component: () => import('@/views/webAdmin/news/news'),
          },
          {
            path: 'addNews',
            name: 'addNews',
            component: () => import('@/views/webAdmin/news/addNews'),
            meta: {
              title: '添加资讯',
              icon: ''
            },
          }
        ]
      },
      {
        path: 'downloadCenter',
        component: () => import('@/views/webAdmin/downloadCenter/index'),
        meta: {
          title: '下载中心',
          icon: ''
        },
        children: [
          {
            path: '/',
            name: 'downloadCenter',
            component: () => import('@/views/webAdmin/downloadCenter/download')
          }
        ]
      },
    ]
  },
  /*
    {
      path: '/',
      component: Layout,
      redirect: '/index',
      children: [{
        path: 'index',
        name: 'index',
        component: () => import('@/views/index'),
        meta: {title: '首页', icon: 'dashboard'}
      }]
    },
    {
      path: '/allExperiment',
      component: Layout,
      redirect: '/allExperiment',
      children: [{
        path: 'allExperiment',
        name: 'AllExperiment',
        component: () => import('@/views/student/all'),
        meta: {title: '全部实验', icon: 'dashboard'}
      }]
    },
    {
      path: '/myExperiment',
      component: Layout,
      redirect: '/myExperiment',
      children: [{
        path: 'myExperiment',
        name: 'MyExperiment',
        component: () => import('@/views/student/my'),
        meta: {title: '我的实验', icon: 'dashboard'}
      }]
    },

    {
      path: '/manage',
      component: Layout,
      redirect: '/manage/studentManage',
      name: 'manage',
      meta: {title: '用户管理', icon: 'el-icon-s-help'},
      children: [
        {
          path: 'studentManage',
          name: 'StudentManage',
          component: () => import('@/views/superAdmin/studentManage'),
          meta: {title: '学生管理', icon: 'table'}
        },
        {
          path: 'teacherManage',
          name: 'TeacherManage',
          component: () => import('@/views/superAdmin/teacherManage'),
          meta: {title: '教师管理', icon: 'tree'}
        }
      ]
    },

    {
      path: '/group',
      component: Layout,
      redirect: '/group/studentManage',
      name: 'manage',
      meta: {title: '分组管理', icon: 'el-icon-s-help'},
      children: [
        {
          path: 'collegeManage',
          name: 'collegeManage',
          component: () => import('@/views/superAdmin/collegeManage'),
          meta: {title: '学院管理', icon: 'table'}
        },
        {
          path: 'classManage',
          name: 'classManage',
          component: () => import('@/views/superAdmin/classManage'),
          meta: {title: '班级管理', icon: 'tree'}
        }
      ]
    },*/

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
