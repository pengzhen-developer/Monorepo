<template>
  <div class="q-pa-lg">
    <el-table :data="tableData"
              style="width: 100%"
              max-height="600">
      <el-table-column fixed
                       prop="serviceName"
                       width="300"
                       label="服务名称">
      </el-table-column>
      <el-table-column prop="accessKeyId"
                       label="Accesskey  ID">
      </el-table-column>
      <el-table-column label="AccessKey Secret ">
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
                       width="200"
                       label="创建时间">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-button @click.native.prevent="redText(scope.$index, tableData)"
                     type="text"
                     size="small">
            开发文档
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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

    redText(index, rows) {
      console.log(index, rows)
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
  align-items: center;
}
.eyes {
  margin-left: 5px;
}
</style>