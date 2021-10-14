<template>
  <div class="row col info-item">
    <span :class="{ active: isDiff,  'label': true }">特色医疗</span>
    <div class="full-width column">
      <div class="col honor-layout" v-for="item in value" v-bind:key="item.id">

        <span class="honor-title">{{ item.departmentName }}</span>

        <div class="row q-mt-12">
          <span class="value q-mb-4" style="width: 25%" v-for="tmp in item.institutionDepartmentVOList" v-bind:key="tmp.id">{{ tmp.departmentName }} </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    preValue: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    isDiff() {
      if ((JSON.stringify([]) === JSON.stringify(this.preValue))) {
        return false
      }
      return !(JSON.stringify(this.value) === JSON.stringify(this.preValue))
    }
  }
}
</script>

<style lang="scss" scoped>

.info-item {
  flex-wrap: nowrap;  //强制标题不换行
}

.honor-title {
  font-size: 14px;
  color: var(--q-color-primary);
  line-height: 22px;
}

//.honor-layout:not(:first-child) {
//  margin-top: 24px;
//}

.label {
  font-size: 14px;
  color: #333333;
  line-height: 22px;
  white-space: nowrap;
  &::after {
    content: '：';
  }
}

.active {
  color: #ff3a30;
}

.value {

  &::before {
    content: '•';
    margin-right: 8px;
  }

  font-size: 14px;
  color: #666666;
  line-height: 22px;
}
</style>
