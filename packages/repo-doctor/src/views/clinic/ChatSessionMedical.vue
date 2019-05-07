<template>
  <div>
    <el-alert :closable="false" title="开处方" type="success">
      <div slot="title">
        <span>写病历</span>
        <i @click="cancelMedical" class="el-alert__closebtn el-icon-close"></i>
      </div>
    </el-alert>

    <el-form :model="medical.model" :rules="medical.rules" label-position="right" label-width="100px" ref="form">
      <el-row>
        <el-form-item label="就诊时间" prop="visit_date">
          <span slot="label">就诊时间</span>
          <span>{{ medical.model.visit_date }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="科别" prop="dep_id">
          <span slot="label">科别</span>
          <span>{{ $peace.cache.get('USER').list.docInfo.netdept_child }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="主诉" prop="base_illness">
          <span slot="label">主诉</span>
          <el-input :rows="3" placeholder type="textarea" v-model="medical.model.base_illness"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="现病史" prop="present_history">
          <span slot="label">现病史</span>
          <el-select
            :remote-method="getPresent"
            allow-create
            filterable
            multiple
            placeholder="请选择现病史"
            remote
            style="width: 100%;"
            v-model="medical.model.present_history"
          >
            <el-option :key="item.id" :label="item.name" :value="item.name" v-for="item in medical.source.present_history"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="过敏史" prop="allergy_history">
          <span slot="label">过敏史</span>
          <el-select
            :remote-method="getAllergy"
            allow-create
            filterable
            multiple
            placeholder="请选择过敏史"
            remote
            style="width: 100%;"
            v-model="medical.model.allergy_history"
          >
            <el-option :key="item.id" :label="item.name" :value="item.name" v-for="item in medical.source.allergy_history"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="既往史" prop="past_history">
          <span slot="label">既往史</span>
          <el-select
            :remote-method="getPresent"
            allow-create
            filterable
            multiple
            placeholder="请选择既往史"
            remote
            style="width: 100%;"
            v-model="medical.model.past_history"
          >
            <el-option :key="item.id" :label="item.name" :value="item.name" v-for="item in medical.source.present_history"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="检查指标">
          <span slot="label">检查指标</span>
          <div class="inspect">
            <div class="item">
              <span>体温</span>
              <el-input placeholder v-model="medical.model.Inspection_index.temperature"></el-input>
              <span>度</span>
            </div>
            <div class="item">
              <span>体重</span>
              <el-input placeholder v-model="medical.model.Inspection_index.weight"></el-input>
              <span>kg</span>
            </div>
            <div class="item">
              <span>心率</span>
              <el-input placeholder v-model="medical.model.Inspection_index.heart_rate"></el-input>
              <span>bpm</span>
            </div>
            <div class="item">
              <span>血压</span>
              <el-input placeholder v-model="medical.model.Inspection_index.blood_pressure_begin"></el-input>/
              <el-input placeholder v-model="medical.model.Inspection_index.blood_pressure_end"></el-input>
              <span>mmHg</span>
            </div>
          </div>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="辅助检查">
          <span slot="label">辅助检查</span>
          <el-input :rows="3" placeholder="请输入不少于10个字的描述" type="textarea" v-model="medical.model.Inspection_index.More"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="诊断" prop="diagnose">
          <span slot="label">诊断</span>
          <el-select
            :remote-method="getPresent"
            allow-create
            filterable
            multiple
            placeholder="请选择诊断"
            remote
            style="width: 100%;"
            v-model="medical.model.diagnose"
          >
            <el-option :key="item.id" :label="item.name" :value="item.name" v-for="item in medical.source.present_history"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="医嘱小结" prop="summary">
          <span slot="label">医嘱小结</span>
          <el-input placeholder v-model="medical.model.summary"></el-input>
        </el-form-item>
      </el-row>
      <el-row style="text-align: center;">
        <el-form-item label=" ">
          <el-button @click="sendMedical" type="primary">发送</el-button>
          <el-button @click="saveMedical" type="success" v-show="false">保存</el-button>
          <el-button @click="cancelMedical">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
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

      medical: {
        visible: false,

        model: {
          visit_date: new Date().formatDate(),
          dep_id: $peace.cache.get('USER').list.docInfo.netdept_childId,
          diagnose: '',
          Inspection_index: {
            blood_pressure_begin: '',
            blood_pressure_end: '',
            blood_pressure: ''
          }
        },

        rules: {
          visit_date: [{ required: true, message: '请输入就诊时间', trigger: 'blur' }],
          dep_id: [{ required: true, message: '请输入科别', trigger: 'blur' }],
          base_illness: [{ required: true, message: '请输入主诉', trigger: 'blur' }],
          diagnose: [{ required: true, message: '请输入诊断', trigger: 'blur' }]
        },

        source: {
          present_history: [],
          allergy_history: []
        }
      }
    }
  },

  computed: {
    ...mapState(['chat'])
  },

  watch: {
    'medical.model.Inspection_index.blood_pressure_begin'() {
      this.medical.model.Inspection_index.blood_pressure =
        this.medical.model.Inspection_index.blood_pressure_begin + '/' + this.medical.model.Inspection_index.blood_pressure_end
    },
    'medical.model.Inspection_index.blood_pressure_end'() {
      this.medical.model.Inspection_index.blood_pressure =
        this.medical.model.Inspection_index.blood_pressure_begin + '/' + this.medical.model.Inspection_index.blood_pressure_end
    }
  },

  mounted() {},

  methods: {
    ...mapMutations('chat', ['updateSessionMsg']),

    getPresent(query) {
      if (query !== '' && query.length > 0) {
        this.$http.post(this.config.api.getDiseaseInfo, { name: query }).then(res => {
          this.medical.source.present_history = res.data.list
        })
      } else {
        this.medical.source.present_history = []
      }
    },

    getAllergy(query) {
      if (query !== '' && query.length > 0) {
        this.$http.post(this.config.api.allergenList, { name: query }).then(res => {
          this.medical.source.allergy_history = res.data.list
        })
      } else {
        this.medical.source.allergy_history = []
      }
    },

    saveMedical() {
      this.medical.visible = false
    },

    sendMedical() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.medical.model.Inspection_index.More && this.medical.model.Inspection_index.More.length < 10) {
            $peace.util.warning('请输入至少 10 个字的辅助检查')
            return
          }
          if (this.medical.model.Inspection_index.temperature && !/^\d+(\.\d{1,1})?$/.test(this.medical.model.Inspection_index.temperature)) {
            $peace.util.warning('请输入正确的体温，最多保留一位小数')
            return
          }
          if (this.medical.model.Inspection_index.weight && !/^\d+(\.\d{1,1})?$/.test(this.medical.model.Inspection_index.weight)) {
            $peace.util.warning('请输入正确的体重，最多保留一位小数')
            return
          }
          if (this.medical.model.Inspection_index.heart_rate && !/^\d+(\.\d{1,1})?$/.test(this.medical.model.Inspection_index.heart_rate)) {
            $peace.util.warning('请输入正确的心率，最多保留一位小数')
            return
          }
          if (this.medical.model.Inspection_index.blood_pressure_begin && !/^\d+(\.\d{1,1})?$/.test(this.medical.model.Inspection_index.blood_pressure_begin)) {
            $peace.util.warning('请输入正确的血压，最多保留一位小数')
            return
          }
          if (this.medical.model.Inspection_index.blood_pressure_end && !/^\d+(\.\d{1,1})?$/.test(this.medical.model.Inspection_index.blood_pressure_end)) {
            $peace.util.warning('请输入正确的血压，最多保留一位小数')
            return
          }

          const params = {
            doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
            inquiry_no: this.chat.session.lastMsg.custom.ext.inquiryNo,
            patient_id: this.chat.session.lastMsg.custom.patients.patientId,
            family_id: this.chat.session.lastMsg.custom.patients.familyId,
            patient_name: this.chat.session.lastMsg.custom.patients.familyName,
            sex: this.chat.session.lastMsg.custom.patients.gender,
            age: this.chat.session.lastMsg.custom.patients.age,
            id_card: this.chat.session.lastMsg.custom.patients.idCard,

            ...this.medical.model
          }

          params.Inspection_index = JSON.stringify(params.Inspection_index)
          params.allergy_history = params.allergy_history.toString()
          params.past_history = params.past_history.toString()
          params.present_history = params.present_history.toString()
          params.diagnose = params.diagnose.toString()

          this.$http.post(this.config.api.addCase, params).then(res => {
            // 给患者发送一个 custom 消息, 用于显示
            // 1. 更改自定义消息体的状态
            const tempCustomData = $peace.util.clone(this.chat.session.lastMsg.custom)
            tempCustomData.ext.talkState = 3

            $peace.NIM.sendCustomMsg({
              type: 'custom',
              scene: 'p2p',
              to: this.chat.session.lastMsg.custom.patients.patientId,
              text: '',
              custom: JSON.stringify(tempCustomData),
              content: JSON.stringify({
                // 7 代表病历或处方消息
                type: 7,
                data: {
                  appMsg: '',
                  // 0 代表病历、1 代表处方
                  sendType: this.STATE.sendType.病历消息,
                  headImage: '',
                  prescriptionId: '',
                  time: new Date().formatDate(),
                  title: '病历'
                }
              }),
              done: (error, msg) => {
                if (error) {
                  $peace.util.alert(error.message)

                  return
                }
                console.log(new Date().formatTime() + ': ' + '消息发送成功', msg)

                this.updateSessionMsg(msg)
                this.$emit('close')
              }
            })

            $peace.util.alert(res.msg)
          })
        }
      })
    },

    cancelMedical() {
      $peace.util.confirm('确定要退出病历吗？当前所有数据将会被清除!', undefined, undefined, () => {
        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 20px;
  padding-right: 20px;

  .el-form-item__label span {
    text-align-last: justify;
    text-align: justify;
    text-justify: distribute-all-lines;
    width: 4em;
    display: inline-block;
  }
}

.inspect {
  display: flex;
  justify-content: space-between;

  margin: 0 0 5px 0;

  .item {
    margin: 0 5px 0 0;

    .el-input {
      width: 56px;
      padding: 0;

      border-top: none;
      border-right: none;
      border-bottom: 1px solid #d6d6d6;
      border-left: none;

      /deep/ .el-input__inner {
        border: none;
        padding: 0 10px;
      }
    }

    & :first-child {
      color: rgba(51, 51, 51, 1);
    }

    & :last-child {
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>

