<template>
  <div>
    <div class="layout-route">
      <div class="card card-search q-mb-md">
        <el-form :model="search"
                 class="search"
                 label-width="auto"
                 label-suffix="："
                 ref="searchArea"
                 inline>
          <el-form-item label="区域">
            <el-select v-model="search.province"
                       clearable
                       @change="getCitys"
                       placeholder="省">
              <el-option v-for="item in provinces"
                         :key="item.area_id"
                         :label="item.area_name"
                         :value="item.area_id">
              </el-option>
            </el-select>
            <el-select v-model="search.city"
                       clearable
                       @change="getAreas"
                       placeholder="市">
              <el-option v-for="item in citys"
                         :key="item.area_id"
                         :label="item.area_name||''"
                         :value="item.area_id">
              </el-option>
            </el-select>
            <el-select v-model="search.area"
                       clearable
                       placeholder="区/县">
              <el-option v-for="item in areas"
                         :key="item.area_id"
                         :label="item.area_name||''"
                         :value="item.area_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="">
            <el-button @click="getList()"
                       type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card content">
        <div class="content-hd">
          <el-button @click="openAreaAddDialog"
                     type="primary">新增区域</el-button>
          <el-button @click="deleteArea"
                     type="primary">删除区域</el-button>
        </div>
        <div class="list">
          <peace-table :data="list"
                       size="medium">
            <peace-table-column width="50">
              <template slot-scope="scope">
                <el-radio v-model="activeId"
                          :label="scope.row.id"
                          @change="activeId=scope.row.id"></el-radio>
              </template>
            </peace-table-column>
            <peace-table-column label="序号"
                                type="index"
                                width="80">
            </peace-table-column>
            <peace-table-column label="省"
                                width="150">
              <template slot-scope="scope">
                <div>{{scope.row.proName||'--'}}</div>
              </template>
            </peace-table-column>
            <peace-table-column label="市"
                                width="150">
              <template slot-scope="scope">
                <div>{{scope.row.cityName||'--'}}</div>
              </template>
            </peace-table-column>
            <peace-table-column label="区"
                                width="150">
              <template slot-scope="scope">
                <div>{{scope.row.areaName||'--'}}</div>
              </template>
            </peace-table-column>
            <peace-table-column label="互联网医院">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.orgNames"
                     :key="index">{{item}}</div>
              </template>
            </peace-table-column>
            <peace-table-column fixed="right"
                                label="操作"
                                width="150">
              <template slot-scope="scope">
                <el-button @click="addHospital(scope.row.id)"
                           type="text">新增</el-button>
                <el-button @click="updataHospital(scope.row.id)"
                           type="text">修改</el-button>
              </template>
            </peace-table-column>
          </peace-table>
          <el-pagination :current-page.sync="search.pageNumber"
                         :page-size.sync="search.pageSize"
                         :total="count"
                         class="q-mt-16"
                         @current-change="getList"
                         @size-change="getList(1)"
                         background
                         layout="total, sizes ,->, prev, pager,  next"></el-pagination>
        </div>
      </div>
    </div>

    <!-- 新增区域 -->
    <peace-dialog :before-close="close"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="areaAddDialogVisible"
                  title="新增区域"
                  v-if="areaAddDialogVisible"
                  append-to-body
                  width="800px">
      <div>
        <el-form :model="add"
                 ref="addArea"
                 class="search add"
                 inline>
          <el-form-item label="区域">
            <el-select v-model="add.province"
                       clearable
                       @change="getCitys"
                       placeholder="省">
              <el-option v-for="item in provinces"
                         :key="item.area_id"
                         :label="item.area_name"
                         :value="item.area_id">
              </el-option>
            </el-select>
            <el-select v-model="add.city"
                       clearable
                       @change="getAreas"
                       placeholder="市">
              <el-option v-for="item in citys"
                         :key="item.area_id"
                         :label="item.area_name"
                         :value="item.area_id">
              </el-option>
            </el-select>
            <el-select v-model="add.area"
                       clearable
                       placeholder="区/县">
              <el-option v-for="item in areas"
                         :key="item.area_id"
                         :label="item.area_name"
                         :value="item.area_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="addArea()">确 定</el-button>
        <el-button @click="areaAddDialogVisible = false">取 消</el-button>
      </span>
    </peace-dialog>

    <!-- 新增区域医院-->
    <peace-dialog :before-close="close"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="addHospitalDialogVisible"
                  title="新增医院"
                  v-if="addHospitalDialogVisible"
                  append-to-body
                  width="800px">
      <el-form>
        <el-form-item label="医院名称：">
          <el-select v-model="selcetHospital"
                     clearable
                     multiple
                     placeholder="请选择">
            <el-option v-for="item in hospitals"
                       :key="item.netHospitalId"
                       :label="item.netHospitalName"
                       :value="item.netHospitalId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="confirmAddHospital()">确 定</el-button>
        <el-button @click="addHospitalDialogVisible = false">取 消</el-button>
      </span>
    </peace-dialog>

    <!-- 修改区域医院 -->
    <peace-dialog :before-close="close"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="updateHospitalDialogVisible"
                  title="修改互联网医院"
                  v-if="updateHospitalDialogVisible"
                  append-to-body
                  width="500px">
      <peace-table :data="updateHospital"
                   max-height="600"
                   class="settled-update"
                   style="width:100%">
        <peace-table-column label="名称"
                            min-width="150"
                            class="name">
          <template slot-scope="scope">{{scope.row}}</template>
        </peace-table-column>
        <peace-table-column fixed="right"
                            label="操作">
          <template slot-scope="scope">
            <el-button @click="confirmUpdataHospital(scope.row)"
                       type="text">删除</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </peace-dialog>
  </div>
</template>
<script>
import Service from './service/index'

export default {
  data() {
    return {
      activeId: '',
      search: {
        province: '',
        city: '',
        area: '',
        p: 1,
        size: 10
      },
      add: {
        province: '',
        city: '',
        area: ''
      },
      list: [],
      count: 1,
      provinces: [],
      citys: [],
      areas: [],
      hospitals: [],
      addHospitalId: '',
      updateHospital: [],
      updataHospitalId: '',
      selcetHospital: [],
      selectArea: [],
      areaAddDialogVisible: false,
      addHospitalDialogVisible: false,
      updateHospitalDialogVisible: false
    }
  },
  watch: {
    search: {
      handler(newval) {
        if (newval.province == '') {
          this.search.province = ''
          this.search.city = ''
          this.search.area = ''
          this.citys = []
          this.areas = []
        }
        if (newval.city == '') {
          this.search.city = ''
          this.search.area = ''
          this.areas = []
        }
      },
      immediate: true,
      deep: true
    },

    add: {
      handler(newval) {
        if (newval.province == '') {
          this.add.province = ''
          this.add.city = ''
          this.add.area = ''
          this.citys = []
          this.areas = []
        }
        if (newval.city == '') {
          this.add.city = ''
          this.add.area = ''
          this.areas = []
        }
      },
      immediate: true,
      deep: true
    },
    areaAddDialogVisible() {
      this.search.province = ''
    }
  },
  created() {
    this.getAreaList()
    this.getOrgList()
    this.getList()
  },
  methods: {
    getAreaList() {
      Service.getAreaList().then((res) => {
        this.provinces = res.data
      })
    },
    getCitys(id) {
      this.search.city = ''
      this.search.area = ''
      this.add.city = ''
      this.add.area = ''
      let child = this.provinces.filter((item) => item.area_id == id)
      if (child.length > 0) {
        this.citys = child[0].children
      } else {
        this.search.provinces = ''
      }
    },
    getAreas(id) {
      this.search.area = ''
      this.add.area = ''
      let child = this.citys.filter((item) => item.area_id == id)
      if (child.length > 0) {
        this.areas = child[0].children
      } else {
        this.search.city = ''
      }
    },
    getList(number) {
      if (number && this.search.p !== number) {
        this.search.p = number
      }

      const { province, city, area, p, size } = this.search
      Service.getEntryList({ provinceId: province, cityId: city, areaId: area, p: p, size: size }).then((res) => {
        this.list = res.data.list
        this.count = res.data.total
      })
    },
    getOrgList() {
      Service.getOrgList().then((res) => {
        this.hospitals = res.data.list
      })
    },
    deleteArea() {
      this.$confirm('您确认删除该区域吗？', '提示', { closeOnClickModal: false, closeOnPressEscape: false }).then(
        () => {
          Service.delEntryList({ id: this.activeId }).then(() => {
            this.getList(1)
          })
        }
      )
    },

    addArea() {
      const { province, city, area } = this.add
      if (province == '' && city == '' && area == '') {
        this.$message.warning('请选择新增区域的信息')
        return
      }
      Service.addEntryArea({ provinceId: province, cityId: city, areaId: area }).then((res) => {
        Peace.util.success(res.msg)
        this.getList()
        this.areaAddDialogVisible = false
        this.add = Object.assign({}, { province: '', city: '', area: '' })
      })
    },

    addHospital(id) {
      this.addHospitalDialogVisible = true
      this.addHospitalId = id
    },
    confirmAddHospital() {
      let selcetHospital = this.selcetHospital.join(',')
      if (selcetHospital.length == 0) {
        return this.$message.warning('医院名称不能为空!')
      }
      Service.addEntryOrg({ id: this.addHospitalId, orgId: selcetHospital }).then(() => {
        this.selcetHospital = []
        this.getList(1)
      })
      this.addHospitalDialogVisible = false
    },
    updataHospital(id) {
      this.updateHospitalDialogVisible = true
      this.updataHospitalId = id
      this.updateHospital = this.list.filter((item) => item.id == id)[0].orgNames
    },
    confirmUpdataHospital(name) {
      this.$confirm('您确定删除该机构吗？', '提示', { closeOnClickModal: false, closeOnPressEscape: false }).then(
        () => {
          Service.delEntryOrg({ id: this.updataHospitalId, orgName: name }).then(() => {
            this.updateHospital.map((item, index) => {
              if (item == name) {
                this.updateHospital.splice(index, 1)
              }
            })
          })
        }
      )
    },
    openAreaAddDialog() {
      this.areaAddDialogVisible = true
      this.search.provinces = ''
    },
    close(done) {
      this.getList()
      done()
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  &.add {
    padding: 18px 0px 0 0px;
    text-align: center;
    ::v-deep .el-form-item {
      margin-right: 0;
    }
  }
  ::v-deep .el-form-item__content {
    .el-select {
      margin-right: 10px;
      min-width: 50px;
    }
  }
  &-btn.el-form-item {
    margin-right: 0;
    display: inline-block;
  }
}
.content {
  &-hd {
    margin-bottom: 10px;
  }
  .list {
    overflow: auto;
    ::v-deep .el-radio__label {
      display: none !important;
    }
  }
}
.el-switch.is-disabled {
  opacity: 1;
}
.el-dialog__header,
.el-dialog__footer {
  text-align: center;
}
.el-table.settled-update .name ::v-deep .cell {
  text-align: left;
}
</style>