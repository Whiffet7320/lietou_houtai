<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">提现列表</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关键词搜索：">
            <el-input size="small" v-model="formInline.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>-->
      <!-- <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加商品</el-button>
      </div>-->
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <!-- <vxe-table-column field="myNickname" title="昵称"></vxe-table-column>
          <vxe-table-column field="avatar" title="发布者头像">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.avatar"
                :preview-src-list="[scope.row.avatar]"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>-->
          <vxe-table-column field="withdraw_price" title="提现金额"></vxe-table-column>
          <vxe-table-column field="myTime" title="申请时间"></vxe-table-column>
          <vxe-table-column field="myStatus" title="状态"></vxe-table-column>
          <vxe-table-column field="bankinfo.username" title="用户姓名"></vxe-table-column>
          <vxe-table-column field="bankinfo.bank_name" title="银行卡开户行"></vxe-table-column>
          <vxe-table-column field="bankinfo.bank_number" title="银行卡卡号"></vxe-table-column>
          <vxe-table-column title="操作状态" width="140">
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  size="small"
                  :disabled="scope.row.paid != 0"
                  @click="tongguo(scope.row)"
                  type="text"
                >通过</el-button>
                <el-button :disabled="scope.row.paid != 0" size="small" @click="jujue(scope.row)" type="text">拒绝</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.jishiShougouPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 发货 -->
    <el-dialog
      title="发货"
      :visible.sync="fahuoDialogVisible"
      width="30%"
      :before-close="fahuoHandleClose"
    >
      <div class="fahuomyForm">
        <el-form :model="fahuoForm" ref="fahuoForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="快递单号">
            <el-input size="small" v-model="fahuoForm.express_code"></el-input>
          </el-form-item>
          <el-form-item label="快递名称">
            <el-input size="small" v-model="fahuoForm.express_name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm">发货</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 查看评论 -->
    <el-dialog
      title="查看评论"
      :visible.sync="seePinlunDialogVisible"
      width="1000px"
      :before-close="seePinlunHandleClose"
    >
      <!-- <div class="myForm">
        <el-form :inline="true" :model="searchPinlunForm" class="demo-form-inline">
          <el-form-item show-overflow="title" size="small" label="关键词搜索：">
            <el-input v-model="searchPinlunForm.keyword" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="searchPinlunOnSubmit">查询</el-button>
            <el-button size="small" @click="searchPinlunOnResult">重置</el-button>
          </el-form-item>
        </el-form>
      </div>-->
      <div class="myTable">
        <vxe-table
          :tree-config="{
            children: 'comment_reply_list',
          }"
          :data="pinlunList"
        >
          <vxe-table-column field="id" width="80" title="ID"></vxe-table-column>
          <vxe-table-column tree-node field="myNickname" title="评论者"></vxe-table-column>
          <vxe-table-column field="avatar_url" idth="100" title="头像">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.avatar_url]"
                :src="scope.row.avatar_url"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="content" min-width="200" title="评论内容"></vxe-table-column>
          <vxe-table-column field="zan_count" width="80" title="获赞"></vxe-table-column>
          <vxe-table-column field="add_time" title="评论时间"></vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @current-change="this.handleCurrentChange1"
          :current-page="this.biaobaiqiangPinglunPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="this.pinlunCount"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "jishiShougouPage",
      "jishiShougouPageSize",
      "biaobaiqiangPinglunPage",
      "biaobaiqiangPinglunPageSize"
    ])
  },
  watch: {
    jishiShougouPage: function(page) {
      this.$store.commit("jishiShougouPage", page);
      this.getData();
    },
    jishiShougouPageSize: function(pageSize) {
      this.$store.commit("jishiShougouPageSize", pageSize);
      this.getData();
    },
    biaobaiqiangPinglunPage: function(page) {
      this.$store.commit("biaobaiqiangPinglunPage", page);
      this.getPinlunData();
    },
    biaobaiqiangPinglunPageSize: function(pageSize) {
      this.$store.commit("biaobaiqiangPinglunPageSize", pageSize);
      this.getPinlunData();
    }
  },
  data() {
    return {
      fahuoId: "",
      fahuoDialogVisible: false,
      fahuoForm: {
        express_code: "",
        express_name: ""
      },
      searchPinlunForm: {
        keyword: ""
      },
      seePinlunDialogVisible: false,
      pinlunCount: 0,
      pinlunId: "",
      pinlunList: [],
      //
      activeName: "1",
      formInline: {
        category_id: "",
        name: ""
      },
      options: [],
      tableData: [],
      total: 0
    };
  },
  created() {
    this.$store.commit("biaobaiqiangPinglunPage", 1);
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.withdraw_list({
        limit: this.jishiShougouPageSize,
        page: this.jishiShougouPage
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        ele.myTime = this.formatDateTime(ele.add_time)
        ele.myStatus =
          ele.paid == 0 ? "待审核" : ele.paid == 1 ? "通过" : "拒绝";
        if (ele.img_paths) {
          ele.myImg_paths = ele.img_paths.split(",");
          ele.myImg_paths.forEach((img, i) => {
            this.$set(ele.myImg_paths, i, `${this.$url}/${img}`);
          });
        }
      });
    },
    async jujue(row){
      const res = await this.$api.withdraw_check({
        paid:2,
        id:row.id
      })
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
      }
    },
    async tongguo(row){
      const res = await this.$api.withdraw_check({
        paid:1,
        id:row.id
      })
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
      }
    },
    async submitForm() {
      const res = await this.$api.order_send({
        id: this.fahuoId,
        express_name: this.fahuoForm.express_name,
        express_code: this.fahuoForm.express_code
      });
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
        this.fahuoDialogVisible = false;
      }
    },
    formatDateTime(inputTime) {
      var date = new Date(inputTime * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    fahuo(row) {
      this.fahuoForm.express_code = "";
      this.fahuoForm.express_name = "";
      this.fahuoId = row.id;
      this.fahuoDialogVisible = true;
    },
    fahuoHandleClose() {
      this.fahuoDialogVisible = false;
    },
    // async getPinlunData() {
    //   const res = await this.$api.comment_list({
    //     type: "jishi",
    //     id: this.pinlunId,
    //     page: this.biaobaiqiangPinglunPage,
    //     limit: this.biaobaiqiangPinglunPageSize
    //   });
    //   this.pinlunCount = res.data.total;
    //   this.pinlunList = res.data.data;
    //   this.pinlunList.forEach(ele => {
    //     ele.myNickname =
    //       ele.nickname == "" || !ele.nickname ? "匿名用户" : ele.nickname;
    //     if (ele.comment_reply_list) {
    //       ele.comment_reply_list.forEach(item => {
    //         item.myNickname =
    //           item.nickname == "" || !item.nickname
    //             ? "匿名用户"
    //             : item.nickname;
    //       });
    //     }
    //   });
    // },
    // toSeeXiangqin(row) {
    //   this.$store.commit("biaobaiqiangPinglunPage", 1);
    //   this.pinlunId = row.id;
    //   this.getPinlunData();
    //   this.seePinlunDialogVisible = true;
    // },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("biaobaiqiangPinglunPage", val);
      console.log(this.biaobaiqiangPinglunPage)
    },
    searchPinlunOnSubmit() {},
    searchPinlunOnResult() {
      this.searchPinlunForm.keyword = "";
      this.getPinlunData();
    },
    seePinlunHandleClose() {
      this.seePinlunDialogVisible = false;
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.update_status({
        status: row.myStatus == true ? "0" : "1",
        id: row.id,
        type: "jishi"
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    toEditShop(row) {
      console.log(row);
      this.$store.commit("shopObj", row);
      this.$router.push({ name: "Tianjiashangping" });
    },
    async toDelShop(row) {
      console.log(row);
      const res = await this.$api.deleteItems(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    tabsHandleClick(tab) {
      console.log(tab.index);
      this.$store.commit("tabIndex", (Number(tab.index) + 1).toString());
      this.formInline.category_id = "";
      this.formInline.name = "";
    },
    onSubmit() {
      console.log("submit!");
      this.getData();
    },
    toAddShop() {
      this.$store.commit("shopObj", null);
      this.$router.push({ name: "Tianjiashangping" });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("jishiShougouPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jishiShougouPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.fahuomyForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .search {
    margin-top: 3px;
    /deep/ .el-select {
      width: 100px;
    }
  }
}
.shopxx {
  display: flex;
  align-items: center;
  margin: 4px 0;
  .shopImg {
    width: 40px;
    height: 40px;
    margin-right: 6px;
  }
  .txt {
    font-size: 12px;
    line-height: 16px;
  }
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    .xiala {
      padding: 10px 20px;
      .item {
        font-size: 12px;
      }
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .fenye {
      margin-top: 10px;
    }
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 14px;
      vertical-align: middle;
    }
    /deep/ .vxe-cell--label {
      font-size: 12px;
    }
    /deep/ .vxe-cell--title {
      font-size: 12px;
    }
    /deep/ .image-slot {
      width: 38px;
      height: 38px;
      border: 1px solid #ddd;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
    }
  }
}
.myTable {
  margin-top: 10px;
  .xiala {
    padding: 10px 20px;
    .item {
      font-size: 12px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .fenye {
    margin-top: 10px;
  }
  /deep/ .vxe-table--render-default .vxe-body--column {
    line-height: 14px;
    vertical-align: middle;
  }
  /deep/ .vxe-cell--label {
    font-size: 12px;
  }
  /deep/ .vxe-cell--title {
    font-size: 12px;
  }
  /deep/ .image-slot {
    width: 38px;
    height: 38px;
    border: 1px solid #ddd;
    line-height: 38px;
    text-align: center;
    border-radius: 4px;
  }
}
.myForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
    vertical-align: middle;
  }
}
</style>