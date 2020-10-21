<template>
  <div>
    <el-dialog
      title="成绩导出"
      :visible.sync="cloBol"
      v-if="cloBol"
      width="40%"
      center
      :close-on-click-modal="false"
    >
      <div>
        <el-form>
          <el-form-item label="选择项目: " :label-width="formLabelWidth">
            <el-select
              v-model="projectId"
              placeholder="请选择"
              @change="xiaxuan"
            >
              <el-option
                v-for="item in datalist"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-link
          :underline="false"
          :href="url + '/correctShare/exportScore?projectId=' + projectId"
          :disabled="disabled"
        >
          <el-button type="primary" :disabled="disabled">导 出</el-button>
        </el-link>

        <el-button @click="cloBol = false" style="margin-left: 15px;"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllCorrectShareProject } from "@/api/teacher";
import { apiPath } from "@/config/env";
export default {
  computed: {},
  data() {
    return {
      cloBol: false,
      url: apiPath, //地址
      formLabelWidth: "120px",
      datalist: [], //下拉列表
      projectId: "", //下拉值
      message: "", //名称

      tablelist: [], //列表
      disabled: true
    };
  },
  methods: {
    //获取列表
    getAllCorrectShareProject() {
      getAllCorrectShareProject({
        pageNum: "",
        pageSize: "",
        message: ""
      })
        .then(res => {
          console.log(res.data.list);
          this.datalist = res.data.list;
        })
        .catch(err => {});
    },

    //下拉选中值
    xiaxuan(val) {
      // console.log(val);
      this.projectId = val;
      if (!this.projectId == "") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },
  mounted() {
    this.getAllCorrectShareProject();
  }
};
</script>

<style scoped>
.neirong {
  width: 98%;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* overflow-x: auto; */
}
.neirong .clearfix {
  width: 100%;
  overflow: hidden;
  border-bottom: 1px dashed #ccc;
  padding: 0 20px;
}
.clearfix .fixltefe {
  float: left;
  width: 50%;
  display: flex;
}
.clearfix .fixlring {
  width: 50%;
  float: right;
  display: flex;
  justify-content: flex-end;
}
.neibottom {
  width: 100%;
  height: 255px;
  overflow: auto;
  padding: 0 20px;
}

/*滚动条样式*/
/* .neibottom::-webkit-scrollbar {
  width: 4px;
}
.neibottom::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.neibottom::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
} */
</style>
