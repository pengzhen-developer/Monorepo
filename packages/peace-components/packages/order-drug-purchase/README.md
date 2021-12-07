## PeaceOrderDrugPruchase 组件

### 基础用法 - 使用数据源渲染组件

```vue
<template>
  <PeaceOrderDrugPruchase v-bind:data="currentPurchase" v-on:viewPres="viewPres"></PeaceOrderDrugPruchase>
</template>

<script>
import { PeaceOrderDrugPruchase } from 'peace-components'

export default {
  components: {
    PeaceOrderDrugPruchase
  },

  data() {
    return {
      currentPurchase: {}
    }
  },

  methods: {
    // 查看处方（购药订单子组件触发,处方详情子组件触发）
    viewPres(param) {
      //去获取处方详情
      return this.getPrescriptionDetail(param.ids)
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
  <PeaceOrderDrugPruchase v-bind:data="fetch" v-on:viewPres="viewPres"></PeaceOrderDrugPruchase>
</template>

<script>
import { PeaceOrderDrugPruchase } from 'peace-components'

export default {
  components: {
    PeaceOrderDrugPruchase
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
  <PeaceOrderDrugPruchase v-bind:data="fetch" v-on:viewPres="viewPres"></PeaceOrderDrugPruchase>
</template>

<script>
import { PeaceOrderDrugPruchase } from 'peace-components'

export default {
  components: {
    PeaceOrderDrugPruchase
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

| 参数     | 说明                     | 类型                                       | 可选值 | 默认值 |
| -------- | ------------------------ | ------------------------------------------ | ------ | ------ |
| data     | 数据源、获取数据源的函数 | object / promise function / async function |        | —      |
| viewPres | 点击回调                 | function                                   |        | -      |
