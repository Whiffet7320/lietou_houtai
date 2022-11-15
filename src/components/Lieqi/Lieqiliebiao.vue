<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">猎企列表</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
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
      </div> -->
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
          <vxe-table-column field="com_name" width="150" title="公司名称"></vxe-table-column>
          <vxe-table-column field="realname" title="姓名"></vxe-table-column>
          <vxe-table-column field="jobs" title="职位"></vxe-table-column>
          <vxe-table-column field="pic" title="头像">
            <template slot-scope="scope">
              <el-image :src="scope.row.userface" :preview-src-list="[scope.row.userface]" fit="fill"
                style="width: 40px; height: 40px;margin:0 4px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="pic" title="营业执照">
            <template slot-scope="scope">
              <el-image v-for="(item, i) in scope.row.mylicense_pics" :key="i" :src="item" :preview-src-list="[item]"
                fit="fill" style="width: 40px; height: 40px;margin:0 4px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="pic" title="人力资源许可证">
            <template slot-scope="scope">
              <el-image v-for="(item, i) in scope.row.myservicelicense_pics" :key="i" :src="item"
                :preview-src-list="[item]" fit="fill" style="width: 40px; height: 40px;margin:0 4px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="createtime" title="时间"></vxe-table-column>
          <vxe-table-column title="操作" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="xiangqin(scope.row)">详情</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination class="fenye" @size-change="this.handleSizeChange" @current-change="this.handleCurrentChange"
          :current-page="this.biaobaiqiangPage" :page-size="10" :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper" :total="this.total"></el-pagination>
      </div>
    </div>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="addDialogVisible" width="1200px" :before-close="addHandleClose">
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
          <!-- <el-row>
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
          </el-row> -->
          <!-- <el-row>
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
          </el-row> -->
          <el-row>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-radio-group @change="changeTimeStatus" v-model="timeStatus">
                  <el-radio label="2">在招</el-radio>
                  <el-radio label="1">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="时间">
                <el-radio-group @change="changeTimeRadio" v-model="timeRadio">
                  <el-radio label="1">累计</el-radio>
                  <el-radio label="2">今天</el-radio>
                  <el-radio label="3">本周</el-radio>
                  <el-radio label="4">上周</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="猎企名称">
                <el-input size="small" disabled placeholder="请输入猎企名称" v-model="xqObj.com_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="成员人数">
                <el-input size="small" disabled placeholder="请输入成员人数" v-model="xqObj.com_joinnum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="在招岗位">
                <el-input size="small" disabled placeholder="请输入在招岗位" v-model="xqObj.job_callingnum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="关闭岗位">
                <el-input size="small" disabled placeholder="请输入关闭岗位" v-model="xqObj.job_closenum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-radio-group @change="changeRadio3" style="margin-left:80px" v-model="radio3" size="small">
              <el-radio-button label="1">岗位</el-radio-button>
              <el-radio-button label="2">成员</el-radio-button>
            </el-radio-group>
          </el-row>

          <div v-show="radio3 == 1" class="myTable">
            <vxe-table :loading="loading" align="center" :data="gwList">
              <vxe-table-column field="com_name" width="150" title="公司名称"></vxe-table-column>
              <vxe-table-column field="internal_name" width="150" title="内部名称"></vxe-table-column>
              <vxe-table-column field="jobs" title="职位"></vxe-table-column>
              <vxe-table-column field="myStatus" title="状态"></vxe-table-column>
              <vxe-table-column field="myjobs_status" title="状态"></vxe-table-column>
              <vxe-table-column field="jobs_num" title="投入人数"></vxe-table-column>
              <vxe-table-column field="pending_num" title="待定"></vxe-table-column>
              <vxe-table-column field="chattable_num" title="可聊"></vxe-table-column>
              <vxe-table-column field="createtime" title="时间"></vxe-table-column>
              <vxe-table-column title="操作" width="100">
                <template slot-scope="scope">
                  <div class="flex">
                    <el-button size="small" type="text" @click="xiajia(scope.row)">上/下架</el-button>
                  </div>
                </template>
              </vxe-table-column>
              <vxe-table-column title="应聘" width="80">
                <template slot-scope="scope">
                  <div class="flex">
                    <el-button size="small" type="text" @click="chakan(scope.row)">查看</el-button>
                  </div>
                </template>
              </vxe-table-column>
              <vxe-table-column title="导航" width="80">
                <template slot-scope="scope">
                  <div class="flex">
                    <el-button size="small" type="text" @click="chakanDH(scope.row)">查看</el-button>
                  </div>
                </template>
              </vxe-table-column>
            </vxe-table>
            <el-pagination class="fenye" @size-change="this.gwhandleSizeChange"
              @current-change="this.gwhandleCurrentChange" :current-page="this.gwPage" :page-size="10"
              :page-sizes="[10, 15, 20, 30]" layout="total,sizes, prev, pager, next, jumper" :total="this.gwTotal">
            </el-pagination>
          </div>
          <div v-show="radio3 == 2" class="myTable">
            <vxe-table :loading="loading" align="center" :data="cyList">
              <vxe-table-column field="realname" title="姓名"></vxe-table-column>
              <vxe-table-column field="pic" title="头像">
                <template slot-scope="scope">
                  <el-image :src="scope.row.userface" :preview-src-list="[scope.row.userface]" fit="fill"
                    style="width: 40px; height: 40px;margin:0 4px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </template>
              </vxe-table-column>
              <vxe-table-column field="jobs" title="职位"></vxe-table-column>
              <vxe-table-column field="myis_manage" title="是/否管理员"></vxe-table-column>
              <vxe-table-column field="chattable_num" title="可聊"></vxe-table-column>
              <vxe-table-column field="degree_num" title="待定"></vxe-table-column>
            </vxe-table>
            <el-pagination class="fenye" @size-change="this.gwhandleSizeChange"
              @current-change="this.gwhandleCurrentChange" :current-page="this.gwPage" :page-size="10"
              :page-sizes="[10, 15, 20, 30]" layout="total,sizes, prev, pager, next, jumper" :total="this.gwTotal">
            </el-pagination>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 上/下架 -->
    <el-dialog title="上/下架" :visible.sync="sxjaddDialogVisible" width="700px" :before-close="sxjaddHandleClose">
      <div class="myAddForm">
        <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="状态">
                <el-radio-group v-model="sxjObj.status">
                  <el-radio label="1">下架</el-radio>
                  <el-radio label="2">上架</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="sxjObj.status == 1">
            <el-col :span="20">
              <el-form-item label="理由">
                <el-input size="small" placeholder="请输入理由" v-model="sxjObj.reason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="sxjOnSubmit">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 应聘 -->
    <el-dialog title="应聘" :visible.sync="ypaddDialogVisible" width="950px" :before-close="ypaddHandleClose">
      <div class="myTable">
        <vxe-table border :loading="loading" align="center" :data="ypList">
          <vxe-table-column field="realname" title="称呼"></vxe-table-column>
          <vxe-table-column field="mobile" title="手机"></vxe-table-column>
          <vxe-table-column field="ages" title="年龄"></vxe-table-column>
          <vxe-table-column field="first_education" title="第一学历"></vxe-table-column>
          <vxe-table-column field="highest_education" title="最高学历"></vxe-table-column>
          <vxe-colgroup title="最近一段">
            <vxe-column field="candidate[0].com_name" title="公司名称"></vxe-column>
            <vxe-column field="candidate[0].com_size" title="公司规模"></vxe-column>
            <vxe-column field="candidate[0].job_name" title="岗位名称"></vxe-column>
            <vxe-column field="candidate[0].mywork_time" title="工作时长"></vxe-column>
          </vxe-colgroup>
          <vxe-colgroup title="第二段">
            <vxe-column field="candidate[1].com_name" title="公司名称"></vxe-column>
            <vxe-column field="candidate[1].com_size" title="公司规模"></vxe-column>
            <vxe-column field="candidate[1].job_name" title="岗位名称"></vxe-column>
            <vxe-column field="candidate[1].mywork_time" title="工作时长"></vxe-column>
          </vxe-colgroup>
          <vxe-colgroup title="第三段">
            <vxe-column field="candidate[2].com_name" title="公司名称"></vxe-column>
            <vxe-column field="candidate[2].com_size" title="公司规模"></vxe-column>
            <vxe-column field="candidate[2].job_name" title="岗位名称"></vxe-column>
            <vxe-column field="candidate[2].mywork_time" title="工作时长"></vxe-column>
          </vxe-colgroup>
          <vxe-colgroup title="第四段">
            <vxe-column field="candidate[3].com_name" title="公司名称"></vxe-column>
            <vxe-column field="candidate[3].com_size" title="公司规模"></vxe-column>
            <vxe-column field="candidate[3].job_name" title="岗位名称"></vxe-column>
            <vxe-column field="candidate[3].mywork_time" title="工作时长"></vxe-column>
          </vxe-colgroup>
          <vxe-table-column field="createtime" title="应聘时间"></vxe-table-column>
        </vxe-table>
        <el-pagination class="fenye" @size-change="this.yphandleSizeChange" @current-change="this.yphandleCurrentChange"
          :current-page="this.ypPage" :page-size="10" :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper" :total="this.ypTotal">
        </el-pagination>
      </div>
    </el-dialog>
    <!-- 导航 -->
    <el-dialog title="导航" :visible.sync="dhaddDialogVisible" width="950px" :before-close="dhaddHandleClose">
      <div class="myAddForm">
        <el-descriptions size="small" border>
          <el-descriptions-item label="行业分类">{{dhObj.industry_name}}</el-descriptions-item>
          <el-descriptions-item label="是否限定明细行业">{{dhObj.is_industrysegmentation == 1 ? '是' : '否'}}</el-descriptions-item>
          <el-descriptions-item label="细分目标行业">{{dhObj.industrysegmentation_name}}</el-descriptions-item>
          <el-descriptions-item label="行业关键词">{{dhObj.industry_keywords}}</el-descriptions-item>
          <el-descriptions-item label="公司规模">{{dhObj.company_size}}</el-descriptions-item>
          <el-descriptions-item label="目标公司(简称)">{{dhObj.target_company}}</el-descriptions-item>
          <el-descriptions-item label="岗位名称中专业方向关键词">{{dhObj.postname_keywords}}</el-descriptions-item>
          <el-descriptions-item label="岗位职级">{{dhObj.jobtitle_keywords}}</el-descriptions-item>
          <el-descriptions-item label="职责范围关键词1">{{dhObj.scope1_keywords}}</el-descriptions-item>
          <el-descriptions-item label="职责范围关键词2">{{dhObj.scope2_keywords}}</el-descriptions-item>
          <el-descriptions-item label="职责范围关键词3">{{dhObj.scope3_keywords}}</el-descriptions-item>
          <el-descriptions-item label="岗位分类">{{dhObj.position_classification}}</el-descriptions-item>
          <el-descriptions-item label="第一学历">{{dhObj.first_degree}}</el-descriptions-item>
          <el-descriptions-item label="硕博要求">{{dhObj.shuobo_requirements}}</el-descriptions-item>
          <el-descriptions-item label="学科专业">{{dhObj.discipline}}</el-descriptions-item>
          <el-descriptions-item label="外语">{{dhObj.foreignlanguage_name}}</el-descriptions-item>
          <el-descriptions-item label="熟练程度">{{dhObj.proficiency}}</el-descriptions-item>
          <el-descriptions-item label="必备技能关键词">{{dhObj.essentialskills_keywords}}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{dhObj.min_age}}-{{dhObj.max_age}}</el-descriptions-item>
          <el-descriptions-item label="薪酬">{{dhObj.salary_range}}</el-descriptions-item>
          <el-descriptions-item label="年薪">{{dhObj.years_salaries}}</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
    <input type="file" name="companyLogo" id="file0" class="displayN" multiple="multiple" @change="companyLogo($event)"
      ref="fileInputList" />
  </div>
</template>

<script>
import { mapState } from "vuex";
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(),    //day
    "h+": this.getHours(),   //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S": this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}
export default {
  computed: {
    ...mapState([
      "tabShopIndex",
      "biaobaiqiangPage",
      "biaobaiqiangPageSize",
      "gwPage",
      "gwPageSize",
      "cyPage",
      "cyPageSize",
      "ypPage",
      "ypPageSize",
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
    gwPage: function (page) {
      this.$store.commit("gwPage", page);
      this.getGwData();
    },
    gwPageSize: function (pageSize) {
      this.$store.commit("gwPageSize", pageSize);
      this.getGwData();
    },
    cyPage: function (page) {
      this.$store.commit("cyPage", page);
      this.getCyData();
    },
    cyPageSize: function (pageSize) {
      this.$store.commit("cyPageSize", pageSize);
      this.getCyData();
    },
    ypPage: function (page) {
      this.$store.commit("ypPage", page);
      this.getYPData();
    },
    ypPageSize: function (pageSize) {
      this.$store.commit("ypPageSize", pageSize);
      this.getYPData();
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
      timeRadio: '1',
      timeStatus: '2',
      xqObj: {
        com_joinnum: "",
        com_name: "",
        job_callingnum: "",
        job_closenum: "",
      },
      radio3: '1',
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
        status: '',
        reason: "",
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
      lieqiList: [],
      gwList: [],
      cyList: [],
      gwTotal: 0,
      cyTotal: 0,
      sxjaddDialogVisible: false,
      sxjObj: {
        status: '',
        reason: '',
      },
      sxjId: "",
      ypaddDialogVisible: false,
      dhaddDialogVisible: false,
      ypid: "",
      ypList: [],
      ypTotal: 0,
      dhaddForm: {},
      dhObj:{},
    };
  },
  created() {
    this.$store.commit("biaobaiqiangPage", 1);
    this.$store.commit("biaobaiqiangPageSize", 10);
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const res = await this.$api.compaylist({
        page: this.biaobaiqiangPage,
        pagesize: this.biaobaiqiangPageSize,
      });
      console.log(res);
      this.tableData = res.list ? res.list : [];
      this.total = res.total
      this.tableData.forEach(ele => {
        ele.myis_status = ele.is_status == 1 ? '开启' : '关闭';
        ele.mylicense_pics = ele.license_pics.split(',')
        ele.myservicelicense_pics = ele.servicelicense_pics.split(',')
        ele.myurl_types = ele.url_types == 1 ? '内部链接' : '外部链接';
      })
      this.loading = false;
      console.log(this.tableData)
    },
    async getLieqiData() {
      const res = await this.$api.compaylist({
        page: 1,
        pagesize: 10000,
      });
      console.log(res);
      this.lieqiList = res.list
    },
    async getYPData() {
      const res = await this.$api.compostcandidatelist({
        page: this.ypPage,
        pagesize: this.ypPageSize,
        com_id: this.id,
        post_id: this.ypid
      });
      this.ypList = res.list;
      this.ypList.forEach(ele => {
        ele.candidate.forEach(ele2 => {
          ele2.mywork_time = `${ele2.work_time}个月`
        })
      })
      this.ypTotal = res.total
      console.log(res);
    },
    async getDHData() {
      const res = await this.$api.compostnavigation_view({
        com_id: this.id,
        post_id: this.ypid
      });
      console.log(res);
      if(res.result == 1){
        if(res.postnavigation){
          this.dhObj = res.postnavigation
        }else{
          this.dhObj = {}
        }
        
      }
    },
    chakan(row) {
      this.ypid = row.id;
      this.ypaddDialogVisible = true
      this.sxjId = row.id
      this.getYPData()
    },
    chakanDH(row) {
      this.ypid = row.id;
      this.dhaddDialogVisible = true
      this.sxjId = row.id
      this.getDHData()
    },
    xiajia(row) {
      this.sxjaddDialogVisible = true
      this.sxjId = row.id
      // const res = await this.$api.compostoperation({
      //   com_id: this.id,
      //   id: row.id,
      //   status: 1,
      // })
    },
    async sxjOnSubmit() {
      const res = await this.$api.compostoperation({
        com_id: this.id,
        id: this.sxjId,
        status: this.sxjObj.status,
        reason: this.sxjObj.reason
      })
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.sxjaddDialogVisible = false;
        this.getGwData();
      }
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
    sxjaddHandleClose() {
      this.sxjaddDialogVisible = false;
    },
    ypaddHandleClose() {
      this.ypaddDialogVisible = false;
    },
    dhaddHandleClose() {
      this.dhaddDialogVisible = false;
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
    async getXQdata() {
      const res = await this.$api.compayview({
        com_id: this.id,
        begin_day: this.begin_day,
        end_day: this.end_day,
      })
      console.log(res)
      this.xqObj = res
    },
    async getGwData() {
      const res = await this.$api.compostlist({
        com_id: this.id,
        begin_day: this.begin_day,
        end_day: this.end_day,
        is_status: this.timeStatus,
        page: this.gwPage,
        pagesize: this.gwPageSize
      })
      console.log(res)
      this.gwList = res.list
      this.gwList.forEach(ele => {
        ele.myStatus = ele.is_status == 1 ? '上架' : '下架'
        ele.myjobs_status = ele.jobs_status == 1 ? '紧急' : '正常'
      })
      this.gwTotal = res.total
    },
    async getCyData() {
      const res = await this.$api.com_team({
        com_id: this.id,
        begin_day: this.begin_day,
        end_day: this.end_day,
        is_status: this.timeStatus,
        page: this.cyPage,
        pagesize: this.cyPageSize
      })
      console.log(res)
      this.cyList = res.list
      this.cyList.forEach(ele => {
        ele.myis_manage = ele.is_manage == 0 ? '非管理员' : '管理员'
      })
      this.cyTotal = res.total
    },
    changeTimeRadio() {
      var day = new Date();
      var weekday = new Date().getDay() || 7;
      if (this.timeRadio == 1) {
        this.begin_day = ''
        this.end_day = ''
      } else if (this.timeRadio == 2) {
        this.begin_day = day.format('yyyy-MM-dd')
        this.end_day = day.format('yyyy-MM-dd')
      } else if (this.timeRadio == 3) {
        this.begin_day = new Date(new Date().setDate(new Date().getDate() - weekday + 1)).format('yyyy-MM-dd');
        this.end_day = new Date(new Date().setDate(new Date().getDate() - weekday + 7)).format('yyyy-MM-dd')
      } else if (this.timeRadio == 4) {
        this.begin_day = new Date(new Date().setDate(new Date().getDate() - weekday - 6)).format('yyyy-MM-dd');
        this.end_day = new Date(new Date().setDate(new Date().getDate() - weekday)).format('yyyy-MM-dd')
      }
      this.getXQdata()
      if (this.radio3 == 1) {
        this.getGwData()
      } else {
        this.getCyData()
      }
    },
    changeTimeStatus() {
      var day = new Date();
      var weekday = new Date().getDay() || 7;
      if (this.timeRadio == 1) {
        this.begin_day = ''
        this.end_day = ''
      } else if (this.timeRadio == 2) {
        this.begin_day = day.format('yyyy-MM-dd')
        this.end_day = day.format('yyyy-MM-dd')
      } else if (this.timeRadio == 3) {
        this.begin_day = new Date(new Date().setDate(new Date().getDate() - weekday + 1)).format('yyyy-MM-dd');
        this.end_day = new Date(new Date().setDate(new Date().getDate() - weekday + 7)).format('yyyy-MM-dd')
      } else if (this.timeRadio == 4) {
        this.begin_day = new Date(new Date().setDate(new Date().getDate() - weekday - 6)).format('yyyy-MM-dd');
        this.end_day = new Date(new Date().setDate(new Date().getDate() - weekday)).format('yyyy-MM-dd')
      }
      this.getXQdata()
      if (this.radio3 == 1) {
        this.getGwData()
      } else {
        this.getCyData()
      }
    },
    changeRadio3() {
      if (this.radio3 == 1) {
        this.getGwData()
      } else {
        this.getCyData()
      }
    },
    async xiangqin(row) {
      this.id = row.id
      var day = new Date();
      var weekday = new Date().getDay() || 7;
      if (this.timeRadio == 1) {
        this.begin_day = ''
        this.end_day = ''
      } else if (this.timeRadio == 2) {
        this.begin_day = day.format('yyyy-MM-dd')
        this.end_day = day.format('yyyy-MM-dd')
      } else if (this.timeRadio == 3) {
        this.begin_day = new Date(new Date().setDate(new Date().getDate() - weekday + 1)).format('yyyy-MM-dd');
        this.end_day = new Date(new Date().setDate(new Date().getDate() - weekday + 7)).format('yyyy-MM-dd')
      } else if (this.timeRadio == 4) {
        this.begin_day = new Date(new Date().setDate(new Date().getDate() - weekday - 6)).format('yyyy-MM-dd');
        this.end_day = new Date(new Date().setDate(new Date().getDate() - weekday)).format('yyyy-MM-dd')
      }
      this.getXQdata()
      if (this.radio3 == 1) {
        this.getGwData()
      } else {
        this.getCyData()
      }
      this.addDialogVisible = true
    },
    toEdit(row) {
      console.log(row)
      this.id = row.id
      this.addForm = { ...row }
      this.$set(this.addForm, 'url_type', row.url_types)
      this.$set(this.addForm, 'category', row.category_id)
      this.$set(this.addForm, 'url', row.url_address)
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
            const res = await this.$api.compayexamineoperation({
              ...this.addForm,
              id: this.id
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
    gwhandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("gwPageSize", val);
    },
    gwhandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("gwPage", val);
    },
    cyhandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("cyPageSize", val);
    },
    cyhandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("cyPage", val);
    },
    yphandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("ypPageSize", val);
    },
    yphandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("ypPage", val);
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
            region: res.region, //oss地址
            accessKeyId: res.accessKeyId, //ak
            accessKeySecret: res.accessKeySecret, //secret
            stsToken: res.stsToken,
            bucket: res.bucket, //oss名字
          });
          var imgtype = file.type.substr(6, 4);
          var store = `${new Date().getTime()}.${imgtype}`;
          console.log(store);
          client.put(store, file_re).then(() => {
            //这个结果就是url
            var a = client.signatureUrl(store);
            this.oss_imgurl = a;
            console.log(a);
            if (this.imgStatus == 'tb') {
              this.$set(this.addForm, 'pic', a)
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