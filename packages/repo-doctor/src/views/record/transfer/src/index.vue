<template>
  <div>
    <div class="header">
      <el-button-group>
        <el-button :type="view.model.referral_type === source.state['我转诊的'] ? 'primary' : '' "
                   @click="changeActive('我转诊的')">我转诊的</el-button>
        <el-button :type="view.model.referral_type === source.state['转给我的'] ? 'primary' : '' "
                   @click="changeActive('转给我的')">转给我的</el-button>
      </el-button-group>
    </div>

    <div class="content"
         key="out"
         v-if="view.model.referral_type === source.state['我转诊的']">
      <el-form :model="view.model"
               inline>
        <el-form-item label="转入医生">
          <el-input placeholder
                    v-model="view.model.docName"></el-input>
        </el-form-item>
        <el-form-item label="转入机构">
          <el-input placeholder
                    v-model="view.model.hosName"></el-input>
        </el-form-item>
        <el-form-item label="转诊状态">
          <el-select clearable
                     filterable
                     placeholder="全部"
                     v-model="view.model.transfer_status">
            <el-option :key="item.key"
                       :label="item.refferStatus"
                       :value="item.key"
                       v-for="item in source.transfer_status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <hr />

      <peace-table pagination
                   ref="table">
        <peace-table-column label="患者姓名"
                            prop="family_name"></peace-table-column>
        <peace-table-column label="年龄"
                            prop="age"></peace-table-column>
        <peace-table-column label="性别"
                            prop="sex"></peace-table-column>
        <peace-table-column align="left"
                            label="疾病诊断"
                            min-width="200px"
                            prop="diagnose"></peace-table-column>
        <peace-table-column align="left"
                            label="转入机构"
                            min-width="200px"
                            prop="netHospital_name"></peace-table-column>
        <peace-table-column label="转入医生"
                            prop="name"></peace-table-column>
        <peace-table-column label="期望转诊时间"
                            prop="expect_time"
                            width="150px"></peace-table-column>
        <peace-table-column label="申请时间"
                            prop="created_time"
                            width="150px"></peace-table-column>
        <peace-table-column :formatter="formatter"
                            label="转诊状态"
                            prop="transfer_status"
                            width="100px"></peace-table-column>
        <peace-table-column fixed="right"
                            label="操作"
                            width="100px">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)"
                       type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <div class="content"
         key="in"
         v-if="view.model.referral_type === source.state['转给我的']">
      <el-form :model="view.model"
               inline>
        <el-form-item label="转出机构">
          <el-input placeholder
                    v-model="view.model.hosName"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <hr />

      <peace-table pagination
                   ref="table">
        <peace-table-column label="患者姓名"
                            prop="family_name"></peace-table-column>
        <peace-table-column label="年龄"
                            prop="age"></peace-table-column>
        <peace-table-column label="性别"
                            prop="sex"></peace-table-column>
        <peace-table-column align="left"
                            label="疾病诊断"
                            min-width="200px"
                            prop="diagnose"></peace-table-column>
        <peace-table-column align="left"
                            label="转出机构"
                            min-width="200px"
                            prop="netHospital_name"></peace-table-column>
        <peace-table-column label="转出医生"
                            prop="name"></peace-table-column>
        <peace-table-column label="期望转诊时间"
                            prop="expect_time"
                            width="150px"></peace-table-column>
        <peace-table-column label="申请时间"
                            prop="created_time"
                            width="150px"></peace-table-column>
        <peace-table-column :formatter="formatter"
                            label="转诊状态"
                            prop="transfer_status"
                            width="100px"></peace-table-column>
        <peace-table-column fixed="right"
                            label="操作"
                            width="100px">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)"
                       type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <peace-dialog :visible.sync="dialog.visible"
                  custom-class="dialog"
                  title="转诊详情">
      <TheTransferDetail :data="dialog.data"
                         :type="view.model.referral_type"
                         @close="close"></TheTransferDetail>
    </peace-dialog>
  </div>
</template>

<script>
import TheTransferDetail from './TheTransferDetail'

export default {
  components: {
    TheTransferDetail
  },

  data() {
    return {
      view: {
        action: '',

        model: {
          referral_type: (this.$route.params && this.$route.params.referral_type) || 'out',
          docName: '',
          hosName: '',
          transfer_status: ''
        }
      },

      source: {
        transfer_status: [],

        state: {
          我转诊的: 'out',
          转给我的: 'in'
        }
      },

      dialog: {
        visible: false,

        data: {}
      }
    }
  },

  activated() {
    if (this.$route.params && this.$route.params.referral_type) {
      this.view.model.referral_type = this.$route.params.referral_type

      this.get()
    }
  },

  created() {
    Peace.service.inquiry.getRefferStatus().then((res) => {
      this.source.transfer_status = res.data
    })
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    changeActive(action) {
      if (this.view.model.referral_type !== this.source.state[action]) {
        this.view.model.referral_type = this.source.state[action]

        this.$nextTick(function() {
          this.get()
        })
      }
    },

    get() {
      const fetch = Peace.service.inquiry.doctorReferralListPc
      const params = this.view.model

      this.$refs.table.loadData({ fetch, params })
    },

    showDetail(row) {
      this.dialog.data = undefined
      this.dialog.visible = true

      const params = {
        referral_no: row.referral_no,
        referral_type: this.view.model.referral_type
      }

      Peace.service.inquiry.referralDocPc(params).then((res) => {
        this.dialog.data = res.data
      })
    },

    close() {
      this.dialog.visible = false

      this.get()
    },

    formatter(r, c, v) {
      const temp = this.source.transfer_status.find((item) => item.key === v)

      return temp && temp.refferStatus
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  margin: -20px -20px 0;
  background: #f9f9f9;
  padding: 20px;
}

.content {
  padding: 20px 0 0 0;
}
</style>
