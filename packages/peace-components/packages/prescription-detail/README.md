## 处方详情

### 基础用法 - 使用数据源渲染组件

```vue
<template>
  <PeacePrescriptionDetail v-bind:data="data"></PeacePrescriptionDetail>
</template>

<script>
import { PeacePrescriptionDetail } from 'peace-components'

export default {
  components: {
    PeacePrescriptionDetail
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

### Slots

| 参数   | 说明                                                                                                                                                             | 类型 | 可选值 | 默认值 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------ | ------ |
| footer | 自定义处方详情底部内容，参数为 { data, refetch, close }，可用于处方操作，操作完成后重新获取处方数据源。refetch、close 并不总是存在，仅提供给消息记录中的处方使用 | —    | —      | —      |

### FAQ

Q：footer slot 无法获取 refetch、close 参数

该参数仅用于 `消息记录` 组件使用，在 `消息记录` 组件内部传递，请注意实际业务是否真实需要该参数，
