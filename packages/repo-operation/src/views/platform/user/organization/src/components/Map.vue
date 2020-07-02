<template>
  <div>
    <div class="control">
      <el-form inline label-width="100px">
        <el-form-item label="所属辖区" required>
          <region-selector
            :defaultArea="detail.area"
            :defaultCity="detail.city"
            :defaultProvince="detail.province"
            :defaultText="false"
            :disabled="false"
            @provinceChange="handleProvinceChange"
            @cityChange="handleCityChange"
            @areaChange="handleAreaChange"
            ref="regionSelector"
          ></region-selector>
          <el-button :disabled="!isSelected" @click="saved" type="primary">选定地址</el-button>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-autocomplete
            :fetch-suggestions="keywordSearch"
            :trigger-on-focus="false"
            @select="handleSelect"
            @clear="clearSearch"
            clearable
            placeholder="请输入详细地址"
            style="width: 100%;"
            suffix-icon="el-icon-location"
            v-model="detail.address"
            value-key="_address"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <div class="info-row two-cols mb-lg pr-xs pl-sm">
        <div class="info-row-label">
          <span>经度</span>
        </div>
        <div class="info-row-content pr-lg">
          <el-input disabled readonly v-model="selectedItem.location.lat"></el-input>
        </div>
        <div class="info-row-label">
          <span>纬度</span>
        </div>
        <div class="info-row-content pr-lg">
          <el-input disabled readonly v-model="selectedItem.location.lng"></el-input>
        </div>
      </div>
    </div>
    <div id="map-container"></div>
  </div>
</template>
<script>
import RegionSelector from "./RegionSelector";
import Service from "../service";
const KEY = "OKDBZ-DHDKW-CZARS-OXSUC-U2467-RQFKA";

/**
 *
 * @param {*} str 字符串
 * @param {*} isNotFull 是否开启非标准匹配模式（标准模式：国-省（市）-市-区）
 */
const filterRegion = str => {
  // if (true) {
  //   return str
  // }
  const reg = /^(.+?(省|市|自治区|自治州|县|区)){0,3}/g;
  const regTrim = /(^\s*)|(\s*$)/g;

  return str
    .replace(str.match(reg).join(""), "")
    .replace(regTrim, "")
    .replace("中国", "");
};

export default {
  name: 'TMap',
  components: { RegionSelector },
  data() {
    return {
      detail: {},
      api: {
        geocoder: "",
        cityService: "",
        searchService: ""
      },
      map: "",
      isSelected: false,
      isClick: false,
      currentSearchParam: "",
      selectedItem: {
        address: "",
        location: {
          lat: "",
          lng: ""
        }
      },
      region: []
    };
  },
  props: {
    defaultDetail: [String, Object],
    visible: Boolean
  },
  methods: {
    TMap(key) {
      return new Promise((resolve, reject) => {
        window.init = () => {
          // eslint-disable-next-line no-undef
          resolve(qq); //注意这里
        };
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://map.qq.com/api/js?v=2.exp&callback=init&libraries=place&key=${key}`;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    init() {
      const _this = this;
      return this.TMap(KEY).then(qq => {
        // 地图容器
        const container = document.getElementById("map-container");

        // 暴露 qmap
        const qmap = qq.maps;

        // 地图初始化选项
        const options = {
          center: new qmap.LatLng(39.916527, 116.397128),
          zoom: 8,
          disableDefaultUI: true
        };

        // 生成地图
        const map = new qmap.Map(container, options);

        // 绑定地图点击事件
        qmap.event.addListener(map, "click", function(event) {
          return _this.mapClick(event);
        });

        // 地址逆解析服务 latLng --> Address
        _this.api.geocoder = new qmap.Geocoder({
          complete: function(result) {
            return _this.parseAddressCallback(result);
          }
        });

        // 城市搜索服务（省/市）
        _this.api.cityService = new qmap.CityService({
          map,
          complete: function(result) {
            return _this.getCityLocationSuccess(result);
          },
          error: function() {
            return _this.getCityLocationError();
          }
        });

        // 关键词搜索服务
        _this.api.searchService = new qmap.SearchService({
          // autoExtend 自动向外扩展(地址)
          autoExtend: false,
          pageIndex: 1,
          pageCapacity: 20,
          complete: function(result) {
            return _this.bykeywordSearchCallBack(result);
          },
          error: function() {
            if (_this.callback) {
              _this.callback([]);
            }
          }
        });

        // 创建 Marker
        _this.api.marker = new qmap.Marker({
          animation: qmap.MarkerAnimation.DOWN,
          //设置显示Marker的地图
          map: null,
          visible: false
        });

        _this.map = map;
        _this.qmap = qmap;

        return Promise.resolve(map);
      });
    },
    getRegion() {
      Service.getRegion().then(res => {
        this.region = res.data;
      });
    },
    // 获取当前省份
    getCurrentProvince() {
      return this.$refs.regionSelector.getSelectedProvinceName();
    },
    // 获取当前城市
    getCurrentCity() {
      return this.$refs.regionSelector.getSelectedCityName();
    },
    // 获取当前区域
    getCurrentArea() {
      return this.$refs.regionSelector.getSelectedAreaName();
    },
    // 添加 Marker
    addMarker(item) {
      this.api.marker.setMap(this.map);
      this.api.marker.setPosition(item.latLng);
      this.map.setCenter(item.latLng);
      this.map.setZoom(18);
      this.api.marker.setVisible(true);
    },
    // 地图点击事件
    mapClick(event) {
      this.isClick = true;
      const target = event;
      this.api.geocoder.getAddress(target.latLng);
    },
    // 获取城市定位
    searchCity() {
      this.clearSearch();
      setTimeout(() => {
        const cityName = this.getCurrentCity();
        // 定位城市
        // console.log('定位城市：', cityName)
        if (this.map && this.api.cityService && cityName) {
          this.api.cityService.searchCityByName(cityName);
        }
      }, 0);
    },
    // 获取城市定位成功
    getCityLocationSuccess(result) {
      this.map.setCenter(result.detail.latLng);
      this.map.setZoom(10);
    },
    // 获取城市定位失败（省直辖区一般会失败）
    getCityLocationError() {
      return this.searchCityKeyword();
    },
    // 全国范围内搜索城市（使用关键字搜索服务）
    searchCityKeyword() {
      const searchName = this.getCurrentProvince() + this.getCurrentCity();
      // 城市定位失败
      // console.log('城市定位失败，尝试全国范围关键词搜索：', searchName)
      this.api.searchService.setLocation("");
      this.api.searchService.search(searchName);
      this.currentSearchParam = searchName;
    },
    // 自动添加搜索前缀（省市区）
    getSearchPrev() {
      const province = this.getCurrentProvince();
      const city = this.getCurrentCity();
      const area = this.getCurrentArea();

      // 防止省市区重复
      return [...new Set([province, city, area])].join("");
    },
    // 搜索框关键词搜索
    keywordSearch(keyword, cb) {
      if (!keyword) return;
      // 异步回调保存到全局交由其他函数调用
      this.callback = cb;
      const searchText = this.getSearchPrev() + keyword;
      this.currentSearchParam = searchText;
      // 关键词搜索
      // console.log('关键词搜索：', searchText)
      this.api.searchService.search(searchText);
    },
    // 关键词搜索回调
    bykeywordSearchCallBack(result) {
      const searchText = this.currentSearchParam;
      if (!searchText) {
        // this.api.searchService.setLocation('')
        // this.api.searchService.search(searchText)
        return;
      }
      // 搜索类型、结果、城市关键词
      // console.log('搜索参数', searchText)
      // console.log('搜索结果', result)
      const isCitySearch = this.callback ? false : true;
      const isCityResult = result.type === "CITY_LIST";
      // console.log('搜索类型', isCitySearch ? '城市关键词搜索' : '关键词搜索')

      // 城市关键词搜索
      if (isCitySearch) {
        // 结果分布太广，根据城市重新搜索
        if (isCityResult) {
          this.api.searchService.setLocation("");
          this.api.searchService.search(searchText);
          return;
        }
        this.map.setCenter(result.detail.pois[0].latLng);
        this.map.setZoom(10);
      } else {
        // 关键词搜索
        // 搜索结果分布太广
        if (isCityResult) {
          this.api.searchService.setLocation(result.detail.cities[0].cityName);
          this.api.searchService.search(searchText);
          return;
        }
        const pois = result.detail.pois;
        pois.map(element => {
          const address = filterRegion(element.address);
          element._address = address
            ? `${address} (${element.name})`
            : element.name;
        });
        this.callback(pois);
        setTimeout(() => {
          this.callback = null;
        }, 0);
      }
    },
    // handleSelect
    handleSelect(item) {
      this.isClick = false;
      this.addMarker(item);
      this.selectedItem.address = item._address;
      this.selectedItem.location = item.latLng;
      this.api.geocoder.getAddress(item.latLng);
    },
    // 地址解析回调
    parseAddressCallback(result) {
      // 地址解析结果
      // console.log('地址解析结果：', result)
      this.addressEcho(result);
    },
    // 地址回显服务
    addressEcho(item) {
      this.isSelected = true;
      // 在这里处理鼠标点击选点
      if (this.isClick) {
        let target = item.detail;
        if (target.nearPois && target.nearPois.length) {
          target = target.nearPois[0];
        }
        // 地址回显
        // console.log('地址回显', target)
        this.addMarker(target);
        const address = filterRegion(target.address);
        this.selectedItem.address = address
          ? `${address} (${target.name})`
          : target.name;
        this.detail.address = this.selectedItem.address;
        this.selectedItem.location = target.latLng;
      }

      const getIdByLabel = (list, label) => {
        const len = list.length;

        for (let i = 0; i < len; i++) {
          if (label.indexOf(list[i].area_name) !== -1) {
            return list[i];
          }
        }
        return label;
      };
      const region = this.region;
      const _province = getIdByLabel(
        region,
        item.detail.addressComponents.province
      );
      const citys = _province.children;
      this.detail.province = _province.area_id;
      this.detail.provinceName = _province.area_name;

      const _city = getIdByLabel(citys, item.detail.addressComponents.city);
      const areas = _city.children;
      this.detail.city = _city.area_id;
      this.detail.cityName = _city.area_name;

      const _area = getIdByLabel(areas, item.detail.addressComponents.district);
      this.detail.area = _area.area_id;
      this.detail.areaName = _area.area_name;
    },
    // 选定地址
    saved() {
      const item = this.selectedItem;
      const region = this.$refs.regionSelector.getSelected();
      const address = item.address;
      const { lat, lng } = item.location;

      const data = {
        province_id: region.province,
        city_id: region.city,
        area_id: region.area,
        latitude: lat,
        longitude: lng,
        address
      };
      console.log(data);
      this.detail.address = address;
      this.$emit("getAddressData", data);
    },
    // 清空搜索栏
    clearSearch() {
      this.isSelected = false;
      this.detail.address = "";
      this.currentSearchParam = "";
      this.selectedItem.location.lat = "";
      this.selectedItem.location.lng = "";
    },
    setDefaults() {
      this.detail = this.defaultDetail || {};
      if (this.api.marker) {
        this.api.marker.setVisible(false);
      }
      setTimeout(() => {
        if (this.map && this.getSelectedProvinceName()) {
          this.searchCity();
        }
      }, 0);
    },

    handleProvinceChange(val) {
      if (val) {
        this.clearSearch();
      }
    },
    handleCityChange(val) {
      if (val) {
        // this.searchCity()
        this.init().then(() => {
          this.searchCity();
        });
      }
    },
    handleAreaChange(val) {
      if (val) {
        this.clearSearch();
      }
    }
  },
  mounted() {
    this.setDefaults();
    this.getRegion();
    this.init().then(() => {
      this.searchCity();
    });
  }
};
</script>
<style lang="scss" scoped>
#map-container {
  margin-top: 20px;
  min-width: 100%;
  min-height: 500px;
}
.info-row {
  font-size: 0;
  display: flex;
  &-label,
  &-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  &-label {
    color: #778899;
    white-space: nowrap;
    & > span {
      width: 4.3em;
      text-align: right;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      display: inline-block;
    }
  }
  &-content {
    padding-left: 2px;
    width: calc(100% - 1em - 4.3em);
    font-weight: bold;
    word-break: break-all;
    color: #23313f;
    & > img {
      height: 20px;
      display: block;
    }
  }
  &.two-cols {
    .info-row-content {
      width: calc(50% - 3.2em - 4.3em);
    }
  }
}
.el-form-item {
  display: flex;
}
::v-deep .el-form-item__content {
  width: calc(100% - 125px);
  display: flex;
}
.el-select + .el-select {
  margin-left: 11px;
}
::v-deep .el-input {
  width: 100%;
}
.info-row-label {
  padding-left: 22px;
  padding-right: 10px;
  & > span {
    width: 4em;
  }
  &:after {
    display: none;
  }
}
.el-button {
  line-height: 14px;
  height: 14px;
  box-sizing: content-box;
}
</style>