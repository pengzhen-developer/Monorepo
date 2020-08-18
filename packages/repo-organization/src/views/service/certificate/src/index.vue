<template>
  <div class="layout-route">
    <div class="q-pa-lg bg-white">
      <el-table :data="tableData"
                style="width: 100%"
                max-height="600">
        <el-table-column fixed
                         prop="serviceName"
                         width="300"
                         align="center"
                         label="服务名称">
        </el-table-column>
        <el-table-column prop="accessKeyId"
                         align="center"
                         label="Accesskey  ID">
        </el-table-column>
        <el-table-column label="AccessKey Secret "
                         align="center">
          <template slot-scope="scope">
            <div class="status-item">
              <span v-if='scope.row.isHide'>
                ******
              </span>
              <span v-else>
                {{ scope.row.accesskeySecret }}
              </span>
              <i class="icon el-icon-view eyes"
                 @click="showAndHid(scope.row)"></i>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="createdTime"
                         align="center"
                         width="200"
                         label="创建时间">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         align="center"
                         width="150">
          <template slot-scope="scope">
            <el-button @click.native.prevent="redText(scope.row)"
                       type="text"
                       size="small">
              开发文档
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      tableData: []
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getMyCertificationList()
    })
  },

  methods: {
    getMyCertificationList() {
      Service.getMyCertificationList().then((res) => {
        const tmp = res.data.list
        for (var i = 0; i < tmp.length; i++) {
          tmp[i].isHide = true
        }
        this.tableData = tmp
      })
    },

    redText(row) {
      window.open(row.pdfUrl)
    },

    showAndHid(row) {
      row.isHide = !row.isHide
    }
  }
}
</script>

<style scoped>
.status-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.eyes {
  margin-left: 5px;
}
</style>