<template>
  <div>
    <div class="card">
      <el-button type="primary"
                 v-on:click="cmdModel('add')">新增</el-button>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  size="mini">
        <PeaceTableColumn type="index"
                          fixed
                          label="序号"
                          width="60"></PeaceTableColumn>
        <PeaceTableColumn label="角色名称"
                          min-width="100px"
                          prop="roleName"
                          align="left">
        </PeaceTableColumn>
        <PeaceTableColumn label="角色标识"
                          min-width="100px"
                          prop="roleCode"></PeaceTableColumn>
        <PeaceTableColumn label="角色描述"
                          min-width="100px"
                          prop="roleDesc"></PeaceTableColumn>
        <PeaceTableColumn label="角色类型"
                          min-width="100px"
                          prop="roleType">
          <template slot-scope="scope">
            {{scope.row.roleType | formatRoleType(dictList)}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          min-width="150px"
                          prop="createTime"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          align="left"
                          width="160px">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="cmdModel('edit', scope.row)">编辑</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="authority(scope.row)">权限</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="del(scope.row)">删除</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 角色 -->
    <PeaceDialog width="720px"
                 v-if="modelDialog.visible"
                 v-bind:visible.sync="modelDialog.visible"
                 :title="modelDialog.title">
      <Model ref="model"
             v-on:close="modelDialog.visible = false"
             v-on:refresh="get"></Model>
    </PeaceDialog>

    <!-- 权限 -->
    <PeaceDialog width="1200px"
                 v-if="authDialog.visible"
                 v-bind:visible.sync="authDialog.visible"
                 title="分配权限">
      <Auth ref="auth"
            v-on:close="authDialog.visible = false"
            v-on:refresh="get"></Auth>
    </PeaceDialog>

  </div>
</template>

<script>
import Model from './Model'
import Auth from './Auth'
import Service from '../service'
export default {
  name: 'Main',
  components: {
    Model,
    Auth
  },
  data() {
    return {
      dictList: [],
      modelDialog: {
        visible: false,
        title: '',
        data: {}
      },
      authDialog: {
        visible: false,
        data: {}
      }
    }
  },
  watch: {
    '$store.state.info.role'() {
      this.get()
    }
  },
  filters: {
    formatRoleType(type, dictList) {
      return dictList.find((item) => item.code === type)?.name
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      return Service.role()
        .dict()
        .then((res) => {
          this.dictList = res.data
        })
    },
    get() {
      const params = {
        clientId: this.$store.state.info.role.clientId,
        productCode: this.$store.state.info.role.productCode || '',
        upms: true
      }
      const fetch = Service.role().list
      this.$refs.table.reloadData({ fetch, params })
    },
    cmdModel(type, row) {
      this.modelDialog.visible = true
      this.modelDialog.type = type
      this.modelDialog.data = row ? row : {}
      if (type === 'detail') {
        this.modelDialog.title = '查看'
      } else {
        this.modelDialog.title = type === 'edit' ? '编辑' : '新增'
      }
      this.$nextTick(() => {
        this.$refs.model.init(type, row ? row.roleId : '')
      })
    },
    authority(row) {
      this.authDialog.visible = true
      this.authDialog.data = row ? row : {}
      this.$nextTick(() => {
        this.$refs.auth.init(row ? row.roleId : '')
      })
    },
    del(row) {
      const params = { id: row.roleId }
      this.$confirm('确定删除吗？').then(() => {
        Service.role()
          .delete(params)
          .then((res) => {
            Peace.util.success(res.msg)
            this.get()
          })
      })
    }
  }
}
</script>

