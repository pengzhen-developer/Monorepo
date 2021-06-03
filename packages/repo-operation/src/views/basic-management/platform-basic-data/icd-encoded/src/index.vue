<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-suffix="："
               size="mini"
               v-on:keyup.enter.native="search"
               v-on:submit.native.prevent>

        <el-form-item label="主要编码">
          <el-input v-model="model.icd10Code"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="ICD疾病名称">
          <el-input v-model.trim="model.name"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="已匹配疾病">
          <el-input v-model.trim="model.diseaseName"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary" v-on:click="add">新增</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination>

        <PeaceTableColumn min-width="140px"
                          label="主要编码"
                          prop="icd10Code"></PeaceTableColumn>

        <PeaceTableColumn min-width="140px"
                          label="附加编码">
          <template slot-scope="scope">
            <span>{{ scope.row.extCode || '--'}}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn min-width="200px"
                          label="ICD疾病名称"
                          prop="name"></PeaceTableColumn>

        <PeaceTableColumn min-width="100px"
                          label="级别"
                          prop="leavel"></PeaceTableColumn>

        <PeaceTableColumn min-width="120px"
                          label="父节点编码"
                          prop="parentNode">
          <template slot-scope="scope">
            <span>{{ scope.row.parentNode || '--' }}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn min-width="140px"
                          label="已关联疾病">

          <template slot-scope="scope">
            <span>{{ scope.row.diseaseName || '--' }}</span>
          </template>

        </PeaceTableColumn>

        <PeaceTableColumn min-width="180px"
                          label="添加时间"
                          prop="createTime"></PeaceTableColumn>

        <PeaceTableColumn min-width="120px"
                          label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status === 'yes' ? '启用' : '禁用' }}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn width="120px"
                          label="操作"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="modify(scope.row)">修改</el-button>
          </template>

        </PeaceTableColumn>

      </PeaceTable>
    </div>

    <add-i-c-d-encoded v-model="addDialog.visible"
                       v-if="addDialog.visible"
                 v-on:refresh="search"></add-i-c-d-encoded>

    <modify-i-c-d-encoded v-model="modifyDialog.visible"
                          v-if="modifyDialog.visible"
                          v-bind:data="modifyDialog.data"
                          v-on:refresh="search"></modify-i-c-d-encoded>

  </div>
</template>

<script>
import Service from './service/index'
import AddICDEncoded from "./components/AddICDEncoded";
import ModifyICDEncoded from "./components/ModifyICDEncoded";
export default {
  name: 'platform_icd_encode',
  components: {
    AddICDEncoded,
    ModifyICDEncoded
  },
  data() {
    return {
      addDialog: {
        visible: false,
      },

      modifyDialog:  {
        visible: false,
        data: undefined,
      },

      model: {
        icd10Code: undefined,
        name: undefined,
        diseaseName: undefined
      },

      source: {
        drugCodingStatus: [],
        organizationList: []
      },

    }
  },
  async mounted() {
    this.source.drugCodingStatus = await Peace.identity.dictionary.getList('MappingStatus')
    this.$nextTick().then(() => {
      this.search()
    })
  },
  methods: {
    search() {
      const fetch = Service.getList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },
    add() {
      this.addDialog.visible = true
    },
    modify(item) {
      this.modifyDialog.data = item
      this.modifyDialog.visible = true
    }
  }
}
</script>

<style>
</style>
