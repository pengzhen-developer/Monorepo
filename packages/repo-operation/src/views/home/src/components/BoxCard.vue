<template>
  <div class="flex column border-light">

    <div class="q-mb-md title"
         v-if="$slots.title">
      <slot name="title"> Title </slot>
    </div>

    <div class="col">
      <slot name="default"> Content </slot>
    </div>

  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.border-light {
  border-radius: 5px;
  border: 2px solid rgba(26, 63, 129, 1);

  background: linear-gradient(#00faff, #00faff) left top, linear-gradient(#00faff, #00faff) left top, linear-gradient(#00faff, #00faff) right top,
    linear-gradient(#00faff, #00faff) right top, linear-gradient(#00faff, #00faff) left bottom, linear-gradient(#00faff, #00faff) left bottom,
    linear-gradient(#00faff, #00faff) right bottom, linear-gradient(#00faff, #00faff) right bottom;
  background-repeat: no-repeat;
  background-size: 2px 10px, 10px 2px;
}

.title {
  color: rgba(1, 217, 254, 1);
}
.title:before {
  content: '';
  display: inline-block;
  position: relative;
  top: 2px;
  margin-right: 10px;
  background: rgba(48, 153, 166, 1);
  width: 2px;
  height: 14px;
  border: 2px solid rgba(108, 206, 230, 1);
}
</style>