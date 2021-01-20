<template>
  <div class="prescription">
    <el-form :model="view.model"
             inline>
      <el-form-item label="患者姓名">
        <el-input v-model="view.model.familyName"></el-input>
      </el-form-item>

      <el-form-item label="处方开具时间">
        <peace-date-picker style="width: 130px"
                           :picker-options="view.rules.pickerOptionsStart"
                           placeholder
                           v-model="view.model.s_Date"
                           value-format="yyyy-MM-dd"></peace-date-picker>
        <span class="character"></span>
        <peace-date-picker style="width: 130px"
                           :picker-options="view.rules.pickerOptionsEnd"
                           placeholder
                           v-model="view.model.e_Date"
                           value-format="yyyy-MM-dd"></peace-date-picker>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="get"
                   type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <hr />

    <peace-table pagination
                 ref="table">
      <peace-table-column label="处方编号"
                          prop="prescriptionNo"
                          min-width="180"></peace-table-column>
      <peace-table-column label="患者姓名"
                          prop="patient_name"
                          min-width="120"></peace-table-column>
      <peace-table-column label="性别"
                          prop="patient_sex"
                          min-width="100"></peace-table-column>
      <peace-table-column label="年龄"
                          prop="patient_age"
                          min-width="100"></peace-table-column>
      <peace-table-column label="身份证号"
                          prop="idcard"
                          min-width="120"></peace-table-column>
      <peace-table-column label="处方状态"
                          prop="prescription_status"
                          min-width="120"></peace-table-column>
      <peace-table-column label="开具时间"
                          prop="created_time"
                          width="180"></peace-table-column>
      <peace-table-column fixed="right"
                          label="操作">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)"
                     type="text">查看详情</el-button>
        </template>
      </peace-table-column>
    </peace-table>

    <peace-dialog :visible.sync="dialog.visible"
                  append-to-body
                  title="处方详情">
      <RecipeDetail :data="dialog.data"></RecipeDetail>
    </peace-dialog>
  </div>
</template>

<script>
import RecipeDetail from '@src/views/components/recipe/RecipeDetail'

export default {
  components: {
    RecipeDetail
  },

  data() {
    return {
      view: {
        model: {
          familyName: '',
          s_Date: '',
          e_Date: ''
        },

        rules: {
          pickerOptionsStart: {
            disabledDate: (time) => {
              if (this.view.model.e_Date) {
                return time.getTime() > this.view.model.e_Date.toDate().getTime() || time.getTime() > Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          },

          pickerOptionsEnd: {
            disabledDate: (time) => {
              if (this.view.model.s_Date) {
                return time.getTime() < this.view.model.s_Date.toDate().getTime() || time.getTime() > Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          }
        }
      },

      dialog: {
        visible: false,
        data: {}
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Peace.service.prescribePrescrip.prescripList
      const params = this.view.model

      this.$refs.table.loadData({ fetch, params })
    },

    showDetail(row) {
      this.dialog.visible = true
      this.dialog.data = {}

      const params = {
        prescriptionId: row.id
      }
      Peace.service.prescribePrescrip.getPrescripInfo(params).then((res) => {
        this.dialog.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.character {
  display: inline-flex;

  &:before {
    content: '';
    background: #e7e7e1;
    width: 15px;
    height: 1px;
    position: relative;
    top: -4px;
    margin: 0 10px;
  }
}
</style>
