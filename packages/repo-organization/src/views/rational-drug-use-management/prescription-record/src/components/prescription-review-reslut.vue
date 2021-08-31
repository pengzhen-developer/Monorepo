<template>
  <div class="layout-route flex">

    <el-radio-group v-model="active"
                    v-on:change="handleChange"
                    class="q-mt-10 q-mb-34 q-ml-auto q-mr-auto">
      <el-radio-button :label="tab.value"
                       v-for="(tab,index) in tabs"
                       :disabled="index === 3 && !seeClientCardCode"
                       :key="index">{{tab.label}}</el-radio-button>

    </el-radio-group>
    <!-- 审方记录 -->
    <div v-show="active===0"
         class="full-width">
      <prescription-check-recode v-bind:id="jztClaimNo"></prescription-check-recode>
    </div>
    <!-- 系统审方结果 -->
    <div class="full-width"
         v-show="active===1">
      <PrescriptionAudit v-bind:id="jztClaimNo"></PrescriptionAudit>
    </div>

    <div v-show="showCheckImage">

      <el-image class="fullscreen cursor-pointer"
                style="position: fixed; backgroundColor: white"
                v-on:click="closeImage"
                v-bind:src="require('../assets/img/check_recode_img.png')">

      </el-image>
    </div>
  </div>
</template>

<script>
import PrescriptionAudit from './prescription-audit.vue'
import PrescriptionCheckRecode from './prescription-check-recode.vue'
export default {
  name: 'PrescriptionReviewReslut',
  props: {
    jztClaimNo: {
      type: String,
      required: true
    },
    seeClientCardCode: {
      type: String,
      required: false
    }
  },
  components: {
    PrescriptionAudit,
    PrescriptionCheckRecode
  },
  data() {
    return {
      tabs: [
        { label: '审方记录', value: 0, checked: true },
        { label: '系统审方结果', value: 1, checked: false },
        { label: '查看检验或检查单', value: 2, checked: false },
        { label: '历史用药', value: 3, checked: false }
      ],
      active: 0,
      showCheckImage: false
    }
  },
  methods: {
    handleChange(value) {
      switch (value) {
        case 2:
          /// 查看检验单
          this.showCheckImage = true
          this.active = 1
          break
        case 3:
          this.active = 1
          this.openHistoryDrugView()
          break
        default:
          break
      }
    },
    async openHistoryDrugView() {
      const auth = await Peace.identity.auth.getAuth()
      const token = auth.access_token
      /// 历史用药
      window.open(
        `${process.env.VUE_APP_SITE_PRESCRIPTION}Engine/WebParams?uri=medicationHistory/viewHistoricalRecipe.html?id=${this.seeClientCardCode}&token=${token}`
      )
    },
    closeImage() {
      this.showCheckImage = false
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-route {
  min-height: 374px;
  position: relative;
}
.card {
  margin-top: 16px;
  padding: 24px;

  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  min-height: 374px;
  &.result {
    padding: 0 0 10px 0;
  }
  .header {
    background-color: #eaf4f6;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
  .contenter {
    .el-image {
      width: 30px;
      height: 30px;
      margin-right: 16px;
    }
    span {
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      line-height: 1;
    }
  }
}
</style>