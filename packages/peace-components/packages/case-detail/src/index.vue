<!--
 * @Description: 病历详情
-->

<template>
  <div v-loading="loading">

    <div class="q-px-14 text-grey-6 row items-center justify-between">
      <span>No.{{ internalData?.caseNo }}</span>
    </div>

    <!-- 病历标题 -->
    <div class="relative-position text-center">
      <p class="text-h5 q-mb-none text-weight-bolder">{{ internalData?.doctorInfo?.hospitalName }}</p>
      <p class="text-h5 q-mb-md text-weight-bolder">门(急)诊病历</p>
    </div>

    <!-- 病历基础信息 -->
    <div class="q-mb-sm">
      <el-form space-view
               label-suffix="：">
        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="姓名">
            <span>{{ internalData?.patientInfo?.name }}</span>
          </el-form-item>
          <el-form-item class="col"
                        label="性别">
            <span>{{ internalData?.patientInfo?.gender }}</span>
          </el-form-item>
        </div>
        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="年龄">
            <span>{{ internalData?.patientInfo?.age }}</span>
          </el-form-item>
          <el-form-item class="col"
                        label="科别">
            <span>{{ internalData?.doctorInfo?.deptName }}</span>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="q-mb-md dashed-line"></div>

    <!-- 病历明细信息 -->
    <div class="q-mb-sm">
      <el-form space-view
               label-width="80px"
               label-position="left"
               label-suffix="：">
        <el-form-item label="就诊时间">
          <span>{{ internalData?.visitDate }}</span>
        </el-form-item>
        <el-form-item label="主诉">
          <span>{{ internalData?.baseIllness }}</span>
        </el-form-item>
        <el-form-item label="现病史">
          <span>{{ internalData?.pastHistoryList?.map(item => item?.name)?.toString() || '无' }}</span>
        </el-form-item>
        <el-form-item label="过敏史">
          <span>{{ internalData?.allergyHistoryList?.map(item => item?.name)?.toString() || '无' }}</span>
        </el-form-item>
        <el-form-item label="既往史">
          <span>{{ internalData?.presentHistoryList?.map(item => item?.name)?.toString() || '无' }}</span>
        </el-form-item>
        <el-form-item label="检查指标"
                      v-if="internalData?.inspectionIndex?.temperature || 
                            internalData?.inspectionIndex?.weight || 
                            internalData?.inspectionIndex?.heartRate || 
                            internalData?.inspectionIndex?.bloodPressure || 
                            internalData?.inspectionIndex?.more">
          <div class="q-px-20 q-pt-10 q-pb-2"
               style="border-radius: 4px; background: #F8F8F8;">
            <el-form space-view
                     label-suffix="：">
              <div v-if="internalData?.inspectionIndex?.temperature"
                   class="row q-col-gutter-x-md solid-line">
                <el-form-item class="col"
                              label="体温">{{ internalData?.inspectionIndex?.temperature }} 度</el-form-item>
              </div>
              <div v-if="internalData?.inspectionIndex?.weight"
                   class="row q-col-gutter-x-md solid-line">
                <el-form-item class="col"
                              label="体重">{{ internalData?.inspectionIndex?.weight }} kg</el-form-item>
              </div>
              <div v-if="internalData?.inspectionIndex?.heartRate"
                   class="row q-col-gutter-x-md solid-line">
                <el-form-item class="col"
                              label="心率">{{ internalData?.inspectionIndex?.heartRate }} bpm</el-form-item>
              </div>
              <div v-if="internalData?.inspectionIndex?.bloodPressure"
                   class="row q-col-gutter-x-md solid-line">
                <el-form-item class="col"
                              label="血压">{{ internalData?.inspectionIndex?.bloodPressure }} mmHg</el-form-item>
              </div>
              <div v-if="internalData?.inspectionIndex?.more"
                   class="row q-col-gutter-x-md solid-line">
                <el-form-item class="col"
                              label="辅助检查">{{ internalData?.inspectionIndex.more }}</el-form-item>
              </div>
            </el-form>
          </div>
        </el-form-item>
        <el-form-item label="疾病诊断">
          <template v-if="internalData?.diagnoseList">
            <el-tag class="q-mr-6 q-mb-4"
                    type="info"
                    v-for="item in internalData?.diagnoseList"
                    v-bind:key="item.name">{{ item.name }}</el-tag>
          </template>
          <template v-else>
            <span>无</span>
          </template>
        </el-form-item>
        <el-form-item label="医嘱小结">
          <div v-html="internalData?.summary || '无' "></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PeaceCaseDetail',

  props: {
    data: [Object, Function]
  },

  data() {
    return {
      loading: false,
      internalData: {},

      visiableImg: false
    }
  },

  watch: {
    data: {
      async handler() {
        this.loading = true
        this.internalData = await this.fetch()
        this.loading = false
      },
      immediate: true
    }
  },

  methods: {
    async fetch() {
      return typeof this.data === 'function' ? await this.data() : this.data
    }
  }
}
</script>

<style lang="scss" scoped>
.dashed-line {
  border-bottom: 1px dashed #e5e5e5;
}

.solid-line {
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 8px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
}

.oblique-line {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 172px;
    border: 1px solid transparent;
    border-image: linear-gradient(to left, #999999, #eee);
    border-image-slice: 1;
    transform: rotateZ(170deg) scale(1);
  }
}
</style>