<template>
  <div class="layout-route">
    <div class="tab-menu row">

      <div v-for="(item, index) in source.DRUG_ATTRIBUTE"
           v-bind:key="index"
           v-on:click="handleClick(source.DRUG_ATTRIBUTE[index])"
           v-bind:class="{ active: activeName === source.DRUG_ATTRIBUTE[index], normal: activeName !== source.DRUG_ATTRIBUTE[index] }">
        {{ source.DRUG_ATTRIBUTE[index] }}
      </div>

    </div>
    <div>
      <basicDrug v-show="activeName === source.DRUG_ATTRIBUTE[0]"></basicDrug>
      <antimicrobialAgents v-show="activeName === source.DRUG_ATTRIBUTE[1]"></antimicrobialAgents>
      <maJingDrugs v-show="activeName === source.DRUG_ATTRIBUTE[2]"></maJingDrugs>
      <injectableDrugs v-show="activeName === source.DRUG_ATTRIBUTE[3]"></injectableDrugs>
      <monitoringDrug v-show="activeName === source.DRUG_ATTRIBUTE[4]"></monitoringDrug>
      <otherAttributes v-show="activeName === source.DRUG_ATTRIBUTE[5]"></otherAttributes>
      <classificationPharmacology v-show="activeName === source.DRUG_ATTRIBUTE[6]"></classificationPharmacology>
    </div>
  </div>
</template>

<script>
import CONSTANT from './../constant'

export default {
  data() {
    return {
      loading: true,
      activeName: '基本药物',
      source: {
        DRUG_ATTRIBUTE: CONSTANT.DRUG_ATTRIBUTE
      }
    }
  },
  components: {
    basicDrug: () => import('./components/basicDrugs'),
    antimicrobialAgents: () => import('./components/antimicrobialAgents'),
    maJingDrugs: () => import('./components/maJingDrugs'),
    injectableDrugs: () => import('./components/injectableDrugs'),
    monitoringDrug: () => import('./components/monitoringDrug'),
    otherAttributes: () => import('./components/otherAttributes'),
    classificationPharmacology: () => import('./components/classificationPharmacology')
  },
  methods: {
    handleClick(title) {
      if (this.activeName != title) {
        this.activeName = title
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-menu div {
  padding: 9px 42px;
  margin-right: 8px;
  cursor: pointer;
}

.active {
  background: white;
  color: var(--q-color-primary);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.normal {
  background: #efefef;
  border: none;
}
</style>