<template>
  <div>
    <el-form class="form-style"
             :model="info"
             label-width="115px">
      <el-button @click="isEdit = !isEdit"
                 v-if="!isEdit"
                 class="edit-form"
                 size="medium"
                 type="primary">编辑</el-button>
      <el-form-item label="医院类型：">
        <span>{{info.hosTypeName}} {{info.hosChildName}}</span>
      </el-form-item>
      <el-form-item label="医院名称：">
        <span>{{info.hosName}}</span>
      </el-form-item>
      <el-form-item label="社会信用代码：">
        <span>{{info.socialCreditCode}}</span>
      </el-form-item>
      <el-form-item label="所属辖区：">
        <span>{{info.hosArea}}</span>
      </el-form-item>
      <el-form-item label="详细地址：">
        <span>{{info.address}}</span>
      </el-form-item>
      <el-form-item label="医院等级：">
        <span>{{info.hosLevelName}}</span>
      </el-form-item>
      <template v-if="!isEdit">
        <el-form-item label="联系电话：">
          <span>{{info.phoneNumber}}</span>
        </el-form-item>
        <el-form-item label="医院描述：">
          <span>{{info.hosDesc}}</span>
        </el-form-item>
        <el-form-item label="使用状态：">
          <el-switch class="v-align"
                     v-model="info.status"
                     disabled
                     :active-value="1"
                     :inactive-value="2"
                     active-color="#3099A6"
                     inactive-color="#CCCCCC"></el-switch>
          <span v-bind:style="{ color: serviceStatusTextColor(info.status) }"
                class="q-ml-md v-align">{{serviceStatusText(info.status)}}</span>
        </el-form-item>
        <el-form-item label="医院封面：">
          <div class="upload-tools">
            <el-image :src="info.hosPhoto"
                      class="hospital-img"
                      :preview-src-list="previewList"
                      v-if="info.hosPhoto" />
          </div>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="联系电话：">
          <el-input placeholder="请输入医院联系电话，该号码会公示给患者"
                    maxlength="25"
                    v-model.trim="info.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="医院描述：">
          <el-input type="textarea"
                    rows="5"
                    v-model.trim="info.hosDesc"></el-input>
        </el-form-item>
        <el-form-item label="使用状态：">
          <el-switch class="v-align"
                     v-model="info.status"
                     :active-value="1"
                     :inactive-value="2"
                     active-color="#3099A6"
                     inactive-color="#CCCCCC"></el-switch>
          <span v-bind:style="{ color: serviceStatusTextColor(info.status) }"
                class="q-ml-md v-align">{{serviceStatusText(info.status)}}</span>
        </el-form-item>
        <el-form-item label="医院封面：">
          <div class="upload-tools">
            <el-upload :action="actions"
                       :headers="headers"
                       :on-success="handleAvatarSuccess"
                       :show-file-list="false"
                       list-type="picture-card">
              <el-image :src="info.hosPhoto"
                        class="hospital-img"
                        v-if="info.hosPhoto" />
              <i class="el-icon-plus"
                 v-else></i>
            </el-upload>
            <span class="q-ml-md">
              (用于患者端展示，图片要求：支持jpg、jpeg、png、bmp、gif格式图片，大小不超过2M，建
              议尺寸800*800）
            </span>
          </div>
        </el-form-item>
      </template>
    </el-form>

    <div v-if="isEdit"
         class="toolbar-style">
      <el-button @click="submitInfo"
                 type="primary">保存</el-button>
      <el-button @click="cancelInfo"
                 plain
                 type="primary">取消</el-button>
    </div>
  </div>
</template>
<script>
import Service from '../service'
export default {
  name: 'OrgDetailInfo',
  data() {
    return {
      id: '',
      actions: '',
      headers: {
        Authorization: ''
      },
      org: '',
      info: {},
      isEdit: false // 是否是编辑状态
    }
  },
  created() {
    this.id = Peace.cache.sessionStorage.get('196-hospitalId')
    this.getData()
  },

  async mounted() {
    this.actions = `${process.env.VUE_APP_API_BASE}nethospital/operate/hospital/uploadCover`
    this.headers.Authorization = 'Bearer ' + (await Peace.identity.auth.getAuth()).access_token
  },

  computed: {
    previewList() {
      return [this.info.hosPhoto]
    }
  },
  methods: {
    getData() {
      if (!this.id) return
      Service.getOrgDetail({ hospitalId: this.id }).then((res) => {
        this.info = res.data
        this.$emit('update', this.info.hosName)
      })
    },
    serviceStatusText(code) {
      return code == 1 ? '在用' : '停用'
    },
    serviceStatusTextColor(code) {
      return code == 1 ? '#3099A6' : '#FF2828'
    },
    // Image 上传成功回调
    handleAvatarSuccess(res) {
      this.org = res.data
      //此处存疑？？
      // this.info.hosPhoto = URL.createObjectURL(file.raw)
      this.info.hosPhoto = res.data
    },
    submitInfo() {
      const params = Object.assign({}, this.info)
      params['hospitalId'] = this.id
      Service.editOrgDetail(params).then((res) => {
        const msg = res.msg || '机构编辑成功'
        this.isEdit = false
        Peace.util.success(msg)
      })
    },
    cancelInfo() {
      this.getData()
      this.isEdit = false
    }
  }
}
</script>
<style lang="scss" scoped>
.form-style {
  position: relative;
  margin: 20px auto;
  width: 560px;
  height: 100%;
  background: rgba(48, 153, 166, 0.05);
  border-radius: 4px;
  padding: 36px 25px 1px;
}
.edit-form {
  position: absolute;
  right: 30px;
  top: 36px;
  width: 65px;
  height: 32px;
  padding: 0;
  z-index: 1;
}
.v-align {
  display: inline-block;
  vertical-align: middle;
}
.hospital-img {
  width: 100px;
  height: 100px;
  background: rgba(239, 239, 239, 1);
  border-radius: 8px;
  border: 1px solid rgba(232, 232, 232, 1);
}
::v-deep .el-upload {
  &-list__item,
  &--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
    overflow: hidden;
    .avatar {
      line-height: 100px;
      display: inline-block;
    }
  }
  .el-icon-plus {
    font-size: 18px;
  }
}

.toolbar-style {
  display: inline-block;
  width: 100%;
  margin: 10px auto 40px;
  text-align: center;
}

.upload-tools {
  display: flex;
  flex-direction: row;
  align-items: top;

  span {
    color: #666;
    line-height: 17px;
  }
}
</style>
