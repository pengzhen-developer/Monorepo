
 <template>
  <div class="flex full-width">
    <div class="layout-route full-width">

      <div v-bind:class="classObject">
        <div class="bg-white q-pl-lg q-pt-lg"
             v-if="history.length > 1">
          <el-button type="primary"
                     plain
                     class="q-mb-lg"
                     v-on:click="back">
            <div class="q-px-md q-py-sm">
              <i class="el-icon-arrow-left"></i>
              <span>返回上一页</span>
            </div>
          </el-button>
        </div>

        <Component v-bind:is="ComponentInstance"
                   v-bind:data="data"></Component>
      </div>
    </div>
  </div>
</template>

<script>
import Peace from '@src/library'
import WareHouseInfo from './components/WareHouseInfo'
import PharmacyList from './components/PharmacyList'
import PharmacyDetail from './components/PharmacyDetail'
import CommodityDetail from './components/CommodityDetail'

const componentMap = {
  ['WareHouseInfo']: WareHouseInfo,
  ['PharmacyList']: PharmacyList,
  ['PharmacyDetail']: PharmacyDetail,
  ['CommodityDetail']: CommodityDetail
}

const componentClassMap = {
  ['WareHouseInfo']: {
    ['full-height']: true,
    ['bg-white']: true
  },
  ['PharmacyList']: {},
  ['PharmacyDetail']: {
    ['full-height']: true,
    ['bg-white']: true
  },
  ['CommodityDetail']: {}
}

export default {
  provide() {
    return {
      provideGoTo: this.goto
    }
  },
  data() {
    return {
      history: [],
      data: { custcode: Peace.cache.sessionStorage.get('10534-custcode') }
    }
  },
  computed: {
    role() {
      return Peace.cache.sessionStorage.get('10534-role')
    },

    classObject() {
      const componentKey = this.history[this.history.length - 1]

      return componentClassMap[componentKey]
    },

    ComponentInstance() {
      const componentKey = this.history[this.history.length - 1]

      return componentMap[componentKey]
    }
  },
  created() {
    if (this.role == 3) {
      this.history.push('WareHouseInfo')
    } else {
      this.history.push('PharmacyList')
    }
  },
  methods: {
    goto(view, params) {
      this.data = params
      this.history.push(view)
    },

    back() {
      this.history.splice(this.history.length - 1, 1)
      this.data = { custcode: Peace.cache.sessionStorage.get('10534-custcode') }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button--mini,
.el-button--mini.is-round {
  padding: 1px 4px !important;
}
</style>
