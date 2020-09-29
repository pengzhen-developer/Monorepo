/*
 * 诊疗记录
 * 在健康档案叫'处方'
 */

<template>
  <div @click="get"
       class="record-case">
    <div class="record-case-left">
      <img src="~@src/assets/images/inquiry/ic_option_record.png"
           style="width: 40px; height:40px" />
    </div>
    <div class="record-case-right">
      <p class="record-case-right-title">处方</p>
      <p class="record-case-right-text">{{ data.netHospitalName }} | {{ data.netDeptName }}</p>
    </div>
    <peace-dialog v-if="dialog.visible"
                  :visible.sync="dialog.visible"
                  append-to-body
                  title="处方详情">
      <FirstOptionDetail :prescriptionCode="dialog.data"></FirstOptionDetail>
    </peace-dialog>
  </div>
</template>

<script>
// import peace from '@src/library'
import FirstOptionDetail from '@src/views/patient/patientDetail/components/FirtstOptionDetail.vue'

export default {
  props: {
    data: Object
  },

  components: {
    FirstOptionDetail
  },

  data() {
    return {
      dialog: {
        visible: false,
        data: undefined
      }
    }
  },

  methods: {
    get() {
      // const params = { dataNo: this.data.dataNo }
      // // const params = { inquiryNo: 'WZ2722845337239667' }
      // peace.service.inquiry.getHealthCase(params).then((res) => {
      //   this.caseDialog.visible = true
      //   this.caseDialog.data = res.data
      //   // console.log(this.caseDialog.data)
      // })
      this.dialog.visible = true
      this.dialog.data = this.data.dataNo
    }
  }
}
</script>

<style lang="scss" scoped>
.record-case {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;

  cursor: pointer;

  .record-case-left {
    display: flex;
    justify-content: center;
    width: 25%;
  }

  .record-case-right {
    flex: 1;

    .record-case-right-title {
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
    }

    .record-case-right-text {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>

