<template>
  <div class="user-drug-list">
    <div class="tab">
      <div @click="changeTab('0')"
           class="tab-item"
           :class="{ active: tabIndex == '0' }">
        <div class="span">全部</div>
      </div>
      <!-- <div @click="changeTab('2')"
           class="tab-item"
           :class="{ active: tabIndex == '2' }">
        <div class="span">进行中</div>
      </div> -->
      <div @click="changeTab('1')"
           class="tab-item"
           :class="{ active: tabIndex == '1' }">
        <div class="span">已完成</div>
      </div>
    </div>
    <template v-if="drugItems && drugItems.length">
      <div class="content"
           :class="{ nbg :drugItems.length,
                   h100 : !drugItems.length
                 }">
        <div v-if="drugItems.length">
          <div class="panel"
               v-for="item in drugItems">
            <div class="panel-head">
              <div class="card-strip">
                <div class="avatar">
                  <img :src="item.DrugStoreLogo"
                       class="avatar-cicular" />
                </div>
                <div class="strip-info">{{item.DrugStoreName}}</div>
                <div :class="{ [`color-a${item.OrderStatus}`] : true }"
                     class="strip-eye">
                  {{item.OrderStatusText}}
                </div>
              </div>
            </div>
            <div class="panel-body"
                 @click="goUserDrugDetailPage(item)"
                 style="padding-top: 0">
              <div class="card-imgs"
                   v-if="item.OrderDet && item.OrderDet.length">
                <div class="imgs-item"
                     v-for="det in item.OrderDet">
                  <div class="item-icon"
                       :class="{ 'item-icon-none': !item.DrugImage }">
                    <img :src="det.DrugImage" />
                  </div>
                </div>
              </div>
              <div class="small">
                <div class="small-time">{{item.CreateTime}}</div>
                <div class="small-price default">
                  共{{item.TotalNumber}}件药品 合计：
                  <span class="b">￥{{item.TotalAmount }}</span>
                </div>
              </div>
            </div>
            <!-- 0未付款 1已付款 2已接单 3 已发货 4已签收 5 已取消 6已自提 7，已打包（配药中） 8 已完成)-->
            <div class="panel-bottom"
                 v-if="item.OrderStatus != 5">
              <div class="time"></div>
              <div class="label blue"
                   v-if="item.OrderStatus == '0'"
                   @click="payOrder(item)">继续支付
              </div>
              <div class="label blue"
                   v-if=" item.OrderStatus == '1' || item.OrderStatus == '2' || item.OrderStatus == '0'"
                   @click="canselOrder(item)">取消订单
              </div>
              <div class="label"
                   v-if="item.OrderStatus == '3' || item.OrderStatus == '4' || item.OrderStatus == '7' || item.OrderStatus == '8'"
                   @click="goDrugLogiPage(item)">查看物流
              </div>
              <div class="label blue"
                   v-if="item.OrderStatus == '3' && item.ShippingMethod != '0'"
                   @click="submitOrder(item)">确认签收
              </div>
            </div>
          </div>
          <div class="bottom">客服电话：4009020365</div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="none-page">
        <div class="icon icon_none_drugOrder"></div>
        <div class="none-text">暂无订单</div>
      </div>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'
import config from '@src/config'
export default {
  data() {
    return {
      appid: '',
      tabIndex: '0',

      drugItems: undefined,
      consultList: undefined
    }
  },

  created() {
    this.getDrugItems()
  },
  mounted() {
    let that = this
    this.appid = config.APPID
    if (this.$route.query.code) {
      let code = this.$route.query.code
      let orderNo = this.$route.query.orderId
      let params = { code, orderNo }
      peace.service.index.GetWxLoginStatus(params).then(res => {
        let data = res.data
        that.onBridgeReady(data, orderNo)
      })
    }
  },
  methods: {
    changeTab(item) {
      this.tabIndex = item

      this.getDrugItems()
    },

    getDrugItems() {
      const params = {
        OrderType: this.tabIndex == '1' ? '4' : this.tabIndex
      }

      peace.service.purchasedrug.SelectOrderListApi(params).then(res => {
        this.drugItems = res.data
      })
    },

    goUserDrugDetailPage(item) {
      const json = peace.util.encode({ OrderId: item.OrderId })
      this.$router.push(`/order/userDrugDetail/${json}`)
    },
    onBridgeReady(data, orderId) {
      let that = this
      WeixinJSBridge.invoke('getBrandWCPayRequest', data, function(res) {
        //alert(res.err_msg);
        if (res.err_msg == 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          const json = peace.util.encode({ OrderId: orderId })
          that.$router.push(`/order/userDrugDetail/${json}`)
        }
        if (res.err_msg == 'get_brand_wcpay_request:fail') {
          const json = peace.util.encode({ OrderId: orderId })
          that.$router.push(`/order/userDrugDetail/${json}`)
        }
        if (res.err_msg == 'get_brand_wcpay_request:cancel') {
          console.log('cancel')
        }
      })
    },
    payOrder(item) {
      let orderNo = item.OrderId
      let params = { orderNo }
      let that = this
      peace.service.index.GetWxLoginStatus(params).then(res => {
        if (res.code === 200) {
          //没有经过授权
          let data = res.data
          if (data) {
            that.onBridgeReady(data, orderNo)
          } else {
            let appid = that.appid
            let redirect_uri = location.href + '?' + 'orderId=' + orderNo

            // redirect_uri = encodeURIComponent(redirect_uri);
            let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect`
            window.location.href = url
          }
        }
      })
    },
    canselOrder(item) {
      const params = { OrderId: item.OrderId }

      peace.service.purchasedrug.CancelOrder(params).then(res => {
        peace.util.alert(res.msg)

        this.getDrugItems()
      })
    },

    goDrugLogiPage(item) {
      const params = peace.util.encode({ OrderId: item.OrderId })

      this.$router.push(`/order/userDrugLogistics/${params}`)
    },

    submitOrder(item) {
      const params = { OrderId: item.OrderId }

      peace.util.confirm('收到药品之后再确认取药哦~~~', '温馨提醒', undefined, () => {
        peace.service.purchasedrug.ConfirmReceipt(params).then(res => {
          peace.util.alert(res.msg)

          this.getDrugOrderDetail()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-drug-list {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  color: #999;
  height: 100%;
}

.tab {
  margin: 0 0 10px 0;
  padding: 5px;
  height: 40px;
  .tab-item {
    height: 30px;
  }
}
.content {
  flex: 1;
  overflow: auto;
}
.none-page {
  flex: 1;
  height: 100%;
  background-color: #fff;
}

.icon.icon_none_drugOrder {
  margin: 0;
}

.box {
  margin: 0;
  padding: 10px 15px;
}
.box-tab {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;

  background: #fff;
  box-shadow: 0 0 5px rgba(204, 204, 204, 0.5);
  padding: 15px 10px;
  box-sizing: border-box;
  border-radius: 15px;
}
.box-tab .tab-item {
  flex: 1;
  text-align: center;
  position: relative;
  border-left: 1px solid #f5f5f5;
  height: 30px;
}
.box-tab .tab-item:first-child {
  border-left: none;
}
.box-tab .tab-item .span {
  /*display: inline-block;*/
  text-align: center;
  color: #333;
  font-size: 15px;
  padding-left: 12px;
}
.box-tab .tab-item .span.red::after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  background: #f2223b;
  border-radius: 50%;
  top: -4px;
  left: 0rpx;
}
.icon-referral::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background-size: cover;
  display: block;
  left: -20px;
  top: -2px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAeFBMVEVHcExnZ2dmZmZnZ2dmZmZmZmZmZmZnZ2dmZmZmZmZx2LtmZmZmZmZnZ2e18+JmZmZm6cg037Vqamoz37U04LY037Wz9OKy8+FB4blnZ2e29OK18+I04LYz37Y037W19ONmZmYz3rS08uGS7dZQ476l8Nxm5saB6s8k8yC4AAAAIHRSTlMAmeg5eKP99viBDc1rVuS0IdMatD7uO8iX/HmkVYJwYLpAgFoAAARcSURBVGjezZrtlrIgEIBNNzVc08zMj6z8vv87fFUUUDQQY887+6ezIU8zwwwDo6L8J6LZPyJia9wEcDJ0Q0x09QT4tFDNt7iYKo82mqm/90hksimeuo/xfuuqx4IczPdeMQ8sp0M9DPUoIoM3TYbz7X6Y+SO49E/wcZtjlG4JB5jVQ06fBx15BjF/5IEDYvwKQ36MboLj50HO1yGeRokD16D2QbwNEO1ovHVKYDh9lLfpaHwQ4OiReEzrjscB8ax9gW2upQ4SspPR6mIBFuT3CwnqhwVR4bg2RQnIG/5CA3yGaP0iMh1PKBQ850OCwhD4SQUSEhSGHCKOBMPMtUcGZGcW/O1ncv4OAoB0CLhmWSgZAi5ZK08pEK1zfNQ+f+0Y2UUKpMtKkekpYSYT4h2sNt0/IaNzCoiTGHwZ0os/MLKHAu55nt/FIeCZ+otfuLcR4iodI89fohC/mypdgl9Gxk1JekYeC0Ie42+lBDGyawwZopqkwzy0wa6IkYUDIwciEBBmBMQFy4ysGBhnEccDPJOvBK1vE0B/08qoSCIAcbHVMz84j56lGHVOuGQjxL9llNnvFL2VZoS4myGPyUQFYfU0m0pFumQTZDYThvhIjQv8VE5csgGCl1V4mUAe2BuXx8xar20Q7NjnsFZ7SNWUWLfrOCifuIQbghx7e4yBXVRFXZL2e47pESly35Tq0bK6tSH4KrMFufgoPSJF4i0QtKwurf5JvgC5pQDE9UyRwVp8kBQbXQFtdqUhoRskeZNNl9ZoLS4Icnm727ndLlHOtQji9t/NLG3lecANwXtEW4DATNJMMkgCd6dinlGQImzIZFkFw+OD8cu6GUMbgbGxkCJMyGRZxej5qqiqKieknicUQhEWBO3ZcFmtSVXSjNzlhaTTZbWCqLMFxou77gqRz937GqLJlhgJf3GHyqjwvIwosBZZSTDOYEMF+aT2ulGBqpilLnLEOdhU1T+W5mgWEkuzyuAIxseNskZBI+pqncGTVnyKUn9EUAyu3IWLhGGumbHqYuKtOxA6M2JKQUFmBLSHbD/O4b23ISA1kbqQGsGO029IUspZSsfeeCm7jtgpsZRXICuILSUREZZLkHMScNzcMYs7FJblHHJO4p7g7YdMK2Fc3AVg7H6w77s4amH3tlYLd2oYOvsqiqeqn9TuM4htrN4ybTyfkKeQGeSLt0QERR6ECEuZEBQwUiFjwFRSITBg6lwuRHHTEN0GSIN08voLyFB8o2pU0m3q5LJA2pWtm+TnmONeGDfOJF4+q2hqaRBwxL2C70AMixJz6HooX4N0PbTp3yDG6XuQ1YY87JlIhYw9NZkQ0xpqjC/5hH4PI9IttPN/B2LZlJAtW4nB+NeQaB+kz4K6w9NdE39HwdE5unvwbYtItLVv6zxvBgDYJY+sk4hYEUwgrH7r+AZMZAoIRJgOs11kRLu72OzGsRbtpEQ2TxfP2PV+lWlzLRHvEJmGLiKtV45MW/0DNvDTjYn1wpgAAAAASUVORK5CYII=);
}
.icon-consultGroup::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background-size: cover;
  display: block;
  left: -20px;
  top: -2px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAh1BMVEVHcExnZ2dnZ2e08+FmZmZnZ2dnZ2dmZmZmZmZoaGi49eg037VnZ2dn2Lkz37U14La29OK09+VB07A14bc037WF5s629OMz37Ww9OM037U037Y84Li18+JmZmY04LVO4r608+G18+JnZ2e08+K18+JpaWm29OO18+JmZmYz3rS08uFg5cSG69HhhlNBAAAAKHRSTlMAzK6xf5C59vxTGLPSD5E+byAaKs8GW/YtdlfdweZo/up/bJjeL0NRsuxZXAAAA8BJREFUaN7tmut2ojAURlMQiWECCsYbYhW1ldj3f77JhUtAAnQkXbO6/H5YRHBz2ElAUgBe+YdcZ5PRM7uqBDxJoGsgtyQlBWPG3hoKTPJqUngzF+jORB0mGRzDasHuzTAkIcCREBcmbyMnucmvhinIFxw8frfAljSRAPHXdcz0PkuWICtxiRlIKFXISt5MDSSJhAiWZQry5wV5Qb4DCQ4/ANn5LyffOl1ovzAEKYfQ7RKfkFxFxoVgL4t3eSVesWq93o0K8bIsWwePq6IRIYeMp2i7iG7YpUKsivFokGgtvlGep8AXkECsWntjQXCcKRAm/owKSJYdRoKIsy8gvDkd8oLyleuIjAERQvjL8kKrHsIh/pK9vNP58xAhxMfi6yi9sONGl0UOEZ/d6cezECFkSQoI/Qy2pXgf7HiVX0f0JCTvDlgcMsucibdRAVncBWVPnoIIIaxjl5UwSOUELOi7+OD0DEQKYQuLEqKKZxCadWkZAsmFsCWbQ04SIkbhEvLVpWUIpByf5vyAlysOCQ6KeAahoqvSdi0DIIUQsBFnxVtJJ/VKqL3Ua+mHlELQpQapO6F2R2/phShCqAIhuAnp6C29EEWICmGF2fXTBYAvtXwfogqh9FxCol1DPINgnZYeSCkEMyF0H6riL81KgE5LN6Qu5LjAHeLFlb9dSzekLuQTVBActkFIu5ZOSEMIUCBs+YweIBotXZCGEKJCouBRPNBp6YCIo1KEABXCxB8XLZBWLR2QppAGpM2JRose8iCkBgkjDaRNixbyKAQ0xJ9QK6RFixbCjyeOwjAUQjahSKRUUokPea12WGbb1KKD4EyXUnx1B9mWu6JFW0ms23urisdr3WZftNKihew0u8c47yfqTXjLZry1fPS2rsj3PC++3+/vnpItBoX4OZJ33mwt2ypWt/IOZM9VoiFjV9VDlORjl3AiU29d+S+LI2+UAyCIM2zUyFwRr0Cam/Fjoat+yCfVhYtHpHYwrbH7IRvtzpuo9kPxotvuNMDJWbMvH2TICveWfMFDLr+rs/2YMzvTBCtOWM1t29lz/NzDgpp4U08kwohsiGnIDz3AIR/YPOQHnPy3z7vEY/Sp4cfockLAEANDFZKagcgZIChP1w3OTDDSYpImn62BieWMHCvJZ7IccM0n5+DoKWbOXNZ1J6anAIUJyygFTqSfCTQ3LQvLdnud3lwD5bgutNSJ7DB1rOnIsZwUg1deeWVorlPXbBIrBGw8MT0MJ8D0/2FUdyu/AAL5xcRw+CUlnBnObxrv/wKX0vRYNNKmOgAAAABJRU5ErkJggg==);
}
.bottom {
  color: #999;
  text-align: center;
  font-size: 13px;
  box-sizing: border-box;
  padding-bottom: 15px;
}
.panel {
  padding: 0;
  box-shadow: none;
}
.content .panel:first-child {
  margin-top: 0;
}
.panel .panel-head,
.panel .panel-body,
.panel .panel-bottom {
  padding: 10px 15px;
}
.panel .panel-bottom {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.panel .panel-bottom .time {
  flex: 1 0 auto;
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-strip {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  font-size: 15px;
  align-items: center;
}
.card-strip .avatar {
  box-sizing: border-box;
  flex: 0 0 30px;
  height: 30px;
  margin-right: 10px;
  border: 0;
  background: #fff;
}
.card-strip .avatar img {
  padding: 1px;
  border-radius: 50%;
  width: 27px;
  height: 27px;
  margin-top: -1px;
  margin-left: -1px;
  border: 1px solid #f3f3f3;
}

.strip-info {
  flex: 1;
  color: #000;
}
.strip-eye {
  flex: 0 0 auto;
  color: #999;
  text-align: right;
}
/* color-x: 咨询单状态，
 * color-0x 转诊单状态 ↓
 *  01:转出待审核  02:转出已拒绝 03:转出已通过/转入待审核 04:转入已通过 05:转入已拒绝 06:转诊完成 07:转诊已关闭
 * color-ax 购药单状态
 * 1: 待接单 2:已接单 3:已发货 4:已完成
*/
/*red*/
.strip-eye.color-1,
.strip-eye.color-2,
.strip-eye.color-02,
.strip-eye.color-05,
.strip-eye.color-a1,
.strip-eye.color-a2 {
  color: #fb2828;
}
/*blue*/
.strip-eye.color-3,
.strip-eye.color-01,
.strip-eye.color-03,
.strip-eye.color-04,
.strip-eye.color-a3 {
  color: #00c6ae;
}
/**/
.code {
  display: block;
  font-size: 13px;
  padding: 11px 9px;
  background-color: #fafafa;
  border: 1px solid #f3f3f3;
  color: #000;
}

/**/
.small {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  padding-top: 10px;
  color: #999;
  font-size: 12px;
  align-items: flex-end;
}
.small .small-time {
  flex: 0 0 auto;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.small .small-type {
  flex: 0 0 auto;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.small .small-price {
  flex: 1;
  width: 155px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 1);

  .b {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
}
.label {
  font-size: 13px;
  padding: 5px 12px;
  margin-left: 10px;
  border-radius: 20px;
}
.label.label-private {
  font-size: 8px;
  padding: 1px 4rpx;
  border-radius: 2px;
  color: #f7e9b3;
  background: #504c4f;
  border-color: #504c4f;
  vertical-align: text-top;
  margin-top: 2px;
}
</style>
