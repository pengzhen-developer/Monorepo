<template>
  <div>
    <span v-if="info.Age" class="q-mr-md">年龄: {{info.Age.value1}}-{{info.Age.value2}} {{info.Age.value3 | filterDictionary(utilList,'--')}}</span>

    <span v-if="info.Gender" class="q-mr-md">性别: {{info.Gender.value1 | filterDictionary(sexList,'--')}}</span>

    <span v-if="info.Weight" class="q-mr-md">体重: {{info.Weight.value1}}-{{info.Weight.value2}}kg</span>

    <span v-if="info.WeightSize" class="q-mr-md">体重: {{info.WeightSize.value1 | filterDictionary(weightList,'--')}} {{info.WeightSize.value2}}kg</span>

   <span v-if="info.Indication" class="q-mr-md">适应症: {{IndicationMessage}}</span>

    <span v-if="info.HumanClassify" class="q-mr-md">人群: 属于 {{HumanClassifyMessage}}</span>

    <span v-if="info.Route">给药途径: {{info.Route.contain | filterDictionary(containList,'--')}} {{RouteMessage}}</span>
  </div>
</template>

<script>
export default {
  name: "PrecoditionInfos",
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  async mounted() {
    this.utilList = await Peace.identity.dictionary.getList('age_type')
    this.weightList = await Peace.identity.dictionary.getList('compare')
    this.containList = await Peace.identity.dictionary.getList('belonged_type')
    this.sexList = await Peace.identity.dictionary.getList('rule_gender')
  },
  data() {
    return {
      utilList: [],
      weightList: [],
      containList: [],
      sexList: []
    }

  },

    computed: {
      IndicationMessage() {
        return this.info.Indication.listValue.reduce(function(prev, cur) {
          return prev + cur.name + ' '
        }, '')
      },

      HumanClassifyMessage() {
        return this.info.HumanClassify.listValue.reduce(function(prev, cur) {
          return prev + cur.name + ' '
        }, '')
      },

      RouteMessage() {
        return this.info.Route.listValue.reduce(function (prev, cur) {
          return prev + cur.name + ' '
        }, '')
      }

    }



}
</script>

<style scoped>

</style>
