/*
 * 处方
*/

<template>
  <div @click="get" class="record-prescribe">
    <div class="record-prescribe-left">
      <img src="~@src/assets/images/inquiry/ic_rp.png" />
    </div>
    <div class="record-prescribe-right">
      <p class="record-prescribe-right-title">处方</p>
      <p class="record-prescribe-right-text">{{ data.netHospitalName }} | {{ data.netdeptName }}</p>
    </div>

    <peace-dialog :visible.sync="prescribeDialog.visible" append-to-body title="病历详情">
      <InquirySessionRecipeDetail :data="prescribeDialog.data"></InquirySessionRecipeDetail>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import InquirySessionRecipeDetail from '@src/views/clinic/inquiry/InquirySessionRecipeDetail'

export default {
  props: {
    data: Object
  },

  components: {
    InquirySessionRecipeDetail
  },

  data() {
    return {
      prescribeDialog: {
        visible: false,
        data: undefined
      }
    }
  },

  methods: {
    get() {
      const params = { prescriptionId: this.data.id }

      peace.service.prescribePrescrip.getPrescripInfo(params).then(res => {
        this.prescribeDialog.visible = true
        this.prescribeDialog.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.record-prescribe {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  .record-prescribe-left {
    display: flex;
    justify-content: center;
    width: 25%;
  }

  .record-prescribe-right {
    flex: 1;

    .record-prescribe-right-title {
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
    }

    .record-prescribe-right-text {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>

