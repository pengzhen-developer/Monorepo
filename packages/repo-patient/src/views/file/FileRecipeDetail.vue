<template>
  <div class="file-recipe-detail">
    <template v-if="data.total < 1">
      <div class="none-page" style="background: #fff;">
        <div class="icon icon_none_source t10"></div>
        <div class="none-text">暂无处方报告</div>
      </div>
    </template>

    <template v-else>
      <div class="tip" v-if="data.total > 1">
        <div class="tip-left">
          <van-icon
            :name="require('@src/assets/images/ic_tixing.png')"
            style="margin: 0 5px 0 0;"
          ></van-icon>
          <span>
            共{{ data.total }}张， 当前为第{{ current + 1 }}张（{{
              current + 1
            }}
            / {{ data.total }}）</span
          >
        </div>
        <div class="tip-right" @click="next">
          <span>下一张</span>
          <van-icon
            :name="require('@src/assets/images/ic_arrow.png')"
            style="margin: 0 0 0 5px;"
          ></van-icon>
        </div>
      </div>

      <div class="row">
        <div class="row-header">
          <div class="row-header-title">
            <span style=" font-size: 15px; color: #333333;">处方编号</span>
          </div>
        </div>
        <div class="row-body">
          <span>{{ data.list[current].prescriptionNo }}</span>
        </div>
      </div>

      <div class="row">
        <div class="row-header">
          <div class="row-header-title">
            <span style=" font-size: 15px; color: #333333;">临床诊断</span>
          </div>
        </div>
        <div class="row-body">
          <span>{{ data.list[current].diagnosisInfos }}</span>
        </div>
      </div>

      <div class="row">
        <div class="row-header">
          <div class="row-header-title">
            <span style=" font-size: 15px; color: #333333;">RP</span>
          </div>
        </div>
        <div
          class="row-body"
          v-for="item in data.list[current].drugCode"
          :key="item.drugCode"
          style="border-bottom: 1px dashed #BFBFBF;"
        >
          <div class="flex between" style="margin: 0 0 5px 0;">
            <div style="flex:1;">
              <span
                style="font-size: 15px; color: #000; font-weight: bold; margin: 0 10px 0 0;"
              >
                {{ item.drugName }}
              </span>
              <span style="font-size: 15px; color: #000; font-weight: bold;">
                {{ item.drugSpecifications }}
              </span>
            </div>
            <div>
              <span style="font-size: 15px; color: #000;margin-left:10px;"
                >x {{ item.drugQty }}</span
              >
            </div>
          </div>
          <div>
            <span style="font-size: 13px; color: #999;">{{
              item.drugUse
            }}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="row-header">
          <div class="row-header-title">
            <span style=" font-size: 15px; color: #333333;">处方审核</span>
          </div>
        </div>
        <div class="row-body">
          <span>{{ data.list[current].prescriptionExamMemo }}</span>
        </div>
      </div>

      <div class="row" style="padding: 10px 20px;">
        <div class="flex between" style="margin: 0 0 10px 0;">
          <div class="flex" style="flex: 1;">
            <span class="justify row-dd"><span>医师</span> ：</span>
            <!-- <span>{{ data.list[current].psychiatric }}</span> -->
            <span class="row-img"
              ><img
                :src="data.list[current].doctorSignImage"
                v-if="data.list[current].doctorSignImage"
            /></span>
          </div>
          <div class="flex" style="flex: 1;">
            <span class="row-dd">审核药师：</span>
            <!-- <span>{{ data.list[current].prescriptionPharmacistName }}</span> -->
            <span class="row-img"
              ><img
                :src="data.list[current].prescriptionSign"
                v-if="data.list[current].prescriptionSign"
            /></span>
          </div>
        </div>
        <div class="flex between">
          <div class="flex" style="flex: 1;">
            <span class="row-dd">调配药师：</span>
            <span>{{ data.list[current].disPharmacist }}</span>
          </div>
          <div class="flex" style="flex: 1;">
            <span class="row-dd">发药药师：</span>
            <span>{{ data.list[current].sendPharmacist }}</span>
          </div>
        </div>
      </div>

      <div class="footer">
        <span
          >注意：仅限通过平台认证的药店配送，自行下载处方购药不具有效力，为确保用药安全，3日内处方有效。</span
        >
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
        };
      }
    }
  },

  data() {
    return {
      current: 0
    };
  },

  methods: {
    next() {
      if (this.current + 1 >= this.data.total) {
        this.current = 0;
      } else {
        this.current = this.current + 1;
      }
    }
  }
};
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
  width: 65px;
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
        padding: 10px 0;
        border-bottom: 1px solid #dedede;

        &::before {
          content: "";
          margin: 0 10px 0 0;
          height: 20px;
          width: 4px;
          background-color: #00c6ae;
        }
      }
    }

    .row-body {
      padding: 10px 0;
      font-size: 15px;
      font-weight: 400;
      color: #000000;
      line-height: 20px;
    }
  }

  .footer {
    padding: 0 20px 10px 20px;
    font-size: 11px;
    color: #999999;
    text-align: left;
  }
}
</style>
