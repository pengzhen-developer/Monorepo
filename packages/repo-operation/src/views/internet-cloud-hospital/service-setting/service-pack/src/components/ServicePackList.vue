<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="服务包名称">
          <el-input v-model="model.servicePackageName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="签约主体">
          <el-input v-model="model.mainPartName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <PeaceDatePicker type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           v-model="model.dateRange"></PeaceDatePicker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select clearable
                     filterable
                     placeholder="全部"
                     v-model="model.status">
            <el-option v-for="item in source.status"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院">
          <el-select clearable
                     filterable
                     placeholder="全部"
                     v-model="model.hosId">
            <el-option v-for="item in source.hosId"
                       v-bind:key="item.hosId"
                       v-bind:label="item.hosName"
                       v-bind:value="item.hosId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button type="primary"
                   v-on:click="gotoAddView">新增</el-button>
      </div>

      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="序号"
                          prop="orderNumber"
                          width="80px">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="服务包名称"
                          prop="servicePackageName">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="gotoDetailView(scope.row)">{{ scope.row.servicePackageName }}</el-button>
          </template>

        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="签约医院"
                          prop="hosName"></PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="签约主体"
                          prop="mainPartName"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          label="零售价/元"
                          prop="price"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          label="创建者"
                          prop="createUser"></PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="更新时间"
                          prop="updatedTime"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          label="状态"
                          prop="statusDisplay"></PeaceTableColumn>
        <PeaceTableColumn width="160px"
                          label="操作"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-if="[1, 3].includes(scope.row.status)"
                       v-on:click="gotoEditView(scope.row)">编辑</el-button>
            <el-button type="text"
                       v-if="[1].includes(scope.row.status)"
                       v-on:click="submit(scope.row)">提交</el-button>
            <el-button type="text"
                       v-if="[1].includes(scope.row.status)"
                       v-on:click="remove(scope.row)">删除</el-button>
            <el-button type="text"
                       v-if="[3].includes(scope.row.status)"
                       v-on:click="shelve(scope.row)">上架</el-button>
            <el-button type="text"
                       v-if="[2].includes(scope.row.status)"
                       v-on:click="unShelve(scope.row)">下架</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import Observable from './../observable'
import Service from './../service'

export default {
  data() {
    return {
      model: {
        servicePackageName: '',
        mainPartName: '',
        dateRange: [],
        startDate: '',
        endDate: '',
        status: '',
        hosId: ''
      },

      source: {
        hosId: [],
        status: []
      },

      dialog: {
        visible: false,

        data: []
      }
    }
  },

  computed: {
    view() {
      return Observable.state.view
    }
  },

  watch: {
    'model.dateRange'(value) {
      if (Peace.util.isArray(value) && value.length === 2) {
        this.model.startDate = Peace.dayjs(value[0]).format('YYYY-MM-DD')
        this.model.endDate = Peace.dayjs(value[1]).format('YYYY-MM-DD')
      } else {
        this.model.startDate = ''
        this.model.endDate = ''
      }
    },

    view(value) {
      if (value === Observable.constants.view.LIST) {
        this.fetch()
      }
    }
  },

  created() {
    this.getHosList()
    this.getDictionary()
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    async getDictionary() {
      this.source.status = await Peace.identity.dictionary.getList('service_package_status_type')
    },

    getHosList() {
      return Service.getHosList().then((res) => {
        this.source.hosId = res.data.list
      })
    },

    fetch() {
      const fetch = Service.getServicePackageList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    remove(row) {
      Service.deleteServicePackage({ id: row.id }).then((res) => {
        Peace.util.success(res.msg)

        this.fetch()
      })
    },

    submit(row) {
      Service.changeServicePackageSatus({ id: row.id, status: '2' }).then((res) => {
        Peace.util.success(res.msg)

        this.fetch()
      })
    },

    shelve(row) {
      Service.changeServicePackageSatus({ id: row.id, status: '2' }).then((res) => {
        Peace.util.success(res.msg)

        this.fetch()
      })
    },

    unShelve(row) {
      Service.changeServicePackageSatus({ id: row.id, status: '3' }).then((res) => {
        Peace.util.success(res.msg)

        this.fetch()
      })
    },

    gotoDetailView(row) {
      Observable.mutations.setProps(row)
      Observable.mutations.changeView(Observable.constants.view.DETAIL)
    },

    gotoEditView(row) {
      Observable.mutations.setProps(row)
      Observable.mutations.changeView(Observable.constants.view.EDIT)
    },

    gotoAddView() {
      Observable.mutations.changeView(Observable.constants.view.ADD)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
