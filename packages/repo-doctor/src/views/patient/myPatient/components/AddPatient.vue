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
        <el-input v-model="ruleForm.idCard"
                  placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    prop="gender">
        <span slot="label">性别</span>
        <el-select v-model="ruleForm.gender"
                   style="width: 100%;"
                   placeholder="请选择">
          <el-option v-for="item in sexs"
                     :key="item"
                     :label="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="生日"
                    prop="birthday">
        <span slot="label">生日</span>
        <el-date-picker v-model="ruleForm.birthday"
                        type="date"
                        style="width: 100%;"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="生日"
                    prop="national">
        <span slot="label">民族</span>
        <el-select filterable
                   label="民族"
                   style="width: 100%;"
                   placeholder="请选择"
                   v-model="ruleForm.national">

          <el-option :key="item.code"
                     :label="item.name"
                     :value="item.name"
                     v-for="item in nationals"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="联系方式"
                    prop="phoneNumber">
        <span slot="label">联系方式</span>
        <el-input v-model="ruleForm.phoneNumber"
                  placeholder="请输入患者联系方式"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="dialog.visible = false"
                   type="info">取消</el-button>
        <el-button @click="submitForm('ruleForm')"
                   type="primary">保存</el-button>
      </el-form-item>
    </el-form>

    <div style="margin-bottom: 10px; text-align: center;">
      <el-button @click="dialog.visible = false"
                 type="info">取消</el-button>
      <el-button @click="saveItem"
                 type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        idCard: '',
        phoneNumber: '',
        gender: '',
        birthday: '',
        national: ''
      },
      sexs: ['男', '女'],
      nationals: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        national: [{ required: true, message: '请选择民族', trigger: 'blur' }],
        gender: [{ required: true, message: '请输选择性别', trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择生日', trigger: 'blur' }],
        phoneNumber: [{ required: true, message: '请输入患者联系方式', trigger: 'blur' }]
      }
    }
  },
  watch: {
    // 根据身份证解析性别和生日
    'ruleForm.idCard'(val) {
      if (peace.validate.idCard(val)) {
        if (val.length == 15) {
          this.ruleForm.sexKey = val.toString().charAt(14) % 2
          this.ruleForm.gender = this.ruleForm.sexKey ? '男' : '女'
          this.ruleForm.birthday =
            '19' + val.substr(6, 2) + '-' + val.substr(8, 2) + '-' + val.substr(10, 2)
        }
        if (val.length == 18) {
          this.ruleForm.sexKey = val.toString().charAt(16) % 2
          this.ruleForm.gender = this.ruleForm.sexKey ? '男' : '女'
          this.ruleForm.birthday =
            val.substr(6, 4) + '-' + val.substr(10, 2) + '-' + val.substr(12, 2)
        }
        //this.age = this.getAgeByIdCard(val)
      }
    }
  },
  methods: {
    getNational() {
      peace.service.patient.getNationList().then(res => {
        this.nationals = res.data.list || []
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //提交
        } else {
          return false
        }
      })
    }
  },
  created() {
    this.getNational()
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
</style>