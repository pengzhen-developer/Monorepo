<template>
  <div class="q-px-md">
    <div class="row q-col-gutter-x-md">
      <div class="col-3 col-lg-2 q-mb-md"
           v-for="pharmacy in data"
           v-bind:key="pharmacy.name">
        <q-card>
          <q-card-section class="bg-primary">
            <q-img v-bind:src="pharmacy.image"
                   style="height: 100px;"></q-img>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center"
                          style="min-height: 40px;">
            <span> {{ pharmacy.name }} </span>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
</style>