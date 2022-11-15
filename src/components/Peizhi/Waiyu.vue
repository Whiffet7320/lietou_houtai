<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">外语能力关键词</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="设置关键词：">
                <div @click="companyList" class="myImg">
                  <el-image :src="ruleForm.img" fit="fill" style="width: 200px; height: 200px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div @click.stop="delImg" class="closeBtn">
                    <el-button circle>×</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="设置关键词：">
                <el-input type="textarea" size="small" v-model="ruleForm.other_url"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button style="margin-top:10px" icon="el-icon-s-promotion" size="small" type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <input type="file" name="companyLogo" id="file0" class="displayN" multiple="multiple" @change="companyLogo($event)"
      ref="fileInputList" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgFile: "",
      ruleForm: {
        other_url: "",
      },
      id: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.foreignlang_keyword();
      this.ruleForm.other_url = res.foreignlang_keyword
    },
    // 提交
    async submitForm() {
      const res = await this.$api.editforeignlang_keyword({
        foreignlang_keyword: this.ruleForm.other_url,
      });
      console.log(res);
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData()
      } else {
        this.$message.error(res.msg);
      }
    },
    // 上传图片
    companyList() {
      this.$refs.fileInputList.click();
    },
    // 删除图片
    delImg() {
      this.$set(this.ruleForm, "img", "");
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
            this.$set(this.ruleForm, 'img', a)
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

  .myImg {
    position: relative;
    width: 200px;
    height: 200px;
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
      width: 198px;
      height: 198px;
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

.displayN {
  display: none;
}
</style>