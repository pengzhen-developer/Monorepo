<template>
  <div>
    <div v-if="data.length <= 0">
      <div>
        <el-form :model="view.model" inline>
          <el-form-item label="患者姓名">
            <el-input placeholder v-model="view.model.familyName"></el-input>
          </el-form-item>
          <el-form-item label="处方开具时间">
            <el-date-picker :picker-options="view.rules.pickerOptionsStart" placeholder v-model="view.model.s_Date" value-format="yyyy-MM-dd"></el-date-picker>
            <span class="character"></span>
            <el-date-picker :picker-options="view.rules.pickerOptionsEnd" placeholder v-model="view.model.e_Date" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-button @click="get" round type="primary">查询</el-button>
          </el-form-item>
        </el-form>

        <hr>

        <peace-table pagination ref="table">
          <peace-table-column label="处方编号" prop="prescriptionNo" width="180"></peace-table-column>
          <peace-table-column align="left" label="患者姓名" prop="patient_name"></peace-table-column>
          <peace-table-column label="性别" prop="patient_sex"></peace-table-column>
          <peace-table-column label="年龄" prop="patient_age"></peace-table-column>
          <peace-table-column label="身份证号" prop="idcard" width="200"></peace-table-column>
          <peace-table-column align="right" label="处方状态" prop="prescription_status"></peace-table-column>
          <peace-table-column label="开具时间" prop="created_time" width="180"></peace-table-column>
          <peace-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
            </template>
          </peace-table-column>
        </peace-table>

        <peace-dialog :visible.sync="dialog.visible" title="处方详情" width="800px">
          <chat-session-prescription-detail :data="dialog.data"></chat-session-prescription-detail>
        </peace-dialog>
      </div>
    </div>

    <div class="no-data" v-else>
      <img src="~@/assets/images/not-status.png">
      <span>暂无问诊记录</span>
    </div>
  </div>
</template>

<script>
import ChatSessionPrescriptionDetail from '@/views/clinic/inquiry/ChatSessionPrescriptionDetail'

import config from './config'

export default {
  components: {
    ChatSessionPrescriptionDetail
  },

  data() {
    return {
      config,

      view: {
        model: {
          familyName: '',
          s_Date: '',
          e_Date: ''
        },

        rules: {
          pickerOptionsStart: {
            disabledDate: time => {
              if (this.view.model.e_Date) {
                return time.getTime() > this.view.model.e_Date.toDate().getTime() || time.getTime() > Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          },

          pickerOptionsEnd: {
            disabledDate: time => {
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

        model: {},

        data: {}
      },

      data: []
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      this.$refs.table.loadData({
        api: this.config.api.prescripList,
        params: {
          ...this.view.model
        }
      })
    },

    showDetail(row) {
      this.dialog.data = {}
      this.dialog.visible = true

      // 获取处方信息
      this.$http.get(this.config.api.getPrescription, { params: { prescriptionId: row.id } }).then(res => {
        this.dialog.data = { ...res.data }
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

.el-form-item {
  margin-right: 60px;

  .el-input {
    width: 140px;
    height: 27px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.13);
    border-radius: 3px;
  }
}

.no-data {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  img {
    display: block;
    width: 150px;
    height: 150px;
  }

  span {
    margin-top: 20px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
  }
}
</style>
