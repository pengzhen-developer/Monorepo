<template>
  <div class="el-form element-ui-default">
    <div :class="[ formSize ? 'el-form-item--' + formSize : '',
      !defaultText ? 'mb-none' : '' ]"
         class="el-form-item">
      <label class="el-form-item__label"
             v-if="provinceText">{{ provinceText }}</label>
      <div :class="{ 'full-width': !provinceText }"
           class="el-form-item__content">
        <el-select :clearable="clearable"
                   :disabled="disabled"
                   @change="setProvince(province, true)"
                   placeholder="省"
                   v-model="province">
          <el-option :key="province.area_id"
                     :label="province.area_name"
                     :value="province.area_id"
                     v-for="province in region"></el-option>
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
                   @change="setCity(city, true)"
                   placeholder="市"
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
         class="el-form-item">
      <label class="el-form-item__label"
             v-if="areaText">{{ areaText }}</label>
      <div :class="{ 'full-width': !areaText }"
           class="el-form-item__content">
        <el-select :clearable="clearable"
                   :disabled="disabled"
                   @change="setArea(area, true)"
                   placeholder="区"
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
 * @param {String, Boolean} defaultRegion 默认选中省市区
 * @param {String} formSize el-form 尺寸
 * @function provinceChange
 * @function cityChange
 * @function areaChange
 */
import Service from '../service'

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
    defaultRegion: {
      type: Array,
      default: () => ['', '', '']
    },
    defaultText: {
      type: [String, Boolean],
      default: '省-市-区'
    },
    formSize: {
      type: String,
      default: 'mini'
    },
    provinceChange: {
      type: Function
    },
    cityChange: {
      type: Function
    },
    areaChange: {
      type: Function
    }
  },
  data() {
    return {
      province: '',
      city: '',
      area: '',
      region: [],
      citys: [],
      areas: [],
      debounce: ''
    }
  },
  computed: {
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
    defaultRegion: {
      handler(region) {
        this.init(region)
      },
      immediate: true
    }
  },
  async created() {
    await this.getRegion()
  },
  methods: {
    init(region) {
      if (this.region.length === 0) {
        this.getRegion().then(() => {
          if (region[0]) {
            this.setProvince(region[0]).then(() => {
              if (region[1]) {
                this.setCity(region[1]).then(() => {
                  this.setArea(region[2])
                })
              }
            })
          }
        })
      } else {
        if (region[0]) {
          this.setProvince(region[0]).then(() => {
            if (region[1]) {
              this.setCity(region[1]).then(() => {
                this.setArea(region[2])
              })
            }
          })
        }
      }
    },
    // 获取省市区数据
    getRegion() {
      return new Promise((resolve) => {
        Service.getRegion().then((res) => {
          this.region = res.data.list
          resolve(this.region)
        })
      })
    },
    /**
     * 设置省
     * province 所选省份
     * selectFocus 是否是手动选择
     */
    setProvince(province, selectFocus) {
      this.province = province
      return this.getCitys(province, selectFocus)
    },
    // 设置市
    setCity(city, selectFocus) {
      this.city = city
      return this.getAreas(city, selectFocus)
    },
    // 设置区
    setArea(area, selectFocus) {
      this.area = area
      if (selectFocus) {
        this.$emit('areaChange', area)
      }
    },
    // 根据省获取市
    getCitys(_province, selectFocus) {
      let province = _province
      let list = this.region

      if (!province) {
        this.citys = []
        this.city = ''
        this.areas = []
        this.area = ''
        return Promise.reject(`省份 ${province} 不存在`)
      }

      if (selectFocus) {
        this.$emit('provinceChange', province)
      }

      for (let [i, len] = [0, list.length]; i < len; i += 1) {
        const element = list[i]
        if (element.area_id == province || element.area_name == province) {
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
    getAreas(_city, selectFocus) {
      const list = this.citys
      const city = _city

      if (!city) {
        this.areas = []
        this.area = ''
        return Promise.reject(`城市 ${city} 不存在`)
      }

      if (selectFocus) {
        this.$emit('cityChange', city)
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
      return this.getNameById(this.region, this.province)
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

.el-form-item {
  margin-right: 12px;
  margin-bottom: 0;
  &:last-child {
    margin-right: 0px;
  }
}
</style>
