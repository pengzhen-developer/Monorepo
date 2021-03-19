<template>
  <div class="layout-route">
    <div class="text-center q-mb-md">
      <el-button-group>
        <el-button v-on:click="changeActive('常用药品')"
                   v-bind:type="activeTheme('常用药品')">常用药品</el-button>
        <el-button v-on:click="changeActive('常用处方')"
                   v-bind:type="activeTheme('常用处方')">常用处方</el-button>
      </el-button-group>
    </div>

    <Component class="card"
               v-bind:is="componentInstance"></Component>
  </div>
</template>

<script>
import Service from './../service'

import CommonlyDrugList from './CommonlyDrugList'
import CommonlyPrescriptionList from './CommonlyPrescriptionList'

const componentInstanceMap = {
  ['常用药品']: CommonlyDrugList,
  ['常用处方']: CommonlyPrescriptionList
}

export default {
  props: {
    type: {
      type: String,
      default() {
        return '常用药品'
      }
    }
  },

  provide() {
    return {
      provideDrugFrequencyList: () => {
        return this.drugFrequencyList
      },

      provideDrugRouteList: () => {
        return this.drugRouteList
      }
    }
  },

  data() {
    return {
      componentInstanceMap,

      activeType: null,

      drugFrequencyList: [],
      drugRouteList: []
    }
  },

  computed: {
    docInfo() {
      return this.$store.state.user?.userInfo?.list?.docInfo || {}
    },

    componentInstance() {
      return componentInstanceMap[this.activeType]
    }
  },

  created() {
    this.getDictionary()
    this.setPropsToModel()
  },

  methods: {
    getDictionary() {
      const params = {
        hospitalId: this.docInfo.netHospital_id
      }

      Service.drugFrequencyList(params).then((res) => {
        this.drugFrequencyList = res.data
      })
      Service.drugUsageList(params).then((res) => {
        this.drugRouteList = res.data
      })
    },

    setPropsToModel() {
      this.activeType = this.type ?? '我的处方'
    },

    activeTheme(label) {
      if (this.activeType === label) {
        return 'primary'
      }
    },

    changeActive(label) {
      this.activeType = label
    }
  }
}
</script>

<style>
</style>