<template>
  <div class="map-select">
    <div class="header-map">
      <span @click="cancel"
            class="cancel">取消</span>
      <span>选择位置</span>
      <span @click="save"
            class="save">确定</span>
    </div>
    <div ref="jkMap"
         style="width:100%;height:300px;"></div>
    <!-- <iframe id="mapPage"
            width="100%"
            height="100%"
            frameborder=0
            class="frame"
            :src="src">
    </iframe> -->
    <div class="list">
      <div v-for="(item,index) in poisarr"
           :key="index"
           @click='choosepois(item,index)'
           class="item">
        <div class="text">{{item.name}}</div>
        <div class="icon">
          <van-image :src="require(item.checked?'@src/assets/images/ic_choose.png':'@src/assets/images/ic_choose_not.png')"></van-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import config from '@src/config'
export default {
  name: 'DrugMapSelect',
  data() {
    return {
      map: '',
      qqMapGeocoder: '',
      qqMapSearch: '',
      params: {
        lng: '',
        lat: '',
        addr: ''
      },

      myLatlng: '',
      qqMapMarker: '',

      poisarr: [],
      hasSelect: false
    }
  },
  // beforeDestroy() {
  //   window.removeEventListener('message', () => {})
  // },
  async mounted() {
    // const key = config.MAP.key
    // const params = peace.util.decode(this.$route.params.json)
    // if (params.lat && params.lng) {
    //   const coord = params.lat + ',' + params.lng
    //   this.src = `https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${key}&coord= ${coord} &referer=hospital`
    // } else {
    //   this.src = `https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${key} &referer=hospital`
    // }

    // window.addEventListener(
    //   'message',
    //   (event) => {
    //     // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
    //     var loc = event.data
    //     if (loc && loc.module == 'locationPicker') {
    //       //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
    //       this.loc = loc
    //     }
    //   },
    //   false
    // )
    await this.getMapScript()
    this.initMap()
  },
  methods: {
    getMapScript() {
      const qqMapKey = config.MAP.key
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
          script.src = `https://map.qq.com/api/js?v=2.exp&key=${qqMapKey}&callback=_initQMap`
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
        const params = peace.util.decode(this.$route.params.json)
        //默认中心点暂为 30.549754，114.203674
        const lat = params.lat > 0 ? params.lat : 30.549754
        const lng = params.lng > 0 ? params.lng : 114.203674
        var center = new qq.maps.LatLng(lat, lng)
        this.map = new qq.maps.Map(this.$refs.jkMap, {
          center: center,
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

        //创建实例
        this.qqMapMarker = new qq.maps.Marker({ map: this.map })
        this.qqMapGeocoder = new qq.maps.Geocoder()
        this.qqMapMarker.setPosition(center)
        this.qqMapGeocoder.getAddress(center)
        this.qqMapGeocoder.setComplete(this.geocoderComplete)
        //地图点击事件
        qq.maps.event.addListener(this.map, 'click', this.clickMap)
        //中心点移动事件
        qq.maps.event.addListener(this.map, 'center_changed', this.debounce(this.changedMap, 300))
      }
    },
    choosepois(item, index) {
      this.poisarr.map((item) => (item.checked = false))
      const pois = this.poisarr[index]
      pois.checked = true
      this.poisarr.splice(index, 1, pois)
      this.params.addr = item.name
      this.params.lng = item.latLng.lng
      this.params.lat = item.latLng.lat
      this.hasSelect = true
    },

    //解析器
    geocoderComplete(result) {
      console.log(result)
      this.setAndMarkPoi(result.detail.location.lat, result.detail.location.lng)
      this.poisarr = result.detail.nearPois
    },
    setAndMarkPoi(lat, lng) {
      let centerval = new qq.maps.LatLng(lat, lng)
      this.qqMapMarker.setPosition(centerval)
    },
    clickMap(event) {
      this.longitude = parseFloat(event.latLng.getLng())
      this.latitude = parseFloat(event.latLng.getLat())
      this.myLatlng = new qq.maps.LatLng(this.latitude, this.longitude)

      this.qqMapGeocoder.getAddress(this.myLatlng)
    },
    changedMap() {
      this.myLatlng = this.map.getCenter()
      this.qqMapGeocoder.getAddress(this.myLatlng)
    },
    debounce(fn, wait) {
      var timer = null
      return function() {
        if (timer !== null) {
          clearTimeout(timer)
        }
        timer = setTimeout(fn, wait)
      }
    },
    cancel() {
      this.$router.go(-1)
    },
    save() {
      let params = null
      if (this.hasSelect) {
        let routeParam = peace.util.decode(this.$route.params.json)

        params = Object.assign({}, routeParam, this.params)
      } else {
        params = null
      }
      $peace.$emit('location', params)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.map-select {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header-map {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    background: #fff;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #333;
    .cancel {
      color: #999;
    }
    .save {
      color: $-color--primary;
    }
  }
  .list {
    flex: 1;
    padding: 10px 0;
    .item {
      padding: 5px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text {
        width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
