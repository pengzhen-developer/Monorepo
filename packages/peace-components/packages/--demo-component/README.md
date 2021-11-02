## Demo 组件

### 基础用法 - 使用数据源渲染组件

```vue
<template>
  <PeaceDemoComponent v-bind:data="data"></PeaceDemoComponent>
</template>

<script>
import { PeaceDemoComponent } from 'peace-components'

export default {
  components: {
    PeaceDemoComponent
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
  <PeaceDemoComponent v-bind:data="fetch"></PeaceDemoComponent>
</template>

<script>
import { PeaceDemoComponent } from 'peace-components'

export default {
  components: {
    PeaceDemoComponent
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
  <PeaceDemoComponent v-bind:data="fetch"></PeaceDemoComponent>
</template>

<script>
import { PeaceDemoComponent } from 'peace-components'

export default {
  components: {
    PeaceDemoComponent
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

### FAQ

Q：无法智能感知？

请检查是否添加了 .d.ts，[参考](./../../types/index.d.ts)

```javascript
import { xxx } from 'peace-components'
```

Q：样式被覆盖？

请检查是否添加了 scoped

```Vue
<style lang="scss" scoped>
</style>
```

请检查是否使用如下形式添加 css 文件

```Vue
<style scoped lang="scss" src="./index.scss">
```
