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
    <PeaceDialog append-to-body
                 title="处方详情"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeacePrescriptionDetailHIS v-bind:data="dialog.data"></PeacePrescriptionDetailHIS>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './../service/index.js'
import { PeacePrescriptionDetailHIS } from 'peace-components'

export default {
  props: {
    data: Object
  },

  components: {
    PeacePrescriptionDetailHIS
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
      this.dialog.visible = true
      this.dialog.data = this.fetchInitialVisitDetail
    },

    async fetchInitialVisitDetail() {
      const params = { prescriptionCode: this.data.dataNo }
      const res = await Service.getFirstOptionDetail(params)

      return res.data
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

