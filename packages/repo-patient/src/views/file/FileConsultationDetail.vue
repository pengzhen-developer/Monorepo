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
              {{ familyInfo.createdTime.split(' ')[0] }}
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
                {{ doctorInfo.fromHospitalName }}
              </span>
            </div>
            <div class="bg-row">
              <van-image width="22px"
                         height="22px"
                         :src="require('@src/assets/images/file/ic_doctor_1.png')" />
              <span style="font-size: 14px; color: #333; margin: 0 0 0 10px;">
                {{ doctorInfo.fromDoctorName }} {{ doctorInfo.fromDeptName }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="file-all-detail-content">
        <van-sticky>
          <van-tabs v-model="active"
                    swipeable>
            <van-tab title="病历详情">
            </van-tab>
            <van-tab title="处方">
            </van-tab>
            <van-tab title="会诊小结">
            </van-tab>
          </van-tabs>
        </van-sticky>
        <FileCaseDetail :data="caseInfo"
                        v-if='active==0'></FileCaseDetail>
        <FileRecipeDetail :data="prescribeInfos"
                          v-else-if='active==1'></FileRecipeDetail>
        <FileConsultantSummaryDetail :data="data"
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
      doctorInfo: {},
      data: {}
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
        this.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
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