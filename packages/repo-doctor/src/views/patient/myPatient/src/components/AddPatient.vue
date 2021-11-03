<template>
  <div>
    <div class="el-dialog__body">
      <el-form :model="ruleForm"
               :rules="rules"
               class="q-pr-md"
               label-position="right"
               label-width="auto"
               ref="ruleForm">
        <el-form-item label="姓名"
                      prop="name">
          <span slot="label">姓名：</span>
          <el-input v-model.trim="ruleForm.name"
                    placeholder="请输入姓名"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="身份证"
                      prop="idCards"
                      v-if="showGuardianInfoView">
          <span slot="label">身份证：</span>
          <el-input v-model.trim="ruleForm.idCard"
                    placeholder="请输入身份证号"
                    maxlength="18"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="身份证"
                      prop="idCard"
                      v-else>
          <span slot="label">身份证：</span>
          <el-input v-model.trim="ruleForm.idCard"
                    placeholder="请输入身份证号"
                    maxlength="18"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="性别"
                      prop="sex">
          <span slot="label">性别：</span>

          <el-select filterable
                     label="性别："
                     style="width: 100%;"
                     placeholder="请选择性别"
                     v-model="ruleForm.sex"
                     clearable>
            <el-option :key="item"
                       :label="item"
                       :value="item"
                       v-for="item in ['男', '女']"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生日"
                      prop="birthday">
          <span slot="label">生日：</span>

          <peace-date-picker :picker-options="rules.pickerOptionsDate"
                             class="full-width"
                             placeholder="请选择生日"
                             v-model="ruleForm.birthday"
                             value-format="yyyy-MM-dd"
                             clearable></peace-date-picker>
        </el-form-item>

        <el-form-item label="民族">
          <span slot="label">民族：</span>
          <el-select filterable
                     label="民族"
                     style="width: 100%;"
                     placeholder="请选择"
                     v-model="ruleForm.nation"
                     clearable>
            <el-option :key="item.code"
                       :label="item.name"
                       :value="item.name"
                       v-for="item in nationals"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系方式"
                      prop="tel">
          <span slot="label">手机号：</span>
          <el-input v-model.number.trim="ruleForm.tel"
                    placeholder="请输入手机号码"
                    clearable></el-input>
        </el-form-item>

        <div v-if="showGuardianInfoView">
          <p style="margin-bottom: 20px; font-size: 16px; font-weight: 600">就诊人未满6岁，请填写监护人信息</p>

          <el-form-item label="监护人姓名"
                        prop="guardianName">
            <span slot="label">姓名：</span>
            <el-input v-model.trim="ruleForm.guardianName"
                      placeholder="若无证件，则此处必填"
                      clearable></el-input>
          </el-form-item>

          <el-form-item label="监护人身份证号"
                        prop="guardianIdCard">
            <span slot="label">身份证：</span>
            <el-input v-model.trim="ruleForm.guardianIdCard"
                      placeholder="若无证件，则此处必填"
                      maxlength="18"
                      clearable></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="el-dialog__footer">
      <el-button @click="closeMenu">取消</el-button>
      <el-button @click="submitForm"
                 v-bind:loading="loading"
                 type="primary">{{ submitBtnText }}</el-button>
    </div>
  </div>
</template>

<script>
import Service from './../service/index.js'

export default {
  props: {
    type: {
      required: true,
      type: String,
      validator(value) {
        return ['faceToFace', 'patientAdmin'].includes(value)
      }
    },
    patientData: {
      type: Object
    }
  },
  created() {
    if (this.patientData) {
      this.ruleForm = this.patientData
    }

    this.getNational()
  },
  data() {
    const validateIdCard = (rule, value, callback) => {
      const idCard = this.ruleForm.idCard
      if (Peace.validate.isEmpty(idCard)) {
        callback()
      } else {
        if (Peace.validate.isIDCard(idCard)) {
          callback()
        } else {
          callback(new Error('请输入正确的身份证号！'))
        }
      }
    }
    return {
      ruleForm: {
        name: '',
        idCard: '',
        tel: '',
        sex: '',
        birthday: '',
        nation: '',
        guardianName: '',
        guardianIdCard: ''
      },
      loading: false,
      /// 是否已经保存
      isSave: false,
      /// 民族字典
      nationals: [],
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: validateIdCard, message: '请输入正确的身份证号!', trigger: 'blur' }
        ],
        idCards: [{ validator: validateIdCard, trigger: 'blur' }],
        // nation: [{ required: true, message: '请选择民族', trigger: 'blur' }],
        sex: [{ required: true, message: '请输选择性别', trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择生日', trigger: 'blur' }],
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: Peace.validate.pattern.mobile, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        guardianName: [{ required: true, message: '请输入监护人姓名', trigger: 'blur' }],
        guardianIdCard: [
          { required: true, message: '请输入监护人身份证号', trigger: 'blur' },
          { validator: validateIdCard, message: '请输入正确的身份证号', trigger: 'blur' }
        ],
        pickerOptionsDate: {
          disabledDate(time) {
            return (
              time.getTime() >
              new Date()
                .formatDate('yyyy-MM-dd 00:00:00')
                .toDate()
                .getTime()
            )
          }
        }
      }
    }
  },
  watch: {
    // 根据身份证解析性别和生日
    'ruleForm.idCard'(val) {
      if (Peace.validate.isIDCard(val)) {
        if (val.length === 18) {
          this.ruleForm.sexKey = val.toString().charAt(16) % 2

          if (Peace.validate.isEmpty(this.ruleForm.sex)) {
            this.ruleForm.sex = this.ruleForm.sexKey ? '男' : '女'
          }

          if (Peace.validate.isEmpty(this.ruleForm.birthday)) {
            this.ruleForm.birthday = val.substr(6, 4) + '-' + val.substr(10, 2) + '-' + val.substr(12, 2)
          }
        }
      }
    },

    showGuardianInfoView: function(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.ruleForm.validateField('idCards')
        })
      } else {
        this.$nextTick(() => {
          this.$refs.ruleForm.clearValidate('idCards')
        })
      }
    }
  },

  computed: {
    showGuardianInfoView() {
      const birthdayStr = this.ruleForm.birthday
      if (Peace.validate.isEmpty(birthdayStr)) {
        return false
      }
      const date1 = Peace.dayjs()
      const date2 = Peace.dayjs(birthdayStr)
      return date1.diff(date2, 'year') < 6
    },
    submitBtnText() {
      return this.type === 'faceToFace' ? '开处方' : '保存'
    }
  },

  methods: {
    getNational() {
      Service.getNationList().then((res) => {
        this.nationals = res.data.list || []
      })
    },

    submitForm() {
      this.validForm().then(this.saveData)
    },

    validForm() {
      return this.$refs.ruleForm.validate()
    },

    saveData() {
      this.loading = true
      const params = { ...this.ruleForm }
      if (!Peace.validate.isEmpty(params.guardianName) && !Peace.validate.isEmpty(params.guardianIdCard)) {
        params['guardianInfo'] = {
          name: params.guardianName,
          idCard: params.guardianIdCard
        }
      }

      Service.addPatient(params)
        .then((res) => {
          Peace.util.success(res.msg)
          if (res.success) {
            this.isSave = true
            this.closeMenu()
            this.$emit('success')
          }
        })
        .finally(() => {
          this.loading = false
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
          Peace.validate.isEmpty(this.ruleForm.birthday) &&
          Peace.validate.isEmpty(this.ruleForm.nation) &&
          Peace.validate.isEmpty(this.ruleForm.guardianName) &&
          Peace.validate.isEmpty(this.ruleForm.guardianidCard)
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
