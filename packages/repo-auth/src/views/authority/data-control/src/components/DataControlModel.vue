<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="140px"
             label-suffix="："
             v-bind:model="model"
             v-bind:rules="rules">
      <div class="info-content">
        <el-form-item label="控制类型"
                      prop="controlledType">
          <el-select v-model="model.controlledType"
                     placeholder="请选择菜单类型">
            <el-option v-for="item in source.controlledType"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="控制标识"
                      prop="controlledSign">
          <el-input v-model.trim="model.controlledSign"></el-input>
        </el-form-item>

        <el-form-item label="控制菜单"
                      prop="menuId">
          <q-scroll-area v-bind:thumb-style="thumbStyle"
                         v-bind:style="scrollAreaStyle">
            <el-tree ref="tree"
                     default-expand-all
                     highlight-current
                     node-key="id"
                     v-on:node-click="nodeClick"
                     v-bind:current-node-key="model.menuId"
                     v-bind:data="source.menu"></el-tree>
          </q-scroll-area>
        </el-form-item>

        <el-form-item label="描述"
                      prop="description">
          <el-input v-model.trim="model.description"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model.trim="model.sort"
                    type="number"></el-input>
        </el-form-item>
      </div>
      <div class="text-center">
        <el-button type="primary"
                   class="large hasmargin"
                   v-bind:disabled="loading"
                   v-on:click="save">确 定</el-button>
        <el-button class="large"
                   v-on:click="cancelDialog">取 消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'DataControlModel',

  props: {
    info: Object
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

      model: {
        id: '',
        menuId: '',
        controlledSign: '',
        controlledType: '',
        description: '',
        sort: ''
      },

      rules: {
        controlledSign: [{ required: true }],
        controlledType: [{ required: true }],
        menuId: [{ required: true }]
      },

      source: {
        controlledType: [],
        menu: []
      },

      loading: false
    }
  },

  async created() {
    this.source.controlledType = await Peace.identity.dictionary.getList('base_data_control')
  },

  mounted() {
    this.$nextTick(async () => {
      const params = {
        parentId: this.info.parentId,
        clientId: this.info.clientId,
        productCode: this.info.productCode,
        whole: true
      }

      this.source.menu = (await Service.menu().getList(params)).data
      this.model = this.info

      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.model.menuId)
      })
    })
  },

  methods: {
    nodeClick(data) {
      this.model.menuId = data.id
    },

    save() {
      this.validateForm().then(() => {
        this.loading = true

        // this.$refs.tree.getCurrentNode()
        // 获取选中项
        const params = Peace.util.deepClone(this.model)
        if (this.info?.mode != 'update') {
          Service.controlledMenu()
            .post(params)
            .then(() => {
              Peace.util.success('新建成功')

              this.$nextTick(() => {
                this.$refs.form.resetFields()
                this.cancelDialog()
              })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          Service.controlledMenu()
            .put(params)
            .then(() => {
              Peace.util.success('修改成功')

              this.$nextTick(() => {
                this.$refs.form.resetFields()
                this.cancelDialog()
              })
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    },

    cancelDialog() {
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  width: 100%;
  &.tow-col {
    width: 50%;
  }
}
.el-select {
  width: 100%;
}
::v-deep .el-checkbox {
  margin-right: 15px;
}
.info-content {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>