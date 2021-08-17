<template>
  <div class="rule-item__content flex items-center q-pa-16 q-mr-md">
    <div class="flex col  items-center"
         v-if="isEditing">

      <div class="flex row items-center">
        <el-select v-model="model.whetherType"
                   placeholder="请选择"
                   style="width: 80px;">
          <el-option v-for="item in source.WhetherType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="flex row items-center q-ml-8">
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
        <span v-if="model.dklrDoctorLists.length === 0"
              class="text-primary">+请选择</span>
        <el-tag v-for="item in model.dklrDoctorLists"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>

      <span class="q-ml-16">开具药品</span>

      <div class="col flex row items-center q-ml-8"
           v-on:click="addTagForDrug">
        <span v-if="model.dklrDrugLists.length === 0"
              class="text-primary">+请选择</span>
        <el-tag v-for="item in model.dklrDrugLists"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>

    </div>
    <div class="flex col  items-center"
         v-else>
      <span>{{model.whetherType | filterDictionary(source.WhetherType,'--')}}</span>
      <span class=" q-ml-8">{{model.enumType | filterDictionary(busiType,'--')}}</span>

      <div class="col flex row items-center q-ml-8">
        <el-tag v-for="item in model.dklrDoctorLists"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>

      <span class="q-ml-16">开具药品</span>

      <div class="col flex row items-center q-ml-8">
        <el-tag v-for="item in model.dklrDrugLists"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>

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

  </div>
</template>

<script>
import CONSTANT from '../constant'
import ChoiceDoctorDialog from './ChoiceDoctorDialog'
import ChoiceDoctorTitleDialog from './ChoiceDoctorTitleDialog'
import ChoiceDepartmentDialog from './ChoiceDepartmentDialog'
import ChoicePrescripmentTypeDialog from './ChoicePrescripmentTypeDialog'
import ChoiceDrugDialog from './ChoiceDrugDialog'
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
    ChoiceDrugDialog
  },
  data() {
    return {
      source: {
        WhetherType: []
      },
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
      }
    }
  },
  computed: {
    busiType: () => obPreconditionDic.state.busiType
  },

  async mounted() {
    this.source.WhetherType = await Peace.identity.dictionary.getList('whether_type')
  },

  methods: {
    addTagForType() {
      if (this.model.enumType === '1') {
        this.dialogDoctor.data = [...this.model.dklrDoctorLists]
        this.dialogDoctor.visible = true
      } else if (this.model.enumType === '2') {
        this.dialogDoctorTitle.data = [...this.model.dklrDoctorLists]
        this.dialogDoctorTitle.visible = true
      } else if (this.model.enumType === '3') {
        this.dialogDept.data = [...this.model.dklrDoctorLists]
        this.dialogDept.visible = true
      } else if (this.model.enumType === '4') {
        this.dialogPrescripmentType.data = [...this.model.dklrDoctorLists]
        this.dialogPrescripmentType.visible = true
      } else {
        Peace.util.warning('请先选择类型')
      }
    },
    //选择类型成功
    choiceTypeSuccess(res) {
      this.model.dklrDoctorLists = res
      if (this.model.enumType === '1') {
        this.dialogDoctor.visible = false
      } else if (this.model.enumType === '2') {
        this.dialogDoctorTitle.visible = false
      } else if (this.model.enumType === '3') {
        this.dialogDept.visible = false
      } else if (this.model.enumType === '4') {
        this.dialogPrescripmentType.visible = false
      }
    },

    //选择药品
    addTagForDrug() {
      this.dialogChoiceDrug.data = [...this.model.dklrDrugLists]
      this.dialogChoiceDrug.visible = true
    },
    //选择药品成功
    choiceDrugSuccess(res) {
      this.model.dklrDrugLists = res
      this.dialogChoiceDrug.visible = false
    },

    //切换前面的类型
    enumTypeChange() {
      this.model.dklrDoctorLists = []
    },

    verificationResults() {
      const tmp = this.model
      if (tmp.dklrDoctorLists.length > 0 && tmp.dklrDrugLists.length > 0) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        if (tmp.dklrDoctorLists.length > 0 || tmp.dklrDrugLists.length > 0) {
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
