<template>
  <div class="q-px-md">
    <div class="flex items-start row q-col-gutter-x-md">
      <div class="q-mb-md"
           style="max-width: 240px;"
           v-for="pharmacy in pharmacyList"
           v-bind:key="pharmacy.DrugStoreId">
        <q-card>
          <q-card-section style="min-height: 140px; min-width: 200px;"
                          class="flex justify-center items-center">
            <el-image style="height: 100px; width: 100%;"
                      v-bind:src="pharmacy.DisplayImg"
                      v-bind:preview-src-list="[pharmacy.DisplayImg]">
            </el-image>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center"
                          style="min-height: 40px;">
            <span> {{ pharmacy.DisplayName }} </span>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },

  computed: {
    pharmacyList() {
      return this.data
    }
  }
}
</script>

<style>
</style>