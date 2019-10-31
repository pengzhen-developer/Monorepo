<template>
  <div class="newCaseDetail">
    <div class="caption">
      <div class="left">
        <span class="name">{{data.patientInfo.familyName}}</span>
        <span class="sex">{{data.patientInfo.sex}}</span>
        <span class="dept">门诊</span>
      </div>
      <div class="right">
        {{data.patientInfo.createTime}}
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

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="病历详情" name="first">
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
        <div class="item">
          <span class="title">检查指标：</span>
          <div class="dataBox">
            <div class="line">
              <div class="dataItem">
                <span class="title">体温：</span>
                <span class="content">{{data.caseInfo.InspectionIndex.temperature =='' ? '无':data.caseInfo.InspectionIndex.temperature}}度</span>
              </div>
              <div class="dataItem">
                <span class="title">体重：</span>
                <span class="content">{{data.caseInfo.InspectionIndex.weight =='' ? '无':data.caseInfo.InspectionIndex.weight}}kg</span>
              </div>
            </div>
            <div class="divide"></div>
            <div class="line">
              <div class="dataItem">
                <span class="title">心率：</span>
                <span class="content">{{data.caseInfo.InspectionIndex.heart_rate =='' ? '无':data.caseInfo.InspectionIndex.heart_rate}}bmp</span>
              </div>
              <div class="dataItem">
                <span class="title">血压：</span>
                <span class="content">{{data.caseInfo.InspectionIndex.blood_pressure =='' ? '无':data.caseInfo.InspectionIndex.blood_pressure}}mmHg</span>
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
      <el-tab-pane label="处方" name="second">
        <div class="prescribe" v-for="(item,index) in data.prescribeInfos.list" :key="'prescribe' + index">
          <div class="item">
            <span class="title">处方编号：</span>
            <span class="content">{{item.prescriptionNo}}</span>
          </div>
          <div class="item">
            <span class="title">临床诊断：</span>
            <span class="content">{{item.diagnosisInfos}}</span>
          </div>

          <div class="dragList">
            <div class="dragItem" v-for="(drug,index) in item.drugCode" :key="'drug' + index">
              <div class="dragCode">
                {{drug.drugCode}}
              </div>
              <div class="title">
                <span>{{drug.drugName}} {{drug.drugSpecifications}}</span>
                <span> x{{drug.drugQty}}</span>
              </div>
              <div class="usage">
                用法用量：每日2次，每次50mg，口服，三天
              </div>
            </div>
          </div>
          <div class="staffBox">
            <div class="line">
              <div class="dataItem">
                <span class="title">医 师：</span>
                <span class="content">{{item.psychiatric =='' ? '无':item.psychiatric}}</span>
              </div>
              <div class="dataItem">
                <span class="title">审方药师：</span>
                <span class="content">{{item.prescriptionPharmacistName =='' ? '无':item.prescriptionPharmacistName}}</span>
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

            <div class="line" style="margin-top: 10px;">
              <div class="dataItem">
                <span class="title">药师审方结果：</span>
                <span class="content">{{item.disPharmacist =='' ? '无':item.disPharmacist}}</span>
              </div>
              <div class="dataItem">
                <span class="title">系统审方结果</span>
                <span class="content">{{item.sendPharmacist =='' ? '无':item.sendPharmacist}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="检验检查" name="third">
        <NoData type="health"></NoData>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import NoData from '@src/views/components/NoData'
export default {
    components: {
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
      activeName: 'first'
    }
  },
  computed: {
    internalData() {
      const temp = $peace.util.deepClone(this.data)

      if (temp.Inspection_index) {
        temp.Inspection_index = JSON.parse(temp.Inspection_index)
      }

      return temp
    }
  }
}
</script>

<style lang="scss" scoped>
.newCaseDetail {
  font-size: 12px;
  padding: 0 20px;
  .caption {
      display: flex;
      justify-content: space-between;
    .name {
      font-size:22px;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .sex {
      font-size:14px;
      font-weight:500;
      color:rgba(51,51,51,1);
      display: inline-block;
      margin-left: 16px;
      margin-right: 16px;
    }
    .dept {
      padding: 2px 6px;
      background:rgba(241,241,241,1);
      border-radius:2px;
      font-size:12px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height: 20px;
    }
  }
  .item {
    margin-top: 6px;
    display: flex;
    .title {
      display: inline-block;
      font-size:14px;
      font-weight:400;
      color:rgba(102,102,102,1);
      width: 80px;
    }
    .content {
      font-size:14px;
      font-weight:600;
      color:rgba(51,51,51,1);
    }
    .dataBox {
      width:410px;
      height:80px;
      background:rgba(248,248,248,1);
      border-radius:4px;
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
        width:370px;
        height:1px;
        margin: 10px auto 10px;
        background: #E5E5E5;
      }
    }
  }
  .dragList {
    .dragItem {
      display: flex;
      flex-direction: column;
      color: #333;
      height: 90px;
      justify-content: center;
      border-bottom: 1px dashed #C4C4C4;
      .dragCode {
        font-size:18px;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:25px;
      }
      .title {
        display: flex;
        font-size:16px;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .usage {
        font-size:14px;
        font-weight:400;
        color:rgba(153,153,153,1);
      }
    }
  }
  .staffBox {
    display: flex;
    flex-direction: column;
    height: 110px;
    justify-content: center;
    .line {
      display: flex;
      margin-bottom: 5px;

      .dataItem {

        width: 250px;
        .title {
          font-size:14px;
          font-weight:400;
          color:rgba(102,102,102,1);
          width: 50px;
        }
        .content {
          font-size:14px;
          font-weight:600;
          color:rgba(51,51,51,1);
        }
      }
    }
  }
}
</style>
