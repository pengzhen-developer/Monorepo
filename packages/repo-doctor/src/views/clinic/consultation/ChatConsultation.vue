<template>
  <div class="chat-consultation" v-if="chat.team">
    <div class="header">
      <img src="~@/assets/images/icons/clinic/electronicmedical_icon.png">
      <span>会诊申请单</span>
    </div>

    <div class="body" v-if="data">
      <el-scrollbar class="scrollbar">
        <div class="card">
          <div class="title">
            <img src="~@/assets/images/icons/clinic/archives_icon_marry.png">
            <span>患者信息：</span>
          </div>

          <div @click="showDetail" class="content patient">
            <div class="item">
              <img
                class="doctor-img"
                src="https://wx.qlogo.cn/mmopen/vi_32/HMuHCjwyfmXyuoMdrcf3YZqsQcpgYzPCasrTBhoic3SV541hCgGN2TK3ticFYUCF3wS9XNjTHia6N5W1ibQIRTvlVA/132"
              >

              <span style="font-weight:600; color: rgba(51,51,51,1);">{{ data.familyName }}</span>
              <span>{{ data.familySex }}</span>
              <span>{{ data.familyAge }}</span>
            </div>
            <div class="item">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="title">
            <img src="~@/assets/images/icons/clinic/archives_icon_marry.png">
            <span>发起医生：</span>
          </div>

          <div class="content doctor">
            <img
              class="doctor-img"
              src="https://wx.qlogo.cn/mmopen/vi_32/HMuHCjwyfmXyuoMdrcf3YZqsQcpgYzPCasrTBhoic3SV541hCgGN2TK3ticFYUCF3wS9XNjTHia6N5W1ibQIRTvlVA/132"
            >

            <div class="doctor-info">
              <div>
                <span style="font-weight:600; color: rgba(51,51,51,1);">{{ data.fromDoctorName }}</span>
              </div>
              <div>
                <span>{{ data.fromDeptName }}</span>
                <span>{{ data.fromDoctorTitle }}</span>
              </div>
              <div>
                <span :title="data.fromHospitalName">{{ data.fromHospitalName }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="title">
            <img src="~@/assets/images/icons/clinic/archives_icon_marry.png">
            <span>申请会诊信息：</span>
          </div>

          <div class="content consultation">
            <div class="item">
              <div class="title">
                <el-divider direction="vertical"></el-divider>
                <span>初步诊断</span>
              </div>
              <div class="content">
                <el-tag :key="item" style="margin-right: 5px; color: #00c6ae;" type="primary" v-for="item in data.familyDisagnose.split(',')">{{ item }}</el-tag>
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
            <img src="~@/assets/images/icons/clinic/archives_icon_marry.png">
            <span>审核意见：</span>
          </div>

          <div class="content time-line">
            <el-timeline>
              <el-timeline-item :timestamp="data.outCheckTime" placement="top" type="primary">
                <el-tag class="timestamp_extend">{{ data.outCheckStatus === 3 ? '已通过' : '' }}</el-tag>

                <div class="timestamp_remark">
                  <p>
                    <span>审核机构：</span>
                    <span>{{ data.fromHospitalName }}</span>
                  </p>
                  <p>
                    <span>审核备注：</span>
                    <span>{{ data.outCheckSuggest || '同意会诊' }}</span>
                  </p>
                </div>
              </el-timeline-item>

              <el-timeline-item :timestamp="data.inCheckTime" placement="top" type="primary">
                <el-tag class="timestamp_extend">{{ data.inCheckStatus === 3 ? '已通过' : '' }}</el-tag>

                <div class="timestamp_remark">
                  <p>
                    <span>审核机构：</span>
                    <span>{{ data.toHospitalName }}</span>
                  </p>
                  <p>
                    <span>审核备注：</span>
                    <span>{{ data.inCheckSuggest || '同意会诊' }}</span>
                  </p>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <peace-dialog :visible.sync="dialog.visible" append-to-body title="图文问诊记录" top="5vh" width="800px">
      <chat-session-list :localSessionMsgs="dialog.data"></chat-session-list>
    </peace-dialog>
  </div>
</template>

<script>
import config from './config'

import { mapState } from 'vuex'

import { STATE } from '@/views/clinic/inquiry/util'
import ChatSessionList from '@/views/clinic/inquiry/ChatSessionList'

export default {
  components: {
    ChatSessionList
  },

  data() {
    return {
      config,
      STATE,

      data: undefined,

      activities: [
        {
          content: '2018-04-12 20:46',
          timestamp: '123123',
          type: 'primary'
        },
        {
          content: '2018-04-15 20:46',
          timestamp: '2018-04-03 20:46',
          type: 'primary'
        }
      ],

      dialog: {
        visible: false,
        data: undefined
      }
    }
  },

  computed: {
    ...mapState(['chat'])
  },

  watch: {
    'chat.team'() {
      this.getConsultationDetail()
    }
  },

  created() {
    this.getConsultationDetail()
  },

  methods: {
    showDetail() {
      const row = {
        doctor_id: 'ewghekrsbm',
        patient_id: 'hwzxwvfxhl'
      }

      this.dialog.data = []
      this.dialog.visible = true

      // 获取病历信息
      this.$http.get(this.config.api.getOneInquiry, { params: { inquiryNo: 'WZ6399751675174332' } }).then(res => {
        res.data.forEach(item => {
          item.custom = item.ext

          if (row.doctor_id === item.from) {
            item.flow = this.STATE.msgFlow['医生消息']
          } else if (row.patient_id === item.from) {
            item.flow = this.STATE.msgFlow['患者消息']
          }

          switch (item.type) {
            case 0:
              item.type = this.STATE.msgType['文本消息']
              item.text = item.body.msg
              break
            case 1:
              item.type = this.STATE.msgType['图片消息']
              item.file = item.body
              break
            case 2:
              item.type = this.STATE.msgType['语音消息']
              break
            case 3:
              item.type = this.STATE.msgType['视频消息']
              break
            case 4:
              item.type = this.STATE.msgType['地理信息']
              break
            case 6:
              item.type = this.STATE.msgType['文件']
              break
            case 100:
              item.type = this.STATE.msgType['自定义消息']
              item.content = item.body

              // 视频消息默认为医生消息
              if (item.body.type === 9 && item.body.data.sendType === 3) {
                item.flow = this.STATE.msgFlow['医生消息']
              }
              break
          }
        })

        this.dialog.data = res.data
      })
    },

    getConsultationDetail() {
      if (this.chat.team) {
        const params = {
          consultNo: 'HZ8355686534531728'
        }

        this.$http.post(this.config.api.getConsultInfo, params).then(res => {
          this.data = res.data.info
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-consultation {
  .header {
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid #f2f2f2;
    background: rgba(255, 255, 255, 1);

    img {
      margin: 0 10px 0 0;
    }
  }

  .body {
    height: calc(100% - 50px);

    .scrollbar {
      height: 100%;
      overflow: hidden;
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

        img {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 10px;
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
