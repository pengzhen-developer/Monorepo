<template>
  <div>
    <div class="top">
      <div class="button"
           @click.prevent="goMapPage">{{locationStr}}</div>
    </div>
    <div class=""
         v-if="phaList.length">
      <div class="card cards"
           v-for="item in phaList"
           :key="item.DrugStoreName"
           @click="goDrugOrderBeforePage(item)">
        <div class="card-avatar">
          <van-image :src="item.DrugStoreLogo">

          </van-image>
        </div>
        <div class="card-body">
          <div class="card-name">{{item.DrugStoreName}}
            <div class="card-more"
                 v-if="item.distanceKm">{{item.distanceKm}}</div>
          </div>
          <div class="block">
            <div class="card-small"
                 v-if="item.ShippingMethod!='1'">到店自提</div>
            <div class="card-small"
                 v-if="item.ShippingMethod!='0'">配送到家</div>
          </div>
          <div class="card-imgs"
               v-if="item.Drugs && item.Drugs.length">
            <div class="imgs-item"
                 v-for="(item,index) in item.Drugs"
                 :key="index">
              <div class="item-icon">
                <van-image :src="item.DrugImage?item.DrugImage:''"
                           class="error--image">
                  <template v-slot:error>
                    <img :src="require('@src/assets/images/icons/ic_none_drug.png')" />
                  </template>
                </van-image>
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
    <!-- <div class="text-addr"
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
    </div> -->
  </div>
</template>

<script>
import peace from '@src/library'
import config from '@src/config'
import { Dialog } from 'vant'
export default {
  name: 'DrugListPharmacy',
  data() {
    return {
      key: config.MAP.key,
      phaList: [],
      phaAddrList: [],
      userLocation: {
        lat: 0,
        lng: 0
      },
      jztClaimNo: '',
      isGet: false,
      locationStr: '我的位置'
    }
  },

  destroyed() {
    $peace.$off('location')
  },

  async mounted() {
    /* eslint-disable */
    $peace.$on('location', this.mapCallback)
    await this.getMapScript()
    await this.getLocation()
    let paramsRoute = peace.util.decode(this.$route.params.json)
    this.jztClaimNo = paramsRoute.jztClaimNo || paramsRoute.claimNo
  },

  methods: {
    mapCallback(params) {
      if (params) {
        let { lat, lng, addr, jztClaimNo } = params
        this.userLocation = { lat: lat, lng: lng }
        this.jztClaimNo = jztClaimNo
        this.locationStr = addr
        this.getPhaList()
      }
    },
    //H5 location获取用户gps定位
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.successCallBack, this.errorCallBack)
      } else {
        peace.util.alert('该浏览器不支持获取地理位置')
      }
    },
    async successCallBack(pos) {
      let crd = pos.coords
      this.userLocation = await this.convertorCoordinate(crd.latitude, crd.longitude)
      if (this.userLocation.lat > 0 && this.userLocation.lng > 0) {
        this.getAddress(this.userLocation.lat, this.userLocation.lng)
      }
      this.getPhaList()
    },
    errorCallBack(error) {
      this.getPhaList()
      console.log('Error code ' + error.code + '. ' + error.message)
      // switch (error.code) {
      //   case error.PERMISSION_DENIED:
      //     alert('定位失败,用户拒绝请求地理定位')
      //     break
      //   case error.POSITION_UNAVAILABLE:
      //     alert('定位失败,位置信息是不可用')
      //     break
      //   case error.TIMEOUT:
      //     alert('定位失败,请求获取用户位置超时')
      //     break
      //   case error.UNKNOWN_ERROR:
      //     alert('定位失败,定位系统失效')
      //     break
      // }
    },
    getMapScript() {
      const qqMapKey = this.key
      if (!global.QMap) {
        global.QMap = {}
        global.QMap._preloader = new Promise((resolve) => {
          global._initQMap = function() {
            resolve(global.QMap)
            global.document.body.removeChild(script)
            global.QMap._preloader = null
            global._initQMap = null
          }
          const script = document.createElement('script')
          global.document.body.appendChild(script)
          script.src = `https://map.qq.com/api/js?v=2.exp&key=${qqMapKey}&libraries=convertor&callback=_initQMap`
        })
        return global.QMap._preloader
      } else if (!global.QMap._preloader) {
        return Promise.resolve(global.QMap)
      } else {
        return global.QMap._preloader
      }
    },
    initMap() {
      if (!this.map) {
        // var center = await this.getCenter();
        this.map = new qq.maps.Map(this.$refs.jkMap, {
          // center: center,
          // 缩放类型，可设置以地图中心点或双指中心点为焦点（移动端）:qq.maps.MapZoomType.DEFAULT,中心点位置：qq.maps.MapZoomType.CENTER
          mapZoomType: qq.maps.MapZoomType.DEFAULT,
          // 地图缩放控件
          zoomControl: false,
          minZoom: 10,
          maxzoom: 18,
          zoom: 16,
          // 用作地图 div 的背景颜色。当用户进行平移时，如果尚未载入图块，则显示此颜色
          backgroundColor: '#f6f7f9',
          // 平移控件
          panControl: false,
          // 地图类型控件
          mapTypeControl: false,
          // 地图比例尺控件
          scaleControl: false
        })
      }
    },
    // 坐标 GPS转QQ
    convertorCoordinate(latitude, longitude) {
      return new Promise((resolve) => {
        new qq.maps.convertor.translate(new qq.maps.LatLng(latitude, longitude), 1, (res) => {
          resolve(res[0])
        })
      })
    },
    getAddress(latitude, longitude) {
      const qqMapsGeocoder = new qq.maps.Geocoder()
      qqMapsGeocoder.getAddress(new qq.maps.LatLng(latitude, longitude))
      qqMapsGeocoder.setComplete((res) => {
        this.locationStr = res.detail?.nearPois[0]?.name || '我的位置'
      })
    },
    //跳转地图选点页面
    goMapPage() {
      let paramsRoute = peace.util.decode(this.$route.params.json)
      let jztClaimNo = paramsRoute.claimNo || paramsRoute.jztClaimNo
      let familyId = paramsRoute.familyId
      let json = {
        jztClaimNo,
        familyId,
        lat: this.userLocation.lat,
        lng: this.userLocation.lng
      }
      json = peace.util.encode(json)
      this.$router.push(`/drug/selectMap/${json}`)
    },
    //获取药房列表
    getPhaList() {
      let params = {
        latitude: this.userLocation.lat,
        longitude: this.userLocation.lng,
        jztClaimNo: this.jztClaimNo
      }
      peace.service.patient.getStoresList(params).then((res) => {
        this.phaList = res.data == null ? [] : res.data
        this.isGet = true
      })
    },

    //跳转预售订单页面
    goDrugOrderBeforePage(item) {
      //冷藏药 需到店自提
      //ColdStorage  0：非冷藏 1：冷藏
      //处方开立单位标记 PackageUnitTag(minUnit:最小单位 packageUnit:包装单位)
      if ((item.ColdStorage === 1 || item.PackageUnitTag === 'minUnit') && item.ShippingMethod == 1) {
        let message =
          item.ColdStorage === 1
            ? '处方中有需要冷藏储存的药品，需到店自提药品。\n本店暂不支持到店自提。'
            : item.PackageUnitTag === 'minUnit'
            ? '处方中含有拆零售卖的药品，仅支持到店自提。\n本店暂不支持到店自提。'
            : ''
        return Dialog.confirm({
          title: '温馨提示',
          message: message,
          confirmButtonText: '知道了',
          showCancelButton: false
        })
      }
      const params = peace.util.decode(this.$route.params.json)
      let jztClaimNo = params.claimNo || params.jztClaimNo
      let familyId = params.familyId
      let familyName = params.familyName
      let json = {
        ColdStorage: item.ColdStorage,
        JztClaimNo: jztClaimNo,
        DrugStoreId: item.DrugStoreId,
        AccessCode: item.AccessCode,
        CustomerType: item.CustomerType,
        ShippingMethod: item.ShippingMethod, // 0 门店自提  1 门店配送  2 全部
        Detailed: item.Detailed, // 地址
        ProvincialCity: item.Province + ',' + item.City + ',' + item.County,
        Province: item.Province,
        City: item.City,
        County: item.County,
        familyId,
        familyName,
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
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card .card-avatar .van-image {
  width: 90%;
  height: 90%;
  overflow: hidden;
  border-radius: 2px;
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
  margin: 8px 0 3px 10px;
}
.card-imgs .imgs-item:first-child {
  margin-left: 0;
}
.imgs-item .item-icon {
  box-sizing: border-box;
  width: 46px;
  height: 46px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 2px;
}
.imgs-item .item-icon.item-icon-none {
  padding: 0;
  background-color: #f7f7f7;
  background-size: cover;
  background-image: url('../../assets/images/icons/ic_none_drug.png');
}
.imgs-item .item-icon image {
  width: 100%;
  height: 100%;
}
.imgs-item .item-text {
  color: #ff344d;
  font-size: 11px;
  margin-top: 4px;
}
</style>
