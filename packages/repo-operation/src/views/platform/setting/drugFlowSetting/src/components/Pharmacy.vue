/** 药房（实体店） */

<template>
  <div class="relative-position">
    <div class="absolute"
         style="top: -20px; left: 70px">
      <span class="cursor-pointer text-primary text-caption"
            v-on:click="showDialog">请选择</span>
    </div>

    <div v-if="data.length"
         class="row q-col-gutter-x-md">
      <div class="col-3 col-lg-2 q-my-md"
           v-for="pharmacy in data"
           v-bind:key="pharmacy.name">
        <q-card>
          <q-card-section class="bg-primary">
            <q-img v-bind:src="pharmacy.image"
                   style="height: 100px;"></q-img>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center"
                          style="min-height: 40px;">
            <span> {{ pharmacy.name }} </span>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <peace-dialog title="选择药店"
                  v-bind:visible.sync="dialog.visible">
      <el-tree class="q-mb-md"
               node-key="id"
               ref="tree"
               show-checkbox
               v-bind:data="tree"
               v-bind:default-checked-keys="data.pharmacy"
               v-bind:default-expand-all="true"
               v-bind:check-on-click-node="true"
               v-on:check-change="checkChange">
      </el-tree>

      <div class="q-mb-lg">
        <span>已选择：</span>
        <span class="text-primary">{{ checkCount }}</span>
      </div>

      <div class="text-center">
        <el-button style="min-width: 120px;"
                   type=""
                   v-on:click="closeDialog">取消</el-button>
        <el-button style="min-width: 120px;"
                   type="primary"
                   v-on:click="check">提交</el-button>
      </div>
    </peace-dialog>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      checkCount: undefined,

      tree: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                { id: 9, label: '三级 1-1-1' },
                { id: 10, label: '三级 1-1-2' }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            { id: 5, label: '二级 2-1' },
            { id: 6, label: '二级 2-2' }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            { id: 7, label: '二级 3-1' },
            { id: 8, label: '二级 3-2' }
          ]
        }
      ],

      dialog: {
        visible: false
      }
    }
  },

  methods: {
    showDialog() {
      this.dialog.visible = true
    },

    closeDialog() {
      this.dialog.visible = false
    },

    checkChange() {
      const keys = this.$refs.tree.getCheckedKeys()

      this.checkCount = keys.length
    },

    check() {
      const keys = this.$refs.tree.getCheckedKeys()

      this.data.splice(0, this.data.length)

      keys.forEach((item) => {
        this.data.push({
          name: item,
          image: item
        })
      })

      this.dialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.pharmacy {
  border-radius: 4px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 160px;
}

::v-deep .el-tree-node__content {
  height: 40px;
}

::v-deep .el-tree > .el-tree-node > .el-tree-node__content {
  height: 48px;
  background: #fafafa;
}
</style>