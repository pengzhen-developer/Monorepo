## 导入工作流

### 基础用法 - 使用数据源渲染组件

```vue
<template>
  <PeaceDialog v-if="importDialog.visible" :visible.sync="importDialog.visible" title="导入数据">
    <peace-base-import-workflow
      :actions="importDialog.actions"
      :stepsList="importDialog.stepsList"
      :templateDownloadUrl="importDialog.templateDownloadUrl"
      :templateName="importDialog.templateName"
      :downloadErrorUrl="importDialog.downloadErrorUrl"
      :maxSize="importDialog.maxSize"
      :otherData="importDialog.otherData"
      @close="closeImportDialog"
      @success="importSuccess"
    />
  </PeaceDialog>
</template>

<script>
import { PeaceBaseImportWorkflow } from 'peace-components'

export default {
  components: {
    PeaceBaseImportWorkflow
  },

  data() {
    return {
      data: {
        importDialog: {
          visible: false,
          actions: `${process.env.VUE_APP_SITE_AUDITENGINE}quake/commonRule/upload`,
          templateDownloadUrl: `${process.env.VUE_APP_SITE_AUDITENGINE}quake/commonRule/download`,
          downloadErrorUrl: `${process.env.VUE_APP_SITE_AUDITENGINE}quake`,
          templateName: '通用规则药品',
          maxSize: 5,
          otherData: { aaaa: 'aaaa' },
          stepsList: [
            {
              title: '上传文件',
              content: '请上传指定格式文件'
            },
            {
              title: '数据检验',
              content: '检查数据格式是否正确'
            },
            {
              title: '写入数据',
              content: '正在执行写入数据'
            }
          ]
        }
      }
    }
  },
  methods: {
    //导入
    importData() {
      this.importDialog.visible = true
    },
    //导入关闭
    closeImportDialog() {
      this.importDialog.visible = false
    },
    //导入成功
    importSuccess() {
      this.importDialog.visible = false
      this.get()
    }
  }
}
</script>
<style></style>
```

### Attributes

| 参数                | 说明                                                                    | 类型   | 是否必传 | 可选值 | 默认值 |
| ------------------- | ----------------------------------------------------------------------- | ------ | -------- | ------ | ------ |
| actions             | 导入接口地址                                                            | String | 是       | ---    | ---    |
| templateDownloadUrl | 模板下载地址(如果不需要显示模板下载可以不传)                            | String | 否       | ---    | ---    |
| templateName        | 模板名称(如果不需要显示模板下载可以不传)                                | String | 否       | ---    | ---    |
| maxSize             | 导入文件的大小限制                                                      | Number | 否       | ---    | 5      |
| downloadErrorUrl    | 导入错误地址下载域名,当后端返回的 errorAddress 为全路径的时候，不需要传 | String | 否       | ---    | ""     |
| stepsList           | 导入页面进度条显示的文案，一般用默认值就好。除非特别要求                | Array  | 否       | ---    | ---    |
| otherData           | 文件外的额外参数                                                        | Object | 否       | ---    | ---    |

特别说明：
//后端返回的 errorAddress 字段可能是整个错误报告全路径（不需要传入 downloadErrorUrl 字段）  
 //也可能是需要拼接域名的路径（需要传入 downloadErrorUrl 字段）

### FAQ

Q：导入成功或者失败 提示或者错误报告显示有误？

导入接口返回需要和后端沟通好固定格式：
1：导入成功 json: {"message":"导入成功，导入成功 XX 条。","code":200,"data":{}}
2：导入失败的 json 格式：

//需要下载错误报告的格式
1>{"message":"请在模板中录入数据","code":201,"data":{"errorAddress":"XXXXX" }}
//不需要下载错误报告的格式
2>{"message":"请在模板中录入数据","code":201,"data":{}}

Q:如果导入碰到问题，后端不配合怎么办，例如：后端让传入 Base64 文件？后端结构不按照前端定义的来？后端要求模板放在前端？等等

A:不妥协，要求后端按照规定的格式传参和返回，把批量导入打造成一个常用的标准组件。（合理的要求和建议可以考虑，基础规则不妥协。例如：java 的 message，.net 的 msg 兼容下也不是不可以）
