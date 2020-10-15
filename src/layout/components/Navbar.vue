<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="@/assets/icon/5.svg" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              个人信息
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              切换角色
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    

    <el-popover
      placement="bottom"
      width="280"
      trigger="click"
      class="unread-messages-box"
    >
      <div class="unread-messages-content">
        <p class="title">通知</p>
        <!-- <p class="no-content">暂无最新通知</p> -->
        <ul>
          <li v-for="notice in noticeList" :key="notice.noticeId">
            <span class="red"></span>
            {{notice.noticeContent}}
          </li>
        </ul>
        <div class="lookAll" @click="toNoticeList">查看全部</div>
      </div>
      <!-- 未读消息 -->
      <div class="unread-messages" slot="reference">
        <i class="el-icon-bell"></i>
        <span class="count">10</span>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getNewNotice } from '@/api/admin'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      noticeList: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  mounted() {
    this.getNewNotice();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    async logout() {
      this.$confirm('确定要退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('logout')
        this.$router.push(`/login`)
      }).catch(() => {
        // 如果取消跳转地址栏会变化，这时保持地址栏不变
        window.history.go(1)
      })
    },
    getNewNotice() {
      getNewNotice()
      .then(res => {
        if (res.code === 200) {
          let arr = res.data;
          if (arr.length > 3 || arr.length === 3) {
            this.noticeList = arr.slice(0, 3)
          } else {
            this.noticeList = arr
          }
        }
      })
      .catch(err => {
        this.$message.error(err.msg)
      })
    },
    toNoticeList () {
      // scope._self.$refs[popover-${scope.$index}].doClose()
      this.$router.push('/noReadNotice')
    }
  },

 
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .unread-messages {
    position: relative;
    float: right;
    height: 100%;
    margin-right: 3%;
    i {
      font-size: 32px;
      margin-top: 14px;
    }
    .count {
      padding: 4px;
      background-color: red;
      color: white;
      border-radius: 45%;
      font-size: 12px;
      position: absolute;
      top: 4px;
      left: 28px;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style scoped>
.unread-messages-content {
  cursor: pointer;
}
.unread-messages-content .title{
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #4a535c;
  padding: 10px 20px;
  border-bottom: 1px solid #eaeef1;
  font-family: '微软雅黑';
}
.unread-messages-content ul {
  margin: 0;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid #eaeef1;
  padding: 16px;
}
.unread-messages-content ul li {
  line-height: 25px;
  word-break: keep-all; /* 不换行 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis;
}
.unread-messages-content .no-content {
  margin: 0;
  padding: 0;
  text-align: center;
  padding: 20px 0;
  color: #666;
  font-size: 12px;
  border-bottom: 1px solid #eaeef1;

}
.unread-messages-content .lookAll {
  margin-top: 16px;
  text-align: center;
}
</style>
