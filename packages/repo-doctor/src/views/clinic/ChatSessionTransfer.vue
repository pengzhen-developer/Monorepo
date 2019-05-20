<template>
  <div>
    <el-alert :closable="false" title="双向转诊" type="success">
      <div slot="title">
        <span>双向转诊</span>
        <i @click="cancelTransfer" class="el-alert__closebtn el-icon-close"></i>
      </div>
    </el-alert>

    <el-form :model="view.model" :rules="view.rules" label-position="right" label-width="120px" ref="form">
      <el-row>
        <el-form-item label="初步诊断">
          <span slot="label">初步诊断</span>
          <span>{{ view.model.diagnose }}</span>
        </el-form-item>
      </el-row>
      <el-row class="transfer-doctor">
        <el-form-item label="转诊医生" prop="doctorInfo">
          <span slot="label">转诊医生</span>
          <el-button @click="choseTransfer" style="min-width: auto;" type="text" v-show="!view.model.doctorInfo">请选择</el-button>
          <template v-if="view.model.doctorInfo">
            <div class="transfer-doctor-info">
              <img :src="view.model.doctorInfo.photoDoc" style="width: 40px; height: 40px; border-radius: 50%;">
              <span style="font-size:16px; font-weight:700;">{{view.model.doctorInfo.name }}</span>
              <span>{{view.model.doctorInfo.doctor_title }}</span>
              <span>{{view.model.doctorInfo.netdept_name }}</span>
              <span>{{view.model.doctorInfo.netHospital_name }}</span>
              <el-button @click="choseTransfer" style="min-width: auto;" type="text" v-show="view.model.doctorInfo">修改</el-button>
            </div>
          </template>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="期望转诊时间" prop="expectDate" style="display: inline-block;">
          <span slot="label">期望转诊时间</span>
          <el-date-picker
            :picker-options="view.rules.pickerOptionsDate"
            placeholder
            style="width: 145px;"
            v-model="view.model.expectDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label label-width="0" prop="expectTime" style="display: inline-block; ">
          <el-time-select
            :picker-options="view.rules.pickerOptionsTime"
            placeholder
            style="width: 110px; margin-left: 5px;"
            v-model="view.model.expectTime"
            value-format="HH:mm"
          ></el-time-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转诊说明" prop="referralCause">
          <span slot="label">转诊说明</span>
          <el-input :rows="3" placeholder type="textarea" v-model="view.model.referralCause"></el-input>
        </el-form-item>
      </el-row>
      <el-row style="text-align: center; margin: 20px 0 0 0;">
        <el-form-item label=" ">
          <el-button @click="sendTransfer" type="primary">提交</el-button>
          <el-button @click="cancelTransfer">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <peace-dialog :visible.sync="dialog.visible" title="选择转诊医生" width="700px">
      <div>
        <el-input clearable placeholder="请输入地区、医院或医生姓名" style="width: 320px; margin-right: 40px;" v-model="dialog.model.name"></el-input>
        <el-button @click="get" round type="primary">查询</el-button>
      </div>

      <hr>

      <peace-table pagination ref="table">
        <peace-table-column label="医生头像" prop="name" width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.photoDoc" style="width: 40px; height: 40px; border-radius: 50%;">
          </template>
        </peace-table-column>
        <peace-table-column align="left" header-align="left" label="医生姓名" prop="name" width="100px"></peace-table-column>
        <peace-table-column align="left" header-align="left" label="职称" prop="doctor_title" width="100px"></peace-table-column>
        <peace-table-column label="科室" prop="netdept_name" width="100px"></peace-table-column>
        <peace-table-column align="left" header-align="left" label="医院" prop="netHospital_name"></peace-table-column>
        <peace-table-column fixed="right" label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="chose(scope.row)" type="text">选择</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </peace-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import { STATE } from './util'
import config from './config'

export default {
  data() {
    return {
      STATE,
      config,

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
          diagnose: [{ required: true, message: '请输入初步诊断', trigger: 'change' }],
          doctorInfo: [{ required: true, message: '请选择转诊医生', trigger: 'change' }],
          expectDate: [{ required: true, message: '请选择期望转诊时间', trigger: 'change' }],
          expectTime: [{ required: true, message: '请选择期望转诊时间', trigger: 'change' }],
          referralCause: [{ required: true, message: '请输入转诊说明', trigger: 'change' }],

          pickerOptionsDate: {
            disabledDate(time) {
              return (
                time.getTime() <
                new Date()
                  .formatDate('yyyy-MM-dd 00:00:00')
                  .toDate()
                  .getTime()
              )
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

  computed: {
    ...mapState(['chat'])
  },

  created() {
    this.$http.post(this.config.api.getCase, { inquiry_no: this.chat.session.lastMsg.custom.ext.inquiryNo }).then(res => {
      this.view.model.diagnose = res.data.diagnose
    })
  },

  mounted() {},

  methods: {
    ...mapMutations('chat', ['clearSession']),

    get() {
      this.$refs.table.loadData({
        api: this.config.api.referralDocListPc,
        params: { inquiry_no: this.chat.session.lastMsg.custom.ext.inquiryNo, name: this.dialog.model.name }
      })
    },

    choseTransfer() {
      this.dialog.visible = true

      this.$nextTick(function() {
        this.get()
      })
    },

    chose(row) {
      this.dialog.visible = false

      this.view.model.doctorInfo = row

      this.$refs.form.validate()
    },

    sendTransfer() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 验证转诊时间
          if (new Date(this.view.model.expectDate + ' ' + this.view.model.expectTime) <= new Date()) {
            $peace.util.warning('期望转诊时间不能小于当前时间')
          }
          // 开始转诊
          else {
            this.$emit('close')

            const params = {
              doctor_id: this.view.model.doctorInfo.doctor_id,
              patient_id: this.chat.session.lastMsg.custom.patients.patientId,
              family_id: this.chat.session.lastMsg.custom.patients.familyId,
              inquiry_no: this.chat.session.lastMsg.custom.ext.inquiryNo,
              referral_cause: this.view.model.referralCause,
              expect_time: this.view.model.expectDate + ' ' + this.view.model.expectTime
            }

            this.$http.post(this.config.api.addReferral, params).then(() => {
              const redirect = () => {
                this.$msgbox.close()
                this.$router.push('/record/transfer')
              }

              const msg = (
                <span style="text-align: left; font-size: 14px;">
                  你的转诊已提交，可前往 【
                  <el-button type="text" onclick={redirect}>
                    转诊记录/我的转诊
                  </el-button>
                  】 查看转诊进度
                </span>
              )

              this.$msgbox({
                title: '提交成功',
                message: msg,
                showConfirmButton: false,
                type: 'success',
                center: true
              })

              this.clearSession()
            })
          }
        }
      })
    },

    cancelTransfer() {
      $peace.util.confirm('确定要退出转诊吗？当前所有数据将会被清除!', undefined, undefined, () => {
        this.$emit('close')
      })
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
    // text-align-last: justify;
    // text-align: justify;
    // text-justify: distribute-all-lines;
    width: 6em;
    display: inline-block;
  }
}

.transfer-doctor {
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

