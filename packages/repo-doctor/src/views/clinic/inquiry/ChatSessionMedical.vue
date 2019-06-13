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
            placeholder="请输入现病史"
            remote
            style="width: 100%;"
            v-model="medical.model.present_history"
          >
            <el-option :key="item.id" :label="item.name" :value="item.name" v-for="item in dialog.source.present_history"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="过敏史" prop="allergy_history">
          <span slot="label">过敏史</span>
          <template v-if="medical.model.allergy_history && medical.model.allergy_history.length > 0">
            <el-tag
              :key="item.id"
              style="margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
              type="info"
              v-for="item in medical.model.allergy_history"
            >{{ item.name }}</el-tag>
            <el-button @click="changedialog('过敏史')" type="text">修改</el-button>
          </template>

          <template v-else>
            <el-button @click="showdialog('过敏史')" type="text">请选择</el-button>
          </template>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="既往史" prop="past_history">
          <span slot="label">既往史</span>

          <template v-if="medical.model.past_history && medical.model.past_history.length > 0">
            <el-tag
              :key="item.id"
              style="margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
              type="info"
              v-for="item in medical.model.past_history"
            >{{ item.name }}</el-tag>
            <el-button @click="changedialog('既往史')" type="text">修改</el-button>
          </template>

          <template v-else>
            <el-button @click="showdialog('既往史')" type="text">请选择</el-button>
          </template>
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
              <el-input placeholder v-model="medical.model.blood_pressure_begin"></el-input>/
              <el-input placeholder v-model="medical.model.blood_pressure_end"></el-input>
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
          <template v-if="medical.model.diagnose && medical.model.diagnose.length > 0">
            <el-tag
              :key="item.id"
              style="margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
              type="info"
              v-for="item in medical.model.diagnose"
            >{{ item.name }}</el-tag>
            <el-button @click="changedialog('诊断')" type="text">修改</el-button>
          </template>

          <template v-else>
            <el-button @click="showdialog('诊断')" type="text">请选择</el-button>
          </template>
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
          <el-button @click="cancelMedical">取消</el-button>
          <el-button @click="saveMedical" type="success" v-show="false">保存</el-button>
          <el-button @click="sendMedical" type="primary">发送</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-dialog :title="'添加' + dialog.title" :visible.sync="dialog.visible">
      <div style="margin-bottom: 10px">
        <template v-if="dialog.title === '过敏史'">
          <el-select
            :remote-method="getAllergy"
            @change="chooseItem"
            allow-create
            filterable
            placeholder="请输入过敏史"
            remote
            style="width: 100%;"
            v-model="dialog.chooseItem"
            value-key="id"
          >
            <el-option :key="item.id" :label="item.name" :value="item" v-for="item in dialog.source.allergy_history"></el-option>
          </el-select>
        </template>
        <template v-if="dialog.title === '既往史'">
          <el-select
            :remote-method="getPresent"
            @change="chooseItem"
            allow-create
            filterable
            placeholder="请输入既往史"
            remote
            style="width: 100%;"
            v-model="dialog.chooseItem"
          >
            <el-option :key="item.id" :label="item.name" :value="item.name" v-for="item in dialog.source.present_history"></el-option>
          </el-select>
        </template>
        <template v-if="dialog.title === '诊断'">
          <el-select
            :remote-method="getPresent"
            @change="chooseItem"
            allow-create
            filterable
            placeholder="请输入诊断"
            remote
            style="width: 100%;"
            v-model="dialog.chooseItem"
          >
            <el-option :key="item.id" :label="item.name" :value="item.name" v-for="item in dialog.source.present_history"></el-option>
          </el-select>
        </template>
      </div>

      <div style="margin: 10px 0;" v-if="dialog.chooseData.length > 0">
        <p>已选{{dialog.title}}</p>

        <div style="margin: 10px 0;">
          <el-tag
            :key="item.id"
            @close="closeItem(item)"
            closable
            style="margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
            v-for="item in dialog.chooseData"
          >{{ item.name }}</el-tag>
        </div>
      </div>

      <template v-if="dialog.title === '诊断'">
        <div style="margin: 10px 0;">
          <p>常见{{dialog.title}}</p>

          <div style="margin: 10px 0;">
            <el-tag
              :key="item.id"
              :type="dialog.chooseData.findIndex(existItem => existItem.id === item.id) === -1 ? 'info' : 'primary'"
              @click="chooseItem(item)"
              style="cursor: pointer; margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
              v-for="item in dialog.source.IllnessList"
            >{{ item.name }}</el-tag>
          </div>
        </div>
      </template>

      <template v-if="dialog.title === '过敏史'">
        <div style="margin: 10px 0;">
          <p>常见{{dialog.title}}</p>

          <div style="margin: 10px 0;">
            <el-tag
              :key="item.id"
              :type="dialog.chooseData.findIndex(existItem => existItem.id === item.id) === -1 ? 'info' : 'primary'"
              @click="chooseItem(item)"
              style="cursor: pointer; margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
              v-for="item in dialog.source.allergens"
            >{{ item.name }}</el-tag>
          </div>
        </div>
      </template>

      <template v-if="dialog.title === '既往史'">
        <div style="margin: 10px 0;">
          <p>常见{{dialog.title}}</p>

          <div style="margin: 10px 0;">
            <el-tag
              :key="item.id"
              :type="dialog.chooseData.findIndex(existItem => existItem.id === item.id) === -1 ? 'info' : 'primary'"
              @click="chooseItem(item)"
              style="cursor: pointer; margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
              v-for="item in dialog.source.OldIllnessList"
            >{{ item.name }}</el-tag>
          </div>
        </div>
      </template>

      <div style="margin-bottom: 10px; text-align: center;">
        <el-button @click="saveItem" type="primary">保存</el-button>
        <el-button @click="dialog.visible = false">取消</el-button>
      </div>
    </el-dialog>
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
          blood_pressure_begin: '',
          blood_pressure_end: '',
          Inspection_index: {
            blood_pressure: '',
            temperature: '',
            weight: '',
            heart_rate: '',
            More: ''
          }
        },

        rules: {
          visit_date: [{ required: true, message: '请输入就诊时间', trigger: 'blur' }],
          dep_id: [{ required: true, message: '请输入科别', trigger: 'blur' }],
          base_illness: [{ required: true, message: '请输入主诉', trigger: 'blur' }],
          diagnose: [{ required: true, message: '请输入诊断', trigger: 'blur' }]
        }
      },

      dialog: {
        visible: false,

        // 标题
        title: '',
        // 已选中项
        chooseData: [],
        // 当前选中项
        chooseItem: '',

        // 远程搜素数据源
        source: {
          present_history: [],
          allergy_history: [],

          // 过敏史
          allergens: [],
          // 既往史
          OldIllnessList: [],
          // 诊断
          IllnessList: []
        }
      }
    }
  },

  computed: {
    ...mapState(['chat'])
  },

  watch: {
    'medical.model.blood_pressure_begin'() {
      this.medical.model.Inspection_index.blood_pressure = this.medical.model.blood_pressure_begin + '/' + this.medical.model.blood_pressure_end
    },
    'medical.model.blood_pressure_end'() {
      this.medical.model.Inspection_index.blood_pressure = this.medical.model.blood_pressure_begin + '/' + this.medical.model.blood_pressure_end
    }
  },

  created() {
    this.$http.post(this.config.api.allergens).then(res => {
      this.dialog.source.allergens = res.data.list
    })
    this.$http.post(this.config.api.IllnessList).then(res => {
      this.dialog.source.IllnessList = res.data.list
    })
    this.$http.post(this.config.api.OldIllnessList).then(res => {
      this.dialog.source.OldIllnessList = res.data.list
    })
  },

  mounted() {},

  methods: {
    ...mapMutations('chat', ['updateSessionMsg']),

    getPresent(query) {
      if (query !== '' && query.length > 0) {
        this.$http.post(this.config.api.getDiseaseInfo, { name: query }).then(res => {
          this.dialog.source.present_history = res.data.list
        })
      } else {
        this.dialog.source.present_history = []
      }
    },

    getAllergy(query) {
      if (query !== '' && query.length > 0) {
        this.$http.post(this.config.api.allergenList, { name: query }).then(res => {
          this.dialog.source.allergy_history = res.data.list
        })
      } else {
        this.dialog.source.allergy_history = []
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
          if (this.medical.model.blood_pressure_begin && !/^\d+(\.\d{1,1})?$/.test(this.medical.model.blood_pressure_begin)) {
            $peace.util.warning('请输入正确的血压，最多保留一位小数')
            return
          }
          if (this.medical.model.blood_pressure_end && !/^\d+(\.\d{1,1})?$/.test(this.medical.model.blood_pressure_end)) {
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
          params.present_history = params.present_history.toString()
          params.allergy_history = params.allergy_history && params.allergy_history.map(item => item.name).toString()
          params.past_history = params.past_history && params.past_history.map(item => item.name).toString()
          params.diagnose = params.diagnose && params.diagnose.map(item => item.name).toString()

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

    showdialog(title) {
      this.dialog.title = title
      this.dialog.chooseData = []

      this.dialog.visible = true
    },

    changedialog(title) {
      this.showdialog(title)

      this.$nextTick(function() {
        if (title === '过敏史') {
          this.dialog.chooseData = [...this.medical.model.allergy_history]
        } else if (title === '既往史') {
          this.dialog.chooseData = [...this.medical.model.past_history]
        } else if (title === '诊断') {
          this.dialog.chooseData = [...this.medical.model.diagnose]
        }
      })
    },

    chooseItem(item) {
      if (!item.id) {
        item = {
          name: item
        }
      }
      if (this.dialog.title === '过敏史') {
        if (item.name === '无') {
          this.dialog.chooseData = []
        } else {
          const index = this.dialog.chooseData.findIndex(existItem => existItem.name === '无')

          if (index !== -1) {
            this.dialog.chooseData.splice(index, 1)
          }
        }
      }

      const index = this.dialog.chooseData.findIndex(existItem => existItem.id === item.id && existItem.name === item.name)

      if (index === -1) {
        this.dialog.chooseData.push(item)

        // 选中后， 清空状态
        this.dialog.chooseItem = ''
        this.dialog.source.present_history = []
        this.dialog.source.allergy_history = []
      }
    },

    closeItem(item) {
      const index = this.dialog.chooseData.findIndex(existItem => existItem === item)

      if (index !== -1) {
        this.dialog.chooseData.splice(index, 1)
      }
    },

    saveItem() {
      if (this.dialog.title === '过敏史') {
        this.medical.model.allergy_history = [...this.dialog.chooseData]
      } else if (this.dialog.title === '既往史') {
        this.medical.model.past_history = [...this.dialog.chooseData]
      } else if (this.dialog.title === '诊断') {
        this.medical.model.diagnose = [...this.dialog.chooseData]
      }

      console.log(this.hasExist)
      console.log(this.hasExistNative)

      this.dialog.visible = false
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

