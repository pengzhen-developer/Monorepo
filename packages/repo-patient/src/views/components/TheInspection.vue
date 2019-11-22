<template>
  <div class="inspection"
       v-if="data.length>0">
    <div class="tip"
         v-if="data.length > 1">
      <div class="tip-left">
        <van-icon :name="require('@src/assets/images/ic_tixing.png')"
                  style="margin: 0 5px 0 0;">
        </van-icon>
        <span>
          共{{ data.length }}张， 当前为第{{ current + 1 }}张（{{
              current + 1
            }}
          / {{ data.length }}）</span>
      </div>
      <div class="tip-right"
           @click="next">
        <span>下一张</span>
        <van-icon :name="require('@src/assets/images/ic_arrow.png')"
                  style="margin: 0 0 0 5px;">
        </van-icon>
      </div>
    </div>
    <div class="item top">
      <div class="hospital">{{data[current].doctorInfo.hospitalName}}</div>
      <div class="ins">检查单</div>
      <div class="patient">
        <div class="patient-item">
          <div class="patient-item-key">姓名</div>
          <div class="patient-item-val">{{data[current].patientInfo.familyName}}</div>
        </div>
        <div class="patient-item">
          <div class="patient-item-key">性别</div>
          <div class="patient-item-val">{{data[current].patientInfo.familySex}}</div>
        </div>
        <div class="patient-item">
          <div class="patient-item-key">年龄</div>
          <div class="patient-item-val">{{data[current].patientInfo.familyAge}}岁</div>
        </div>
      </div>
    </div>
    <div class="item start">
      <div class="mark">诊断</div>
      <div class="right">{{data[current].diagnose}}</div>
    </div>
    <div class="item col">
      <div class="title">检查项目</div>
      <div class="cell pl10"
           v-for="(item,index) in data[current].checkList"
           :key="index">
        <div class="left color-666">{{item.name}}</div>
        <div class="right">X1</div>
      </div>
    </div>
    <div class="item start">
      <div class="mark">备注</div>
      <div class="text">
        {{data[current].remark}}
      </div>
    </div>
    <!-- <div class="item">
      <div class="left">已添加2种检查项:</div>
      <div class="right red">总金额: ￥2100.00</div>
    </div> -->
    <div class="item col">
      <div class="cell footer">
        <div class="left">订单编号:</div>
        <div class="right">{{data[current].checkOrderNo}}</div>
      </div>
      <div class="cell footer">
        <div class="left">创建时间:</div>
        <div class="right">{{data[current].createdTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  data() {
    return {
      data: [],
      current: 0
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const params = peace.util.decode(this.$route.params.json)
      if (params.checkOrderNo) {
        this.getDetail(params.checkOrderNo)
      } else if (params.inquiryNo) {
        this.getList(params.inquiryNo)
      }
    },

    getList(inquiryNo) {
      peace.service.group.getInspectList({ inquiryNo: inquiryNo }).then(res => {
        this.data = res.data.info || []
      })
    },
    getDetail(checkOrderNo) {
      peace.service.group.getInspectDetail({ checkOrderNo: checkOrderNo }).then(res => {
        this.data.push(res.data.info)
      })
    },
    next() {
      if (this.current + 1 >= this.data.length) {
        this.current = 0
      } else {
        this.current = this.current + 1
      }
    }
  }
}
</script>

<style lang="scss">
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
.inspection {
  min-height: 100%;
  background-color: #f9f9f9;
  .item {
    background-color: #fff;
    padding: 10px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .red {
      color: #f00;
      font-size: 16px;
    }
    &.start {
      align-items: flex-start;
      padding: 5px 10px;
      box-sizing: border-box;
      justify-content: space-between;
    }
    .mark {
      color: #666;
      line-height: 24px;
      min-width: 45px;
    }
    .text {
      width: 80%;
      min-height: 24px;
      line-height: 24px;
      color: #333;
      box-sizing: border-box;
    }

    &.top {
      justify-content: flex-start;
      flex-direction: column;
      // padding: 0 15px;
      // .hospital{

      // }
      .ins {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 10px;
      }
      .patient {
        width: 100%;
        display: flex;
        align-items: center;
        border-top: 1px solid #eee;
        .patient-item {
          padding-top: 5px;
          width: calc(100% / 3);
          display: flex;
          flex-direction: column;
          align-items: center;
          .patient-item-key {
            color: #999;
            font-size: 13px;
          }
          .patient-item-val {
            color: #333;
            font-size: 15px;
          }
        }
      }
    }
    &.col {
      flex-direction: column;
      padding: 0 15px;
      .title {
        width: 100%;
        font-size: 16px;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        &::before {
          display: inline-block;
          content: '';
          width: 4px;
          height: 15px;
          background: #00c6ae;
          margin-right: 8px;
          margin-bottom: -2px;
        }
      }

      .cell {
        padding: 15px 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e8e8e8;
        &.pl10 {
          padding-left: 10px;
        }
        &:last-child {
          border-bottom: 0;
        }
        &.footer {
          border: 0;
          padding: 8px 0;
          &:last-child {
            padding-top: 0;
          }
          .left,
          .right {
            max-width: 50%;
            font-size: 13px;
            color: #999;
          }
        }

        .left {
          width: 70%;
        }
      }
    }
  }
}
</style>