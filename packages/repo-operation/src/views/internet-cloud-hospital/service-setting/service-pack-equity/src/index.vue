<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="权益名称">
          <el-input v-model="model.name"
                    clearable
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="权益类型">

          <el-select v-model="model.type"
                     clearable
                     placeholder="全部">
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in remoteSource.interestsType"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="model.status"
                     clearable
                     placeholder="全部">

            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button style="min-width: 88px"
                   type="primary"
                   v-on:click="add">新增</el-button>
      </div>

      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          label="权益名称"
                          prop="equitiesName"></PeaceTableColumn>

        <PeaceTableColumn min-width="120px"
                          label="权益类型">
          <template slot-scope="scope">
            <span>{{ scope.row.equitiesType.toString() | filterDictionary(remoteSource.interestsType, '--') }}</span>
          </template>

        </PeaceTableColumn>

        <PeaceTableColumn min-width="100px"
                          label="创建者"
                          prop="createUser"></PeaceTableColumn>

        <PeaceTableColumn min-width="160px"
                          label="更新时间"
                          prop="updatedTime"></PeaceTableColumn>

        <PeaceTableColumn width="120px"
                          label="使用状态">
          <template slot-scope="scope"
                    class="row items-center">
            <span class="q-mr-4"> {{scope.row.equitiesStatus == 1 ? '启用' : '停用'}} </span>
            <el-switch :active-value="1"
                       :inactive-value="2"
                       v-model="scope.row.equitiesStatus"
                       @change="modify(scope.row)"></el-switch>
          </template>

        </PeaceTableColumn>

        <PeaceTableColumn width="120px"
                          label="操作"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="edit(scope.row)">编辑</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 新增机构 -->
    <PeaceDialog width="376px"
                 v-if="addDialog.visible"
                 v-bind:visible.sync="addDialog.visible"
                 v-bind:title="dialogTitle">
      <service-pack-model :info="addDialog.addModel"
                          v-on:close="addDialog.visible = false"
                          v-on:refresh="get"></service-pack-model>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from './service'
import Constant from './constant'
import ServicePackModel from './components/ServicePackEquityModel'
export default {
  components: {
    ServicePackModel
  },
  data() {
    return {
      model: {
        name: '',
        type: undefined,
        status: undefined
      },

      rules: {
        name: [
          {
            required: true,
            message: '请填写权益名称',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择机构类型',
            trigger: 'change'
          }
        ]
      },
      source: {
        status: Constant.SERVICE_STATUS
      },
      remoteSource: {
        //权益类型
        interestsType: []
      },

      addDialog: {
        visible: false,
        isEdit: false,
        addModel: {
          equitiesDictionaryId: undefined,
          name: '',
          type: undefined
        }
      }
    }
  },

  async mounted() {
    this.remoteSource.interestsType = await peace.identity.dictionary.getList('equities_type')
    this.$nextTick().then(() => {
      this.get()
    })
  },

  computed: {
    dialogTitle() {
      return this.addDialog.isEdit ? '编辑权益' : '新增权益'
    }
  },

  methods: {
    get() {
      const fetch = Service.getServiceList
      const params = this.model
      this.$refs.table.reloadData({ fetch, params })
    },

    edit(row) {
      this.addDialog.isEdit = true
      this.addDialog.addModel = { equitiesDictionaryId: row.equitiesDictionaryId, name: row.equitiesName, type: row.equitiesType.toString() }
      this.addDialog.visible = true
    },

    modify(row) {
      const params = { equitiesDictionaryId: row.equitiesDictionaryId, status: row.equitiesStatus }
      if (row.equitiesStatus == '2') {
        this.$confirm('确定停用此权益？', '提示', { closeOnClickModal: false })
          .then(() => {
            Service.modifyServicesStatus(params).then((res) => {
              Peace.util.success(res.msg)
              this.get()
            })
          })
          .catch(() => {
            row.equitiesStatus = row.equitiesStatus == '1' ? '2' : '1'
          })
      } else {
        Service.modifyServicesStatus(params).then((res) => {
          Peace.util.success(res.msg)
          this.get()
        })
      }
    },

    add() {
      this.clearData()
      this.addDialog.isEdit = false
      this.addDialog.visible = true
    },

    close() {
      // 传递新增修改服务权益时间
      this.$emit('addSerivePackEquity')
      this.clearData()
      this.addDialog.visible = false
    },

    clearData() {
      this.addDialog.addModel = {
        equitiesDictionaryId: undefined,
        name: '',
        type: undefined
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>