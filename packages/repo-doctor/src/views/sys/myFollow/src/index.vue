<template>
  <div>
    <div>
      <el-button @click="openDialog()"
                 style="width: 120px;"
                 type="primary">新增</el-button>
    </div>

    <hr />

    <PeaceTable pagination
                ref="table">
      <PeaceTableColumn label="患教标题"
                        prop="title"></PeaceTableColumn>
      <PeaceTableColumn label="疾病"
                        prop="diseaseTag"
                        width="200"></PeaceTableColumn>
      <PeaceTableColumn label="操作"
                        width="200">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)"
                     type="text">查看详情</el-button>
          <el-button @click="openDialog(scope.row)"
                     type="text">修改</el-button>
          <el-button @click="remove(scope.row)"
                     type="text">删除</el-button>
        </template>
      </PeaceTableColumn>
    </PeaceTable>

    <PeaceDialog :title="dialog.title"
                 :visible.sync="dialog.visible"
                 v-if="dialog.visible">
      <PatientEducationModel :data="dialog.data"
                             @close="closeDialog"
                             @edit="edit"
                             @submit="submit" />
    </PeaceDialog>

    <PeaceDialog :visible.sync="previewDialog.visible"
                 title="患教详情"
                 v-if="previewDialog.visible"
                 width="375px">
      <PatientEducationPreview :data="previewDialog.data" />
      <!-- <iframe :src="previewDialog.data.detailUrl" class="iframe" frameborder="0"></iframe> -->
    </PeaceDialog>
  </div>
</template>

<script>
import PatientEducationModel from './components/PatientEducationModel'
import PatientEducationPreview from './components/PatientEducationPreview'

export default {
  components: { PatientEducationModel, PatientEducationPreview },
  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },
  data() {
    return {
      dialog: {
        visible: false,

        title: '新增患教',
        data: {}
      },
      previewDialog: {
        visible: false,

        data: {}
      }
    }
  },
  methods: {
    get() {
      const fetch = Peace.service.patient.myInstructionLists
      const params = {}

      this.$refs.table.loadData({ fetch, params })
    },

    openDialog(row) {
      if (row) {
        this.dialog.title = '编辑患教'
        this.dialog.data = row
      } else {
        this.dialog.title = '新增患教'
        this.dialog.data = ''
      }
      this.dialog.visible = true
    },

    closeDialog() {
      this.dialog.visible = false
    },

    showDetail(row) {
      this.previewDialog.data = row
      this.previewDialog.visible = true
    },

    submit(params) {
      Peace.service.patient
        .addMyInstruction(params)
        .then(() => {
          this.$message.success('患教内容新增成功')
          this.get()
        })
        .finally(() => {
          this.closeDialog()
        })
    },

    edit(params) {
      Peace.service.patient
        .addMyInstruction(params)
        .then(() => {
          this.$message.success('患教内容编辑成功')
          this.get()
        })
        .finally(() => {
          this.closeDialog()
        })
    },

    remove(row) {
      Peace.util.confirm('确定删除吗？', undefined, undefined, () => {
        const params = {
          id: row.id
        }

        Peace.service.patient.delInstruction(params).then((res) => {
          Peace.util.success(res.msg)

          this.get()
        })
      })
    }
  }
}
</script>

<style>
.iframe {
  margin: -10px;
  width: calc(100% + 20px);
  height: 600px;
  display: block;
}
</style>
