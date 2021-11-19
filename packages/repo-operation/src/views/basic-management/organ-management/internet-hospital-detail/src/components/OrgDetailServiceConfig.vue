<template>
  <div class="org-detail-service-config">

    <div class="row items-center q-mb-lg">
      <span class="title">公众号信息</span>
      <span v-if="showQrcodeTips"
            class="qrcode_title_style">(医生二维码名片)</span>
    </div>

    <el-row :gutter="40">
      <el-col :span="4"
              v-for="(item, index) in list"
              :key="index"
              style="margin: 0 0 40px 0;"
              @click.native="showDetail(item)">
        <el-card shadow="hover"
                 :style="{ 
                            background: backgroundColorList[index % backgroundColorList.length], 
                            color: textColorList[index % textColorList.length] 
                         }"
                 style="width: 100%; height: 100px;">
          <img src="./../assets/image/wechat.png"
               style="width: 30px; height: 30px;">
          <span style="margin: 0 0 0 10px; font-weight: bold;">{{ item.name }}</span>
        </el-card>
      </el-col>

      <el-col :span="4"
              v-if="list.length==0"
              @click.native="showAddDialog">
        <el-card shadow="hover"
                 style="width: 100%; height: 100px; display: inline-flex; justify-content: center; align-items: center; border: 1px dashed #cccccc">
          <i class="el-icon-plus"
             style="font-size: 40px; color: #cccccc;"></i>
        </el-card>
      </el-col>
    </el-row>

    <div class="row items-center q-mb-lg">
      <span class="title">小程序信息</span>
      <span v-if="showProgramQrcodeTips"
            class="qrcode_title_style">(医生二维码名片)</span>
    </div>

    <el-row :gutter="40">
      <el-col :span="4"
              v-for="(item, index) in programList"
              :key="index"
              style="margin: 0 0 40px 0;"
              @click.native="showProgramDetail(item)">
        <el-card shadow="hover"
                 :style="{ 
                            background: backgroundColorList[index % backgroundColorList.length], 
                            color: textColorList[index % textColorList.length] 
                         }"
                 style="width: 100%; height: 100px;">
          <img src="./../assets/image/wx_program.png"
               style="width: 30px; height: 30px;">
          <span style="margin: 0 0 0 10px; font-weight: bold;">{{ item.name }}</span>
        </el-card>
      </el-col>

      <el-col :span="4"
              v-if="programList.length==0"
              @click.native="showAddProgramDialog">
        <el-card shadow="hover"
                 style="width: 100%; height: 100px; display: inline-flex; justify-content: center; align-items: center; border: 1px dashed #cccccc">
          <i class="el-icon-plus"
             style="font-size: 40px; color: #cccccc;"></i>
        </el-card>
      </el-col>
    </el-row>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :title="dialog.title"
                  :visible.sync="dialog.visible"
                  append-to-body
                  width="700px">
      <el-form :model="dialog.model"
               :rules="rules"
               ref="form"
               label-width="180px"
               style="width: 600px;">
        <el-form-item label="公众号名称"
                      prop="name">
          <el-input v-model.trim="dialog.model.name"
                    placeholder="请输入公众号名称"></el-input>
        </el-form-item>
        <el-form-item label="开发者ID(APPID)"
                      prop="appId">
          <el-input v-model.trim="dialog.model.appId"
                    placeholder="请输入开发者ID"></el-input>
          <p style="font-size: 12px; color: #999999; line-height: 20px; text-align: justify;">
            开发者ID是公众号开发识别码，配合开发者密码可调用公众号的接口能力。
          </p>
        </el-form-item>
        <el-form-item label="开发者密钥(SECRET)"
                      prop="appKey">
          <el-input v-model.trim="dialog.model.appKey"
                    placeholder="请输入开发者密钥"></el-input>
          <p style="font-size: 12px; color: #999999; line-height: 20px; text-align: justify;">
            开发者密码是校验公众号开发者身份的密码，具有极高的安全性。
            切记勿把密码直接交给第三方开发者或直接存储在代码中。如需第三方代开发公众号，请使用授权方式接入。
          </p>
        </el-form-item>
        <el-form-item label="模板消息ID"
                      prop="templateId">
          <el-input v-model.trim="dialog.model.templateId"
                    placeholder="请输入模板消息ID"></el-input>
        </el-form-item>
        <el-form-item label="是否开启服务设置">
          <el-switch v-model="dialog.model.isOpen"
                     active-color="#13ce66"
                     inactive-color="#c3c3c3">
          </el-switch>
        </el-form-item>

        <el-form-item label="生成医生二维码名片">
          <el-switch v-model="dialog.model.isQrcode"
                     active-color="#13ce66"
                     inactive-color="#c3c3c3">
          </el-switch>
        </el-form-item>

        <el-form-item label="重要说明">
          <div>
            <p style="font-size: 12px; color: #999999;">
              1、微信公众号配置后用于接收测量数据和健康报告的微信消息推送；
            </p>
            <p style="font-size: 12px; color: #999999;">
              2、微信公众号需设置一级行业为“医疗护理”，二级行业为“保健与卫生”；
            </p>
            <p style="font-size: 12px; color: #999999;">
              3、更多配置操作说明，请下载“
              <a :href="baseUrl + 'doc/机构微信公众号配置说明文档(10-22).docx'"
                 style="color: #3099a6; cursor: pointer;">使用文档</a> ”
            </p>
          </div>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary"
                     style="margin-left:50px;"
                     @click="save">保存</el-button>
        </div>
      </el-form>
    </peace-dialog>

    <!-- 小程序信息 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :title="programDialog.title"
                  :visible.sync="programDialog.visible"
                  append-to-body
                  width="700px">
      <el-form :model="programDialog.model"
               :rules="programRules"
               ref="programForm"
               label-width="180px"
               style="width: 600px;">
        <el-form-item label="小程序名称"
                      prop="name">
          <el-input v-model.trim="programDialog.model.name"
                    placeholder="请输入小程序名称"></el-input>
        </el-form-item>
        <el-form-item label="开发者ID(APPID)"
                      prop="appid">
          <el-input v-model.trim="programDialog.model.appid"
                    placeholder="请输入开发者ID"></el-input>
          <p style="font-size: 12px; color: #999999; line-height: 20px; text-align: justify;">
            开发者ID是小程序开发识别码，配合开发者密码可调用小程序的接口能力。
          </p>
        </el-form-item>
        <el-form-item label="开发者密钥(SECRET)"
                      prop="secret">
          <el-input v-model.trim="programDialog.model.secret"
                    placeholder="请输入开发者密钥"></el-input>
          <p style="font-size: 12px; color: #999999; line-height: 20px; text-align: justify;">
            开发者密码是校验小程序开发者身份的密码，具有极高的安全性。
            切记勿把密码直接交给第三方开发者或直接存储在代码中。如需第三方代开发小程序，请使用授权方式接入。
          </p>
        </el-form-item>

        <el-form-item label="生成医生二维码名片">
          <el-switch v-model="programDialog.model.isQrcode"
                     active-color="#13ce66"
                     inactive-color="#c3c3c3">
          </el-switch>
        </el-form-item>

        <el-form-item label="重要说明">
          <div>
            <p style="font-size: 12px; color: #999999;">
              1、小程序配置后用于生成医生二维码名片和支付消息推送；
            </p>
            <p style="font-size: 12px; color: #999999;">
              2、小程序需设置分类为“互联网医院”；
            </p>
            <p style="font-size: 12px; color: #999999;">
              3、更多配置操作说明，请下载“
              <a :href="baseUrl + 'doc/小程序接入指引.docx'"
                 style="color: #3099a6; cursor: pointer;">使用文档</a> ”
            </p>
          </div>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary"
                     style="margin-left:50px;"
                     @click="saveProgram">保存</el-button>
        </div>
      </el-form>
    </peace-dialog>
  </div>
</template>

<script>
import Service from '../service'

export default {
  data() {
    return {
      list: [],
      baseUrl: `${process.env.VUE_APP_API_BASE}nethospital/`,
      netHospitalId: '',
      dialog: {
        visible: false,

        model: {
          name: '',
          appId: '',
          appKey: '',
          templateId: '',
          isOpen: false,
          isQrcode: false
        }
      },

      rules: {
        name: [{ required: true, message: '请输入公众号名称', trigger: 'blur' }],
        appId: [{ required: true, message: '请输入开发者ID', trigger: 'blur' }],
        appKey: [{ required: true, message: '请输入开发者密钥', trigger: 'blur' }],
        templateId: [{ required: true, message: '请输入模板消息ID', trigger: 'blur' }]
      },

      programList: [],

      programDialog: {
        visible: false,
        model: {
          name: '',
          appid: '',
          secret: '',
          isQrcode: false
        }
      },

      programRules: {
        name: [{ required: true, message: '请输入小程序名称', trigger: 'blur' }],
        appid: [{ required: true, message: '请输入开发者ID', trigger: 'blur' }],
        secret: [{ required: true, message: '请输入开发者密钥', trigger: 'blur' }]
      },

      backgroundColorList: ['#FFF', '#FFF', '#FFF', '#FFF'],
      textColorList: ['#000', '#000', '#000', '#000']
    }
  },

  created() {
    this.netHospitalId = Peace.cache.sessionStorage.get('196-hospitalId').split('-')[0]
    this.internalData = Object.assign({}, this._data)
    this.get()
  },

  watch: {
    'dialog.visible'() {
      this.$refs.form && this.$refs.form.clearValidate()
      this.dialog.model = Object.assign({}, this.internalData.dialog.model)
    },
    'programDialog.visible'() {
      this.$refs.programForm && this.$refs.programForm.clearValidate()
      this.programDialog.model = Object.assign({}, this.internalData.programDialog.model)
    }
  },

  computed: {
    showQrcodeTips() {
      return !!(this.list[0]?.isQrcode ?? false)
    },

    showProgramQrcodeTips() {
      return !!(this.programList[0]?.isQrcode ?? false)
    }
  },

  methods: {
    get() {
      const params = {
        p: 1,
        size: 9999,
        netHospitalId: this.netHospitalId
      }

      Service.lists(params).then((res) => {
        res.data.list.forEach((item) => {
          item.isOpen = !!item.isOpen
          item.isQrcode = !!item.isQrcode
        })
        this.list = res.data.list
      })

      Service.programLists(params).then((res) => {
        res.data.list.forEach((item) => {
          item.isQrcode = !!item.isQrcode
        })
        this.programList = res.data.list
      })
    },

    showDetail(item) {
      this.dialog.visible = true
      this.dialog.title = '公众号服务配置详情'
      this.$nextTick(() => {
        this.dialog.model = Object.assign({}, item)
      })
    },

    showAddDialog() {
      this.dialog.title = '新增公众号服务配置'
      this.dialog.visible = true
      if (this.dialog.model.name) {
        this.$refs.form.resetFields()
        let model = {
          name: '',
          appId: '',
          appKey: '',
          templateId: '',
          isOpen: false
        }
        this.dialog.model = Object.assign({}, model)
      }
    },

    save() {
      const params = Object.assign({}, this.dialog.model)
      params.netHospitalId = this.netHospitalId
      params.isOpen = Number(params.isOpen)
      params.isQrcode = Number(params.isQrcode)
      this.$refs.form.validate((valid) => {
        if (valid) {
          Service.insertData(params).then(() => {
            this.dialog.visible = false
            this.get()
          })
        }
      })
    },

    showProgramDetail(item) {
      this.programDialog.visible = true
      this.programDialog.title = '小程序服务配置详情'
      this.$nextTick(() => {
        this.programDialog.model = Object.assign({}, item)
      })
    },

    showAddProgramDialog() {
      this.programDialog.title = '新增小程序服务配置'
      this.programDialog.visible = true
      if (this.programDialog.model.name) {
        this.$refs.programForm.resetFields()
        let model = {
          name: '',
          appId: '',
          appKey: '',
          templateId: '',
          isOpen: false
        }
        this.programDialog.model = Object.assign({}, model)
      }
    },

    saveProgram() {
      const params = Object.assign({}, this.programDialog.model)
      params.netHospitalId = this.netHospitalId
      params.isQrcode = Number(params.isQrcode)
      this.$refs.programForm.validate((valid) => {
        if (valid) {
          Service.programInsertData(params).then(() => {
            this.programDialog.visible = false
            this.get()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.org-detail-service-config {
  padding: 20px 30px;

  .qrcode_title_style {
    color: var(--q-color-primary);
    font-size: 12px;
    margin-left: 10px;
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    opacity: 1;
    margin: 0 0 0 0;

    &::before {
      content: ' ';
      height: 16px;
      width: 4px;
      background: var(--q-color-primary);
      margin: 0 10px 0 0;
    }
  }

  ::v-deep .el-form {
    .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before,
    .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
      content: '';
    }

    .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:after,
    .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:after {
      content: '*';
      color: #f56c6c;
      font-size: 16px;
      margin: 0 4px 0 8px;
      vertical-align: sub;
    }

    .el-form-item:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:after,
    .el-form-item:not(.is-no-asterisk) > .el-form-item__label:after {
      content: ' ';
      color: #f56c6c;
      font-size: 16px;
      margin: 0 4px 0 8px;
      vertical-align: sub;
    }
  }

  ::v-deep .el-card__body {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>