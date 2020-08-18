<template>
  <div>
    <iframe id="geoPage"
            width=0
            height=0
            frameborder=0
            style="display:none;"
            scrolling="no"
            :src="'https://apis.map.qq.com/tools/geolocation?key=' + key + '&referer=myapp'">
    </iframe>
    <div class="top">
      <div class="button"
           @click.prevent="goMapPage">{{locationStr}}</div>
    </div>
    <div class=""
         v-if="phaList.length">
      <div class="card cards"
           v-for="(item,index) in phaList"
           :key="item.DrugStoreName"
           @click="goDrugOrderBeforePage(index)">
        <div class="card-avatar">
          <img class=""
               :src="item.DrugStoreLogo"
               style="height: 100%;" />
        </div>
        <div class="card-body">
          <div class="card-name">{{item.DrugStoreName}}
            <div class="card-more"
                 v-if="item.distance">{{item.distance}}</div>
          </div>
          <div class="block">
            <div class="card-small"
                 v-if="item.ShippingMethod!='1'">到店取药</div>
            <div class="card-small"
                 v-if="item.ShippingMethod!='0'">配送到家</div>
          </div>
          <div class="card-imgs"
               v-if="item.drugmain && item.drugmain.length">
            <div class="imgs-item"
                 v-for="item in item.drugmain"
                 :key="item.DrugStoreMainImage">
              <div :class="item.DrugStoreMainImage ? 'item-icon ' : 'item-icon  item-icon-none'">
                <img :src="item.DrugStoreMainImage" />
              </div>
              <div class="item-text">￥{{item.Price}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="none-page"
         v-if="!phaList.length && isGet">
      <div class="icon-none-pha"></div>
      <div class="none-text">
        <div class="h4">很抱歉</div>
        <div>
          没有找到符合的药房哦
        </div>
        <div>
          看看附近其他药房咨询一下吧
        </div>
      </div>
    </div>
    <div class="text-addr"
         v-if="phaAddrList.length">
      <div class="text-head">
        <div class="head-tit">附近的药店</div>
      </div>
      <div class="panel-addr"
           v-for="item in phaAddrList"
           :key="item.title">
        <div class="panel-head">
          <div class="head-tit">{{item.title}}</div>
          <div class="head-more"
               v-if="item.distance">{{item.distance}}</div>
        </div>
        <div class="panel-body">
          <div class="dl-addr">
            <div class="dt">门店地址：</div>
            <div class="dd">{{item.address}}</div>
          </div>
          <div class="dl-addr">
            <div class="dt">联系电话：</div>
            <div class="dd blue"
                 bindtap="call">{{item.tel}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import config from '@src/config'
export default {
  name: 'DrugListPharmacy',
  data() {
    return {
      key: config.MAP.key,
      phaList: [],
      phaAddrList: [],
      userLocation: '',
      isGet: false,
      messageOn: false,
      locationStr: '我的位置'
    }
  },
  beforeDestroy() {
    window.removeEventListener('message', () => {})
    peace.cache.remove('location')
  },
  created() {
    peace.cache.set('location', null)
  },
  activated() {
    let location = peace.cache.get('location')
    if (location != null) {
      location = peace.util.decode(location)
      //从地图页面返回
      let { Latitude, Longitude, addr, JZTClaimNo } = location
      this.userLocation = { lat: Latitude, lng: Longitude }
      this.locationStr = addr
      this.messageOn = true
      this.getPhaList(JZTClaimNo)
    }
  },
  mounted() {
    /* eslint-disable */

    // this.key = config.MAP.key;
    let paramsRoute = peace.util.decode(this.$route.params.json)

    if (paramsRoute.addr) {
      //从地图页面返回
      let { Latitude, Longitude, addr, JZTClaimNo } = paramsRoute
      this.userLocation = { lat: Latitude, lng: Longitude }
      this.locationStr = addr
      this.messageOn = true
      this.getPhaList(JZTClaimNo)
    } else {
      let { claimNo } = paramsRoute
      window.addEventListener(
        'message',
        (event) => {
          // 接收位置信息
          if (!this.messageOn) {
            if (event.data && event.data != 'isAxure') {
              var loc = event.data
              // console.log(loc)
              let lat = loc.lat
              let lng = loc.lng
              this.userLocation = { lat, lng }
              this.messageOn = true
              this.getPhaList(claimNo)
            }
          }
        },
        false
      )
    }
  },
  updated() {},
  methods: {
    goMapPage() {
      let paramsRoute = peace.util.decode(this.$route.params.json)
      // console.log(paramsRoute);
      let JZTClaimNo = paramsRoute.claimNo || paramsRoute.JZTClaimNo
      let familyId = paramsRoute.familyId
      let json = {
        JZTClaimNo,
        familyId
      }
      json = peace.util.encode(json)
      this.$router.push(`/drug/selectMap/${json}`)
    },
    showErr() {},
    getPhaList(claimNo) {
      let JZTClaimNo = claimNo
      let params = {
        Latitude: this.userLocation.lat,
        Longitude: this.userLocation.lng,
        JZTClaimNo
      }
      peace.service.patient.getStoresList(params).then((res) => {
        if (res.data == null) {
          this.phaList = []
          this.phaAddrList = []
          this.isGet = true
        } else {
          if (res.data.Type == '1') {
            this.phaList = res.data.JoinJnt
            this.phaAddrList = []
            this.isGet = true

            // 仅存在一个药房符合条件时，直接跳转订单确认页面
            // if (this.phaList.length === 1) {
            //   this.goDrugOrderBeforePage(0)
            // }
          }
          if (res.data.Type == '2') {
            this.phaList = []
            this.phaAddrList = res.data.OutJnt
            this.isGet = true
          }
        }

        this.messageOn = true
        this.mapDistance()
      })
    },
    mapDistance: function() {
      let userLoc = this.userLocation
      //console.log('location', this.userLocation);
      this.phaAddrList.map((item) => {
        let loc = item.location
        item.distance = this.getDistance(loc.lat, loc.lng, userLoc.lat, userLoc.lng)
      })
      this.phaList.map((item) => {
        item.distance = this.getDistance(item.Latitude, item.Longitude, userLoc.lat, userLoc.lng)
      })
    },
    bds: function(d) {
      return (d * Math.PI) / 180.0 //经纬度转换成三角函数中度分表形式。
    },
    getDistance: function(lat1, lng1, lat2, lng2) {
      var me = this,
        radLat1,
        radLat2,
        a,
        b,
        s

      if (!lat1 || !lng1 || !lat2 || !lng2) {
        s = '未知距离'
        return ''
      } else {
        ;(radLat1 = me.bds(lat1)), (radLat2 = me.bds(lat2)), (a = radLat1 - radLat2), (b = me.bds(lng1) - me.bds(lng2))
        s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
        s = s * 6378.137 // EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000 //输出为公里
        //s=s.toFixed(4);
      }
      return Number(s).toFixed(2) + 'km'
    },
    goDrugOrderBeforePage: function(index) {
      let item = this.phaList[index]
      const params = peace.util.decode(this.$route.params.json)
      let JZTClaimNo = params.claimNo || params.JZTClaimNo
      let familyId = params.familyId
      let json = {
        JZTClaimNo,
        DrugStoreId: item.DrugStoreId,
        AccessCode: item.AccessCode,
        CustomerType: item.CustomerType,
        ShippingMethod: item.ShippingMethod, // 0 门店自提  1 门店配送  2 全部
        Detailed: item.Detailed, // 地址
        ProvincialCity: item.Province + ',' + item.City + ',' + item.County,
        familyId,
        IsMergeStore: item.IsMergeStore,
        MergeStoreInfo: item.MergeStoreInfo
      }
      json = peace.util.encode(json)
      this.$router.replace(`/drug/drugOrderBefore/${json}`)
    }
  }
}
</script>

<style scoped>
#container {
  min-width: 100%;
  min-height: 767px;
}
.top {
  background: #fff;
  overflow: hidden;
}
.top .button {
  margin: 10px 15px;
  background: #f5f5f5;
  color: #333;
  font-size: 15px;
  position: relative;
  padding-left: 38px;
  padding-right: 31px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 2.8;
}
.top .button::before {
  content: '';
  position: absolute;
  width: 15px;
  height: 18px;
  left: 12px;
  top: 12px;
  background-size: cover;
  background-image: url('../../assets/images/icons/addr-tit.jpg');
}
.top .button::after {
  content: '';
  position: absolute;
  display: block;
  top: 17px;
  right: 10px;
  width: 7px;
  height: 12px;
  background-size: cover;
  background-image: url('../../assets/images/arrow-1.jpg');
}

.none-page {
  margin: 15px 0;
}
.none-page .icon {
  margin-top: 10px;
}
.icon-none-pha {
  width: 70px;
  height: 70px;
  background-image: url('../../assets/images/icon-none-pha.jpg');
  background-size: 100% 100%;
}
.none-page .none-text {
  font-size: 13px;
}
.none-page .none-text .h4 {
  font-size: 15px;
  margin-bottom: 5px;
  color: #000;
}
.panel-addr {
  background: #fff;
}
.text-addr .text-head {
  background: #fff;
  border-bottom: 1px solid #dedede;
}
.text-head .head-tit {
  font-size: 15px;
  color: #333;
  text-align: center;
  width: 160px;
  position: relative;
  display: block;
  margin: 0 auto;
  padding: 15px;
}
.text-head .head-tit::before {
  content: '';
  top: 27px;
  width: 36px;
  height: 1px;
  background: #979797;
  position: absolute;
  left: -10px;
  display: block;
}
.text-head .head-tit::after {
  content: '';
  display: block;
  width: 36px;
  height: 1px;
  background: #979797;
  position: absolute;
  right: -10px;
  top: 27px;
}
.panel-addr {
  border-bottom: 1px solid #dedede;
}
.panel-addr .panel-head {
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  padding-bottom: 0;
}
.panel-addr .panel-head .head-tit {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
  color: #000;
}
.panel-addr .panel-head .head-more {
  flex: 0 0 auto;
  font-size: 12px;
  width: 150px;
  margin-left: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
  text-align: right;
}
.panel-addr .panel-body {
  color: #333;
  padding: 13px 15px;
}

/*card*/
.cards {
  background: #fff;
  margin: 0;
  padding: 5px 10px;
}
.card .card-avatar {
  border-radius: 8rpx;
  border: 2rpx solid #e5e5e5;
  overflow: hidden;
}
.card .card-name .card-more {
  float: right;
  margin-top: 7px;
  color: #666666;
  font-size: 12px;
  font-weight: normal;
}
.card .card-small {
  display: inline-block;
  margin-right: 10px;
  position: relative;
  padding-left: 17px;
  font-size: 13px;
  color: #666;
}
.card .card-small::before {
  content: '';
  position: absolute;
  display: block;
  background-size: cover;
  width: 12px;
  height: 12px;
  left: 0;
  bottom: 2px;
  background-image: url('../../assets/images/card-small.jpg');
}
.card-imgs {
  display: flex;
}
.card-imgs .imgs-item {
  flex: 0 1 auto;
  text-align: center;
  margin: 15rpx 0 5rpx 20rpx;
}
.card-imgs .imgs-item:first-child {
  margin-left: 0;
}
.imgs-item .item-icon {
  box-sizing: border-box;
  width: 92rpx;
  height: 92rpx;
  border: 2rpx solid #e5e5e5;
  border-radius: 8rpx;
  padding: 4rpx;
}
.imgs-item .item-icon.item-icon-none {
  padding: 0;
  background-color: #f7f7f7;
  background-size: cover;
  background-image: url('../../assets/images/icons/item-icon-none.jpg');
}
.imgs-item .item-icon image {
  width: 100%;
  height: 100%;
}
.imgs-item .item-text {
  color: #ff344d;
  font-size: 22rpx;
  margin-top: 8rpx;
}
</style>
