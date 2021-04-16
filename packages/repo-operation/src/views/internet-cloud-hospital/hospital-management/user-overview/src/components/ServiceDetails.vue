<template>
  <div class="pb-sm">
    <PeaceTable :data="Services"
                border
                class="table"
                size="small">
      <PeaceTableColumn label="服务包名称"
                        prop="servicePackageName"
                        width="160"></PeaceTableColumn>
      <PeaceTableColumn label="购买时间"
                        width="160"
                        prop="payTime"></PeaceTableColumn>
      <PeaceTableColumn label="签约主体"
                        width="100"
                        prop="docName"></PeaceTableColumn>
      <PeaceTableColumn label="状态"
                        prop="packageStatusText"></PeaceTableColumn>
      <PeaceTableColumn label="完成说明"
                        min-width="120"
                        prop="completionInstructions"></PeaceTableColumn>
      <PeaceTableColumn label="有效期至"
                        width="110">
        <template slot-scope="scope">
          {{ scope.row.expireTime || '——' }}
        </template>
      </PeaceTableColumn>

      <PeaceTableColumn label="操作"
                        width="120"
                        fixed="right">
        <template slot-scope="scope">
          <el-button @click="showServiceDetail(scope.row)"
                     type="text">查看内容</el-button>
        </template>
      </PeaceTableColumn>

    </PeaceTable>

    <el-pagination :current-page.sync="pageNumber"
                   :total="count"
                   @current-change="getServiceByfamily"
                   background
                   layout="->,prev, pager,next"
                   style="margin-top:10px;"
                   v-if="count > 10"></el-pagination>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="serviceDialog.visible"
                  title="服务内容"
                  append-to-body
                  width="400px">
      <PeaceTable :data="serviceDialog.data"
                  size="mini"
                  stripe>
        <PeaceTableColumn label="服务包权益"
                          prop="equitiesName"
                          width="150"></PeaceTableColumn>
        <PeaceTableColumn label="总次数"
                          width="109"
                          prop="num"></PeaceTableColumn>
        <PeaceTableColumn label="剩余"
                          width="109"
                          prop="surplusNum"></PeaceTableColumn>
      </PeaceTable>
    </peace-dialog>

  </div>
</template>
<script>
import Service from '../service'
export default {
  name: 'ServiceDetails',
  props: { id: String },
  data() {
    return {
      Services: [],
      count: 0,
      pageNumber: 1,
      serviceDialog: {
        visible: false,
        id: '',
        data: undefined
      }
    }
  },
  methods: {
    showServiceDetail(row) {
      Service.getServiceDetailInfo({ id: row.id }).then((res) => {
        const rs = res.data
        this.serviceDialog.data = rs
        this.serviceDialog.visible = true
      })
    },

    getServiceByfamily() {
      const params = {
        patientId: this.id,
        p: this.pageNumber,
        size: 10
      }
      Service.getServiceByfamily(params).then((res) => {
        const data = res.data
        this.Services = data.list
        this.count = data.total
      })
    }
  },
  created() {
    this.getServiceByfamily()
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
