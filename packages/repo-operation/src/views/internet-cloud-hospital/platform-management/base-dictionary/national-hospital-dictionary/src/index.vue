<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">

        <el-form-item label="医疗机构">
          <el-input v-model="model.name"
                    placeholder="请输入医院关键词"
                    clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>

        </el-form-item>
      </el-form>
    </div>

    <div class="card">

      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="240px"
                          label="医疗机构"
                          prop="name"></PeaceTableColumn>
        <PeaceTableColumn min-width="100px"
                          label="医院等级"
                          prop="level"></PeaceTableColumn>
        <PeaceTableColumn min-width="300px"
                          label="医院地址"
                          prop="address"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          label="省份"
                          prop="province"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          label="地理位置"
                          prop="location">
          <template slot-scope="scope">
            <el-button @click="openLocation(scope.row.latitude, scope.row.longitude,scope.row.address)"
                       icon="el-icon-location"
                       type="text">地图定位</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          width="100"
                          label="操作">
          <template slot-scope="scope">
            <el-button @click="getDetails(scope.row)"
                       type="text">编辑</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 药品导入 -->
    <PeaceDialog width="600px"
                 :visible.sync="detailsDialog.visible"
                 title="医院详情"
                 v-if="detailsDialog.visible">
      <HospitalInfo v-bind:info="detailsDialog.data"
                    v-on:close="detailsDialog.visible=false"
                    v-on:onSuccess="editSuccess"></HospitalInfo>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from './service/index'
import HospitalInfo from './components/HospitalInfo'

export default {
  name: 'DictionaryNational',

  components: { HospitalInfo },

  data() {
    return {
      model: {
        name: ''
      },
      detailsDialog: {
        data: {},
        visible: false
      }
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getNationalList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },
    // 地图定位
    openLocation(lat, lon, address) {
      window.open(
        `http://api.map.baidu.com/marker?location=${lat},${lon}&title=我的位置&content=${address}&output=html`,
        '_blank'
      )
    },
    getDetails(data) {
      const params = { hospital_id: data.id }
      Service.detailHospital(params).then((res) => {
        this.detailsDialog.data = res.data
        this.detailsDialog.visible = true
      })
    },

    editSuccess() {
      this.get()
    }
  }
}
</script>

<style>
</style>