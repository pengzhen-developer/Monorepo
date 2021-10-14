<template>
  <div class="row col info-item">
    <span :class="{ active: isDiff,  'label': true }">特色医疗</span>
    <div class="full-width">
      <div v-for="item in value" v-bind:key="item.id" class="col honor-layout">

        <span class="honor-title">{{ item.departmentName }}</span>

        <div class="row q-mt-12">
          <span v-for="tmp in item.institutionDepartmentVOList" v-bind:key="tmp.id" class="value q-mb-4"
                style="width: 25%">{{ tmp.departmentName }} </span>
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

      const tmp = this.value.map((item) => {
        let tmp = item.institutionDepartmentVOList ?? []
        let tmpArray = tmp.map((i) => {
          return {name: i.departmentName}
        })
        return {
          name: item.departmentName,
          child: tmpArray
        }
      })

      const oldTmp = this.preValue.map((item) => {
        let tmp = item.institutionDepartmentVOList ?? []
        let tmpArray = tmp.map((i) => {
          return {name: i.departmentName}
        })
        return {
          name: item.departmentName,
          child: tmpArray
        }
      })

      return JSON.stringify(tmp) !== JSON.stringify(oldTmp)
    }
  }
}
</script>

<style lang="scss" scoped>

.info-item {
  flex-wrap: nowrap; //强制标题不换行
}

.honor-title {
  font-size: 14px;
  color: var(--q-color-primary);
  line-height: 22px;
}

.honor-layout:not(:first-child) {
  margin-top: 24px;
}

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
