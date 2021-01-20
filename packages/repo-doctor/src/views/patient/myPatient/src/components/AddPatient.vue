<template>
  <div>
    <el-form :model="ruleForm"
             :rules="rules"
             label-position="right"
             label-width="100px"
             ref="ruleForm">
      <el-form-item label="姓名"
                    prop="name">
        <span slot="label">姓名：</span>
        <el-input v-model="ruleForm.name"
                  placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证"
                    prop="idCard">
        <span slot="label">身份证：</span>
        <el-input v-model.trim="ruleForm.idCard"
                  placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    prop="sexStr">
        <span slot="label">性别：</span>
        <el-input v-model="ruleForm.sexStr"
                  :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="生日"
                    prop="birthday">
        <span slot="label">生日：</span>
        <el-input suffix-icon="el-icon-date"
                  v-model="ruleForm.birthday"
                  :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="民族"
                    prop="nation">
        <span slot="label">民族：</span>
        <el-select filterable
                   label="民族"
                   style="width: 100%;"
                   placeholder="请选择"
                   v-model="ruleForm.nation">
          <el-option :key="item.code"
                     :label="item.name"
                     :value="item.name"
                     v-for="item in nationals"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="联系方式"
                    prop="tel">
        <span slot="label">手机号码：</span>
        <el-input v-model.number.trim="ruleForm.tel"
                  placeholder="请输入手机号码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="closeMenu">取消</el-button>
        <el-button @click="submitForm('ruleForm')"
                   type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  created() {
    this.getNational()
  },
  data() {
    return {
      ruleForm: {
        name: '',
        idCard: '',
        tel: '',
        sex: '',
        sexStr: '',
        birthday: '',
        nation: '',
        source: '3'
      },
      isSave: false, //是否保存
      sexs: ['男', '女'],
      nationals: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        nation: [{ required: true, message: '请选择民族', trigger: 'blur' }],
        // sexStr: [{ required: true, message: '请输选择性别', trigger: 'blur' }],
        // birthday: [{ required: true, message: '请选择生日', trigger: 'blur' }],
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: Peace.validate.pattern.mobile, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ]
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
        //this.age = this.getAgeByIdCard(val)
      }
    }
  },
  methods: {
    getNational() {
      Peace.service.patient.getNationList().then((res) => {
        this.nationals = res.data.list || []
      })
    },
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
  .el-form-item__label span {
    text-align-last: justify;
    text-align: justify;
    text-justify: distribute-all-lines;
    display: inline-block;
  }
}
</style>
