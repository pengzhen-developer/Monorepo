<template>
  <div>
    <div class="layout-route"
         v-bind:style="scrollAreaStyle">
      <div class="card content">
        <div class="province-list">
          <div :class="{ 'actived': province.isActived }"
               :key="province.area_id"
               @click="getAreaList(province)"
               class="province-list-item"
               v-for="province in region.region">{{ province.area_name }}</div>
        </div>

        <div class="area-list"
             v-if="areaList && areaList.length">
          <el-collapse accordion
                       v-model="activeNames">
            <el-collapse-item :key="'city_' + city.area_id"
                              :name="city.area_id"
                              :title="city.area_name"
                              v-for="city in areaList">
              <div :key="'area_' + area.area_id"
                   class="item"
                   v-for="area in city.children">{{ area.area_name }}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { dom } from 'quasar'

export default {
  name: 'AreaDictionary',
  data() {
    return {
      areaList: [],
      activeNames: [],
      scrollAreaStyle: {}
    }
  },
  computed: {
    ...mapState(['region'])
  },
  methods: {
    ...mapActions(['getRegion']),
    getAreaList(item) {
      const id = item.area_id
      const list = this.region.region

      list.forEach((item) => {
        item.isActived = false
        if (item.area_id === id) {
          this.areaList = item.children
          this.activeNames = [item.children[0].area_id]
        }
      })

      item.isActived = true
    },

    setScrollAreaStyle() {
      const offset = dom.offset(this?.$el)

      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - offset?.top}px`
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      if (!this.region.region || !this.region.region.length) {
        this.getRegion().then((region) => {
          this.getAreaList(region[0])
        })
      }
      // 设定滚动区域样式
      this.setScrollAreaStyle()
    })
  }
}
</script>
<style lang="scss" scoped>
.content {
  margin-top: 0;
  height: 100%;
}
.province-list,
.area-list {
  height: 100%;
  border-radius: 4px;
  display: inline-block;
  vertical-align: top;
  overflow: auto;
}
.province-list {
  padding: 10px 0;
  width: 200px;
  border: 1px solid #eee;
  &-item {
    line-height: 40px;
    text-align: center;
    &:hover {
      background: #fafafa;
      cursor: pointer;
    }
    &.actived {
      color: var(--q-color-primary);
      background-color: #f1fdfc;
    }
  }
}
.area-list {
  margin-left: 20px;
  padding: 20px;
  width: calc(100% - 220px);
  border: 1px solid var(--q-color-primary);
  .el-collapse {
    border: 0;
  }
  ::v-deep .el-collapse-item__header {
    position: relative;
    padding: 10px 15px;
    height: auto;
    text-align: center;
    justify-content: center;
    line-height: 20px;
    font-weight: normal;
    font-weight: 400;
    border: 0;
    background-color: #f5f7fa;
    ::v-deep .el-collapse-item__arrow {
      position: absolute;
      right: 10px;
    }
  }
  ::v-deep .el-collapse-item__content {
    padding: 5px 15px;
    font-size: 0;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 33.333333%;
      font-size: 14px;
      line-height: 40px;
      display: inline-block;
      cursor: pointer;
      &:hover {
        background-color: #fbfbfb;
      }
    }
  }
  ::v-deep .el-collapse-item__wrap {
    border-bottom: 0;
  }
}
</style>
