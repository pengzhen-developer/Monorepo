<template>
  <!-- q-px-md column-->
  <div class="flex  justify-center items-center full-height">
    <q-img class="cursor-pointer inline"
           style="width: 140px; height: 40px;"
           contain
           v-bind:src="require('@src/assets/logo.png')"></q-img>

    <!-- <span v-if="$q.screen.gt.sm"
          class="gt-xl inline text-subtitle1"
          style="min-width: 140px;
                       display: inline-block;
                       text-align: justify;
                       text-align-last: justify;">
      {{ title }}
    </span> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: window.configuration.application.title
    }
  }
}
</script>

<style>
</style>