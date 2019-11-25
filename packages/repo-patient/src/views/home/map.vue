<template>
  <div class="map">
    <!--  <div id="map"-->
    <!--       class="map">-->
    <!--  </div>-->
    <iframe id="mapPage"
            width="100%"
            height="100%"
            frameborder=0
            :src="src"></iframe>
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
      src: ''
    }
  },
  mounted() {
    const params = peace.util.decode(this.$route.params.json)
    this.src =
      'https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:' +
      params.latitude +
      ',' +
      params.longitude +
      ';title:' +
      params.name +
      ';addr: ' +
      params.address +
      ';&key=S2WBZ-VHEK5-UCAIE-Q4TPB-LO7P3-DCB54&referer=hospital'
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
