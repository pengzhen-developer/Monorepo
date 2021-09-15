<template>
  <div class="layout-route">
    <div class="info">
      <div class="info-item">
        <div class="label">姓名</div>
        <div class="value">{{ info.name }}</div>
      </div>
      <div class="info-item">
        <div class="label">性别</div>
        <div class="value">{{ info.sex }}</div>
      </div>
      <div class="info-item">
        <div class="label">出生年月</div>
        <div class="value">{{ info.birthday }}</div>
      </div>
      <div class="info-item">
        <div class="label">年龄</div>
        <div class="value">{{ info.age }}</div>
      </div>
      <br />
      <div class="info-item">
        <div class="label">身份证号</div>
        <div class="value">{{ info.idcard }}</div>
      </div>
    </div>
    <div class="list">
      <el-tabs v-model="activeName">
        <el-tab-pane label="咨询记录"
                     name="inquiry">
          <div class="list-item">
            <div class="label">咨询总数：</div>
            <div class="value">{{ info.inquirylist.length }}</div>
          </div>
          <div class="list-item">
            <div class="label">累计费用：</div>
            <div class="value">{{ moneyTotal }}</div>
          </div>

          <PeaceTable v-if="activeName === 'inquiry'"
                      :data="info.inquirylist"
                      key="inquiry"
                      size="medium">
            <PeaceTableColumn label="问诊单号"
                              prop="inquiry_no"
                              width="180"></PeaceTableColumn>
            <PeaceTableColumn label="患者姓名"
                              min-width="80">
              <template slot-scope="scope">
                <span class="primary">{{ scope.row.name }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="性别"
                              min-width="60"
                              prop="sex"></PeaceTableColumn>
            <PeaceTableColumn label="年龄"
                              min-width="60"
                              prop="age"></PeaceTableColumn>
            <PeaceTableColumn label="身份证号"
                              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.idcard }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="咨询类型"
                              width="120">
              <template slot-scope="scope">
                <div class="private">
                  <span class="private-tag"
                        v-if="scope.row.isPrivateDoctor">私</span>
                  <span>{{ scope.row.inquiry_type | getEnumLabel(source.ENUM_INQUIRY_TYPE) }}</span>
                </div>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="订单金额（元）"
                              prop="pay_money"
                              align="right"
                              header-align="right"
                              width="125"></PeaceTableColumn>
            <PeaceTableColumn label="问诊医生"
                              min-width="80"
                              prop="doctor"></PeaceTableColumn>
            <PeaceTableColumn label="订单状态"
                              min-width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.inquiry_status_str }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="订单时间"
                              min-width="165"
                              prop="created_time"></PeaceTableColumn>
            <PeaceTableColumn fixed="right"
                              label="操作">
              <template slot-scope="scope">
                <el-button @click="getInquiryInfo(scope.row.inquiry_no)"
                           type="text">查看详情</el-button>
              </template>
            </PeaceTableColumn>
          </PeaceTable>
        </el-tab-pane>
        <el-tab-pane label="复诊记录"
                     name="returnVisit">
          <div class="list-item">
            <div class="label">复诊总数：</div>
            <div class="value">{{ info.returnVisitlist.length }}</div>
          </div>
          <div class="list-item">
            <div class="label">累计费用：</div>
            <div class="value">{{ moneyAmount }}</div>
          </div>

          <PeaceTable v-if="activeName === 'returnVisit'"
                      :data="info.returnVisitlist"
                      key="returnVisit"
                      size="medium">
            <PeaceTableColumn label="问诊单号"
                              prop="inquiry_no"
                              width="180"></PeaceTableColumn>
            <PeaceTableColumn label="患者姓名"
                              min-width="80">
              <template slot-scope="scope">
                <span class="primary">{{ scope.row.name }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="性别"
                              min-width="60"
                              prop="sex"></PeaceTableColumn>
            <PeaceTableColumn label="年龄"
                              min-width="60"
                              prop="age"></PeaceTableColumn>
            <PeaceTableColumn label="身份证号"
                              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.idcard }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="订单金额（元）"
                              align="right"
                              header-align="right"
                              width="125"
                              prop="pay_money"></PeaceTableColumn>
            <PeaceTableColumn label="问诊医生"
                              min-width="100"
                              prop="doctor"></PeaceTableColumn>
            <PeaceTableColumn label="订单状态"
                              min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.inquiry_status_str}}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="订单时间"
                              min-width="165"
                              prop="created_time"></PeaceTableColumn>
            <PeaceTableColumn fixed="right"
                              label="操作">
              <template slot-scope="scope">
                <el-button @click="getInquiryInfo(scope.row.inquiry_no)"
                           type="text">查看详情</el-button>
              </template>
            </PeaceTableColumn>
          </PeaceTable>
        </el-tab-pane>
        <el-tab-pane label="处方记录"
                     name="pres">
          <div class="list-item">
            <div class="label">处方总数：</div>
            <div class="value">{{ info.preslist.length }}</div>
          </div>
          <PeaceTable v-if="activeName === 'pres'"
                      :data="info.preslist"
                      key="prescription"
                      size="medium">
            <PeaceTableColumn label="处方编号"
                              prop="prescriptionNo"
                              width="200"></PeaceTableColumn>
            <PeaceTableColumn label="患者姓名">
              <template slot-scope="scope">
                <span class="primary">{{ scope.row.patient_name }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="性别"
                              prop="patient_sex"></PeaceTableColumn>
            <PeaceTableColumn label="年龄"
                              prop="patient_age"></PeaceTableColumn>
            <PeaceTableColumn label="身份证号"
                              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.idcard }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="开具医生"
                              prop="name"></PeaceTableColumn>
            <PeaceTableColumn label="处方状态">
              <template slot-scope="scope">
                <span>{{ getStatusText(scope.row.prescription_status) }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="开具时间"
                              prop="created_time"
                              width="180"></PeaceTableColumn>
            <PeaceTableColumn fixed="right"
                              label="操作">
              <template slot-scope="scope">
                <el-button @click="getPresInfo(scope.row.prescribeId)"
                           type="text">查看详情</el-button>
              </template>
            </PeaceTableColumn>
          </PeaceTable>
        </el-tab-pane>
      </el-tabs>
    </div>
    <PeaceDialog :visible.sync="presDialogVisible"
                 append-to-body
                 title="处方详情"
                 v-if="presDialogVisible"
                 width="580px">
      <prescription-info :id="currentPres"></prescription-info>
    </PeaceDialog>
    <PeaceDialog :visible.sync="inquiryDialogVisible"
                 append-to-body
                 class="inquiry scroll-body"
                 :title="detailTitle"
                 v-if="inquiryDialogVisible"
                 width="800px">
      <message-list :info="currentInquiry"></message-list>
    </PeaceDialog>

  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import PrescriptionInfo from './components/PrescriptionInfo.js'
import MessageList from './components/MessageList.js'

export default {
  name: 'PatientDetail',
  components: { PrescriptionInfo, MessageList },
  data() {
    return {
      source: {
        ENUM_INQUIRY_TYPE: CONSTANT.ENUM_INQUIRY_TYPE
      },
      currentPres: '',
      currentInquiry: '',
      info: {
        preslist: [],
        inquirylist: [],
        returnVisitlist: []
      },
      activeName: '',
      presDialogVisible: false,
      inquiryDialogVisible: false
    }
  },
  computed: {
    moneyTotal() {
      const arr = this.info.inquirylist || []
      return arr.reduce((total, current) => total + parseFloat(current.pay_money || 0), 0).toFixed(2)
    },
    moneyAmount() {
      const arr = this.info.returnVisitlist || []
      return arr.reduce((total, current) => total + parseFloat(current.pay_money || 0), 0).toFixed(2)
    },
    detailTitle() {
      const data = { inquiry: '咨询记录', returnVisit: '复诊记录' }
      return this.activeName && data[this.activeName]
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getInfo(this.$route.query.patientNo)
    })
  },
  methods: {
    getStatusText(key) {
      const dict = {
        1: '待审核',
        2: '质疑中',
        3: '已拒绝',
        4: '已作废',
        5: '已通过',
        6: '已下单/已缴费',
        7: '已配药',
        8: '已发药'
      }

      return dict[key]
    },

    getInquiryInfo(id) {
      // 查看问诊记录
      Service.getInquiryInfo({ inquiryNo: id }).then((res) => {
        const data = res.data
        if (data.msgInfo.length > 0) {
          this.currentInquiry = data
          this.inquiryDialogVisible = true
        } else {
          Peace.util.warning('暂无问诊记录')
        }
      })
    },
    getPresInfo(id) {
      this.currentPres = id
      this.presDialogVisible = true
    },
    getInfo(patientNo) {
      this.activeName = this.$route.query.type ? this.$route.query.type : 'inquiry'
      this.info = {
        preslist: [],
        inquirylist: [],
        returnVisitlist: []
      }
      Service.getPatientDetail({ patientNo: patientNo }).then((res) => {
        const data = res.data
        this.info = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  padding-bottom: 30px;
  width: 100%;
  background-color: #fff;
}
.info-item {
  margin-top: 19px;
  margin-left: 15px;
  font-size: 0px;
  display: inline-block;
  .label,
  .value {
    font-size: 14px;
    line-height: 20px;
    display: inline-block;
  }
  .label {
    width: 56px;
    color: #666;
    text-align-last: justify;
    text-align: justify;
    text-justify: distribute-all-lines;
  }
  .value {
    margin: 0 35px;
    color: #333;
  }
}
.list {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  font-size: 0;
  &-item {
    margin-bottom: 15px;
    font-size: 0;
    display: inline-block;
    & + & {
      margin-left: 30px;
    }
    .label,
    .value {
      font-size: 14px;
      line-height: 20px;
      display: inline-block;
    }
    .label {
      color: #666;
    }
    .value {
      margin-left: 18px;
      color: #333;
    }
  }
}
.list {
  span {
    vertical-align: middle;
  }
}
.private {
  position: relative;
  padding: 0 20px;
  &-tag {
    position: absolute;
    top: 3px;
    left: 3px;
    margin-right: 3px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    display: inline-block;
    background-color: var(--q-color-primary);
  }
}
</style>