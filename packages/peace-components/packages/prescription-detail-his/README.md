## 处方详情 - HIS 专用

### 基础用法 - 使用数据源渲染组件

```vue
<template>
  <PeacePrescriptionDetailHis v-bind:data="data"></PeacePrescriptionDetailHis>
</template>

<script>
import { PeacePrescriptionDetailHis } from 'peace-components'

export default {
  components: {
    PeacePrescriptionDetailHis
  },

  data() {
    return {
      data: undefined
    }
  }
}
</script>
<style></style>
```

### Attributes

| 参数 | 说明                     | 类型                                       | 可选值 | 默认值 |
| ---- | ------------------------ | ------------------------------------------ | ------ | ------ |
| data | 数据源、获取数据源的函数 | object / promise function / async function |        | —      |
