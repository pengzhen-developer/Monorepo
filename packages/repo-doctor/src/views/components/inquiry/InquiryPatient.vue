<template>
  <div class="inquiry-patient">
    <div class="header">
      <img src="~@src/assets/images/inquiry/electronicmedical_icon.png" />
      <span>电子病历</span>
    </div>

    <div class="body">
      <el-scrollbar class="body-scrollbar">
        <el-tabs class="content">
          <el-tab-pane class="health"
                       label="健康档案">
            <div class="health-item">
              <div class="health-item-title">
                <img src="~@src/assets/images/inquiry/archives_icon_marry.png" />
                <span>婚姻状态：</span>
              </div>
              <div class="health-item-description">
                <span>{{ healthRecord.maritalStatus || '暂无' }}</span>
              </div>
            </div>
            <div class="health-item">
              <div class="health-item-title">
                <img src="~@src/assets/images/inquiry/archives_icon_baby.png" />
                <span>生育状态：</span>
              </div>
              <div class="health-item-description">
                <span>{{ healthRecord.fertilityStatus || '暂无' }}</span>
              </div>
            </div>
            <div class="health-item">
              <div class="health-item-title">
                <img src="~@src/assets/images/inquiry/archives_icon_marry copy.png" />
                <span>手术和外伤：</span>
              </div>
              <div class="health-item-description">
                <span>{{ healthRecord.surgeryTrauma || '暂无' }}</span>
              </div>
            </div>
            <div class="health-item">
              <div class="health-item-title">
                <img src="~@src/assets/images/inquiry/archives_icon_medical.png" />
                <span>家族病史：</span>
              </div>
              <div class="health-item-description">
                <span>{{ healthRecord.familyHistory || '暂无' }}</span>
              </div>
            </div>
            <div class="health-item">
              <div class="health-item-title">
                <img src="~@src/assets/images/inquiry/archives_icon_habit.png" />
                <span>药物过敏：</span>
              </div>
              <div class="health-item-description">
                <span>{{ healthRecord.drugAllergy || '暂无' }}</span>
              </div>
            </div>
            <div class="health-item">
              <div class="health-item-title">
                <img src="~@src/assets/images/inquiry/archives_icon_allergy.png" />
                <span>食物/接触物过敏：</span>
              </div>
              <div class="health-item-description">
                <span>{{ healthRecord.foodAllergy || '暂无' }}</span>
              </div>
            </div>
            <div class="health-item">
              <div class="health-item-title">
                <img src="~@src/assets/images/inquiry/archives_icon_habit3.png" />
                <span>个人习惯：</span>
              </div>
              <div class="health-item-description">
                <span>{{ healthRecord.personalHabit || '暂无' }}</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="就诊记录">
            <div class="record">
              <NoData type="health"></NoData>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import NoData from '@src/views/components/NoData'

export default {
  components: {
    NoData
  },

  data() {
    return {
      healthRecord: {}
    }
  },

  watch: {
    '$store.state.inquiry.session': {
      handler(newValue, oldValue) {
        if (
          oldValue === undefined ||
          (newValue &&
            newValue.content &&
            newValue.content.patientInfo &&
            newValue.content.patientInfo.familyId &&
            oldValue &&
            oldValue.content &&
            oldValue.content.patientInfo &&
            oldValue.content.patientInfo.familyId &&
            oldValue.content.patientInfo.familyId !== newValue.content.patientInfo.familyId)
        ) {
          const params = { familyId: newValue.content.patientInfo.familyId }

          peace.service.health.getOneHealth(params).then((res) => {
            this.healthRecord = res.data.personalInfo
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
$--header-height: 50px;

.inquiry-patient {
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

    .content {
      ::v-depp .el-tabs__active-bar {
        display: none;
      }

      ::v-depp .el-tabs__nav {
        width: 100%;
      }

      ::v-depp .el-tabs__item {
        width: 50%;
        padding: 0;
        text-align: center;

        &.is-active {
          border-top: 2px solid #00c6ae;
        }
      }

      ::v-depp {
        .el-tabs__nav-wrap::after {
          display: none;
        }
      }

      .health {
        padding: 10px;

        .health-item {
          margin: 0 0 20px 0;

          .health-item-title {
            display: inline-flex;
            justify-content: center;

            img {
              display: inline-block;
              width: 20px;
              height: 20px;
              margin-right: 10px;
            }

            h4 {
              display: inline-block;
              margin: 0;
              color: rgba(51, 51, 51, 1);
            }
          }

          .health-item-description {
            span {
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }

      .record {
        span {
          margin: 0 0 0 30px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
}
</style>

