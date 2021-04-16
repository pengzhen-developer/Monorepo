<template>
  <div class="pb-sm">
    <div class="info-row flex q-mb-4">
      <div class="info-row-label q-mr-8 text-grey-999">
        <span>处方总数</span>
      </div>
      <div class="info-row-content ">{{ count }}</div>
    </div>
    <PeaceTable :data="pres"
                border
                class="table"
                size="small">
      <PeaceTableColumn label="处方编号"
                        min-width="145"
                        prop="prescriptionNo"></PeaceTableColumn>
      <PeaceTableColumn label="医生"
                        prop="doctorName"></PeaceTableColumn>
      <PeaceTableColumn label="医疗机构"
                        min-width="160"
                        prop="hospitalName"></PeaceTableColumn>
      <PeaceTableColumn label="科室"
                        min-width="100"
                        prop="deptName"></PeaceTableColumn>
      <PeaceTableColumn label="患者姓名"
                        prop="familyName"
                        min-width="90"></PeaceTableColumn>
      <PeaceTableColumn label="患者身份证号"
                        min-width="145"
                        prop="familyIdCard"></PeaceTableColumn>
      <PeaceTableColumn label="处方状态"
                        min-width="100"
                        prop="prescriptionStatus"></PeaceTableColumn>
      <PeaceTableColumn label="处方开具时间"
                        min-width="145"
                        prop="createdTime"></PeaceTableColumn>
    </PeaceTable>
    <el-pagination :current-page.sync="pageNumber"
                   :total="count"
                   @current-change="getPres"
                   background
                   layout="->,prev, pager,next"
                   style="margin-top:10px;"
                   v-if="count > 10"></el-pagination>
  </div>
</template>
<script>
import Service from '../service'

export default {
  name: 'PresDetails',
  props: {
    id: String
  },
  data() {
    return {
      pres: [],
      count: 0,
      pageNumber: 1
    }
  },
  methods: {
    getPres() {
      const params = {
        patientId: this.id,
        p: this.pageNumber,
        size: 10
      }

      Service.getPresList(params).then((res) => {
        const data = res.data
        this.pres = data.list
        this.count = data.total
      })
    }
  },
  created() {
    this.getPres()
  }
}
</script>
<style lang="scss" scoped>
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
}
.info-row {
  &-label,
  &-content {
    font-size: 12px;
    font-weight: normal;
  }
}
</style>
