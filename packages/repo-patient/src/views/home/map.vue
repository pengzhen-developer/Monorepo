<template>
  <div id="map"
       class="map">
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'home-map',

  components: {},

  mounted() {
    const params = peace.util.decode(this.$route.params.json)

    var geo = new window.qq.maps.Geocoder()
    geo.getLocation(params.address) //地址
    geo.setComplete(function(res) {
      console.log(res, res.detail.location) //得到经纬度
      var map = new window.qq.maps.Map(document.getElementById('map'), {
        center: res.detail.location, //将经纬度加到center属性上
        zoom: 13, //缩放
        draggable: true, //是否可拖拽
        scrollwheel: true, //是否可滚动缩放
        disableDoubleClickZoom: false
      })
      new window.qq.maps.Marker({
        position: res.detail.location, //标记的经纬度
        animation: window.qq.maps.MarkerAnimation.BOUNCE, //标记的动画
        map: map //标记的地图
      })

      new window.qq.maps.CityService({
        //设置地图
        map: map,
        complete: function(results) {
          console.log(9999, results)
        }
      })
    })
  },
  data() {
    return {
      map: {}
    }
  },
  methods: {}
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
