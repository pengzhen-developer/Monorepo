## 网易云信聊天记录详情

- 兼容 IM Socket
- 兼容 PHP

### 基础用法 - 使用数据源渲染组件

```vue
<template>
  <PeaceIMMessageHistory v-bind:data="data" v-bind:messageFlowIn="messageFlowIn" v-bind:messageFlowOut="messageFlowOut"><PeaceIMMessageHistory>
</template>

<script>
import { PeaceIMMessageHistory } from 'peace-components'

export default {
  components: {
    PeaceIMMessageHistory
  },

  data() {
    return {
      data: {},
      messageFlowIn: {},
      messageFlowOut: {}
    }
  }
}
</script>
<style></style>
```

### Attributes

| 参数           | 说明             | 类型   | 可选值 | 默认值 |
| -------------- | ---------------- | ------ | ------ | ------ |
| data           | 数据源           | Array  |        | —      |
| messageFlowIn  | 接收者的消息明细 | Object |        | —      |
| messageFlowOut | 发送者的消息明细 | Object |        | —      |
| messagaSystem  | 系统消息编码     | Array  |        | —      |
