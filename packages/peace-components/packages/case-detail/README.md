## 病历详情

### 基础用法 - 使用数据源渲染组件

```vue
<template>
  <PeaceCaseDetail v-bind:data="data"></PeaceCaseDetail>
</template>

<script>
import { PeaceCaseDetail } from 'peace-components'

export default {
  components: {
    PeaceCaseDetail
  },

  data() {
    return {
      data: {}
    }
  }
}
</script>
<style></style>
```

### 基础用法 - 使用数据源获取函数（promise）渲染组件

数据源获取函数必须是一个 promise function，数据源使用 promise resolve 的值

```vue
<template>
  <PeaceCaseDetail v-bind:data="fetch"></PeaceCaseDetail>
</template>

<script>
import { PeaceCaseDetail } from 'peace-components'

export default {
  components: {
    PeaceCaseDetail
  },

  methods: {
    fetch() {
      return axios.get().then((res) => {
        return res.data
      })
    }
  }
}
</script>
<style></style>
```

### 基础用法 - 使用数据源获取函数（async、await）渲染组件

数据源获取函数必须是一个 async function，数据源使用 await 的值

```vue
<template>
  <PeaceCaseDetail v-bind:data="fetch"></PeaceCaseDetail>
</template>

<script>
import { PeaceCaseDetail } from 'peace-components'

export default {
  components: {
    PeaceCaseDetail
  },

  methods: {
    async fetch() {
      const params = {}
      const res = await axios.get(params)

      return res.data
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
