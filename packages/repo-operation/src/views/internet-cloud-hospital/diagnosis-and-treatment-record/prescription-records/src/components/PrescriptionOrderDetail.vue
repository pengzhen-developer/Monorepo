<template>
  <div>
    <div class="tips"
         v-if="!info.current&&info.total > 1">
      <span>共{{ info.total }}张，当前第{{ info.prescribeIndex+1 }}张（{{ info.prescribeIndex+1 }}/{{ info.total }}）</span>

      <div class="flex next">
        <div class="q-mr-sm"
             @click="goToPrev()">
          <i class="arrow q-mr-sm"
             style="transform: rotate(180deg);"></i>
          <span>上一张</span>
        </div>
        <div @click="goToNext()">
          <span>下一张</span>
          <i class="arrow q-ml-sm"></i>
        </div>
      </div>
    </div>

    <PeacePrescriptionDetail v-bind:data="internalData"></PeacePrescriptionDetail>
  </div>
</template>
<script>
import Service from './../service/index.js'
import { PeacePrescriptionDetail } from 'peace-components'

export default {
  name: 'prescription-order-detail',

  components: {
    PeacePrescriptionDetail
  },

  props: {
    info: {
      type: Object
    },
    data: {
      type: Object
    }
  },

  watch: {
    info: {
      handler() {
        this.internalData = () => this.getPrescriptionDetail(this?.info?.prescriptionNo)
      },
      immediate: true
    }
  },

  data() {
    return {
      internalData: undefined
    }
  },

  methods: {
    goToPrev() {
      if (this.info.prescribeIndex == 0) {
        this.info.prescribeIndex = this.info.total - 1
      } else {
        this.info.prescribeIndex--
      }
      const param = {
        ids: this.info.presIds,
        idx: this.info.prescribeIndex
      }
      this.$emit('viewPres', param)
    },

    goToNext() {
      if (this.info.prescribeIndex == this.info.total - 1) {
        this.info.prescribeIndex = 0
      } else {
        this.info.prescribeIndex++
      }
      const param = {
        ids: this.info.presIds,
        idx: this.info.prescribeIndex
      }
      this.$emit('viewPres', param)
    },

    async getPrescriptionDetail(prescriptionNo) {
      const params = { prescriptionNo: prescriptionNo }
      const res = await Service.getPrescriptionDetail(params)

      return res.data
    }
  }
}
</script>
<style lang="scss" scoped>
.tips {
  height: 37px;
  font-size: 14px;
  line-height: 37px;
  margin: 0 auto 15px;
  color: #333333;
  // padding: 0 40px;
  padding-left: 40px;
  padding-right: 13px;
  background: rgba(249, 249, 249, 1) url('../assets/images/ic_tixing.png') no-repeat;
  background-position: 13px 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .next {
    cursor: pointer;
    i.arrow {
      width: 4px;
      height: 8px;
      display: inline-block;
      background: rgba(249, 249, 249, 1) url('../assets/images/systen-Triangle.png') no-repeat;
      margin-left: 10px;
    }
  }
}
.pres {
  position: relative;
  padding: 7px 0px;
  & > div {
    padding: 0 11px;
  }
  .status-image {
    position: absolute;
    top: 50px;
    right: 60px;
    width: 72px;
    height: 72px;
    display: block;
  }
  .pres-no {
    font-size: 14px;
    line-height: 22px;
    color: #999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      color: var(--q-color-primary);
      cursor: pointer;
    }
  }
  .pres-title {
    margin-top: 2px;
    padding-bottom: 25px;
    border-bottom: 1px dashed #bfbfbf;
    font-size: 22px;
    line-height: 25px;
    font-weight: bold;
    text-align: center;
    color: #333;
  }
  .rp-title {
    margin-top: 8px;
    padding-bottom: 4px;
    font-size: 18px;
    line-height: 25px;
    border-bottom: 1px solid #f3f3f3;
  }
  .pres-info {
    padding-top: 2px;
  }
  .pres-rp {
    padding-bottom: 13px;
    border-bottom: 1px solid #f3f3f3;
  }
  .rp-item {
    padding: 9px 0;
    color: #999;
    font-size: 14px;
    line-height: 22px;
    border-bottom: 1px dashed #c4c4c4;
    &:last-of-type {
      border-bottom: 0;
    }
    strong {
      color: #333;
      font-size: 16px;
      line-height: 25px;
      span + span {
        margin-left: 10px;
      }
      .ft {
        float: right;
      }
    }
  }
}

.info-row {
  font-size: 0;
  display: flex;
  .info-row-label,
  .info-row-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  .info-row-label {
    color: #778899;
    white-space: nowrap;
    & > span {
      width: 4.3em;
      text-align: right;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      display: inline-block;
    }
    &.t-6 > span {
      width: 6em;
    }
    &.t-6 + .info-row-content {
      width: calc(100% - 7em);
    }
    &.t-7 > span {
      width: 7em;
    }
    &.t-7 + .info-row-content {
      width: calc(100% - 8em);
    }
    &:after {
      content: '：';
    }
  }
  .info-row-content {
    padding-left: 2px;
    width: calc(100% - 1em - 4.3em);
    font-weight: bold;
    word-break: break-all;
    color: #23313f;
    & > img {
      height: 20px;
      display: block;
    }
  }
  &.two-cols {
    .info-row-label.t-6 + .info-row-content {
      width: calc(50% - 7em);
    }
    .info-row-content {
      width: calc(50% - 1em - 4.3em);
    }
  }
}
</style>
