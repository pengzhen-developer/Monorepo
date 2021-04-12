<template>
  <div class="layout-route">
    <div class="card">

      <div class="top-menu">
        <el-button @click="openModelDialog"
                   type="primary">新建通知</el-button>

      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination>
        <PeaceTableColumn label="编号"
                          prop="order"
                          width="80"></PeaceTableColumn>
        <PeaceTableColumn label="标题"
                          prop="title"></PeaceTableColumn>
        <PeaceTableColumn label="性质"
                          width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.type | getNoticeType }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="发送时间"
                          prop="createdTime"
                          width="170"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          header-align="left"
                          align="left"
                          label="操作"
                          width="150">
          <template slot-scope="scope">
            <div class="oprate">
              <el-button @click="openViewDialog(scope.row)"
                         type="text">查看详情</el-button>
            </div>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog :close-on-click-modal="false"
                 :visible.sync="noticeModelDialog.visible"
                 append-to-body
                 title="新建通知"
                 v-if="noticeModelDialog.visible"
                 width="610px">
      <NoticeModel @close="closeModelDialog"
                   @submit="createNotice" />
    </PeaceDialog>
    <PeaceDialog :show-close="false"
                 append-to-body
                 :visible.sync="viewDialog.visible"
                 class="no-header no-background"
                 v-if="viewDialog.visible"
                 width="473px">
      <slot name="title"></slot>
      <NoticeView :data="viewDialog.data"
                  @close="closeViewDialog" />
    </PeaceDialog>

  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import NoticeModel from './components/NoticeModel'
import NoticeView from './components/NoticeView'

export default {
  name: 'HospitalNotice',
  components: { NoticeModel, NoticeView },
  data() {
    return {
      source: {
        ENUM_NOTICE_TYPE: CONSTANT.ENUM_NOTICE_TYPE
      },
      noticeModelDialog: {
        visible: false
      },
      viewDialog: {
        visible: false,
        data: undefined
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
    })
  },
  methods: {
    getList() {
      const fetch = Service.getHospitalNotice
      const params = Peace.util.deepClone()
      this.$refs.table.reloadData({ fetch, params })
    },
    // 打开编辑 Dialog
    openModelDialog() {
      this.noticeModelDialog.visible = true
    },

    // 关闭编辑 Dialog
    closeModelDialog() {
      this.noticeModelDialog.visible = false
    },

    // 新建通知
    createNotice(data) {
      let { title, content, type } = data
      let params = {
        title: title,
        content: content,
        noticeType: type
      }
      Service.createNotice(params).then((res) => {
        Peace.util.success(res.msg || '医院通知新建成功')
        this.closeModelDialog()

        this.getList()
      })
    },

    // 打开预览 Dialog
    openViewDialog(row) {
      this.viewDialog.visible = true

      this.viewDialog.data = row
    },

    // 关闭预览 Dialog
    closeViewDialog() {
      this.viewDialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu {
  margin-bottom: 20px;
}

.no-header.no-background {
  ::v-deep .el-dialog {
    margin-top: 80px !important;
    margin-bottom: 0;
    background: transparent;
    box-shadow: none;
    overflow: visible;
  }
  ::v-deep .el-dialog {
    &__header {
      display: none;
    }
  }
}
</style>