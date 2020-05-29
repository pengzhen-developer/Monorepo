<template>
  <div class="page">
    <div class="file-all-detail"
         v-if="loading">
      <div class="file-all-detail-header">
        <div class="header-top">
          <div class="header-top-left">
            <span style="font-size: 20px; color: #fff; margin: 0 8px 0 0;">
              {{ familyInfo.familyName }}
            </span>
            <van-icon v-if="familyInfo.familySex === '男'"
                      width="13"
                      height="13"
                      :name="require('@src/assets/images/file/ic_boys_white.png')" />
            <van-icon v-if="familyInfo.familySex === '女'"
                      width="13"
                      height="13"
                      :name="require('@src/assets/images/file/ic_girls_white.png')" />
            <span style="font-size: 14px; color: #fff; margin: 0 8px;">
              {{ familyInfo.familyAge + '岁' }}
            </span>
            <van-tag color="#06B8AE"
                     text-color="#FFFFFF">远程会诊</van-tag>
          </div>
          <div class="header-top-right">
            <van-icon width="10"
                      height="10"
                      :name="require('@src/assets/images/file/ic_time.png')" />
            <span style="font-size: 14px; color: #fff; margin: 0 0 0 10px;">
              {{ familyInfo.createdTime}}
            </span>
          </div>
        </div>
        <div class="header-bottom">
          <div class="bg">
            <div class="bg-row">
              <van-image width="22px"
                         height="22px"
                         :src="require('@src/assets/images/file/ic_mechanism_1.png')" />
              <span style="font-size: 14px; color: #333; margin: 0 0 0 10px;">
                {{ familyInfo.hospitalName }}
              </span>
            </div>
            <div class="bg-row">
              <van-image width="22px"
                         height="22px"
                         :src="require('@src/assets/images/file/ic_doctor_1.png')" />
              <span style="font-size: 14px; color: #333; margin: 0 0 0 10px;">
                {{ familyInfo.doctorName }} {{ familyInfo.deptName }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="file-all-detail-content">
        <van-sticky>
          <van-tabs v-model="active"
                    @change="changeTab"
                    swipeable>
            <van-tab title="病历详情"
                     :dot="caseInfo&&caseInfo.readPatient==1">
            </van-tab>
            <van-tab title="处方"
                     :dot="unread>0">
            </van-tab>
            <van-tab title="会诊小结"
                     :dot="consultSummary.readPatient==1">
            </van-tab>
          </van-tabs>
        </van-sticky>
        <FileCaseDetail :data="caseInfo"
                        v-if='active==0'></FileCaseDetail>
        <FileRecipeDetail :data="prescribeInfos"
                          :allergyHistory="caseInfo&&caseInfo.allergyHistory||''"
                          @getCurrent="getCurrent"
                          v-else-if='active==1'></FileRecipeDetail>
        <FileConsultantSummaryDetail :data="consultSummary"
                                     v-else-if='active==2'></FileConsultantSummaryDetail>

      </div>
    </div>
    <van-loading v-else></van-loading>
  </div>
</template>

<script>
import peace from '@src/library'

import FileCaseDetail from './FileCaseDetail'
import FileRecipeDetail from './FileRecipeDetail'
import FileConsultantSummaryDetail from './FileConsultantSummaryDetail'

export default {
  components: {
    FileCaseDetail,
    FileRecipeDetail,
    FileConsultantSummaryDetail
  },

  data() {
    return {
      active: 0,
      loading: false,
      caseInfo: {},
      familyInfo: {},
      prescribeInfos: {},
      consultSummary: {},
      currentIndex: 0
    }
  },
  computed: {
    unread() {
      let readPatient = 0
      if (this.prescribeInfos.list && this.prescribeInfos.list.length > 0) {
        this.prescribeInfos.list.forEach(item => {
          if (item.readPatient == 1) {
            readPatient += item.readPatient
          }
        })
      }
      return readPatient
    }
  },

  created() {
    this.getHealthCase()
  },

  methods: {
    getHealthCase() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.group.consultDetail(params).then(res => {
        this.loading = true
        this.caseInfo = res.data.caseInfo
        this.familyInfo = res.data.familyInfo
        this.prescribeInfos = res.data.prescribeInfos
        this.doctorInfo = res.data.doctorInfo
        this.consultSummary = res.data.consultSummary
        //初始化设定病历为已阅
        if (this.caseInfo && this.caseInfo.readPatient == 1) {
          this.updateCounsultRedDot(this.caseInfo.caseNo, 'caseInfo')
        }
      })
    },

    updateCounsultRedDot(dataNo, type) {
      peace.service.group.updateCounsultRedDot({ dataNo }).then(() => {
        switch (type) {
          case 'caseInfo':
            this.caseInfo.readPatient = 2
            break
          case 'prescribeInfo':
            this.prescribeInfos.list[this.currentIndex].readPatient = 2
            break
          case 'consultSummary':
            this.consultSummary.readPatient = 2
            break
          default:
            break
        }
      })
    },
    changeTab(active) {
      switch (active) {
        case 0:
          if (this.caseInfo && this.caseInfo.caseNo && this.caseInfo.readPatient == 1) {
            this.updateCounsultRedDot(this.caseInfo.caseNo, 'caseInfo')
          }
          break
        case 1:
          if (
            this.prescribeInfos.list.length > 0 &&
            this.prescribeInfos.list[this.currentIndex].prescriptionNo &&
            this.prescribeInfos.list[this.currentIndex].readPatient == 1
          ) {
            this.updateCounsultRedDot(this.prescribeInfos.list[this.currentIndex].prescriptionNo, 'prescribeInfo')
          }
          break
        case 2:
          if (this.consultSummary.consultNo && this.consultSummary.readPatient == 1) {
            this.updateCounsultRedDot(this.consultSummary.consultNo, 'consultSummary')
          }
          break
        default:
          break
      }
    },
    getCurrent(index) {
      this.currentIndex = index
      if (
        this.prescribeInfos.list[this.currentIndex].prescriptionNo &&
        this.prescribeInfos.list[this.currentIndex].readPatient == 1
      ) {
        this.updateCounsultRedDot(this.prescribeInfos.list[this.currentIndex].prescriptionNo, 'prescribeInfo')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
}
/deep/.van-info {
  top: 50%;
  right: -10px;
  border: 0;
  padding: 0;
  width: 8px;
  height: 8px;
}
/deep/.van-info--dot {
  display: block;
  background-color: #f2223b;
}
.file-all-detail {
  // height: 100%;
  background: #fff;

  // display: flex;
  // flex-direction: column;

  .file-all-detail-header {
    min-height: 180px;
    height: 180px;

    background-image: url('~@/assets/images/ic_consult_detail_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 180px;

    .header-top {
      height: 80px;
      padding: 0 16px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-top-left,
      .header-top-right {
        display: flex;
        align-items: center;
      }
    }

    .header-bottom {
      height: 100px;
      padding: 0 16px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .bg {
        width: 100%;
        height: 100%;
        padding: 20px 15px;

        // background-image: url('~@/assets/images/bg-2-1.png');
        // background-repeat: no-repeat;
        // background-size: 100% 100px;

        .bg-row {
          display: flex;
          align-items: center;

          margin: 0 0 10px 0;
        }
      }
    }
  }

  .file-all-detail-content {
    // flex: 1;
    // overflow: auto;

    /deep/ .van-tabs {
      display: flex;
      flex-direction: column;

      height: 100%;

      .van-tabs__line {
        background-color: #00c6ae;
      }
      .van-tabs__wrap {
        height: 44px;
      }
      .van-tabs__content {
        flex: 1;
        overflow: auto;

        .van-tab__pane {
          height: 100%;
        }
      }
    }
  }
}
</style>