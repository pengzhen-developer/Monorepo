<template>
  <div class="session-list-item flex column cursor-pointer q-py-md q-px-sm"
       v-bind:class="{ active: this.active }">
    <div class="flex justify-between items-baseline q-mb-sm">
      <div class="flex column">
        <span class="q-mr-md text-bold"> {{ patient.name }} </span>
        <span class="q-mr-sm text-caption">挂号日期：{{ patient.regDate }} </span>
      </div>

      <div>
        <el-tag effect="plain"
                class="tag-style">{{ '开处方' }}</el-tag>
      </div>
    </div>

    <!-- <div class="full-width q-mb-md text-caption ellipsis"
         style="max-height: 24px;"> -->
    <!-- <span></span>
  </div> -->
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
    patient: Object
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.session-list-item {
  border-bottom: 1px solid #efefef;

  &.active {
    background: #f4f4f4;
  }
}

.tag-style {
  background: #e3f0f0;
  color: var(--q-color-primary);
  border-radius: 20px;
  border-color: var(--q-color-primary);
}
</style>
