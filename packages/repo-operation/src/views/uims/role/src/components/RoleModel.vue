<template>
  <div class="full-width full-height">
    <div class="q-mb-lg">
      <el-form label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="save"
               v-on:submit.native.prevent>
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">角色名称</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-input v-bind:disabled="!model.id"
                    v-model.trim="model.__角色名称"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">角色备注</span>
            <span class="text-center q-ml-sm">：</span>
          </div>
          <el-input v-model.trim="model.__角色备注"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">可选菜单</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-input class="q-mb-sm"
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
          </el-input>

          <q-scroll-area v-bind:thumb-style="thumbStyle"
                         v-bind:style="scrollAreaStyle">
            <el-tree ref="tree"
                     node-key="id"
                     show-checkbox
                     default-expand-all
                     highlight-current
                     v-bind:default-checked-keys="defaultChecked"
                     v-bind:filter-node-method="filterNode"
                     v-bind:props="{ children: 'children', label: 'label' }"
                     v-bind:data="menuTree">
            </el-tree>
          </q-scroll-area>

        </el-form-item>
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
export default {
  props: {
    data: Object
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
        height: '400px'
      },

      menuTree: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],

      filterText: '',

      defaultChecked: [1, 2],

      model: {}
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    save() {
      this.$emit('save')
    },

    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style>
</style>