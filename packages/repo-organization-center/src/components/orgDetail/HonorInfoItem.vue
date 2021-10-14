<template>
  <div class="row col info-item">
    <span :class="{ active: isDiff,  'label': true }">机构荣誉</span>
    <div class="full-width">
      <div class="col honor-layout" v-for="item in value" v-bind:key="item.honorWord">

        <div class="honor-title q-mb-12" type="primary">
          <el-image style="width: 16px; height:16px; margin-right: 8px" v-bind:src="require('@src/assets/img/icon_jb.png')" alt=""/>
          <span> {{ item.honorWord }} </span>
        </div>

        <div class="row">
          <span class="value q-mb-4" style="width: 50%" v-for="tmp in item.institutionHonorVOList" v-bind:key="tmp.id">{{ tmp.honorWord }} </span>
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
        let tmp = item.institutionHonorVOList ?? []
        let tmpArray = tmp.map((i) => {
          return {name: i.honorWord}
        })
        return {
          name: item.honorWord,
          child: tmpArray
        }
      })

      const oldTmp = this.preValue.map((item) => {
        let tmp = item.institutionHonorVOList ?? []
        let tmpArray = tmp.map((i) => {
          return {name: i.honorWord}
        })
        return {
          name: item.honorWord,
          child: tmpArray
        }
      })

      return (JSON.stringify(tmp) !== JSON.stringify(oldTmp))
    }
  }
}
</script>

<style lang="scss" scoped>

.info-item {
  flex-wrap: nowrap;  //强制标题不换行
}

.honor-title {
  border: none;
  color: #333333;
  width: 88px;
  height: 32px;
  background: rgba(24,144,255,0.05);
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &.span {
    line-height: 16px;
  }
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
