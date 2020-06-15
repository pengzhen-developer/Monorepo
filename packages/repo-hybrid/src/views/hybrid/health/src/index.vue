<template>
  <div class="q-pb-md">
    <q-tabs narrow-indicator
            class="q-mt-sm"
            dense
            align="justify"
            active-color="primary"
            v-model="tab">
      <q-tab v-bind:ripple="false"
             name="检查结果"
             label="检查结果" />
      <q-tab v-bind:ripple="false"
             name="基本信息"
             label="基本信息" />
    </q-tabs>

    <q-tab-panels v-model="tab"
                  animated
                  transition-prev="jump-up"
                  transition-next="jump-up">
      <q-tab-panel class="q-pa-none"
                   name="检查结果">
        <Component1></Component1>
      </q-tab-panel>
      <q-tab-panel class="q-pa-none"
                   name="基本信息">
        <Component2></Component2>
      </q-tab-panel>
    </q-tab-panels>
  </div>

</template>

<script>
export default {
  components: {
    Component1: () => import('./components/Component1'),
    Component2: () => import('./components/Component2')
  },

  data() {
    return {
      tab: '检查结果'
    }
  }
}
</script>

<style>
</style>