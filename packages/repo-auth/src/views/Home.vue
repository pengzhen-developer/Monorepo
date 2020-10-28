<template>
  <div id="app"
       style="padding: 20px">

    <PeaceCountdown v-bind:time="100000000">
      <template slot-scope="props">
        {{ props }}
      </template>
    </PeaceCountdown>

    <PeaceButton type="success"
                 throttle
                 v-on:click="showDialog">
      Show Dialog
    </PeaceButton>

    <PeaceTable pagination>
      <PeaceTableColumn label="姓名"></PeaceTableColumn>
      <PeaceTableColumn label="年龄"></PeaceTableColumn>
      <PeaceTableColumn label="状态"></PeaceTableColumn>
      <PeaceTableColumn label="操作"></PeaceTableColumn>
    </PeaceTable>

    <PeaceDialog width="400px"
                 v-bind:visible.sync="dialog.visible">
      <div slot="title">
        <span>Title</span>
      </div>

      <el-form ref="form"
               style="width: 350px;"
               v-bind:model="model"
               v-bind:rules="rules"
               label-width="auto">

        <el-form-item>
          <span slot="label">
            <span>Check 选择</span>
            <span>:</span>
          </span>

          <el-checkbox-group v-model="model.check">
            <el-checkbox label="checkbox"></el-checkbox>
            <el-checkbox label="checkbox2"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>Radio 选择</span>
            <span>:</span>
          </span>

          <el-radio-group v-model="model.radio">
            <el-radio label="checkbox"></el-radio>
            <el-radio label="checkbox2"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>Input 输入</span>
            <span>:</span>
          </span>
          <el-input clearable
                    placeholder="请输入"
                    v-model="model.用户名称"></el-input>
        </el-form-item>

        <el-form-item prop="date">
          <span slot="label">Date Range:</span>

          <PeaceDatePicker type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           v-model="model.date"></PeaceDatePicker>
        </el-form-item>

        <el-form-item>
          <span slot="label">下拉:</span>

          <el-select clearable
                     v-model="model.__审核状态">
            <el-option label="审核状态1"
                       value="审核状态1"></el-option>
            <el-option label="审核状态2"
                       value="审核状态2"></el-option>
            <el-option label="审核状态10086"
                       value="审核状态10086"></el-option>
            <el-option label="审核状态-很长很长很长很长很长很长很长很长很长很长很长很长很长很长"
                       value="审核状态-很长很长很长很长很长很长很长很长很长很长很长很长很长很长"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="address">
          <span slot="label">联动下拉:</span>

          <div>
            <el-select style="display: inline-block; width: 60px; margin-right: 2px;"
                       clearable
                       placeholder="省"
                       v-model="省">
              <el-option label="省"
                         value="省"></el-option>
            </el-select>

            <el-select style="display: inline-block; width: 60px; margin-right: 2px;"
                       clearable
                       placeholder="市"
                       v-model="市">
              <el-option label="市"
                         value="市"></el-option>
            </el-select>

            <el-select style="display: inline-block; width: 68px; margin-right: 2px;"
                       clearable
                       placeholder="区"
                       v-model="区">
              <el-option label="区"
                         value="区"></el-option>
            </el-select>

            <el-input v-model="model.address"
                      style="display: none; "></el-input>
          </div>
        </el-form-item>

        <el-form-item prop="design">
          <span slot="label">级联下拉:</span>

          <el-cascader clearable
                       v-model="model.design"
                       v-bind:options="source.design"
                       v-bind:props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>

        <el-form-item prop="avatar">
          <span slot="label">上传:</span>

          <div>
            <el-image style="width: 100px; height: 100px"
                      v-if="model.avatar"
                      v-bind:src="model.avatar">
            </el-image>
            <el-image style="width: 100px; height: 100px"
                      v-else
                      src="http://iph.href.lu/100x100?text=推荐 100x100">
            </el-image>

            <el-upload class="upload-demo"
                       ref="upload"
                       action="https://jsonplaceholder.typicode.com/posts/"
                       v-bind:auto-upload="false">
              <el-button slot="trigger"
                         size="small">本地选择</el-button>
              <div slot="tip"
                   class="el-upload__tip">
                <span>只能上传 jpg/png 文件，且不超过 500kb</span>
              </div>
            </el-upload>

            <el-input v-model="model.avatar"
                      style="display: none; "></el-input>
          </div>
        </el-form-item>

        <el-form-item label="">
          <PeaceButton type="primary"
                       throttle
                       v-on:click="save">
            点我触发验证
          </PeaceButton>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button v-on:click="dialog.visible = false">取 消</el-button>
        <el-button type="primary"
                   v-on:click="dialog.visible = false">确 定</el-button>
      </div>
    </PeaceDialog>
  </div>
</template>

<script>
// from runtime
// import PeaceElementUI from './../../src/main'
// Vue.use(PeaceElementUI)

export default {
  name: 'App',

  data() {
    return {
      ['省']: '',
      ['市']: '',
      ['区']: '',

      model: {
        check: [],
        radio: '',
        date: [],
        avatar: '',
        address: '',
        design: []
      },

      rules: {
        date: [
          { required: true, message: '请选择时间' },
          {
            validator(rule, value, callback) {
              if (!(value && value.length === 2)) {
                callback(new Error('请选择时间'))
              }
            }
          }
        ],

        avatar: [{ required: true, message: '请选择图片', trigger: ['change'] }],

        address: [{ required: true, message: '请选择省市区', trigger: ['blur'] }],

        design: [
          { required: true, message: '请选择规范' },
          {
            validator(rule, value, callback) {
              if (!(value && value.length === 3)) {
                callback(new Error('请选择规范'))
              }
            }
          }
        ]
      },

      source: {
        design: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
                children: [
                  {
                    value: 'yizhi',
                    label: '一致'
                  },
                  {
                    value: 'fankui',
                    label: '反馈'
                  },
                  {
                    value: 'xiaolv',
                    label: '效率'
                  },
                  {
                    value: 'kekong',
                    label: '可控'
                  }
                ]
              },
              {
                value: 'daohang',
                label: '导航',
                children: [
                  {
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                  },
                  {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                  }
                ]
              }
            ]
          },
          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout 布局'
                  },
                  {
                    value: 'color',
                    label: 'Color 色彩'
                  },
                  {
                    value: 'typography',
                    label: 'Typography 字体'
                  },
                  {
                    value: 'icon',
                    label: 'Icon 图标'
                  },
                  {
                    value: 'button',
                    label: 'Button 按钮'
                  }
                ]
              },
              {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio 单选框'
                  },
                  {
                    value: 'checkbox',
                    label: 'Checkbox 多选框'
                  },
                  {
                    value: 'input',
                    label: 'Input 输入框'
                  },
                  {
                    value: 'input-number',
                    label: 'InputNumber 计数器'
                  },
                  {
                    value: 'select',
                    label: 'Select 选择器'
                  },
                  {
                    value: 'cascader',
                    label: 'Cascader 级联选择器'
                  },
                  {
                    value: 'switch',
                    label: 'Switch 开关'
                  },
                  {
                    value: 'slider',
                    label: 'Slider 滑块'
                  },
                  {
                    value: 'time-picker',
                    label: 'TimePicker 时间选择器'
                  },
                  {
                    value: 'date-picker',
                    label: 'DatePicker 日期选择器'
                  },
                  {
                    value: 'datetime-picker',
                    label: 'DateTimePicker 日期时间选择器'
                  },
                  {
                    value: 'upload',
                    label: 'Upload 上传'
                  },
                  {
                    value: 'rate',
                    label: 'Rate 评分'
                  },
                  {
                    value: 'form',
                    label: 'Form 表单'
                  }
                ]
              },
              {
                value: 'data',
                label: 'Data',
                children: [
                  {
                    value: 'table',
                    label: 'Table 表格'
                  },
                  {
                    value: 'tag',
                    label: 'Tag 标签'
                  },
                  {
                    value: 'progress',
                    label: 'Progress 进度条'
                  },
                  {
                    value: 'tree',
                    label: 'Tree 树形控件'
                  },
                  {
                    value: 'pagination',
                    label: 'Pagination 分页'
                  },
                  {
                    value: 'badge',
                    label: 'Badge 标记'
                  }
                ]
              },
              {
                value: 'notice',
                label: 'Notice',
                children: [
                  {
                    value: 'alert',
                    label: 'Alert 警告'
                  },
                  {
                    value: 'loading',
                    label: 'Loading 加载'
                  },
                  {
                    value: 'message',
                    label: 'Message 消息提示'
                  },
                  {
                    value: 'message-box',
                    label: 'MessageBox 弹框'
                  },
                  {
                    value: 'notification',
                    label: 'Notification 通知'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'menu',
                    label: 'NavMenu 导航菜单'
                  },
                  {
                    value: 'tabs',
                    label: 'Tabs 标签页'
                  },
                  {
                    value: 'breadcrumb',
                    label: 'Breadcrumb 面包屑'
                  },
                  {
                    value: 'dropdown',
                    label: 'Dropdown 下拉菜单'
                  },
                  {
                    value: 'steps',
                    label: 'Steps 步骤条'
                  }
                ]
              },
              {
                value: 'others',
                label: 'Others',
                children: [
                  {
                    value: 'dialog',
                    label: 'Dialog 对话框'
                  },
                  {
                    value: 'tooltip',
                    label: 'Tooltip 文字提示'
                  },
                  {
                    value: 'popover',
                    label: 'Popover 弹出框'
                  },
                  {
                    value: 'card',
                    label: 'Card 卡片'
                  },
                  {
                    value: 'carousel',
                    label: 'Carousel 走马灯'
                  },
                  {
                    value: 'collapse',
                    label: 'Collapse 折叠面板'
                  }
                ]
              }
            ]
          },
          {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'jiaohu',
                label: '组件交互文档'
              }
            ]
          }
        ]
      },
      dialog: {
        visible: false
      }
    }
  },

  watch: {
    ['省']() {
      if (this.省 && this.市 && this.区) {
        this.model.address = this.省 + this.市 + this.区
      } else {
        this.model.address = ''
      }
    },
    ['市']() {
      if (this.省 && this.市 && this.区) {
        this.model.address = this.省 + this.市 + this.区
      } else {
        this.model.address = ''
      }
    },
    ['区']() {
      if (this.省 && this.市 && this.区) {
        this.model.address = this.省 + this.市 + this.区
      } else {
        this.model.address = ''
      }
    }
  },

  methods: {
    showDialog() {
      this.dialog.visible = true
    },

    save() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
      })
    }
  }
}
</script> 

<style>
</style>
