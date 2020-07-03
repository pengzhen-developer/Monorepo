## 利用 scp2 进行自动部署

1，新增依赖

```bash
## 跨系统设定环境变量
yarn add cross-env --save-dev

## scp
yarn add scp2 --save-dev
```

2，配置 server

```javascript
=> deploy/server.js

const server = {
 dev: {
    name: '开发环境',
    domain: 'https://**.com',
    host: '119.3.**.**',
    port: 22,
    username: 'root',
    password: '************',
    path: '/home'
  },

  test: {
    name: '测试环境',
    domain: 'https://**.com',
    host: '119.3.**.**',
    port: 22,
    username: 'root',
    password: '************',
    path: '/home'
  }
}

```

3，新增自动部署脚本

```bash
"deploy:dev": "vue-cli-service build --mode dev && cross-env NODE_ENV=dev node ./deploy",
"deploy:test": "vue-cli-service build --mode test && cross-env NODE_ENV=test node ./deploy",
```

4，执行自动部署

```bash
yarn deply:dev
```
