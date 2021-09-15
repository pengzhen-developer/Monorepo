<template>
  <div class="fixed-center text-center">
    <p>
      <img v-bind:src="require('@src/assets/img/sad.svg')"
           style="width:30vw;max-width:150px;">
    </p>
    <p class="text-faded">
      对不起, 暂时没有权限访问...<strong>(403)</strong>
    </p>
    <q-btn color="secondary"
           style="width:200px;"
           to="/"
           label="Go back" />
  </div>
</template>

<script >
export default {
  name: 'Error404'
}
</script>
