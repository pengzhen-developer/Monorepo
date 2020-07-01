<template>
  <div class="service-list-content">

    <div class="block">
      <span class="demonstration">提交时间：</span>
      <el-date-picker type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>

      <span class="status">状态：</span>
      <el-select v-model="value"
                 placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <el-button type="primary"
                 class="btn-fund">查询</el-button>

    </div>

    <div class="table">
      <el-table :data="tableData"
                style="width: 100%"
                max-height="600">
        <el-table-column type="index"
                         fixed
                         label="序号"
                         width="150">
        </el-table-column>
        <el-table-column prop="name"
                         label="服务名称">
        </el-table-column>
        <el-table-column prop="updataTime"
                         label="提交时间">
        </el-table-column>
        <el-table-column prop="status"
                         label="状态">
        </el-table-column>
        <el-table-column prop="time"
                         label="审核时间">
        </el-table-column>
        <el-table-column prop="remarks"
                         width="300"
                         label="备注">
        </el-table-column>
      </el-table>
    </div>

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
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      tableData: [
        {
          name: '互联网医院',
          updataTime: '2020-04-07 18:07:37',
          status: '未通过',
          time: '2020-04-07 18:07:37',
          remarks: 'dadadadadadadadaadadadadadadaadadadadadadadadadaadadadadadadaada'
        },
        {
          name: '互联网医院',
          updataTime: '2020-04-07 18:07:37',
          status: '未通过',
          time: '2020-04-07 18:07:37',
          remarks: 'dadadadadadadadaadadadadadadaada'
        },
        {
          name: '互联网医院',
          updataTime: '2020-04-07 18:07:37',
          status: '未通过',
          time: '2020-04-07 18:07:37',
          remarks: 'dadadadadadadadaadadadadadadaada'
        },
        {
          name: '互联网医院',
          updataTime: '2020-04-07 18:07:37',
          status: '未通过',
          time: '2020-04-07 18:07:37',
          remarks: 'dadadadadadadadaadadadadadadaada'
        },
        {
          name: '互联网医院',
          updataTime: '2020-04-07 18:07:37',
          status: '未通过',
          time: '2020-04-07 18:07:37',
          remarks: 'dadadadadadadadaadadadadadadaada'
        },
        {
          name: '互联网医院',
          updataTime: '2020-04-07 18:07:37',
          status: '未通过',
          time: '2020-04-07 18:07:37',
          remarks: 'dadadadadadadadaadadadadadadaada'
        }
      ]
    }
  }
}
</script>

<style scoped>
.service-list-content {
  padding: 20px 40px;
}
.table {
  margin-top: 30px;
}
.block {
  display: flex;
  flex-direction: row;
}
.demonstration {
  font-size: 14px;
  color: #333333;
}
.status {
  font-size: 14px;
  color: #333333;
  margin-left: 20px;
}
.btn-fund {
  margin-left: 20px;
  padding: 6px 16px;
}
</style>