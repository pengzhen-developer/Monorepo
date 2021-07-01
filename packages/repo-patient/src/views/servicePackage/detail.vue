<template>
  <div class="service-detail"
       v-if="info">
    <div class="header">
      <van-image v-bind:src="info.photoDoc"></van-image>
      <div class="header-content">
        <div class="header-title">{{info.doctorName}}<span>{{info.doctorTitle}}</span></div>
        <div class="header-subtitle">{{info.hospitalName}}<span>|</span>{{info.netdeptChild}}</div>
      </div>
    </div>
    <div class="content">

      <div class="service-name">{{info.servicePackageName}}</div>

      <div class="service-item">
        <div class="title">服务包介绍</div>
        <div class="brief"
             :class="{ fold: fold, unfold: !fold }"
             v-html="info.brief"
             style="pointer-events: none;"></div>

        <div class="more"
             @click="showMore"
             v-if="fold">
          <span>查看更多</span>
          <van-image round
                     width="13px"
                     height="13px"
                     :src="require('@src/assets/images/ic_more.png')"></van-image>
        </div>
        <div class="more"
             @click="showMore"
             v-if="!fold">
          <span>收起</span>
          <van-image round
                     width="13px"
                     height="13px"
                     style="transform: rotate(180deg)"
                     :src="require('@src/assets/images/ic_more.png')"></van-image>
        </div>
      </div>

      <div class="service-item">
        <div class="title">权益内容</div>
        <div class="equity">
          <div class="equity-item"
               v-for="(equity,index) in info.servicePackageEquities"
               v-bind:key="index">
            <div class="name">{{equity.equitiesName}}</div>
            <div class="num">{{equity.num}}次</div>
          </div>
        </div>
        <div class="effectiveDays">服务有效期：<span>{{info.effectiveDays}}</span>天<span class="gray">（订单支付成功开始计算）</span></div>
      </div>

      <div class="service-item">
        <div class="title">服务流程</div>
        <div class="process">
          <div class="process-item"
               :class="{'next':item.txt==='icon'}"
               v-for="(item,index) in process"
               v-bind:key="index">
            <van-image v-bind:src="item.icon"></van-image>
            <span>{{item.txt}}</span>
          </div>
        </div>
        <div class="gray">服务结束即为权益用完或服务到期</div>
      </div>

      <div class="service-item">
        <div class="title">注意事项</div>
        <div class="matters">
          <div class="matter-item"
               v-for="(item,index) in matters"
               v-bind:key="index">
            <div class="matter-item-title">{{item.title}}</div>
            <div class="matter-item-message">{{item.message}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tip">*本产品最终解释权归全息云通健康科技(武汉)有限公司所有</div>
    <div class="footer">
      <div class="footer-left">
        <peace-price v-bind:price="info.price"
                     v-bind:size="18"
                     class="price"></peace-price>
        <template v-if="info.referencePrice>0">
          <peace-price v-bind:price="info.referencePrice"
                       v-bind:lineThrough="true"
                       v-bind:size="14"
                       v-bind:decSize="14"
                       v-bind:prefixSize="14"
                       prefix="/￥"
                       class="referncePrice"></peace-price>
        </template>
      </div>
      <peace-button class="footer-right"
                    round
                    type="primary"
                    v-on:click="gotoUserServicePackageDeatilBeforePage">立即购买</peace-button>
    </div>

  </div>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'service-package-detail',

  data() {
    return {
      info: null,
      fold: true,
      process: [
        { txt: '购买服务包', icon: require('@src/assets/images/service-process/ic_service_detail_bug.png') },
        { txt: 'icon', icon: require('@src/assets/images/service-process/ic_service_detail_next.png') },
        { txt: '使用权益', icon: require('@src/assets/images/service-process/ic_service_detail_use.png') },
        { txt: 'icon', icon: require('@src/assets/images/service-process/ic_service_detail_next.png') },
        { txt: '服务结束', icon: require('@src/assets/images/service-process/ic_service_detail_end.png') }
      ],
      matters: [
        {
          title: '1. 费用说明',
          message: '定制服务包费用不包含线下就医产生的费用。若服务介绍中无特殊说明，线下就医的挂号费、就诊费、检查费、药品费、手术费、住院费等需您自行承担。'
        },
        {
          title: '2. 服务问诊回复时效说明',
          message: '服务医生日常工作较繁忙，我们会尽快提醒医生24小时内给予您回复，请耐心等待。如遇紧急情况可联系客服协助处理。'
        }
      ]
    }
  },
  activated() {
    this.get()
  },
  methods: {
    showMore() {
      this.fold = !this.fold
    },
    get() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.servicePackage.getServicePackageDetail(params).then((res) => {
        this.info = res.data
      })
    },
    gotoUserServicePackageDeatilBeforePage() {
      const params = peace.util.encode({ servicePackageId: this.info.servicePackageId })
      this.$router.push(`/servicePackage/userServicePackageDetailBefore/${params}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.gray {
  color: rgba(51, 51, 51, 0.6);
  font-size: 14px;
  line-height: 20px;
}
.header {
  background-image: url('~@/assets/images/ic_service_detail_header_bg.png');
  background-size: 100% 100%;
  width: 100%;
  height: 112px;
  padding: 24px 0 0 16px;
  display: flex;
  color: #fff;
  .van-image {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 8px;
  }
  .header-title {
    line-height: 24px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    span {
      font-weight: normal;
      font-size: 16px;
      margin-left: 4px;
    }
  }
  .header-subtitle {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 24px;
    span {
      margin: 0 4px;
    }
  }
}
.content {
  padding: 16px;
  border-radius: 16px 16px 0px 0px;
  background: #ffffff;
  margin-top: -16px;
  .service-name {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 1;
    padding-bottom: 16px;
    border-bottom: 1px dashed #d7d7d7;
  }
  .service-item {
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 24px;
      position: relative;
      padding-left: 12px;
      margin-top: 24px;
      margin-bottom: 8px;
      height: 24px;
      &::before {
        content: '';
        background: $primary;
        width: 4px;
        height: 16px;
        border-radius: 4px;
        position: absolute;
        left: 0;
        top: 5px;
      }
    }
    .more {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 16px;
      color: rgba(51, 51, 51, 0.6);
      span {
        margin-right: 4px;
      }
    }
    .brief {
      margin-top: 8px;
      // line-height: 24px;
      // font-size: 16px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-all;
      &.fold {
        max-height: 72px;
        -webkit-line-clamp: 3;
      }
      &.unfold {
        -webkit-line-clamp: 9999;
      }
    }

    .equity {
      padding: 16px;
      background: rgba(0, 198, 174, 0.05);
      border-radius: 8px;
      .equity-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        line-height: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        &:not(:last-child) {
          margin-bottom: 8px;
        }
        .name {
          padding-left: 12px;
          position: relative;
          &::before {
            content: '';
            width: 6px;
            height: 6px;
            border: 1px solid $primary;
            border-radius: 4px;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .effectiveDays {
      margin-top: 10px;
      font-size: 16px;
      line-height: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      span {
        &:first-child {
          color: $primary;
        }
      }
    }

    .process {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 4px;
      .process-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &.next {
          .van-image {
            width: 22px;
            height: 16px;
          }
          span {
            color: transparent;
          }
        }
        .van-image {
          width: 56px;
          height: 56px;
        }
        span {
          margin-top: 10px;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }

    .matters {
      .matter-item {
        margin-bottom: 8px;
        .matter-item-title {
          margin-bottom: 4px;
          color: #333;
          line-height: 24px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
        }
        .matter-item-message {
          color: rgba(51, 51, 51, 0.6);
          line-height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
        }
      }
    }
  }
}
.tip {
  padding: 16px;
  background: rgba(51, 51, 51, 0.05);
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: rgba(51, 51, 51, 0.6);
  line-height: 20px;
}
.service-detail {
  padding-bottom: 80px;
}
.footer {
  position: fixed;
  z-index: 999;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0px -1px 1px 0px rgba(51, 51, 51, 0.16);
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 8px 16px 16px;
  .footer-left {
    display: flex;
    align-items: flex-end;
    span {
      margin-left: 6px;
      font-size: 14px;
    }
    .price {
      color: rgb(223, 89, 102);
      font-weight: bold;
    }
    .referncePrice {
      color: rgba(51, 51, 51, 0.6);
      margin-left: 9px;
    }
  }
  .footer-right {
    height: 48px;
    width: 146px;
  }
}
</style>