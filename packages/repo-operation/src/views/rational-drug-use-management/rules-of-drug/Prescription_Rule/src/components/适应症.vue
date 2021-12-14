<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <div class="flex  items-center"
         v-if="isEditing">

      <el-select v-model="type"
                 placeholder="请选择"
                 @change="typeChange"
                 class="q-mr-md"
                 style="width: 100px;">
        <el-option v-for="item in DiagnosisType"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <span class="q-mr-md text-red">不属于</span>

      <div class="col"
           v-on:click="addTag">
        <span v-if="model.diagnosisItemList.length === 0"
              class="text-primary">请选择</span>
        <el-tag v-for="item in model.diagnosisItemList"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
    </div>

    <div class="flex  items-center"
         v-else>
      <span class="q-mr-md text-red">不属于</span>
      <div class="col">
        <el-tag v-for="item in model.diagnosisItemList"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
    </div>

    <indication-view v-if="dialog.visible"
                     v-model="dialog.visible"
                     v-bind:model="dialog.data"
                     v-on:onSuccess="editIndication"></indication-view>
    <IndicationThreeView v-if="dialogThree.visible"
                         v-model="dialogThree.visible"
                         v-bind:model="dialogThree.data"
                         v-on:onSuccess="editIndication"></IndicationThreeView>
    <IcdIndicationView v-if="icdDialog.visible"
                       v-model="icdDialog.visible"
                       v-bind:model="icdDialog.data"
                       v-on:onSuccess="editIndication"></IcdIndicationView>
    <IcdIndicationThreeView v-if="icdDialogThree.visible"
                            v-model="icdDialogThree.visible"
                            v-bind:model="icdDialogThree.data"
                            v-on:onSuccess="editIndication"></IcdIndicationThreeView>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import IndicationView from './IndicationView'
import IndicationThreeView from './IndicationThreeView'
import IcdIndicationView from './IcdIndicationView.vue'
import IcdIndicationThreeView from './IcdIndicationThreeView.vue'
import obPreconditionDic from '../observable/ob-precondition-dic'
export default {
  props: {
    model: Object,
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    },
    drugType: {
      required: true,
      type: String,
      validator(value) {
        return ['platform', 'department', 'org'].includes(value)
      }
    }
  },

  components: {
    IndicationView,
    IndicationThreeView,
    IcdIndicationView,
    IcdIndicationThreeView
  },
  data() {
    return {
      type: '2',
      cacheData: [], //疾病的缓存数据
      IcdCacheData: [], //ICD的缓存数据
      dialog: {
        visible: false,
        data: []
      },
      dialogThree: {
        visible: false,
        data: []
      },
      icdDialog: {
        visible: false,
        data: []
      },
      icdDialogThree: {
        visible: false,
        data: []
      }
    }
  },

  created() {
    if (
      Peace.util.isUndefined(this.model.diagnosisItemList) ||
      Peace.util.isNull(this.model.diagnosisItemList) ||
      !Peace.util.isArray(this.model.diagnosisItemList)
    ) {
      this.model.diagnosisItemList = []
    }
    if (this.model.diagnosisItemList?.length > 0) {
      if (this.model.diagnosisItemList[0]?.type === '2') {
        this.type = '2'
      } else {
        this.type = '1'
      }
    }
  },

  computed: {
    DiagnosisType: () => obPreconditionDic.state.diagnosisType
  },

  methods: {
    addTag() {
      if (this.drugType === 'platform') {
        if (this.type === '1') {
          //疾病
          this.dialog.visible = true
          this.dialog.data = [...this.model.diagnosisItemList]
        } else if (this.type === '2') {
          //ICD
          this.icdDialog.visible = true
          this.icdDialog.data = [...this.model.diagnosisItemList]
        }
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        if (this.type === '1') {
          //疾病
          this.dialogThree.visible = true
          this.dialogThree.data = [...this.model.diagnosisItemList]
        } else if (this.type === '2') {
          //ICD
          this.icdDialogThree.visible = true
          this.icdDialogThree.data = [...this.model.diagnosisItemList]
        }
      }
    },
    editIndication(data) {
      this.model.diagnosisItemList = data
      if (this.drugType === 'platform') {
        if (this.type === '1') {
          //疾病
          this.dialog.visible = false
          this.model.diagnosisItemList.forEach((item) => {
            item.type = '1'
          })
        } else if (this.type === '2') {
          //ICD
          this.icdDialog.visible = false
          this.model.diagnosisItemList.forEach((item) => {
            item.type = '2'
            item.value = item.value || item.icd10Code
          })
        }
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        if (this.type === '1') {
          //疾病
          this.dialogThree.visible = false
          this.model.diagnosisItemList.forEach((item) => {
            item.type = '1'
          })
        } else if (this.type === '2') {
          //ICD
          this.icdDialogThree.visible = false
          this.model.diagnosisItemList.forEach((item) => {
            item.type = '2'
            item.value = item.value || item.icd10Code
          })
        }
      }
    },

    verificationResults() {
      if (this.model.diagnosisItemList.length > 0) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        return CONSTANT.RULE_VALIDATION_RESULTS.未开始
      }
    },

    typeChange(value) {
      if (Number(value) === 1) {
        //切换成疾病
        this.IcdCacheData = this.model.diagnosisItemList
        this.model.diagnosisItemList = this.cacheData
      } else if (Number(value) === 2) {
        this.cacheData = this.model.diagnosisItemList
        this.model.diagnosisItemList = this.IcdCacheData
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-item {
  border-radius: 4px;
}

.rule-item__content {
  border-radius: 4px;
}
</style>
