<template>
  <el-form class="q-pa-sm"
           v-bind:model="model"
           v-bind:rules="rules"
           ref="form"
           label-width="90px"
           label-position="left">
    <el-form-item label="方案名称"
                  prop="projectName">
      <el-input v-model.trim="model.projectName"
                placeholder="请输入方案名称"
                ref="projectName"></el-input>
    </el-form-item>

    <div v-for="(item, index) in model.list"
         v-bind:key="index.toString()">
      <div class="row justify-between items-baseline">
        <p class="q-pb-md count-title">
          {{ index == 0 ? '首' : '第' + (index + 1).toCN() }}次遗嘱提醒
        </p>
        <el-button type="text"
                   class="text-red"
                   style="font-size: 14px"
                   icon="el-icon-delete"
                   v-show="index != 0 && index === model.list.length - 1"
                   v-on:click="deleteItem">删除
        </el-button>
      </div>
      <el-row>
        <el-form-item label="发送时间"
                      v-bind:prop="`list[${index}].sendType`"
                      style="display: inline-block;">
          <el-select v-model="model.list[index].sendType"
                     style="width: 150px;">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-cascader :props="unitOptions"
                     placeholder="立即"
                     v-model="model.list[index].sendUnit"
                     separator=""
                     style="display: inline-block; width: 150px; margin-left: 10px;">
        </el-cascader>
        <span class="q-ml-sm">后</span>
      </el-row>
      <el-form-item label="医嘱内容"
                    v-bind:prop="`list[${index}].content`">
        <el-input v-bind:ref="`list[${index}].content`"
                  v-model.trim="model.list[index].content"
                  maxlength="150"
                  show-word-limit
                  rows="7"
                  type="textarea"></el-input>
      </el-form-item>
    </div>

    <el-button type="text"
               style="font-size: 14px"
               icon="el-icon-circle-plus"
               v-on:click="addList">添加医嘱提醒
    </el-button>

    <div class="q-pt-sm q-pb-lg flex flex-center">
      <el-button type="primary"
                 plain
                 size="mini"
                 style="width: 84px"
                 v-on:click="closeMenu">取消
      </el-button>
      <el-button style="width: 84px"
                 size="mini"
                 v-on:click="save"
                 type="primary">保存 </el-button>
    </div>
  </el-form>
</template>
<script>
import peace from '@src/library'

export default {
  name: 'AddNewScheme',
  data() {
    return {
      model: {
        projectName: '',
        list: []
      },
      options: [
        { label: '就诊日期', value: 1 },
        { label: '关注日期', value: 2 }
      ],
      unitOptions: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          if (level === 0) {
            const nodes = Array.from(new Array(51).keys())
              .slice(0)
              .map((item) => ({
                value: item,
                label: item,
                leaf: level >= 1
              }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          } else {
            const nodes = [
              { value: '天', label: '天', leaf: level >= 1 },
              { value: '周', label: '周', leaf: level >= 1 },
              { value: '年', label: '年', leaf: level >= 1 }
            ]
            resolve(nodes)
          }
        }
      },
      rules: {
        projectName: [{ required: true, message: '请输入方案名称' }],
        list: []
      },
      isSave: false //是否上传，用于外部 handClose 方法关闭时校验
    }
  },
  created() {
    this.model.list.push({
      sendType: 1,
      sendUnit: [],
      content: ''
    })
    this.rules.list.push({
      content: [{ required: true, message: '请输入医嘱内容', trigger: 'blur' }]
    })
  },
  methods: {
    addList() {
      this.model.list.push({
        sendType: 1,
        sendUnit: [],
        content: ''
      })
      this.rules.list.push({
        content: [{ required: true, message: '请输入医嘱内容' }]
      })
    },
    deleteItem() {
      this.$confirm('是否删除此条医嘱提醒？').then(() => {
        this.model.list.pop()
        this.rules.list.pop()
      })
    },
    save() {
      //提交自定义随访方案
      this.$refs.form.validate((valid, validObj) => {
        if (valid) {
          const tmp = [...this.model.list]
          //转换JSON
          const tmpMap = tmp.map((item) => {
            item.adviceContent = item.content
            item.sendFutherTime = item.sendUnit[0]
            item.sendFutherUnit = item.sendUnit[1]
            item.doctorId = this.$store.state.user.userInfo.list.docInfo.doctor_id
            return item
          })
          const params = {
            title: this.model.projectName,
            content: tmpMap
          }
          peace.service.health.AddFollowUpScheme(params).then(() => {
            peace.util.alert('新建自定义方案成功')
            this.isSave = true
            this.closeMenu()
            this.$emit('updateList')
          })
        } else {
          // 根据 validObj 结构获取到 el-input 的 ref
          // 当验证失败，validObj 结构为：
          // validObj 的 key 则是验证失败的组件 ref name
          // {
          //   'list[0].content': [{ message: '请输入医嘱内容', field: 'list[0].content' }],
          //   'projectName': [{ message: '请输入方案名称', field: 'projectName' }]
          // }

          console.log(this)
          const refName = Object.keys(validObj)[0]

          if ($peace.validate.isEmpty(this.model.projectName)) {
            // 如果方案名称为空、获取Dom的方式和其他的不一样
            // 造成不同的原因是因为 rules: 中的层级
            // rules: {
            //   projectName: [{ .... }],
            //   list: [{ .... }, { .... }]
            //  }
            //
            this.$refs[refName].$el.children[0].focus()
            return
          }
          this.$refs[refName][0].$el.children[0].focus()
        }
      })
    },
    closeMenu() {
      this.$emit('handleClose')
    },
    isShouldSave() {
      if (this.isSave) {
        return false
      } else {
        //是否输入了方案名称
        if (!peace.validate.isEmpty(this.model.projectName)) {
          return true
        }
        for (const item of this.model.list) {
          if (!peace.validate.isEmpty(item.content)) {
            //是否输入了方案名称
            return true
          }
        }
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-depp .el-form-item__label {
  &::after {
    content: '：';
  }

  padding: 0 4px 0 0;
}

.count-title {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  line-height: 15px;
  vertical-align: middle;

  &:before {
    display: inline-block;
    content: '';
    width: 5px;
    height: 5px;
    background: $--color-primary;
    border-radius: 50%;
    margin: 0 8px 0 0;
    vertical-align: middle;
  }
}
</style>
