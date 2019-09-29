<template>
  <div class="doctor-inquiry-pay">
    <div class="header">请在 <van-count-down
            millisecond
            :time="time"
            format="mm:ss"
    />后内完成支付，超时订单自动取消</div>
    <div class="content">
      <van-cell title="问诊方式"
                :value="params.typeName" />
      <van-cell title="医生姓名"
                :value="params.doctorName" />
      <van-cell title="应付金额"
                :value="params.money+'元'"   />
    </div>

    <slot name="custom"></slot>

    <div class="footer">
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span>实际支付：</span>
          <span class="dc">{{params.money}}元</span>
        </template>
        <van-button @click="pay"
                    type="primary">立即支付</van-button>
      </van-cell>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import { CountDown } from 'vant';
export default {
  components: {
    CountDown
  },
  data() {
    return {
      data: {},
      params: {},
      time: 15 * 60 * 1000
    }
  },
  created() {

  },
  mounted() {
    let that = this;
    this.params = peace.util.decode(this.$route.params.json)
    let orderNo = this.params.orderNo;
    peace.service.index.GetOrderTime({orderNo}).then((res) => {
       let data = res.data;
       if(data.expireTime > data.currentTime) {
         that.time = (data.expireTime - data.currentTime) * 1000;
       }
    });
    if(this.$route.query.code) {
       let code = this.$route.query.code;
       let {orderNo} = peace.util.decode(this.$route.params.json);
       let params = {code, orderNo};
        peace.service.index.GetWxLoginStatus(params).then((res) => {
            let data = res.data;
            that.onBridgeReady(data);
        })
    }
    // if (typeof WeixinJSBridge == "undefined"){
    //   if( document.addEventListener ){
    //     document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false);
    //   }else if (document.attachEvent){
    //     document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady);
    //     document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady);
    //   }
    // }else{
    //   that.onBridgeReady();
    // }
  },
  // watch: {
  //   $route(to) {
  //      console.log('route', to);
  //   }
  // },
  methods: {
  onBridgeReady(data){
      let that = this;
      WeixinJSBridge.invoke(
          'getBrandWCPayRequest', data,
          function(res){
            //alert(res.err_msg);
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
             that.payCallback();
            }
            if(res.err_msg == "get_brand_wcpay_request:fail" ){
            }
            if(res.err_msg == "get_brand_wcpay_request:cancel" ){
            }
          });
    },
    pay() {
      let that = this;
      let {orderNo} = peace.util.decode(this.$route.params.json);
      let params = {orderNo};
      peace.service.index.GetWxLoginStatus(params).then((res) => {
          if(res.code === 200) {
            //没有经过授权
            let data= res.data;
            if(data) {
              that.onBridgeReady(data);
            } else {
              let appid = 'wx78d7ae35932558e6';
              let redirect_uri = location.href;
              // redirect_uri = encodeURIComponent(redirect_uri);
              let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect`;
              window.location.href = url;
            }
          }
      })
    },
    payCallback() {
      let {doctorId,typeName,orderNo} = peace.util.decode(this.$route.params.json);
      if(typeName.includes("挂号")) {
        let orderType = 'register';
        let json = peace.util.encode({orderNo,orderType});
        this.$router.push(`/setting/order/userOrderDetail/${json}`);
      } else {
        let json = peace.util.encode({doctorId});
        this.$router.push(`/components/doctorInquiryPayResult/${json}`);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-count-down {
    color: inherit;
  }
.doctor-inquiry-pay {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(249, 249, 249, 1);

  .header {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 36px;
    font-size: 12px;
    background: rgba(254, 252, 235, 1);
    color: #f96a0e;
  }

  .content {
    flex: 1;
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;

    .van-cell {
      padding: 0 0 0 10px;
      font-size: 12px;

      .van-cell__title {
        display: flex;
        align-items: center;
      }

      .van-button {
        width: 140px;
      }

      .dc {
        font-size: 18px;
        font-weight: 600;
        color: rgba(242, 34, 59, 1);
      }
    }
  }
}
</style>
