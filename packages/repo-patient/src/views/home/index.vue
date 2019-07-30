<template>
  <div class="home-layout" v-if="data && data.guide">
    <div class="banner">
      <div class="banner-img"></div>
    </div>
    <!--导流-->
    <div class="panel panel-block panel-block-m panel-home" v-if="data.guide">
      <div :doctortag="item.id" :key="item.id" @click="goMenuPage(item,{type:'guide'})" class="block-items" data-type="guide" v-for="item in data.guide">
        <div :class="[true ? 'block-ico' : '', item.icon]"></div>
        <div class="block-tit">{{item.text}}</div>
        <div class="block-small">{{item.small}}</div>
      </div>
    </div>
    <!--三方-->
    <div class="panel panel-block panel-clear">
      <div :id="item.id" :key="item.id" :type="item.id" @click="goMenuPage(item,{type:item.id})" class="block-items" v-for="item in data.card">
        <div :class="['block-items-card', item.icon, item.id == 'appoint' ? '' : 'disabled']">{{item.text}}</div>
      </div>
    </div>
    <div class="panel flex" style="padding-top: 0;padding-bottom:0">
      <div @click="goMenuPage('',{type:'userDoctor'})" class="card-simple icon_01_01_11" type="userDoctor">
        <div class="card-tit">我的医生</div>
        <div class="card-brief">便捷查找您的医生</div>
      </div>
      <div @click="goMenuPage('',{type:'userConsult'})" class="card-simple icon_01_01_12" type="userConsult">
        <div class="card-tit">我的咨询</div>
        <div class="card-brief">个人咨询详情管理</div>
      </div>
    </div>
    <DepartPage :items="data.department" :max="7" :moreIcon="data.moreIcon" style="margin-top:0;border-bottom: 10px solid #f5f5f5;padding-bottom: 10px"></DepartPage>
    <!--    <van-cell is-link value="常见人群" />-->
    <!--    <Humens :data="data.crowdListsDisease" :items="data.crowdLists" :max="3"></Humens>-->
    <van-cell @click="goMenuPage({},{type:'recommendHsp'})" is-link value="推荐互联网医院" />
    <HspPage :items="data.recommendOrgan" :max="2"></HspPage>
  </div>
</template>

<script>
import peace from '@src/library'
import HspPage from '@src/views/hospital/HospitalList'
// import Humens from '@src/views/diagnose/select/diagnoseSelectHumen'
import DepartPage from '@src/views/hospital/depart/HospitalDepartList'

export default {
  components: {
    HspPage,
    DepartPage
    // Humens
  },
  data() {
    return {
      data: {}
    }
  },
  created() {
    peace.service.index.getMenu().then(res => {
      this.data = res.data
    })
  },
  methods: {
    goMenuPage(item, data) {
      let json
      switch (data.type) {
        case 'guide':
          json = peace.util.encode({ doctorTag: item.id })
          this.$router.push(`/components/doctorList/${json}`)
          break
        case 'appoint':
        case 'recommendHsp':
          // 开通预约的医院列表
          json = peace.util.encode({ doctorTag: item.id, type: data.type })
          this.$router.push(`/hospital/HospitalList/${json}`)
          break
        case 'userDoctor':
          this.$router.push(`/setting/userDoctorlist`)
          break
        case 'userConsult':
          this.$router.push('/setting/userConsultList')
          break
        default:
          peace.util.alert('暂未开放')
          // _f.goMenuPage();
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-layout {
  height: 100%;
}

.banner {
  width: 100%;
  height: 135.5px;
  background-color: #e5e5e5;
}

.panel {
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  margin: 0;
  padding: 10px 10px;
  border-radius: 0;
  font-size: 15px;

  &.panel-home {
    box-shadow: none;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  &.panel-clear {
    box-shadow: none !important;
  }

  &.panel-block {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    box-shadow: 0 2px 5px #efefef;

    .block-items-card {
      color: #fff;
      font-size: 13px;
      min-height: 45px;
      min-width: 75px;
    }

    .block-items-card {
      width: 100%;
      height: 100%;
      background-size: cover;
      text-align: center;
      line-height: 43px;
      border-radius: 5px;

      &.disabled {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          display: block;
          width: 31.5px;
          height: 25.5px;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAABmCAMAAAA6eNVMAAAARVBMVEVHcEz29vb29vb29vb39/f5+fn29vb29vb39/f////29vb19fWRkZGampq7u7ulpaXy8vLr6+vR0dGwsLDj4+PGxsbb29s7YfjEAAAAC3RSTlMA0ay2SyXc9XoNn1NqMIUAAAU/SURBVGje5ZnXdvMqEIXJSbEc0Yb2/o96aJIAyRGg4oufrCw7jp3NzDcNglC2nsPv58fP4/Q15t+j/3r8PnPtD/vqbesxZJYPj5GPN6p/peJfP8f+mlBt7//4zkw/Js4pJtDygRz7b6eqlv4RGMaUd2PvVB8NxsY+KIKx7MZ+wPMMM4sdu6U6saOvfubOfIoxU3YfvAs7eh6JeeYMl9ztQ9d9Isd+MOid472u9QG0Y7fGHyp0nGAagn960oL9oPHKWc1mP0Ajdrc+2lWp9GHOpQ13M6vumz+sxNF3V7hjCT7b9chd3IdNYdKGvdP3XFhhTAkmIsa+r3ixBtVj7y54YQNERaPtU7Pn/f+eW+rosy/gpc92tzSWtuhgJpYorMPeG3mxxcTpQPi66zxgU583YPerJ+uNEwvxrqTS1Pc+hwNrw6ux+9Whrq04CTVe4Jk3F74AYyKplIztY++Vt+4G5XUpxmmt9w6IC3axN8vraKng3m5t44/SJN0IFtwIa7ykFHaxN8q7aBdJ6XM22p/lMmb5n3kt9jZ5xXCW15wFu4FMrZ6v685f2JvkXbSLfD9xO9PjCKuRZ0DoHHk9Fbm816v4KGIvgLpsb5R32DemKRlem6bsoufsYa+Wd0WuID95W8cwcPvIa/4u9lr5gJ0uGW7EjCREvXK/U1lwDAidI69jQ2NTYIs5wudRy74H0nGnBnuVPHdzNEStiDi+4HcSzOfOfBBN2GvkHfbYWZ13GU9fWHq83ZpuxV4hHwaqJNMkyQd6HaKdpik/IHSOvCjyzRVaYorgNyOk5bga+668VSNZvlFclj5bEaj10bKneuw78uAHqiTffPEpi5/3PocO7DvygTKf8831HK1IUf1ENmENCJ0lr4OfIeabCYO1KY7yKmlzbdj32EOSb0vP0cVZFhTvw15bdF2+SX+wiY2mCL9O7NUtxw82NJ0zVP0k3yHP14e6xOFTNLT29lp5RXTRc/J4s9th1ZN8gzxAZJ0kl+85Oh/jdNH8u7Cv5BVxsjTrKfHKjuX20p7evidvnJKcJ8d0wjR5uPNkO73Y187XvsiLmG4iNHQzzXUZJsqPYt8IPTnXdBqjTUN2gXlOtr+2PuQUyNVkyTYvDwaEzpL32H1LUWRd2baubg5hL+RdjAtX4aWYEHDIPNNwbm+R5zHGfZT5C2IJ3J5RgSX5b1b3dgexT/LSl3C5DLQx0d2G5uLOVVnpB4ROkSfhpBpSSTEcMw7PN3aT9epU7JM8S8JsQuD7WjrXcJ2F3gnYF+frJL4CAvAXNSZLPHku9kmexqNCyLw5DgXLxsq05w4InSevnV2GSHeK09N8Y5XzsdJQdS72xXrpi/uoI3YaJyuz+R+in290qrw7Kbhyw0dYrizHrbHyVOxL5OvkYiYruOuxckDoZPkgQYKQyM4xNv2yse5M7FEeQjUNHc3WPAYgDCzFRl+EfbJesMTPhvLQd6WOJ9ilz34+0QXyoeWwxevaneL9dANp7g8IXSI/3wcvnLnRIinBV2DP5N3tDCnSXCdN53zsmbzNezDFhGUrIb8OeyZvXEPTRZrDldgLeRbCX40XjHT7oaf0Rpm5EvvWERPI6ur4KuybJ9wy/K7Dvn3AzsPvQuwvzvfpP4euxP5CnrO5zl6K/dXtBsAt2Heulq7G/rf85dj/lL8e+1/yA0Lvk78F+0v5e7C/kr8J+wv5AaH3yd+HfUv+Ruwb8ndiX8sPCL1P/mbshfzd2HP527Fn8gNC75N/B/ZF/i3YZ/n3YJ/kB/S+9T7sfr0Pu19P9A+v/wGuOxysim677QAAAABJRU5ErkJggg==');
          background-repeat: no-repeat;
          background-size: cover;
          top: 0;
          left: 0;
        }
      }
    }

    .block-items {
      flex: 1 1 100%;
      font-size: inherit;
      padding: 5px 5px;
      justify-content: center;

      .block-tit {
        text-align: center;
        font-size: 16px;
        color: #000;
      }

      .block-small {
        font-size: 11px;
        color: #999;
      }

      .block-ico {
        width: 28px;
        height: 28px;
        margin: 5px auto;
        background-color: #fff;
        position: relative;
        display: block;

        &::before {
          content: '';
          position: absolute;
          width: 30px;
          height: 30px;
          background-size: cover;
        }
      }

      .block-small {
        text-align: center;
      }
    }
  }

  &.panel-block-m {
    border-radius: 15px;
    margin: -45px 10px 5px 10px;
  }

  .panel-tit {
    font-size: 18px;
    font-weight: 600;
    color: #000;
    margin-bottom: 10px;
    font-size: 16px;
    position: relative;

    &.tit-more::after {
      content: '';
      position: absolute;
      display: inline-block;
      top: 5px;
      right: -5px;
      width: 15px;
      height: 15px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAkCAMAAABR74GsAAAANlBMVEVHcEzPz8/Pz8/Pz8/Ozs7R0dHQ0NDNzc3Ozs7Ozs7Q0NDPz8/Pz8/Pz8/Pz8/Pz8/Ozs7Ozs6NXauoAAAAEXRSTlMAa1XefxguCvjsQai0jZzFvytu9msAAACQSURBVCjPjZJLFoAgDAMLCkXx1/tfVgu7JgtdzgtTKRGpvQh89bZlB9rNbKmRlofiejjOkB4Y3Ho0sw1w8ZFb5hgl1ydpKLk8nTSmT+rW0yU40tMNJav/dxKGjafbCjgNHCWMUsOcFuE4nn7cYt4YINkO3eTceo6QHWevqZ28vLKW0EYVLw60jzeVt/rzQlJeyzYKJQAM6ZcAAAAASUVORK5CYII=);
      background-size: 7.5px;
      background-repeat: no-repeat;
    }
  }

  .panel-body {
  }

  .panel-bottom {
    border-top: 1px solid #e8e8e8;
    padding: 10px 0;
    font-size: 13px;
    color: #999;
  }
}

.flex {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  .card-simple {
    position: relative;
    padding: 0 10px;
    padding-left: 45px;
    flex: 1;
    margin: 10px;

    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      margin-left: -42.5px;
      width: 35px;
      height: 35px;
      background-size: cover;
    }

    &:first-child {
      margin-right: 0;
      padding-right: 20px;
      border-right: 1px solid #dedede;
    }

    .card-tit {
      font-size: 13px;
      color: #000;
      font-weight: 600;
      display: block;
    }

    .card-brief {
      font-size: 11px;
      padding-top: 2.5px;
      color: #999;
    }
  }
}

.van-hairline--top-bottom::after {
  border: none;
}

.van-cell:not(:last-child)::after {
  content: '';
  border: none;
}
</style>
