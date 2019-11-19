<template>
  <div class="map">
<!--  <div id="map"-->
<!--       class="map">-->
<!--  </div>-->
    <iframe id="mapPage" width="100%" height="100%" frameborder=0 :src="src"></iframe>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'home-map',
  components: {},
  data() {
    return {
      map: {},
      src: ""
    }
  },
  mounted() {
    const params = peace.util.decode(this.$route.params.json)
    console.log(params)
    this.src = 'https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:' + params.latitude + ',' + params.longitude + ';title:' +  params.name + ';addr: ' + params.address + ';&key=S2WBZ-VHEK5-UCAIE-Q4TPB-LO7P3-DCB54&referer=hospital';
    console.log(this.src);
    // let center = new window.qq.maps.LatLng(params.latitude, params.longitude);
    // var map = new window.qq.maps.Map(document.getElementById("map"), {
    //   // 地图的中心地理坐标。
    //   center: center,
    //   zoom: 13,
    //   draggable: true, //是否可拖拽
    //   scrollwheel: true, //是否可滚动缩放
    //   disableDoubleClickZoom: false
    // });
    // var marker = new window.qq.maps.Marker({
    //   //设置Marker的位置坐标
    //   position: center,
    //   //设置显示Marker的地图
    //   map: map
    // });
    // marker.setVisible(true);
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
