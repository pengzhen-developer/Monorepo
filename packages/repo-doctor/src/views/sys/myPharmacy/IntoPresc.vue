<template>
  <div class="presc">
    <div>
      <span class="label">诊断</span>
      <el-select :remote-method="getPresent"
                 @change="chooseItem"
                 filterable
                 placeholder="请输入诊断"
                 ref="diagnosis"
                 remote
                 style="width: calc(100% - 90px);"
                 v-model="dialog.chooseItem">
        <el-option :key="item.id"
                   :label="item.name"
                   :value="item.name"
                   v-for="item in dialog.source.present_history"></el-option>
      </el-select>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>性别</span>
      </div>
      <div class="info-row-content">
        <el-select v-model="presc.sex">
          <el-option :key="sex"
                     :label="sex"
                     :value="sex"
                     v-for="sex in sexs"></el-option>
        </el-select>
      </div>
      <div class="info-row-label">
        <span>年龄</span>
      </div>
      <div class="info-row-content">
        <el-select v-model="presc.age">
          <el-option :key="age"
                     :label="age"
                     :value="age"
                     v-for="age in ages"></el-option>
        </el-select>
      </div>
    </div>
    <div>
      <span class="label">RP</span>
      <el-button @click="openDrugDialog"
                 type="text">添加药品</el-button>
    </div>
    <div class="drug-list">
      <div :key="drug.id"
           class="drug-item"
           v-for="(drug, index) in drugList">
        <div class="row-one">
          <span>{{ drug.drug_name }}</span>
          <span>{{ drug.drug_spec }}</span>
          <span>{{ drug.drug_factory }}</span>
          <span>&nbsp;x{{ drug.number }}</span>
          <div style="float: right;">
            <el-button @click="openEditDrugDialog(drug, index)"
                       type="text">修改</el-button>
            <el-button @click="deleteDrug(index)"
                       type="text">删除</el-button>
          </div>
        </div>
        <div class="row-two">
          <span>用法用量：</span>
          <span>{{ drug.dic_usage }}</span>。
          <span>每次{{ drug.consump }}{{ drug.drug_unit || drug.unit }}</span>，
          <span>{{ drug.dic_frequency }}</span>
          <span v-if="drug.medication_days">，{{ drug.medication_days }}天</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button @click="$emit('cancel')"
                 plain
                 type="primary">取消</el-button>
      <el-button @click="submit"
                 type="primary">确定</el-button>
    </div>
    <peace-dialog :close-on-click-modal="false"
                  :visible.sync="drugDialog.visible"
                  append-to-body
                  custom-class="dialog"
                  title="添加药品"
                  v-if="drugDialog.visible">
      <into-presc-drug @cancel="closeDrugDialog"
                       @nextStep="nextStep"
                       ref="into-presc-drug"
                       v-show="step === 1"></into-presc-drug>

      <into-presc-drug-usage :drugInfo="currentDrug"
                             @prevStep="prevStep"
                             @submit="saveDrug"
                             ref="into-presc-drug"
                             v-show="step === 2"></into-presc-drug-usage>
    </peace-dialog>

    <peace-dialog :close-on-click-modal="false"
                  :visible.sync="editDrugDialog.visible"
                  append-to-body
                  custom-class="dialog"
                  title="修改药品用法"
                  v-if="editDrugDialog.visible">
      <into-presc-drug-usage :data="editDrugDialog.data"
                             :drugInfo="currentDrug"
                             @submit="editDrug"
                             edit
                             ref="into-presc-drug"
                             v-show="step === 3"></into-presc-drug-usage>
    </peace-dialog>
  </div>
</template>
<script>
import config from './config'
import IntoPrescDrug from './IntoPrescDrug'
import IntoPrescDrugUsage from './IntoPrescDrugUsage'

export default {
  name: 'IntoPresc',
  components: { IntoPrescDrug, IntoPrescDrugUsage },
  props: {
    data: {
      type: Object,
      default() {
        return {
          diagnosis: '',
          sex: '不限',
          age: '不限',
          rp: []
        }
      }
    }
  },
  data() {
    return {
      config,
      step: 1,
      currentIndex: 0,
      currentDrug: {},
      presc: this.data,
      sexs: ['不限', '男', '女'],
      ages: [
        '不限',
        '初生 ~ 1个月',
        '1个月 ~ 6个月',
        '6个月 ~ 1岁',
        '1 ~ 2岁',
        '2 ~ 4岁',
        '4 ~ 6岁',
        '6 ~ 9岁',
        '9 ~ 14岁',
        '14 ~ 18岁',
        '18 ~ 60岁',
        '60 ~ 80岁',
        '80岁以上'
      ],
      drugDialog: {
        visible: false
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
      },
      editDrugDialog: {
        visible: false,

        data: undefined
      },
      drugList: []
    }
  },
  methods: {
    // 选择诊断
    selectDiagnosis() {},
    getPresent(query) {
      query = query.replace(/^\s*/, '') //去除头部空格
      if (query !== '' && query.length > 0) {
        this.http.post(this.config.api.getDiseaseInfo, { name: query }).then(res => {
          this.dialog.source.present_history = res.data.list
        })
      } else {
        this.dialog.source.present_history = []
      }
    },

    chooseItem(item) {
      if (!item.id) {
        item = {
          name: item
        }
      }

      const index = this.dialog.chooseData.findIndex(
        existItem => existItem.id === item.id && existItem.name === item.name
      )

      if (index === -1) {
        this.dialog.chooseData.push(item)

        // 选中后， 清空状态
        this.dialog.source.present_history = []
        this.dialog.source.allergy_history = []
      }
    },
    // 打开添加药品 Dialog
    openDrugDialog() {
      const isMax = this.drugList.length >= 5
      if (isMax) {
        this.$message.warning('处方药品最多可添加 5 种药品')
        return
      }
      this.step = 1
      this.drugDialog.visible = true
    },
    closeDrugDialog() {
      this.drugDialog.visible = false
    },
    prevStep() {
      this.step -= 1
    },
    nextStep(param) {
      this.currentDrug = param
      this.step += 1
    },
    saveDrug(param) {
      const list = this.drugList

      for (let [i, len] = [0, list.length]; i < len; i += 1) {
        const element = list[i]
        if (element.id === param.id) {
          param.number += element.number
          this.drugList[i] = param
          this.closeDrugDialog()
          return
        }
      }
      this.drugList.push(param)
      this.closeDrugDialog()
    },
    // 打开修改药品用法 Dialog
    openEditDrugDialog(data, index) {
      this.step = 3
      this.currentIndex = index
      this.editDrugDialog.data = data
      this.editDrugDialog.visible = true
    },
    closeEditDrugDialog() {
      this.editDrugDialog.visible = false
    },
    editDrug(param) {
      this.drugList.splice(this.currentIndex, 1, param)
      this.closeEditDrugDialog()
    },
    deleteDrug(index) {
      this.drugList.splice(index, 1)
    },
    submit() {
      const drug = this.drugList
      const diagnosis = this.dialog.chooseItem
      // 这里为了做兼容
      drug.forEach(item => {
        if (item.drug_unit) {
          item.unit = item.drug_unit
        }
      })

      if (!diagnosis) {
        this.$confirm('诊断尚未选择，选择后才能保存', '', {
          confirmButtonText: '前往选择',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$refs.diagnosis.focus()
        })
        return
      }
      if (!drug.length) {
        this.$confirm('处方药品尚未添加，添加后才能保存', '', {
          confirmButtonText: '前往添加',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.openDrugDialog()
        })
        return
      }
      const params = {
        diagnosis,
        drugjson: JSON.stringify(drug),
        sex: this.presc.sex,
        age: this.presc.age
      }

      this.$emit('submit', params)
    }
  },
  created() {
    const data = this.data
    if (!(!data.diagnosis || (data.rp && !data.rp.length))) {
      this.dialog.chooseItem = this.data.diagnosis
      this.drugList = JSON.parse(this.data.drugjson)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button {
  &--primary.is-plain {
    color: $--color-primary;
    background: transparent;
  }
}
.presc {
  padding: 10px 20px;
  .label {
    display: inline-block;
    min-width: 64px;
    text-align: justify;
    text-align-last: justify;
  }
  .info-row-label:after,
  .label:after {
    content: '：';
  }
  .info-row {
    margin: 10px 0;
    &-label,
    &-content {
      font-size: 14px;
      display: inline-block;
    }
    &-label {
      & > span {
        width: 50px;
        text-align: justify;
        text-align-last: justify;
        display: inline-block;
      }
    }
    &-content {
      width: calc(50% - 64px);
    }
  }
}
.drug-list {
  height: 210px;
  overflow-y: auto;
  .drug-item {
    border-bottom: 1px solid #ebeef5;
    .row-one,
    .row-two {
      margin: 10px;
    }
    .row-one {
      font-weight: bold;
      font-weight: 600;
      & > span {
        &:nth-child(1) {
          margin-right: 20px;
        }
        &:nth-child(2) {
          margin-right: 25px;
        }
      }
    }
    .row-two {
      font-size: 12px;
      color: #333;
    }
  }
}
.footer {
  margin-top: 10px;
  text-align: center;
}
</style>
