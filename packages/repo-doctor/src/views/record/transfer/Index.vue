<template>
  <div>
    <div class="header">
      <el-button-group>
        <el-button :type="view.model.referral_type === view.source.state['我转诊的'] ? 'primary' : '' " @click="changeActive('我转诊的')">我转诊的</el-button>
        <el-button :type="view.model.referral_type === view.source.state['转给我的'] ? 'primary' : '' " @click="changeActive('转给我的')">转给我的</el-button>
      </el-button-group>
    </div>

    <hr>

    <template v-if="view.model.referral_type === view.source.state['我转诊的']">
      <el-form :model="view.model" inline>
        <el-form-item label="转出医生">
          <el-input placeholder v-model="view.model.docName"></el-input>
        </el-form-item>
        <el-form-item label="转入机构">
          <el-input placeholder v-model="view.model.hosName"></el-input>
        </el-form-item>
        <el-form-item label="转诊状态">
          <el-select clearable placeholder v-model="view.model.transfer_status">
            <el-option :key="item.key" :label="item.refferStatus" :value="item.key" v-for="item in view.source.transfer_status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get" round type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <hr>

      <peace-table pagination ref="table">
        <peace-table-column label="姓名" prop="family_name"></peace-table-column>
        <peace-table-column label="年龄" prop="age"></peace-table-column>
        <peace-table-column label="性别" prop="sex"></peace-table-column>
        <peace-table-column align="left" label="初步诊断" min-width="200px" prop="diagnose"></peace-table-column>
        <peace-table-column label="转入机构" prop="netHospital_name"></peace-table-column>
        <peace-table-column label="转入医生" prop="name"></peace-table-column>
        <peace-table-column label="期望转诊时间" prop="created_time" width="150px"></peace-table-column>
        <peace-table-column label="申请时间" prop="expect_time" width="150px"></peace-table-column>
        <peace-table-column :formatter="formatter" label="转诊状态" prop="transfer_status" width="120px"></peace-table-column>
        <peace-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </template>

    <template v-else-if="view.model.referral_type === view.source.state['转给我的']">
      <el-form :model="view.model" inline>
        <el-form-item label="转出机构">
          <el-input placeholder v-model="view.model._转出机构"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get" round type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <hr>

      <peace-table pagination ref="table">
        <peace-table-column label="姓名" prop="family_name"></peace-table-column>
        <peace-table-column label="年龄" prop="age"></peace-table-column>
        <peace-table-column label="性别" prop="sex"></peace-table-column>
        <peace-table-column align="left" label="初步诊断" min-width="200px" prop="diagnose"></peace-table-column>
        <peace-table-column label="转出机构" prop="netHospital_name"></peace-table-column>
        <peace-table-column label="转出医生" prop="name"></peace-table-column>
        <peace-table-column label="期望转诊时间" prop="created_time" width="150px"></peace-table-column>
        <peace-table-column label="申请时间" prop="expect_time" width="150px"></peace-table-column>
        <peace-table-column :formatter="formatter" label="转诊状态" prop="transfer_status" width="120px"></peace-table-column>
        <peace-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </template>

    <el-dialog :visible.sync="dialog.visible" custom-class="dialog" title="转诊详情">
      <transfer-detail :data="dialog.data"></transfer-detail>
    </el-dialog>
  </div>
</template>

<script>
import TransferDetail from './TransferDetail'

export default {
  components: {
    TransferDetail
  },

  data() {
    return {
      api: {
        getRefferStatus: 'client/v1/inquiry/getRefferStatus',
        get: 'client/v1/inquiry/DoctorReferralListPc',
        referralDoc: 'client/v1/inquiry/referralDoc'
      },

      view: {
        action: '我转诊的',

        model: {
          referral_type: 'out',
          docName: '',
          hosName: '',
          transfer_status: ''
        },

        source: {
          transfer_status: [{ label: '问诊', value: '问诊' }, { label: '扫码', value: '扫码' }],

          state: {
            我转诊的: 'out',
            转给我的: 'in'
          }
        }
      },

      dialog: {
        visible: false,

        data: {}
      }
    }
  },

  created() {
    this.$http.post(this.api.getRefferStatus).then(res => {
      this.view.source.transfer_status = res.data
    })
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    changeActive(action) {
      if (this.view.model.referral_type !== this.view.source.state[action]) {
        this.view.model.referral_type = this.view.source.state[action]

        this.$nextTick(function() {
          this.get()
        })
      }
    },

    get() {
      this.$refs.table.loadData({
        api: this.api.get,
        params: this.view.model
      })
    },

    showDetail(row) {
      const params = {
        referral_no: row.referral_no,
        referral_type: this.view.model.referral_type
      }
      this.dialog.visible = true

      this.$http.post(this.api.referralDoc, params).then(res => {
        this.dialog.data = res.data
      })
    },

    formatter(r, c, v) {
      const temp = this.view.source.transfer_status.find(item => item.key === v)

      return temp && temp.refferStatus
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

.character {
  display: inline-flex;

  &:before {
    content: '';
    background: #e7e7e1;
    width: 15px;
    height: 1px;
    position: relative;
    top: -4px;
    margin: 0 10px;
  }
}

.el-form-item {
  margin-right: 60px;

  .el-input {
    width: 140px;
    height: 27px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.13);
    border-radius: 3px;
  }
}

.no-data {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  img {
    display: block;
    width: 150px;
    height: 150px;
  }

  span {
    margin-top: 20px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
  }
}

/deep/ .dialog {
  width: 580px;
  margin: 5vh auto !important;
  max-height: 90vh !important;
  min-height: 600px !important;

  .el-dialog__body {
    height: calc(90vh - 30px);
    overflow: auto;
  }
}
</style>
