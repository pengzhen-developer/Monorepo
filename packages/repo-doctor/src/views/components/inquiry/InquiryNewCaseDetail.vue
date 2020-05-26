<template>
  <div class="newCaseDetail">
    <div class="caption">
      <div class="left">
        <span class="name">{{data.patientInfo.familyName}}</span>
        <span class="sex">{{data.patientInfo.sex}}</span>
        <span class="age">{{data.patientInfo.age+'岁'}}</span>
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
      <el-tab-pane label="病历详情"
                   name="first">
        <div class="item">
          <span class="title">病历号：</span>
          <span class="content">{{data.caseInfo.caseNo}}</span>
        </div>
        <div class="item">
          <span class="title">就诊时间：</span>
          <span class="content">{{data.caseInfo.visitDate}}</span>
        </div>
        <div class="item">
          <span class="title">主诉：</span>
          <span class="content">{{data.caseInfo.baseIllness}}</span>
        </div>
        <div class="item">
          <span class="title">现病史：</span>
          <span class="content">{{data.caseInfo.presentHistory ==''? '无': data.caseInfo.presentHistory}}</span>
        </div>
        <div class="item">
          <span class="title">既往史：</span>
          <span class="content">{{data.caseInfo.pastHistory =='' ? '无':data.caseInfo.pastHistory}}</span>
        </div>
        <div class="item">
          <span class="title">过敏史：</span>
          <span class="content">{{data.caseInfo.allergyHistory =='' ? '无':data.caseInfo.allergyHistory}}</span>
        </div>
        <div class="item"
             v-if="!(data.caseInfo.InspectionIndex.temperature ==''&&data.caseInfo.InspectionIndex.weight ==''&&data.caseInfo.InspectionIndex.heart_rate =='' &&data.caseInfo.InspectionIndex.blood_pressure =='')">
          <span class="title">检查指标：</span>
          <div class="dataBox">
            <div class="line">
              <div class="dataItem">
                <span class="title">体温：</span>
                <span class="content">{{data.caseInfo.InspectionIndex.temperature =='' ? '无':data.caseInfo.InspectionIndex.temperature+'度'}}</span>
              </div>
              <div class="dataItem">
                <span class="title">体重：</span>
                <span class="content">{{data.caseInfo.InspectionIndex.weight =='' ? '无':data.caseInfo.InspectionIndex.weight+'kg'}}</span>
              </div>
            </div>
            <div class="divide"></div>
            <div class="line">
              <div class="dataItem">
                <span class="title">心率：</span>
                <span class="content">{{data.caseInfo.InspectionIndex.heart_rate =='' ? '无':data.caseInfo.InspectionIndex.heart_rate+'bmp'}}</span>
              </div>
              <div class="dataItem">
                <span class="title">血压：</span>
                <span class="content">{{data.caseInfo.InspectionIndex.blood_pressure =='' ? '无':data.caseInfo.InspectionIndex.blood_pressure+'mmHg'}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <span class="title">辅助检查：</span>
          <span class="content">{{data.caseInfo.InspectionIndex.More =='' ? '无':data.caseInfo.InspectionIndex.More}}</span>
        </div>
        <div class="item">
          <span class="title">诊 断：</span>
          <span class="content">{{data.caseInfo.diagnose =='' ? '无':data.caseInfo.diagnose}}</span>
        </div>
        <div class="item">
          <span class="title">医嘱小结：</span>
          <span class="content">{{data.caseInfo.summary =='' ? '无':data.caseInfo.summary}}</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="处方"
                   name="second">
        <div class="tips"
             v-if="data.prescribeInfos.list.length>1">
          <span>共{{data.prescribeInfos.list.length}}张，当前第{{prescribeIndex}}张（{{prescribeIndex}}/{{data.prescribeInfos.list.length}}）</span>
          <div @click="goToNext()"
               class="next">
            <span>下一张</span>
            <i class="arrow"></i>
          </div>
        </div>
        <NoData v-else-if="data.prescribeInfos.list.length==0"
                type="health"></NoData>
        <div class="prescribe"
             v-for="(item,index) in data.prescribeInfos.list"
             :key="'prescribe' + index"
             v-show="(index+1) == prescribeIndex">
          <div class="item">
            <span class="title">处方编号：</span>
            <span class="content">{{item.prescriptionNo}}</span>
          </div>
          <div class="item">
            <span class="title">临床诊断：</span>
            <span class="content">{{item.diagnosisInfos}}</span>
          </div>
          <div class="item"
               v-if="item.weight">
            <span class="title">体重：</span>
            <span class="content">{{item.weight + 'kg'}}</span>
          </div>

          <div class="flex justify-between items-end q-mb-xs">
            <span class="text-h6 text-weight-bolder">Rp</span>
            <div class="flex items-baseline"
                 v-if="canShowAudit(item.PrescriptionAudit.auditCode)"
                 v-bind:class="getThemeClass(item.PrescriptionAudit.auditCode)">
              <span class="text-subtitle1 text-weight-bold q-mr-sm">{{ item.PrescriptionAudit.auditResult }}</span>
              <i v-on:click="showAudit(item)"
                 class="text-subtitle2 cursor-pointer el-icon-question"
                 style="line-height: none;"></i>
            </div>
          </div>

          <div style="border-bottom: 1px solid #F3F3F3;"></div>

          <div class="dragList">
            <div class="dragItem"
                 v-for="(drug,index) in item.drugCode"
                 :key="'drug' + index">
              <div class="title">
                <span>{{drug.drugName}} {{drug.drugSpecifications}}</span>
                <span> x{{drug.drugQty}}</span>
              </div>
              <div class="usage">
                {{drug.drugUse}}
              </div>
            </div>
          </div>
          <div class="staffBox">
            <div class="line">
              <div class="dataItem">
                <span class="title">医 师：</span>
                <img :src="item.doctorSignImage"
                     class="content"
                     alt="医师签名"
                     style="height: 20px;"
                     v-if="item.doctorSignImage" />
              </div>
              <div class="dataItem">
                <span class="title">审方药师：</span>
                <img :src="item.prescriptionSign"
                     class="content"
                     alt="医师签名"
                     style="height: 20px;"
                     v-if="item.prescriptionSign" />
              </div>
            </div>
            <div class="divide"></div>
            <div class="line">
              <div class="dataItem">
                <span class="title">调配药师：</span>
                <span class="content">{{item.disPharmacist =='' ? '无':item.disPharmacist}}</span>
              </div>
              <div class="dataItem">
                <span class="title">核对发药：</span>
                <span class="content">{{item.sendPharmacist =='' ? '无':item.sendPharmacist}}</span>
              </div>
            </div>

            <div class="line"
                 style="margin-top: 5px; border-top: 1px solid #f3f3f3;padding: 5px 0;">
              <div class="dataItem">
                <span class="title">药师审方结果：</span>
                <span class="content">{{getText(item.prescription)}}</span>
              </div>
              <div class="dataItem">
                <span class="title">系统审方结果：</span>
                <span class="content">{{item.prescriptionExamMemo =='' ? '无':item.prescriptionExamMemo}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="检验检查"
                   name="third">
        <NoData type="health"></NoData>
      </el-tab-pane>
    </el-tabs>

    <!-- 前置审方详情 -->
    <peace-dialog title="系统审方结果"
                  v-bind:visible.sync="audit.visible"
                  append-to-body>
      <RecipeAudit v-bind:data="audit.data"></RecipeAudit>
    </peace-dialog>
  </div>
</template>
<script>
const adiutThemeMap = {
  /** 通过 */
  ['OK']: 'primary',
  /** 提示 */
  ['I']: 'info',
  /** 慎用 */
  ['R']: 'warning',
  /** 禁用 */
  ['D']: 'negative'
}

import NoData from '@src/views/components/NoData'
import RecipeAudit from '@src/views/components/recipe/RecipeAudit'

export default {
  components: {
    NoData,
    RecipeAudit
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
      prescribeIndex: 1,

      audit: {
        visible: false,
        data: {}
      }
    }
  },
  computed: {},
  methods: {
    /** 是否显示前置审方按钮 */
    canShowAudit(code) {
      const showAduitMap = ['I', 'R', 'D']
      return showAduitMap.includes(code)
    },

    getThemeClass(code) {
      const theme = adiutThemeMap[code]

      return {
        [`text-${theme}`]: true
      }
    },

    showAudit(item) {
      this.audit.visible = true
      this.audit.data = item.PrescriptionAudit
    },

    goToNext() {
      if (this.prescribeIndex == this.data.prescribeInfos.list.length) {
        this.prescribeIndex = 1
      } else {
        this.prescribeIndex++
      }
    },
    getText(status) {
      let text = ''
      switch (status) {
        case 1:
          text = '待审核'
          break
        case 2:
          text = '质疑中'
          break
        case 3:
          text = '已拒绝'
          break
        case 4:
          text = '已作废'
          break
        case 5:
          text = '已通过'
          break
      }
      return text
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
        background: url('../../../assets/images/ic_time.png');
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
    width: 530px;
    height: 37px;
    font-size: 14px;
    line-height: 37px;
    margin: 0 auto 15px;
    color: #333333;
    // padding: 0 40px;
    padding-left: 40px;
    padding-right: 13px;
    background: rgba(249, 249, 249, 1) url('../../../assets/images/ic_tixing.png') no-repeat;
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
        background: rgba(249, 249, 249, 1) url('../../../assets/images/systen-Triangle.png') no-repeat;
        margin-left: 10px;
      }
    }
  }
}
</style>
