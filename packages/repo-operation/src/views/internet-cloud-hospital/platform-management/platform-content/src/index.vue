<template>

  <div>

    <advertisement-content-model v-if="content.visible"
                                 v-bind:id="content.id"
                                 v-bind:preView="content.preview"
                                 @close="close"/>
    <div v-show="!content.visible" class="layout-route">
      <div class="card card-search q-mb-md">
        <el-form inline="inline"
                 label-suffix="："
                 size="mini"
                 v-bind:model="model"
                 v-on:keyup.enter.native="search"
                 v-on:submit.native.prevent>

          <el-form-item label="标题">
            <el-input v-model.trim="model.title"
                      clearable
                      placeholder="请输入标题内容"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       v-on:click="search">查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">
        <div class="q-mb-lg">
          <el-button type="primary"
                     v-on:click="add">新增
          </el-button>
        </div>
        <PeaceTable ref="table"
                    pagination
                    size="mini">

          <peace-table-column label="ID"
                              min-width="145px"
                              prop="id"></peace-table-column>

          <peace-table-column label="标题"
                              min-width="400px">
            <template slot-scope="scope">
              <span class="title"
                    v-html="scope.row.title"></span>
            </template>
          </peace-table-column>

          <peace-table-column label="展示位置"
                              min-width="150px">
            <template slot-scope="scope">
              <span v-for="item in scope.row.displayPosition.split(',')"
                    :key="item"
                    class="separator">{{ item | filterDictionary(source.displayDictionary) }}</span>
            </template>
          </peace-table-column>
          <peace-table-column label="创建时间"
                              min-width="165px"
                              prop="createTime"></peace-table-column>
          <peace-table-column fixed="right"
                              label="操作"
                              min-width="100">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="toEditAdvertisement('update', scope.row)">修改
              </el-button>
              <el-button type="text"
                         @click="toEditAdvertisement('preview',scope.row)">预览
              </el-button>
            </template>
          </peace-table-column>
        </PeaceTable>
      </div>
    </div>


  </div>
</template>

<script>
import Service from './service/index'
import AdvertisementContentModel from "./components/AdvertisementContentModel";

export default {
  components: {
    AdvertisementContentModel
  },
  data() {
    return {
      model: {
        title: "",
      },
      source: {
        displayDictionary: [
          {value: '1', label: '全部'},
          {value: '2', label: '医生APP首页'},
          {value: '3', label: '患者端小程序首页'},
          {value: '4', label: '患教内容'}
        ]
      },

      content: {
        visible: false,
        id: undefined,
        preview: ''
      }
    }
  },
  async mounted() {
    this.$nextTick().then(() => {
      this.search()
    })
  },
  methods: {
    search() {
      const fetch = Service.getContentList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({fetch, params}).then((res) => {
        return res
      })
    },
    toEditAdvertisement(preview, row) {
      this.content.id = row ? row.id : '0'
      this.content.preview = preview
      this.content.visible = true
    },

    add() {
      this.content.id = '0'
      this.content.preview = 'create'
      this.content.visible = true
    },

    close() {
      this.content.visible = false
    }

  }
}
</script>

<style lang="scss" scoped>

.separator {
  color: var(--q-color-grey-666);

  &:after {
    content: '、';
  }

  &:last-of-type:after {
    display: none;
  }
}
</style>
