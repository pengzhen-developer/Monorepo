<template>
  <div class="certificate-content">
    <el-table :data="tableData"
              style="width: 100%"
              max-height="600">
      <el-table-column fixed
                       prop="name"
                       label="服务名称">
      </el-table-column>
      <el-table-column prop="id"
                       label="Accesskey  ID">
      </el-table-column>
      <el-table-column prop="secret"
                       label="AccessKey Secret ">
      </el-table-column>
      <el-table-column prop="time"
                       label="创建时间">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
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
export default {
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    }
  },
  data() {
    return {
      tableData: [
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        },
        {
          name: '互联网医院',
          id: 'wyk4ch270X8S187N',
          secret: 'dadadadadadada',
          time: '2020-04-07 18:07:37'
        }
      ]
    }
  }
}
</script>

<style scoped>
.certificate-content {
  padding: 20px 40px;
}
</style>