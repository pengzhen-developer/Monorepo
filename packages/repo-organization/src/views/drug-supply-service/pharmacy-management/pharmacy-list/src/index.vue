<template>
  <div class=" flex full-width">
    <div class="layout-route full-width">
      <div class="bg-white full-height q-pa-lg"
           v-if="visible">
        <!-- 暂未创建药房 -->
        <div class="no-pharmacy">
          <img class="icon-pharmacy"
               src="./assets/img/yaodian.png">
          <p>您还未创建药房，赶紧新建一个吧~</p>
          <el-button type="primary"
                     class="edit-pharmacy"
                     v-on:click="addPharmacy">新建药房</el-button>
        </div>
      </div>
      <!--新增、编辑药房 -->
      <div class="bg-white full-height q-pa-lg"
           v-if="editVisible">
        <el-button plain
                   class="q-mb-24"
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
        <EditPharmacy v-on:goBack="back"
                      v-bind:data="id"></EditPharmacy>
      </div>
      <!--药房详情-->
      <div class="bg-white full-height q-pa-lg"
           v-if="detailVisible">
        <el-button plain
                   class="q-mb-24"
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
        <PharmacyDetail v-bind:data="id"></PharmacyDetail>
      </div>
      <!--运营管理-->
      <div class="bg-white full-height q-pa-lg"
           v-if="operationVisible">
        <el-button plain
                   class="q-mb-24"
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
        <OperationManage v-bind:data="CustID"
                         v-on:goBack="back"></OperationManage>
      </div>

      <!-- 药房列表 -->
      <div class="card"
           v-show="listVisible">
        <div class="q-mb-lg">
          <el-button type="primary"
                     icon="el-icon-plus"
                     v-on:click="addPharmacy">新增药房</el-button>
        </div>

        <peace-table ref="table"
                     pagination>
          <el-table-column label="序号"
                           type="index"
                           align="center"
                           width="80px">
            <template slot-scope="{ $index, _self }">
              {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="药房名称"
                           prop="Name"
                           min-width="180px"></el-table-column>
          <el-table-column label="已上架商品数量"
                           prop="GoodNums"
                           min-width="80px"></el-table-column>
          <el-table-column label="认证状态"
                           prop="ExamineStatus"
                           min-width="100px">
            <template slot-scope="scope">
              <span class="dot"
                    v-bind:class="getColorType(scope.row)"></span>
              <span>{{scope.row.ExamineStatus | getEnumLabel(source.ENUM_CHECK_STATUS)}}</span>
              <span class="icon-failed"
                    v-if="scope.row.ExamineStatus==20?true:false"
                    v-on:click="viewReason(scope.row)">i</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间"
                           prop="CreateTime"
                           min-width="160px"></el-table-column>
          <el-table-column label="启用状态"
                           prop="EnableStatus"
                           min-width="100px">
            <template slot-scope="scope">

              {{ scope.row.EnableStatus == 0 ? '已启用' : '未启用' }}

              <el-switch v-model="scope.row.EnableStatus"
                         v-if="scope.row.ExamineStatus==15?true:false"
                         v-bind:active-value="0"
                         v-bind:inactive-value="10"
                         v-on:change="operationEnable(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="left"
                           width="300px"
                           fixed="right">
            <template slot-scope="scope">
              <el-button type="text"
                         v-if="scope.row.ExamineStatus==15?true:false"
                         class="no-padding"
                         v-on:click="operationManage(scope.row)">运营管理</el-button>
              <el-button type="text"
                         v-if="scope.row.ExamineStatus==15?true:false"
                         class="no-padding"
                         v-on:click="commodityManage(scope.row)">商品管理</el-button>
              <el-button type="text"
                         v-on:click="viewPharmacy(scope.row)"
                         class="no-padding">药房详情</el-button>
              <el-button type="text"
                         v-if="scope.row.ExamineStatus==20||scope.row.ExamineStatus==15?true:false"
                         v-on:click="editPharmacys(scope.row)"
                         class="no-padding">修改</el-button>
            </template>
          </el-table-column>
        </peace-table>
      </div>
      <PeaceDialog v-if="reasonVisible"
                   width="344px"
                   v-bind:visible.sync="reasonVisible"
                   title="未通过提示">
        <span>{{reasonText}}</span>
      </PeaceDialog>
    </div>
  </div>
</template>

<script>
import Service from './service'
import CONSTANT from './constant'

import EditPharmacy from './components/EditPharmacy'
import PharmacyDetail from './components/PharmacyDetail'
import OperationManage from './components/OperationManage'
export default {
  name: 'PharmacyList',
  components: {
    EditPharmacy,
    PharmacyDetail,
    OperationManage
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },
  data() {
    return {
      source: {
        ENUM_CHECK_STATUS: CONSTANT.ENUM_CHECK_STATUS
      },
      saveing: false,
      visible: false,
      editVisible: false,
      listVisible: false,
      reasonVisible: false,
      detailVisible: false,
      operationVisible: false,
      statuVule: {
        custId: '',
        status: 0
      },
      showText: '',
      reasonText: '',
      id: '',
      CustID: ''
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.getStoreList
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        if (res.data.list !== null) {
          this.visible = false
          this.listVisible = true
          this.editVisible = false
          this.detailVisible = false
          this.operationVisible = false
          return res.data.list
        } else {
          this.visible = true
          this.listVisible = false
          this.editVisible = false
          this.detailVisible = false
          this.operationVisible = false
        }
      })
    },
    getColorType(row) {
      const dict = {
        10: 'reviewed',
        15: 'success',
        20: 'failed'
      }
      return dict[row.ExamineStatus]
    },
    addPharmacy() {
      this.visible = false
      this.listVisible = false
      this.editVisible = true
      this.id = ''
    },
    viewReason(row) {
      this.reasonVisible = true
      this.reasonText = row.RejectReason
    },
    operationEnable(row) {
      if (row.EnableStatus == 10) {
        this.showText = '停用药房后，将无法正常接收订单，确认停用?'
        this.statuVule.status = 10
      } else {
        this.showText = '确认启用药房'
        this.statuVule.status = 0
      }
      this.statuVule.custId = row.ID

      this.$confirm(this.showText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false
      })
        .then(() => {
          this.saveing = true
          const params = this.statuVule
          Service.updateEnableStatus(params)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.fetch()
            })
            .finally(() => {
              this.saveing = false
            })
        })
        .catch(() => {
          row.EnableStatus = row.EnableStatus === 0 ? 10 : 0
        })
    },
    viewPharmacy(row) {
      this.detailVisible = true
      this.listVisible = false
      this.id = row.UserID
    },
    editPharmacys(row) {
      this.listVisible = false
      this.editVisible = true
      this.id = row.UserID
    },
    commodityManage(row) {
      const name = 'CommodityManage'
      Peace.cache.sessionStorage.set('Code', row.Code)
      this.$router.push({ name })
    },
    operationManage(row) {
      this.listVisible = false
      this.operationVisible = true
      this.CustID = row.ID
    },
    back() {
      this.fetch()
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 9px 16px !important;
}
.no-pharmacy {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.no-pharmacy .icon-pharmacy {
  margin-top: 156px;
  margin-bottom: 30px;
}
.no-pharmacy p {
  height: 24px;
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  margin-bottom: 30px;
}
.edit-pharmacy {
  padding: 13px 55px 13px 29px !important;
  font-size: 14px;
  position: relative;
}
.edit-pharmacy:after {
  content: '';
  width: 18px;
  height: 18px;
  position: absolute;
  right: 30px;
  top: 50%;
  margin-top: -9px;
  background: url('./assets/img/edit.png') no-repeat left center;
}
.icon-back {
  padding: 1px 4px !important;
}
::v-deep .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 8px 0 0;

  &.failed {
    background: rgba(0, 0, 0, 0.25);
  }
  &.reviewed {
    background: #faad14;
  }
  &.success {
    background: var(--q-color-primary);
  }
}
.icon-failed {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid #f2223b;
  border-radius: 50%;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #f2223b;
  margin: 0 0 0 4px;
  cursor: pointer;
}
.info-btn {
  padding-top: 30px;
  text-align: center;
  .el-button {
    width: 120px;
    & + .el-button {
      margin-left: 30px;
    }
  }
}
.no-padding {
  padding: 0 !important;
}
</style>