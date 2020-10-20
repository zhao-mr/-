<!--通知管理-->
<template>
  <div class="notice-container">
    <h4>通知列表</h4>
    <div class="notice-main" v-if="noticeList.length > 0">
      <el-card class="notice-list">
        <div class="notice-item" v-for="item in noticeList" :key="item.noticeId">
          <div class="img"></div>
          <div class="notice-info">
            <div>
              <span style="padding-right: 16px;">项目管理员</span>
              <span>{{item.noticeDate}}</span>
            </div>
            <p>{{item.noticeContent}}</p>
          </div>
        </div>
      </el-card>
      <div class="notice-pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="no-content" v-else>暂无内容哦~</div>
  </div>
</template>

<script>
import { getAllNoticeToMe } from '@/api/admin'

export default {
  name: "noReadNotice",
  computed: {},
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      noticeList: []
    };
  },
  mounted() {
    this.getAllNoticeToMe()
  },
  methods: {
    getAllNoticeToMe() {
      let param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getAllNoticeToMe(param)
      .then(res => {
        if (res.code === 200) {
          this.noticeList = res.data.list;
          this.total = res.data.total;
        }
      })
      .catch(err => {
        this.$message.error(err.msg)
      })
    },
    handleCurrentChange(val) {
      console.log('current', current)
    }
  }
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
  padding-top: 15px;
  h4 {
    font-size: 20px;
    color: #4a535c;
    padding: 15px 0;
    border-bottom: 1px solid #eaeef1;
  }
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
        background-color: #3CAFFF;
        margin-right: 16px;
      }
      .notice-info {
        div {
          font-size: 12px;
          color: #89939c;
        }
        p {
          margin-top: 10px;
          font-size: 16px;
          color: #4a535c;
          &:hover {
          color: #3CAFFF;
        }
        }
      }
    }
  }
  .notice-pagination {
    margin-top: 24px;
    text-align: center;
  }
  .no-content {
    color: #8d9194;
    margin-top: 40px;
    text-align: center;
  }
}
</style>
