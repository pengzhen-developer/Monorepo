<template>
  <div>
    <el-alert :closable="false"
              title="开处方"
              type="success">
      <div slot="title">
        <span>开处方</span>
        <i @click="close"
           class="el-alert__closebtn el-icon-close"></i>
      </div>
    </el-alert>

    <div class="perscription">
      <h4>初步诊断</h4>
      <div>
        <span>{{ drug.diagnose }}</span>
      </div>

      <h4>过敏史</h4>
      <div>
        <span>{{ drug.allergy_history || "无" }}</span>
      </div>
      <hr />

      <h4>
        <span>处方药品</span>
        <span style="color: #9B9B9B">（最多可添加 5 种药品）</span>

        <el-button @click="openDrugDialog"
                   type="text">添加药品</el-button>
      </h4>

      <peace-table :data="prescription.source.list"
                   ref="table">
        <peace-table-column label="药品名称"
                            prop="drug_name"
                            show-overflow-tooltip>
        </peace-table-column>
        <peace-table-column label="用法"
                            prop="dic_usage"
                            width="80px"></peace-table-column>
        <peace-table-column label="用量">
          <template slot-scope="scope">
            {{ scope.row.dic_frequency }}
            <br />
            一次
            {{ scope.row.consump }} {{ scope.row.unit }}
          </template>
        </peace-table-column>
        <peace-table-column label="数量"
                            prop="number"
                            width="80px"></peace-table-column>
        <peace-table-column align="center"
                            fixed="right"
                            label="操作"
                            width="80px">
          <template slot-scope="scope">
            <el-button @click="changeDrugToPrescription(scope)"
                       type="text">修改</el-button>
            <br />
            <el-button @click="removeDrugToPrescription(scope)"
                       type="text">删除</el-button>
          </template>
        </peace-table-column>
      </peace-table>

      <div style="text-align: center; margin: 30px 0 0 0;">
        <el-button @click="close">取消</el-button>
        <el-button @click="savePrescription"
                   type="success"
                   v-show="false">保存</el-button>
        <el-button @click="sendPrescription"
                   type="primary">发送</el-button>
      </div>
    </div>

    <peace-dialog :visible.sync="drug.visible"
                  @close="closeDialog"
                  title="新增药品">
      <el-form :model="drug.model"
               :rules="drug.rules"
               :validate-on-rule-change="false"
               label-position="right"
               label-width="80px"
               ref="form">
        <el-form-item label="药品名称"
                      prop="drugid">
          <el-autocomplete :fetch-suggestions="querySearchAsync"
                           @select="handleSelectDrug"
                           placeholder
                           popper-class="drug-autocomplete"
                           style="width: 100%;"
                           v-model="drug.model.drug_name">
            <template slot-scope="{ item }">
              <div class="name">{{ item.drug_name }}</div>
              <span class="addr">{{ item.drug_factory }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label="药品数量"
                          prop="number">
              <el-input placeholder
                        v-model.number="drug.model.number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用药天数"
                          prop="medication_days">
              <el-input placeholder
                        v-model.number="drug.model.medication_days"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="给药途径"
                          prop="dic_usage_id">
              <el-select @change="dicUsageChange"
                         placeholder
                         v-model="drug.model.dic_usage_id">
                <el-option :key="item.id"
                           :label="item.drugway_name"
                           :value="item.id"
                           v-for="item in drug.source.dic_usage"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="单次剂量"
                          prop="consump"
                          style="white-space: nowrap;">
              <el-input placeholder
                        style="width: 60px; margin-right: 10px;"
                        v-model="drug.model.consump"></el-input>
              {{ drug.model.unit }}
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="用药频次"
                          prop="dic_frequency_id">
              <el-select @change="dicFrequencyChange"
                         placeholder
                         style="width: 100%;"
                         v-model="drug.model.dic_frequency_id">
                <el-option :key="item.id"
                           :label="item.drugtimes_name"
                           :value="item.id"
                           v-for="item in drug.source.dic_frequency"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click="addDrug"
                     round
                     style="float: right;"
                     type="primary"
                     v-show="drug.action === drug.ACTION_TYPE.INSERT">添加到处方</el-button>
          <el-button @click="saveDrug"
                     round
                     style="float: right;"
                     type="primary"
                     v-show="drug.action === drug.ACTION_TYPE.EDIT">保存修改</el-button>
        </el-row>
      </el-form>

      <h4>
        <span>已选药品</span>
        <span style="color: #9B9B9B">（最多可添加 5 种药品）</span>
      </h4>
      <peace-table :data="drug.source.list"
                   ref="table">
        <peace-table-column label="药品名称"
                            prop="drug_name"
                            show-overflow-tooltip>
        </peace-table-column>
        <peace-table-column label="用法"
                            prop="dic_usage"
                            width="80px"></peace-table-column>
        <peace-table-column label="用量">
          <template slot-scope="scope">
            {{ scope.row.dic_frequency }}
            <br />
            一次{{ scope.row.consump }} {{ scope.row.unit }}
          </template>
        </peace-table-column>
        <peace-table-column label="数量"
                            prop="number"
                            width="80px"></peace-table-column>
        <peace-table-column align="center"
                            fixed="right"
                            label="操作"
                            width="80px">
          <template slot-scope="scope">
            <el-button @click="changeDrug(scope)"
                       type="text">修改</el-button>
            <br />
            <el-button @click="removeDrug(scope)"
                       type="text">删除</el-button>
          </template>
        </peace-table-column>
      </peace-table>

      <div style="text-align: center; margin: 30px 0 0 0;">
        <el-button @click="cancelDrug">取消</el-button>
        <el-button @click="saveDrugToPrescription"
                   type="primary"
                   :disabled="drug.disabled">保存
        </el-button>
      </div>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

const ACTION_TYPE = {
  EDIT: 'EDIT',
  INSERT: 'INSERT'
}

export default {
  data() {
    return {
      prescription: {
        source: {
          list: []
        }
      },

      drug: {
        ACTION_TYPE: ACTION_TYPE,

        action: ACTION_TYPE.INSERT,

        visible: false,
        disabled: true,
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
          drugid: [{ required: true, message: '请输入药品名称', trigger: 'change' }],
          number: [
            { required: true, message: '请输入药品数量', trigger: 'change' },
            {
              pattern: peace.validate.pattern.pInterger,
              message: '请输入正确的药品数量',
              trigger: 'change'
            }
          ],
          medication_days: [
            {
              pattern: peace.validate.pattern.pInterger,
              message: '请输入正确的用药天数',
              trigger: 'change'
            }
          ],
          consump: [{ required: true, message: '请输入单次剂量', trigger: 'change' }],
          dic_usage_id: [{ required: true, message: '请输入给药途径', trigger: 'change' }],
          dic_frequency_id: [{ required: true, message: '请输入用药频次', trigger: 'change' }]
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
        peace.util.warning('处方药品最多可添加 5 种药品')

        val.splice(5, 1)
      }
    },

    'drug.source.list'(val) {
      if (val.length > 5) {
        peace.util.warning('处方药品最多可添加 5 种药品')

        val.splice(5, 1)
      }
      if (val.length == 0) {
        this.drug.disabled = true
      } else {
        this.drug.disabled = false
      }
      if (val.length == 0) {
        this.drug.disabled = true
      } else {
        this.drug.disabled = false
      }
    }
  },

  created() {
    this.drug._model = peace.util.deepClone(this.drug.model)

    const params = {
      hospitalId: this.$store.state.user.userInfo.list.docInfo.netHospital_id
    }
    peace.service.prescribePrescrip.drugUsageList(params).then(res => {
      this.drug.source.dic_usage = res.data
    })
    peace.service.prescribePrescrip.drugFrequencyList(params).then(res => {
      this.drug.source.dic_frequency = res.data
    })

    const paramsForCase = {
      inquiry_no: this.$store.getters['inquiry/inquiryInfo'].inquiryNo
    }
    peace.service.inquiry.getCase(paramsForCase).then(res => {
      this.drug.diagnose = res.data.diagnose
      this.drug.allergy_history = res.data.allergy_history
    })
  },

  mounted() {},

  methods: {
    // 搜索药品
    querySearchAsync(queryString, cb) {
      this.drug.action = this.drug.ACTION_TYPE.INSERT

      if (queryString) {
        const params = {
          hospitalId: this.$store.state.user.userInfo.list.docInfo.netHospital_id,
          drugname: queryString
        }
        peace.service.prescribePrescrip.drugsList(params).then(res => {
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
      this.drug.model.unit = item.drug_unit

      // 默认药品数量、单次剂量值
      this.drug.model.consump = 1
      this.drug.model.number = 1

      // 其他值默认为空
      this.drug.model.medication_days = ''
      this.drug.model.dic_usage = ''
      this.drug.model.dic_usage_id = ''
      this.drug.model.dic_frequency = ''
      this.drug.model.dic_frequency_id = ''

      setTimeout(() => {
        this.$refs.form.clearValidate()
        this.$refs.form.validateField('drugid')
      }, 0)
    },

    sendPrescription() {
      if (this.drug.source.list.length < 1) {
        peace.util.warning('请添加处方药品')
        return
      }

      const temp = peace.util.deepClone(this.drug.source.list)
      temp.forEach(item => {
        item.medication_days = item.medication_days ? item.medication_days : 0
      })

      const params = {
        openId: this.$store.state.user.userInfo.list.docInfo.openid,
        inquiry_no: this.$store.getters['inquiry/inquiryInfo'].inquiryNo,
        family_id: this.$store.getters['inquiry/patientInfo'].familyId,
        diagnose: this.drug.diagnose,
        allergy_history: this.drug.allergy_history,
        drugsJson: JSON.stringify(temp)
      }

      peace.service.prescribePrescrip.subPrescrip(params).then(res => {
        peace.util.alert(res.msg)

        $peace.inquiryComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.重置操作)
      })
    },

    savePrescription() {},

    openDrugDialog() {
      this.drug.action = this.drug.ACTION_TYPE.INSERT
      this.drug.visible = true

      this.$nextTick(function() {
        console.log(this.$refs)
      })
    },
    //清空药品信息
    resetDrugInfo() {
      setTimeout(() => {
        this.$refs.form.resetFields()
        this.drug.model.drug_name = ''
      }, 0)
    },
    // 新增药品
    addDrug() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 验证当前药品列表是否已存在
          // 存在则叠加
          // 不存在则新增
          const currentDrugIndex = this.drug.source.list.findIndex(
            item => item.drugid === this.drug.model.drugid
          )

          if (currentDrugIndex !== -1) {
            this.drug.source.list.splice(currentDrugIndex, 1, {
              ...this.drug.model
            })
          } else {
            this.drug.source.list.push({ ...this.drug.model })
          }
          this.resetDrugInfo()
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
      this.drug.source.list.splice(this.scope.$index, 1, {
        ...this.drug.model
      })
      this.resetDrugInfo()
    },

    // 取消药品修改
    cancelDrug() {
      this.drug.visible = false
    },

    closeDialog() {
      this.drug.model = peace.util.deepClone(this.drug._model)
      this.$refs.form.resetFields()
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
    },

    close() {
      peace.util.confirm('确定要退出处方吗？当前所有数据将会被清除!', undefined, undefined, () => {
        $peace.inquiryComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.重置操作)
      })
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
