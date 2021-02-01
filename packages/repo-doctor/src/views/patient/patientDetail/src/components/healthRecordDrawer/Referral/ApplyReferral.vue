<template>
  <div>
    <el-form :model="view.model"
             :rules="view.rules"
             label-position="left"
             label-width="110px"
             ref="form">
      <el-row>
        <el-form-item label="转诊患者">
          <span slot="label">转诊患者</span>
          <span class="patientStyle">{{ params.familyInfo.name }} {{ params.familyInfo.sex }}
            {{ params.familyInfo.age }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="初步诊断"
                      prop="diagnose">
          <span slot="label">初步诊断</span>
          <el-button @click="choseDiagnose"
                     style="min-width: 30px; text-decoration-line: underline;"
                     type="text"
                     v-show="!view.model.diagnose || view.model.diagnose.length == 0">请选择
          </el-button>

          <div class="diagnoseStyle"
               v-if="view.model.diagnose && view.model.diagnose.length > 0">
            <div class="diagnoseStyleTop">
              <el-tag :key="item.id"
                      class="tag"
                      type="info"
                      v-for="item in view.model.diagnose">{{ item.name }}</el-tag>
            </div>
            <el-button @click="changeDialog"
                       style="width: 30px; text-decoration-line: underline;"
                       type="text">修改</el-button>
          </div>
        </el-form-item>
      </el-row>
      <el-row class="transfer-doctor">
        <el-form-item label="转诊医生"
                      prop="doctorInfo">
          <span slot="label">转诊医生</span>
          <el-button @click="choseTransfer"
                     style="min-width: auto; text-decoration-line: underline;"
                     type="text"
                     v-show="!view.model.doctorInfo">请选择</el-button>
          <template v-if="view.model.doctorInfo">
            <div class="transfer-doctor-info">
              <div class="topLine">
                <div>
                  <img :src="view.model.doctorInfo.photoDoc"
                       style="width: 40px; height: 40px; border-radius: 50%;" />
                  <span style="font-size:16px; font-weight:700;">{{ view.model.doctorInfo.name }}</span>
                  <span>{{ view.model.doctorInfo.doctor_title }}</span>
                </div>
                <div>
                  <el-button @click="choseTransfer"
                             style="min-width: auto; text-decoration-line: underline;"
                             type="text"
                             v-show="view.model.doctorInfo">修改</el-button>
                </div>
              </div>
              <div>
                <span>{{ view.model.doctorInfo.netdept_child }}</span>
                <span>{{ view.model.doctorInfo.netHospital_name }}</span>
              </div>
            </div>
          </template>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="转诊说明"
                      prop="referralCause">
          <span slot="label">转诊说明</span>
          <el-input :rows="5"
                    maxlength="500"
                    placeholder="请输入转诊说明"
                    type="textarea"
                    show-word-limit
                    v-model.trim="view.model.referralCause"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="期望转诊时间"
                      prop="expectDate"
                      style="display: inline-block;">
          <span slot="label">期望转诊时间</span>
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
                          style="width: 105px; margin-left: 10px;"
                          v-model="view.model.expectTime"
                          value-format="HH:mm"></el-time-select>
        </el-form-item>
      </el-row>

      <el-row style="text-align: center;">
        <el-button style="width: 140px; margin-top: 50px;"
                   @click="sendTransfer"
                   type="primary">提交</el-button>
      </el-row>
    </el-form>

    <peace-dialog :append-to-body="true"
                  :visible.sync="dialog.visible"
                  title="选择转诊医生"
                  width="700px">
      <div>
        <el-input clearable
                  placeholder="请输入医院或医生姓名"
                  style="width: 320px; margin-right: 40px;"
                  v-model="dialog.model.name"></el-input>
        <el-button @click="get"
                   type="primary">查询</el-button>
      </div>
      <hr />
      <PeaceTable pagination
                  ref="table">
        <PeaceTableColumn label="医生头像"
                          prop="name"
                          width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.photoDoc"
                 style="width: 40px; height: 40px; border-radius: 50%;" />
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="医生姓名"
                          prop="name"
                          width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="职称"
                          prop="doctor_title"
                          width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="科室"
                          prop="netdept_child"
                          width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="医院"
                          prop="netHospital_name"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="120px">
          <template slot-scope="scope">
            <el-button @click="chose(scope.row)"
                       type="text">选择</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </peace-dialog>

    <peace-dialog :append-to-body="true"
                  title="初步诊断"
                  :visible.sync="dialog.diagnoseVisible">
      <div style="margin-bottom: 10px">
        <el-select :remote-method="getPresent"
                   @change="chooseItem"
                   filterable
                   placeholder="请输入初步诊断"
                   remote
                   style="width: 100%;"
                   v-model="dialog.chooseItem">
          <el-option :key="item.id"
                     :label="item.name"
                     :value="item.name"
                     v-for="item in dialog.source.present_history"></el-option>
        </el-select>
      </div>

      <div style="margin: 10px 0;"
           v-if="dialog.chooseData.length > 0">
        <p>已选诊断</p>

        <div style="margin: 10px 0;">
          <el-tag :key="item.id"
                  @close="closeItem(item)"
                  closable
                  style="margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
                  v-for="item in dialog.chooseData">{{ item.name }}</el-tag>
        </div>
      </div>

      <div style="margin: 10px 0;">
        <p>常见诊断</p>

        <div style="margin: 10px 0;">
          <el-tag :key="item.id"
                  :type="dialog.chooseData.findIndex((existItem) => existItem.id === item.id) === -1 ? 'info' : 'primary'"
                  @click="chooseItem(item)"
                  style="cursor: pointer; margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
                  v-for="item in dialog.source.IllnessList">{{ item.name }}</el-tag>
        </div>
      </div>

      <div style="margin-bottom: 10px; text-align: center;">
        <el-button @click="dialog.diagnoseVisible = false">取消</el-button>
        <el-button @click="saveItem"
                   type="primary">保存</el-button>
      </div>
    </peace-dialog>
  </div>
</template>

<script>
export default {
  props: {
    params: undefined
  },
  created() {
    Peace.service.patient.IllnessList().then((res) => {
      this.dialog.source.IllnessList = res.data.list
    })
  },

  data() {
    return {
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
        // 已选中项
        chooseData: [],
        // 当前选中项
        chooseItem: '',
        // 远程搜素数据源
        source: {
          present_history: [],
          // 诊断
          IllnessList: []
        },
        diagnoseVisible: false,

        model: {
          name: undefined
        }
      }
    }
  },
  methods: {
    get() {
      const fetch = Peace.service.inquiry.referralDocListPc
      const params = {
        sourceAction: 'offline',
        name: this.dialog.model.name
      }

      this.$refs.table.loadData({
        fetch,
        params
      })
    },

    getPresent(query) {
      if (query !== '' && query.length > 0) {
        const params = { name: query }
        Peace.service.patient.getDiseaseInfo(params).then((res) => {
          this.dialog.source.present_history = res.data.list
        })
      } else {
        this.dialog.source.present_history = []
      }
    },

    choseTransfer() {
      this.dialog.visible = true

      this.$nextTick(function() {
        this.get()
      })
    },

    choseDiagnose() {
      this.dialog.chooseData = []
      this.dialog.diagnoseVisible = true
    },

    changeDialog() {
      this.choseDiagnose()

      this.$nextTick(function() {
        this.dialog.chooseData = [...this.view.model.diagnose]
      })
    },

    chooseItem(item) {
      if (!item.id) {
        item = {
          name: item
        }
      }
      const index = this.dialog.chooseData.findIndex((existItem) => existItem.id === item.id && existItem.name === item.name)
      if (index === -1) {
        this.dialog.chooseData.push(item)
        // 选中后， 清空状态
        this.dialog.chooseItem = ''
        this.dialog.source.present_history = []
      }
      this.$refs.form.validateField('diagnose')
    },
    closeItem(item) {
      const index = this.dialog.chooseData.findIndex((existItem) => existItem === item)
      if (index !== -1) {
        this.dialog.chooseData.splice(index, 1)
        if (this.dialog.chooseData.length == 0) {
          this.dialog.chooseItem = ''
          this.view.model.diagnose = undefined
        }
      }
      this.$refs.form.validateField('diagnose')
    },
    saveItem() {
      this.view.model.diagnose = [...this.dialog.chooseData]
      this.dialog.diagnoseVisible = false
      this.$refs.form.validateField('diagnose')
    },

    sendTransfer() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 验证转诊时间
          if (Peace.dayjs(this.view.model.expectDate + ' ' + this.view.model.expectTime).toDate() <= new Date()) {
            Peace.util.warning('期望转诊时间不能小于当前时间')
          }
          // 开始转诊
          else {
            const tmp = this.view.model.diagnose && this.view.model.diagnose.map((item) => item.name).toString()

            const params = {
              doctorId: this.view.model.doctorInfo.doctor_id,
              patientNo: this.params.id,
              referralCause: this.view.model.referralCause,
              expectTime: this.view.model.expectDate + ' ' + this.view.model.expectTime,
              diagnose: tmp.replace(/,/g, ' | ')
            }

            Peace.service.health.offlineAddReferral(params).then(() => {
              Peace.$emit('showDrawer', { index: Peace.type.HEALTH_RECORD.ACTION_TYPE.转诊 })

              Peace.util.success('发起转诊成功')
            })
          }
        }
      })
    },

    chose(row) {
      this.dialog.visible = false

      this.view.model.doctorInfo = row

      this.$refs.form.validateField('doctorInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding: 10px 15px;

  .el-form-item {
    .tag {
      margin: 2px 10px 2px 0;
      min-width: 62px;
      text-align: center;
      border: none;
      border-radius: 2px;
      height: 28px;
      line-height: 28px;
    }

    .patientStyle {
      width: 124px;
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
  }

  .el-form-item__label span {
    font-size: 14px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;

    &:after {
      content: '：';
    }
  }

  /deep/ .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before,
  .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before {
    content: '';
    margin: 0;
  }

  .el-button {
    font-size: 14px;
    font-weight: 400;
  }
}

.diagnoseStyle {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  .diagnoseStyleTop {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
}

.transfer-doctor {
  &-info {
    display: flex;
    flex-direction: column;
    justify-items: center;

    .topLine {
      :nth-child(1) {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    /* align-items: center; */
    span {
      margin: 0 10px;
    }
  }
}
</style>
