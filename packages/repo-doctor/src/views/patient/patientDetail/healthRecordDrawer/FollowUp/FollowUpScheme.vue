<template>
  <div class="layout">
    <div class="layout-content full-width">
      <div class="page">
        <RecordList ref="table"
                    :request-data="requestData"
                    v-slot="item">
          <FollowUpSchemeCell :item="item" />
        </RecordList>
      </div>
    </div>
    <div class="layout-footer full-width">
      <q-separator inset
                   class="q-mb-md bg-grey-3" />
      <el-button @click="addNewScheme"
                 type="primary">新建自定义方案 </el-button>
    </div>
    <peace-dialog :append-to-body="true"
                  :before-close="handleClose"
                  :visible.sync="addSchemeDialog.visible"
                  width="470px"
                  title="自定义随访方案">
      <AddNewScheme ref="addScheme"
                    @handleClose="handleClose"
                    v-on:updateList="updateList"> </AddNewScheme>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import RecordList from '../RecordList'
import FollowUpSchemeCell from './FollowUpSchemeCell'
import AddNewScheme from './AddNewScheme'

export default {
  name: 'FollowUpScheme',
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {
      requestData: {
        request: peace.service.health.getFollowUpSchemeList,
        data: {}
      },
      addSchemeDialog: {
        visible: false
      }
    }
  },
  components: {
    RecordList,
    FollowUpSchemeCell,
    AddNewScheme
  },
  methods: {
    addNewScheme() {
      this.addSchemeDialog.visible = true
    },
    handleClose() {
      const tmp = this.$refs.addScheme.isShouldSave()
      if (tmp) {
        this.$confirm('关闭后将不保存当前内容，是否关闭？')
          .then(() => {
            this.addSchemeDialog.visible = false
          })
          .catch(() => {})
      } else {
        this.addSchemeDialog.visible = false
      }
    },
    updateList() {
      this.$refs.table.reloadData()
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .layout-content {
    flex: 1;
    overflow: auto;
    margin: 0 0 16px 0;
  }

  .layout-footer {
    margin: 0 0 16px 0;
    text-align: center;
  }
}
</style>
