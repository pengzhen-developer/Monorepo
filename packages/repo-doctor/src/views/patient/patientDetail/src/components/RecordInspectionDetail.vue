// 检查单详情

<template>
  <div class="q-px-lg p-py-md">
    <!-- 检查单标题 -->
    <div class="relative-position text-center q-mb-lg">
      <p class="text-h5 text-weight-bolder">{{ baseInfo.hospitalName }}</p>
      <p class="text-h5 text-weight-bolder">报告单</p>
    </div>

    <div class="q-mb-md"
         style="border-bottom: 1px dashed #e2e2e2;"></div>

    <!-- 检查单基础信息 -->
    <div class="q-mb-md">
      <div class="row q-mb-xs">
        <div class="row col-12">
          <span class="text-justify"
                style="width: 4em;">项目名称</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ baseInfo.itemName }}</span>
        </div>
      </div>

      <div class="row q-mb-xs">
        <div class="row col-12">
          <span class="text-justify"
                style="width: 4em;">临床诊断</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ baseInfo.diagnosis }}</span>
        </div>
      </div>

      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">姓名</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ baseInfo.patientName }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">性别</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ baseInfo.patientSex }}</span>
        </div>
      </div>

      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">年龄</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ baseInfo.age }}</span>
        </div>
      </div>
      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">检查科室</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ baseInfo.applyDept }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">申请医生</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ baseInfo.applyDoctor }}</span>
        </div>
      </div>

      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">报告单号</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ baseInfo.inspectionId }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">报告时间</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ baseInfo.inspectionDate }}</span>
        </div>
      </div>
    </div>

    <div class="q-mb-md"
         style="border-bottom: 1px solid #F3F3F3;"></div>

    <!-- 检查单明细信息 -->
    <div class="q-mb-md">
      <PeaceTable v-bind:data="resultInfoItems">
        <PeaceTableColumn label="项目名称"
                          prop="itemName"></PeaceTableColumn>
        <PeaceTableColumn label="量化结果"
                          prop="quantitativeResult"></PeaceTableColumn>
        <PeaceTableColumn label="参考值"
                          prop="itemReference"></PeaceTableColumn>
        <PeaceTableColumn label="单位"
                          prop="itemUnit"></PeaceTableColumn>
      </PeaceTable>
    </div>

    <div class="q-mb-md"
         style="border-bottom: 1px solid #F3F3F3;"></div>

    <!-- 检查单审核信息 -->
    <div class="q-mb-md">
      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">检查医生</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ resultInfo.checkPerson }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">接收时间</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ resultInfo.checkTime }}</span>
        </div>
      </div>

      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">审核医生</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ resultInfo.inspectionPerson }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">审核时间</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ resultInfo.receiveTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },

  computed: {
    baseInfo() {
      return this.data.baseInfo ?? {}
    },

    resultInfo() {
      return this.data.resultInfo ?? {}
    },

    resultInfoItems() {
      return this.resultInfo.resultItems
    }
  }
}
</script>

<style lang="scss" scoped>
.text-justify {
  text-align-last: justify;
}

::v-deep .el-table th > .cell {
  font-weight: 500;
  color: #999;
  font-size: 12px;
}

::v-deep .el-table td,
::v-deep .el-table th.is-leaf {
  border: 0;
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #fff;
}

::v-deep .el-table .cell {
  font-weight: 700;
}

::v-deep .el-table--border::after,
::v-deep .el-table--group::after,
::v-deep .el-table::before {
  background: transparent;
}
</style>
