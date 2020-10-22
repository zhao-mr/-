<!--通知管理-->
<template>
  <div class="notice-container">
    <div class="notice-main" v-if="noticeList.length > 0">
      <el-card class="notice-list">
        <div
          class="notice-item"
          v-for="item in noticeList"
          :key="item.noticeId"
          @click="toInfo(item.noticeId, item.ifRead)"
        >
          <div class="img"></div>
          <div class="notice-info">
            <div>
              <span style="padding-right: 16px">{{ item.issueUserName }}</span>
              <span style="padding-right: 16px">{{ item.noticeDate }}</span>
              <span class="icon" v-if="item.ifRead === 1">未读</span>
            </div>
            <p>{{ item.noticeContent }}</p>
          </div>
        </div>
      </el-card>
      <div class="notice-pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="no-content" v-else>暂无内容哦~</div>
  </div>
</template>

<script>
import { getAllNoticeToMe, readNotice } from "@/api/admin";

export default {
  name: "noReadNotice",
  computed: {},
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      noticeList: [],
    };
  },
  mounted() {
    this.getAllNoticeToMe();
  },
  methods: {
    getAllNoticeToMe() {
      let param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      getAllNoticeToMe(param)
        .then((res) => {
          if (res.code === 200) {
            this.noticeList = res.data.list;
            this.total = res.data.total;
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAllNoticeToMe();
    },
    toInfo(noticeId, isRead) {
      // isRead：1是未读，2是已读
      if (isRead === 1) {
        this.readNotice(noticeId)
      }
      this.$router.push({
        path: "/noReadNotice/lookNotice",
        query: {
          noticeId: noticeId,
          isNoReadPage: true,
        },
      });
    },
    readNotice(noticeId) {
      readNotice(noticeId)
        .then((res) => {
          if (res.code === 200) {
            console.log('this.$bus.emit, noRead')
            this.$bus.emit('noRead')
            this.$router.push({
              path: "/noReadNotice/lookNotice",
              query: {
                noticeId: noticeId,
                isNoReadPage: true,
              },
            });
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>

<style lang="scss" scoped>
.notice-container {
  .notice-main {
    min-height: 420px;
    .notice-item {
      padding: 20px 0;
      border-bottom: 1px solid #eaeef1;
      display: flex;
      cursor: pointer;
      .img {
        width: 40px;
        height: 40px;
        border-radius: 45%;
        background-color: #3cafff;
        margin-right: 16px;
      }
      .notice-info {
        div {
          font-size: 12px;
          color: #89939c;
          .icon {
            padding: 4px;
            color: #fff;
            background-color: red;
            border-radius: 15%;
          }
        }
        p {
          margin-top: 10px;
          font-size: 16px;
          color: #4a535c;
          &:hover {
            color: #3cafff;
          }
        }
      }
    }
  }
  .notice-pagination {
    margin-top: 30px;
    text-align: center;
  }
  .no-content {
    color: #8d9194;
    margin-top: 40px;
    text-align: center;
  }
}
</style>
