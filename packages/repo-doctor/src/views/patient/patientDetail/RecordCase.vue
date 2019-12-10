/*
 * 病历
*/

<template>
  <div @click="get"
       class="record-case">
    <div class="record-case-left">
      <img src="~@src/assets/images/inquiry/ic_medical record.png" />
    </div>
    <div class="record-case-right">
      <p class="record-case-right-title">病历</p>
      <p class="record-case-right-text">{{ data.netHospitalName }} | {{ data.netDeptName }}</p>
    </div>

    <peace-dialog :visible.sync="caseDialog.visible"
                  append-to-body
                  title="病历详情">
      <InquiryNewCaseDetail :data="caseDialog.data"></InquiryNewCaseDetail>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import InquiryNewCaseDetail from '@src/views/clinic/inquiry/InquiryNewCaseDetail.vue'

export default {
  props: {
    data: Object
  },

  components: {
    InquiryNewCaseDetail
  },

  data() {
    return {
      caseDialog: {
        visible: false,
        data: undefined
      }
    }
  },

  methods: {
    get() {
      const params = { inquiryNo: this.data.inquiryNo }
      // const params = { inquiryNo: 'WZ2722845337239667' }
      peace.service.inquiry.getHealthCase(params).then(res => {
        this.caseDialog.visible = true
        this.caseDialog.data = res.data
        // console.log(this.caseDialog.data)
      })
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

