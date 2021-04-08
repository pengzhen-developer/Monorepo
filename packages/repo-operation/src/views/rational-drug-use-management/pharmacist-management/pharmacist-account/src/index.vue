 <template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-suffix="："
               size="mini">
        <el-form-item label="机构名称">
          <el-input v-model.trim="model.CodeName"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="药师姓名">
          <el-input v-model.trim="model.PharmacistName"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model.trim="model.UserName"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary"
                     v-on:click="fetch">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  pagination
                  size="mini">
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="机构名称"
                          prop="CodeName"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="药师姓名"
                          prop="RealName"
                          min-width="120px">
        </PeaceTableColumn>
        <PeaceTableColumn label="账号"
                          prop="UserName"
                          min-width="120px">
        </PeaceTableColumn>
        <PeaceTableColumn label="所在部门"
                          prop="DepartName"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="角色"
                          prop="RoleNames"
                          min-width="160px">
        </PeaceTableColumn>
        <PeaceTableColumn label="账号状态"
                          prop="EnableStatus"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="备注"
                          prop="Note"
                          min-width="160px">
          <template slot-scope="scope">
            {{scope.row.Note||'——'}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          prop="CREATETIME"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          width="100px"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="viewDetail(scope.row)">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
    <PeaceDialog v-if="detailDialog.visible"
                 width="716px"
                 v-bind:visible.sync="detailDialog.visible"
                 title="药师详情">
      <PharmacistDetail v-bind:data="detailDialog.data"></PharmacistDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service/index'

import PharmacistDetail from './components/PharmacistDetail'

export default {
  name: 'PharmacistAccount',
  components: {
    PharmacistDetail
  },
  filters: {},
  data() {
    return {
      detailDialog: {
        visible: false,
        data: ''
      },
      model: {
        CodeName: '',
        PharmacistName: '',
        UserName: ''
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  computed: {},

  methods: {
    fetch() {
      const fetch = Service.getPharmacistList
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    viewDetail(row) {
      this.detailDialog.visible = true
      this.detailDialog.data = row.UserId
    }
  }
}
</script>

<style lang="scss" scoped>
</style>