<template>
  <div class="record-case">
    <div v-on:click="get"
         class="record-case-left">
      <img src="~@src/assets/images/inquiry/ic_yinxiang@2x.png"
           style="width: 40px; height: 40px" />
    </div>
    <div v-on:click="get"
         class="record-case-right">
      <p class="record-case-right-title">{{ data.itemName }}</p>
      <p class="record-case-right-text">{{ data.netHospitalName }} | {{ data.netDeptName }}</p>
    </div>

    <PeaceDialog title="报告单"
                 v-bind:visible.sync="recordPACSDetailDialog.visible">
      <RecordPACSDetail v-bind:data="recordPACSDetailDialog.data"></RecordPACSDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import RecordPACSDetail from './RecordPACSDetail'

export default {
  components: {
    RecordPACSDetail
  },

  props: {
    data: Object
  },

  data() {
    return {
      recordPACSDetailDialog: {
        visible: false,
        data: {}
      }
    }
  },

  methods: {
    get() {
      const params = {
        checkId: this.data.id
      }

      Peace.service.report.pacsDetail(params).then((res) => {
        this.recordPACSDetailDialog.visible = true
        this.recordPACSDetailDialog.data = res.data
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