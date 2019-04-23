# peace

## 项目说明

## 目录结构

- public

- src

- .browserslistrc

  browserslist 是在不同的前端工具之间共用目标浏览器和 node 版本的配置工具，所有的工具将自动的查找当前工程规划的目标浏览器范围

- env.[dev / prod / test]

  用于在构建模式下的环境变量配置，可依据不同环境进行不同模式的构建配置

  ```shell
  vue-cli-service build --mode prod (env.prod 配置会覆盖默认配置)
  ```

- .eslintrc.js

  eslint 一款 Lint 工具，用于预先指定规范，辅助产出风格统一的代码。

  .eslintrc.js 是其配置文件

- .gitignore

* babel.config.js

  Babel 是一个 JavaScript 编译器，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

  babel.config.js 是其配置文件

* package-lock.json

  package-lock.json 是在 `npm install`时候生成一份文件，用以记录当前状态下实际安装的各个 npm package 的具体来源和版本号

* package.json

  用于描述项目和模块

* postcss.config.js

  PostCSS 是一款插件集合，例如大名鼎鼎的 **Autoprefixer** 则是 PostCSS 的一款插件

  postcss.config.js 是其配置文件

* README.md

  项目说明文件

* vue.config.js

  项目是基于 [Vue CLI 3.x](https://cli.vuejs.org/guide/)生成的

  详情请查看 [GitHub](https://github.com/vuejs/vue-cli)

  vue.config.js 是其配置文件

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
