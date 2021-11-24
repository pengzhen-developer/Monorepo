<template>
  <div class="q-mx-20 column"
       v-if="patientInfo.hisPatientId">

    <div class="q-mt-30 q-mb-12">
      <el-button type="primary"
                 v-on:click="sendRecipe">开具新处方</el-button>
    </div>

  </div>

</template>

<script>
import { mutations, store } from './../store'
import Service from '../service/index'
export default {
  inject: ['provideGetTab', 'provideAddTab'],

  data() {
    return {}
  },

  computed: {
    patientInfo() {
      return store.activeRegisterPatient
    }
  },

  methods: {
    sendRecipe() {
      const params = this.patientInfo
      Service.getRegisterPatientRegDetail(params).then((res) => {
        if (res.data.isComplete) {
          mutations.setGotoMakeRecipePatient(res.data)
          mutations.setShowWriteRecipe(true)
        } else {
          mutations.setShouldAddPatient(res.data.patientInfo)
          mutations.setShowAddPatient(true)
        }
      })
    }
  }
}
</script>

<style>
</style>
