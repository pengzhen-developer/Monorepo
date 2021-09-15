## 审方规则

#### 编辑规则

```JavaScript
 <rule-view v-bind:id="drugInfo.drugCscCode"
                  ref="ruleView"
            drug-type="platform"
                style="margin-bottom: 62px;"></rule-view>
```

### 规则详情

```JavaScript
<rules-detail v-bind:id="drugInfo.drugCscCode"
              drug-type="platform"></rules-detail>
```

#### 保存规则

```JavaScript
 submit() {
      this.$refs.ruleView
          .validate()
          .then((data) => {
            // 验证成功、执行请求
          })
    }
```
