<template>
  <div>
    <div class="el-dialog__body">
      <el-form v-bind:model="ruleForm"
               v-bind:rules="rules"
               label-position="right"
               label-width="auto"
               ref="ruleForm">
        <el-form-item label="姓名"
                      prop="name">
          <span slot="label">姓名：</span>
          <el-input v-bind:disabled="isChaperonage"
                    v-model="ruleForm.name"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证"
                      prop="idCard">
          <span slot="label">身份证：</span>
          <el-input v-bind:disabled="isChaperonage"
                    v-model="ruleForm.idCard"
                    placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="sex">
          <span slot="label">性别：</span>
          <el-input v-model="ruleForm.sex"
                    v-bind:disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="生日"
                      prop="birthday">
          <span slot="label">生日：</span>
          <el-input suffix-icon="el-icon-date"
                    v-model="ruleForm.birthday"
                    v-bind:disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="联系方式"
                      prop="tel">
          <span slot="label">手机号码：</span>
          <el-input v-bind:disabled="isChaperonage"
                    v-model.number.trim="ruleForm.tel"
                    placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <hr v-if="isChaperonage">
        <div v-if="isChaperonage">

          <div class="q-mb-md">
            <el-alert type="warning"
                      show-icon=""
                      v-bind:closable="false"
                      title="就诊人身份证信息未进入认证库，请填写陪同人信息"></el-alert>
          </div>

          <el-form-item label=""
                        prop="chaperonageName">
            <span slot="label">陪同人姓名：</span>
            <el-input v-model.trim="ruleForm.chaperonageName"
                      placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label=""
                        prop="chaperonageIdCard">
            <span slot="label">身份证：</span>
            <el-input v-model.trim="ruleForm.chaperonageIdCard"
                      placeholder="请输入身份证号"></el-input>
          </el-form-item>

        </div>
      </el-form>
    </div>

    <div class="el-dialog__footer">
      <el-button @click="closeMenu">取消</el-button>
      <el-button @click="submitForm"
                 type="primary">保存</el-button>
    </div>

    <div v-if="tips.showTips"
         class="tip-style row items-center justify-between q-pr-md">
      <i class="el-icon-warning q-ml-16"
         type="warning"> 该就诊人已是您的患者，无需重复添加！</i>

      <el-button type="text"
                 v-on:click="goToRecipe"
                 class="text-color">去开处方</el-button>
    </div>

  </div>
</template>

<script>
import Service from '../service'

export default {
  data() {
    return {
      isChaperonage: false,

      ruleForm: {
        name: '',
        idCard: '',
        tel: '',
        sex: '',
        birthday: '',

        chaperonageName: '',
        chaperonageIdCard: ''
      },

      isSave: false, //是否保存

      sexs: ['男', '女'],

      rules: {
        name: [
          { required: true, message: '请输入姓名' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号' },
          { pattern: Peace.validate.pattern.idCard, message: '请输入正确的身份证号' }
        ],
        tel: [
          { required: true, message: '请输入手机号码' },
          { pattern: Peace.validate.pattern.mobile, message: '请输入正确的手机号' }
        ],

        chaperonageName: [
          { required: true, message: '请输入陪同人姓名' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符' }
        ],
        chaperonageIdCard: [
          { required: true, message: '请输入陪同人身份证号' },
          { pattern: Peace.validate.pattern.idCard, message: '请输入正确的身份证号' }
        ]
      },

      tips: {
        showTips: false,
        patientInfo: {}
      }
    }
  },

  watch: {
    // 根据身份证解析性别和生日
    'ruleForm.idCard'(val) {
      if (Peace.validate.isIDCard(val)) {
        if (val.length == 15) {
          this.ruleForm.sexKey = val.toString().charAt(14) % 2
          this.ruleForm.sex = this.ruleForm.sexKey ? '男' : '女'
          this.ruleForm.birthday = '19' + val.substr(6, 2) + '-' + val.substr(8, 2) + '-' + val.substr(10, 2)
        }
        if (val.length == 18) {
          this.ruleForm.sexKey = val.toString().charAt(16) % 2
          this.ruleForm.sex = this.ruleForm.sexKey ? '男' : '女'
          this.ruleForm.birthday = val.substr(6, 4) + '-' + val.substr(10, 2) + '-' + val.substr(12, 2)
        }
      }
    }
  },

  methods: {
    submitForm() {
      // step 1 valid form
      // step 2 valid id idcard and name
      // step 3 valid chaperonage's idcard and name
      // step 4 save data

      if (this.isChaperonage) {
        this.validForm().then(this.saveData)
      } else {
        this.validForm()
          .then(this.validIdCard)
          .then(this.saveData)
      }
    },

    validForm() {
      return this.$refs.ruleForm.validate()
    },

    validIdCard() {
      const params = { idCard: this.ruleForm.idCard, name: this.ruleForm.name }

      // 验证身份证合法性
      return Service.checkIdCard(params).then((res) => {
        // 验证就诊人身份证合法性
        // status = 1：正常
        // status = 2：库中无此身份证号码
        if (res.data.status === 1) {
          return Promise.resolve()
        }

        if (res.data.status === 2) {
          // 切换监护人表单填写
          this.isChaperonage = true

          return Promise.reject()
        }

        return Promise.reject()
      })
    },

    saveData() {
      const params = Peace.util.deepClone(this.ruleForm)

      params.guardianInfo = {
        name: this.ruleForm.chaperonageName,
        idCard: this.ruleForm.chaperonageIdCard
      }

      Service.addPatient(params).then((res) => {
        if (res.success && res.data.status === 1) {
          Peace.util.success(res.msg)

          this.isSave = true
          this.closeMenu()
          this.$emit('updateList')
        } else if (res.success && res.data.status === 2) {
          this.isSave = true
          this.tips.showTips = true
          this.tips.patientInfo = {
            patientNo: res.data.patientNo,
            patientId: res.data.patientId,
            familyId: res.data.familyId,
            tel: res.data.tel
          }
        }
      })
    },

    isShouldSave() {
      if (this.isSave) {
        return false
      } else {
        return !(
          Peace.validate.isEmpty(this.ruleForm.name) &&
          Peace.validate.isEmpty(this.ruleForm.idCard) &&
          Peace.validate.isEmpty(this.ruleForm.tel) &&
          Peace.validate.isEmpty(this.ruleForm.sex) &&
          Peace.validate.isEmpty(this.ruleForm.birthday)
        )
      }
    },

    closeMenu() {
      this.$emit('closeMenu')
    },

    goToRecipe() {
      // 选中当前患者
      this.closeMenu()
      this.$emit('sendRecipe')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  .el-form-item__label span {
    text-align-last: justify;
    text-align: justify;
    text-justify: distribute-all-lines;
    display: inline-block;
  }
}

.tip-style {
  position: relative;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 32;
  margin: 16px -16px -16px -16px;
  // margin: 16px 8px;
  background: #ffaa002d;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.8);

  .text-color {
    color: #ffaa00;
  }
}
</style>
