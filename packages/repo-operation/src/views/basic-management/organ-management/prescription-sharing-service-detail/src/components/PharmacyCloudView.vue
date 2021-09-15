<template>
  <div class="q-px-md">
    <div class="flex items-start row q-col-gutter-x-md"
         v-for="item in data"
         v-bind:key="item.WarehouseName">
      <div class="q-mb-md"
           style="max-width: 240px;">
        <q-card>
          <q-card-section style="min-height: 140px; min-width: 200px;padding:0;"
                          class="flex justify-center items-center">
            <el-image style="width: 100%; height: 100%;position: absolute;"
                      v-bind:src="item.Image"
                      v-bind:preview-src-list="[item.Image]">
            </el-image>
          </q-card-section>

          <q-card-actions align="center"
                          style="min-height: 40px;">
            <span> {{item.Name}}</span>
          </q-card-actions>
        </q-card>
      </div>

      <div>
        <q-card>
          <q-card-section class="
                          bg-white
                          flex
                          items-center">
            <div class="bg-primary q-pa-sm q-mr-md"
                 style="border-radius: 5px;">
              <q-icon class="text-white text-h5"
                      name="home"></q-icon>
            </div>

            <span>{{item.WarehouseName}}</span>
          </q-card-section>
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

  computed: {}
}
</script>

<style  lang="scss" scoped>
.q-card {
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.05) !important;
  opacity: 1 !important;
}
</style>