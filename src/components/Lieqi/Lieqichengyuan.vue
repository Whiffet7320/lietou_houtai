<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">猎企成员</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <div class="myForm">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="猎企：">
              <el-select @change="changeSS" size="small" filterable v-model="searchForm.challenges_id"
                placeholder="请选择">
                <el-option v-for="item in lieqiList" :key="item.id" :label="item.title" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间：">
              <el-select @change="changeSS" size="small" filterable v-model="searchForm.challenges_id"
                placeholder="请选择">
                <el-option v-for="item in SSlist" :key="item.id" :label="item.title" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- <div class="tit1">
        <el-button @click="AddSaishi" size="small" type="primary" icon="el-icon-plus">添加广告</el-button>
      </div> -->
      <div class="myTable">
        <vxe-table :loading="loading" align="center" :data="tableData">
          <vxe-table-column v-if="false" type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="item">申请店铺名称：{{ row.apply_list.store_name }}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">申请人姓名：{{ row.apply_list.user_realname }}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">申请人电话：{{ row.apply_list.user_tel }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="item">申请用户名：{{ row.apply_list.recommend_usernickname }}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">
                        申请人头像：
                        <el-image :src="row.apply_list.recommend_userfacepic"
                          :preview-src-list="[row.apply_list.recommend_userfacepic]" fit="fill"
                          style="width: 40px; height: 40px;margin:0 4px">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">申请人ID：{{ row.apply_list.recommend_usercode }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="16">
                      <div class="item">申请地址：{{ row.apply_list.store_provincename }} {{ row.apply_list.store_cityname }}
                        {{ row.apply_list.store_areaname }} {{ row.apply_list.store_address }}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">申请店铺图片：
                        <el-image :src="row.apply_list.store_pics" :preview-src-list="[row.apply_list.store_pics]"
                          fit="fill" style="width: 80px; height: 80px;margin:0 4px">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="begin_day" width="150" title="开始日期"></vxe-table-column>
          <vxe-table-column field="myis_status" title="状态"></vxe-table-column>
          <vxe-table-column field="pic" title="图片">
            <template slot-scope="scope">
              <el-image :src="scope.row.pic" :preview-src-list="[scope.row.pic]" fit="fill"
                style="width: 40px; height: 40px;margin:0 4px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="myurl_types" title="跳转类型"></vxe-table-column>
          <vxe-table-column field="mycategory_id" title="广告分类"></vxe-table-column>
          <vxe-table-column field="url_address" title="链接地址"></vxe-table-column>
          <vxe-table-column field="createtime" title="时间"></vxe-table-column>
          <vxe-table-column title="操作" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="toEdit(scope.row)">修改</el-button>
                <el-button size="small" type="text" @click="toDel(scope.row)">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination class="fenye" @size-change="this.handleSizeChange" @current-change="this.handleCurrentChange"
          :current-page="this.biaobaiqiangPage" :page-size="10" :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper" :total="this.total"></el-pagination>
      </div>
    </div>
    <!-- 添加/修改广告 -->
    <el-dialog title="添加/修改广告" :visible.sync="addDialogVisible" width="700px" :before-close="addHandleClose">
      <div class="myAddForm">
        <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-addForm">
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="赛事">
                <el-select @change="changeSF" size="small" filterable v-model="addForm.challenges_id"
                  placeholder="请输入发起人用户">
                  <el-option v-for="item in SSlist" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="获奖者用户">
                <el-select @change="changeSF" size="small" filterable v-model="addForm.user_id" placeholder="请输入发起人用户">
                  <el-option v-for="item in Userlist" :key="item.id" :label="item.nickname" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="20">
              <el-form-item label="名称">
                <el-input size="small" placeholder="请输入名称" v-model="addForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="链接地址">
                <el-input size="small" placeholder="请输入链接地址" v-model="addForm.url"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="图片">
                <div @click="companyList('tb')" class="myImg">
                  <el-image :src="addForm.pic" fit="fill" style="width: 60px; height: 60px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div @click.stop="delImg('tb')" class="closeBtn">
                    <el-button circle>×</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="广告分类">
                <el-radio-group v-model="addForm.category">
                  <el-radio :label="1">猎头端首页</el-radio>
                  <el-radio :label="2">求职端首页</el-radio>
                  <el-radio :label="3">求职端岗位详情页</el-radio>
                  <el-radio :label="4">猎头端导航页</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="跳转类型">
                <el-radio-group v-model="addForm.url_type">
                  <el-radio :label="2">外部链接</el-radio>
                  <el-radio :label="1">内部链接</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="状态">
                <el-radio-group v-model="addForm.is_status">
                  <el-radio :label="0">关闭</el-radio>
                  <el-radio :label="1">开启</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit('addForm')">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <input type="file" name="companyLogo" id="file0" class="displayN" multiple="multiple" @change="companyLogo($event)"
      ref="fileInputList" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "tabShopIndex",
      "biaobaiqiangPage",
      "biaobaiqiangPageSize",
      "xiaoshoubiaoPage",
      "xiaoshoubiaoPageSize"
    ])
  },
  watch: {
    tabShopIndex: function () {
      this.activeName = this.tabShopIndex;
      console.log(this.activeName);
      this.getData();
    },
    biaobaiqiangPage: function (page) {
      this.$store.commit("biaobaiqiangPage", page);
      this.getData();
    },
    biaobaiqiangPageSize: function (pageSize) {
      this.$store.commit("biaobaiqiangPageSize", pageSize);
      this.getData();
    },
    xiaoshoubiaoPage: function (page) {
      this.$store.commit("xiaoshoubiaoPage", page);
      this.getxsData();
    },
    xiaoshoubiaoPageSize: function (pageSize) {
      this.$store.commit("xiaoshoubiaoPageSize", pageSize);
      this.getxsData();
    }
  },
  data() {
    return {
      is_status: -1,
      loading: false,
      activeName: "1",
      searchForm: {
        challenges_id: "",
      },
      tableData: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        is_status: '',
        category: '',
        name:"",
        url_type:"",
        url:"",
        pic:"",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      imgStatus: "",
      imgFile: "",
      id: "",
      xsaddDialogVisible: false,
      xstableData: [],
      xssearchForm: {
        time: ""
      },
      xstotal: 0,
      SFlist: [],
      CSlist: [],
      imgIndex: 0,
      Userlist: [],
      isAdd: false,
      SSlist: [],
      lieqiList:[],
    };
  },
  created() {
    this.$store.commit("biaobaiqiangPage", 1);
    this.$store.commit("biaobaiqiangPageSize", 10);
    this.getLieqiData()
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const res = await this.$api.com_team({
        page: this.biaobaiqiangPage,
        pagesize: this.biaobaiqiangPageSize,
      });
      console.log(res);
      this.tableData = res.list ? res.list : [];
      this.total = res.total
      this.tableData.forEach(ele => {
        ele.myis_status = ele.is_status == 1 ? '开启' : '关闭';
        ele.mycategory_id = ele.category_id == 1 ? '猎头端首页' : ele.category_id == 2 ? '求职端首页' : ele.category_id == 3 ? '求职端岗位详情页' : '猎头端导航页' ;
        ele.myurl_types = ele.url_types == 1 ? '内部链接' : '外部链接';
      })
      this.loading = false;
    },
    async getLieqiData() {
      this.loading = true;
      const res = await this.$api.compaylist({
        page: 1,
        pagesize: 10000,
      });
      console.log(res);
      this.lieqiList = res.list
    },
    changeSS() {
      this.getData()
    },
    changeSF() {
      this.getCSData()
    },
    xssearchOnSubmit() {
      this.getxsData();
    },
    addEditGuanliyuan(row) {
      this.id = row.id;
      this.addForm.user_name = row.store_username;
      this.addForm.status = row.store_userstatus.toString();
      this.addDialogVisible = true;
    },
    seeXiaoshou(row) {
      this.id = row.id;
      this.xsaddDialogVisible = true;
    },
    xsaddHandleClose() {
      this.xsaddDialogVisible = false;
    },
    // 开关（显示/隐藏）
    async changeKG2(row) {
      console.log(row);
      const res = await this.$api.store_setflag({
        id: row.id,
        flag: row.myFlagship == true ? "1" : "0"
      });
      console.log(res);
      if (res.data.result == 1) {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.getData();
      }
    },
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.store_setstatus({
        id: row.id,
        status: row.myIs_status == true ? "1" : "0"
      });
      if (res.data.result == 1) {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.addDialogVisible = false;
        this.getData();
      }
    },
    toEdit(row) {
      console.log(row)
      this.id = row.id
      this.addForm = { ...row }
      this.$set(this.addForm,'url_type',row.url_types)
      this.$set(this.addForm,'category',row.category_id)
      this.$set(this.addForm,'url',row.url_address)
      // this.addForm.url_type = row.url_types;
      // this.addForm.category = row.category_id;
      // this.addForm.url = row.url_address;
      this.isAdd = false;
      // this.addForm.is_status = row.is_status.toString()
      this.addDialogVisible = true
    },
    async toDel(row) {
      const res = await this.$api.del_swiper({
        id: row.id
      })
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    tabsHandleClick(tab) {
      console.log(tab.index);
      this.$store.commit("tabShopIndex", (Number(tab.index) + 1).toString());
    },
    searchOnSubmit() {
      console.log(this.searchForm);
    },
    AddSaishi() {
      this.isAdd = true;
      for (const key in this.addForm) {
        if (key != 'details_pic') {
          this.$set(this.addForm, key, "");
        }
      }
      this.addDialogVisible = true;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    tabEdit(row) {
      console.log(row);
      this.id = row.id;
      row.is_show = row.status == "0" ? "隐藏" : "显示";
      this.addForm = { ...row };
      this.addDialogVisible = true;
    },
    async tabDel(row) {
      console.log(row);
      const res = await this.$api.categoryDel(row.id);
      if (res) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        setTimeout(() => {
          this.getData();
        }, 500);
      } else {
        this.$message.error(res.msg);
      }
    },
    AddOnSubmit(formName) {
      console.log(this.addForm);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.isAdd) {
            // 新增
            const res = await this.$api.add_swiper({
              ...this.addForm,
            });
            if (res.result == 1) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.addDialogVisible = false;
              this.getData();
            } else {
              this.$message({
                message: res.msg,
              });
            }
          } else {
            // 修改
            const res = await this.$api.edit_swiper({
              ...this.addForm,
              id:this.id
            });
            if (res.result == 1) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.addDialogVisible = false;
              this.getData();
            }
          }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除图片
    delImg(val, i = 0) {
      if (val == "details_pic") {
        if (this.addForm.details_pic[i].name != '') {
          this.addForm.details_pic.splice(i, 1)
        }
      } else if (this.imgStatus == "pic") {
        this.$set(this.addForm, "pic", "");
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("biaobaiqiangPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("biaobaiqiangPage", val);
    },
    xshandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("xiaoshoubiaoPageSize", val);
    },
    xshandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("xiaoshoubiaoPage", val);
    },
    // 上传图片
    companyList(val, i = 0) {
      this.imgIndex = i;
      this.imgStatus = val;
      this.$refs.fileInputList.click();
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onload = function () {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
    async companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      // console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          var file_re = await this.readFileAsBuffer(file);
          // console.log(this.imgFile);
          const res = await this.$api.aliyun_osssts()
          let client = new window.OSS.Wrapper({
            region:res.region, //oss地址
            accessKeyId: res.accessKeyId, //ak
            accessKeySecret: res.accessKeySecret, //secret
            stsToken: res.stsToken,
            bucket:res.bucket, //oss名字
          });
          var imgtype = file.type.substr(6, 4);
          var store = `${new Date().getTime()}.${imgtype}`;
          console.log(store);
          client.put(store, file_re).then(() => {
            //这个结果就是url
            var a = client.signatureUrl(store);
            this.oss_imgurl = a;
            console.log(a);
            if(this.imgStatus == 'tb'){
              this.$set(this.addForm,'pic',a)
            }
          });
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.index {}

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

.tit1 {
  margin-top: 10px;
}

.myTable {
  .xiala {
    padding: 10px 20px;

    .item {
      font-size: 12px;
      display: flex;
    }
  }

  margin-top: 10px;

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

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
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
      vertical-align: middle;
    }
  }

  .tit1 {
    margin-top: 10px;
  }

  .myTable {
    margin-top: 10px;

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

    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }

  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
  }

  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }

  /deep/ .el-radio__label {
    font-size: 12px;
  }

  /deep/ .el-button {
    width: 100%;
  }

}

.fenye {
  margin-top: 16px;
}

.displayN {
  display: none;
}

.myImg {
  position: relative;
  width: 60px;
  height: 60px;
  display: inline-block;
  margin-right: 12px;

  .closeBtn {
    position: absolute;
    top: -6px;
    right: -4px;
    width: 20px;
    height: 20px;

    .el-button {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  /deep/ .image-slot {
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fafafa;
    width: 58px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .el-icon-picture-outline {
      font-size: 20px;
    }
  }

  .myImg {
    position: relative;
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-right: 12px;

    .closeBtn {
      position: absolute;
      top: -6px;
      right: -4px;
      width: 20px;
      height: 20px;

      .el-button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    /deep/ .image-slot {
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fafafa;
      width: 58px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .el-icon-picture-outline {
        font-size: 20px;
      }
    }
  }
}
</style>