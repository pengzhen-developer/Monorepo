<template>
  <div>
    <h4>线上咨询时间（互联网医院出诊时间）</h4>
    <h5>(温馨提示：点击鼠标勾选出诊时间)</h5>
    <el-table :data="view.source.online" border ref="table">
      <peace-table-column label prop="dateType"></peace-table-column>
      <peace-table-column label="周一">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Monday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周二">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Tuesday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周三">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Wednesday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周四">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Thursday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周五">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Friday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周六">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Saturday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周日">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Sunday"></el-checkbox>
        </template>
      </peace-table-column>
    </el-table>

    <hr>

    <h4>线下门诊时间（所在实体医疗机构出诊时间）</h4>
    <el-table :data="view.source.underline" border ref="table">
      <peace-table-column label prop="dateType"></peace-table-column>
      <peace-table-column label="周一">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Monday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周二">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Tuesday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周三">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Wednesday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周四">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Thursday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周五">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Friday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周六">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Saturday"></el-checkbox>
        </template>
      </peace-table-column>
      <peace-table-column label="周日">
        <template slot-scope="scope">
          <el-checkbox label v-model="scope.row.Sunday"></el-checkbox>
        </template>
      </peace-table-column>
    </el-table>
    <h5 style="text-align: right">*患者端可以查看您的出诊时间</h5>

    <hr>

    <el-button @click="save" type="primary">保存</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api: {
        getDoctorInfo: 'client/v1/Personalcenter/getDoctorInfo',

        upDoctorWork: 'client/v1/Personalcenter/upDoctorWork'
      },

      view: {
        model: {},

        source: {
          online: [],
          underline: []
        }
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.buildTableData()
      this.get()
    })
  },

  methods: {
    get() {
      const params = {
        doctorId: $peace.cache.get('USER').list.docInfo.doctor_id
      }

      this.$http.get(this.api.getDoctorInfo, { params }).then(res => {
        this.view.model = res.data

        res.data.doctor_work_On_line.forEach(checkedRow => {
          const onlineRow = this.view.source.online.find(item => item.dateType === checkedRow.timestr)

          const key =
            checkedRow.dayno === 1
              ? 'Monday'
              : checkedRow.dayno === 2
              ? 'Tuesday'
              : checkedRow.dayno === 3
              ? 'Wednesday'
              : checkedRow.dayno === 4
              ? 'Thursday'
              : checkedRow.dayno === 5
              ? 'Friday'
              : checkedRow.dayno === 6
              ? 'Saturday'
              : checkedRow.dayno === 7
              ? 'Sunday'
              : ''

          onlineRow[key] = true
        })

        res.data.doctor_work_Under_line.forEach(checkedRow => {
          const underlineRow = this.view.source.underline.find(item => item.dateType === checkedRow.timestr)

          const key =
            checkedRow.dayno === 1
              ? 'Monday'
              : checkedRow.dayno === 2
              ? 'Tuesday'
              : checkedRow.dayno === 3
              ? 'Wednesday'
              : checkedRow.dayno === 4
              ? 'Thursday'
              : checkedRow.dayno === 5
              ? 'Friday'
              : checkedRow.dayno === 6
              ? 'Saturday'
              : checkedRow.dayno === 7
              ? 'Sunday'
              : ''

          underlineRow[key] = true
        })
      })
    },

    buildTableData() {
      const dateTypeList = ['早上', '下午', '晚上']

      dateTypeList.forEach(dateType => {
        this.view.source.online.push({
          dateType,
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false
        })

        this.view.source.underline.push({
          dateType,
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false
        })
      })
    },

    save() {
      const doctor_work_Online = []
      const doctor_work_Underline = []

      this.view.source.online.forEach(row => {
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            if (key !== 'dateType') {
              if (row[key]) {
                doctor_work_Online.push({
                  timestr: row.dateType,
                  dayno:
                    key === 'Monday'
                      ? 1
                      : key === 'Tuesday'
                      ? 2
                      : key === 'Wednesday'
                      ? 3
                      : key === 'Thursday'
                      ? 4
                      : key === 'Friday'
                      ? 5
                      : key === 'Saturday'
                      ? 7
                      : key === 'Sunday'
                      ? 1
                      : ''
                })
              }
            }
          }
        }
      })

      this.view.source.underline.forEach(row => {
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            if (key !== 'dateType') {
              if (row[key]) {
                doctor_work_Underline.push({
                  timestr: row.dateType,
                  dayno:
                    key === 'Monday'
                      ? 1
                      : key === 'Tuesday'
                      ? 2
                      : key === 'Wednesday'
                      ? 3
                      : key === 'Thursday'
                      ? 4
                      : key === 'Friday'
                      ? 5
                      : key === 'Saturday'
                      ? 7
                      : key === 'Sunday'
                      ? 1
                      : ''
                })
              }
            }
          }
        }
      })

      const params = {
        doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
        doctor_work_Online: doctor_work_Online,
        doctor_work_Underline: doctor_work_Underline
      }

      this.$http.post(this.api.upDoctorWork, params).then(res => {
        $peace.util.alert(res.msg)

        this.get()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  margin: 10px 0;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

h5 {
  margin: 10px 0;
  font-size: 12px;
  font-weight: 400;
  color: #9b9b9b;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid transparent;
  margin: 20px 0;
  padding: 0;
}
</style>
