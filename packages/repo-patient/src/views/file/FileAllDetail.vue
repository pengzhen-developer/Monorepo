<template>
  <div class="file-all-detail">
    <div class="file-all-detail-header">
      <div class="header-top">
        <div class="header-top-left">
          <span style="font-size: 20px; color: #fff; margin: 0 8px 0 0;">
            {{ patientInfo.familyName }}
          </span>
          <van-icon v-if="patientInfo.sex === '男'"
                    width="13"
                    height="13"
                    :name="require('@src/assets/images/file/ic_boys_white.png')" />
          <van-icon v-if="patientInfo.sex === '女'"
                    width="13"
                    height="13"
                    :name="require('@src/assets/images/file/ic_girls_white.png')" />
          <span style="font-size: 14px; color: #fff; margin: 0 8px;">
            {{ patientInfo.age + '岁' }}
          </span>
          <van-tag color="#06B8AE"
                   text-color="#FFFFFF">门诊</van-tag>
        </div>
        <div class="header-top-right">
          <van-icon width="10"
                    height="10"
                    :name="require('@src/assets/images/file/ic_time.png')" />
          <span style="font-size: 14px; color: #fff; margin: 0 0 0 10px;">
            {{ patientInfo.createTime }}
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
              {{ patientInfo.hospitalName }}
            </span>
          </div>
          <div class="bg-row">
            <van-image width="22px"
                       height="22px"
                       :src="require('@src/assets/images/file/ic_doctor_1.png')" />
            <span style="font-size: 14px; color: #333; margin: 0 0 0 10px;">
              {{ patientInfo.doctorName }} {{ patientInfo.deptName }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="file-all-detail-content">
      <van-tabs v-model="active"
                swipeable>
        <van-tab title="病历">
          <FileCaseDetail :data="caseInfo"></FileCaseDetail>
        </van-tab>
        <van-tab title="处方">
          <FileRecipeDetail :data="prescribeInfos"></FileRecipeDetail>
        </van-tab>
        <van-tab title="检验检查">
          <FileExaminationDetail></FileExaminationDetail>
        </van-tab>
      </van-tabs>
    </div>
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

      peace.service.health.getHealthCase(params).then(res => {
        this.caseInfo = res.data.caseInfo
        this.patientInfo = res.data.patientInfo
        this.prescribeInfos = res.data.prescribeInfos
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.file-all-detail {
  height: 100%;
  background: #fff;

  display: flex;
  flex-direction: column;

  .file-all-detail-header {
    min-height: 180px;
    height: 180px;

    background-image: url('~@/assets/images/bg-2.png');
    background-repeat: no-repeat;
    background-size: 100% 180px;

    .header-top {
      height: 80px;
      padding: 0 16px;

      display: flex;
      justify-content: space-between;
      align-items: center;

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

        background-image: url('~@/assets/images/bg-2-1.png');
        background-repeat: no-repeat;
        background-size: 100% 100px;

        .bg-row {
          display: flex;
          align-items: center;

          margin: 0 0 10px 0;
        }
      }
    }
  }

  .file-all-detail-content {
    flex: 1;
    overflow: auto;

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