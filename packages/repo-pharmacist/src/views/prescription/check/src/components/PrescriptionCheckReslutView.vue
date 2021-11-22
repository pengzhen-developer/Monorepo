<template>
  <div class="q-pa-24 flex">

    <el-radio-group v-model="active"
                    v-on:change="handleChange"
                    class="q-mt-4 q-mb-32 q-ml-auto q-mr-auto">
      <el-radio-button :label="tab.value"
                       v-for="(tab,index) in tabs"
                       :disabled="index === 3 && !seeClientCardCode"
                       :key="index">{{tab.label}}</el-radio-button>

    </el-radio-group>
    <!-- 审方记录 -->
    <div v-show="active===0"
         class="full-width"
         v-loading="isShowPreRecord">

      <PrescriptionCheckRecord v-bind:data="recordInfo"></PrescriptionCheckRecord>
    </div>
    <!-- 系统审方结果 -->
    <div class="full-width relative-position"
         v-show="active===1"
         v-loading="isShowPreResult">
      <el-button style="position:absolute;right:0;top:0"
                 v-on:click="againCheck">再次审方</el-button>
      <PrescriptionCheckReslut v-bind:data="preInfo"></PrescriptionCheckReslut>
    </div>

    <div v-show="showCheckImage"
         class="fullscreen cursor-pointer"
         style="position: fixed; backgroundColor: white">

      <el-image class="full-width full-height"
                fit="contain"
                v-bind:src="require('../assets/img/check_recode_img.png')">
      </el-image>

      <el-button v-on:click="closeImage"
                 class="absolute-top-right q-mr-20 q-mt-20"
                 type="text">
        <el-image v-bind:src="require('../assets/img/bigImage_close_icon.png')">
        </el-image>
      </el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'
import Observable from '../../observable'
import PrescriptionCheckReslut from '@views/prescription/prescription-check-reslut'
import PrescriptionCheckRecord from '@views/prescription/prescription-check-record'
export default {
  name: 'PrescriptionReviewReslut',
  components: {
    PrescriptionCheckReslut,
    PrescriptionCheckRecord
  },

  computed: {
    jztClaimNo() {
      return Observable.state.jztClaimNo
    },
    forceUpdate() {
      return Observable.state.forceUpdate
    }
  },
  watch: {
    forceUpdate(value) {
      if (value) {
        this.getPrescriptionInfo()
      }
    },

    jztClaimNo: {
      handler: function(val, oldVal) {
        if (val !== oldVal && val) {
          this.getPrescriptionInfo()
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      isShowPreRecord: false,
      isShowPreResult: false,
      tabs: [
        { label: '审方记录', value: 0, checked: true },
        { label: '系统审方结果', value: 1, checked: false },
        { label: '查看检验或检查单', value: 2, checked: false },
        { label: '历史用药', value: 3, checked: false }
      ],
      active: undefined,
      showCheckImage: false,
      seeClientCardCode: '',
      preInfo: undefined,
      recordInfo: undefined
    }
  },
  created() {},
  methods: {
    // 再次审方
    againCheck() {
      this.isShowPreResult = true
      Service.againCheckPrescription({ jztclaimNo: this.jztClaimNo })
        .then((res) => {
          this.preInfo = res.data
        })
        .catch((res) => {
          Peace.util.warning(res.data.msg)
        })
        .finally(() => {
          this.isShowPreResult = false
        })
    },
    getResultInfo() {
      this.isShowPreResult = true
      Service.getActionDetail({ jztClaimNo: this.jztClaimNo })
        .then((res) => {
          console.log(res)
          this.preInfo = res.data
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.isShowPreResult = false
        })
    },
    getRecordInfo() {
      this.isShowPreRecord = true
      Service.getPrescriptionLog({ jztClaimNo: this.jztClaimNo })
        .then((result) => {
          const list = result.data.map((item) => {
            let tmp = item
            let time = tmp.CreateTime
            item.timestamp = time.substring(0, 10)
            item.timestampSpan = time.substring(11, 19)
            return tmp
          })
          this.recordInfo = list
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.isShowPreRecord = false
        })
    },
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
    //处方信息
    getPrescriptionInfo() {
      Service.getPrescriptionInfo({ jztClaimNo: this.jztClaimNo }).then((res) => {
        this.seeClientCardCode = res.data.ClientCardCode
        if (res.data.doubleSign) {
          this.active = 0
        } else {
          this.active = 1
        }
        this.getResultInfo()
        this.getRecordInfo()
      })
    },
    async openHistoryDrugView() {
      const auth = await Peace.identity.auth.getAuth()
      const token = auth.access_token
      /// 历史用药
      window.open(
        `${process.env.VUE_APP_SITE_PHARMACIST}Engine/WebParams?uri=medicationHistory/viewHistoricalRecipe.html?id=${this.seeClientCardCode}&token=${token}`
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