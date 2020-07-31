<template>
  <div class="column full-width full-height">

    <div class="q-pa-xs">
      <div class="row q-col-gutter-md">
        <div class="col-4"
             v-for="item in list"
             v-bind:key="item.id">
          <div class="q-pa-sm row border-out">
            <div class="q-pa-sm row border-inner">
              <el-image class="q-mr-md data-icon"
                        v-bind:src="item.icon"> </el-image>

              <div class="flex column justify-center">
                <div>{{ item.title }}</div>
                <div>{{ item.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col full-width">
      <v-chart :options="polar"
               :autoresize="true" />
    </div>

  </div>
</template>

<script>
import ECharts from 'vue-echarts'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/map/js/china.js'

const markIcon =
  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAB+FBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/SUnfQED/QEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACGJCQAAAAAAAALAAAAAAAAAAAAAAAAAAAAAAAIAAA2DwjFOjMAAAAiBwcAAAAAAAAAAADQQTUAAAD/Tj7HPTNUGhZhGhoAAACjMirZQzYpDAgAAACFJx8PBARPGRLNQDX/TkH/TUD8WTz/WTz4WDv/WDvyVzr1VzrvVjnsUjnsVTnmUTjpUTjhTzTnRjrbTjPTSTLTTDLRSDHlRjrLSDH8TUH/TUHHRjBvIxu7QSu5QCu1QCqYLyf/VzzbRDn8VjzXQTeLKiOhOSXkTji5Pyz/T0H/VT79VD3/VD2WMyT/TkHpSTujMSn/T0DZSTTcQznvSj7fRTmZMyXdSDeoMyyzOy3aRjb/UkDBOzH/TkH/T0HYQzfZRjfgRTr/UkD/UkHsST3/UEDGQDH7TUD1TD/eRjn5TUD5TED+T0H/T0H/UUHpSTzuST73TD/zSz/3TT/4TUD3TED9TkH8TkD/T0H4TUD/TkH4TEDeRTn7TUH6TUH/UEL3TED+TkHlRzv5TUD9TkH6TUH8TkH+TkHJPjP6TkD8TkH8TkH9TkH9TkL/T0H+TkHySz//T0L+T0L/T0L/T0L/T0K60NH9AAAAp3RSTlMAAQIDBAUGBwcICAkKCwwNDhAREhMUFRYXGBocHR4gISEjJSUnKSsrLTEyOjo8PT0+QUFCR0hLTE1NTk5PT1BRUVJSVFRVV1dYWFlaWlteXl9gYWFiYmZnZ2htbm9wcHJydHd3en1/gYKGjJSYm5ykpaioq6ysr6+wt8rLztDR0dHT29vc3OLj5Obm5+fo6evs7e7u7+/v8fHy8/Pz9ff5+vv8/P39/v8vjhQAAAFcSURBVCjPY2CAAiZWRRdPLR42JkYGZMDIol65dPny5bWmvCwoMiz6k5eDwYIwflYkGSaxjuVQME+PjxkhwZYGEmtqXAIky8TZ4VoYeWqAInmGuknLli+fI8/HBDdJYOby5fONNZTUWoAKdIRY4FYLTVu+fKGBnLhMG1BCW4QVJsEsVAUUKFaWTAdSE9REWBBGpYIsn9EPIgtVBJkRlis0w5w71USWF245A6uwUTtEfHa4qigbkge5JYIWgcQn+WlI8TAhBQlz4pSK6cuXL5mVJc2HEljenZEBRcuXV2f0haCIc/TE2bpHLV6eHZHSy4kcuGYNlhaO/t1L4wOd68yQJZJLLS3tvFrnRvjalySjSJRbWtq6ZuYEutmgSpg3WFpaObn5ejha1aMYxdUTY2lp4+DoZBPbw4US5z5dwUA9VlahXT4MqCB6Ym6wdXDuxAQGdKCZ37W4q0ATzgcAdRJ4MSbkMJ8AAAAASUVORK5CYII='

export default {
  name: 'ware-house-map',

  components: {
    'v-chart': ECharts
  },

  props: {
    count: {
      type: Object,
      default: () => {}
    },
    map: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    count: {
      handler(val) {
        this.list[0].count = val.drug
        this.list[1].count = val.prescription
        this.list[2].count = val.order
        this.list[3].count = val.medical
        this.list[4].count = val.store
        this.list[5].count = val.warehouse
      },
      immediate: true,
      deep: true
    },
    map: {
      handler(val) {
        this.polar.series[0].data = val
      },
      immediate: true,
      deep: true
    }
  },

  data() {
    return {
      list: [
        {
          id: 1,
          icon: require('../assets/img/ic_ypzs.png'),
          title: '药品总数',
          count: 0
        },
        {
          id: 2,
          icon: require('../assets/img/ic_cfzl.png'),
          title: '处方总量',
          count: 0
        },
        {
          id: 3,
          icon: require('../assets/img/ic_ddzl.png'),
          title: '订单总量',
          count: 0
        },
        {
          id: 4,
          icon: require('../assets/img/ic_yljg.png'),
          title: '医疗机构',
          count: 0
        },
        {
          id: 5,
          icon: require('../assets/img/ic_dpjg.png'),
          title: '店配机构',
          count: 0
        },
        {
          id: 6,
          icon: require('../assets/img/ic_cpjg.png'),
          title: '仓配机构',
          count: 0
        }
      ],
      polar: {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const { name, value } = params
            return `
                    ${name} <br/>
                    云仓：${value[2]} <br/>
                    药店：${value[3]} <br/>
                `
          }
        },
        geo: {
          map: 'china',
          itemStyle: {
            areaColor: 'rgb(8, 39, 106)',
            borderColor: '#1A3F81',
            color: '#E6FBF9'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#E6FBF9'
            },
            label: {
              show: false
            }
          },
          top: 0,
          bottom: 0
        },
        series: [
          {
            name: '',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbol: markIcon,
            symbolSize: [24, 24]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-style {
  box-shadow: 0px 1px 4px 0px rgba(224, 224, 224, 1);
  border-radius: 4px;

  .card-title:before {
    content: '';
    display: inline-block;
    position: relative;
    top: 3px;
    margin-right: 10px;
    width: 4px;
    height: 16px;
    background: rgba(48, 153, 166, 1);
    border-radius: 2px;
  }
}

.data-icon {
  width: 40px;
  height: 40px;
}

.border-out {
  clip-path: polygon(0% 8px, 8px 0%, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(0100% - 8px));
  background: #1a3f81;
  padding: 1px;
}
.border-inner {
  padding: 4% 6%;
  clip-path: polygon(0% 8px, 8px 0%, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(0100% - 8px));
  background: #000a3b;
  flex: 1;
}

.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
