<template>
  <div class=" layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent>
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="form-label">账号</span>
            <span class="text-center">：</span>
          </div>
          <el-input v-model="model.UserName"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="form-label">姓名</span>
            <span class="text-center">：</span>
          </div>
          <el-input v-model="model.RealName"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="form-label">所在部门</span>
            <span class="text-center">：</span>
          </div>
          <el-input v-model="model.DepartName"
                    placeholder="请输入所在部门"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="form-label">医网信状态</span>
            <span class="text-center">：</span>
          </div>
          <el-select v-model="model.SignStatus"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in source.SignStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>

        </el-form-item>
      </el-form>
    </div>

    <div class="card">

      <div class="q-mb-md">
        <el-button type="primary"
                   icon="el-icon-plus"
                   v-on:click="toAccount('')">新增</el-button>
        <el-button v-on:click="openImportDialog">批量导入</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination>
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="UserName"
                         label="账号"></el-table-column>
        <el-table-column prop="DepartName"
                         label="所在部门"></el-table-column>
        <el-table-column prop="RealName"
                         label="姓名"></el-table-column>
        <el-table-column prop="RoleNames"
                         label="角色"></el-table-column>
        <el-table-column prop="SignStatus"
                         label="医网信状态">
          <template slot-scope="scope">
            {{scope.row.SignStatus | getLabel(source.SignStatus)}}
          </template>
        </el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.EnableStatus"
                       :active-value="true"
                       :inactive-value="false"
                       v-on:change="changeStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="Note"
                         label="备注">
          <template slot-scope="scope">
            {{scope.row.Note||'——'}}
          </template>
        </el-table-column>
        <el-table-column min-width="100px"
                         align="left"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="toAccount(scope.row)">修改</el-button>
            <el-button type="text"
                       v-on:click="commit(scope.row)"
                       v-if="scope.row.SignStatus=='-1'">手工提交</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>
    <!--角色 -->
    <PeaceDialog width="716px"
                 v-bind:visible.sync="dialog.visible"
                 :title="dialog.title"
                 custom-class='accountDialog'>
      <accountModel v-if="dialog.visible"
                    v-on:close="dialog.visible = false"
                    v-on:refresh="get"
                    v-bind:data="Id"></accountModel>
    </PeaceDialog>

    <!-- 导入 -->
    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="importDialogVisible"
                 title="批量导入药师账号"
                 v-if="importDialogVisible"
                 append-to-body
                 width="500px">
      <DrugsImport v-on:success="get()" />
    </PeaceDialog>
  </div>

</template>

<script>
import accountModel from './components/accountModel'
import DrugsImport from './components/DrugsImport'
import Service from './service'

export default {
  name: 'AccountManagement',
  components: {
    accountModel,
    DrugsImport
  },
  data() {
    return {
      Id: '',
      model: {
        UserName: '',
        RealName: '',
        DepartName: '',
        SignStatus: ''
      },
      importDialogVisible: false,
      dialog: {
        visible: false,
        title: '账户信息'
      },
      source: {
        SignStatus: []
      }
    }
  },

  filters: {
    getLabel: function(value, list) {
      return list.find((item) => item.value === value)?.label
    }
  },

  mounted() {
    this.$nextTick(async () => {
      this.source.SignStatus = await Peace.identity.dictionary.getList('pharmacist_ywq_sign_status')
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getPharmacistList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    toAccount(row) {
      this.dialog.visible = true
      this.Id = row ? row.UserId : ''
    },
    changeStatus(row) {
      const message = row.EnableStatus ? '确定启用该账号？' : '确定禁用该账号？'

      this.$confirm(message, '提示', { closeOnClickModal: false })
        .then(() => {
          const params = { UserId: row.UserId, Enabled: row.EnableStatus }
          Service.EnablePharmacist(params).then(() => {
            Peace.util.success('操作成功')
            this.get()
          })
        })
        .catch(() => {
          row.EnableStatus = row.EnableStatus ? false : true
        })
    },
    //手工提交
    commit(row) {
      this.$confirm('确定手工提交', '提示', { closeOnClickModal: false }).then(() => {
        const params = {
          userId: row.UserId
        }
        Service.RequestYwq(params).then(() => {
          Peace.util.success('提交成功')
          this.get()
        })
      })
    },
    openImportDialog() {
      this.importDialogVisible = true
    }
  }
}
</script>

<style scoped>
.form-label {
  width: 70px;
  text-align: justify;
  text-align-last: justify;
}
</style>