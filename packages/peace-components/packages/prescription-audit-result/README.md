## 处方 - 审方结果

### 基础用法 - 使用数据源渲染组件

```vue
<template>
  <PeacePrescriptionAuditResult v-bind:data="data"></PeacePrescriptionAuditResult>
</template>

<script>
import { PeacePrescriptionAuditResult } from 'peace-components'

export default {
  components: {
    PeacePrescriptionAuditResult
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
