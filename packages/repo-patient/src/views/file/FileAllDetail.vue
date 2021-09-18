<template>
  <div class="page">
    <div class="file-all-detail"
         v-if="loading">
      <div class="file-all-detail-header">
        <div class="header-top">
          <div class="header-top-left">
            <span class="header-top-left-name">
              {{ patientInfo.familyName }}
            </span>
            <van-icon v-if="patientInfo.sex === '男'"
                      :name="require('@src/assets/images/file/ic_boys_white.png')" />
            <van-icon v-if="patientInfo.sex === '女'"
                      :name="require('@src/assets/images/file/ic_girls_white.png')" />
            <span class="header-top-left-age">
              {{ patientInfo.age }}
            </span>
            <van-tag color="#06B8AE"
                     text-color="#FFFFFF">门诊</van-tag>
          </div>
          <div class="header-top-right">
            <van-icon :name="require('@src/assets/images/file/ic_time.png')" />
            <span>
              {{ patientInfo.createTime }}
            </span>
          </div>
        </div>
        <div class="header-bottom">
          <div class="bg">
            <div class="bg-row">
              <van-image :src="require('@src/assets/images/file/ic_mechanism_1.png')" />
              <span>
                {{ patientInfo.hospitalName }}
              </span>
            </div>
            <div class="bg-row">
              <van-image :src="require('@src/assets/images/file/ic_doctor_1.png')" />
              <span>
                {{ patientInfo.doctorName }} {{ patientInfo.deptName }}
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
            <van-tab title="检验检查">
            </van-tab>
          </van-tabs>
        </van-sticky>
        <FileCaseDetail :data="caseInfo"
                        v-if='active==0'></FileCaseDetail>
        <FileRecipeDetail :data="prescribeInfos"
                          :allergyHistory="caseInfo&&caseInfo.allergyHistory||''"
                          v-else-if='active==1'></FileRecipeDetail>
        <FileExaminationDetail v-else-if='active==2'></FileExaminationDetail>
      </div>
    </div>
    <van-loading v-else></van-loading>
  </div>
</template>

<script>
import peace from '@src/library'

import FileCaseDetail from './FileCaseDetail'
import FileRecipeDetail from './FileRecipeDetail'
import FileExaminationDetail from './FileExaminationDetail'

export default {
  components: {
    FileCaseDetail,
    FileRecipeDetail,
    FileExaminationDetail
  },

  data() {
    return {
      active: 0,
      loading: false,
      caseInfo: {},
      patientInfo: {},
      prescribeInfos: {}
    }
  },

  created() {
    this.getHealthCase()
  },

  methods: {
    getHealthCase() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.health.getHealthCase(params).then((res) => {
        this.loading = true
        this.caseInfo = res.data.caseInfo
        this.patientInfo = res.data.patientInfo
        this.prescribeInfos = res.data.prescribeInfos
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
}
::v-deep .file-all-detail {
  // height: 100%;
  background: #fff;

  // display: flex;
  // flex-direction: column;

  .file-all-detail-header {
    min-height: 180px;
    height: 180px;

    background-image: url('~@src/assets/images/bg-2.png');
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
      .header-top-left {
        .header-top-left-name {
          font-size: 20px;
          color: #fff;
          margin: 0 8px 0 0;
        }
        .van-icon {
          width: 13px;
          height: 13px;
        }
        .header-top-left-age {
          font-size: 14px;
          color: #fff;
          margin: 0 8px;
        }
      }
      .header-top-right {
        .van-icon {
          width: 10px;
          height: 10px;
        }
        > span {
          font-size: 14px;
          color: #fff;
          margin: 0 0 0 10px;
        }
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

        background-image: url('~@src/assets/images/bg-2-1.png');
        background-repeat: no-repeat;
        background-size: 100% 100px;

        .bg-row {
          display: flex;
          align-items: center;

          margin: 0 0 10px 0;
          .van-image {
            width: 22px;
            height: 22px;
          }
          > span {
            font-size: 14px;
            color: #333;
            margin: 0 0 0 10px;
          }
        }
      }
    }
  }

  .file-all-detail-content {
    // flex: 1;
    // overflow: auto;

    .van-tabs {
      display: flex;
      flex-direction: column;

      height: 100%;
      border-bottom: 1px solid $-color--line;
      .van-tab--active {
        color: $primary;
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