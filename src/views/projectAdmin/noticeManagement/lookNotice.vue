<!--查看通知-->
<template>
  <div class="look-notice">
    <div class="header">
      <h4>{{noticeContent}}</h4>
      <div>
        <span style="padding-right: 50px;">发布时间：{{noticeDate}}</span>
        <span>有效日期：{{validDate}}</span>
      </div>
    </div>
    <div class="content">
      <div class="text">{{noticeIntroduce}}</div>
      <div class="btn"><el-button type="primary" round @click="goBack">返回</el-button></div>
    </div>
  </div>
</template>

<script>
import { getNoticeById } from '@/api/admin'

export default {
  name: "lookNotice",
  data() {
    return {
      noticeId: Number,
      noticeContent: '', //标题
      noticeIntroduce: '', //正文
      noticeDate: '', // 发布日期
      validDate: '',
    }
  },
  mounted() {
    this.noticeId = this.$route.query.noticeId;
    this.getNoticeById();
  },
  methods: {
    getNoticeById() {
      getNoticeById(this.noticeId)
      .then(res => {
        if (res.code === 200) {
          let time = new Date();
          this.noticeContent = res.notice.noticeContent;
          this.noticeIntroduce = res.notice.noticeIntroduce;
          this.noticeDate = res.notice.noticeDate
          if (res.notice.validDate === null ) {
            this.validDate = '永久有效'
          } else if (time > new Date(res.notice.validDate)) {
            this.validDate = res.notice.validDate+'(已过期)';
          } else {
            this.validDate = res.notice.validDate
          }
        }
      })
      .catch(err => {

      }
      )
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.look-notice {
  padding: 15px 30px 30px 30px;
  .header {
    text-align: center;
    border-bottom: 1px solid #eaeef1;
    margin-bottom: 30px;
    h4 {
      font-size: 20px;
      color: #4a535c;
      margin-bottom: 15px;
    }
    div {
      margin-bottom: 30px;
      span {
        font-size: 12px;
        color: #4a535c;
      } 
    }
  }
  .content {
    .text {
      text-indent: 2em;
      padding-bottom: 30px;
      border-bottom: 1px solid #eaeef1;
    }
    .btn {
      margin-top: 30px;
      text-align: center;
      .el-button {
        width: 120px;
      }
    }
  }
}
</style>