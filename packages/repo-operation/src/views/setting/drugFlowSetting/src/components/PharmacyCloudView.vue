<template>
  <div class="q-px-md">
    <div class="flex items-start row q-col-gutter-x-md">

      <div v-if="data.name"
           class="col-3 col-lg-2 q-mb-md">
        <q-card>
          <q-card-section class="flex justify-center items-center bg-light-blue-1">
            <q-icon class="text-primary text-h1"
                    name="account_balance"></q-icon>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center"
                          style="min-height: 40px;">
            <span> {{ data.name }} </span>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-3"
           v-if="data.store">
        <q-card>
          <q-card-section class="bg-white flex items-center">
            <div class="bg-primary q-pa-sm q-mr-md"
                 style="border-radius: 5px;">
              <q-icon class="text-white text-h5"
                      name="home"></q-icon>
            </div>

            <span>{{ data.store }}</span>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { IPharmacyCloud } from './../model/IPharmacyCloud'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return new IPharmacyCloud()
      }
    }
  }
}
</script>

<style>
</style>