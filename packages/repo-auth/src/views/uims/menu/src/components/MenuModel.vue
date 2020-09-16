<template>
  <div class="full-width full-height">
    <div class="q-mb-lg">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:keyup.enter.native="save"
               v-on:submit.native.prevent>

        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">父级菜单</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <div class="disabled"
               v-if="model.id">
            <q-scroll-area v-bind:thumb-style="thumbStyle"
                           v-bind:style="scrollAreaStyle">
              <el-tree ref="tree"
                       node-key="id"
                       default-expand-all
                       highlight-current
                       v-bind:current-node-key="model.parentId"
                       v-bind:props="{ children: 'children', label: 'menuName' }"
                       v-bind:data="menuTree">
              </el-tree>
            </q-scroll-area>
          </div>

          <div v-else>
            <el-input class="q-mb-sm"
                      placeholder="输入关键字进行过滤"
                      v-model="filterText">
            </el-input>

            <q-scroll-area v-bind:thumb-style="thumbStyle"
                           v-bind:style="scrollAreaStyle">
              <el-tree ref="tree"
                       node-key="id"
                       default-expand-all
                       highlight-current
                       v-on:node-click="nodeClick"
                       v-bind:filter-node-method="filterNode"
                       v-bind:current-node-key="model.parentId"
                       v-bind:props="{ children: 'children', label: 'menuName' }"
                       v-bind:data="menuTree">
              </el-tree>
            </q-scroll-area>
          </div>
        </el-form-item>

        <div class="row q-col-gutter-x-lg">
          <div class="col-6">
            <el-form-item prop="menuName">
              <div class="flex inline"
                   slot="label">
                <span class="text-justify em-4">菜单名称</span>
                <span class="text-center q-ml-sm">：</span>
              </div>

              <el-input v-model.trim="model.menuName"></el-input>
            </el-form-item>
          </div>
          <div class="col-6">
            <el-form-item prop="menuAlias">
              <div class="flex inline"
                   slot="label">
                <span class="text-justify em-4">菜单别名</span>
                <span class="text-center q-ml-sm">：</span>
              </div>
              <el-input v-model.trim="model.menuAlias">
                <el-tooltip slot="suffix"
                            placement="top">
                  <div slot="content">
                    <p class="text-subtitle2 q-mb-sm">唯一不重复值</p>
                    <p class="text-subtitle2 q-mb-sm">如需实现按标签页缓存，component name 必须和该值保持一致</p>
                    <p>## 既表示 vue route name，实现 router.push({ name: '' })</p>
                    <p>## 也表示 component name，实现按标签页的条件缓存（参考 keep-alive 的 include）</p>
                  </div>
                  <i class="el-input__icon el-icon-warning"></i>
                </el-tooltip>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row q-col-gutter-x-lg">
          <div class="col-6">
            <el-form-item prop="menuPath">
              <div class="flex inline"
                   slot="label">
                <span class="text-justify em-4">实际地址</span>
                <span class="text-center q-ml-sm">：</span>
              </div>

              <el-input v-model.trim="model.menuPath">
                <el-tooltip slot="suffix"
                            placement="top">
                  <div slot="content">
                    <p class="text-subtitle2 q-mb-sm">前端相对路径</p>
                    <p>## 相对于 views/</p>
                    <p>## 以 src/views/xxx/index.js 形式加载</p>
                    <p>## 支持 {env} 模板变量，.e.g {site}/home</p>
                  </div>
                  <i class="el-input__icon el-icon-warning"></i>
                </el-tooltip>
              </el-input>
            </el-form-item>
          </div>
          <div class="col-6">
            <el-form-item prop="menuRoute">
              <div class="flex inline"
                   slot="label">
                <span class="text-justify em-4">路由地址</span>
                <span class="text-center q-ml-sm">：</span>
              </div>

              <el-input v-model.trim="model.menuRoute">
                <el-tooltip slot="suffix"
                            placement="top">
                  <div slot="content">
                    <p class="text-subtitle2 q-mb-sm">唯一不重复值</p>
                    <p>## 既表示 vue route path， 实现 router.push({ path: '' })</p>
                    <p>## 也表示 url path，显示在 url 链接上</p>
                  </div>
                  <i class="el-input__icon el-icon-warning"></i>
                </el-tooltip>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row q-col-gutter-x-lg">
          <div class="col-6">
            <el-form-item prop="menuIcon">
              <div class="flex inline"
                   slot="label">
                <span class="text-justify em-4">图标字体</span>
                <span class="text-center q-ml-sm">：</span>
              </div>

              <el-input v-model.trim="model.menuIcon"></el-input>
            </el-form-item>
          </div>

          <div class="col-6">
            <el-form-item prop="sort">
              <div class="flex inline"
                   slot="label">
                <span class="text-justify em-4">排序字段</span>
                <span class="text-center q-ml-sm">：</span>
              </div>

              <el-input v-model.trim="model.sort"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row q-col-gutter-x-lg">
          <div class="col-3">
            <el-form-item prop="external">
              <div class="flex inline"
                   slot="label">
                <span class="text-justify">是否外链</span>
                <span class="text-center q-ml-sm">：</span>
              </div>

              <el-tooltip placement="top">
                <div slot="content">
                  <p class="text-subtitle2 q-mb-sm">决定以 iframe / component 加载</p>
                  <p>## 当以 iframe 形式加载，菜单实际地址解析完成后，必须符合 url 规则（/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/）</p>
                </div>
                <el-switch v-model.trim="model.external"></el-switch>
              </el-tooltip>
            </el-form-item>
          </div>
          <div class="col-3">
            <el-form-item prop="enable">
              <div class="flex inline"
                   slot="label">
                <span class="text-justify">是否启用</span>
                <span class="text-center q-ml-sm">：</span>
              </div>

              <el-tooltip placement="top">
                <div slot="content">
                  <p class="text-subtitle2 q-mb-sm">UI 状态</p>
                  <p>## 控制是否能够点击</p>
                </div>
                <el-switch v-model.trim="model.enable"></el-switch>
              </el-tooltip>
            </el-form-item>
          </div>
          <div class="col-3">
            <el-form-item prop="closable">
              <div class="flex inline"
                   slot="label">
                <span class="text-justify">是否可关闭</span>
                <span class="text-center q-ml-sm">：</span>
              </div>

              <el-tooltip placement="top">
                <div slot="content">
                  <p class="text-subtitle2 q-mb-sm">标签页控制项</p>
                  <p>## 该标签页是否允许被关闭</p>
                </div>
                <el-switch v-model.trim="model.closable"></el-switch>
              </el-tooltip>
            </el-form-item>
          </div>
          <div class="col-3">
            <el-form-item prop="virtual">
              <div class="flex inline"
                   slot="label">
                <span class="text-justify">虚拟路由</span>
                <span class="text-center q-ml-sm">：</span>
              </div>

              <el-tooltip placement="top">
                <div slot="content">
                  <p class="text-subtitle2 q-mb-sm">正常生成路由，但并不在菜单显示</p>
                  <p>## 常用于新增标签页跳转</p>
                </div>

                <el-switch v-model.trim="model.virtual"></el-switch>
              </el-tooltip>
            </el-form-item>
          </div>
        </div>

      </el-form>
    </div>

    <div class="text-center">
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="save">保存</el-button>
      <el-button style="width: 80px;"
                 v-on:click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './../service'

export default {
  props: {
    data: Object,
    menuTree: Array
  },

  data() {
    return {
      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        width: '5px',
        opacity: 0.75
      },
      scrollAreaStyle: {
        height: '200px'
      },

      filterText: '',

      model: {
        id: null,

        parentId: '',
        menuName: '',
        menuAlias: '',
        menuIcon: '',
        menuRoute: '',
        menuPath: '',
        external: false,
        enable: true,
        closable: true,
        virtual: false,
        sort: ''
      },

      rules: {
        menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
      }
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  created() {
    this.setPropsToModel()
  },

  methods: {
    setPropsToModel() {
      this.model = Object.assign({}, this.model, this.data)
    },

    filterNode(value, data) {
      if (!value) return true
      return data.menuName.indexOf(value) !== -1
    },

    nodeClick(node) {
      if (this.model.id === node.id) {
        Peace.util.warning('错误操作，禁止修改父节点为本身')

        this.$refs.tree.setCurrentKey(this.model.parentId)
      } else {
        this.model.parentId = node.id
      }
    },

    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const request = this.model.id ? Service.editMenu : Service.addMenu
          const params = this.model

          request(params).then((res) => {
            Peace.util.success(res.msg)

            this.$emit('save')
          })
        } else {
          return false
        }
      })
    },

    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.em-4 {
  width: 4em;
  text-align: justify;
  text-align-last: justify;
}

::v-deep .el-input--suffix .el-input__inner {
  padding-right: 30px;
}
</style>