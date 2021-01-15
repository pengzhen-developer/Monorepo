<template>
  <div class="q-px-md">
    <div class="flex items-start row q-col-gutter-x-md">
      <div class="q-mb-md"
           style="max-width: 240px;"
           v-for="item in data"
           v-bind:key="item.Name">
        <q-card>
          <q-card-section style="min-height: 140px; min-width: 200px;padding:0;"
                          class="flex justify-center items-center">
            <el-image style="height: 100%; width: 100%;position: absolute;"
                      v-bind:src="item.Image"
                      v-bind:preview-src-list="[item.Image]">
            </el-image>
          </q-card-section>

          <q-card-actions align="center"
                          style="min-height: 40px;">
            <span> {{item.Name}} </span>
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

  computed: {}
}
</script>

<style  lang="scss" scoped>
.q-card {
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.05) !important;
  opacity: 1 !important;
}
</style>