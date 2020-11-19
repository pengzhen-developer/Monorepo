<template>
  <div class="map-select">
    <div class="header-map">
      <span @click="cancel"
            class="cancel">取消</span>
      <span>选择位置</span>
      <span @click="save"
            class="save">确定</span>
    </div>
    <!-- <div ref="jkMap"></div> -->
    <iframe id="mapPage"
            width="100%"
            height="100%"
            frameborder=0
            class="frame"
            :src="src">
    </iframe>
  </div>
</template>

<script>
import peace from '@src/library'
import config from '@src/config'
export default {
  name: 'DrugMapSelect',
  data() {
    return {
      loc: null,
      src: ''
    }
  },
  beforeDestroy() {
    window.removeEventListener('message', () => {})
  },
  mounted() {
    const key = config.MAP.key
    const params = peace.util.decode(this.$route.params.json)
    if (params.lat && params.lng) {
      const coord = params.lat + ',' + params.lng
      this.src = `https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${key}&coord= ${coord} &referer=hospital`
    } else {
      this.src = `https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${key} &referer=hospital`
    }

    window.addEventListener(
      'message',
      (event) => {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data
        if (loc && loc.module == 'locationPicker') {
          //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          this.loc = loc
        }
      },
      false
    )
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    save() {
      let params = null
      if (this.loc) {
        let routeParam = peace.util.decode(this.$route.params.json)
        let addr = this.loc.poiname
        let lat = this.loc.latlng.lat
        let lng = this.loc.latlng.lng
        params = { addr, lat, lng, ...routeParam }
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
  .frame {
    flex: 1;
  }
}
</style>
