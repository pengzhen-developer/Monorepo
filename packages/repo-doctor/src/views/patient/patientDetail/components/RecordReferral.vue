<template>
  <div class="record-referral"
       @click="onClickReferralDetail">
    <div class="record-referral__left">
      <img :src="require('@src/assets/images/ic_转诊.png')" />
    </div>
    <div class="record-referral__right">
      <div class="title">转诊单</div>
      <div class="content">
        <span>{{ netHospitalName }}</span>
        <span v-if="netHospitalName !== '' && netDeptName !== ''"> | </span>
        <span>{{ netDeptName }}</span>
      </div>
    </div>
    <peace-dialog :visible.sync="referralVisible"
                  v-if="referralVisible"
                  append-to-body
                  title="转诊详情">
      <TheTransferDetail :data="referralData"
                         @close="() => referralVisible = false"></TheTransferDetail>
    </peace-dialog>
  </div>
</template>

<script>
import get from 'lodash/get'

import TheTransferDetail from '@src/views/record/transfer/TheTransferDetail'

export default {
  name: 'RecordReferral',
  components: {
    TheTransferDetail
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
          noData: true
        }
      }
    },
    type: String
  },
  data() {
    return {
      referralData: null,
      referralVisible: false
    }
  },
  computed: {
    referralNo() {
      return get(this, 'data.referralNo', null)
    },
    netHospitalName() {
      return get(this, 'data.netHospitalName', '')
    },
    netDeptName() {
      return get(this, 'data.netDeptName', '')
    }
  },
  methods: {
    onClickReferralDetail() {
      if (this.referralNo === null) {
        console.log('转诊号缺失')

        return
      }
      this.referralData = undefined
      this.referralVisible = true

      this.getReferralDetail(this.referralNo)
    },
    getReferralDetail(referralNo) {
      const params = {
        referral_no: referralNo,
        referral_type: 'out'
      }

      peace.service.inquiry.referralDocPc(params).then((res) => {
        this.referralData = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.record-referral {
  width: 100%;
  height: 80px;
  padding: 16px;
  cursor: pointer;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  &__left {
    margin: 0 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__right {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    .title {
      font-size: 16px;
      color: #333333;
    }

    .content {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
