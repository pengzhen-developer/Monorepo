<template>
  <div>
    <el-form :model="ruleForm"
             :rules="rules"
             label-position="right"
             label-width="100px"
             ref="ruleForm">
      <el-form-item label="姓名"
                    prop="name">
        <span slot="label">姓名</span>
        <el-input v-model="ruleForm.name"
                  placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证"
                    prop="idCard">
        <span slot="label">身份证</span>
        <el-input v-model.trim="ruleForm.idCard"
                  placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    prop="sexStr">
        <span slot="label">性别</span>
        <el-input v-model="ruleForm.sexStr"
                  :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="生日"
                    prop="birthday">
        <span slot="label">生日</span>
        <el-input prefix-icon="el-icon-date"
                  v-model="ruleForm.birthday"
                  :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="联系方式"
                    prop="tel">
        <span slot="label">手机号码</span>
        <el-input v-model="ruleForm.tel"
                  placeholder="请输入手机号码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="closeMenu"
                   type="info">取消</el-button>
        <el-button @click="submitForm('ruleForm')"
                   type="primary">保存</el-button>
      </el-form-item>
    </el-form>

    <div class="q-pt-16">
      <div class="tip-style row items-center justify-between">
        <i class="el-icon-warning q-ml-16"
           type="warning"> 该就诊人已是您的患者，无需重复添加！</i>

        <el-button type="text"
                   class="text-color">去开处方</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        idCard: '',
        tel: '',
        sex: '',
        sexStr: '',
        birthday: '',
        source: '3'
      },

      isSave: false, //是否保存

      sexs: ['男', '女'],

      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        nation: [{ required: true, message: '请选择民族', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      }
    }
  },

  watch: {
    // 根据身份证解析性别和生日
    'ruleForm.idCard'(val) {
      if (Peace.validate.isIDCard(val)) {
        if (val.length == 15) {
          this.ruleForm.sexKey = val.toString().charAt(14) % 2
          this.ruleForm.sexStr = this.ruleForm.sexKey ? '男' : '女'
          this.ruleForm.birthday = '19' + val.substr(6, 2) + '-' + val.substr(8, 2) + '-' + val.substr(10, 2)
        }
        if (val.length == 18) {
          this.ruleForm.sexKey = val.toString().charAt(16) % 2
          this.ruleForm.sexStr = this.ruleForm.sexKey ? '男' : '女'
          this.ruleForm.birthday = val.substr(6, 4) + '-' + val.substr(10, 2) + '-' + val.substr(12, 2)
        }
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交
          if (this.ruleForm.sexStr == '男') {
            this.ruleForm.sex = 1
          } else {
            this.ruleForm.sex = 2
          }
          Peace.service.patient.addPatient(this.ruleForm).then((res) => {
            Peace.util.success(res.msg)
            if (res.success) {
              this.isSave = true
              this.closeMenu()
              this.$emit('updateList')
            }
          })
        } else {
          return false
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
          Peace.validate.isEmpty(this.ruleForm.sexStr) &&
          Peace.validate.isEmpty(this.ruleForm.birthday) &&
          Peace.validate.isEmpty(this.ruleForm.nation)
        )
      }
    },

    closeMenu() {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 22px;
  padding-right: 20px;

  .el-form-item__label span {
    text-align-last: justify;
    text-align: justify;
    text-justify: distribute-all-lines;
    width: 4em;
    display: inline-block;
  }
}

.el-button {
  width: 84px;
  height: 28px;
  &:nth-child(1) {
    margin-right: 23px;
  }
}

.tip-style {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 32;
  // margin: 16px 8px;
  background: #ffaa002d;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.8);

  .text-color {
    color: #ffaa00;
  }
}
</style>
