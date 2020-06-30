/** 云药房 */

<template>
  <div class="flex items-baseline row q-col-gutter-md">

    <div class="col-3 col-lg-2 flex column justify-center">
      <div class="flex items-center line-bg q-mb-sm">云药房</div>

      <q-card>
        <q-card-section class="flex justify-center items-center bg-light-blue-1">
          <q-icon class="text-primary text-h1"
                  name="account_balance"></q-icon>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center"
                        style="min-height: 40px;">
          <el-input v-model="data.name"
                    placeholder="请输入云药房名称"></el-input>
        </q-card-actions>
      </q-card>
    </div>

    <div class="col-3 col-lg-2 flex column justify-center">
      <div class="flex items-center q-mb-sm">
        <span class="flex items-center line-bg q-mr-sm">云仓</span>
        <span class="cursor-pointer text-primary text-caption"
              v-on:click="showDialog">请选择</span>
      </div>

      <q-card v-if="data.store">
        <q-card-section class="bg-white flex items-center">
          <div class="bg-primary q-pa-sm q-mr-md"
               style="border-radius: 5px;">
            <q-icon class="text-white text-h5"
                    name="home"></q-icon>
          </div>

          <span>{{ data.store }}</span>
        </q-card-section>
      </q-card>

    </div>

    <peace-dialog title="选择仓库"
                  width="400px"
                  v-bind:visible.sync="dialog.visible">
      <el-table :data="[{}, {}]">
        <el-table-column label="仓库名称"></el-table-column>
        <el-table-column label="所在城市"></el-table-column>
        <el-table-column label="操作"
                         width="120px">
          <template slot-scope="scope">
            <el-button v-if="scope.$index === 0"
                       disabled
                       type="text">已选择</el-button>
            <el-button v-else
                       type="text"
                       v-on:click="check(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </peace-dialog>
  </div>
</template>

<script>
import { IPharmacyCloud } from './../model/IPharmacyCloud'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return new IPharmacyCloud()
      }
    }
  },

  data() {
    return {
      dialog: {
        visible: false
      }
    }
  },

  methods: {
    showDialog() {
      this.dialog.visible = true
    },

    check() {
      this.data.store = '测试选择'

      this.dialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.line-bg {
  &::before {
    content: ' ';
    display: inline-block;
    width: 4px;
    height: 16px;
    border-radius: 4px;
    margin: 0 8px 0 0;
    background: var(--q-color-primary);
  }
}
</style>