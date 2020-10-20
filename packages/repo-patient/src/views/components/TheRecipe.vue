<template>
  <div class="the-recipe"
       v-if="internalData">
    <div :class="{ [`icon-status-${ internalData && internalData.prescriptionStatus && internalData.prescriptionStatus.key }`] : canShowPrescriptionStatus }"
         class="prescript icon-status">
      <div class="prescript-no">
        <span class="prescript-btn"
              @click="seeOriginalPrescription"
              v-if="dialog.data.pngUrl">原始处方</span>
        No.{{internalData.prescriptionNo}}
      </div>
      <div class="prescript-head">{{internalData.medicalInstitutionName}}</div>
      <div class="prescript-h4">处方笺</div>
      <div class="prescript-line">
        <div class="span"
             style="width: 50%; text-align: left;">
          <span>病历号：</span>
          <span>{{internalData.caseNo}}</span>
        </div>
        <div class="span"
             style="width: 50%; text-align: right;">
          <span>开具日期：</span>
          <span>{{internalData.prescriptionTime}} </span>
        </div>
      </div>
      <div class="prescript-table dotted-line-before">
        <div class="th">
          姓名
          <div class="td">{{internalData.patientName}}</div>
        </div>
        <div class="th">
          性别
          <div class="td">{{internalData.patientGender}}</div>
        </div>
        <div class="th">
          年龄
          <div class="td">{{internalData.age}}</div>
        </div>
        <div class="th">
          科别
          <div class="td">{{internalData.medicalDepartmentName}}</div>
        </div>
      </div>
    </div>
    <!--体重-->
    <div class="outline"
         v-if="internalData.weight">
      <div class="outline-header">
        <div class="outline-tit outline-weight">体重 <span>{{internalData.weight}}kg</span></div>
      </div>
    </div>
    <!--临床诊断-->
    <div class="outline">
      <div class="outline-header">
        <div class="outline-tit">临床诊断</div>
      </div>
      <div class="outline-body">
        <div :key="index"
             class="inline color-000"
             v-for="(item,index) in internalData.diagnosisInfos">
          {{item.DiagnosisName ? item.DiagnosisName: internalData.diagnosisInfos.length ? '' : '暂无'}}
        </div>
      </div>
    </div>
    <!--过敏史-->
    <div class="outline">
      <div class="outline-header">
        <div class="outline-tit">过敏史</div>
      </div>
      <div class="outline-body">
        <div class="inline">
          {{internalData.allergicHistory || '暂无'}}
        </div>
      </div>
    </div>
    <!--RP-->
    <div class="outline ">
      <div class="outline-header">
        <div class="outline-tit">Rp</div>
      </div>
      <div class="outline-body drug">
        <div :key="index"
             class="column-2 dotted-line-after"
             v-for="(item, index) in internalData.drugCode">
          <div class="column-left">
            <div class="inline">
              <div class="inline-flex">
                <span>{{item.drugName}}</span>
                {{item.drugSpecifications}}
              </div>
              <div class="inline unit">x{{item.drugQty}}</div>
            </div>
            <div class="small"
                 v-if="item.drugUse">{{item.drugUse}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--处方审核-->
    <div class="outline">
      <div class="outline-header">
        <div class="outline-tit">处方审核</div>
      </div>
      <div class="outline-body"><span class="inline">{{ internalData.prescriptionExamMemo }}</span>
      </div>
    </div>
    <!--医生签名-->
    <div class="outline module">
      <div class="namelist-dl npd">
        <div class="dt justify"><span>医师</span> ：</div>
        <div class="dd">
          <!-- <img :src="internalData.doctorSignImage"
               v-if="internalData.doctorSignImage" /> -->
          {{internalData.doctorName}}
        </div>
      </div>
      <div class="namelist-dl npd">
        <div class="dt">审核药师：</div>
        <div class="dd">
          <!-- <img :src="internalData.prescriptionSign"
               v-if="internalData.prescriptionSign" /> -->
          {{internalData.prescriptionPharmacistName}}
        </div>
      </div>
      <div class="namelist-dl">
        <div class="dt">调配药师：</div>
        <div class="dd"></div>
      </div>
      <div class="namelist-dl">
        <div class="dt">发药药师：</div>
        <div class="dd"></div>
      </div>
    </div>
    <div class="bt">注意：本处方24小时有效，处方失效后不可作为购药凭证购药。仅限通过平台认证的药店配送，自行下载处方或截屏购药不具有效力。</div>
    <!-- <div class="bottom"
         v-if="internalData.prescriptionStatus && ($peace.$route.params.json && $peace.util.decode($peace.$route.params.json).showDetailButton !== false)">
      <div :class="internalData.prescriptionStatus.key == '2' || internalData.prescriptionStatus.key == '5' || internalData.prescriptionStatus.key == '6' ? 'btn-blue' : 'btn-default'"
           @click="goMenuPage(internalData)"
           class="btn btn-blue block">{{ internalData.prescriptionStatus.msg }}</div>
    </div> -->
    <div class="bottom"
         v-if="canShowBottomBlock">
      <div :class="BottomBlockBackClass"
           @click="goMenuPage(internalData)"
           class="btn btn-blue block">{{ OrderDrugStatusText[internalData.orderDrugStatus] }}</div>
    </div>

    <div class="shadow"
         v-show="dialog.visible"
         @click="dialog.visible = false">
      <div class="content">
        <van-image class="close"
                   @click="dialog.visible = false"
                   :src="require('@src/assets/images/ic_cha.png')"></van-image>
        <div class="content-auto">
          <van-image :src="dialog.data.pngUrl+'?'+new Date().getTime()"></van-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
const OrderDrugStatus = {
  待购药: 1,
  已下单: 2,
  已购药: 3,
  已失效: 4
}
const OrderDrugStatusText = {
  1: '去购药',
  2: '药品已预约，查看详情',
  3: '药品已预约，查看详情',
  4: '已失效处方不可购药'
}
// prescription_status  新处方状态   0."已预审",1."待审核", 2."质疑中", 3."未通过", 4."已作废",5."已通过"
const PrescriptionStatus = {
  已预审: 0,
  待审核: 1,
  质疑中: 2,
  未通过: 3,
  已作废: 4,
  已通过: 5
}
export default {
  props: {
    data: {
      type: Object,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      OrderDrugStatus: OrderDrugStatus,
      OrderDrugStatusText: OrderDrugStatusText,
      PrescriptionStatus: PrescriptionStatus,
      internalData: undefined,
      fromDrugDetail: false,
      dialog: {
        visible: false,
        data: {
          pngUrl: ''
        }
      }
    }
  },
  computed: {
    canShowPrescriptionStatus() {
      return $peace.$route.params.json && $peace.util.decode($peace.$route.params.json).showDetailButton !== false && this.internalData?.prescriptionStatus?.key
    },
    canShowBottomBlock() {
      return (
        this.internalData.prescription == this.PrescriptionStatus.已通过 &&
        $peace.$route.params.json &&
        $peace.util.decode($peace.$route.params.json).showDetailButton !== false
      )
    },
    BottomBlockBackClass() {
      return this.internalData.prescription == this.PrescriptionStatus.已通过 && this.internalData.orderDrugStatus != this.OrderDrugStatus.已失效
        ? 'btn-blue'
        : 'btn-default'
    }
  },
  watch: {
    $route() {
      // 页面回退，需要刷新
      if (this.$route.name === '/components/theRecipe/:json' && this.$route.params['stack-key-dir'] === 'back') {
        this.get()
      }
    },

    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    }
  },

  created() {
    if (!this.data) {
      this.get()
    }
  },

  methods: {
    get() {
      this.getPrescripInfo()
      this.getPrescriptionImage()
    },
    getPrescripInfo() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.patient.getPrescripInfo(params).then((res) => {
        this.internalData = res.data
      })
    },
    goMenuPage(data) {
      const key = data.orderDrugStatus
      if (key == OrderDrugStatus.待购药) {
        //去配药页面
        let claimNo = data.claimNo
        let familyId = data.familyId
        let familyName = data.patientName
        let json = peace.util.encode({ claimNo, familyId, familyName })
        this.$router.push(`/drug/list/${json}`)
        return
      }
      if (key == OrderDrugStatus.已下单 || key == OrderDrugStatus.已购药) {
        const json = peace.util.encode({ OrderId: data.orderId })
        this.$router.push(`/order/userDrugDetail/${json}`)
        return
      }
      return
    },
    seeOriginalPrescription() {
      this.dialog.visible = true
    },
    getPrescriptionImage() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.patient.getPrescriptionImage(params.prescribeId).then((res) => {
        this.dialog.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  padding: 1px;
  background: #fff;
  .btn {
    margin: 10px 15px;
  }
}
.shadow {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  .content {
    height: 315px;
    width: 85%;
    border-radius: 7px;
    overflow-y: auto;
    background: #ffffff;
    padding: 42px 0 15px 0;
    position: relative;
    .close {
      right: 12px;
      top: 12px;
      width: 18px;
      height: 18px;
      position: absolute;
    }
    .content-auto {
      padding: 0px 12px 0 12px;
      height: 100%;
      overflow-y: auto;
      .van-image {
        width: 100%;
        min-height: 100%;
      }
    }
  }
}
.prescript {
  background: #fff;
  padding: 5px 15px;
  margin-bottom: 7.5px;
}
.prescript-no {
  display: flex;
  align-items: center;
}
.prescript-btn {
  padding: 0 4px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
  font-size: 10px;
  margin-right: 4px;
}
.prescript .prescript-no,
.prescript .prescript-line {
  color: #999;
  font-size: 11px;
  line-height: 15px;
}
.prescript .prescript-line {
  display: flex;
  justify-content: space-around;
}
.prescript-line .span {
  flex: 1 1 auto;
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.prescript .prescript-head {
  font-size: 15px;
  line-height: 1.5;
  margin-top: 8px;
  text-align: center;
}
.prescript .prescript-h4 {
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 5px;
}
.prescript .prescript-table {
  display: flex;
  text-align: center;
  padding-top: 10px;
  margin-top: 10px;
}
.prescript-table .th {
  flex: 1;
  font-size: 13px;
  color: #999;
}
.prescript-table .td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  color: #000;
  padding: 3px;
}
</style>

<style lang="scss" scoped>
.the-recipe {
  background: #f5f5f5;
  position: absolute;
  overflow: auto;
  height: 100%;

  .prescript {
    width: 100%;
  }

  .prescript.icon-status::after {
    content: '';
    right: 5px;
    top: 15px;
    display: block;
    position: absolute;
    width: 98px;
    height: 98px;
    background-size: cover;
  }

  //新处方戳状态 1.'审核中'2.'已通过'3'已作废'

  .icon-status.icon-status-0::after {
    content: '';
    background-image: url('../../assets/images/icon-status-1.png');
  }
  .icon-status.icon-status-1::after {
    content: '';
    background-image: url('../../assets/images/icon-status-1.png');
  }
  .icon-status.icon-status-2::after {
    content: '';
    background-image: url('../../assets/images/icon-status-1.png');
  }
  .icon-status.icon-status-3::after {
    content: '';
    background-image: url('../../assets/images/icon-status-3.png');
  }
  .icon-status.icon-status-4::after {
    content: '';
    background-image: url('../../assets/images/icon-status-3.png');
  }
  .icon-status.icon-status-5::after {
    content: '';
    background-image: url('../../assets/images/icon-status-2.png');
  }

  .outline {
    margin: 0 0 7.5px 0;
    padding-left: 18px;
    padding-right: 18px;
  }
  .outline .outline-header {
    margin: 10px 0;
  }
  .outline .outline-body {
    margin-top: 10px;
    margin-right: 0;
    padding: 15px 0;
    border-top: 1px solid #dedede;
    overflow: hidden;
    &.drug {
      padding: 0;
      margin: 0;
    }
    > .inline {
      padding-left: 12px;
    }
  }
  .outline-tit {
    color: #666;
    &.outline-weight {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        color: #333;
        font-weight: normal;
      }
    }
  }
  .outline-body,
  .outline-body .inline,
  .inline {
    display: block;
    word-wrap: break-word;
    &.color-000 {
      color: #000;
    }
  }
  .inline-flex {
    word-break: break-all;
    padding-right: 5px;
    span {
      margin-right: 20px;
    }
  }
  .bt {
    padding: 0 15px 8px 30px;
    font-size: 11px;
    color: #999;
  }

  .column-2 {
    display: flex;
    color: #000;
    font-size: 15px;
    margin-top: 1px;
    padding: 10px 0 10px 15px;
    position: relative;
    &:last-child {
      &:after {
        border-width: 0;
      }
    }
  }

  .column-2 .column-left {
    flex: 1 1 auto;
  }
  .column-2 .column-left .inline {
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: space-between;
    &.unit {
      width: 50px;
      white-space: nowrap;
      display: block;
    }
  }
  .column-left .inline .span {
    flex: 0 0 auto;
  }
  .column-left .inline .span.l {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 15px;
  }
  .column-left .small {
    color: #999;
    font-size: 13px;
    padding-top: 5px;
  }
  .column-2 .column-right {
    flex: 0 0 auto;
    width: 30px;
    text-align: right;
  }

  .module {
    padding: 5px 30px;
    box-sizing: border-box;

    display: flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -webkit-box-lines: multiple;
    -moz-flex-wrap: wrap;
  }
  .namelist-dl {
    font-size: 13px;
    color: #999;
    width: 50%;
    display: flex;
  }
  .namelist-dl .dt {
    flex: 0 0 auto;
    width: 65px;
  }
  .namelist-dl .dd {
    flex: 1 1 auto;
    width: 65px;
    color: #000;
  }
  .namelist-dl .dd img {
    width: 45px;
    height: 17px;
  }
  .npd {
    padding-bottom: 0;
  }
  .justify {
    display: flex;
    span {
      text-align-last: justify;
      flex: 1;
    }
  }
}
</style>

<style lang="scss" scoped>
.form-dl {
  background-color: #fff;
  padding: 15px;
  display: flex;
  color: #000;
  font-size: 15px;
  border-bottom: 1px solid #f5f5f5;
}

.form-dl .form-dt {
  position: relative;
  flex: 0 0 auto;
  min-width: 100px;
}

.form-dt .red {
  display: inline;
  color: #fb2828;
}

.form-dl .form-dd {
  position: relative;
  flex: 1;
  color: #999;
  text-align: right;
}
.form-dl .form-dd.blue {
  color: #00c6ae;
}
.form-dd.value {
  color: #333;
}
.form-dd.icon-next {
  padding-right: 15px;
}

.form-dd.icon-next::before {
  content: '';
  position: absolute;
  display: inline-block;
  top: 4px;
  right: -7px;
  width: 15px;
  height: 15px;
  background-size: 7px;
  background-repeat: no-repeat;
}

.form-dd input,
input {
  color: #666;
}

.form-dd input.placeholder {
  color: #bebebe;
}
</style>
