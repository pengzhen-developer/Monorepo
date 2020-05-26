<template>
  <div class="consultation-patient">
    <div class="header">
      <i class="icon_archives_icon_applicationinformation"></i>
      <span>会诊申请单</span>
    </div>

    <div class="body"
         v-if="data">
      <el-scrollbar class="body-scrollbar">
        <div class="card">
          <div class="title">
            <i class="icon_archives_icon_patient"></i>
            <span>患者信息：</span>
          </div>

          <div class="content patient">
            <div class="item">
              <div class="doctor-img"
                   style="width: 40px; height: 40px; background: #00c6ae; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-right: 10px;">
                <span style="color: #fff; margin: 0;">{{
                  data.familyName.substr(
                    data.familyName.length - 2,
                    data.familyName.length
                  )
                }}</span>
              </div>

              <span style="font-weight:600; color: rgba(51,51,51,1);">{{
                data.familyName
              }}</span>
              <span>{{ data.familySex }}</span>
              <span>{{ data.familyAge }}</span>
            </div>
            <div class="item">
              <el-button @click="showDetail"
                         v-if="data.inquiryNo"
                         type="text"
                         style="font-size: 12px;">查看详情</el-button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="title">
            <i class="icon_archives_icon_doctor"></i>
            <!-- 我发起的会诊 -->
            <template v-if="
                $store.getters['consultation/consultInfo'].startDoctor[0]
                  .doctorId ===
                  $store.state.user.userInfo.list.docInfo.doctor_id
              ">
              <span>受邀医生：</span>
            </template>

            <!-- 我受邀的会诊 -->
            <template v-else>
              <span>发起医生：</span>
            </template>
          </div>

          <div class="content doctor">
            <template v-if="
                $store.getters['consultation/consultInfo'].startDoctor[0]
                  .doctorId ===
                  $store.state.user.userInfo.list.docInfo.doctor_id
              ">
              <img :src="data.toPhoto"
                   class="doctor-img" />
            </template>
            <template v-else>
              <img :src="data.fromPhoto"
                   class="doctor-img" />
            </template>

            <div class="doctor-info">
              <div>
                <template v-if="
                    $store.getters['consultation/consultInfo'].startDoctor[0]
                      .doctorId ===
                      $store.state.user.userInfo.list.docInfo.doctor_id
                  ">
                  <span style="font-weight:600; color: rgba(51,51,51,1);">{{
                    data.toDoctorName
                  }}</span>
                </template>
                <template v-else>
                  <span style="font-weight:600; color: rgba(51,51,51,1);">{{
                    data.fromDoctorName
                  }}</span>
                </template>
              </div>
              <div>
                <template v-if="
                    $store.getters['consultation/consultInfo'].startDoctor[0]
                      .doctorId ===
                      $store.state.user.userInfo.list.docInfo.doctor_id
                  ">
                  <span>{{ data.toDeptName }}</span>
                  <span>{{ data.toDoctorTitle }}</span>
                </template>
                <template v-else>
                  <span>{{ data.fromDeptName }}</span>
                  <span>{{ data.fromDoctorTitle }}</span>
                </template>
              </div>
              <div>
                <template v-if="
                    $store.getters['consultation/consultInfo'].startDoctor[0]
                      .doctorId ===
                      $store.state.user.userInfo.list.docInfo.doctor_id
                  ">
                  <span :title="data.toHospitalName">{{
                    data.toHospitalName
                  }}</span>
                </template>
                <template v-else>
                  <span :title="data.fromHospitalName">{{
                    data.fromHospitalName
                  }}</span>
                </template>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="title">
            <i class="icon_archives_icon_applicationinformation"></i>
            <span>申请会诊信息：</span>
          </div>

          <div class="content consultation">
            <div class="item">
              <div class="title">
                <el-divider direction="vertical"></el-divider>
                <span>疾病诊断</span>
              </div>
              <div class="content">
                <el-tag :key="item"
                        style="margin-right: 5px; border: none; "
                        type="info"
                        v-for="item in data.familyDisagnose.split('|')">{{ item }}</el-tag>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <el-divider direction="vertical"></el-divider>
                <span>申请会诊说明</span>
              </div>
              <div class="content">
                <span>{{ data.consultExplain }}</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <el-divider direction="vertical"></el-divider>
                <span>期望会诊时间</span>
              </div>
              <div class="content">
                <span>{{ data.expectTime }}</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <el-divider direction="vertical"></el-divider>
                <span>提交申请时间</span>
              </div>
              <div class="content">
                <span>{{ data.createdTime }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="title">
            <i class="icon_archives_icon_toexamine"></i>
            <span>审核意见：</span>
          </div>

          <div class="content time-line">
            <el-timeline>
              <el-timeline-item :timestamp="data.outCheckTime"
                                placement="top"
                                type="primary">
                <el-tag class="timestamp_extend">{{ data.outCheckStatus === 3 ? "已通过" : "" }}
                </el-tag>

                <div class="timestamp_remark">
                  <p>
                    <span>审核机构：</span>
                    <span>{{ data.fromHospitalName }}</span>
                  </p>
                  <p>
                    <span>审核备注：</span>
                    <span>{{ data.outCheckSuggest }}</span>
                  </p>
                </div>
              </el-timeline-item>

              <el-timeline-item :timestamp="data.inCheckTime"
                                placement="top"
                                type="primary">
                <el-tag class="timestamp_extend">{{ data.inCheckStatus === 3 ? "已通过" : "" }}
                </el-tag>

                <div class="timestamp_remark">
                  <p>
                    <span>审核机构：</span>
                    <span>{{ data.toHospitalName }}</span>
                  </p>
                  <p>
                    <span>审核备注：</span>
                    <span>{{ data.inCheckSuggest }}</span>
                  </p>
                </div>
              </el-timeline-item>

              <el-timeline-item :timestamp="data.doctorExamineTime"
                                placement="top"
                                type="primary">
                <el-tag class="timestamp_extend">接&emsp;诊</el-tag>

                <div class="timestamp_remark">
                  <p>
                    <span>会诊医生接诊</span>
                  </p>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>

        <div class="card">
          <el-row>
            <el-col :span="8"
                    v-if="$store.getters['consultation/consultInfo'].isSendCase">
              <div @click="getCaseDetail"
                   style="text-align: center;">
                <img style="width: 26px; height: 26px;"
                     src="~@src/assets/images/inquiry/ic_medical record.png" />
                <p style="font-size: 14px;">病历</p>
              </div>
            </el-col>
            <el-col :span="8"
                    v-if="$store.getters['consultation/consultInfo'].isSendRecipe">
              <div @click="getRecipeDetail"
                   style="text-align: center;">
                <img style="width: 26px; height: 26px;"
                     src="~@src/assets/images/inquiry/ic_rp.png" />
                <p style="font-size: 14px;">处方</p>
              </div>
            </el-col>
            <el-col :span="8"
                    v-if="$store.getters['consultation/consultInfo'].isCommit">
              <div @click="getConsultDetail"
                   style="text-align: center;">
                <img style="width: 26px; height: 26px;"
                     src="~@src/assets/images/inquiry/ic_huizhen@2x.png" />
                <p style="font-size: 14px;">会诊小结</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>

    <peace-dialog :visible.sync="caseDialog.visible"
                  v-if="caseDialog.visible"
                  title="病历详情">
      <ConsultationSessionCaseDetail :data="caseDialog.data"></ConsultationSessionCaseDetail>
    </peace-dialog>

    <peace-dialog :visible.sync="recipeDialog.visible"
                  v-if="recipeDialog.visible"
                  title="处方详情">
      <ConsultationSessionRecipeDetail :data="recipeDialog.data"></ConsultationSessionRecipeDetail>
    </peace-dialog>

    <peace-dialog :visible.sync="consultDetail.visible"
                  v-if="consultDetail.visible"
                  title="会诊单详情">
      <ConsultationDetail :data="consultDetail.data"></ConsultationDetail>
    </peace-dialog>

    <peace-dialog :visible.sync="inquiry.visible"
                  class="chat-room-bg"
                  v-if="inquiry.visible"
                  title="问诊记录">
      <InquirySessionMessageList :data="inquiry.data"
                                 :patientInfo="inquiry.patientInfo"
                                 :doctorInfo="inquiry.doctorInfo"
                                 type="consult"></InquirySessionMessageList>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

// import InquirySessionMessageList from '@src/views/components/inquiry/InquirySessionMessageList'
import InquirySessionMessageList from '@src/views/components/inquiry/messageList/index'
import ConsultationSessionCaseDetail from './ConsultationSessionCaseDetail'
import ConsultationSessionRecipeDetail from './ConsultationSessionRecipeDetail'
import ConsultationDetail from './ConsultationDetail'

export default {
  components: {
    InquirySessionMessageList,
    ConsultationSessionCaseDetail,
    ConsultationSessionRecipeDetail,
    ConsultationDetail
  },

  data() {
    return {
      data: undefined,

      caseDialog: {
        visible: false,
        data: undefined
      },

      recipeDialog: {
        visible: false,
        data: undefined
      },

      consultDetail: {
        visible: false,
        data: undefined
      },

      inquiry: {
        visible: false,
        data: undefined,
        patientInfo: {},
        doctorInfo: {}
      }
    }
  },

  watch: {
    '$store.state.consultation.session'() {
      this.getConsultationDetail()
    }
  },

  created() {
    this.getConsultationDetail()
  },

  methods: {
    getCaseDetail() {
      const params = {
        consultNo: this.$store.getters['consultation/consultInfo'].consultNo
      }

      peace.service.inquiry.getCase(params).then((res) => {
        this.caseDialog.visible = true
        this.caseDialog.data = res.data
      })
    },

    getRecipeDetail() {
      const params = {
        consultNo: this.$store.getters['consultation/consultInfo'].consultNo,
        p: 1,
        size: 999
      }

      peace.service.prescribePrescrip.getConsultPrescripList(params).then((res) => {
        this.recipeDialog.visible = true
        this.recipeDialog.data = res.data
      })
    },

    getConsultDetail() {
      const params = {
        consultNo: this.$store.getters['consultation/consultInfo'].consultNo
      }

      peace.service.consult.getConsultInfo(params).then((res) => {
        this.consultDetail.visible = true
        this.consultDetail.data = res.data.info
      })
    },

    getConsultationDetail() {
      const params = {
        consultNo: this.$store.getters['consultation/consultInfo'].consultNo
      }

      peace.service.consult.getConsultInfo(params).then((res) => {
        this.data = res.data.info
      })
    },

    showDetail() {
      if (this.data.inquiryStatus !== peace.type.INQUIRY.INQUIRY_STATUS.已完成) {
        return peace.util.alert('问诊尚未结束，无法查看记录')
      }

      const params = {
        inquiryNo: this.data.inquiryNo
      }

      peace.service.patient.getOneInquiry(params).then((res) => {
        const historyMessageFormatHandler = (messages) => {
          if (messages && Array.isArray(messages)) {
            messages.forEach((message) => {
              const messageTypeMap = { 0: 'text', 1: 'image', 100: 'custom' }

              message.time = message.sendtime
              message.flow = this.data.fromDoctorId === message.from ? 'out' : 'in'
              message.type = messageTypeMap[message.type]
              message.text = message.body.msg
              message.content = message.body
              message.file = message.body
            })
          }
        }

        historyMessageFormatHandler(res.data.msgInfo)

        this.inquiry.data = []
        this.inquiry.data = res.data.msgInfo
        this.inquiry.patientInfo = Object.assign({}, this.inquiry.patientInfo, res.data.patientInfo)
        this.inquiry.doctorInfo = Object.assign({}, this.inquiry.doctorInfo, res.data.doctorInfo)
        this.inquiry.visible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$--header-height: 50px;

.consultation-patient {
  height: 100%;

  .header {
    height: $--header-height;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid #f2f2f2;

    img {
      margin: 0 10px 0 0;
    }
  }

  .body {
    height: calc(100% - #{$--header-height});

    .body-scrollbar {
      height: 100%;
    }

    .card {
      padding: 10px;

      &:last-child {
        padding-bottom: 0;

        &::after {
          content: none;
        }
      }

      &::after {
        content: ' ';
        display: block;
        width: 100%;
        height: 6px;
        background: #fafafa;
      }

      .title {
        display: inline-flex;
        justify-content: center;
        margin: 0 0 10px 0;

        i {
          font-weight: bold;
          display: inline-block;
          margin-right: 5px;
        }

        span {
          display: inline-block;
          color: rgba(51, 51, 51, 1);
        }
      }

      .content {
        width: 100%;

        &.patient {
          cursor: pointer;
          display: flex;
          justify-content: space-between;

          .item {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              width: 40px;
              height: 40px;
              margin: 0 10px 0 0;
              border-radius: 50%;
            }

            span {
              font-size: 12px;
              display: inline-block;
              margin-right: 8px;
              color: rgba(51, 51, 51, 1);
            }
          }
        }

        &.doctor {
          display: inline-flex;
          align-items: center;

          div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          img {
            width: 40px;
            height: 40px;
            margin: 0 10px 0 0;
            border-radius: 50%;
          }

          span {
            font-size: 12px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-right: 5px;
          }
        }

        &.consultation {
          .item {
            margin: 0 0 10px 0;

            .title {
              display: flex;
              justify-content: flex-start;
              align-items: center;

              .el-divider--vertical {
                margin: 0 10px 0 0;
                width: 2px;
                height: 12px;
                background: rgba(0, 198, 174, 1);
                border-radius: 1px;
              }

              span {
                font-size: 12px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
            }

            .content {
              span {
                font-size: 12px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
            }
          }
        }

        &.time-line {
          margin: 0 0 0 2px;

          .el-timeline {
            padding: 0;

            .el-timeline-item {
              &:last-child {
                padding-bottom: 0;
              }
            }

            /deep/ .el-timeline-item__node--normal {
              width: 8px;
              height: 8px;
              top: 2px;
            }

            /deep/ .el-timeline-item__tail {
              left: 2px;
              top: 2px;
            }

            /deep/ .el-timeline-item__wrapper {
              padding-left: 16px;

              .el-timeline-item__timestamp.is-top {
                padding-top: 2px;
              }
            }

            .timestamp_extend {
              position: absolute;
              top: 1px;
              right: 0;

              font-size: 12px;
              background: #fff;
              height: 16px;
              padding: 0 2px;
              line-height: 14px;
            }

            .timestamp_remark {
              span {
                font-size: 12px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
              }
            }
          }
        }
      }
    }
  }
}
</style>
