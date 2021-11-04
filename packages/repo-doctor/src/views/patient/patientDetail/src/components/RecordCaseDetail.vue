<template>
  <div class="newCaseDetail">
    <div class="caption">
      <div class="left">
        <span class="name">{{data.patientInfo.familyName}}</span>
        <span class="sex">{{data.patientInfo.sex}}</span>
        <span class="age">{{data.patientInfo.age}}</span>
        <span class="dept">门诊</span>
      </div>
      <div class="right">
        <i class="time"></i>{{data.patientInfo.createTime}}
      </div>
    </div>
    <div class="item">
      <span class="title">医疗机构：</span>
      <span class="content">{{data.patientInfo.hospitalName}}</span>
    </div>
    <div class="item">
      <span class="title">医生/科室：</span>
      <span class="content">{{data.patientInfo.doctorName}} {{data.patientInfo.deptName}}</span>
    </div>

    <el-tabs v-model="activeName"
             class="tabList">
      <el-tab-pane lazy
                   label="病历详情"
                   name="first">
        <template v-if="activeName === 'first'">
          <PeaceCaseDetail v-bind:data="fetchCaseDetail"></PeaceCaseDetail>
        </template>
      </el-tab-pane>
      <el-tab-pane lazy
                   label="处方"
                   name="second">
        <template v-if="activeName === 'second'">

          <template v-if="data.prescribeInfos.list.length === 0">
            <NoData type="health"></NoData>
          </template>

          <template v-else>
            <div class="tips"
                 v-if="data.prescribeInfos.list.length > 1">
              <span>共 {{data.prescribeInfos.list.length}} 张，当前第 {{prescribeIndex}} 张（{{prescribeIndex}}/{{data.prescribeInfos.list.length}}）</span>
              <div class="flex next">
                <div class="q-mr-sm"
                     @click="goToPrev()">
                  <i class="arrow q-mr-sm"
                     style="transform: rotate(180deg);"></i>
                  <span>上一张</span>
                </div>
                <div @click="goToNext()">
                  <span>下一张</span>
                  <i class="arrow q-ml-sm"></i>
                </div>
              </div>
            </div>

            <div class="prescribe"
                 v-for="(item,index) in data.prescribeInfos.list"
                 v-bind:key="'prescribe' + index">
              <template v-if="(index + 1) == prescribeIndex">
                <PeacePrescriptionDetail v-bind:key="item.prescriptionNo"
                                         v-bind:data="() => fetchPrescriptionDetail(item.prescriptionNo)"></PeacePrescriptionDetail>
              </template>

            </div>
          </template>

        </template>
      </el-tab-pane>
      <el-tab-pane lazy
                   label="检验检查"
                   name="third">
        <NoData type="health"></NoData>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import NoData from '@src/views/components/NoData'
import Service from './../service/index.js'
import { PeaceCaseDetail, PeacePrescriptionDetail } from 'peace-components'

export default {
  components: {
    PeaceCaseDetail,
    PeacePrescriptionDetail,

    NoData
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      activeName: 'first',
      prescribeIndex: 1
    }
  },

  methods: {
    async fetchCaseDetail() {
      const params = { caseNo: this.data?.caseInfo?.caseNo }
      const res = await Service.getCaseDetail(params)

      return res.data
    },

    async fetchPrescriptionDetail(prescriptionNo) {
      const params = { prescriptionNo: prescriptionNo }
      const res = await Service.getPrescriptionDetail(params)

      return res.data
    },

    goToPrev() {
      if (this.prescribeIndex == 1) {
        this.prescribeIndex = this.data.prescribeInfos.list.length
      } else {
        this.prescribeIndex--
      }
    },

    goToNext() {
      if (this.prescribeIndex == this.data.prescribeInfos.list.length) {
        this.prescribeIndex = 1
      } else {
        this.prescribeIndex++
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.newCaseDetail {
  font-size: 12px;
  padding: 0 20px;
  .tabList {
    margin-top: 15px;
  }
  .no-data {
    min-height: 200px;
  }
  .caption {
    display: flex;
    justify-content: space-between;
    .right {
      display: flex;
      align-items: center;
      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('~@src/assets/images/ic_time.png');
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .name {
      font-size: 22px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .sex,
    .age {
      font-size: 14px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      display: inline-block;
    }
    .sex {
      margin-left: 16px;
      margin-right: 16px;
    }
    .age {
      margin-right: 16px;
    }
    .dept {
      padding: 2px 6px;
      background: rgba(241, 241, 241, 1);
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
  }
  .item {
    margin-top: 6px;
    display: flex;
    .title {
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      width: 80px;
    }
    .content {
      font-size: 14px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      flex: 1;
    }
    .dataBox {
      width: 410px;
      height: 80px;
      background: rgba(248, 248, 248, 1);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .line {
        display: flex;
        width: 370px;
        margin: 0 auto;
        .dataItem {
          width: 170px;
          .title {
            width: 50px;
          }
          .content {
            width: 80px;
          }
        }
      }
      .divide {
        width: 370px;
        height: 1px;
        margin: 10px auto 10px;
        background: #e5e5e5;
      }
    }
  }
  .rp-title {
    margin-top: 8px;
    padding-bottom: 4px;
    font-size: 18px;
    line-height: 25px;
    border-bottom: 1px solid #f3f3f3;
  }
  .dragList {
    .dragItem {
      display: flex;
      flex-direction: column;
      color: #333;
      height: 60px;
      justify-content: center;
      border-bottom: 1px dashed #c4c4c4;
      .dragCode {
        font-size: 18px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      .title {
        display: flex;
        font-size: 16px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        justify-content: space-between;
      }
      .usage {
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .staffBox {
    display: flex;
    flex-direction: column;
    height: 130px;
    justify-content: center;
    .line {
      display: flex;
      margin-bottom: 5px;

      .dataItem {
        width: 250px;
        .title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          width: 50px;
        }
        .content {
          font-size: 14px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
  .tips {
    height: 37px;
    font-size: 14px;
    line-height: 37px;
    margin: 0 auto 15px;
    color: #333333;
    // padding: 0 40px;
    padding-left: 40px;
    padding-right: 13px;
    background: rgba(249, 249, 249, 1) url('~@src/assets/images/ic_tixing.png') no-repeat;
    background-position: 13px 11px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .next {
      cursor: pointer;
      i.arrow {
        width: 4px;
        height: 8px;
        display: inline-block;
        background: rgba(249, 249, 249, 1) url('~@src/assets/images/systen-Triangle.png') no-repeat;
      }
    }
  }
}
</style>
