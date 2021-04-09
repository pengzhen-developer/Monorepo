<template>
  <div class="doctor">
    <div class="doctor-info">
      <div class="doctor-info-title">基本信息</div>
      <div class="doctor-info-content -ml-lg">
        <el-form :model="doctor"
                 :rules="rules"
                 inline
                 ref="doctorModel">
          <el-form-item label="医生姓名"
                        prop="name">
            <el-input v-model="doctor.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码"
                        prop="tel">
            <el-input v-model="doctor.tel"></el-input>
          </el-form-item>
          <el-form-item label="身份证号"
                        prop="id_card">
            <el-input v-model="doctor.id_card"></el-input>
          </el-form-item>
          <el-form-item label="证书编号"
                        prop="cert_no">
            <el-input v-model="doctor.cert_no"></el-input>
          </el-form-item>
          <el-form-item label="所在医院"
                        prop="hospital_name">
            <el-select v-model="doctor.hospital_name">
              <el-option :key="h.id"
                         v-for="h in hospitals"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院职称"
                        prop="doctor_title">
            <el-select v-model="doctor.doctor_title">
              <el-option :key="dt.id"
                         v-for="dt in doctorTitles"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="一级科室"
                        prop="dep_name">
            <el-select v-model="doctor.dep_name">
              <el-option :key="d.id"
                         v-for="d in deps"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级科室"
                        prop="dep_child">
            <el-select v-model="doctor.dep_child">
              <el-option :key="dc.id"
                         v-for="dc in depChilds"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="doctor-info un-imporant">
      <div class="doctor-info-title">互联网医院信息</div>
      <div class="doctor-info-content">
        <el-form :model="doctor"
                 :rules="rules"
                 inline
                 ref="doctorModel2">
          <el-form-item class="only"
                        label="所在医院"
                        prop="netHospital_name">
            <el-select v-model="doctor.netHospital_name">
              <el-option :key="h.id"
                         v-for="h in hospitals"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="一级科室"
                        prop="dep_name1">
            <el-select v-model="doctor.dep_name">
              <el-option :key="d.id"
                         v-for="d in deps"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级科室"
                        prop="dep_child1">
            <el-select v-model="doctor.dep_child">
              <el-option :key="dc.id"
                         v-for="dc in depChilds"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="doctor-info">
      <div class="doctor-info-title">证书图片</div>
      <div class="doctor-info-content ml-none">
        <el-upload :auto-upload="false"
                   action
                   list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </div>
    <div class="footer inline-center mt-md mb-sm">
      <el-button @click="saved"
                 type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
import Service from '../service'

export default {
  name: 'DoctorAdd',
  data() {
    return {
      doctor: {
        avartor: '',
        name: '',
        tel: '',
        id_card: '',
        cert_no: '',
        hospital_name: '',
        doctor_title: '',
        dep_name: '',
        dep_child: '',
        netHospital_name: '',
        netdept_name: '',
        netdept_child: ''
      },
      hospitals: [],
      netHospitals: [],
      doctorTitles: [],
      deps: [],
      depChilds: [],
      rules: {
        name: [
          {
            required: true,
            message: '请输入医生姓名',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          }
        ],
        id_card: [
          {
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
          }
        ],
        cert_no: [
          {
            required: true,
            message: '请输入证书编号',
            trigger: 'blur'
          }
        ],
        hospital_name: [
          {
            required: true
          }
        ],
        doctor_title: [
          {
            required: true
          }
        ],
        dep_name: [
          {
            required: true
          }
        ],
        dep_child: [
          {
            required: true
          }
        ]
      }
    }
  },
  methods: {
    saved() {
      this.$refs.doctorModel.validate((valid) => {
        if (valid) {
          const doctor = this.doctor
          Service.addDoctorModel(...doctor).then((res) => {
            const msg = res.msg || '医生新增成功'
            Peace.util.success(msg)
            this.$emit('close')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor {
  &-info {
    &-title {
      font-size: 16px;
      line-height: 25px;
      border-bottom: 1px solid #eee;
    }
    &-content {
      padding-top: 18px;
      margin-left: -20px;
      .preview-img {
        width: calc(33.3333% - 15px);
        border: 1px solid #fafafa;
        vertical-align: middle;
      }
      .preview-img + .preview-img {
        margin-left: 20px;
      }
    }
  }
}
::v-deep .el {
  &-input,
  &-select {
    width: 100%;
  }
  &-upload {
    &-list__item,
    &--picture-card {
      width: 180px;
      height: 180px;
      line-height: 180px;
    }
  }
  &-form-item {
    &--mini.el-form-item {
      margin-right: 0;
      margin-bottom: 18px;
      width: 50%;
    }
    &--mini.el-form-item.only {
      width: 100%;
    }
    &__label {
      width: 100px;
      text-align: right;
    }
    &__content {
      width: calc(100% - 100px);
    }
  }
}
</style>
