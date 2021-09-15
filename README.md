# 智药云 - 前端

使用 Mono-repo 架构，组织项目结构

使用 @vue/cli 生成模板

## 如何启动/部署项目

- 在根目录，通过 workspace 指向工作区，使用脚本启动

```bash
# 开发
yarn workspace repo-doctor serve

# 打包
yarn workspace repo-doctor build
```

- 在工作区，使用脚本启动

```bash
cd packages\repo-doctor

# 开发
yarn serve

# 开发
yarn build
```
