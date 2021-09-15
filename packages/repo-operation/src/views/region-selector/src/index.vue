<template>
  <div class="el-form">
    <div :class="[ formSize ? 'el-form-item--' + formSize : '',
      !defaultText ? 'mb-none' : '' ]"
         class="el-form-item">
      <label class="el-form-item__label"
             v-if="provinceText">{{ provinceText }}</label>
      <div :class="{ 'full-width': !provinceText }"
           class="el-form-item__content">
        <el-select :clearable="clearable"
                   :disabled="disabled"
                   @change="getCitys"
                   v-model="province">
          <el-option :key="province.area_id"
                     :label="province.area_name"
                     :value="province.area_id"
                     v-for="province in regions.region"></el-option>
        </el-select>
      </div>
    </div>
    <div :class="[ formSize ? 'el-form-item--' + formSize : '' ,
      !defaultText ? 'mb-none' : '' ]"
         class="el-form-item">
      <label class="el-form-item__label"
             v-if="cityText">{{ cityText }}</label>
      <div :class="{ 'full-width': !cityText }"
           class="el-form-item__content">
        <el-select :clearable="clearable"
                   :disabled="disabled"
                   @change="getAreas(city, citys, true)"
                   v-model="city">
          <el-option :key="city.area_id"
                     :label="city.area_name"
                     :value="city.area_id"
                     v-for="city in citys"></el-option>
        </el-select>
      </div>
    </div>
    <div :class="[ formSize ? 'el-form-item--' + formSize : '' ,
      !defaultText ? 'mb-none' : '' ]"
         class="el-form-item"
         v-if="defaultArea !== false">
      <label class="el-form-item__label"
             v-if="areaText">{{ areaText }}</label>
      <div :class="{ 'full-width': !areaText }"
           class="el-form-item__content">
        <el-select :clearable="clearable"
                   :disabled="disabled"
                   v-model="area">
          <el-option :key="area.area_id"
                     :label="area.area_name"
                     :value="area.area_id"
                     v-for="area in areas"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 组件传入 Props
 * @param {Boolean} clearable 快速清空选中项
 * @param {Boolean} disabled 禁用
 * @param {String, Boolean} defaultProvince 默认选中省份
 * @param {String, Boolean} defaultCity 默认选中城市
 * @param {String, Boolean} defaultArea 默认选中区域
 * @param {String} formSize el-form 尺寸
 * @function cityChange
 */
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RegionSelector',
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: true
    },
    defaultProvince: {
      type: [String, Boolean]
    },
    defaultCity: {
      type: [String, Boolean]
    },
    defaultArea: {
      type: [String, Boolean]
    },
    defaultText: {
      type: [String, Boolean],
      default: '省份：-城市：-区域：'
    },
    formSize: {
      type: String,
      default: 'mini'
    },
    cityChange: {
      type: Function
    }
  },
  data() {
    return {
      province: this.selected ? this.defaultProvince : '',
      city: this.selected ? this.defaultCity : '',
      area: this.selected ? this.defaultArea : '',
      citys: [],
      areas: [],
      debounce: ''
    }
  },
  computed: {
    ...mapState({
      regions: (state) => state.region
    }),
    provinceText() {
      if (this.defaultText) {
        return this.defaultText.split('-')[0]
      }
      return false
    },
    cityText() {
      if (this.defaultText) {
        return this.defaultText.split('-')[1]
      }
      return false
    },
    areaText() {
      if (this.defaultText) {
        return this.defaultText.split('-')[2]
      }
      return false
    }
  },
  watch: {
    defaultProvince(selected) {
      if (selected) {
        this.province = selected
        this.setRegions()
      }
    },
    defaultCity(selected) {
      if (selected) {
        this.city = selected
        this.setRegions()
      }
    },
    defaultArea(selected) {
      if (selected) {
        this.area = selected
        this.setRegions()
      }
    }
  },
  methods: {
    ...mapActions({
      getRegion: 'getRegion'
    }),
    // 同时设置省市区
    setRegions() {
      if (this.debounce) clearTimeout(this.debounce)
      const _pro = this.province
      const _city = this.city
      const _area = this.area

      this.debounce = setTimeout(() => {
        this.getCitys(_pro).then(() => {
          this.city = _city
          this.getAreas(_city).then(() => {
            this.area = _area
          })
        })
      }, 0)
    },
    getCitys(_province, _list) {
      const list = _list || this.regions.region
      const province = _province || this.province

      if (!province) {
        this.citys = []
        this.city = ''
        this.areas = []
        this.area = ''
        return
      }

      for (let [i, len] = [0, list.length]; i < len; i += 1) {
        const element = list[i]
        if (element.area_id === province || element.area_name === province) {
          const citys = element.children
          this.citys = citys
          this.city = ''
          this.areas = []
          this.area = ''
          return Promise.resolve(citys)
        }
      }
      return Promise.reject(`省份 ${province} 不存在`)
    },
    getAreas(_city, _list, selectFocus) {
      if (selectFocus) {
        this.$emit('cityChange', _city)
      }
      const list = _list || this.citys
      const city = _city || this.city

      if (!city) {
        this.areas = []
        this.area = ''
        return
      }

      for (let [i, len] = [0, list.length]; i < len; i += 1) {
        const element = list[i]
        if (element.area_id === city || element.area_name === city) {
          const areas = element.children
          this.areas = areas
          this.area = ''
          return Promise.resolve(areas)
        }
      }

      return Promise.reject(`城市 ${city} 不存在`)
    },
    getIdByName(list, name) {
      for (let [i, len] = [0, list.length]; i < len; i += 1) {
        const current = list[i]
        if (name.indexOf(current.area_name) !== -1) {
          return current.area_id
        }
      }
      return null
    },
    getNameById(list, id) {
      for (let [i, len] = [0, list.length]; i < len; i += 1) {
        const current = list[i]
        if (current.area_id === id) {
          return current.area_name
        }
      }
      return null
    },
    getSelectedProvinceName() {
      return this.getNameById(this.regions.region, this.province)
    },
    getSelectedCityName() {
      return this.getNameById(this.citys, this.city)
    },
    getSelectedAreaName() {
      return this.getNameById(this.areas, this.area)
    },
    getSelected() {
      const { province, city, area } = this
      return {
        province,
        city,
        area
      }
    },
    getSelectedNames() {
      const province = this.getSelectedProvinceName()
      const city = this.getSelectedCityName()
      const area = this.getSelectedAreaName()

      return { province, city, area }
    }
  },
  mounted() {
    const region = this.regions.region
    if (!region || !region.length) {
      this.getRegion().then(() => {
        if (this.selected) {
          this.setRegions()
        }
      })
    } else if (this.selected) {
      this.setRegions()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  display: inline-flex;
  vertical-align: middle;
}
.full-width {
  width: 100% !important;
}
</style>
