<template>
  <div class="rule-item__content flex items-center q-pa-16 q-mr-md">
    <div class="flex col  items-center"
         v-if="isEditing">

      <div class="flex row items-center">
        <el-select v-model="model.enumType"
                   placeholder="请选择"
                   @change="enumTypeChange"
                   style="width: 100px;">
          <el-option v-for="item in busiType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="col flex row items-center q-ml-8"
           v-on:click="addTagForType">
        <span v-if="model.dqlrDoctorLists.length === 0"
              class="text-primary">+请选择</span>
        <el-tag v-for="item in model.dqlrDoctorLists"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>

      <span class="q-ml-16">药品</span>

      <div class="col flex row items-center q-ml-8"
           v-on:click="addTagForDrug">
        <span v-if="model.dqlrDrugLists.length === 0"
              class="text-primary">+请选择</span>
        <el-tag v-for="item in model.dqlrDrugLists"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>

      <span class="q-ml-16">用药总量</span>
      <span class="q-ml-8">每</span>
      <div class="flex row items-center q-ml-8">
        <el-select v-model="model.timePeriod"
                   placeholder="请选择"
                   style="width: 50px;">
          <el-option v-for="item in periodType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="flex row items-center q-ml-8">
        <el-select v-model="model.operator"
                   placeholder="请选择"
                   style="width: 90px;">
          <el-option v-for="item in compareList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-input-number v-model="model.quantity"
                       :controls="false"
                       class="q-mr-8 q-ml-8"
                       style="width: 100px;"
                       :precision="5"
                       :min="0.00001"
                       placeholder="请输入"></el-input-number>

      <div v-on:click="addUnit"
           class="input-number-style justify-center">
        <span v-if="!model.unitCode"
              class="text-primary">请选择</span>
        <span v-if="model.unitCode">{{ model.unit }}</span>
      </div>
    </div>
    <div class="flex col  items-center"
         v-else>
      <span>{{model.enumType | filterDictionary(busiType,'--')}}</span>
      <div class="col flex row items-center q-ml-8">
        <el-tag v-for="item in model.dqlrDoctorLists"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
      <span class="q-ml-16">药品</span>
      <div class="col flex row items-center q-ml-8">
        <el-tag v-for="item in model.dqlrDrugLists"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
      <span class="q-ml-16">用药总量</span>
      <span class="q-ml-8">每</span>
      <span class=" q-ml-8">{{model.timePeriod | filterDictionary(periodType,'--')}}</span>
      <span class=" q-ml-8 text-red">{{model.operator | filterDictionary(compareList,'--')}}</span>
      <span class=" q-ml-8">{{model.quantity }}</span>
      <span class=" q-ml-8">{{model.unit }}</span>

    </div>
    <!-- 选择医生 -->
    <ChoiceDoctorDialog v-if="dialogDoctor.visible"
                        v-model="dialogDoctor.visible"
                        v-bind:model="dialogDoctor.data"
                        v-on:onSuccess="choiceTypeSuccess"></ChoiceDoctorDialog>
    <!-- 选择职级 -->
    <ChoiceDoctorTitleDialog v-if="dialogDoctorTitle.visible"
                             v-model="dialogDoctorTitle.visible"
                             v-bind:model="dialogDoctorTitle.data"
                             v-on:onSuccess="choiceTypeSuccess"></ChoiceDoctorTitleDialog>
    <!-- 选择科室 -->
    <ChoiceDepartmentDialog v-if="dialogDept.visible"
                            v-model="dialogDept.visible"
                            v-bind:model="dialogDept.data"
                            v-on:onSuccess="choiceTypeSuccess"></ChoiceDepartmentDialog>
    <!-- 选择职级 -->
    <ChoiceDoctorTitleDialog v-if="dialogDoctorTitle.visible"
                             v-model="dialogDoctorTitle.visible"
                             v-bind:model="dialogDoctorTitle.data"
                             v-on:onSuccess="choiceTypeSuccess"></ChoiceDoctorTitleDialog>
    <!-- 选择职级 -->
    <ChoicePrescripmentTypeDialog v-if="dialogPrescripmentType.visible"
                                  v-model="dialogPrescripmentType.visible"
                                  v-bind:model="dialogPrescripmentType.data"
                                  v-on:onSuccess="choiceTypeSuccess"></ChoicePrescripmentTypeDialog>
    <!-- 选择药品 -->
    <ChoiceDrugDialog v-if="dialogChoiceDrug.visible"
                      v-model="dialogChoiceDrug.visible"
                      v-bind:model="dialogChoiceDrug.data"
                      v-on:onSuccess="choiceDrugSuccess"></ChoiceDrugDialog>
    <!-- 选择单位 -->
    <!-- 选择单位 -->
    <PeaceDialog append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dialogChoiceUnit.visible"
                 title="请选择单位"
                 v-if="dialogChoiceUnit.visible"
                 width="500px">
      <ChoiceUnitDialog v-on:onSuccess="choiceUnitSuccess"
                        v-bind:data="dialogChoiceUnit.data"
                        v-on:onClose="dialogChoiceUnit.visible = false" />
    </PeaceDialog>

  </div>
</template>

<script>
import CONSTANT from '../constant'
import ChoiceDoctorDialog from './ChoiceDoctorDialog'
import ChoiceDoctorTitleDialog from './ChoiceDoctorTitleDialog'
import ChoiceDepartmentDialog from './ChoiceDepartmentDialog'
import ChoicePrescripmentTypeDialog from './ChoicePrescripmentTypeDialog'
import ChoiceDrugDialog from './ChoiceDrugDialog'
import ChoiceUnitDialog from './ChoiceUnitDialog'
import obPreconditionDic from '../observable/ob-precondition-dic'

export default {
  props: {
    model: Object,
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  components: {
    ChoiceDoctorDialog,
    ChoiceDoctorTitleDialog,
    ChoiceDepartmentDialog,
    ChoicePrescripmentTypeDialog,
    ChoiceDrugDialog,
    ChoiceUnitDialog
  },
  data() {
    return {
      dialogDoctor: {
        visible: false,
        data: []
      },
      dialogDoctorTitle: {
        visible: false,
        data: []
      },
      dialogDept: {
        visible: false,
        data: []
      },
      dialogPrescripmentType: {
        visible: false,
        data: []
      },
      dialogChoiceDrug: {
        visible: false,
        data: []
      },
      dialogChoiceUnit: {
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    busiType: () => obPreconditionDic.state.busiType,
    periodType: () => obPreconditionDic.state.periodType,
    compareList: () => obPreconditionDic.state.compareList
  },

  methods: {
    addTagForType() {
      if (this.model.enumType === '0') {
        this.dialogDoctor.data = [...this.model.dqlrDoctorLists]
        this.dialogDoctor.visible = true
      } else if (this.model.enumType === '1') {
        this.dialogDoctorTitle.data = [...this.model.dqlrDoctorLists]
        this.dialogDoctorTitle.visible = true
      } else if (this.model.enumType === '2') {
        this.dialogDept.data = [...this.model.dqlrDoctorLists]
        this.dialogDept.visible = true
      } else if (this.model.enumType === '3') {
        this.dialogPrescripmentType.data = [...this.model.dqlrDoctorLists]
        this.dialogPrescripmentType.visible = true
      } else {
        Peace.util.warning('请先选择类型')
      }
    },
    //选择类型成功
    choiceTypeSuccess(res) {
      this.model.dqlrDoctorLists = res
      if (this.model.enumType === '0') {
        this.dialogDoctor.visible = false
      } else if (this.model.enumType === '1') {
        this.dialogDoctorTitle.visible = false
      } else if (this.model.enumType === '2') {
        this.dialogDept.visible = false
      } else if (this.model.enumType === '3') {
        this.dialogPrescripmentType.visible = false
      }
    },

    //选择药品
    addTagForDrug() {
      this.dialogChoiceDrug.data = [...this.model.dqlrDrugLists]
      this.dialogChoiceDrug.visible = true
    },
    //选择药品成功
    choiceDrugSuccess(res) {
      this.model.dqlrDrugLists = res
      this.dialogChoiceDrug.visible = false
    },

    //添加单位
    addUnit() {
      this.dialogChoiceUnit.data = { code: this.model.unitCode, name: this.model.unit, unitType: this.model.unitType }
      this.dialogChoiceUnit.visible = true
    },
    //添加单位成功
    choiceUnitSuccess(data) {
      this.model.unitCode = data.code
      this.model.unit = data.name
      this.model.unitType = data.unitType
      this.dialogChoiceUnit.visible = false
    },

    //切换前面的类型
    enumTypeChange() {
      this.model.dqlrDoctorLists = []
    },

    verificationResults() {
      const tmp = this.model
      if (
        tmp.dqlrDoctorLists.length > 0 &&
        tmp.dqlrDrugLists.length > 0 &&
        (tmp.quantity || Number(tmp.quantity) === 0) &&
        tmp.unit &&
        tmp.unitCode &&
        tmp.unitType
      ) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        if (
          tmp.dqlrDoctorLists.length > 0 ||
          tmp.dqlrDrugLists.length > 0 ||
          tmp.quantity ||
          Number(tmp.quantity) === 0 ||
          tmp.unit ||
          tmp.unitCode ||
          tmp.unitType
        ) {
          return CONSTANT.RULE_VALIDATION_RESULTS.未完成
        } else {
          return CONSTANT.RULE_VALIDATION_RESULTS.未开始
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-number-style {
  width: 120px;
  height: 34px;
  border-radius: 4px;
  border: 1px solid #e4e4e4;
  padding-top: 2px;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  margin-right: 8px;

  ::v-deep {
    .el-input__inner {
      border: 0;
    }
  }
}
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
