<template>
  <div>
    <div class="info-title q-mb-12">药品规则审查维度</div>
    <div class="q-ml-14 q-mb-20">
      <el-checkbox-group v-model="model.drugCheckListSel"
                         class="full-width row">
        <el-checkbox v-for="item  in drugCheckList"
                     v-bind:label="item.id"
                     v-bind:key="item.id"
                     class="checkbox-style col-4">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="info-title q-mb-12">中成药/西药审查规则项</div>
    <div class="q-ml-14 q-mb-20">
      <el-checkbox v-model="isCheckAllRules"
                   v-bind:indeterminate="isCheckAllRulesIndeterminate"
                   v-on:change="onCheckAllRules"
                   class="checkbox-style">全选</el-checkbox>
      <el-checkbox-group v-model="model.cdrugAndWDrugCheckListSel"
                         class="full-width row">
        <el-checkbox v-for="rule in cdrugAndWDrugCheckList"
                     v-bind:label="rule.id"
                     v-bind:key="rule.id"
                     class="checkbox-style col-4">{{ rule.name }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="info-title title-color q-mb-28">中药审查规则项<span class="q-ml-12 span-color">(建设中)</span></div>
    <div class="info-title q-mb-24">联合审方
      <!-- <el-switch v-model="model.unionCheckStatusSel"
                 active-value="ON"
                 inactive-value="OFF"
                 disabled></el-switch> -->
    </div>
    <div class="q-ml-14">
      <div class="row flex q-mb-md">
        <div class="q-mb-16 color-333">审查内容：</div>
        <!-- <el-checkbox-group v-model="model.unionCheckListSel"
                         class="q-mb-24">
        <el-checkbox v-for="item  in unionCheckList"
                     v-bind:label="item.id"
                     v-bind:key="item.id"
                     disabled>{{ item.name }}</el-checkbox>
      </el-checkbox-group> -->
        <div class="color-333 "
             style="flex:1">中成药/西药审查规则项勾选了适应症、禁忌症、相互作用、重复用药、用药疗程即进行联合审查。</div>
      </div>
      <div class="checkGroup-style">
        <div class="color-333">审查范围：</div>
        <el-checkbox-group v-model="model.unionCheckRangeSel"
                           style="flex:1"
                           v-on:change="handleCheckedStatusChange">
          <el-checkbox v-for="item  in unionCheckRange"
                       v-bind:label="item.id"
                       v-bind:key="item.id"
                       class="checkbox-style">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="text-right">
      <el-button v-on:click="cancel">取消</el-button>
      <el-button type="primary"
                 v-bind:loading="isLoading"
                 v-on:click="save">保存</el-button>
    </div>

  </div>
</template>

<script>
import Service from '../service'
export default {
  data() {
    return {
      isLoading: false,
      isCheckAllRules: null,
      isCheckAllRulesIndeterminate: null,
      model: {
        unionCheckStatusSel: '',
        drugCheckListSel: [],
        cdrugAndWDrugCheckListSel: [],
        unionCheckListSel: [],
        unionCheckRangeSel: [],
        unionCheckId: 0
      },
      drugCheckList: [],
      cdrugAndWDrugCheckList: [],
      unionCheckList: [],
      unionCheckRange: []
    }
  },
  watch: {
    'model.cdrugAndWDrugCheckListSel': {
      handler() {
        if (this.cdrugAndWDrugCheckList.length > 0) {
          this.isCheckAllRules = this.model.cdrugAndWDrugCheckListSel.length === this.cdrugAndWDrugCheckList.length

          if (this.model.cdrugAndWDrugCheckListSel.length === 0) {
            this.isCheckAllRulesIndeterminate = false
          } else {
            this.isCheckAllRulesIndeterminate = !this.isCheckAllRules
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      Service.getDrugRuleConfigDetails().then((res) => {
        this.drugCheckList = res.data.drugCheckList
        this.cdrugAndWDrugCheckList = res.data.cdrugAndWDrugCheckList
        //this.unionCheckList = res.data.unionCheckList
        this.unionCheckRange = res.data.unionCheckRange
        this.model.drugCheckListSel = res.data.drugCheckListSel
        this.model.cdrugAndWDrugCheckListSel = res.data.cdrugAndWDrugCheckListSel
        // this.model.unionCheckListSel = res.data.unionCheckListSel
        this.model.unionCheckRangeSel = res.data.unionCheckRangeSel
        this.model.unionCheckStatusSel = res.data.unionCheckStatusSel
        this.model.unionCheckId = res.data.unionCheckStatus.id
      })
    },
    onCheckAllRules(value) {
      this.model.cdrugAndWDrugCheckListSel = value ? this.cdrugAndWDrugCheckList.map((item) => item.id) : []
    },
    handleCheckedStatusChange(value) {
      if (value.length > 0) {
        this.model.unionCheckStatusSel = 'ON'
      } else {
        this.model.unionCheckStatusSel = 'OFF'
      }
    },
    cancel() {
      this.$emit('close')
    },
    save() {
      if (this.model.drugCheckListSel.length == 0) {
        return Peace.util.error('必须勾选任意药品规则审查维度')
      }
      if (this.model.cdrugAndWDrugCheckListSel.length == 0) {
        return Peace.util.error('必须勾选任意中成药/西药审查规则项')
      }
      this.isLoading = true
      const params = Peace.util.deepClone(this.model)
      Service.saveDrugRuleConfigDetails(params)
        .then(() => {
          Peace.util.success('保存成功')
          this.$emit('close')
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-checkbox {
  color: #333333;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333333;
}
::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #3099a6 !important;
  border-color: #3099a6 !important;
}
::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #fff !important;
}
.info-title {
  position: relative;
  padding-left: 14px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    width: 4px;
    height: 16px;
    background-color: var(--q-color-primary);
    border-radius: 2px;
  }
  span {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-weight: 400;
  }
}
.checkbox-style {
  margin-right: 0;
  margin-bottom: 8px;
}
.title-color {
  color: rgba(51, 51, 51, 0.6);
  font-weight: 500;
}
.span-color {
  color: rgba(51, 51, 51, 0.4) !important;
  font-size: 14px;
}
.checkGroup-style {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.color-333 {
  color: #333;
}
</style>