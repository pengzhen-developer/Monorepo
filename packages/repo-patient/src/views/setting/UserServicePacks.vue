<template>
  <div class="service">
    <div class="packs"
         v-for="(item,index) in list"
         v-bind:key="index">
      <div class="packs-header">
        <div class="packs-title">{{item.equitiesName}}</div>
        <div class="packs-num">{{item.residueNum}}/{{item.totalNum}}</div>
      </div>
      <div class="packs-content">
        <div class="packs-content-top"
             v-on:click="gotoServicePackageDetail(item)">
          <van-image round
                     v-bind:src="item.photoDoc"
                     class="packs-content-top-logo"></van-image>
          <div class="packs-content-top-right">
            <div class="name">{{item.doctorName}}<span>{{item.doctorTitle}}</span></div>
            <div class="content">{{item.servicePackageName}}</div>
          </div>
        </div>
        <div class="packs-content-bottom">
          <div class="time">{{item.serviceStartDate}} 至 {{item.serviceExpireDate}}</div>
          <van-button round
                      type="primary"
                      size="small"
                      v-on:click="gotoApply(item)">立即使用</van-button>
        </div>
      </div>
    </div>
    <div class="none-page"
         v-if="list.length ==0 && loaded">
      <div class="icon icon_none_consult"></div>
      <div class="none-text">暂无服务权益</div>
    </div>

  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'
export default {
  name: 'UserServicePacks',
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      list: [],
      loaded: false
    }
  },
  activated() {
    this.list = []
    this.get()
  },
  methods: {
    get() {
      peace.service.servicePackage.equities().then((res) => {
        this.list = res.data
        this.loaded = true
      })
    },
    gotoServicePackageDetail(item) {
      const json = peace.util.encode({ orderNo: item.orderNo })
      this.$router.push(`/setting/order/userServicePackageDetail/${json}`)
    },
    gotoApply(item) {
      if (item.residueNum == 0) {
        return
      }
      //1.7.0仅支持 在线咨询
      peace.service.servicePackage.doctorServiceManage({ doctorId: item.doctorId }).then((res) => {
        let isOpenImageService = false
        if (res.data && res.data.service && res.data.service.length > 0) {
          isOpenImageService = res.data.service.find((item) => item.toolType == 'image') ? true : false
        }
        if (isOpenImageService) {
          const json = peace.util.encode({
            doctorId: item.doctorId,
            consultingType: 'image',
            serviceType: 'inquiry',
            patientEquitiesId: item.patientEquitiesId,
            patientEquitiesName: item.equitiesName,
            servicePackageId: item.servicePackageId,
            servicePackageName: item.servicePackageName
          })
          this.$router.push(`/components/doctorInquiryApply/${json}`)
        } else {
          Dialog.confirm({
            title: '温馨提示',
            message: `医生已关闭图文咨询服务，${item.servicePackageName}权益暂不可用`,
            confirmButtonText: '知道了',
            showCancelButton: false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.service {
  min-height: 100%;
  background: #fff;
  padding: 16px 16px 0;
  .packs {
    padding-bottom: 6px;
    &:last-child {
      padding-bottom: 0;
    }
    .packs-header {
      background-image: url('~@/assets/images/ic_packs_bg.png');
      background-size: 100% 100%;
      margin-left: 8px;
      width: 327px;
      height: 46px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .packs-title {
        line-height: 46px;
        color: #fff;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        margin-left: 8px;
      }
      .packs-num {
        background: linear-gradient(-135deg, #ffc157, #ff8a4c);
        border-radius: 4px 4px 0 0;
        padding: 0 8px;
        min-width: 46px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #fff;
        margin-right: 4px;
      }
    }
    .packs-content {
      background-image: url('~@/assets/images/ic_packs_bg_2.png');
      background-size: 100% 100%;
      height: 171px;
      width: 363px;
      display: flex;
      flex-direction: column;

      margin-top: -20px;
      margin-left: -10px;

      padding: 45px 30px 0 22px;
      .packs-content-top {
        display: flex;
        align-items: center;
        padding-bottom: 13px;
        border-bottom: 1px solid rgba(51, 51, 51, 0.05);
        .packs-content-top-logo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(51, 51, 51, 0.05);
          margin-right: 12px;
          margin-left: 4px;
        }
        .packs-content-top-right {
          .name {
            line-height: 24px;
            height: 24px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #333333;

            span {
              margin-left: 8px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(51, 51, 51, 0.6);
            }
          }
          .content {
            margin-top: 4px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #333333;
            line-height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 17em;
          }
        }
      }

      .packs-content-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10px;
        flex: 1;
        .time {
          color: rgba(51, 51, 51, 0.6);
          line-height: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
        }
      }
    }
  }
}
</style>