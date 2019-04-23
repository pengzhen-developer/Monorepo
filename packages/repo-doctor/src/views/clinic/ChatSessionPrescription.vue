<template>
  <div>
    <el-alert :closable="false" title="开处方" type="success">
      <div slot="title">
        <span>开处方</span>
        <i @click="cancelPrescription" class="el-alert__closebtn el-icon-close"></i>
      </div>
    </el-alert>

    <div class="perscription">
      <h4>初步诊断</h4>
      <div>
        <span>{{ drug.diagnose }}</span>
      </div>

      <h4>过敏史</h4>
      <div>
        <span>{{ drug.allergy_history }}</span>
      </div>
      <hr>

      <h4>
        <span>处方药品</span>
        <span style="color: #9B9B9B">（最多可添加 5 种药品）</span>

        <el-button @click="openDrugDialog" type="text">添加药品</el-button>
      </h4>

      <peace-table :data="prescription.source.list" ref="table">
        <peace-table-column label="药品名称" prop="drug_name" show-overflow-tooltip></peace-table-column>
        <peace-table-column label="用法" prop="dic_usage" width="80px"></peace-table-column>
        <peace-table-column label="用量">
          <template slot-scope="scope">
            {{ scope.row.dic_frequency }}
            <br>
            一次
            {{ scope.row.consump }} {{ scope.row.unit }}
          </template>
        </peace-table-column>
        <peace-table-column label="数量" prop="number" width="80px"></peace-table-column>
        <peace-table-column align="center" label="操作" width="80px">
          <template slot-scope="scope">
            <el-button @click="changeDrugToPrescription(scope)" type="text">修改</el-button>
            <br>
            <el-button @click="removeDrugToPrescription(scope)" type="text">删除</el-button>
          </template>
        </peace-table-column>
      </peace-table>

      <hr>

      <div style="text-align: center;">
        <el-button @click="sendPrescription" type="primary">发送</el-button>
        <el-button @click="savePrescription" type="success">保存</el-button>
        <el-button @click="cancelPrescription">取消</el-button>
      </div>
    </div>

    <el-dialog :visible.sync="drug.visible" title="新增药品" width="720px">
      <el-form :model="drug.model" :rules="drug.rules" label-position="right" label-width="80px" ref="form">
        <el-form-item label="药品名称" prop="drugid">
          <el-autocomplete
            :fetch-suggestions="querySearchAsync"
            @select="handleSelectDrug"
            placeholder
            popper-class="drug-autocomplete"
            style="width: 100%;"
            v-model="drug.model.drug_name"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.drug_name }}</div>
              <span class="addr">{{ item.drug_factory }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label="药品数量" prop="number">
              <el-input placeholder v-model.number="drug.model.number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用药天数" prop="medication_days">
              <el-input placeholder v-model.number="drug.model.medication_days"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="给药途径" prop="dic_usage_id">
              <el-select @change="dicUsageChange" placeholder v-model="drug.model.dic_usage_id">
                <el-option :key="item.id" :label="item.drugway_name" :value="item.id" v-for="item in drug.source.dic_usage"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="单次剂量" prop="consump">
              <el-input placeholder style="width: 120px; margin-right: 10px;" v-model.number="drug.model.consump"></el-input>
              {{ drug.model.unit }}
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="用药频次" prop="dic_frequency_id">
              <el-select @change="dicFrequencyChange" placeholder style="width: 100%;" v-model="drug.model.dic_frequency_id">
                <el-option :key="item.id" :label="item.drugtimes_name" :value="item.id" v-for="item in drug.source.dic_frequency"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click="addDrug" round style="float: right;" type="primary" v-show="drug.action === drug.ACTION_TYPE.INSERT">添加到处方</el-button>
          <el-button @click="saveDrug" round style="float: right;" type="primary" v-show="drug.action === drug.ACTION_TYPE.EDIT">保存修改</el-button>
        </el-row>
      </el-form>

      <h4>
        <span>已选药品</span>
        <span style="color: #9B9B9B">（最多可添加 5 种药品）</span>
      </h4>
      <peace-table :data="drug.source.list" ref="table">
        <peace-table-column label="药品名称" prop="drug_name" show-overflow-tooltip></peace-table-column>
        <peace-table-column label="用法" prop="dic_usage" width="80px"></peace-table-column>
        <peace-table-column label="用量">
          <template slot-scope="scope">
            {{ scope.row.dic_frequency }}
            <br>
            一次{{ scope.row.consump }} {{ scope.row.unit }}
          </template>
        </peace-table-column>
        <peace-table-column label="数量" prop="number" width="80px"></peace-table-column>
        <peace-table-column align="center" label="操作" width="80px">
          <template slot-scope="scope">
            <el-button @click="changeDrug(scope)" type="text">修改</el-button>
            <br>
            <el-button @click="removeDrug(scope)" type="text">删除</el-button>
          </template>
        </peace-table-column>
      </peace-table>

      <hr>

      <div style="text-align: center;">
        <el-button @click="cancelDrug">取消</el-button>
        <el-button @click="saveDrugToPrescription" type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { state } from './util'

const ACTION_TYPE = {
  EDIT: 'EDIT',
  INSERT: 'INSERT'
}

export default {
  props: {
    session: Object
  },

  data() {
    return {
      api: {
        drugUsageList: 'client/v1/Prescribeprescrip/drugUsageList',
        drugFrequencyList: 'client/v1/Prescribeprescrip/drugFrequencyList',
        drugsList: 'client/v1/Prescribeprescrip/drugsList',
        drugsListById: 'client/v1/Prescribeprescrip/drugsListById',

        getCase: 'client/v1/inquiry/getCase',
        subPrescrip: 'client/v1/Prescribeprescrip/subPrescrip'
      },

      prescription: {
        source: {
          list: []
        }
      },

      drug: {
        ACTION_TYPE: ACTION_TYPE,

        action: ACTION_TYPE.INSERT,

        visible: false,

        diagnose: '',
        allergy_history: '',

        model: {
          drugid: undefined,
          drug_name: undefined,
          drug_factory: undefined,
          drug_spec: undefined,
          unit: undefined,

          consump: undefined,
          number: undefined,

          medication_days: undefined,
          dic_usage: undefined,
          dic_usage_id: undefined,
          dic_frequency: undefined,
          dic_frequency_id: undefined
        },

        rules: {
          drugid: [{ required: true, message: '请输入药品名称', trigger: 'blur' }],
          number: [
            { required: true, message: '请输入药品数量', trigger: 'blur' },
            { pattern: $peace.valid.pattern.pInterger, message: '请输入正确的药品数量', trigger: 'change' }
          ],
          medication_days: [
            { required: true, message: '请输入用药天数', trigger: 'blur' },
            { pattern: $peace.valid.pattern.pInterger, message: '请输入正确的用药天数', trigger: 'change' }
          ],
          consump: [
            { required: true, message: '请输入单次剂量', trigger: 'blur' },
            { pattern: $peace.valid.pattern.pInterger, message: '请输入正确的单次剂量', trigger: 'change' }
          ],
          dic_usage_id: [{ required: true, message: '请输入给药途径', trigger: 'blur' }],
          dic_frequency_id: [{ required: true, message: '请输入用药频次', trigger: 'blur' }]
        },

        source: {
          list: [],

          dic_usage: [],
          dic_frequency: []
        }
      }
    }
  },

  watch: {
    'prescription.source.list'(val) {
      if (val.length > 5) {
        $peace.util.warning('处方药品最多可添加 5 种药品')

        val.splice(5, 1)
      }
    },

    'drug.source.list'(val) {
      if (val.length > 5) {
        $peace.util.warning('处方药品最多可添加 5 种药品')

        val.splice(5, 1)
      }
    }
  },

  created() {
    this.$http.get(this.api.drugUsageList, { params: { hospitalId: $peace.cache.get('USER').list.docInfo.netHospital_id } }).then(res => {
      this.drug.source.dic_usage = res.data
    })

    this.$http.get(this.api.drugFrequencyList, { params: { hospitalId: $peace.cache.get('USER').list.docInfo.netHospital_id } }).then(res => {
      this.drug.source.dic_frequency = res.data
    })

    this.$http.post(this.api.getCase, { inquiry_no: this.session.custom.ext.inquiryNo }).then(res => {
      this.drug.diagnose = res.data.diagnose
      this.drug.allergy_history = res.data.allergy_history
    })
  },

  mounted() {
    this.$nextTick(function() {
      const scrollElement = document.body.querySelector('.layout-center .el-scrollbar__wrap')
      scrollElement.scrollTop = 0
    })
  },

  methods: {
    // 搜索药品
    querySearchAsync(queryString, cb) {
      this.drug.action = this.drug.ACTION_TYPE.INSERT

      if (queryString) {
        this.$http
          .get(this.api.drugsList, { params: { hospitalId: $peace.cache.get('USER').list.docInfo.netHospital_id, drugname: queryString } })
          .then(res => {
            cb(res.data)
          })
      }
    },

    // 给药途径选择
    dicUsageChange(val) {
      const item = this.drug.source.dic_usage.find(item => item.id === val)
      this.drug.model.dic_usage = item.drugway_name
      this.drug.model.dic_usage_id = item.id
    },

    // 用药频次选择
    dicFrequencyChange(val) {
      const item = this.drug.source.dic_frequency.find(item => item.id === val)
      this.drug.model.dic_frequency = item.drugtimes_name
      this.drug.model.dic_frequency_id = item.id
    },

    // 药品名称选择
    handleSelectDrug(item) {
      this.drug.model.drugid = item.id
      this.drug.model.drug_name = item.drug_name
      this.drug.model.drug_factory = item.drug_factory
      this.drug.model.drug_spec = item.drug_spec
      this.drug.model.unit = item.drug_dept

      // 默认药品数量、单词剂量值
      this.drug.model.consump = 1
      this.drug.model.number = 1

      // 其他值默认为空
      this.drug.model.medication_days = undefined
      this.drug.model.dic_usage = undefined
      this.drug.model.dic_usage_id = undefined
      this.drug.model.dic_frequency = undefined
      this.drug.model.dic_frequency_id = undefined
    },

    sendPrescription() {
      const params = {
        doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
        openId: $peace.cache.get('USER').list.docInfo.openid,
        inquiry_no: this.session.custom.ext.inquiryNo,
        family_id: this.session.custom.patients.familyId,
        diagnose: this.drug.diagnose,
        allergy_history: this.drug.allergy_history,
        drugsJson: JSON.stringify(this.drug.source.list)
      }

      this.$http.post(this.api.subPrescrip, params).then(res => {
        // 给患者发送一个 custom 消息, 用于显示
        // 1. 更改自定义消息体的状态
        const tempCustomData = $peace.util.clone(this.session.custom)
        tempCustomData.ext.talkState = 3

        $peace.NIM.sendCustomMsg({
          type: 'custom',
          scene: 'p2p',
          to: this.session.custom.patients.patientId,
          text: '',
          custom: JSON.stringify(tempCustomData),
          content: JSON.stringify({
            // 7 代表病历或处方消息
            type: 7,
            data: {
              appMsg: '',
              // 0 代表病历、1 代表处方
              sendType: state.sendType.处方消息,
              headImage: '',
              // 处方 id
              prescriptionId: res.data,
              time: new Date().formatDate(),
              title: '处方'
            }
          }),
          done: (error, msg) => {
            console.log('消息发送成功', error, msg)
            this.$emit('updateMsgHistory', msg)
            this.$emit('close')
          }
        })

        $peace.util.alert(res.msg)
      })
    },

    savePrescription() {},

    cancelPrescription() {
      $peace.util.confirm('确定要退出处方吗？当前所有数据将会被清除!', undefined, undefined, () => {
        this.$emit('close')
      })
    },

    openDrugDialog() {
      this.drug.action = this.drug.ACTION_TYPE.INSERT
      this.drug.visible = true
    },

    // 新增药品
    addDrug() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 验证当前药品列表是否已存在
          // 存在则叠加
          // 不存在则新增
          const drug = this.drug.source.list.find(item => item.drugid === this.drug.model.drugid)

          if (drug) {
            drug.number = parseInt(drug.number) + parseInt(this.drug.model.number)
          } else {
            this.drug.source.list.push({ ...this.drug.model })
          }
        }
      })
    },

    // 修改药品
    changeDrug(scope) {
      this.scope = scope
      this.drug.action = this.drug.ACTION_TYPE.EDIT

      this.drug.model = { ...scope.row }
    },

    // 删除药品
    removeDrug(scope) {
      this.drug.source.list.splice(scope.$index, 1)
    },

    // 保存药品
    saveDrug() {
      this.drug.source.list.splice(this.scope.$index, 1, { ...this.drug.model })
    },

    // 取消药品修改
    cancelDrug() {
      this.drug.visible = false
    },

    // 保存药品到处方
    saveDrugToPrescription() {
      this.prescription.source.list = this.drug.source.list

      this.cancelDrug()
    },

    // 从处方列表改变药品
    changeDrugToPrescription(scope) {
      this.drug.visible = true

      this.$nextTick().then(() => {
        this.scope = scope
        this.drug.action = this.drug.ACTION_TYPE.EDIT

        this.drug.model = { ...scope.row }
        this.drug.source.list = this.prescription.source.list
      })
    },

    // 从处方列表移除药品
    removeDrugToPrescription(scope) {
      this.prescription.source.list.splice(scope.$index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.perscription {
  margin: 10px 10px 0 10px;
}

.drug-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

.el-alert__title {
  /deep/ .el-alert__closebtn {
    font-size: 16px;
  }
}

h4 {
  margin: 10px 0 10px 0;
}
</style>

