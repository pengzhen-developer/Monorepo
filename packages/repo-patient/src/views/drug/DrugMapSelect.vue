<template>
  <div class="map-select">
    <div class="header-map">
      <span @click="cancel"
            class="cancel">取消</span>
      <span>选择位置</span>
      <span @click="save"
            class="save">确定</span>
    </div>
    <iframe id="mapPage"
            width="100%"
            height="100%"
            frameborder=0
            class="frame"
            :src="'https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=' + key + '&referer=hospital'">
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
      key: '',
      loc: null
    }
  },
  beforeDestroy() {
    window.removeEventListener('message', () => {})
  },
  updated() {
    console.log('updated')
  },
  
  mounted() {
    let that = this
    this.key = config.MAP.key
    // const params = peace.util.decode(this.$route.params.json);
    // console.log(params);
    window.addEventListener(
      'message',
      function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data
        // console.log('message111');
        if (loc && loc.module == 'locationPicker') {
          //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          // console.log('location', loc);
          that.loc = loc
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
      // console.log(this.loc);
      
      // if (this.loc) {
      //   let routeParam = peace.util.decode(this.$route.params.json)
      //   let addr = this.loc.poiname
      //   let Latitude = this.loc.latlng.lat
      //   let Longitude = this.loc.latlng.lng
      //   let params = { addr, Latitude, Longitude, ...routeParam }
      //   params = peace.util.encode(params)
      //   this.$router.push(`/drug/list/${params}`)
      // } else {
      //   this.$router.go(-1)
      // }
      let params=null
      if (this.loc) {
        let routeParam = peace.util.decode(this.$route.params.json)
        let addr = this.loc.poiname
        let Latitude = this.loc.latlng.lat
        let Longitude = this.loc.latlng.lng
        params = { addr, Latitude, Longitude, ...routeParam }
        params = peace.util.encode(params)
      }else{
        params=null
      }
      peace.cache.set('location',params)
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
