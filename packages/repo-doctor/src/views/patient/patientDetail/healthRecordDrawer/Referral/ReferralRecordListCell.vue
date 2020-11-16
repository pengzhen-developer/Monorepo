<template>
  <div>
    <div class="list-item"
         @click="showDetail">
      <div class="time-line-header">
        <span class="time-line-time">{{ item.createdTime }}</span>
        <span class="tag"
              v-bind:style="{
            color: borderColor,
            'background-color': bgColor,
            'border-color': borderColor
          }">{{ item.transferStatus | getReferralStatus }}</span>
      </div>
      <div class="item-content">
        <div class="info-row">
          <div class="info-row-label">
            {{ type === 'out' ? '转诊医生' : '申请医生' }}
          </div>
          <div class="info-row-content">
            <b>{{ item.docName + ' ' + item.docTitle }}</b> <br />
            {{ item.netHospitalName + ' ' + item.netdeptChild }}
          </div>
        </div>
        <div class="info-row">
          <div class="info-row-label">初步诊断</div>
          <div class="info-row-content">{{ item.diagnose || ' ' }}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">转诊说明</div>
          <div class="info-row-content">{{ item.referralCause || ' ' }}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">期望转诊时间</div>
          <div class="info-row-content">{{ item.expectTime || ' ' }}</div>
        </div>
      </div>
    </div>
    <peace-dialog :append-to-body="true"
                  :visible.sync="dialog.visible"
                  custom-class="dialog"
                  title="转诊详情">
      <TheTransferDetail :data="dialog.data"
                         :type="type"></TheTransferDetail>
    </peace-dialog>
  </div>
</template>

<script>
import { getReferralStatus, getReferralStatusTextBorderColor, getReferralStatusBgColor } from '@src/views/filters/index'

import TheTransferDetail from '@src/views/record/transfer/TheTransferDetail'

export default {
  props: {
    item: {
      type: Object,
      require: true
    },
    type: String
  },
  data() {
    return {
      dialog: {
        visible: false,
        data: {}
      }
    }
  },
  components: {
    TheTransferDetail
  },
  filters: { getReferralStatus },
  computed: {
    borderColor() {
      return getReferralStatusTextBorderColor(this.item.transferStatus)
    },

    bgColor() {
      return getReferralStatusBgColor(this.item.transferStatus)
    }
  },
  methods: {
    showDetail() {
      this.dialog.data = undefined
      this.dialog.visible = true
      const params = {
        referral_no: this.item.referralNo,
        referral_type: this.type
      }
      Peace.service.inquiry.referralDocPc(params).then((res) => {
        this.dialog.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  margin-bottom: 16px;

  .time-line-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px 0;

    .time-line-time {
      color: rgba(153, 153, 153, 1);
      vertical-align: middle;
      line-height: 15px;
      &:before {
        display: inline-block;
        content: '';
        width: 5px;
        height: 5px;
        background: #00c6ae;
        border-radius: 50%;
        margin: 0 8px 0 0;
        vertical-align: middle;
      }
    }

    .tag {
      width: auto;
      height: 20px;
      padding: 0 8px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 400;
      border: 1px solid;
    }
  }

  .item-content {
    padding: 15px 15px 9px 15px;
    background: rgba(249, 249, 249, 1);
    border-radius: 4px;

    .info-row {
      margin-bottom: 6px;
      font-size: 0;
      display: flex;

      &-label,
      &-content {
        font-size: 14px;
        line-height: 20px;
        display: inline-block;
        vertical-align: middle;
      }

      &-label {
        width: 99px;
        color: #666666;

        &:after {
          content: '：';
        }
      }

      &-content {
        flex: 1;
        word-break: break-all;
        color: #333333;
      }
    }
  }
}
</style>
