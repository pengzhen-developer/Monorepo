<template>
  <div class="pb-sm">
    <div class="info-row flex q-mb-4">
      <div class="info-row-label q-mr-8 text-grey-999">
        <span>家人总数</span>
      </div>
      <div class="info-row-content">{{ count }}</div>
    </div>
    <PeaceTable :data="familys"
                border
                class="table"
                size="small">

      <PeaceTableColumn label="姓名"
                        prop="familyName"></PeaceTableColumn>
      <PeaceTableColumn label="身份证号"
                        prop="idcard"
                        width="200"></PeaceTableColumn>
      <PeaceTableColumn label="关系"
                        prop="relation"></PeaceTableColumn>
      <PeaceTableColumn label="性别"
                        prop="sex"></PeaceTableColumn>
      <PeaceTableColumn label="年龄"
                        prop="age"></PeaceTableColumn>
      <PeaceTableColumn label="民族">
        <template slot-scope="scope">
          <span>{{ scope.row.nation || '——' }}</span>
        </template>
      </PeaceTableColumn>
    </PeaceTable>
    <el-pagination :current-page.sync="pageNumber"
                   :total="count"
                   @current-change="getFamilys"
                   background
                   layout="->,prev, pager,next"
                   style="margin-top:10px;"
                   v-if="count > 10"></el-pagination>
  </div>
</template>
<script>
import Service from '../service'

export default {
  name: 'FamilyDetails',
  props: { id: String },
  data() {
    return {
      familys: [],
      count: 0,
      pageNumber: 1
    }
  },
  methods: {
    getFamilys() {
      const params = {
        patientId: this.id,
        p: this.pageNumber,
        size: 10
      }
      Service.getFamilyList(params).then((res) => {
        const data = res.data
        this.familys = data.list
        this.count = data.total
      })
    }
  },
  created() {
    this.getFamilys()
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
