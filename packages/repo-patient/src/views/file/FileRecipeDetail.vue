<template>
  <div class="file-recipe-detail">
    <template v-if="data.total < 1">
      <div class="none-page"
           style="background: #fff;">
        <div class="icon ic_no_rp t20"></div>
        <div class="none-text">暂无处方</div>
      </div>
    </template>

    <template v-else>
      <div class="tip"
           v-if="data.total > 1">
        <div class="tip-left">
          <van-icon :name="require('@src/assets/images/ic_tixing.png')"
                    style="margin: 0 5px 0 0;"></van-icon>
          <span>
            共{{ data.total }}张， 当前为第{{ current + 1 }}张（{{
              current + 1
            }}
            / {{ data.total }}）</span>
        </div>
        <div class="tip-right"
             @click="next">
          <span>下一张</span>
          <van-icon :name="require('@src/assets/images/ic_arrow.png')"
                    style="margin: 0 0 0 5px;"></van-icon>
        </div>
      </div>

      <div class="row">
        <div class="row-header">
          <div class="row-header-title">
            <span class="row-header-title-span">处方编号</span>
          </div>
        </div>
        <div class="row-body">
          <span>{{ data.list[current].prescriptionNo }}</span>
        </div>
      </div>

      <div class="row"
           v-if='data.list.length>0&&data.list[current].weight'>
        <div class="row-header">
          <div class="row-header-title weight">
            <div class="row-header-title-span weight">
              体重
              <span>{{data.list[current].weight}}kg</span>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="row-header">
          <div class="row-header-title">
            <span class="row-header-title-span">临床诊断</span>
          </div>
        </div>
        <div class="row-body">
          <span>{{ data.list[current].diagnosisInfos }}</span>
        </div>
      </div>

      <div class="row">
        <div class="row-header">
          <div class="row-header-title">
            <span class="row-header-title-span">过敏史</span>
          </div>
        </div>
        <div class="row-body">
          <span>{{ allergyHistory||'无' }}</span>
        </div>
      </div>

      <div class="row">
        <div class="row-header">
          <div class="row-header-title">
            <span class="row-header-title-span">RP</span>
          </div>
        </div>
        <div class="row-body dotted-line-after"
             v-for="item in data.list[current].drugCode"
             :key="item.drugCode">
          <div class="flex between">
            <div class="row-body-item-left">
              <span>
                {{ item.drugName }}
              </span>
              <span>
                {{ item.drugSpecifications }}
              </span>
            </div>
            <div class="row-body-item-right">
              x {{ item.drugQty}}{{item.drugQuantityUnit}}
            </div>
          </div>
          <div class="row-body-item-drugUse">
            <span>{{
              item.drugUse
            }}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="row-header">
          <div class="row-header-title">
            <span class="row-header-title-span">处方审核</span>
          </div>
        </div>
        <div class="row-body">
          <span>{{ data.list[current].prescriptionExamMemo }}</span>
        </div>
      </div>

      <div class="row"
           style="padding: 10px 20px;">
        <div class="flex between"
             style="margin: 0 0 10px 0;">
          <div class="flex"
               style="flex: 1;">
            <span class="justify row-dd"><span>医师</span> ：</span>
            <span class="row-img">
              {{data.list[current].doctorName}}
            </span>
          </div>
          <div class="flex"
               style="flex: 1;">
            <span class="row-dd">审核药师：</span>
            <span class="row-img">
              {{data.list[current].prescriptionPharmacistName}}
            </span>
          </div>
        </div>
        <div class="flex between">
          <div class="flex"
               style="flex: 1;">
            <span class="row-dd">调配药师：</span>
            <span>{{ data.list[current].disPharmacist }}</span>
          </div>
          <div class="flex"
               style="flex: 1;">
            <span class="row-dd">发药药师：</span>
            <span>{{ data.list[current].sendPharmacist }}</span>
          </div>
        </div>
      </div>

      <div class="footer">
        <div v-if="canShowMoreTip(data.list[current])"
             v-html="'注：1.服药期间如有不适，请立即停止使用并前往线下医院进一步检查治疗；\n 2.仅限通过平台认证的药店配送，自行下载处方购药不具有效力，为确保用药安全，24小时内处方有效；'"></div>
        <div v-else
             v-html="'注：1.仅限通过平台认证的药店配送，自行下载处方购药不具有效力，为确保用药安全，24小时内处方有效；'">
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          list: [],
          total: 0
        }
      }
    },
    allergyHistory: {
      type: String,
      default() {
        return '无'
      }
    }
  },

  data() {
    return {
      current: 0
    }
  },

  methods: {
    canShowMoreTip(item) {
      return item?.prescriptionStatus?.key == 5 || item.prescription == 5
    },
    next() {
      if (this.current + 1 >= this.data.total) {
        this.current = 0
      } else {
        this.current = this.current + 1
      }
      this.getCurrent()
    },
    getCurrent() {
      this.$emit('getCurrent', this.current)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;

  &.column {
    flex-direction: column;
  }
  &.between {
    justify-content: space-between;
  }
  &.center {
    justify-content: center;
  }
}

.row-dd {
  font-size: 13px;
  color: #999;
  width: 5em;
}
.row-img {
  img {
    width: 45px;
    height: 17px;
  }
}
.justify {
  display: flex;
  span {
    text-align-last: justify;
    flex: 1;
  }
}
.file-recipe-detail {
  height: 100%;
  background: #f5f5f5;

  .tip {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #ebfbf9;
    padding: 10px 20px;
    color: #00c6ae;
    font-size: 12px;

    .tip-left,
    .tip-right {
      display: flex;
      align-items: center;
      span {
        line-height: normal;
      }
    }
  }

  .row {
    background: #fff;
    margin: 0 0 10px 0;
    padding: 0 15px;

    .row-header {
      .row-header-title {
        display: flex;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid $-color--line;
        &.weight {
          border-width: 0;
        }
        &::before {
          content: '';
          margin: 0 10px 0 0;
          height: 15px;
          width: 4px;
          border-radius: 2px;
          background-color: #00c6ae;
        }

        .row-header-title-span {
          font-size: 15px;
          color: #666;
          width: 100%;
          &.weight {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: #333;
            }
          }
        }
      }
    }

    .row-body {
      padding: 10px 0;
      font-size: 15px;
      font-weight: 400;
      color: #000000;
      line-height: 20px;
      &.dotted-line-after {
        .flex {
          margin: 0px 0px 5px;
        }
      }
      span {
        padding-left: 14px;
      }
      &:last-child {
        &::after {
          border-width: 0;
        }
      }
      .row-body-item-left {
        padding-left: 14px;
        flex: 1;
        > span {
          padding-left: 0;
          font-size: 15px;
          color: #000;
          font-weight: bold;
          word-break: break-all;
          &:first-child {
            margin-right: 20px;
          }
        }
      }
      .row-body-item-right {
        min-width: 50px;
        font-size: 15px;
        color: #000;
        margin-left: 10px;
        text-align: right;
      }
      .row-body-item-drugUse {
        font-size: 13px;
        color: #999;
      }
    }
  }

  .footer {
    padding: 0 20px 10px 20px;
    font-size: 12px;
    color: rgba(51, 51, 51, 0.4);
    white-space: pre-wrap;
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
</style>
