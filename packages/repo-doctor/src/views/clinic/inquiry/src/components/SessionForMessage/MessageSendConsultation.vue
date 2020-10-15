<template>
  <div>
    <el-alert :closable="false"
              title="申请会诊"
              type="success">
      <div slot="title">
        <span>申请会诊</span>
        <i @click="close"
           class="el-alert__closebtn el-icon-close"></i>
      </div>
    </el-alert>

    <el-form :model="view.model"
             :rules="view.rules"
             label-position="right"
             label-width="120px"
             ref="form">
      <el-row>
        <el-form-item label="疾病诊断">
          <span slot="label">疾病诊断</span>
          <span>{{ view.model.diagnose }}</span>
        </el-form-item>
      </el-row>
      <el-row class="consultaltion-doctor">
        <el-form-item label="会诊医生"
                      prop="doctorInfo">
          <span slot="label">会诊医生</span>
          <el-button @click="choseConsultaltion"
                     style="min-width: auto;"
                     type="text"
                     v-show="!view.model.doctorInfo">请选择</el-button>
          <template v-if="view.model.doctorInfo">
            <div class="consultaltion-doctor-info">
              <img :src="view.model.doctorInfo.avartor"
                   style="width: 40px; height: 40px; border-radius: 50%;" />
              <span style="font-size:16px; font-weight:700;">{{view.model.doctorInfo.doctorName }}</span>
              <span>{{view.model.doctorInfo.doctorTitle }}</span>
              <span>{{view.model.doctorInfo.deptName }}</span>
              <span>{{view.model.doctorInfo.hospitalName }}</span>
              <el-button @click="choseConsultaltion"
                         style="min-width: auto;"
                         type="text"
                         v-show="view.model.doctorInfo">修改</el-button>
            </div>
          </template>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="期望会诊时间"
                      prop="expectDate"
                      style="display: inline-block;">
          <span slot="label">期望会诊时间</span>
          <el-date-picker :picker-options="view.rules.pickerOptionsDate"
                          placeholder
                          style="width: 145px;"
                          v-model="view.model.expectDate"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label
                      label-width="0"
                      prop="expectTime"
                      style="display: inline-block; ">
          <el-time-select :picker-options="view.rules.pickerOptionsTime"
                          placeholder
                          style="width: 110px; margin-left: 5px;"
                          v-model="view.model.expectTime"
                          value-format="HH:mm"></el-time-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="会诊说明"
                      prop="referralCause">
          <span slot="label">会诊说明</span>
          <el-input :rows="3"
                    maxlength="500"
                    placeholder="请至少输入5个字"
                    type="textarea"
                    v-model="view.model.referralCause"></el-input>
          <span style="color: rgba(155, 155, 155, 1); font-size: 12px;">
            <span>最多可以输入500字，还可以输入</span>
            <span>{{ 500 - (view.model.referralCause ? view.model.referralCause.length : 0) }}</span>
            <span>字</span>
          </span>
        </el-form-item>
      </el-row>
      <el-row style="text-align: center; margin: 20px 0 0 0;">
        <el-form-item label=" ">
          <el-button @click="sendConsultaltion"
                     :disabled="isSending"
                     type="primary">提交</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <peace-dialog :visible.sync="dialog.visible"
                  title="选择会诊医生"
                  width="700px">
      <div>
        <el-input clearable
                  placeholder="请输入地区、医院或医生姓名"
                  style="width: 320px; margin-right: 40px;"
                  v-model="dialog.model.name"></el-input>
        <el-button @click="get"
                   round
                   type="primary">查询</el-button>
      </div>

      <hr />

      <peace-table pagination
                   ref="table">
        <peace-table-column label="医生头像"
                            prop="name"
                            width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.avartor"
                 style="width: 40px; height: 40px; border-radius: 50%;" />
          </template>
        </peace-table-column>
        <peace-table-column align="left"
                            header-align="left"
                            label="医生姓名"
                            prop="doctorName"
                            width="100px"></peace-table-column>
        <peace-table-column align="left"
                            header-align="left"
                            label="职称"
                            prop="doctorTitle"
                            width="100px"></peace-table-column>
        <peace-table-column label="科室"
                            prop="deptName"
                            width="100px"></peace-table-column>
        <peace-table-column align="left"
                            header-align="left"
                            label="医院"
                            prop="hospitalName"></peace-table-column>
        <peace-table-column fixed="right"
                            label="操作"
                            width="120px">
          <template slot-scope="scope">
            <el-button @click="chose(scope.row)"
                       type="text">选择</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </peace-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSending: false,

      view: {
        visible: false,

        model: {
          diagnose: undefined,
          doctorInfo: undefined,
          expectDate: undefined,
          expectTime: undefined,
          referralCause: undefined
        },

        rules: {
          diagnose: [{ required: true, message: '请输入疾病诊断', trigger: 'change' }],
          doctorInfo: [{ required: true, message: '请选择会诊医生', trigger: 'change' }],
          expectDate: [{ required: true, message: '请选择期望会诊时间', trigger: 'change' }],
          expectTime: [{ required: true, message: '请选择期望会诊时间', trigger: 'change' }],
          referralCause: [
            { required: true, message: '请输入会诊说明', trigger: 'change' },
            { min: 5, message: '请至少输入5个字', trigger: 'change' }
          ],

          pickerOptionsDate: {
            disabledDate(time) {
              return time.getTime() < new Date().formatDate('yyyy-MM-dd 00:00:00').toDate().getTime()
            }
          },

          pickerOptionsTime: {
            start: '08:00',
            step: '00:30',
            end: '18:00'
          }
        }
      },

      dialog: {
        visible: false,

        model: {
          name: undefined
        }
      }
    }
  },

  created() {
    const paramsForCase = {
      inquiry_no: this.$store.getters['inquiry/inquiryInfo'].inquiryNo
    }
    peace.service.inquiry.getCase(paramsForCase).then((res) => {
      this.view.model.diagnose = res.data.diagnose
    })
  },

  methods: {
    get() {
      const fetch = peace.service.consult.chooseDoctor
      const params = {
        inquiry_no: this.$store.getters['inquiry/inquiryInfo'].inquiryNo,
        keyword: this.dialog.model.name
      }

      this.$refs.table.loadData({
        fetch,
        params
      })
    },

    choseConsultaltion() {
      this.dialog.visible = true

      this.$nextTick(function () {
        this.get()
      })
    },

    chose(row) {
      this.dialog.visible = false

      this.view.model.doctorInfo = row

      this.$refs.form.validateField('doctorInfo')
    },

    sendConsultaltion() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 验证会诊时间
          if (dayjs(this.view.model.expectDate + ' ' + this.view.model.expectTime).toDate() <= new Date()) {
            $peace.util.warning('期望会诊时间不能小于当前时间')
          }
          // 开始会诊
          else {
            const params = {
              sourceInquiryNo: this.$store.getters['inquiry/inquiryInfo'].inquiryNo,
              sourcePatientId: this.$store.getters['inquiry/patientInfo'].patientId,
              sourceFamilyId: this.$store.getters['inquiry/patientInfo'].familyId,
              toDoctorId: this.view.model.doctorInfo.doctorId,
              expectDate: this.view.model.expectDate + ' ' + this.view.model.expectTime,
              consultExplain: this.view.model.referralCause,
              diagnose: this.view.model.diagnose
            }

            this.isSending = true
            peace.service.consult
              .doApply(params)
              .then(() => {
                const redirect = () => {
                  this.$msgbox.close()
                  this.$router.push('/record/consultation')
                }

                const msg = (
                  <span style="text-align: left; font-size: 14px;">
                    你的会诊已提交，可前往 【
                    <el-button type="text" onclick={redirect}>
                      会诊记录/我发起的
                    </el-button>
                    】 查看会诊进度
                  </span>
                )

                this.$msgbox({
                  title: '提交成功',
                  message: msg,
                  showConfirmButton: false,
                  type: 'success',
                  center: true
                })

                this.$emit('close')
              })
              .finally(() => {
                this.isSending = false
              })
          }
        }
      })
    },

    close() {
      this.$emit('close')
    }
  }
}
</script>


<style lang="scss">
/deep/ .el-message-box--center .el-message-box__status {
  padding-right: 15px;
  padding-top: 2px;
}
</style>

<style lang="scss" scoped>
.el-form {
  padding-top: 20px;
  padding-right: 20px;

  .el-form-item__label span {
    width: 6em;
    display: inline-block;
  }
}

.consultaltion-doctor {
  /deep/ .el-form-item--mini .el-form-item__label,
  /deep/ .el-form-item--mini .el-form-item__content {
    line-height: 40px;
  }

  &-info {
    display: inline-flex;
    align-items: center;

    span {
      margin: 0 10px;
    }
  }
}
</style>

