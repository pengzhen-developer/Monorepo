<template>
  <div class="layout-route full-width ">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="提词">
          <peace-input placeholder="请输入"
                       v-model.trim="model.wordName"></peace-input>
        </el-form-item>
        <el-form-item label="状态">
          <peace-select v-model="model.wordStatus"
                        placeholder="全部">
            <el-option v-for="item in source.wordStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="所属机构">
          <peace-input placeholder="请输入"
                       v-model.trim="model.organName"></peace-input>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <div class="q-mb-lg">
        <el-button v-on:click="edit({},'add')"
                   type="primary">新增
        </el-button>
        <el-button v-on:click="importData">批量新增</el-button>
      </div>
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="提词"
                          prop="wordName"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="所属机构"
                          min-width="180px"
                          prop="organName">

        </PeaceTableColumn>
        <PeaceTableColumn label="建议词"
                          prop="rangeName"
                          min-width="160px">
        </PeaceTableColumn>
        <PeaceTableColumn label="提词时间"
                          prop="upTime"
                          min-width="180px">
        </PeaceTableColumn>
        <PeaceTableColumn label="提词人"
                          prop="reporterName"
                          min-width="120px">
        </PeaceTableColumn>
        <PeaceTableColumn label="状态"
                          prop="wordStatus"
                          min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.wordStatus| getEnumLabel(source.wordStatus,'--') }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          fixed="right"
                          align="left"
                          width="110px">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="toDetail(scope.row)">查看详情</el-button>
            <!-- <el-button class="q-px-none"
                       type="text"
                       v-on:click="edit(scope.row,'edit')"
                       v-if="scope.row.wordStatus=='0'||scope.row.wordStatus=='1'">修改</el-button> -->
          </template>
        </PeaceTableColumn>
      </PeaceTable>

    </div>

    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="editModelDialog.visible"
                 :title="editModelDialog.type==='add'?'新词提报':'修改'"
                 v-if="editModelDialog.visible"
                 append-to-body
                 width="536px">
      <EditModel v-bind:info="editModelDialog.info"
                 v-bind:type="editModelDialog.type"
                 v-on:cancel="cancel"
                 v-on:complete="complete" />
    </PeaceDialog>

    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="detailModelDialog.visible"
                 title="查看详情"
                 v-if="detailModelDialog.visible"
                 append-to-body
                 width="536px">
      <DetailModel v-bind:info="detailModelDialog.data" />
    </PeaceDialog>

    <PeaceDialog v-if="importDialog.visible"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="importDialog.visible"
                 append-to-body
                 title="导入数据"
                 width="720px">
      <peace-import :actions="importDialog.actions"
                    :stepsDataInput="importDialog.stepsDataInput"
                    :templateDownloadUrl="importDialog.templateDownloadUrl"
                    :templateName="importDialog.templateName"
                    :downloadErrorUrl="importDialog.downloadErrorUrl"
                    @close="closeImportDialog"
                    @success="importSuccess" />
    </PeaceDialog>

  </div>

</template>

<script>
import Service from './service/index'
import DetailModel from './components/DetailModel'
import EditModel from './components/EditModel'
import PeaceImport from '@/src/views/components/peace-import/src/PeaceImport.vue'
export default {
  name: 'NeologismPresentation',
  components: {
    DetailModel,

    PeaceImport,
    EditModel
  },
  data() {
    return {
      model: {
        wordName: '',
        wordStatus: '',
        organName: ''
      },
      source: {
        wordStatus: []
      },
      editModelDialog: {
        visible: false,
        type: '',
        info: {}
      },
      detailModelDialog: {
        visible: false,
        data: {}
      },
      importDialog: {
        visible: false,
        actions: `${process.env.VUE_APP_SITE_AUDITENGINE}idic/cdss/word/upload`,
        templateDownloadUrl: `${process.env.VUE_APP_SITE_AUDITENGINE}idic/cdss/word/downloadTemplated`,
        downloadErrorUrl: `${process.env.VUE_APP_SITE_AUDITENGINE}idic`,
        templateName: '新词提报',
        stepsDataInput: {
          active: 0,
          list: [
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
  filters: {
    getEnumLabel: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  async created() {
    this.source.wordStatus = await Peace.identity.dictionary.getList('cdss_word_status')
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const fetch = Service.getList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    edit(info, type) {
      this.editModelDialog.info = info
      this.editModelDialog.type = type
      this.editModelDialog.visible = true
    },
    toDetail(row) {
      this.detailModelDialog.visible = true
      this.detailModelDialog.data = row
    },
    cancel() {
      this.editModelDialog.visible = false
    },
    complete() {
      this.editModelDialog.visible = false
      this.fetch()
    },
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
      this.fetch()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>